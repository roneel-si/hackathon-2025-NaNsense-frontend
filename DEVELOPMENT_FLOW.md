# 🚀 Embeddable Widget Development Flow

## 📋 Complete Step-by-Step Guide

This guide will walk you through building an embeddable widget from scratch, just like we did with the trivia quiz widget.

---

## 🎯 **Phase 1: Project Setup**

### Step 1: Initialize Project
```bash
# Create project directory
mkdir my-widget
cd my-widget

# Initialize npm project
npm init -y
```

### Step 2: Install Dependencies
```bash
# Core dependencies
npm install react react-dom

# Animation and UI libraries
npm install framer-motion lucide-react

# Development dependencies
npm install -D @types/react @types/react-dom
npm install -D typescript @vitejs/plugin-react
npm install -D vite tailwindcss postcss autoprefixer
```

### Step 3: Create Configuration Files

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### `tsconfig.node.json`
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "vite.widget.config.ts"]
}
```

#### `vite.config.ts` (Development)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

#### `vite.widget.config.ts` (Widget Build)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': '{}'
  },
  build: {
    outDir: 'dist',
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

#### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}
```

#### `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Step 4: Update package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:widget": "tsc && vite build --config vite.widget.config.ts",
    "preview": "vite preview"
  }
}
```

---

## 🏗️ **Phase 2: Project Structure**

### Step 5: Create Directory Structure
```bash
mkdir -p src/components src/data src/types
```

### Step 6: Create Type Definitions (`src/types.ts`)
```typescript
export interface WidgetConfig {
  theme?: 'light' | 'dark';
  primaryColor?: string;
  onComplete?: (data: any) => void;
}

export interface WidgetState {
  // Define your widget's state
  isLoading: boolean;
  data: any;
}
```

### Step 7: Create Data Files (`src/data/`)
```typescript
// src/data/sample-data.ts
export const sampleData = [
  // Your widget's data
];
```

---

## ⚛️ **Phase 3: React Components**

### Step 8: Create Main Widget Component (`src/components/Widget.tsx`)
```typescript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WidgetConfig, WidgetState } from '../types';

interface WidgetProps {
  config?: WidgetConfig;
}

const Widget: React.FC<WidgetProps> = ({ config = {} }) => {
  const [state, setState] = useState<WidgetState>({
    isLoading: true,
    data: null
  });

  useEffect(() => {
    // Initialize widget
    setState(prev => ({ ...prev, isLoading: false }));
  }, []);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="widget-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Your widget content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800">
          My Widget
        </h2>
        {/* Add your widget functionality here */}
      </div>
    </motion.div>
  );
};

export default Widget;
```

### Step 9: Create Supporting Components
```typescript
// src/components/WidgetHeader.tsx
// src/components/WidgetContent.tsx
// src/components/WidgetFooter.tsx
// Create as many components as needed
```

### Step 10: Create Styles (`src/index.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .widget-container {
    @apply max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden;
  }
  
  /* Add your custom widget styles */
}
```

---

## 🔌 **Phase 4: Widget Entry Point**

### Step 11: Create Widget Entry Point (`src/widget.tsx`)
```typescript
import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './components/Widget';
import { WidgetConfig } from './types';
import './index.css';

// Ensure we're in a browser environment
if (typeof window === 'undefined') {
  throw new Error('Widget can only be used in a browser environment');
}

// Widget class for easy embedding
class MyWidget {
  private container: HTMLElement;
  private config: WidgetConfig;

  constructor(container: HTMLElement | string, config: WidgetConfig = {}) {
    this.config = config;
    
    if (typeof container === 'string') {
      const element = document.getElementById(container);
      if (!element) {
        throw new Error(`Container element with id "${container}" not found`);
      }
      this.container = element;
    } else {
      this.container = container;
    }

    this.render();
  }

  private render() {
    const root = createRoot(this.container);
    root.render(
      <React.StrictMode>
        <Widget config={this.config} />
      </React.StrictMode>
    );
  }

  // Public method to update config
  public updateConfig(newConfig: Partial<WidgetConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.render();
  }
}

// Make it available globally
declare global {
  interface Window {
    MyWidget: typeof MyWidget;
  }
}

window.MyWidget = MyWidget;

