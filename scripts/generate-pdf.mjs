// Печатает каждый вариант резюме в PDF через headless Chromium (Puppeteer).
// Кнопка «PDF» на сайте отдаёт этот файл, поэтому он должен читаться
// как обычное резюме: две страницы, сначала опыт, без украшений.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { loadVariant, variants, vueVariant } from './variants.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (...p) => resolve(root, ...p);

const accent = '#0b57d0';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const link = (url, text) => `<a href="${esc(url)}">${esc(text)}</a>`;

function project(p) {
  const bullets = p.highlights.map((h) => `<li>${esc(h)}</li>`).join('');
  return `
    <div class="project">
      <div class="project-head">
        <span class="project-name">${p.url ? link(p.url, p.name) : esc(p.name)}</span>
        ${p.role ? `<span class="project-role">${esc(p.role)}</span>` : ''}
      </div>
      <p class="summary">${esc(p.summary)}</p>
      ${bullets ? `<ul class="bullets">${bullets}</ul>` : ''}
      ${p.stack.length ? `<p class="stack"><b>Стек:</b> ${esc(p.stack.join(', '))}</p>` : ''}
    </div>`;
}

function job(e) {
  return `
    <div class="job">
      <div class="job-head">
        <div>
          <div class="company">${e.companyUrl ? link(e.companyUrl, e.company) : esc(e.company)}</div>
          <div class="job-role">${esc(e.role)}</div>
        </div>
        <div class="job-period"><div>${esc(e.period)}</div><div class="muted">${esc(e.duration)}</div></div>
      </div>
      ${e.projects.map(project).join('')}
    </div>`;
}

