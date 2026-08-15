<script setup lang="ts">
import TopBar from './components/TopBar.vue';
import { resume } from './lib/resume';

const r = resume;
const telHref = `tel:${r.contacts.phone.replace(/[^+\d]/g, '')}`;
const ghShort = r.contacts.github.replace('https://', '');
const year = new Date().getFullYear();
</script>

<template>
  <TopBar />
  <main class="container">
    <!-- Hero -->
    <header class="hero">
      <div class="hero-avatar">ТГ</div>
      <div class="hero-eyebrow"><span class="pulse" /> Открыт к предложениям</div>
      <h1 class="hero-name">{{ r.name }}</h1>
      <p class="hero-title"><b>{{ r.title }}</b> · опыт {{ r.experienceTotal }}</p>
      <p class="hero-tagline">{{ r.tagline }}</p>

      <div class="facts">
        <div class="fact">
          <div class="fact-label">Город</div>
          <div class="fact-value">{{ r.location }}</div>
        </div>
        <div class="fact">
          <div class="fact-label">Возраст</div>
          <div class="fact-value">{{ r.age }} года</div>
        </div>
        <div class="fact">
          <div class="fact-label">Формат работы</div>
          <div class="fact-value">{{ r.workFormats.join(', ') }}</div>
        </div>
        <div class="fact">
          <div class="fact-label">Занятость</div>
          <div class="fact-value">{{ r.employmentTypes.join(', ') }}</div>
        </div>
      </div>

      <div class="contact-row">
        <a class="contact" :href="telHref">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {{ r.contacts.phone }}
        </a>
        <a class="contact" :href="`mailto:${r.contacts.email}`">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-10 6L2 7" />
          </svg>
          {{ r.contacts.email }}
        </a>
        <a class="contact" :href="r.contacts.github" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
          </svg>
          {{ ghShort }}
        </a>
      </div>
    </header>

    <!-- О себе -->
    <section class="section">
      <h2 class="section-title">О себе</h2>
      <p class="about-text">{{ r.about }}</p>
    </section>

    <!-- Опыт -->
    <section class="section">
      <h2 class="section-title">Опыт работы</h2>
      <div class="job" v-for="job in r.experience" :key="job.company">
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

        <article class="project" v-for="p in job.projects" :key="p.name">
          <div class="project-header">
            <div class="project-name">
              <a v-if="p.url" :href="p.url" target="_blank" rel="noreferrer">{{ p.name }}</a>
              <template v-else>{{ p.name }}</template>
            </div>
            <span class="project-role">{{ p.role }}</span>
          </div>
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
        </article>
      </div>
    </section>

    <!-- Навыки -->
    <section class="section">
      <h2 class="section-title">Навыки</h2>
      <div class="skills-grid">
        <div class="skill-group" v-for="g in r.skills" :key="g.group">
          <div class="skill-group-title">{{ g.group }}</div>
          <div class="chips">
            <span v-for="s in g.items" :key="s" class="chip">{{ s }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Образование и языки -->
    <section class="section">
      <h2 class="section-title">Образование и языки</h2>
      <div class="cards">
        <div class="card" v-for="e in r.education" :key="e.institution">
          <div class="card-title">{{ e.institution }}</div>
          <div class="card-sub">{{ e.degree }} · {{ e.year }}</div>
          <div class="card-meta">{{ e.faculty }} · {{ e.location }}</div>
        </div>
        <div class="card">
          <div class="card-title">Языки</div>
          <div class="lang-row" v-for="l in r.languages" :key="l.name">
            <span>{{ l.name }}</span>
            <span class="lang-level">{{ l.level }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Пет-проекты -->
    <section class="section">
      <h2 class="section-title">Пет-проекты</h2>
      <div class="cards">
        <div class="card" v-for="p in r.petProjects" :key="p.name">
          <div class="card-title">{{ p.name }}</div>
          <p class="pet-desc">{{ p.description }}</p>
          <a v-if="p.url" class="contact" :style="{ marginTop: '14px' }" :href="p.url" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
            </svg>
            Открыть на GitHub
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div>© {{ year }} {{ r.shortName }} · {{ r.title }}</div>
      <div class="footer-note">
        Vue 3 + Vite · <a href="../">та же страница на Next.js</a>
      </div>
    </div>
  </footer>
</template>
