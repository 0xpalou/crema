const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    screens: {
      sm: '420px',
      mobile: '720px',
    },
    colors: {
      none: '#FFFCF700',
      paper: '#FFFCF7',
      charcoal: '#262626',
      ash: '#636261',
      glass: '#26262622',
      'off-white': '#E2DCC9',
    },
    fontFamily: {
      sans: 'Montserrat',
      navigation: 'underground, sans-serif',
      machine: 'IBM Plex Mono, monospace',
    },
    fontSize: {
      body: '1rem',
      h1: '1.68rem',
      h2: '1.41rem',
      h3: '1.19rem',
      footer: '.84rem',
    },
    lineHeight: {
      body: '1.296em',
      heading: '1.68em',
    },
    spacing: {
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
      5: '5px',
      8: '8px',
      12: '12px',
      20: '20px',
      34: '34px',
      50: '50px',
      85: '85px',
    },
    borderRadius: {
      3: '3px',
      12: '12px',
    },
    boxShadow: {
      landing: '3px 3px 0 #26262677',
      'landing-inset': 'inset 3px 3px 0 26262677',
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      plugin(({ addVariant }) => {
        addVariant('active', '&:active')
        addVariant('disabled', '&:disabled')
      })
      addComponents({
        /* Input */
        '.input-landing': {
          '@apply border border-charcoal hover:bg-glass rounded-3 px-12 py-8':
            {},
        },
        /* Buttons */
        '.btn-landing': {
          '@apply border border-charcoal cursor-pointer px-12 py-8 rounded-3':
            {},
          'text-decoration': 'none !important',
        },
        '.btn-landing:hover': {
          '@apply bg-glass shadow-landing': {},
        },
        '.btn-landing:active': {
          '@apply text-paper bg-charcoal shadow-landing-inset': {},
        },
        '.btn-landing:disabled': {
          '@apply bg-glass text-ash': {},
        },
        '.btn-landing-negative': {
          '@apply text-paper bg-charcoal cursor-pointer px-12 py-8 rounded-3 cursor-pointer hover:shadow-landing focus:shadow-landing-inset':
            {},
          'text-decoration': 'none !important',
        },
        '.btn-landing-negative:hover': {
          '@apply shadow-landing': {},
          'text-decoration': 'none !important',
        },
        '.btn-landing-negative:active': {
          '@apply shadow-landing-inset': {},
        },
        '.btn-landing-negative:disabled': {
          '@apply bg-ash': {},
        },
      })
    }),
  ],
}
