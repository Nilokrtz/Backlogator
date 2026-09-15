/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig, Plugin } from 'vite'

function steamProxyPlugin(): Plugin {
  return {
    name: 'steam-cors-proxy',
    configureServer(server) {
      server.middlewares.use('/corsproxy', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.statusCode = 204;
          res.end();
          return;
        }

        try {
          const rawUrl = req.url?.replace(/^\/\??/, '') || '';
          if (!rawUrl) {
            res.statusCode = 400;
            res.end('Missing target URL');
            return;
          }

          // Handle if target url was encoded or raw
          const targetUrl = rawUrl.startsWith('http') ? rawUrl : decodeURIComponent(rawUrl);
          const upstreamRes = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,application/json,*/*;q=0.8',
              'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
              'Cookie': 'birthtime=786240001; mature_content=1; wants_mature_content=1; lastagecheckage=1-0-1995;'
            }
          });

          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', '*');

          const contentType = upstreamRes.headers.get('content-type');
          if (contentType) {
            res.setHeader('Content-Type', contentType);
          }

          const buffer = Buffer.from(await upstreamRes.arrayBuffer());
          res.statusCode = upstreamRes.status;
          res.end(buffer);
        } catch (err: any) {
          console.error('[Steam Proxy Error]:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err?.message || 'Proxy Error' }));
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    steamProxyPlugin()
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
