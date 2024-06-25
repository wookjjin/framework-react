import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'react'
      ],
      dts: 'src/auto-imports.d.ts',
    })
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src/"),
      // routes: `${path.resolve(__dirname, './src/routes/')}`,
    },
  },
});