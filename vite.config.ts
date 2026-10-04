import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: './tsconfig.lib.json',
            outDirs: ['dist'],
            insertTypesEntry: true,
        }),
    ],
    server: {
        host: true,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        copyPublicDir: false,
        lib: {
            entry: fileURLToPath(new URL('./src/lib/index.ts', import.meta.url)),
            name: 'MillaiUI',
            formats: ['es'],
            fileName: 'index',
            cssFileName: 'styles',
        },
        rollupOptions: {
            external: ['vue', '@lucide/vue'],
        },
    },
});
