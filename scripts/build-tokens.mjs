#!/usr/bin/env node
/**
 * Lira Design System — token build pipeline (zero dependencies).
 *
 * Reads token JSON files in `tokens/`, resolves `{path.to.token}` references,
 * and emits:
 *   dist/js/tokens.esm.js         — ESM token object
 *   dist/js/tokens.cjs.js         — CJS token object
 *   dist/js/tokens.d.ts           — TypeScript declarations
 *   dist/react-native/theme.ts    — RN women theme object
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
const componentsObj = COMPONENTS.reduce((acc, p) => merge(acc, readJson(p)), {});

// Base = primitives + core semantic + semantic typography + components.
const baseTree = merge(merge(merge(merge(primitivesObj, semanticCore), semanticType), componentsObj), {});

const flatBase = new Map();
for (const { path, value } of walk(baseTree)) flatBase.set(path.join('.'), String(value));

// Resolve refs (a value may reference another path).
const resolvedBase = new Map();
for (const [k, v] of flatBase) resolvedBase.set(k, resolveRefs(v, flatBase));
// ---- 2. JS / TS token objects --------------------------------------------

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

// ---- 3. React Native theme -----------------------------------------------

const rnThemeBody = [
  '/* Generated. Do not edit — run `npm run build:tokens` instead. */',
  '',
  'export const womenTheme = ' + JSON.stringify(baseObj, null, 2) + ' as const;',
  '',
  'export type LiraTheme = typeof womenTheme;',
  'export type LiraThemeName = "women";',
  '',
  'export const themes = { women: womenTheme } as const;',
  '',
  'export default themes;',
  '',
].join('\n');

writeFile('dist/react-native/theme.ts', rnThemeBody);

// ---- done ---------------------------------------------------------------

console.log('✓ Tokens built');
console.log('  dist/js/tokens.esm.js');
console.log('  dist/js/tokens.cjs.js');
console.log('  dist/js/tokens.d.ts');
console.log('  dist/react-native/theme.ts');
