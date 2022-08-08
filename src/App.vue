<script setup lang="ts">
import { reactive } from 'vue';
import data from '../modules/extends/data';
const extensions = {
    data: reactive(data),
    rightTitle:"已选择机型"
}
</script>

<template>
  <transfer v-bind="extensions" />
</template>

<style scoped>

</style>
