import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/puzzle/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'lucide-vendor': ['lucide-vue-next'],
          'html2canvas-vendor': ['html2canvas']
        }
      }
    }
  }
})
