import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      { find: '@monitor-fe/core', replacement: path.resolve(__dirname, '../../packages/browser') },
      { find: '@monitor-fe/react', replacement: path.resolve(__dirname, '../../packages/react') },
    ]
  }
})
