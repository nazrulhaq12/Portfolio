import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/nazrulhaq12', // 👈 replace with your GitHub repo name
  css: {
    postcss: './postcss.config.js',
  },
})



