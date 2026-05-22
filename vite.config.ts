/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react') || id.includes('react-router-dom')) return 'react-vendor';
          if (id.includes('gsap') || id.includes('motion') || id.includes('lenis')) return 'animation';
          if (id.includes('@phosphor-icons')) return 'icons';
          if (id.includes('react-markdown')) return 'markdown';
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
