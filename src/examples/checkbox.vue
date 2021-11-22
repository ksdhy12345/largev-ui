<template>
  <div>
    <h2>多选框</h2>
    <br />
    <h3>普通多选</h3>
    <br />
    <br />
    <ls-checkbox label="选项一"></ls-checkbox>
    <br />
    <br />
    <ls-checkbox label="选项二" v-model="item2"></ls-checkbox>
    <br />
    <br />
    <ls-checkbox label="选项三" v-model="item3"></ls-checkbox>
    <br />
    <br />
    <br />
    <h2>全选</h2>
    <br />

    <ls-checkbox
      label="全选"
      v-model="checkAll"
      :indeterminate="indeterminate"
      @change="handleCheckAllChange"
    ></ls-checkbox>
    <br />
    <br />
    <ls-checkbox-group v-model="checkedList" @change="handleCheckList">
      <ls-checkbox v-for="item in list" :key="item" :label="item">{{item}}</ls-checkbox>
    </ls-checkbox-group>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup() {
    const item1 = ref(false)
    const item2 = ref(false)
    const item3 = ref(false)
    const checkedList = ref([])
    const list = ['选项一', '选项二', '选项三']
    const checkAll = ref(false)
    const indeterminate = ref(false)
    // 选项组change
    const handleCheckList = (val) => {
      if (val.isCheckAll == 'indeterminate') indeterminate.value = true
      else {
        indeterminate.value = false
        checkAll.value = val.isCheckAll
      }
    }
    // 全选change
    const handleCheckAllChange = (val) => {
      indeterminate.value = false
      checkedList.value = val ? list : []
    }
    return {
      item1,
      item2,
      item3,
      checkedList,
      list,
      checkAll,
      handleCheckList,
      indeterminate,
      handleCheckAllChange,
    }
  },
}
</script>

<style>
</style>