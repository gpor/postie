import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'postie',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico' },
        //   {
        //     rel: 'preconnect',
        //     href: 'https://fonts.googleapis.com',
        //   },
        //   {
        //     rel: 'preconnect',
        //     href: 'https://fonts.gstatic.com',
        //     crossorigin: true,
        //   },
        //   {
        //     rel: 'stylesheet',
        //     href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Rubik:wght@500&display=swap',
        //   },
      ],
    },
  },
})
