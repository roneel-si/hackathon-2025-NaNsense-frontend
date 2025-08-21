/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Fluid typography using clamp
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 1vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 1.2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 1.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1.8vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 2vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 2.5vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 3vw, 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, 4vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 5vw, 4rem)',
      },
      // Responsive spacing
      spacing: {
        'fluid-xs': 'clamp(0.25rem, 1vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 1.5vw, 0.75rem)',
        'fluid-md': 'clamp(0.75rem, 2vw, 1rem)',
        'fluid-lg': 'clamp(1rem, 2.5vw, 1.5rem)',
        'fluid-xl': 'clamp(1.5rem, 3vw, 2rem)',
        'fluid-2xl': 'clamp(2rem, 4vw, 3rem)',
      },
      // Viewport-based heights
      height: {
        'screen-90': '90vh',
        'screen-80': '80vh',
        'screen-70': '70vh',
        'screen-60': '60vh',
        'screen-50': '50vh',
      },
      minHeight: {
        'screen-90': '90vh',
        'screen-80': '80vh',
        'screen-70': '70vh',
        'screen-60': '60vh',
        'screen-50': '50vh',
      },
      maxHeight: {
        'screen-90': '90vh',
        'screen-80': '80vh',
        'screen-70': '70vh',
        'screen-60': '60vh',
        'screen-50': '50vh',
      },
      // Custom breakpoints for better responsive control
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Height-based breakpoints
        'h-sm': {'raw': '(max-height: 600px)'},
        'h-md': {'raw': '(min-height: 601px) and (max-height: 800px)'},
        'h-lg': {'raw': '(min-height: 801px)'},
      },
    },
  },
  plugins: [],
}
