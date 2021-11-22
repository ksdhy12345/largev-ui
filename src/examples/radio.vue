<template>
  <div>
    <h2>单选</h2>
    <ls-radio-group v-model="radio" @change="handleChange">
      <ls-radio value="1">选项一</ls-radio>
      <ls-radio value="2">选项二</ls-radio>
    </ls-radio-group>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
  setup() {
    const radio = ref('1')
    const handleChange = (val) => console.log('selected:' + val)
    return {
      radio,
      handleChange,
    }
  },
}
</script>

<style>
</style>