import { createApp } from 'vue'
// import Vue from 'vue'
import '../src/stylesheet/style.css'
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import vuetify from './plugin/vuetify'
import ElementPlus from './plugin/elementPlus'

import axios from 'axios'
import VueAxios from 'vue-axios'



// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify =  createVuetify({
//     components,
//     directives,
// })

// Vue.config.productionTip = false
// Vue.prototype.$Alert = Alert
const toastOptions = {
    timeout: 5000,
    position: POSITION.TOP_CENTER,
    maxToasts: 20,
    newestOnTop: true,
    filterBeforeCreate: (toast, toasts) => {
        if (toasts.filter(
            t => t.type === toast.type
        ).length !== 0) {
            // Returning false discards the toast
            return false;
        }
        // You can modify the toast if you want
        return toast;
    }
}

createApp(App)
    .use(router)
    .use(vuetify)
    .use(ElementPlus)
    .use(VueAxios, axios)
    .use(Toast, toastOptions)
    .mount('#app')
