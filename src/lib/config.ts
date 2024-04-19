import { type VitePWAOptions } from 'vite-plugin-pwa';

export const PWAConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: [
    'favicon.svg',
    'favicon.ico',
    'robots.txt',
    'apple-touch-icon.png',
  ],
  manifest: {
    name: 'nalsee',
    short_name: 'nalsee',
    description: '위치기반 날씨&패션 SNS',
    theme_color: '#3BA5FF',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    icons: [
      {
        src: 'icon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: 'icon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
  workbox: {
    sourcemap: true,
  },
};
