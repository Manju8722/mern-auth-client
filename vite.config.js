import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-auth-server-0zi8.onrender.com:4000', // Redirect everything to port 4000
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
