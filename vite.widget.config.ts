import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': '{}'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    // Configure library build for the widget
    lib: {
      entry: resolve(__dirname, 'src/widget.tsx'),
      name: 'TriviaQuizWidget',
      fileName: 'widget',
      formats: ['umd', 'es']
    },
    rollupOptions: {
      // External dependencies
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
