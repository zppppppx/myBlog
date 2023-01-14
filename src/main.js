import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import vuetify from './plugin/vuetify'
import ElementPlus from './plugin/elementPlus'

// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify =  createVuetify({
//     components,
//     directives,
// })

createApp(App).use(router).use(vuetify).use(ElementPlus).mount('#app')
