import MyDiv from './modules/index.vue'

export default {
    install: (app: any) => {
        app.component('MyDiv', MyDiv)
    }
}