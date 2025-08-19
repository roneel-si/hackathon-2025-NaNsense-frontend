# 🚀 Quick Reference - Embeddable Widget Development

## 📋 **Essential Commands**

```bash
# Development
npm run dev                    # Start development server
npm run build:widget          # Build embeddable widget
npm run preview               # Preview production build

# Testing
npx serve dist/              # Test production build locally
```

## 🏗️ **Project Structure**

```
my-widget/
├── src/
│   ├── components/          # React components
│   ├── data/               # Data files
│   ├── types.ts           # TypeScript definitions
│   ├── widget.tsx         # Widget entry point
│   ├── main.tsx           # Development entry point
│   └── index.css          # Styles
├── demo/                   # Embedding examples
├── dist/                   # Built files
├── package.json
├── vite.config.ts
├── vite.widget.config.ts
└── tailwind.config.js
```

## 🔧 **Key Configuration Files**

### `vite.widget.config.ts` (Critical for embedding)
```typescript
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': '{}'
  },
  build: {
    lib: {
      entry: 'src/widget.tsx',
      name: 'MyWidget',
      fileName: 'widget',
      formats: ['umd', 'es']
    },
    rollupOptions: {
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
```

### `src/widget.tsx` (Widget entry point)
```typescript
class MyWidget {
  constructor(container: HTMLElement | string, config = {}) {
    // Widget initialization
  }
}

window.MyWidget = MyWidget;
```

## 📦 **Embedding Code**

### Method 1: JavaScript Initialization
```html
<div id="my-widget"></div>

<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<link rel="stylesheet" href="https://your-cdn.com/style.css">
<script src="https://your-cdn.com/widget.umd.js"></script>

<script>
  new MyWidget('my-widget', {
    theme: 'light'
  });
</script>
```

### Method 2: Data Attributes
```html
<div data-my-widget data-theme="light"></div>

<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<link rel="stylesheet" href="https://your-cdn.com/style.css">
<script src="https://your-cdn.com/widget.umd.js"></script>
```

## 🧪 **Testing Checklist**

- [ ] `npm run dev` - Development server works
- [ ] `npm run build:widget` - Builds without errors
- [ ] `test-widget.html` - Widget loads in browser
- [ ] Mobile responsive
- [ ] Cross-browser compatibility
- [ ] Error handling works
- [ ] Performance optimized

## 🚀 **Deployment Steps**

1. **Build**: `npm run build:widget`
2. **Upload**: `dist/` folder to CDN
3. **Test**: Verify embedding works
4. **Monitor**: Add analytics and error tracking

## 💡 **Common Issues & Solutions**

### Issue: `process is not defined`
**Solution**: Add to `vite.widget.config.ts`:
```typescript
define: {
  'process.env.NODE_ENV': '"production"',
  'process.env': '{}'
}
```

### Issue: Widget not loading
**Solution**: Check file paths and include CSS:
```html
<link rel="stylesheet" href="dist/style.css">
```

### Issue: React not found
**Solution**: Include React and ReactDOM:
```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

## 🎯 **Development Workflow**

1. **Start**: `npm run dev`
2. **Code**: Edit `src/components/`
3. **Test**: View at `localhost:3000`
4. **Build**: `npm run build:widget`
5. **Test**: Open `test-widget.html`
6. **Deploy**: Upload `dist/` files

## 📊 **File Sizes (Target)**

- `widget.umd.js`: < 200KB
- `style.css`: < 20KB
- Total: < 250KB (gzipped: ~80KB)

## 🔄 **Update Process**

1. Make changes in `src/`
2. Test with `npm run dev`
3. Build with `npm run build:widget`
4. Test production build
5. Deploy new `dist/` files
6. Update version number

---

**Follow this reference for quick development! 🚀**
