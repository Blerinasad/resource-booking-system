/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#edfcf6',
          100: '#d3f8ea',
          200: '#aaf0d5',
          300: '#72e2b8',
          400: '#38cc95',
          500: '#15b07c',
          600: '#0b9066',
          700: '#0a7354',
          800: '#0b5b43',
          900: '#0b4b38',
        },
        surface: {
          950: '#080c14',
          900: '#0d1424',
          800: '#111d2e',
          700: '#162438',
          600: '#1c2e46',
        }
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(21,176,124,0.15)',
        'glow':    '0 0 40px rgba(21,176,124,0.2)',
        'glow-lg': '0 0 80px rgba(21,176,124,0.25)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'grid': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255,255,255,0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      }
    },
  },
  plugins: [],
}
