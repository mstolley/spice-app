/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    /**
     * happy-dom proved to be much faster at launch compared to js-dom
     */
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
});
