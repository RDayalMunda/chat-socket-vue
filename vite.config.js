import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true,
  },
  build: {
    lib: {
      // entry: 'src/main.ce.js', // or .ts
      entry: 'src/index.js',
      name: 'ChatBandhu',
      formats: ['iife'], // iife is great for standalone builds
      fileName: () => 'chat-bandhu.js',
    },
    rollupOptions: {
      // ✅ Don't externalize 'vue'
      // This will bundle Vue into your output
      external: [],
    },
  },
})
