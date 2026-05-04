#!/usr/bin/env node
/**
 * Lira Design System — token build pipeline (zero dependencies).
 *
 * Reads token JSON files in `tokens/`, resolves `{path.to.token}` references,
 * and emits:
 *   dist/css/tokens.css           — CSS variables, theme-scoped (Women @ :root, Professionals @ [data-theme])
 *   dist/tailwind/theme.css       — Tailwind v4 @theme block bound to the CSS vars
 *   dist/js/tokens.esm.js         — ESM token object
 *   dist/js/tokens.cjs.js         — CJS token object
 *   dist/js/tokens.d.ts           — TypeScript declarations
 *   dist/react-native/theme.ts    — RN theme: { women, professionals } typed objects
 *
 * Run with: `npm run build:tokens` (or `node scripts/build-tokens.mjs`).
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const PRIMITIVES = ['color', 'space', 'radius', 'typography', 'shadow'].map((n) =>
  `tokens/primitives/${n}.json`
);
const SEMANTIC_CORE = 'tokens/semantic/core.json';
const SEMANTIC_TYPE = 'tokens/semantic/typography.json';
const SEMANTIC_PROFESSIONALS = 'tokens/semantic/professionals.json';
const COMPONENTS = ['button', 'chart'].map((n) => `tokens/components/${n}.json`);

const META_KEYS = new Set(['$description', 'description', 'comment']);

// ---- helpers --------------------------------------------------------------

const readJson = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));

const writeFile = (p, content) => {
  const fp = resolve(ROOT, p);
  mkdirSync(dirname(fp), { recursive: true });
  writeFileSync(fp, content);
};

/** Strip $description / description / comment keys from an object tree. */
const stripMeta = (obj) => {
  if (Array.isArray(obj)) return obj.map(stripMeta);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (META_KEYS.has(k)) continue;
      out[k] = stripMeta(v);
    }
    return out;
  }
  return obj;
};

