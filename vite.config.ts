import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: './src/main.ce.ts',
      name: 'criptowc',
      // the proper extensions will be added
      fileName: 'criptowc',
        formats: ['es', 'cjs', "umd"]
    }
  },
  define: {
    'process.env': process.env
  }
})
