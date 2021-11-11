<template>
  <div>
    <h2>输入框</h2>
    <div>
      标准输入框：
      <br />
      <br />
      <ls-input v-model="inputContext.input1" placeholder="请输入内容"></ls-input>
    </div>
    <br />
    <br />
    <div>
      带清空的输入框：
      <br />
      <br />
      <ls-input v-model="inputContext.input2" clearable placeholder="请输入内容"></ls-input>
    </div>
    <br />
    <br />
    <div>
      前置icon的输入框：
      <br />
      <br />
      <ls-input v-model="inputContext.input3" beforeIcon="icon-sousuo" placeholder="请输入内容"></ls-input>
    </div>
    <br />
    <br />
    <div>
      后置icon的输入框：
      <br />
      <br />
      <ls-input v-model="inputContext.input4" afterIcon="icon-sousuo" placeholder="请输入内容"></ls-input>
    </div>
    <br />
    <br />
    <div>
      被禁用的输入框：
      <br />
      <br />
      <ls-input v-model="inputContext.input5" disabled></ls-input>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  setup() {
    const inputContext = reactive({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '已禁用',
    })
    return {
      inputContext,
    }
  },
}
</script>

<style>
</style>