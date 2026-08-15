import { createApp } from 'vue';
import './theme.css';
import App from './App.vue';
import { resume } from './lib/resume';

document.title = `${resume.shortName} — ${resume.title}`;

createApp(App).mount('#app');
