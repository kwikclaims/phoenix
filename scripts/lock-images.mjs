import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const REG_TS = path.join(ROOT, 'src', 'data', 'imageRegistry.ts');
const LOCK_JSON = path.join(ROOT, 'src', 'data', 'imageRegistry.lock.json');

const src = fs.readFileSync(REG_TS, 'utf8');

// Extract every '/images/...' string in order, grouped by exported const name
function grab(name) {
  const re = new RegExp(`export const ${name}\\s*=\\s*\\[([\\s\\S]*?)\\]`, 'm');
  const m = src.match(re);
  if (!m) return null;
  const arr = [...m[1].matchAll(/['"`](\/images\/[^'"`]+)['"`]/g)].map(x => x[1]);
  return arr;
}

function grabObject(name) {
  const re = new RegExp(`export const ${name}\\s*=\\s*\\{([\\s\\S]*?)\\}\\s*as const;?`, 'm');
  const m = src.match(re);
  if (!m) return null;
  // crude parse: keys and arrays of '/images/...'
  const block = m[1];
  const out = {};
  const entryRe = /(['"`])([^'"`]+)\1\s*:\s*\[([\s\S]*?)\]/g;
  for (const em of block.matchAll(entryRe)) {
    const key = em[2];
    const paths = [...em[3].matchAll(/['"`](\/images\/[^'"`]+)['"`]/g)].map(x => x[1]);
    out[key] = paths;
  }
  return out;
}

const lock = {
  threeTabImages: grab('threeTabImages') ?? [],
  architecturalImages: grab('architecturalImages') ?? [],
  damageImages: grab('damageImages') ?? [],
  collateralDamageImages: grab('collateralDamageImages') ?? [],
  projectImages: grabObject('projectImages') ?? {},
  generatedAt: new Date().toISOString(),
};

fs.writeFileSync(LOCK_JSON, JSON.stringify(lock, null, 2));
console.log('[lock-images] Wrote', path.relative(ROOT, LOCK_JSON));