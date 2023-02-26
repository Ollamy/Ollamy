import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
  }
})
