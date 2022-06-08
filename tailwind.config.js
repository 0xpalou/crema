module.exports = {
  content: [
    './App.vue',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'off-white': '#E2DCC9',
      /* App */
      charcoal: '#262626',
      paper: '#FFFCF7',
      warm: 'rgba(120, 113, 103, .2)',
      cool: 'rgba(29, 31, 64, .2)',
      'charcoal-ghost': '#7D7D7D',
    },
    fontFamily: {
      sans: 'Montserrat, sans-serif',
      underground: 'underground, sans-serif',
      machine: 'IBM Plex Mono, monospace',
    },
    fontSize: {
      body: '18px',
      h1: '2rem',
      h2: '1.59rem',
      h3: '1.26rem',
      small: '.79rem',
    },
    spacing: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
      16: '16px',
      32: '32px',
      64: '64px',
      128: '128px',
    },
  },
  plugins: [],
}
