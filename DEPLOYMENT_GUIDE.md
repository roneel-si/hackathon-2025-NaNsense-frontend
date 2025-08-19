# 🚀 Production Deployment Guide

## 📦 Files Ready for Deployment

After running `npm run build:widget`, your `dist/` folder contains:

```
dist/
├── widget.umd.js    (127KB) - Main widget script
├── widget.mjs       (183KB) - ES module version
└── style.css        (15KB)  - Widget styles
```

## 🌐 CDN Deployment Options

### Option 1: AWS S3 + CloudFront
```bash
# Upload to S3
aws s3 sync dist/ s3://your-widget-bucket/

# Create CloudFront distribution
# Point to: https://your-widget-bucket.s3.amazonaws.com/
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 3: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Option 4: GitHub Pages
```bash
# Create gh-pages branch
git checkout -b gh-pages
git add dist/
git commit -m "Deploy widget"
git push origin gh-pages
```

## 🔗 Production URLs

After deployment, your files will be available at:

```
https://your-cdn.com/widget.umd.js
https://your-cdn.com/style.css
```

## 📋 Production Embedding Code

### For Website Owners (Copy-Paste Ready)

```html
<!-- Include React and ReactDOM -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Include our widget -->
<link rel="stylesheet" href="https://your-cdn.com/style.css">
<script src="https://your-cdn.com/widget.umd.js"></script>

<!-- Add container -->
<div id="trivia-widget"></div>

<!-- Initialize -->
<script>
  new TriviaQuizWidget('trivia-widget', {
    timeLimit: 30,
    onComplete: function(score, total) {
      console.log(`Quiz completed! Score: ${score}/${total}`);
    }
  });
</script>
```

### Data Attributes Method (Even Simpler)

```html
<!-- Auto-initializes -->
<div data-trivia-widget 
     data-time-limit="30" 
     data-theme="light">
</div>

<!-- Include scripts -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<link rel="stylesheet" href="https://your-cdn.com/style.css">
<script src="https://your-cdn.com/widget.umd.js"></script>
```

## 🏢 Business Model Examples

### 1. **Freemium Model**
```javascript
// Free tier
new TriviaQuizWidget('trivia-widget', {
  timeLimit: 30,
  questions: defaultQuestions.slice(0, 5) // Only 5 questions
});

// Premium tier
new TriviaQuizWidget('trivia-widget', {
  timeLimit: 45,
  questions: allQuestions, // All questions
  customBranding: true,
  analytics: true
});
```

### 2. **White-Label Solution**
```javascript
// For Rajasthan Royals
new TriviaQuizWidget('trivia-widget', {
  primaryColor: '#ff6b35',
  secondaryColor: '#f7931e',
  questions: cricketQuestions,
  branding: 'Rajasthan Royals'
});

// For Mumbai Indians
new TriviaQuizWidget('trivia-widget', {
  primaryColor: '#004ba0',
  secondaryColor: '#1976d2',
  questions: cricketQuestions,
  branding: 'Mumbai Indians'
});
```

## 📊 Analytics Integration

### Google Analytics
```javascript
new TriviaQuizWidget('trivia-widget', {
  onComplete: function(score, total) {
    gtag('event', 'quiz_completed', {
      score: score,
      total: total,
      percentage: Math.round(score/total*100)
    });
  }
});
```

### Custom Analytics
```javascript
new TriviaQuizWidget('trivia-widget', {
  onComplete: function(score, total) {
    // Send to your analytics service
    fetch('https://your-api.com/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: score,
        total: total,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      })
    });
  }
});
```

## 🔒 Security Considerations

### 1. **CSP Headers**
```html
<!-- Add to your website's headers -->
Content-Security-Policy: script-src 'self' https://unpkg.com https://your-cdn.com;
```

### 2. **HTTPS Only**
```javascript
// Ensure HTTPS in production
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  console.warn('Widget should be loaded over HTTPS in production');
}
```

### 3. **Version Control**
```html
<!-- Use versioned URLs -->
<script src="https://your-cdn.com/widget-v1.0.0.umd.js"></script>
```

## 📈 Performance Optimization

### 1. **Gzip Compression**
```bash
# Enable gzip on your CDN
# Files are already gzipped:
# widget.umd.js: 127KB → 43KB (66% reduction)
# style.css: 15KB → 3.5KB (77% reduction)
```

### 2. **Caching Headers**
```http
Cache-Control: public, max-age=31536000, immutable
```

### 3. **Preload Critical Resources**
```html
<link rel="preload" href="https://your-cdn.com/widget.umd.js" as="script">
<link rel="preload" href="https://your-cdn.com/style.css" as="style">
```

## 🧪 Testing Production Build

### 1. **Local Testing**
```bash
# Serve dist folder locally
npx serve dist/

# Test with production URLs
```

### 2. **Cross-Browser Testing**
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Different screen sizes

### 3. **Performance Testing**
```bash
# Lighthouse audit
npx lighthouse https://your-widget-url.com

# Bundle analyzer
npx vite-bundle-analyzer dist/
```

## 💰 Monetization Strategies

### 1. **Usage-Based Pricing**
```javascript
// Track usage
let usageCount = 0;

new TriviaQuizWidget('trivia-widget', {
  onComplete: function(score, total) {
    usageCount++;
    
    // Bill based on usage
    if (usageCount % 100 === 0) {
      console.log('Billing for 100 quiz completions');
    }
  }
});
```

### 2. **Feature Tiers**
- **Free**: Basic quiz, 5 questions
- **Pro**: 20 questions, custom branding
- **Enterprise**: Unlimited questions, analytics, white-label

### 3. **API Access**
```javascript
// Premium API access
const widgetAPI = new TriviaQuizWidgetAPI({
  apiKey: 'your-api-key',
  endpoint: 'https://api.your-widget.com'
});

// Create custom quizzes
widgetAPI.createQuiz({
  questions: customQuestions,
  theme: customTheme
});
```

## 🚀 Go Live Checklist

- [ ] Files uploaded to CDN
- [ ] HTTPS enabled
- [ ] Caching configured
- [ ] Analytics integrated
- [ ] Cross-browser tested
- [ ] Performance optimized
- [ ] Documentation updated
- [ ] Support system ready
- [ ] Monitoring setup
- [ ] Backup strategy

## 📞 Support & Maintenance

### 1. **Version Management**
```javascript
// Check for updates
fetch('https://your-cdn.com/version.json')
  .then(response => response.json())
  .then(data => {
    if (data.latest > currentVersion) {
      console.log('Widget update available');
    }
  });
```

### 2. **Error Monitoring**
```javascript
// Global error handler
window.addEventListener('error', function(e) {
  if (e.filename.includes('widget.umd.js')) {
    // Send to error tracking service
    console.error('Widget error:', e.error);
  }
});
```

---

**Your widget is now ready for production deployment! 🎯**
