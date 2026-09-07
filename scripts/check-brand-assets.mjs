/**
 * Are the brand assets here still the ones the app ships?
 *
 * The app has to keep its own copies: `app.config.js` points Expo at
 * `./assets/*.png` for the native icon, splash and notification icon, and
 * pointing that at a git dependency inside node_modules would let a bad
 * install change the app icon in silence. So the files exist twice on
 * purpose.
 *
 * What is not acceptable is the two drifting apart quietly, which is exactly
 * what happened before September 2026: this repo carried the v2 logo, the app
 * carried v3, and anyone who came here to look up the brand green got the old
 * answer with no warning. This makes that noisy instead.
 *
 *   node scripts/check-brand-assets.mjs [path-to-app]   (default: ../lira)
 *
 * Exits 1 when a file differs, so it can gate a release.
 */

import { createHash } from 'node:crypto';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const HERE = join(ROOT, 'assets/brand');
const APP = resolve(process.argv[2] || join(ROOT, '../lira'), 'assets');

const hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex').slice(0, 12);

if (!existsSync(APP)) {
  console.log(`The app is not next to this repo (${APP}), so there is nothing to compare. Skipping.`);
  process.exit(0);
}

const ours = readdirSync(HERE).filter((f) => f.endsWith('.png'));
let bad = 0;
let missing = 0;

for (const file of ours) {
  const mine = join(HERE, file);
  const theirs = join(APP, file);

  if (!existsSync(theirs)) {
    console.log(`  ?  ${file} is here but not in the app. Fine if it is reference-only, worth a look otherwise.`);
    missing += 1;
    continue;
  }

  const a = hash(mine);
  const b = hash(theirs);
  if (a === b) {
    console.log(`  ok ${file}`);
  } else {
    console.log(`  ✗  ${file} differs. here ${a}, app ${b}`);
    bad += 1;
  }
}

console.log('');
if (bad > 0) {
  console.log(`${bad} brand asset(s) have drifted. The app is the one that ships, so it is`);
  console.log('usually the newer of the two: copy from there to assets/brand/ here, and');
  console.log('check whether the colours in tokens/primitives/color.json still match it.');
  process.exit(1);
}
console.log(`Brand assets match the app${missing ? `, with ${missing} reference-only file(s) here` : ''}.`);
