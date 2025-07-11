import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'StatusComponentVue3',
      fileName: (format) => format === 'es' ? 'status-component-vue3.mjs' : 'status-component-vue3.umd.js',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    // 确保所有依赖都被内联，不依赖外部模块
    commonjsOptions: {
      include: [/src/, /core/]
    }
  },
});
