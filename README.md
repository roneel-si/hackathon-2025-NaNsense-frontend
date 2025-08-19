# 🏆 Sports Trivia Quiz Widget

An embeddable, interactive trivia quiz widget built with React, TypeScript, and Tailwind CSS. Perfect for sports websites, blogs, or any platform looking to engage users with fun trivia content.

## ✨ Features

- **🎯 Interactive Quiz Experience**: Engaging question-answer format with immediate feedback
- **⏱️ Animated Timer**: Visual countdown with progress indicator
- **🎉 Confetti Animations**: Celebratory effects for correct answers and completion
- **📱 Mobile Responsive**: Works perfectly on all device sizes
- **🎨 Fancy UI**: Modern design with smooth animations and transitions
- **⚡ Easy Embedding**: Simple script tag or data attribute integration
- **🔧 Customizable**: Configurable time limits, themes, and callbacks
- **📊 Score Tracking**: Built-in scoring system with performance feedback

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the development preview.

### 3. Build Widget

```bash
npm run build:widget
```

This creates the embeddable widget files in the `dist/` directory.

## 📦 Embedding Options

### Option 1: JavaScript Initialization

```html
<!-- Include React and ReactDOM -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Include the widget script -->
<script src="path/to/widget.umd.js"></script>

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

### Option 2: Data Attributes (Auto-initialization)

```html
<!-- Include React and ReactDOM -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Include the widget script -->
<script src="path/to/widget.umd.js"></script>

<!-- Auto-initialize with data attributes -->
<div data-trivia-widget 
     data-time-limit="30" 
     data-theme="light">
</div>
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

### Question Structure

```typescript
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
```

## 🎨 Customization

### Custom Questions

```javascript
const customQuestions = [
  {
    id: 1,
    question: "🏏 Which team won the IPL 2023?",
    options: ["Mumbai Indians", "Chennai Super Kings", "Rajasthan Royals", "Gujarat Titans"],
    correctAnswer: 1,
    category: "Cricket",
    difficulty: "medium"
  }
  // ... more questions
];

new TriviaQuizWidget('trivia-widget', {
  questions: customQuestions,
  timeLimit: 25
});
```

### Custom Colors

```javascript
new TriviaQuizWidget('trivia-widget', {
  primaryColor: '#ff6b35',
  secondaryColor: '#f7931e'
});
```

## 📱 Mobile Responsiveness

The widget is fully responsive and works great on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🎯 Demo Examples

Check out the demo files in the `demo/` directory:

- `embed-example.html` - Shows manual JavaScript initialization
- `data-attributes-example.html` - Shows automatic data attribute initialization

## 🏗️ Project Structure

```
widget/
├── src/
│   ├── components/
│   │   ├── TriviaQuiz.tsx      # Main quiz component
│   │   ├── QuestionCard.tsx    # Individual question display
│   │   ├── ResultScreen.tsx    # Results and score display
│   │   ├── Timer.tsx          # Animated timer component
│   │   └── Confetti.tsx       # Confetti animation
│   ├── data/
│   │   └── questions.ts       # Default trivia questions
│   ├── types.ts              # TypeScript type definitions
│   ├── widget.tsx            # Widget entry point
│   ├── main.tsx              # Development entry point
│   └── index.css             # Styles and Tailwind imports
├── demo/                     # Embedding examples
├── dist/                     # Built widget files
└── README.md                # This file
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:widget` - Build embeddable widget
- `npm run preview` - Preview production build

### Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Confetti** - Confetti effects
- **Vite** - Build tool
- **Lucide React** - Icons

## 🎉 Features in Detail

### Timer Animation
- Circular progress indicator
- Color changes when time is running low
- Smooth countdown animation

### Confetti Effects
- Multiple colored confetti pieces
- Floating emoji animations
- Automatic cleanup after animation

### Question Feedback
- Immediate visual feedback for answers
- Correct/incorrect indicators
- Smooth transitions between questions

### Result Screen
- Star rating system
- Performance percentage
- Share functionality
- Restart option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this widget in your projects!

## 🆘 Support

If you have any questions or need help embedding the widget, please open an issue on GitHub.

---

**Happy Quizzing! 🎯🏆**
