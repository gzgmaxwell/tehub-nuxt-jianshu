// https://nuxt.com/docs/api/configuration/nuxt-config

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 3000
  // },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],
  vite: {
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      })
    ],
    ssr: {
      noExternal: ['ant-design-vue']
    }
  },
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  fonts: {
    providers: {
      google: false,
      googleicons: false
    }
  }
})
