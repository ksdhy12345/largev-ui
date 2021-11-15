<template>
  <div>
    <h2>下拉框</h2>
    <h5>普通下拉框</h5>
    <ls-select v-model="data" @change="handleChange">
      <ls-option v-for="item in list" :key="item.value" :value="item.id">{{item.name}}</ls-option>
    </ls-select>
    <h5>带筛选的下拉框</h5>
    <ls-select v-model="data" @change="handleChange" filter>
      <ls-option v-for="item in list" :key="item.value" :value="item.id">{{item.name}}</ls-option>
    </ls-select>
    <h5>多选的下拉框</h5>
    <ls-select v-model="data" @change="handleChange" multiple>
      <ls-option v-for="item in list" :key="item.value" :value="item.id">{{item.name}}</ls-option>
    </ls-select>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Message from '../components/Message'
export default {
  setup() {
    const data = ref('')
    const list = ref([
      {
        id: 1,
        name: '张三',
      },
      {
        id: 2,
        name: '李四',
      },
      {
        id: 3,
        name: '王五',
      },
    ])
    const list2 = ref([
      {
        id: 1,
        name: '张三',
      },
      {
        id: 2,
        name: '李四',
      },
      {
        id: 3,
        name: '王五',
      },
    ])
    const handleChange = (value) => {
      // Message.success({
      //   msg: '选中了' + value,
      // })
    }

    // const getlist = () => {
    //   fetch('http://localhost:8081')
    //     .then(function (response) {
    //       return response.json()
    //     })
    //     .then(function (myJson) {
    //       list.value = myJson
    //     })
    // }

    // getlist()

    return { data, handleChange, list, list2 }
  },
}
</script>

<style>
</style>