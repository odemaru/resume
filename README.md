# resume

Сайт-резюме, собранный дважды: одни и те же данные отрисованы на Next.js и на Vue.

- `content/resume.json` — единственный источник данных, обе версии берут его отсюда;
- `apps/next` — React-версия, лежит в корне сайта;
- `apps/vue` — Vue-версия, лежит в `/vue`;
- `scripts/generate-pdf.mjs` — печатает резюме в PDF через Puppeteer.

Обе версии собираются в GitHub Actions и уезжают на Pages:
https://odemaru.github.io/resume/

Локально:

```
npm install
npm run dev:next   # или dev:vue
```
