/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fbeef2',
          100: '#f3cdd9',
          400: '#a13a5c',
          500: '#7a1f3d',
          600: '#661832',
          700: '#521327',
          900: '#33101a',
        },
        marigold: {
          50: '#fdf3e2',
          100: '#f8dfab',
          400: '#eeb35b',
          500: '#e8a33d',
          600: '#c9852a',
        },
        ivory: '#fbf7f0',
        ink: '#241914',
        muted: '#7a6a5d',
        leaf: '#3f7d4a',
        chili: '#b23a2e',
        gold: '#c89b3c',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        thali: '3px',
      },
    },
  },
  plugins: [],
}
