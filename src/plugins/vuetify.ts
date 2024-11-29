/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#6D214F',
          anchor: '#6D214F',
          background: '#CAD3C8',
          star: '#EAB543',
          warning: '#F97F51',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#B33771',
          anchor: '#6D214F',
          background: '#2C3A47',
          star: '#EAB543',
          warning: '#F97F51',
        },
      },
    },
  },
})

export {
  vuetify,
}
