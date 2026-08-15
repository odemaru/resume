<script setup lang="ts">
// '../' points back to the Next build one level up
const NEXT_URL = import.meta.env.VITE_NEXT_URL || '../';
</script>

<template>
  <div class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <span class="brand-badge">ТГ</span>
        <span>Тимофей Гавриков</span>
      </div>
      <div class="topbar-actions">
        <div class="switch" role="group" aria-label="Переключатель стека">
          <a class="switch-opt" :href="NEXT_URL">
            <svg viewBox="-11.5 -10.23 23 20.46">
              <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
              <g stroke="#61dafb" stroke-width="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
            React · Next.js
          </a>
          <span class="switch-opt active" aria-current="true">
            <svg viewBox="0 0 261 226">
              <path fill="#41b883" d="M161 0l-30.5 52.8L100 0H0l130.5 226L261 0z" />
              <path fill="#35495e" d="M161 0l-30.5 52.8L100 0H52l78.5 136L209 0z" />
            </svg>
            Vue
          </span>
        </div>
        <a class="btn" href="resume.pdf" download aria-label="Скачать PDF-резюме">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          PDF
        </a>
      </div>
    </div>
  </div>
</template>
