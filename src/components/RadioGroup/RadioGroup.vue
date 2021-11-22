<template>
  <slot></slot>
</template>

<script>
import { provide, ref } from '@vue/runtime-core'
export default {
  name: 'LsRadioGroup',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const selected = ref(props.modelValue)
    provide('selected', () => selected)
    provide('change', (val) => {
      selected.value = val
      emit('update:modelValue', val)
      emit('change', val)
    })
  },
}
</script>

<style>
</style>