// https://nuxt.com/docs/api/configuration/nuxt-config

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 3000
  // },
  runtimeConfig: {
    // 私密
    SecretId: process.env.SECRET_ID,
    SecretKey: process.env.SECRET_KEY,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    public: {
      // 公开
      BUCKET: process.env.BUCKET,
      REGION: process.env.REGION
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],
  vite: {
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          }),
          IconsResolver({
            prefix: 'i',
            enabledCollections: ['ep', 'ant-design', 'mdi', 'ph', 'ion'],
            strict: true
          })
        ]
      }),
      Icons({
        autoInstall: true
      })
    ],
    ssr: {
      noExternal: ['ant-design-vue']
    }
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'unplugin-icons/nuxt'
  ],
  fonts: {
    providers: {
      google: false,
      googleicons: false
    }
  }
})
