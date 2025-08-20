export default defineNuxtConfig({
  css: [
    '../assets/fonts/fonts.scss'
  ],
  modules: [
    '@pinia/nuxt',
    'nuxt-svgo',
    '@nuxt/icon'
  ],
  pinia: {
    storesDirs: ['./store'],
  }
})