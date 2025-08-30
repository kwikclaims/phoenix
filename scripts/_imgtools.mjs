import fs from 'node:fs';
import path from 'node:path';

export const ROOT = process.cwd();
export const PUB  = path.join(ROOT, 'public');

const SIGS = {
  jpg: [0xFF,0xD8,0xFF],
  png: [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A],
};

export function isRealImage(abs) {
  try {
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return false;
    const buf = fs.readFileSync(abs);
    if (buf.length < 8) return false;
    const head = [...buf.slice(0,8)];
    const looksHtml = buf.slice(0,64).toString('utf8').trim().startsWith('<');
    const jpg = SIGS.jpg.every((b,i)=>head[i]===b);
    const png = SIGS.png.every((b,i)=>head[i]===b);
    return (jpg || png) && !looksHtml;
  } catch { return false; }
}

export function listRecursive(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) out.push(...listRecursive(p));
    else out.push(p);
  }
  return out;
}

export function toRel(abs) {
  return '/' + path.relative(PUB, abs).replace(/\\/g,'/');
}

export function naturalSort(a,b) {
  return a.localeCompare(b, undefined, { numeric:true, sensitivity:'base' });
}