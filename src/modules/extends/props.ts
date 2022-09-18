import { PropType } from "vue";

export default {
    rightTitle:{
        type: String,
        default: '已选择'
    },
    data: {
        type: Array as PropType<IData[]>,
        default: () => []
    }
}