import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'
// import { aliases, fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { mdiAccount, mdiChevronDown, mdiChevronUp, mdiFolderOpenOutline, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases: {
            aliases,
            account: mdiAccount,
            scroll_arrow_down: mdiChevronDown,
            scroll_arrow_up: mdiChevronUp,
            category_side_bar: mdiFolderOpenOutline,
            mdi_eye_off: mdiEyeOffOutline,
            mdi_eye: mdiEyeOutline,
        },
        sets: {
            // fa,
            mdi
        },
    },
})