import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

const offenders = [];

function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?)$/.test(f)) {
      const src = fs.readFileSync(p,'utf8');
      // naive check: <img src="/images/...."> literals
      if (/<img[^>]+src\s*=\s*["'`](\/images\/[^"'`]+)["'`]/i.test(src)) {
        offenders.push(path.relative(ROOT, p));
      }
    }
  }
}
walk(SRC);

if (offenders.length) {
  console.error('Found raw <img src="/images/..."> literals. Use <SafeImg srcPath={...} /> with the registry.\n', offenders.join('\n'));
  process.exit(1);
} else {
  console.log('✓ No raw <img src="/images/..."> literals detected.');
}