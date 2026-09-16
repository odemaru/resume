// Печатает каждый вариант резюме в виде текста для полей hh.ru: заголовок,
// специализации, описание каждого места работы, ключевые навыки, «о себе».
// hh не рендерит разметку, поэтому здесь только переносы строк и дефисы.
// Результат ложится в hh/<id>.txt, откуда его можно копировать по полям.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadVariant, variants } from './variants.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'hh');

const section = (title) => `\n======== ${title} ========\n`;

function project(p) {
  const lines = [];
  const site = p.url && !p.url.includes('github.com') ? ` (${p.url.replace(/^https?:\/\//, '')})` : '';
  lines.push(`Проект: ${p.name}${site}`);
  if (p.summary) lines.push(p.summary);
  for (const h of p.highlights) lines.push(`- ${h}`);
  if (p.stack.length) lines.push(`Стек: ${p.stack.join(', ')}`);
  return lines.join('\n');
}

function job(e) {
  const head = `${e.company}, ${e.location}, ${e.period}`;
  return [
    `--- ${head} ---`,
    `Должность: ${e.role}`,
    '',
    e.projects.map(project).join('\n\n'),
  ].join('\n');
}

function keySkills(d) {
  // hh ограничивает число навыков, поэтому дубликаты между группами убираются,
  // а порядок групп задаёт приоритет: первые попадут в поле наверняка.
  const seen = new Set();
  const out = [];
  for (const g of d.skills) {
    for (const s of g.items) {
      const key = s.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(s);
    }
  }
  return out;
}

function about(d) {
  // Навыки в «о себе» не повторяются: для них у hh есть отдельное поле.
  const pets = d.petProjects
    .map((p) => `- ${p.name}: ${p.description}${p.url ? ` ${p.url}` : ''}`)
    .join('\n');
  return [d.about, '', 'Пет-проекты:', pets].join('\n');
}

function render(d) {
  return [
    section('Желаемая должность'),
    d.title,
    section('Специализации'),
    (d.specializations ?? []).join('; '),
    section('Опыт работы'),
    d.experience.map(job).join('\n\n'),
    section('Ключевые навыки'),
    keySkills(d).join(', '),
    section('Обо мне'),
    about(d),
    section('Портфолио (ссылки)'),
    [d.contacts.github, ...d.petProjects.filter((p) => p.url).map((p) => p.url)].join('\n'),
    '',
  ].join('\n');
}

mkdirSync(outDir, { recursive: true });
for (const v of variants) {
  const file = resolve(outDir, `${v.id}.txt`);
  writeFileSync(file, render(loadVariant(root, v.id)));
  console.log(`hh/${v.id}.txt`);
}
