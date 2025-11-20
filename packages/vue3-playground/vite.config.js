import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  root: resolve(__dirname, './'), // Set root to the playground directory
  base: process.env.NODE_ENV === 'production' ? '/status-component/' : './',
  resolve: {
    alias: {
      // Alias for the component source so playground can import it directly
      // This is crucial for local development of the component itself

    },
  },
  server: {
    port: 3001, // Use a different port for Vue 3 playground
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  }
});