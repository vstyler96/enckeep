// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { dark } from './themes';

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: { dark },
  },
});
