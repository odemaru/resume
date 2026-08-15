// Builds a print-ready PDF of the resume from content/resume.json using a
// headless Chromium (Puppeteer). The "PDF" button on the site serves the result.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (...p) => resolve(root, ...p);

const outputs = [r('apps/next/public/resume.pdf'), r('apps/vue/public/resume.pdf')];
const accent = '#0b57d0';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const chips = (arr = []) =>
  arr.length ? `<div class="chips">${arr.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>` : '';

function project(p) {
  const highlights = (p.highlights || []).map((h) => `<li><strong>${esc(h.title)}.</strong> ${esc(h.text)}</li>`).join('');
  const metrics = p.metrics?.length ? `<div class="metrics">${p.metrics.map((m) => `<span>${esc(m)}</span>`).join('')}</div>` : '';
  const brands = p.brands?.length ? chips(p.brands) : '';
  return `
    <div class="project">
      <div class="project-head">
        <span class="project-name">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>
        <span class="project-role">${esc(p.role)}</span>
      </div>
      <p class="summary">${esc(p.summary)}</p>
      ${chips(p.stack)}
      ${brands}
      ${highlights ? `<ul class="highlights">${highlights}</ul>` : ''}
      ${metrics}
    </div>`;
}

function job(e) {
  return `
    <div class="job">
      <div class="job-head">
        <div>
          <span class="company">${e.companyUrl ? `<a href="${esc(e.companyUrl)}">${esc(e.company)}</a>` : esc(e.company)}</span>
          <span class="job-role">${esc(e.role)}</span>
        </div>
        <div class="job-period"><div>${esc(e.period)}</div><div class="muted">${esc(e.duration)}</div></div>
      </div>
      ${(e.projects || []).map(project).join('')}
    </div>`;
}

function html(d) {
  const skills = d.skills.map((g) => `<div class="skill-group"><h4>${esc(g.group)}</h4>${chips(g.items)}</div>`).join('');
  const education = d.education
    .map((ed) => `<div class="edu"><strong>${esc(ed.institution)}</strong> — ${esc(ed.degree)}, ${esc(ed.year)}<div class="muted">${esc(ed.faculty)}</div></div>`)
    .join('');
  const languages = d.languages.map((l) => `${esc(l.name)} — ${esc(l.level)}`).join(' · ');
  const pets = d.petProjects.map((p) => `<div class="pet"><strong>${esc(p.name)}.</strong> ${esc(p.description)}</div>`).join('');

  return `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font: 10.5px/1.5 'Roboto', -apple-system, 'Segoe UI', Arial, sans-serif; color: #1a1c1e; }
  a { color: ${accent}; text-decoration: none; }
  .page { padding: 34px 40px; }
  header { border-bottom: 2px solid ${accent}; padding-bottom: 14px; margin-bottom: 16px; }
  h1 { font-size: 24px; font-weight: 500; }
  .title { color: ${accent}; font-size: 13px; font-weight: 500; margin-top: 2px; }
  .tagline { color: #43474e; margin-top: 6px; font-size: 11px; max-width: 82%; }
  .contacts { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 4px 16px; font-size: 10px; color: #33333c; }
  .contacts b { color: #6c6c78; font-weight: 500; }
  h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: ${accent}; margin: 18px 0 9px; border-bottom: 1px solid #e2e2e9; padding-bottom: 4px; }
  .about { color: #33333c; }
  .job { margin-bottom: 12px; }
  .job-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
  .company { font-weight: 700; font-size: 12.5px; }
  .job-role { color: #55555f; margin-left: 8px; font-size: 10.5px; }
  .job-period { text-align: right; font-size: 9.5px; white-space: nowrap; }
  .muted { color: #9a9aa6; }
  .project { margin: 8px 0; padding-left: 11px; border-left: 2px solid #e2e2e9; }
  .project-head { display: flex; justify-content: space-between; align-items: baseline; }
  .project-name { font-weight: 600; font-size: 11px; }
  .project-role { color: ${accent}; font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .summary { color: #44444e; margin: 3px 0 6px; }
  .chips { display: flex; flex-wrap: wrap; gap: 4px; margin: 5px 0; }
  .chip { background: #eef0f4; color: #43474e; border-radius: 4px; padding: 1.5px 6px; font-size: 8.5px; }
  .highlights { list-style: none; margin: 6px 0 2px; }
  .highlights li { position: relative; padding-left: 11px; margin-bottom: 3px; color: #3a3a44; }
  .highlights li::before { content: '•'; position: absolute; left: 2px; color: ${accent}; }
  .metrics { display: flex; flex-wrap: wrap; gap: 4px 6px; margin-top: 6px; }
  .metrics span { border: 1px solid ${accent}33; color: ${accent}; border-radius: 4px; padding: 1.5px 7px; font-size: 8.5px; font-weight: 600; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; }
  .skill-group h4 { font-size: 10px; margin-bottom: 4px; color: #33333c; }
  .edu, .pet { margin-bottom: 6px; color: #33333c; }
  .footer { margin-top: 16px; text-align: center; color: #9a9aa6; font-size: 8.5px; }
</style></head><body><div class="page">
  <header>
    <h1>${esc(d.name)}</h1>
    <div class="title">${esc(d.title)} · опыт ${esc(d.experienceTotal)}</div>
    <div class="tagline">${esc(d.tagline)}</div>
    <div class="contacts">
      <span><b>Телефон:</b> ${esc(d.contacts.phone)}</span>
      <span><b>Email:</b> ${esc(d.contacts.email)}</span>
      <span><b>GitHub:</b> <a href="${esc(d.contacts.github)}">${esc(d.contacts.github.replace('https://', ''))}</a></span>
      <span><b>Город:</b> ${esc(d.location)}</span>
      <span><b>Формат:</b> ${d.workFormats.map(esc).join(', ')}</span>
    </div>
  </header>

  <h3>О себе</h3>
  <p class="about">${esc(d.about)}</p>

  <h3>Опыт работы</h3>
  ${d.experience.map(job).join('')}

  <h3>Навыки</h3>
  <div class="grid2">${skills}</div>

  <h3>Образование и языки</h3>
  ${education}
  <div class="edu"><strong>Языки:</strong> ${languages}</div>

  <h3>Пет-проекты</h3>
  ${pets}

  <div class="footer">${esc(d.contacts.email)} · ${esc(d.contacts.phone)}</div>
</div></body></html>`;
}

const data = JSON.parse(readFileSync(r('content/resume.json'), 'utf8'));
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setContent(html(data), { waitUntil: 'networkidle0' });
const pdf = await page.pdf({ format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await browser.close();

for (const out of outputs) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, pdf);
}
console.log(`wrote resume.pdf (${(pdf.length / 1024).toFixed(0)} KB) to ${outputs.length} apps`);
