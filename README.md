# 🏆 Sports Trivia Quiz Widget

An embeddable, interactive trivia quiz widget built with React, TypeScript, and Tailwind CSS. Perfect for sports websites, blogs, or any platform looking to engage users with fun trivia content.

## 🚀 How to Embed the Widget

### Prerequisites
Make sure you have the built widget files in your `dist/` directory:
```bash
npm run build:widget
```

### Method 1: JavaScript Initialization

```html
<!-- Include React and ReactDOM -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Include the widget script and styles -->
<script src="dist/widget.umd.js"></script>
<link rel="stylesheet" href="dist/style.css">

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

### Method 2: Data Attributes (Auto-initialization)

```html
<!-- Include React and ReactDOM -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Include the widget script and styles -->
<script src="dist/widget.umd.js"></script>
<link rel="stylesheet" href="dist/style.css">

<!-- Auto-initialize with data attributes -->
<div data-trivia-widget 
     data-time-limit="30" 
     data-theme="light">
</div>
```

### Method 3: Floating Button Widget

```html
<!-- Include React and ReactDOM -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Include the widget script and styles -->
<script src="dist/widget.umd.js"></script>
<link rel="stylesheet" href="dist/style.css">

<!-- The floating button will appear automatically in the bottom-right corner -->
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timeLimit` | number | 30 | Time limit per question in seconds |
| `theme` | 'light' \| 'dark' | 'light' | Widget theme |
| `primaryColor` | string | - | Custom primary color |
| `secondaryColor` | string | - | Custom secondary color |
| `questions` | Question[] | defaultQuestions | Custom questions array |
| `onComplete` | function | - | Callback when quiz completes |

## 🎯 Ways to Embed the Widget

### 1. **Inline Quiz** - Embed directly in your content
Perfect for blog posts, articles, or dedicated quiz pages.

### 2. **Floating Button** - Appears as a floating button
Great for engagement without taking up page space. Users click to open the quiz.

### 3. **Modal/Popup** - Opens in a modal overlay
Ideal for call-to-action scenarios or when you want to focus user attention.

### 4. **Sidebar Widget** - Fixed position sidebar
Good for persistent engagement on content-heavy pages.

### 5. **Full Page Quiz** - Dedicated quiz page
Perfect for standalone quiz experiences or landing pages.

## 🧪 Test the Widget

Use `test-floating-button.html` to test the floating button widget functionality.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build widget for production
npm run build:widget
```

## 📄 License

MIT License - feel free to use this widget in your projects!
