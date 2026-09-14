/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          dark: '#0f291e',
          forest: '#1b4332',
          emerald: '#2d6a4f',
          leaf: '#40916c',
          sage: '#52b788',
          mint: '#74c69d',
          pale: '#d8f3dc',
          earth: '#92400e',
          soil: '#78350f',
          terracotta: '#b45309',
          amber: '#d97706',
          sand: '#fef3c7',
          sky: '#0284c7',
          water: '#0369a1',
          bg: '#fbfbf9',
          card: '#ffffff'
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
