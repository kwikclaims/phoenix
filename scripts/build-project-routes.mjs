import fs from 'node:fs';
import path from 'node:path';
import { ROOT, PUB, listRecursive, isRealImage, toRel, naturalSort } from './_imgtools.mjs';

const ROUTES = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'project.routes.json'), 'utf8'));
const REG_TS = path.join(ROOT, 'src', 'data', 'imageRegistry.ts');

// scan all candidates
const all = listRecursive(path.join(PUB, 'images'))
  .filter(p => /\.(png|jpg|jpeg)$/i.test(p))
  .filter(isRealImage)
  .map(abs => ({ abs, rel: toRel(abs), base: path.basename(abs).toLowerCase(), absLower: abs.toLowerCase() }));

function matchesPrefix(entryAbsLower, route) {
  // route like "uploads/photo_" or "3105-may-green-.../"
  const needle = route.toLowerCase().replace(/^\/?images\//,''); // allow "images/..." or not
  // folder route → include everything under that folder
  if (needle.endsWith('/')) return entryAbsLower.includes(`/images/${needle}`);
  // filename/prefix route
  return entryAbsLower.includes(`/images/${needle}`);
}

function resolveRoutes(routeList) {
  const hits = new Set();
  for (const route of routeList) {
    for (const f of all) {
      if (matchesPrefix(f.absLower, route)) hits.add(f.rel);
    }
  }
  // sort natural, stable
  return [...hits].sort(naturalSort);
}

// Build object (dedupe keys and arrays)
const projectImages = {};
for (const [projectName, routes] of Object.entries(ROUTES)) {
  projectImages[projectName] = resolveRoutes(routes);
}

// Read current registry (keep other exports intact)
const src = fs.existsSync(REG_TS) ? fs.readFileSync(REG_TS, 'utf8') : '';
const kept = {
  threeTabImages: (src.match(/export const threeTabImages\s*=\s*(\[[\s\S]*?\])/)?.[1]) ?? '[]',
  architecturalImages: (src.match(/export const architecturalImages\s*=\s*(\[[\s\S]*?\])/)?.[1]) ?? '[]',
  damageImages: (src.match(/export const damageImages\s*=\s*(\[[\s\S]*?\])/)?.[1]) ?? '[]',
  collateralDamageImages: (src.match(/export const collateralDamageImages\s*=\s*(\[[\s\S]*?\])/)?.[1]) ?? '[]'
};

const out = `// AUTO-GENERATED from project.routes.json by scripts/build-project-routes.mjs
// Do not edit by hand; change routes in project.routes.json and re-run the script.

export const threeTabImages = ${kept.threeTabImages};

export const architecturalImages = ${kept.architecturalImages};

export const damageImages = ${kept.damageImages};

export const collateralDamageImages = ${kept.collateralDamageImages};

export const projectImages = ${JSON.stringify(projectImages, null, 2)} as const;
`;

fs.writeFileSync(REG_TS, out, 'utf8');
console.log('[build-project-routes] Wrote src/data/imageRegistry.ts with', Object.keys(projectImages).length, 'projects.');