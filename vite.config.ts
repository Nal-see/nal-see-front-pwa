import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import { PWAConfig } from './src/lib/config';
import svgr from 'vite-plugin-svgr';

// 개발 환경에서는 PWA 플러그인을 적용하지 않음
const applyPWAInProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    applyPWAInProduction ? VitePWA(PWAConfig) : [],
    svgr(),
  ],
});
