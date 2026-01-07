import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Dev-only proxy to Pennylane to avoid CORS and to keep the API key on the server side
        '/pennylane': {
          target: 'https://app.pennylane.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/pennylane/, '/api/external/v1'),
          configure: (proxy) => {
            // Attach Authorization header from env on proxy requests
            proxy.on('proxyReq', (proxyReq) => {
              const key = env.VITE_PENNYLANE_API_KEY
              if (key) {
                proxyReq.setHeader('Authorization', `Bearer ${key}`)
                proxyReq.setHeader('Content-Type', 'application/json')
              }
            })
          }
        }
      }
    }
  }
})
