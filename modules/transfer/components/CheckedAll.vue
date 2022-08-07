<template>
  <span class="checkeAll"
    ><input ref="checkBoxRef" id="checkAll" type="checkbox" @click="checkAll"
  /></span>
</template>

<script setup lang="ts">
import {
  ref,
  PropType,
  onMounted,
  nextTick,
  watchEffect,
} from "vue";
import { LeftOrRight } from "../../extends/data.js";

const emits = defineEmits(["checkAll"]);
const props = defineProps({
  leftOrRight: {
    type: String as PropType<LeftOrRight>,
    default: LeftOrRight.left,
    validator: (value: LeftOrRight) => {
      return [LeftOrRight.left, LeftOrRight.right].includes(value);
    },
  },
  data: {
    type: Array as PropType<IDataItem[]>,
    default: () => [],
  },
});
const checkBoxRef = ref<HTMLInputElement>();
const checkAll = () => {
  nextTick(() => {
    props.data.forEach((item) => {
      item.checked = true;
    });
  });

  emits("checkAll", props.leftOrRight);
};
const clearChecked = () => {
  checkBoxRef.value!.checked = false;
};
watchEffect(() => {
  if (props.data.length === 0) {
    nextTick(() => {
      clearChecked();
    });
  }
});
defineExpose({
  clearChecked,
});
</script>

<style scoped lang="scss">
.checkeAll {
  margin-right: 10px;
}
</style>
