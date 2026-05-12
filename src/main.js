import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes'

import './assets/styles.css'
import '@tabler/icons-webfont/dist/tabler-icons.min.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
