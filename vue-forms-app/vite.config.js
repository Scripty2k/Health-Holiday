import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

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
  build: {
    // 1. Set output to the assets folder in the parent directory
    outDir: path.resolve(__dirname, '../assets'),
    
    // 2. Clear the old files in assets before generating new ones
    emptyOutDir: true,
    
    rollupOptions: {
      output: {
        // 3. Remove hashes from filenames so your WordPress PHP code 
        // doesn't need to be updated every time you build.
        entryFileNames: `index.js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `index.[ext]`
      }
    }
  }
})