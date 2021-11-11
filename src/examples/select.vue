<template>
  <div>
    <h2>下拉框</h2>
    <ls-select v-model="data" @change="handleChange" filter>
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
    const list = ref([])
    const handleChange = (value) => {
      console.log(value)
      Message.success({
        msg: '选中了' + value,
      })
    }

    const getlist = () => {
      fetch('http://localhost:8081')
        .then(function (response) {
          return response.json()
        })
        .then(function (myJson) {
          list.value = myJson
        })
    }

    getlist()

    return { data, handleChange, list }
  },
}
</script>

<style>
</style>