import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api/cloudflare': {
          target: 'https://api.cloudflare.com/client/v4',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/cloudflare/, ''),
          headers: {
            'User-Agent': 'FormulaCalcKit-Cloudflare-Client/1.0',
          },
        },
      },
    },
  };
});
