import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-training-html',
      closeBundle() {
        // Copy training.html to dist directory after build
        const sourcePath = resolve(__dirname, 'public/training.html');
        const destPath = resolve(__dirname, 'dist/training.html');
        
        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, destPath);
          console.log('✅ Copied training.html to dist/');
        } else {
          console.log('❌ training.html not found in public/');
        }
        
        // Force rebuild timestamp
        console.log('🕒 Build completed at:', new Date().toISOString());
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  }
});
