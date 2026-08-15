import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        en: fileURLToPath(new URL('./en/index.html', import.meta.url)),
        zh: fileURLToPath(new URL('./zh/index.html', import.meta.url)),
        es: fileURLToPath(new URL('./es/index.html', import.meta.url)),
        de: fileURLToPath(new URL('./de/index.html', import.meta.url)),
        ja: fileURLToPath(new URL('./ja/index.html', import.meta.url)),
      },
    },
  },
})
