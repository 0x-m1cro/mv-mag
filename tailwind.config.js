/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        azure: '#00A8E8',
        neutralSand: '#F3F4F6',
        tidal: '#2E8B57',
        gilded: '#D4AF37',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'sea-glow':
          'radial-gradient(circle at 20% 20%, rgba(0,168,232,0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(46,139,87,0.08), transparent 30%), radial-gradient(circle at 60% 60%, rgba(212,175,55,0.12), transparent 40%)',
      },
    },
  },
  plugins: [],
}
