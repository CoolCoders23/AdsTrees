// Desc: Vite config file
// Used the followings as reference:
// https://vitejs.dev/config/
// https://vite-pwa-org.netlify.app/guide/
//https://developer.mozilla.org/en-US/docs/Web/Manifest
//https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
//https://developer.chrome.com/docs/workbox/modules/workbox-build/#which-mode-to-use
// ===================================================

// import libraries
// ===================================================
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// ===================================================

// ===================================================
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'prompt',
            injectRegister: 'auto',
            strategies: 'generateSW',
            includeAssets: [
                'favicon.ico',
                'favicon.svg',
                'apple-touch-icon.png',
                'robots.txt',
                'pwa-64x64.png',
                'pwa-192x192.png',
                'pwa-512x512.png'
            ],
            manifest: {
                name: 'AdsTrees',
                short_name: 'AdsTrees',
                description: 'AdsTrees',
                start_url: '/index.html',
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
                // precaching
                globPatterns: [
                    'src/**/*.{js,jsx,css,html,ico,png,jpg,jpeg,svg,gif}', // Common file types
                    'index.html',// Precache the entry point
                    'public/images/**' // Precache images in public
                ],
                globIgnores: [
                    '**/node_modules/**/*',
                    'sw.js',
                    'workbox-*.js',
                    'dev-dist/**/*',
                    'src/assets/workFlow.md'
                ],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'gstatic-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            },
                        }
                    }
                ]
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
