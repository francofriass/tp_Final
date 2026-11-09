/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        // Design system palette (also exposed as CSS variables in src/input.css)
        bg: '#0B0F19',
        card: '#161D2F',
        primary: '#7C3AED',
        'primary-soft': '#A78BFA',
        accent: '#38BDF8',
        ink: '#F8FAFC',
        muted: '#94A3B8',
        success: '#34D399',
      },
      fontFamily: {
        sans: ['Inter', 'Inter Fallback', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Space Grotesk Fallback', 'Arial', 'sans-serif'],
      },
      // Spacing scale is the Tailwind default: multiples of 4px.
      maxWidth: {
        page: '72rem',
      },
      screens: {
        // Tested breakpoints: 375px (base), 768px (md), 1280px (xl)
        md: '768px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
