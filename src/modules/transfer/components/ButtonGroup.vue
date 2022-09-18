<template>
  <div class="box button-group">
    <button
      :disabled="leftButtonDisabled"
      class="left"
      @click="leftButtonClick"
    >
      &lt;
    </button>
    <button
      :disabled="rightButtonDisabled"
      class="right"
      @click="rightButtonClick"
    >
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";

const props = defineProps({
  rightButtonDisabled: {
    type: Boolean,
    default: true,
  },
  leftButtonDisabled: {
    type: Boolean,
    default: true,
  },
});


const emits = defineEmits(["leftButtonClick", "rightButtonClick"]);
const leftButtonClick = () => {
  emits("leftButtonClick");
};
const rightButtonClick = () => {
  emits("rightButtonClick");
};
</script>

<style scoped lang="scss">
.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  button {
    border: none;
    outline: none;
    background-color: orange;
    height: 38px;
    width: 38px;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    &:disabled {
      opacity: 0.6;
    }
    &:nth-child(2) {
      margin-left: 10px;
    }
  }
}
</style>
