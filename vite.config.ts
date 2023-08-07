import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        define: {
            process: process
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
                '/main/v1': {
                    target: env.VITE_API,
                    changeOrigin: true,
                    secure: false,
                    ws: true
                }
            },
            host: env.VITE_HOST,
            port: 3030
        },
        plugins: [vue()]
    };
});
