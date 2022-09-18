<template>
  <div class="box">
    <div class="flex"></div>
    <div class="flex"></div>
    <div class="flex"></div>
    <div class="flex"></div>
    <div class="flex"></div>
    <transfer v-bind="extensions" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import data from '../../modules/extends/data';
const extensions = {
    data: reactive(data),
    rightTitle:"已选择机型"
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  .flex {
    width: 300px;
    height: 100px;
    background-color: #ccc;
    border: 1px solid #000;
    flex-shrink: 0;
    flex-basis: 2;
    &:nth-child(2) {
      //   width: 200px;
    }
  }
}
</style>
