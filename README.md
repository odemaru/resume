# resume

Сайт-резюме, собранный дважды: одни и те же данные отрисованы на Next.js и на Vue.

Резюме существует в двух вариантах под разные вакансии:

- `/`: QA Automation (`content/variants/qa.json`);
- `/frontend`: Frontend-разработчик (`content/variants/frontend.json`).

Устройство данных:

- `content/resume.json`: общая база: контакты, образование, языки, места работы с датами;
- `content/variants/*.json`: то, что зависит от вакансии: заголовок, «о себе», навыки,
  должность и проекты на каждом месте работы, пет-проекты. Места работы в варианте
  привязаны к базе по `id`, поэтому даты и названия компаний не расходятся;
- `content/types.ts`: форма данных, копируется в оба приложения;
- `apps/next`: React-версия, лежит в корне сайта;
- `apps/vue`: Vue-версия, собирается из frontend-варианта и лежит в `/vue`;
- `scripts/generate-pdf.mjs`: печатает каждый вариант в PDF через Puppeteer;
- `scripts/hh-text.mjs`: печатает каждый вариант текстом по полям hh.ru в `hh/*.txt`.

Обе версии собираются в GitHub Actions и уезжают на Pages:
https://odemaru.github.io/resume/

Локально:

```
npm install
npm run dev:next   # или dev:vue
npm run pdf        # PDF в apps/next/public и apps/vue/public
npm run hh         # тексты для hh.ru в hh/
```
