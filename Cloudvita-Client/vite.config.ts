import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths(), svgrPlugin()],
  server: {
    port: 5174
  }
})
