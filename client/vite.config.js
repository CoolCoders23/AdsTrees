// Desc: Vite config file
// ===================================================

// import libraries
// ===================================================
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// ===================================================

// https://vitejs.dev/config/
// ===================================================
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'prompt',
            injectRegister: 'auto',
            strategies: 'generateSW',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
            manifest: {
                name: 'AdsTrees',
                short_name: 'AdsTrees',
                description: 'AdsTrees',
                theme_color: '#4CAF50',
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: 'pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ],
            },
            workbox: {
                sourcemap: true,
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            },
            // to be used only for development mode
            devOptions: {
                enabled: false,
            },
        }),
    ],
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/graphql': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
// ===================================================
