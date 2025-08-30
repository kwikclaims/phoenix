import fs from 'node:fs';
import path from 'node:path';

export const PUB = path.join(process.cwd(), 'public');

const SIGS = {
  jpg: [0xFF,0xD8,0xFF],
  png: [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A],
};

export function isRealImage(full) {
  try {
    if (!fs.existsSync(full) || !fs.statSync(full).isFile()) return false;
    const buf = fs.readFileSync(full);
    if (buf.length < 8) return false;
    const head = [...buf.slice(0,8)];
    const looksHtml = buf.slice(0,64).toString('utf8').trim().startsWith('<');
    const jpg = SIGS.jpg.every((b,i)=>head[i]===b);
    const png = SIGS.png.every((b,i)=>head[i]===b);
    return (jpg || png) && !looksHtml;
  } catch { return false; }
}

export function toRelFromPublic(abs) {
  return '/' + path.relative(PUB, abs).replace(/\\/g,'/');
}

export function listFilesRecursive(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) out.push(...listFilesRecursive(p));
    else out.push(p);
  }
  return out;
}

export function normalizeNameForMatch(s) {
  return s
    .toLowerCase()
    .replace(/\.(png|jpg|jpeg)$/g, '')
    .replace(/\bcopy\b/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/[_\s\-]+/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export function extOf(p){ return (p.match(/\.(png|jpg|jpeg)$/i)?.[0]||'').toLowerCase(); }