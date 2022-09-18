<template>
  <div
    v-for="(item, index) in data"
    :key="item.id"
    :class="['list-item', item.disabled ? 'disabled' : '']"
    :draggable="!item.disabled"
    @dragstart="dragItem(item)"
  >
    <input
      type="checkbox"
      :id="`__checkbox__${item.id}`"
      :disabled="item.disabled"
      draggable="true"
      v-model="item.checked"
      @click="checkBoxClick($event, leftOrRight, item)"
    />
    <label :for="`__checkbox__${item.id}`">{{ item.name }}</label>
  </div>
</template>

<script setup lang="ts">
import { PropType, watch } from "vue";
import { LeftOrRight } from "../../extends/data.js";

const props = defineProps({
  data: {
    type: Array as PropType<IDataItem[]>,
    default: () => [],
  },
  leftOrRight: {
    type: String as PropType<LeftOrRight>,
    default: LeftOrRight.left,
    validator: (value: LeftOrRight) => {
      return [LeftOrRight.left, LeftOrRight.right].includes(value);
    },
  },
});

const emits = defineEmits(["dragItem", "setCheckedData", "removeCheckedData"]);
const checkBoxClick = (
  evt: Event,
  LeftOrRight: LeftOrRight,
  item: IDataItem
) => {
  const target = evt.target as HTMLInputElement;
  const checked = target.checked;
  item.checked = checked;
  checked
    ? emits("setCheckedData", LeftOrRight, item)
    : emits("removeCheckedData", LeftOrRight, item.id);
};
const dragItem = (item: IDataItem) => {
  emits("dragItem", item);
};

</script>

<style lang="scss" scoped>
.list-item {
  display: flex;

  font-size: 12px;
  color: #666;
  &.disabled {
    opacity: 0.6;
  }
}
</style>
