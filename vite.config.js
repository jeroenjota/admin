import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3456',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:3456',
        changeOrigin: true
      }

    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // <--- hier staat je src map
    },
  },

  plugins: [
    vue(),
    tailwindcss()
  ],

})
