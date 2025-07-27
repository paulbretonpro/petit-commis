// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/color-mode'
  ],
  css: ['~/assets/css/main.css']
})