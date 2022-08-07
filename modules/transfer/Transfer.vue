<template>
  <div>
    <selector :data="options" @select-change="setTargetIndex" />
    <div class="transfer">
      <div
        class="box left-list"
        @dragover.prevent
        @drop="removeRightListData([dragedItem as unknown as IDataItem])"
      >
        <div class="list-header">
          <checked-all
            ref="leftCheckAllRef"
            :left-or-right="LeftOrRight.left"
            :data="leftListData"
            @check-all="checkAll"
          />
          <list-tile :title="leftTitle" />
        </div>
        <div>
          <list-item
            :data="leftListData"
            :left-or-right="LeftOrRight.left"
            v-on="listItemHandlers"
          />
        </div>
      </div>
      <button-group
        :left-button-disabled="transferButtonDisabled.left"
        :right-button-disabled="transferButtonDisabled.right"
        @left-button-click="removeRightListData(checkedData.right)"
        @right-button-click="setRightListData(checkedData.left)"
      />
      <div
        class="box right-list"
        @dragover.prevent
        @drop="setRightListData([dragedItem as unknown as IDataItem])"
      >
        <div class="list-header">
          <checked-all
            ref="rightCheckAllRef"
            @check-all="checkAll"
            :left-or-right="LeftOrRight.right"
            :data="rightListData"
          />
          <list-tile :title="rightTitle" />
        </div>
        <div>
          <list-item
            :data="rightListData"
            :left-or-right="LeftOrRight.right"
            v-on="listItemHandlers"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LeftOrRight } from "../extends/data";
import propsDefination from "../extends/props";
import {
  useTargetIndex,
  useComputedData,
  useRightListData,
  useCheckedData,
  useDragedItem,
} from "../hooks";
import Selector from "./components/Selector.vue";
import ListTile from "./components/ListTitle.vue";
import ButtonGroup from "./components/ButtonGroup.vue";
import ListItem from "./components/ListItem.vue";
import CheckedAll from "./components/CheckedAll.vue";
import { ref } from "vue";
const props = defineProps(propsDefination);
const options = props.data.map((item) => item.title);
const [targetIndex, setTargetIndex] = useTargetIndex(0);
const [checkedData, setCheckedData, removeCheckedData] = useCheckedData();
const [rightListData, setRightListData, removeRightListData] = useRightListData(
  [],
  checkedData
);
const tempData:IDataItem[] = props.data.map(({data})=>data).flat();
console.log(tempData);

checkedData.left = tempData.filter((item) => item.checked);
const { leftTitle, leftListData, transferButtonDisabled } = useComputedData(
  props.data,
  targetIndex,
  rightListData,
  checkedData
);
const [dragedItem, setDragedItem] = useDragedItem();
const listItemHandlers = {
  setCheckedData,
  removeCheckedData,
  dragItem: setDragedItem,
};
const leftCheckAllRef = ref<InstanceType<typeof CheckedAll>>();
const rightCheckAllRef = ref<InstanceType<typeof CheckedAll>>();
const checkAll = (leftOrRight: LeftOrRight) => {
  switch (leftOrRight) {
    case LeftOrRight.left:
      leftListData.value.forEach((item) => {
        setCheckedData(leftOrRight, item);
      });
      // leftCheckAllRef.value?.clearChecked();

      break;
    case LeftOrRight.right:
      rightListData.value.forEach((item) => {
        setCheckedData(leftOrRight, item);
      });
      // rightCheckAllRef.value?.clearChecked();

      break;
    default:
      break;
  }
};
</script>
<style lang="scss" scoped>
.transfer {
  display: flex;
  flex-direction: row;
  width: 420px;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 0.5rem;

  .box {
    width: 140px;
    height: 100%;
    .list-header {
      display: flex;
      align-items: center;
      background-color: #efefef;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
