import { App } from 'vue';
import Transfer from './transfer/Transfer.vue';

const components = {
    Transfer,
}

export default {
    install(Vue:App<Element>) {
        for (let key in components) {
            Vue.component(key, components[key as keyof typeof components]);
        }
    }
}