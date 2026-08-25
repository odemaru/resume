// Copies the shared resume data, types and theme into both apps, so the
// content lives in one place (content/) and both versions stay identical.
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (...p) => resolve(root, ...p);

const targets = [
  { json: r('apps/next/data/resume.json'), types: r('apps/next/lib/resume-types.ts'), css: r('apps/next/app/theme.css'), photo: r('apps/next/public/photo.jpg') },
  { json: r('apps/vue/src/data/resume.json'), types: r('apps/vue/src/lib/resume-types.ts'), css: r('apps/vue/src/theme.css'), photo: r('apps/vue/public/photo.jpg') },
];

const data = JSON.parse(readFileSync(r('content/resume.json'), 'utf8'));
if (!data.name || !Array.isArray(data.experience)) {
  throw new Error('content/resume.json is missing required fields (name, experience)');
}

const types = '// generated from content/types.ts — do not edit\n\n' + readFileSync(r('content/types.ts'), 'utf8');
const css = readFileSync(r('content/theme.css'), 'utf8');

for (const t of targets) {
  for (const f of [t.json, t.types, t.css]) mkdirSync(dirname(f), { recursive: true });
  copyFileSync(r('content/resume.json'), t.json);
  if (data.photo) {
    mkdirSync(dirname(t.photo), { recursive: true });
    copyFileSync(r('content', data.photo), t.photo);
  }
  writeFileSync(t.types, types);
  writeFileSync(t.css, css);
}

console.log(`synced content into ${targets.length} apps`);
