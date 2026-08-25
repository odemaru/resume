// Раскладывает содержимое резюме, типы и тему по обоим приложениям, чтобы
// оно жило в одном месте (content/), а версии не расходились.
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadVariant, variants, vueVariant } from './variants.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (...p) => resolve(root, ...p);

const targets = [
  {
    // Next собирает все варианты: каждый получает свой адрес.
    variant: variants[0].id,
    json: r('apps/next/data/resume.json'),
    types: r('apps/next/lib/resume-types.ts'),
    css: r('apps/next/app/theme.css'),
    photo: r('apps/next/public/photo.jpg'),
  },
  {
    variant: vueVariant.id,
    json: r('apps/vue/src/data/resume.json'),
    types: r('apps/vue/src/lib/resume-types.ts'),
    css: r('apps/vue/src/theme.css'),
    photo: r('apps/vue/public/photo.jpg'),
  },
];

const types = '// generated from content/types.ts — do not edit\n\n' + readFileSync(r('content/types.ts'), 'utf8');
const css = readFileSync(r('content/theme.css'), 'utf8');

for (const t of targets) {
  const data = loadVariant(root, t.variant);
  for (const f of [t.json, t.types, t.css]) mkdirSync(dirname(f), { recursive: true });
  writeFileSync(t.json, JSON.stringify(data, null, 2) + '\n');
  writeFileSync(t.types, types);
  writeFileSync(t.css, css);
  if (data.photo) {
    mkdirSync(dirname(t.photo), { recursive: true });
    copyFileSync(r('content', data.photo), t.photo);
  }
}

// Остальные варианты нужны только сборке Next — каждый ложится своим файлом
// рядом с основным.
for (const v of variants.slice(1)) {
  const file = resolve(dirname(targets[0].json), v.data);
  writeFileSync(file, JSON.stringify(loadVariant(root, v.id), null, 2) + '\n');
}

console.log(`разложено: Next — ${variants.length} варианта, Vue — «${vueVariant.id}»`);
