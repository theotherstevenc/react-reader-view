import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFileSync, mkdirSync, existsSync, renameSync, rmSync } from 'fs'
import { fileURLToPath } from 'url'

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  // Path aliases - must match tsconfig.json
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/popup': path.resolve(__dirname, './src/popup'),
      '@/content': path.resolve(__dirname, './src/content'),
    },
  },
  plugins: [
    react(),
    {
      name: 'post-build',
      closeBundle() {
        // Ensure dist exists
        if (!existsSync('dist')) {
          mkdirSync('dist', { recursive: true })
        }

        // Copy manifest
        copyFileSync('src/manifest.json', 'dist/manifest.json')

        // Copy icons
        if (!existsSync('dist/icons')) {
          mkdirSync('dist/icons', { recursive: true })
        }

        // Copy icon files
        const icons = ['icon16.png', 'icon32.png', 'icon48.png', 'icon128.png']
        icons.forEach((icon) => {
          const src = `public/icons/${icon}`
          const dest = `dist/icons/${icon}`
          if (existsSync(src)) {
            copyFileSync(src, dest)
          }
        })

        // Move popup.html to root of dist
        if (existsSync('dist/src/popup/popup.html')) {
          renameSync('dist/src/popup/popup.html', 'dist/popup.html')
          // Clean up empty directories
          rmSync('dist/src', { recursive: true, force: true })
        }
      },
    },
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Enable source maps for debugging in Chrome DevTools
    sourcemap: true,
    // Support top-level await for dynamic imports
    target: 'es2022',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup/popup.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
