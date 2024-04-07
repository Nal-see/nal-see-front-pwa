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
    name: 'NalSee SNS',
    short_name: 'NalSee',
    description: 'Local Based Weather & Fashion SNS',
    theme_color: '#ffffff',
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
