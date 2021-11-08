<template>
  <div class="ls-message-container">
    <div class="ls-message" v-for="item in arr" :key="item">{{item.msg}}</div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { onMounted, onUnmounted } from '@vue/runtime-core'
export default {
  name: 'LsMessage',
  props: {
    arr: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    // const visibility = ref(false)
    // onMounted(() => {
    //   visibility.value = true
    //   // 3秒后
    //   setTimeout(() => {
    //     emit('distory')
    //   }, 3000)
    // })
    // onUnmounted(() => {
    //   console.log('组件卸载...')
    // })
    return {
      //  visibility
    }
  },
}
</script>

<style>
.ls-message-container {
  position: fixed;
  top: 50px;
  left: 50%;
  margin-left: -300px;
  width: 600px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.ls-message {
  margin: 10px 0;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  width: 100%;
  text-align: center;
}
</style>