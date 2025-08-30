import fs from 'node:fs';
import path from 'node:path';
import {
  PUB, isRealImage, listFilesRecursive, toRelFromPublic,
  normalizeNameForMatch, extOf
} from './_image-utils.mjs';

const ROOT = process.cwd();
const REG_PATH = path.join(ROOT, 'src', 'data', 'imageRegistry.ts');
const BACKUP_PATH = REG_PATH + '.bak';

const SCAN_DIRS = [
  path.join(PUB, 'images'),
  path.join(PUB, 'images', 'Architectural'),
  path.join(PUB, 'images', 'uploads'),
];

// --- Build search index of real images on disk ---
const allFiles = SCAN_DIRS.flatMap(listFilesRecursive)
  .filter(p => /\.(png|jpg|jpeg)$/i.test(p))
  .filter(isRealImage);

const index = allFiles.map(abs => {
  const base = path.basename(abs);
  return {
    abs,
    rel: toRelFromPublic(abs),
    base,
    key: normalizeNameForMatch(base),
    ext: extOf(base),
  };
});

// simple scorer: higher is better
function scoreCandidate(targetBase, targetExt, cand) {
  let s = 0;
  if (cand.ext === targetExt) s += 5;
  const tKey = normalizeNameForMatch(targetBase);
  if (cand.key === tKey) s += 10;                // exact normalized match
  if (cand.key.includes(tKey) || tKey.includes(cand.key)) s += 4;
  if (/copy/i.test(cand.base)) s -= 3;            // de-prioritize "copy"
  return s;
}

// --- Read current registry source ---
if (!fs.existsSync(REG_PATH)) {
  console.error('ERROR: Missing', path.relative(ROOT, REG_PATH));
  process.exit(1);
}
const src = fs.readFileSync(REG_PATH, 'utf8');

// extract arrays and project object paths
const ALL_PATHS = [...src.matchAll(/['"`](\/images\/[^'"`]+)['"`]/g)].map(m => m[1]);

// find missing/invalid
const missing = [];
for (const rel of ALL_PATHS) {
  const full = path.join(PUB, rel.replace(/^\//,''));
  if (!fs.existsSync(full) || !isRealImage(full)) {
    missing.push(rel);
  }
}

if (!missing.length) {
  console.log('✓ No missing/invalid images found in registry.');
  process.exit(0);
}

console.log('Found', missing.length, 'missing/invalid images.\n');

// propose repairs
const repairs = [];
for (const rel of missing) {
  const base = path.basename(rel);
  const wantExt = extOf(base);
  // score all candidates
  const candidates = index
    .map(c => ({ c, score: scoreCandidate(base, wantExt, c) }))
    .filter(x => x.score > 0)
    .sort((a,b)=>b.score - a.score)
    .slice(0, 6);

  if (candidates.length) {
    const best = candidates[0].c;
    repairs.push({ oldRel: rel, newRel: best.rel, note: 'best-match' });
    console.log('REPAIR SUGGESTION:', rel, '→', best.rel);
  } else {
    console.log('NO MATCH FOUND for', rel);
  }
}

// write changes if --write
const WRITE = process.argv.includes('--write');

if (!WRITE) {
  console.log('\n(dry run) Re-run with --write to apply these replacements to src/data/imageRegistry.ts');
  process.exit(0);
}

// backup & replace in file
fs.writeFileSync(BACKUP_PATH, src, 'utf8');

let out = src;
for (const r of repairs) {
  // replace exact string occurrences of the oldRel with newRel
  const safeOld = r.oldRel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  out = out.replace(new RegExp(`(['"\`])${safeOld}\\1`, 'g'), (m, q) => `${q}${r.newRel}${q}`);
}

fs.writeFileSync(REG_PATH, out, 'utf8');

console.log('\n[repair-missing-images] Applied', repairs.length, 'repairs.');
console.log('Backup saved at', path.relative(ROOT, BACKUP_PATH));
console.log('Next: npm run verify:images');