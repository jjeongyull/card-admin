import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/assets/styles/_variables.scss" as *;
        @use "@/assets/styles/fonts.scss" as *;
        `, // 모든 SCSS 파일에 자동 포함
      },
    },
  }
})
