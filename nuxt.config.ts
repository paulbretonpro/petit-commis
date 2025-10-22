// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    payloadExtraction: true,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@formkit/auto-animate/nuxt',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/home': { ssr: false },
    '/': { prerender: true },
    '/login': { prerender: true },
    '/confirm': { prerender: true },
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/'],
    },
  },
  imports: {
    dirs: ['composables/**'],
  },
})
