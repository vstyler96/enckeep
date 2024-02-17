// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { dark } from './themes';
import { md3 as blueprint } from 'vuetify/blueprints';

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: { dark },
  },
  blueprint,
});
