import { computed, reactive, Ref, ref, toRef } from "vue";
import { LeftOrRight } from "../extends/data";

export function useTargetIndex(initalIndex: number) {
  const targetIndex = ref<number>(initalIndex);

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
/**
 * 
 * @param leftOrRight 左侧或右侧
 * @param id 数据id
 */
  function removeCheckedData(leftOrRight: LeftOrRight, id: number) {
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
    // 过滤出可以被添加的数据老数据中没有且disabled为false的数据
    const addData = newData.filter(
      (item) => !oldDataIds.includes(item.id) && !item.disabled
    );
    rightListData.value = [...rightListData.value, ...addData];
    // 添加完成后清除选择状态
    newData.forEach((item) => {
      item.checked = false;
    });
    // 添加完成后，将已选中的数据清空
    useCheckedData.left = [];
  }
  /**
   * 删除右侧数据
   * @param IDataItem[] 需要被删除的数据
   */
  function removeRightListData(newData: IDataItem[]) {
      // 右侧数据等于右侧数据减去被选中的数据
    rightListData.value = rightListData.value.filter((item)=>newData.every((newItem)=>newItem.id!==item.id));
    newData.forEach((item) => {
      item.checked = false;
    });
    useCheckedData.right = [];
  }
  return [rightListData, setRightListData, removeRightListData] as const;
}
/**
 * 计算属性
 * @param data 数据源
 * @param targetIndex 初始化的目标索引
 * @param rightListData 初始化的右侧数据
 * @param useCheckedData 初始化的左右数据
 */
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
