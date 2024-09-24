import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      storageUrl: process.env.STORAGE_URL
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/supabase',
    '@nuxt/test-utils/module',
    "@nuxt/image"
  ],

  components: {
    global: true,
    dirs: ['~/components']
  },

  css: ['@/styles/base.css'],

  supabase: {
    url: process.env['SUPABASE_URL'],
    key: process.env['SUPABASE_KEY'],
    redirectOptions: {
      login: '/auth',
      callback: '/',
      cookieRedirect: true
    }
  },

  compatibilityDate: '2024-07-07'
})