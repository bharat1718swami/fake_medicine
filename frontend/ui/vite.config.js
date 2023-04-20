// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                nested1: resolve(__dirname, 'pages/details.html'),
                nested2: resolve(__dirname, 'pages/timeline.html'),
            },
        },
    },
})