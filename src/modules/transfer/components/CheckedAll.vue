<template>
  <span class="checkeAll"
    ><input ref="checkBoxRef" id="checkAll" type="checkbox" @click="checkAll"
  /></span>
</template>

<script setup lang="ts">
import { ref, PropType, nextTick, watchEffect } from "vue";
import { LeftOrRight } from "../../extends/data.js";

const emits = defineEmits(["setCheckedData", "removeCheckedData"]);
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
const checkBoxRef = ref<HTMLInputElement|null>(null);
const checkAll = (ev: Event) => {
  const { checked } = ev.target as HTMLInputElement;
  if (checked) {
    props.data.forEach((item) => {
      item.checked = true;
      emits("setCheckedData", props.leftOrRight, item);
    });
  } else {
    props.data.forEach((item) => {
      item.checked = false;
      emits("setCheckedData", props.leftOrRight, item);
    });
  }
};
const clearChecked = () => {
  checkBoxRef.value!.checked = false;
};
watchEffect(() => {
  // const checkedLength = props.data.filter((item) => item.checked).length;
  // if (props.data.length !== checkedLength) {
  //   nextTick(clearChecked);
  // } else {

  // }
  if (props.data.length && props.data.every((item) => item.checked)) {
    nextTick(() => {
      console.log(checkBoxRef, "checkBoxRef");
      
      checkBoxRef.value!.checked = true;
    });
  } else {
    console.log(checkBoxRef);

    nextTick(() => {
      checkBoxRef.value!.checked = false;
    });
  }
});
</script>

<style scoped lang="scss">
.checkeAll {
  margin-right: 10px;
}
</style>
