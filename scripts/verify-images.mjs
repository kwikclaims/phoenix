import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUB  = path.join(ROOT, 'public');
const LOCK = path.join(ROOT, 'src', 'data', 'imageRegistry.lock.json');

const SIGS = {
  jpg: [0xFF,0xD8,0xFF],
  png: [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A],
};

function isRealImage(full) {
  if (!fs.existsSync(full) || !fs.statSync(full).isFile()) return false;
  const buf = fs.readFileSync(full);
  if (buf.length < 8) return false;
  const head = [...buf.slice(0,8)];
  const looksHtml = buf.slice(0,64).toString('utf8').trim().startsWith('<');
  const jpg = SIGS.jpg.every((b,i)=>head[i]===b);
  const png = SIGS.png.every((b,i)=>head[i]===b);
  return (jpg || png) && !looksHtml;
}

if (!fs.existsSync(LOCK)) {
  console.error('LOCKFILE_MISSING: run "npm run lock:images" first.');
  process.exit(1);
}
const lock = JSON.parse(fs.readFileSync(LOCK,'utf8'));

let ok = true;

function checkPath(rel) {
  const full = path.join(PUB, rel.replace(/^\//,''));
  if (!fs.existsSync(full)) { console.error('MISSING:', rel); ok=false; return; }
  if (!isRealImage(full)) { console.error('NOT_A_VALID_IMAGE (HTML/corrupted):', rel); ok=false; }
}

// flat arrays
for (const name of ['threeTabImages','architecturalImages','damageImages','collateralDamageImages']) {
  for (const rel of lock[name] || []) checkPath(rel);
}

// projects
for (const [proj, arr] of Object.entries(lock.projectImages || {})) {
  for (const rel of arr) checkPath(rel);
}

if (!ok) {
  console.error('\n✖ Fix the above issues (case, path, or re-download as real PNG/JPG).');
  process.exit(1);
} else {
  console.log('✓ All locked image paths exist and are valid PNG/JPG.');
}