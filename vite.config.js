import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, existsSync, readdirSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-training-html',
      closeBundle() {
        console.log('🔄 Vite closeBundle hook started');
        console.log('Current directory:', process.cwd());
        console.log('__dirname:', __dirname);
        
        // Copy training.html to dist directory after build
        const sourcePath = resolve(__dirname, 'public/training.html');
        const destPath = resolve(__dirname, 'dist/training.html');
        
        console.log('Source path:', sourcePath);
        console.log('Dest path:', destPath);
        console.log('Source exists:', existsSync(sourcePath));
        console.log('Dest dir exists:', existsSync(resolve(__dirname, 'dist')));
        
        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, destPath);
          console.log('✅ Copied training.html to dist/');
        } else {
          console.log('❌ training.html not found in public/');
        }
        
        // List dist directory contents
        const distPath = resolve(__dirname, 'dist');
        if (existsSync(distPath)) {
          const files = readdirSync(distPath);
          console.log('📁 Dist directory contents:', files);
        } else {
          console.log('❌ Dist directory does not exist');
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