// Auto-initialize if data attributes are present
document.addEventListener('DOMContentLoaded', () => {
  const widgets = document.querySelectorAll('[data-my-widget]');
  
  widgets.forEach((element) => {
    const config: WidgetConfig = {};
    
    // Parse data attributes
    if (element.getAttribute('data-theme')) {
      config.theme = element.getAttribute('data-theme') as 'light' | 'dark';
    }
    
    new MyWidget(element as HTMLElement, config);
  });
});

export default MyWidget;
```

### Step 12: Create Development Entry Point (`src/main.tsx`)
```typescript
import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './components/Widget';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 My Widget Development
          </h1>
          <p className="text-lg text-gray-600">
            Test your embeddable widget below
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Widget Preview
          </h2>
          <Widget />
        </div>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step 13: Create HTML Files
```html
<!-- index.html (Development) -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Widget Development</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 🧪 **Phase 5: Testing & Demo**

### Step 14: Create Test HTML Files
```html
<!-- test-widget.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Widget Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f0f0f0; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 Widget Test Page</h1>
        <div id="my-widget"></div>
    </div>

    <!-- Include React and ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Include the widget -->
    <link rel="stylesheet" href="dist/style.css">
    <script src="dist/widget.umd.js"></script>
    
    <!-- Initialize -->
    <script>
        new MyWidget('my-widget', {
            theme: 'light'
        });
    </script>
</body>
</html>
```

### Step 15: Create Demo Examples
```bash
mkdir demo
# Create demo/embed-example.html
# Create demo/data-attributes-example.html
```

---

## 🚀 **Phase 6: Build & Deploy**

### Step 16: Build Widget
```bash
npm run build:widget
```

### Step 17: Test Production Build
```bash
# Serve dist folder locally
npx serve dist/

# Test with production URLs
```

### Step 18: Deploy to CDN
```bash
# Choose your deployment method:
# - AWS S3 + CloudFront
# - Vercel
# - Netlify
# - GitHub Pages
```

---

## 📝 **Phase 7: Documentation**

### Step 19: Create README.md
```markdown
# My Widget

An embeddable widget built with React, TypeScript, and Tailwind CSS.

## Installation

```html
<script src="https://your-cdn.com/widget.umd.js"></script>
<link rel="stylesheet" href="https://your-cdn.com/style.css">
```

## Usage

```html
<div id="my-widget"></div>
<script>
  new MyWidget('my-widget', {
    theme: 'light'
  });
</script>
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `theme` | 'light' \| 'dark' | 'light' | Widget theme |
| `onComplete` | function | - | Callback when widget completes |

## Examples

See the `demo/` directory for embedding examples.
```

### Step 20: Create Deployment Guide
```markdown
# Deployment Guide

## Build
```bash
npm run build:widget
```

## Deploy
Upload the `dist/` folder to your CDN.

## Embed
Include the script tags on any website.
```

---

## 🔄 **Development Workflow**

### Daily Development Process:
1. **Start Development Server**: `npm run dev`
2. **Make Changes**: Edit components in `src/`
3. **Test Locally**: View at `http://localhost:3000`
4. **Build Widget**: `npm run build:widget`
5. **Test Production**: Open `test-widget.html`
6. **Deploy**: Upload `dist/` files to CDN

### Testing Checklist:
- [ ] Widget loads without errors
- [ ] All features work correctly
- [ ] Mobile responsive
- [ ] Cross-browser compatibility
- [ ] Performance optimized
- [ ] Error handling works

---

## 🎯 **Quick Start Template**

For future widgets, you can use this template:

```bash
# Clone or copy this structure
my-widget/
├── src/
│   ├── components/
│   │   └── Widget.tsx
│   ├── types.ts
│   ├── widget.tsx
│   ├── main.tsx
│   └── index.css
├── demo/
├── dist/
├── package.json
├── vite.config.ts
├── vite.widget.config.ts
├── tailwind.config.js
└── README.md
```

---

## 💡 **Pro Tips**

1. **Keep it Simple**: Start with basic functionality, add features later
2. **Test Early**: Test embedding on real HTML pages from the start
3. **Mobile First**: Design for mobile, enhance for desktop
4. **Performance**: Keep bundle size small, use lazy loading if needed
5. **Error Handling**: Always handle edge cases and errors gracefully
6. **Documentation**: Write clear docs for easy embedding
7. **Versioning**: Use semantic versioning for releases
8. **Analytics**: Add tracking for usage and errors

---

**You now have a complete development flow for building embeddable widgets! 🚀**

Follow these steps in order, and you'll have a production-ready embeddable widget that can be used on any website.