/** Deep merge plain objects (right wins). */
const merge = (a, b) => {
  const out = { ...a };
  for (const [k, v] of Object.entries(b || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v) && a[k] && typeof a[k] === 'object' && !Array.isArray(a[k])) {
      out[k] = merge(a[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
};

/** Walk a tokens tree, yielding [path, leafValue]. A leaf is `{ value: X }`. */
function* walk(obj, path = []) {
  if (obj && typeof obj === 'object' && 'value' in obj && typeof obj.value !== 'object') {
    yield { path, value: obj.value };
    return;
  }
  for (const [k, v] of Object.entries(obj || {})) {
    if (META_KEYS.has(k)) continue;
    if (v && typeof v === 'object') yield* walk(v, [...path, k]);
  }
}

/** Resolve {a.b.c} references against a flat path map (max depth = 8). */
const resolveRefs = (str, map) => {
  if (typeof str !== 'string') return str;
  let out = str;
  for (let i = 0; i < 8 && /\{[\w.-]+\}/.test(out); i++) {
    out = out.replace(/\{([\w.-]+)\}/g, (_, key) => {
      const v = map.get(key);
      return v === undefined ? `{${key}}` : v;
    });
  }
  return out;
};

const cssVarName = (path) => `--${path.join('-')}`;

// Numeric-layout namespaces (primitives).
const LAYOUT_PRIMITIVE_ROOTS = new Set(['space', 'radius', 'fontSize']);
// Unitless leaves — these stay as bare numbers in CSS.
const UNITLESS_LEAVES = new Set(['fontWeight', 'lineHeight', 'opacity', 'zIndex', 'weight', 'leading']);
// Layout-shaped leaves anywhere in the path.
const LAYOUT_LEAVES = new Set([
  'fontSize', 'height', 'width', 'paddingX', 'paddingY', 'padding',
  'marginX', 'marginY', 'margin', 'gap', 'top', 'right', 'bottom', 'left',
  'radius', 'inset', 'minHeight', 'maxHeight', 'minWidth', 'maxWidth', 'size',
]);

/** Return value formatted for CSS (adds `px` to bare numbers that represent layout dims). */
const numericOrPx = (val, path) => {
  const s = String(val).trim();
  if (!/^-?\d+(\.\d+)?$/.test(s)) return s;
  const root = path[0];
  const leaf = path[path.length - 1];
  if (UNITLESS_LEAVES.has(leaf)) return s;
  if (LAYOUT_PRIMITIVE_ROOTS.has(root)) return `${s}px`;
  if (LAYOUT_LEAVES.has(leaf)) return `${s}px`;
  return s;
};

/** Whether the JS/TS object should keep this leaf as a number (RN/JS friendly). */
const isLayoutNumeric = (path) => {
  const root = path[0];
  const leaf = path[path.length - 1];
  if (UNITLESS_LEAVES.has(leaf)) return false;
  if (LAYOUT_PRIMITIVE_ROOTS.has(root)) return true;
  if (LAYOUT_LEAVES.has(leaf)) return true;
  return false;
};

// ---- 1. load + flatten ----------------------------------------------------

const primitivesObj = PRIMITIVES.reduce((acc, p) => merge(acc, readJson(p)), {});
const semanticCore = readJson(SEMANTIC_CORE);
const semanticType = readJson(SEMANTIC_TYPE);
const semanticProf = readJson(SEMANTIC_PROFESSIONALS);
const componentsObj = COMPONENTS.reduce((acc, p) => merge(acc, readJson(p)), {});

// Base = primitives + core semantic + semantic typography + components.
const baseTree = merge(merge(merge(merge(primitivesObj, semanticCore), semanticType), componentsObj), {});
// Professionals override sits on top of base (only override the semantic.* paths).
const profTree = merge(baseTree, semanticProf);

const flatBase = new Map();
for (const { path, value } of walk(baseTree)) flatBase.set(path.join('.'), String(value));
const flatProf = new Map();
for (const { path, value } of walk(profTree)) flatProf.set(path.join('.'), String(value));

// Resolve refs (a value may reference another path).
const resolvedBase = new Map();
for (const [k, v] of flatBase) resolvedBase.set(k, resolveRefs(v, flatBase));
const resolvedProf = new Map();
for (const [k, v] of flatProf) resolvedProf.set(k, resolveRefs(v, flatProf));

// ---- 2. CSS: theme-scoped tokens -----------------------------------------

const writeCssTokens = () => {
  const lines = [
    '/**',
    ' * Lira Design System — generated tokens.',
    ' * Source of truth: tokens/. Run `npm run build:tokens` to regenerate.',
    ' * Theming model:',
    ' *   :root  →  Universal Core (= Women theme by default)',
    ' *   [data-theme="professionals"]  →  Professionals overrides',
    ' */',
    '',
    ':root {',
  ];

  // Stable order: by depth, then alphabetical, with primitives first then semantic.
  const sortedKeys = [...resolvedBase.keys()].sort();
  for (const k of sortedKeys) {
    const path = k.split('.');
    const v = resolvedBase.get(k);
    lines.push(`  ${cssVarName(path)}: ${numericOrPx(v, path)};`);
  }
  lines.push('}', '');

  // Women is the default — alias the attribute for explicit pages.
  lines.push('[data-theme="women"] {', '  /* Women equals Universal Core — see :root above. */', '}', '');

  // Professionals: only emit semantic.* differences from base.
  lines.push('[data-theme="professionals"] {');
  for (const k of sortedKeys) {
    if (!k.startsWith('semantic.')) continue;
    const profVal = resolvedProf.get(k);
    if (profVal === undefined) continue;
    if (profVal === resolvedBase.get(k)) continue;
    const path = k.split('.');
    lines.push(`  ${cssVarName(path)}: ${numericOrPx(profVal, path)};`);
  }
  lines.push('}', '');

  writeFile('dist/css/tokens.css', lines.join('\n'));
};

writeCssTokens();

// ---- 3. Tailwind v4 @theme preset ----------------------------------------

const writeTailwindTheme = () => {
  const lines = [
    '/**',
    ' * Lira Design System — Tailwind v4 @theme preset.',
    ' * Import this AFTER tokens.css and BEFORE `@import "tailwindcss"`:',
    ' *',
    ' *   @import "@lira/design-system/tokens.css";',
    ' *   @import "@lira/design-system/tailwind";',
    ' *   @import "tailwindcss";',
    ' */',
    '',
    '@theme inline {',
  ];

  const keys = [...resolvedBase.keys()].sort();
  for (const k of keys) {
    const path = k.split('.');
    const root = path[0];
    const ref = `var(${cssVarName(path)})`;
    const sub = path.slice(1).join('-');
    switch (root) {
      case 'color':
        lines.push(`  --color-${sub}: ${ref};`);
        break;
      case 'space':
        lines.push(`  --spacing-${sub}: ${ref};`);
        break;
      case 'radius':
        lines.push(`  --radius-${sub}: ${ref};`);
        break;
      case 'fontSize':
        lines.push(`  --text-${sub}: ${ref};`);
        break;
      case 'fontFamily':
        lines.push(`  --font-${sub}: ${ref};`);
        break;
      case 'fontWeight':
        lines.push(`  --font-weight-${sub}: ${ref};`);
        break;
      case 'lineHeight':
        lines.push(`  --leading-${sub}: ${ref};`);
        break;
      case 'letterSpacing':
        lines.push(`  --tracking-${sub}: ${ref};`);
        break;
      case 'shadow':
        lines.push(`  --shadow-${sub}: ${ref};`);
        break;
      case 'semantic': {
        const [, group, ...rest] = path;
        const tail = rest.join('-');
        if (group === 'background') lines.push(`  --color-bg-${tail}: ${ref};`);
        else if (group === 'text')   lines.push(`  --color-text-${tail}: ${ref};`);
        else if (group === 'border') lines.push(`  --color-border-${tail}: ${ref};`);
        else if (group === 'action') lines.push(`  --color-action-${tail}: ${ref};`);
        else if (group === 'feedback') lines.push(`  --color-${tail}: ${ref};`);
        else if (group === 'accent') lines.push(`  --color-accent-${tail}: ${ref};`);
        break;
      }
    }
  }
  lines.push('}', '');
  writeFile('dist/tailwind/theme.css', lines.join('\n'));
};

writeTailwindTheme();

// ---- 4. JS / TS token objects --------------------------------------------

const buildNested = (flatMap) => {
  const root = {};
  for (const [k, v] of flatMap) {
    const path = k.split('.');
    let cursor = root;
    for (let i = 0; i < path.length - 1; i++) {
      cursor[path[i]] = cursor[path[i]] || {};
      cursor = cursor[path[i]];
    }
    // Coerce numeric layout values back to numbers (RN/JS prefer Number for layout).
    let val = v;
    if (isLayoutNumeric(path)) {
      const n = parseFloat(v);
      if (!Number.isNaN(n)) val = n;
    }
    cursor[path[path.length - 1]] = val;
  }
  return root;
};

const baseObj = buildNested(resolvedBase);
const profObj = buildNested(resolvedProf);
const baseJson = JSON.stringify(baseObj, null, 2);

writeFile(
  'dist/js/tokens.esm.js',
  `/* Generated. Do not edit — run \`npm run build:tokens\` instead. */\nexport const tokens = ${baseJson};\nexport default tokens;\n`
);
writeFile(
  'dist/js/tokens.cjs.js',
  `/* Generated. Do not edit — run \`npm run build:tokens\` instead. */\nmodule.exports = ${baseJson};\nmodule.exports.tokens = module.exports;\nmodule.exports.default = module.exports;\n`
);

const typeShape = (obj, indent = 0) => {
  if (typeof obj !== 'object' || obj === null) {
    if (typeof obj === 'number') return 'number';
    return JSON.stringify(obj);
  }
  const pad = '  '.repeat(indent + 1);
  const close = '  '.repeat(indent);
  const entries = Object.entries(obj).map(([k, v]) => {
    const safe = /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
    return `${pad}readonly ${safe}: ${typeShape(v, indent + 1)};`;
  });
  return `{\n${entries.join('\n')}\n${close}}`;
};

writeFile(
  'dist/js/tokens.d.ts',
  `/* Generated. Do not edit — run \`npm run build:tokens\` instead. */\nexport declare const tokens: ${typeShape(baseObj)};\nexport default tokens;\n`
);

// ---- 5. React Native theme -----------------------------------------------

const rnThemeBody = [
  '/* Generated. Do not edit — run `npm run build:tokens` instead. */',
  '',
  'export const womenTheme = ' + JSON.stringify(baseObj, null, 2) + ' as const;',
  '',
  'export const professionalsTheme = ' + JSON.stringify(profObj, null, 2) + ' as const;',
  '',
  'export type LiraTheme = typeof womenTheme;',
  'export type LiraThemeName = "women" | "professionals";',
  '',
  'export const themes = { women: womenTheme, professionals: professionalsTheme } as const;',
  '',
  'export default themes;',
  '',
].join('\n');

writeFile('dist/react-native/theme.ts', rnThemeBody);

// ---- done ---------------------------------------------------------------

console.log('✓ Tokens built');
console.log('  dist/css/tokens.css');
console.log('  dist/tailwind/theme.css');
console.log('  dist/js/tokens.esm.js');
console.log('  dist/js/tokens.cjs.js');
console.log('  dist/js/tokens.d.ts');
console.log('  dist/react-native/theme.ts');
