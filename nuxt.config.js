export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Cloud & Crema',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'A newsletter about the technical going-ons of the internet;;; meant to be digested pleasantly over a cup of coffee',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  env: {
    MUMBAI_RPC_URL: process.env.MUMBAI_RPC_URL,
    LENS_HUB_CONTRACT: process.env.LENS_HUB_CONTRACT,
    LENS_PERIPHERY_CONTRACT: process.env.LENS_PERIPHERY_CONTRACT,
    PROFILE_ID: process.env.PROFILE_ID,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles.css', '~/assets/fonts.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
