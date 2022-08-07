import { computed, reactive, Ref, ref } from "vue";
import { LeftOrRight } from "../extends/data";

export function useTargetIndex(initalIndex: number) {
  const targetIndex = ref(initalIndex);

  function setTargetIndex(evt: Event) {
    const target = evt.target as HTMLSelectElement;

    const newIndex = parseInt(target.value);
    targetIndex.value = newIndex;
  }

  return [targetIndex, setTargetIndex] as const;
}
export function useCheckedData() {
  const checkedData = reactive<LeftAndRightData>({
    left: [],
    right: [],
  });
  function setCheckedData(leftOrRight: LeftOrRight, item: IDataItem) {
    switch (leftOrRight) {
      case LeftOrRight.left:
        checkedData.left.push(item);
        break;
      case LeftOrRight.right:
        checkedData.right.push(item);
        break;
      default:
        break;
    }
  }

  function removeCheckedData(leftOrRight: LeftOrRight, id: number) {
    console.log(leftOrRight, id);

    switch (leftOrRight) {
      case LeftOrRight.left:
        checkedData.left = checkedData.left.filter((item) => item.id !== id);
        break;
      case LeftOrRight.right:
        checkedData.right = checkedData.right.filter((item) => item.id !== id);
        break;
      default:
        break;
    }
  }
  return [checkedData, setCheckedData, removeCheckedData] as const;
}

export function useRightListData(
  initalData: IDataItem[],
  useCheckedData: LeftAndRightData
) {
  const rightListData = ref(initalData);
  function setRightListData(newData: IDataItem[]) {
    // 只添加新的数据
    const oldDataIds = rightListData.value.map((item) => item.id);
    const addData = newData.filter((item) => !oldDataIds.includes(item.id));
    rightListData.value = [...rightListData.value, ...addData];
    useCheckedData.left = [];
  }
  function removeRightListData(newData: IDataItem[]) {
    newData.forEach((item) => {
      rightListData.value = rightListData.value.filter(
        (rightItem) => rightItem.id !== item.id
      );
    });
    useCheckedData.right = [];
  }
  return [rightListData, setRightListData, removeRightListData] as const;
}

export function useComputedData(
  data: IData[],
  targetIndex: Ref<number>,
  rightListData: Ref<IDataItem[]>,
  useCheckedData: LeftAndRightData
) {
  const leftTitle = computed(() => data[targetIndex.value].title);
  const leftListData = computed(() => {
    const { data: currentData } = data[targetIndex.value];

    return currentData.filter((item) => {
      if (!rightListData.value.find(({ id }) => id === item.id)) {
        return item;
      }
    });
  });

  const transferButtonDisabled = computed(() => ({
    left: !useCheckedData.right.length,
    right: !useCheckedData.left.length,
  }));
  return {
    leftTitle,
    leftListData,
    transferButtonDisabled,
  } as const;
}

export function useDragedItem() {
  const dragedItem = ref<IDataItem>();

  function setDragedItem(item: IDataItem) {
    dragedItem.value = item;
  }

  return [dragedItem, setDragedItem] as const;
}
