module.exports = {
  content: [
    './App.vue',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {},
  plugins: [],
  presets: [require('./avalon-styles.js')],
}
