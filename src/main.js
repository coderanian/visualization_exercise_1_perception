import './assets/main.css'

import { createVuetify } from 'vuetify'
import { createApp } from 'vue'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import router from "@/router/router.js";
import App from './App.vue'

const vuetify = createVuetify({components, directives});
createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
