import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import aliases from './aliases.config.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: Object.fromEntries(
      Object.entries(aliases).map(([key, value]) => [
        key,
        path.resolve(__dirname, value),
      ])
    ),
  },
})
