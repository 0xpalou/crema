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
      sans: 'Montserrat',
      underground: 'underground, sans-serif',
      machine: 'IBM Plex Mono, monospace',
    },
    fontSize: {
      body: '16px',
      h1: '2.82rem',
      h2: '2rem',
      h3: '1.41rem',
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
