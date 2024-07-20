import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/supabase',
    '@nuxt/test-utils/module'
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
      cookieRedirect: true
    }
  },

  compatibilityDate: '2024-07-07'
})
