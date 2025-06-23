import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true, // Allow access from other devices on the network
    strictPort: true, // Fail if the port is already in use
  },
  plugins: [react(), mkcert()],
})