function html(d) {
  const skills = d.skills
    .map((g) => `<div class="skill-row"><b>${esc(g.group)}:</b> ${esc(g.items.join(', '))}</div>`)
    .join('');
  const education = d.education
    .map((ed) => `<div class="edu"><b>${esc(ed.institution)}</b>, ${esc(ed.degree)}, выпуск ${esc(ed.year)}<div class="muted">${esc(ed.faculty)}</div></div>`)
    .join('');
  const languages = d.languages.map((l) => `${esc(l.name)}: ${esc(l.level)}`).join(', ');
  const pets = d.petProjects
    .map((p) => `<div class="pet"><b>${p.url ? link(p.url, p.name) : esc(p.name)}.</b> ${esc(p.description)}</div>`)
    .join('');
  const about = d.about.split('\n\n').map((par) => `<p class="about">${esc(par)}</p>`).join('');

  return `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font: 10px/1.45 'Roboto', -apple-system, 'Segoe UI', Arial, sans-serif; color: #1a1c1e; }
  a { color: ${accent}; text-decoration: none; }
  b { font-weight: 600; }
  header { border-bottom: 2px solid ${accent}; padding-bottom: 10px; margin-bottom: 10px; display: flex; align-items: flex-start; gap: 16px; }
  .header-text { flex: 1; min-width: 0; }
  .photo { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; flex: none; order: 2; }
  h1 { font-size: 21px; font-weight: 500; }
  .title { color: ${accent}; font-size: 12px; font-weight: 500; margin-top: 2px; }
  .tagline { color: #43474e; margin-top: 5px; font-size: 10px; }
  .contacts { margin-top: 7px; display: flex; flex-wrap: wrap; gap: 3px 14px; font-size: 9.5px; color: #33333c; }
  .contacts b { color: #6c6c78; font-weight: 500; }
  h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${accent}; margin: 12px 0 6px; border-bottom: 1px solid #e2e2e9; padding-bottom: 3px; }
  .about { color: #33333c; margin-bottom: 4px; }
  .job { margin-bottom: 8px; }
  .job-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 3px; }
  .company { font-weight: 700; font-size: 12px; }
  .job-role { color: #55555f; font-size: 10.5px; }
  .job-period { text-align: right; font-size: 9.5px; white-space: nowrap; }
  .muted { color: #9a9aa6; }
  .project { margin: 6px 0; padding-left: 10px; border-left: 2px solid #e2e2e9; }
  .project-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .project-name { font-weight: 600; font-size: 10.5px; }
  .project-role { color: ${accent}; font-size: 8.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; white-space: nowrap; }
  .summary { color: #44444e; margin: 2px 0 4px; }
  .bullets { list-style: none; margin: 3px 0 3px; }
  .bullets li { position: relative; padding-left: 10px; margin-bottom: 2px; color: #3a3a44; }
  .bullets li::before { content: '•'; position: absolute; left: 1px; color: ${accent}; }
  .stack { color: #55555f; font-size: 9.5px; margin-top: 2px; }
  .skill-row { margin-bottom: 3px; color: #33333c; }
  .edu, .pet { margin-bottom: 5px; color: #33333c; }
  .footer { margin-top: 12px; text-align: center; color: #9a9aa6; font-size: 8.5px; }

  /* Разрывы страниц. Без этих правил карточка проекта рвётся пополам:
     заголовок остаётся внизу листа, текст уезжает на следующий.
     Запрет ставится на мелкие единицы, а не на блок целиком, иначе
     длинный проект целиком уедет на новую страницу и оставит пустоту. */
  header { break-inside: avoid; }
  h3 { break-after: avoid; }
  .job-head, .project-head { break-inside: avoid; break-after: avoid; }
  .bullets li, .skill-row, .edu, .pet, .summary, .stack { break-inside: avoid; }
</style></head><body>
  <header>
    ${d.photoDataUri ? `<img class="photo" src="${d.photoDataUri}" alt="">` : ''}
    <div class="header-text">
      <h1>${esc(d.name)}</h1>
      <div class="title">${esc(d.title)}</div>
      <div class="tagline">${esc(d.tagline)}</div>
      <div class="contacts">
        <span><b>Телефон:</b> ${esc(d.contacts.phone)}</span>
        <span><b>Email:</b> ${esc(d.contacts.email)}</span>
        <span><b>GitHub:</b> ${link(d.contacts.github, d.contacts.github.replace('https://', ''))}</span>
        <span><b>Город:</b> ${esc(d.location)}</span>
        <span><b>Формат:</b> ${d.workFormats.map(esc).join(', ')}</span>
        <span><b>Опыт:</b> ${esc(d.experienceTotal)}</span>
      </div>
    </div>
  </header>

  <h3>О себе</h3>
  ${about}

  <h3>Опыт работы</h3>
  ${d.experience.map(job).join('')}

  <h3>Навыки</h3>
  ${skills}

  <h3>Образование и языки</h3>
  ${education}
  <div class="edu"><b>Языки:</b> ${languages}</div>

  <h3>Пет-проекты</h3>
  ${pets}

  <div class="footer">${esc(d.contacts.email)} · ${esc(d.contacts.phone)} · odemaru.github.io/resume</div>
</body></html>`;
}

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

for (const v of variants) {
  const data = loadVariant(root, v.id);
  // Фото читаем с диска и вшиваем в разметку: setContent отдаётся браузеру
  // без базового адреса, и относительный путь до файла не разрешится.
  if (data.photo) {
    data.photoDataUri = `data:image/jpeg;base64,${readFileSync(r('content', data.photo)).toString('base64')}`;
  }

  const page = await browser.newPage();
  await page.setContent(html(data), { waitUntil: 'networkidle0' });
  // Поля задаются здесь, а не отступом в вёрстке: CSS-padding достаётся только
  // первой и последней странице, а поля Puppeteer каждой.
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' },
  });
  await page.close();

  // Vue-сборке достаётся её собственный вариант. Имя resume.pdf локально
  // для неё и зашито в её же ссылке, поэтому файл кладётся под ним.
  const outputs = [r('apps/next/public', v.pdf)];
  if (v === vueVariant) outputs.push(r('apps/vue/public/resume.pdf'));

  for (const out of outputs) {
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, pdf);
  }
  console.log(`${v.pdf}: ${(pdf.length / 1024).toFixed(0)} KB, ${outputs.length} шт.`);
}

await browser.close();
