import { App } from 'vue'
import Transfer from './Transfer.vue'

export default {
    install(Vue:App<Element>) {
        Vue.component('Transfer', Transfer)
    }
}

export { Transfer }