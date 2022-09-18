import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import Transfer from '../modules/transfer'
import { router } from './router'
import TransferWait from 'transfer-wait'
import 'transfer-wait/style.css'

const app = createApp(App)
app.use(router)
app.use(TransferWait)
.mount('#app')
