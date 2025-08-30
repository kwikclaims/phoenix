import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'public/images');

function isHtmlFile(p) {
  if (!fs.existsSync(p) || !fs.statSync(p).isFile()) return false;
  try {
    const buf = fs.readFileSync(p, 'utf8').slice(0, 100).toLowerCase();
    return buf.includes('<!doctype html') || buf.includes('<html');
  } catch (e) {
    // If we can't read as text, it's probably a real image
    return false;
  }
}

function cleanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  for (const item of fs.readdirSync(dir)) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Recursively clean subdirectories
      cleanDirectory(itemPath);
    } else if (stat.isFile()) {
      try {
        if (isHtmlFile(itemPath)) {
          console.log('❌ Removing HTML impostor:', path.relative(ROOT, itemPath));
          fs.unlinkSync(itemPath);
        } else {
          console.log('✅ Keeping real file:', path.relative(ROOT, itemPath));
        }
      } catch (e) {
        console.error('Error inspecting', path.relative(ROOT, itemPath), e);
      }
    }
  }
}

console.log('🧹 Cleaning HTML impostors from images directory...');
cleanDirectory(IMAGES_DIR);
console.log('✅ Cleanup complete!');