import { createApp } from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'
import dayjsLocaleZhTw from 'dayjs/locale/zh-tw'

import './index.css'

dayjs.locale(dayjsLocaleZhTw)

createApp(App).mount('#app')
