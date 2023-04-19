import { defineConfig } from 'vite';

export default defineConfig({
    base: '/simulator/',
    build: {
        outDir: 'dist',
        assetsDir: '.',
    },
});