// Резюме собирается из общей базы и наложения под конкретную позицию.
//
// В базе (content/resume.json) лежит то, что не зависит от вакансии:
// контакты, образование, языки и сами места работы с датами. В варианте
// (content/variants/<id>.json) лежит то, что для разных читателей звучит
// по-разному: заголовок, «о себе», навыки, название должности и проекты
// на каждом месте работы, пет-проекты. Так новое место работы добавляется
// в базу один раз, а даты не могут разъехаться между версиями.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const variants = [
  { id: 'qa', data: 'resume.json', pdf: 'resume.pdf' },
  { id: 'frontend', data: 'resume-frontend.json', pdf: 'resume-frontend.pdf', vue: true },
];

/**
 * Вариант, из которого собирается Vue-версия.
 *
 * Она существует как витрина «одни данные, два фреймворка» и потому уместна
 * на резюме разработчика: нанимающему в тестирование выбор между React и Vue
 * ничего не говорит. Переключатель стека живёт на той же странице, что и эта
 * сборка, иначе он уводил бы на другой текст.
 */
export const vueVariant = variants.find((v) => v.vue) ?? variants[0];

const required = ['name', 'title', 'tagline', 'about', 'skills', 'experience', 'petProjects'];

/** База, поверх которой положен вариант. */
export function loadVariant(root, id) {
  const r = (...p) => resolve(root, ...p);
  const base = JSON.parse(readFileSync(r('content/resume.json'), 'utf8'));
  const overlay = JSON.parse(readFileSync(r('content/variants', `${id}.json`), 'utf8'));

  // Места работы в варианте лежат объектом по id, чтобы нельзя было
  // потерять компанию или перепутать даты: вариант дописывает только
  // должность и проекты.
  const jobs = overlay.experience ?? {};
  const unknown = Object.keys(jobs).filter((key) => !base.experience.some((job) => job.id === key));
  if (unknown.length) {
    throw new Error(`вариант «${id}»: в базе нет мест работы ${unknown.join(', ')}`);
  }
  const experience = base.experience
    .filter((job) => jobs[job.id])
    .map((job) => ({ ...job, ...jobs[job.id] }));

  const merged = { ...base, ...overlay, experience };

  const missing = required.filter((key) => !merged[key]);
  if (missing.length) {
    throw new Error(`вариант «${id}»: не хватает полей ${missing.join(', ')}`);
  }
  return merged;
}
