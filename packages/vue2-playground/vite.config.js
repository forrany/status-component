import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue2()
  ],
  root: resolve(__dirname, './'), // Set root to the playground directory
  base: process.env.NODE_ENV === 'production' ? '/status-component/vue2/' : './',
  resolve: {
    alias: {
      // Alias for the component source so playground can import it directly
      '@mcp/status-component-lib/vue2': resolve(__dirname, '../status-component-lib/src/components/StatusIndicatorVue2.vue'),
      '@mcp/status-component-lib/vue2-utils': resolve(__dirname, '../status-component-lib/src/status-mapper.js'),

      // This alias is for Vue 2 development when using `import Vue from 'vue'`
      'vue': 'vue/dist/vue.esm.js'
    },
  },
  server: {
    port: 3002, // Use a different port for Vue 2 playground
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  }
});