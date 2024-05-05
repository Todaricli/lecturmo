import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true, // or "inline" to include the source map directly in the output files
  },
  plugins: [react()],
});
