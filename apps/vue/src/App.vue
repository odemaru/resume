<script setup lang="ts">
import TopBar from './components/TopBar.vue';
import { resume } from './lib/resume';

const r = resume;
const telHref = `tel:${r.contacts.phone.replace(/[^+\d]/g, '')}`;
const ghShort = r.contacts.github.replace('https://', '');
const year = new Date().getFullYear();

const facts: [string, string][] = [
  ['Город', r.location],
  ['Возраст', `${r.age} года`],
  ['Формат работы', r.workFormats.join(', ')],
  ['Занятость', r.employmentTypes.join(', ')],
];
</script>

<template>
  <TopBar />
  <main class="container">
    <div class="bento">
      <header class="card hero span-3">
        <div class="hero-avatar">ТГ</div>
        <div class="hero-eyebrow"><span class="pulse" /> Открыт к предложениям</div>
        <h1 class="hero-name">{{ r.name }}</h1>
        <p class="hero-title"><b>{{ r.title }}</b> · опыт {{ r.experienceTotal }}</p>
        <p class="hero-tagline">{{ r.tagline }}</p>
      </header>

      <section class="card span-1">
        <div class="card-label">Контакты</div>
        <div class="contact-list">
          <a class="contact-line" :href="telHref">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            <div>
              <div class="contact-k">Телефон</div>
              <div class="contact-v">{{ r.contacts.phone }}</div>
            </div>
          </a>
          <a class="contact-line" :href="`mailto:${r.contacts.email}`">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
            <div>
              <div class="contact-k">Почта</div>
              <div class="contact-v">{{ r.contacts.email }}</div>
            </div>
          </a>
          <a class="contact-line" :href="r.contacts.github" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
            <div>
              <div class="contact-k">GitHub</div>
              <div class="contact-v">{{ ghShort }}</div>
            </div>
          </a>
        </div>
      </section>

      <div class="card fact span-1" v-for="[label, value] in facts" :key="label">
        <div class="fact-label">{{ label }}</div>
        <div class="fact-value">{{ value }}</div>
      </div>

      <section class="card span-4">
        <div class="card-label">О себе</div>
        <p class="about-text">{{ r.about }}</p>
      </section>

      <section class="card span-4" v-for="job in r.experience" :key="job.company">
        <div class="job-header">
          <div>
            <div class="job-company">
              <a v-if="job.companyUrl" :href="job.companyUrl" target="_blank" rel="noreferrer">{{ job.company }}</a>
              <template v-else>{{ job.company }}</template>
              <span v-if="job.current" class="badge-current">
                <span class="pulse" :style="{ width: '6px', height: '6px' }" /> сейчас
              </span>
            </div>
            <div class="job-role">{{ job.role }}</div>
            <div v-if="job.industry" class="job-industry">{{ job.industry }}</div>
          </div>
          <div class="job-period">
            {{ job.period }}<br />
            <span class="job-duration">{{ job.duration }}</span>
          </div>
        </div>

        <details class="proj" v-for="(p, i) in job.projects" :key="p.name" :open="job.current && i === 0">
          <summary>
            <span>
              <span class="project-name">{{ p.name }}</span>
              <span class="project-role">{{ p.role }}</span>
            </span>
            <span class="chev">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </summary>
          <div class="proj-body">
            <p v-if="p.summary" class="project-summary">{{ p.summary }}</p>
            <div v-if="p.stack.length" class="chips">
              <span v-for="s in p.stack" :key="s" class="chip mono">{{ s }}</span>
            </div>
            <div v-if="p.brands && p.brands.length" class="brands">
              <span v-for="b in p.brands" :key="b" class="brand-chip">{{ b }}</span>
            </div>
            <ul v-if="p.highlights.length" class="highlights">
              <li v-for="h in p.highlights" :key="h.title" class="highlight">
                <span class="highlight-title">{{ h.title }}.</span> {{ h.text }}
              </li>
            </ul>
            <div v-if="p.metrics && p.metrics.length" class="metrics">
              <span v-for="m in p.metrics" :key="m" class="metric">{{ m }}</span>
            </div>
          </div>
        </details>
      </section>

      <section class="card span-4">
        <div class="card-label">Навыки</div>
        <div class="skills-grid">
          <div class="skill-group" v-for="g in r.skills" :key="g.group">
            <div class="skill-group-title">{{ g.group }}</div>
            <div class="chips">
              <span v-for="s in g.items" :key="s" class="chip">{{ s }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="card span-2">
        <div class="card-label">Образование</div>
        <div v-for="e in r.education" :key="e.institution">
          <div class="card-title">{{ e.institution }}</div>
          <div class="card-sub">{{ e.degree }} · {{ e.year }}</div>
          <div class="card-meta">{{ e.faculty }} · {{ e.location }}</div>
        </div>
      </section>

      <section class="card span-2">
        <div class="card-label">Языки</div>
        <div class="lang-row" v-for="l in r.languages" :key="l.name">
          <span>{{ l.name }}</span>
          <span class="lang-level">{{ l.level }}</span>
        </div>
      </section>

      <section class="card span-4">
        <div class="card-label">Пет-проекты</div>
        <div v-for="p in r.petProjects" :key="p.name">
          <div class="card-title">{{ p.name }}</div>
          <p class="pet-desc">{{ p.description }}</p>
          <a v-if="p.url" class="contact-line" :style="{ marginTop: '12px' }" :href="p.url" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
            Открыть на GitHub
          </a>
        </div>
      </section>
    </div>
  </main>

  <footer class="footer">
    <div>© {{ year }} {{ r.shortName }} · {{ r.title }}</div>
    <div class="footer-note">Vue 3 + Vite · <a href="../">та же страница на Next.js</a></div>
  </footer>
</template>
