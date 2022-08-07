import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Transfer from '../modules/transfer'
const app = createApp(App)
app.use(Transfer).mount('#app')
