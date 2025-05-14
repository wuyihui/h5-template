import 'virtual:uno.css'
import 'uno.css'
import 'virtual:unocss-devtools'

import './assets/main.css'

import { createApp } from 'vue'
import { setupStore } from '@/stores'

import App from './App.vue'
import router from './router'

// Toast
import 'vant/es/toast/style'

// Dialog
import 'vant/es/dialog/style'

// Notify
import 'vant/es/notify/style'

// ImagePreview
import 'vant/es/image-preview/style'

const app = createApp(App)

setupStore(app)

app.use(router)

app.mount('#app')
