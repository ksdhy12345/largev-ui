<template>
  <div class="ls-form">
    <slot></slot>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
/**
 * 1. form组件需要可以绑定表单值（v-model）
 * 2. 表单的提交
 * 3. 表单字段验证
 * 4. 表单数据收集
 */
import mitt from 'mitt'
export const emitter = new mitt()
export default {
  name: 'LsForm',
  props: {
    model: {
      type: Object,
      required: true,
    },
    labelWidth: {
      type: String,
      default: '80px',
    },
    rules: {
      type: Object,
    },
  },
  data() {
    return {
      result: [],
    }
  },
  provide() {
    return { form: this.$props, getResult: this.getResult }
  },
  methods: {
    validate(cb) {
      this.$data.result = []
      emitter.emit('submit')
      cb(!this.$data.result.length, this.$props.model)
    },
    getResult(value) {
      this.$data.result.push(value)
    },
  },
}
</script>

<style>
</style>

