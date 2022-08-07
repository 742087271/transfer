<template>
  <select @change="selectChange($event)">
    <option v-for="(title, index) in data" :value="index" :key="index">
      {{ title }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(['selectChange']);
const selectChange = (value:Event) => {
  emits("selectChange", value);
};
</script>

<style scoped></style>
