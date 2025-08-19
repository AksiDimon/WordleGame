import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  server: {
    headers: {
      // Разрешаем попапы
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      // COEP лучше выключить, иначе снова будут блоки
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
    },
  },
});

