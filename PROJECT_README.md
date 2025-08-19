# 🏆 NaNsense Hackathon 2025 - Embeddable Trivia Quiz Widget

## 🎯 Project Overview

This project demonstrates the development of an **embeddable trivia quiz widget** built with React, TypeScript, and Tailwind CSS. The widget can be easily integrated into any website with just a few lines of code.

## 🚀 Features

- **🎯 Interactive Quiz Experience**: Engaging question-answer format with immediate feedback
- **⏱️ Animated Timer**: Visual countdown with progress indicator
- **🎉 Confetti Animations**: Celebratory effects for correct answers and completion
- **📱 Mobile Responsive**: Works perfectly on all device sizes
- **🎨 Fancy UI**: Modern design with smooth animations and transitions
- **⚡ Easy Embedding**: Simple script tag or data attribute integration
- **🔧 Customizable**: Configurable time limits, themes, and callbacks
- **📊 Score Tracking**: Built-in scoring system with performance feedback

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Confetti** - Confetti effects
- **Vite** - Build tool
- **Lucide React** - Icons

## 📦 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build widget
npm run build:widget

# Preview production build
npm run preview
```

### Embedding
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

## 🎮 Demo

- **Development Preview**: `http://localhost:3000`
- **Test Widget**: Open `test-widget.html` in browser
- **Rajasthan Royals Demo**: `demo/embed-example.html`
- **Mumbai Indians Demo**: `demo/data-attributes-example.html`
- **Production Example**: `production-example.html`

## 📁 Project Structure

```
widget/
├── src/
│   ├── components/          # React components
│   │   ├── TriviaQuiz.tsx   # Main quiz orchestrator
│   │   ├── QuestionCard.tsx # Individual question display
│   │   ├── ResultScreen.tsx # Results and score display
│   │   ├── Timer.tsx        # Animated timer component
│   │   └── Confetti.tsx     # Confetti animation
│   ├── data/
│   │   └── questions.ts     # Sports trivia questions
│   ├── types.ts            # TypeScript definitions
│   ├── widget.tsx          # Widget entry point
│   ├── main.tsx            # Development entry point
│   └── index.css           # Styles
├── demo/                   # Embedding examples
├── dist/                   # Built widget files
├── docs/                   # Documentation
└── README.md              # This file
```

## 🎯 Use Cases

This embeddable widget is perfect for:
- **Sports Team Websites** (Rajasthan Royals, Mumbai Indians)
- **News Websites** (daily sports quizzes)
- **Educational Platforms** (learning content)
- **Blogs** (user engagement)
- **E-commerce Sites** (product knowledge quizzes)

## 🔧 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timeLimit` | number | 30 | Time limit per question in seconds |
| `theme` | 'light' \| 'dark' | 'light' | Widget theme |
| `primaryColor` | string | - | Custom primary color |
| `secondaryColor` | string | - | Custom secondary color |
| `questions` | Question[] | defaultQuestions | Custom questions array |
| `onComplete` | function | - | Callback when quiz completes |

## 🚀 Deployment

### Build for Production
```bash
npm run build:widget
```

### Deploy Options
- **AWS S3 + CloudFront**
- **Vercel**
- **Netlify**
- **GitHub Pages**

## 📚 Documentation

- **[Development Flow](DEVELOPMENT_FLOW.md)** - Complete step-by-step guide
- **[Quick Reference](QUICK_REFERENCE.md)** - Development cheat sheet
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Production deployment guide
- **[Embeddable Widget Guide](EMBEDDABLE_WIDGET_GUIDE.md)** - Complete widget guide

## 🏆 Hackathon Goals

This project demonstrates:
- **Modern Web Development** with React and TypeScript
- **Widget Architecture** for easy embedding
- **Responsive Design** for all devices
- **Performance Optimization** with Vite
- **User Experience** with animations and feedback
- **Scalability** through embeddable design

## 👥 Team

**NaNsense Team** - Hackathon 2025

## 📄 License

MIT License - feel free to use this widget in your projects!

---

**Happy Quizzing! 🎯🏆**
