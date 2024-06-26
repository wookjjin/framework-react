import { defineConfig } from 'vite';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'react',
        'react-router-dom'
      ],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '~': path.resolve(__dirname, './src/'),
      // routes: `${path.resolve(__dirname, './src/routes/')}`,
    },
  },
});
