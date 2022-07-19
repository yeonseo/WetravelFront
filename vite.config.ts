import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig (({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        resolve: {
            alias: [
                {find: '@', replacement: resolve(__dirname, 'src')}
            ]
        },
        server: {
            proxy: {
                '/main/v1': {
                    target: env.VITE_API,
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
            },
            host: env.VITE_HOST
        },
        plugins: [vue()],
    }
})