<template>
  <div class="list-title">
    {{ title }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.list-title {
  font-size: 14px;
  height: 38px;
  display: flex;
  align-items: center;
  font-weight: normal;
  margin: 0;
  color: #666;
  .checkeAll {
    margin-right: 10px;
  }
}
</style>
