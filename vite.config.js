import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  define: {
    __BUILD_VERSION__: JSON.stringify('2.0.0-cache-bust')
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  }
});
