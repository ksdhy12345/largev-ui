<template>
  <h2>普通多选</h2>
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
  <br />
  <ls-table :data="data1" :column="column1" checked></ls-table>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import Input from './components/Input/Input.vue'
export default {
  components: { Input },
  setup() {
    const item1 = ref(false)
    const item2 = ref(false)
    const item3 = ref(false)
    const checkedList = ref([])
    const list = ['选项一', '选项二', '选项三']
    const checkAll = ref(false)
    const indeterminate = ref(false)

    const column1 = [
      { key: 'name', text: '姓名' },
      { key: 'age', text: '年龄' },
    ]
    const data1 = [
      {
        id: 1,
        name: '张三',
        age: '181',
      },
      { id: 2, name: '李四', age: '189' },
      { id: 3, name: '王五', age: '18' },
    ]

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
      column1,
      data1,
    }
  },
}
</script>

<style>
body {
  padding: 50px;
}
</style>