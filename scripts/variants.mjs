// Резюме собирается из общей базы и наложения под конкретную позицию.
//
// Различаются между версиями всего четыре поля: заголовок, слоган, «о себе»
// и состав навыков. Всё остальное — опыт, образование, контакты, фото —
// общее. Поэтому вариант хранится не копией файла, а наложением: добавленная
// работа появляется в обеих версиях сама, и разъехаться им негде.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const variants = [
  { id: 'qaa', data: 'resume.json', pdf: 'resume.pdf' },
  { id: 'fullstack', data: 'resume-fullstack.json', pdf: 'resume-fullstack.pdf' },
];

const required = ['name', 'title', 'tagline', 'about', 'skills', 'experience'];

/** База, поверх которой положен вариант. */
export function loadVariant(root, id) {
  const r = (...p) => resolve(root, ...p);
  const base = JSON.parse(readFileSync(r('content/resume.json'), 'utf8'));
  const overlay = JSON.parse(readFileSync(r('content/variants', `${id}.json`), 'utf8'));
  const merged = { ...base, ...overlay };

  const missing = required.filter((key) => !merged[key]);
  if (missing.length) {
    throw new Error(`вариант «${id}»: не хватает полей — ${missing.join(', ')}`);
  }
  return merged;
}
