import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// relative base so the build works from any subpath (e.g. /resume/vue/ on Pages)
export default defineConfig({
  plugins: [vue()],
  base: './',
});
