import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/witcher-3-website/', // добавьте это для правильного пути на GitHub Pages
})
