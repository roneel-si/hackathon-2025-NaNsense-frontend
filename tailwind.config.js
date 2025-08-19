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
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#e91e63', // Rajasthan Royals Pink
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#3f51b5', // Rajasthan Royals Blue
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        royal: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#ffd700', // Rajasthan Royals Gold
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        cricket: {
          pink: '#e91e63',
          blue: '#3f51b5',
          gold: '#ffd700',
          purple: '#9c27b0',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'cricket-bounce': 'cricketBounce 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'timer-rotate': 'timerRotate 1s linear infinite',
        'background-shift': 'backgroundShift 20s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #e91e63, 0 0 10px #e91e63, 0 0 15px #e91e63' },
          '100%': { boxShadow: '0 0 10px #e91e63, 0 0 20px #e91e63, 0 0 30px #e91e63' },
        },
        cricketBounce: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(5deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0deg)' },
          '75%': { transform: 'translateY(-10px) rotate(-5deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        timerRotate: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        backgroundShift: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(1deg)' },
        }
      },
      backgroundImage: {
        'rr-gradient': 'linear-gradient(135deg, #e91e63 0%, #9c27b0 50%, #3f51b5 100%)',
        'rr-gradient-reverse': 'linear-gradient(135deg, #3f51b5 0%, #9c27b0 50%, #e91e63 100%)',
      }
    },
  },
  plugins: [],
}
