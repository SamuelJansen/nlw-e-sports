/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './src/*/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      colors: {
      },
      backgroundImage: {
        'nlw-galaxy-img': 'url("/galaxy-background-image.png")',
        'nlw-title-grad': 'linear-gradient(89.86deg, #9572FC 15.08%, #43E7AD 50.94%, #E1D55D 85.57%)',
        'nlw-grad': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      }
    }
  },
  plugins: [],
}
