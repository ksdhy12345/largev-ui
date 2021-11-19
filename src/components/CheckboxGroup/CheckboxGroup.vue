<template>
  <div ref="checkboxGroup">
    <slot></slot>
  </div>
</template>

<script>
import {
  nextTick,
  onBeforeUpdate,
  onMounted,
  provide,
  reactive,
  ref,
  toRaw,
  watch,
} from '@vue/runtime-core'
export default {
  name: 'LsCheckboxGroup',
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
  },
  emits: ['update:modelValue', 'change'],

  setup(props, ctx) {
    const checkboxGroup = ref(null)
    // 计算group里面有多少子项
    // 寻找子节点
    function findNodes() {
      let count = 0
      function find(arr) {
        arr.forEach((item) => {
          if (Array.isArray(item)) {
            find(item)
          } else {
            if (Array.isArray(item.children)) {
              find(item.children)
            } else {
              if (item.type && item.type.name == 'LsCheckbox') {
                count++
              }
            }
          }
        })
      }
      find(ctx.slots.default())
      return count
    }
    const item = findNodes()

    const checkList = ref([...props.modelValue])
    provide('checkboxGroup', (val) => {
      if (val.isChecked) {
        let arr = checkList.value.map((item) => toRaw(item))
        checkList.value = [...arr, val.label || val.labelData]
      } else {
        let arr = checkList.value.map((item) => toRaw(item))
        let newList = [...arr]
        newList.forEach((item, index, arr) => {
          if (toRaw(item) == (val.label || val.labelData)) {
            arr.splice(index, 1)
          }
        })
        checkList.value = newList
      }
    })

    provide('initList', () => checkList.value)

    watch(props, () => {
      checkList.value = props.modelValue
    })

    watch(
      checkList,
      () => {
        if (checkList.value.length == item) {
          ctx.emit('change', { isCheckAll: true, checkList: checkList.value })
          ctx.emit('update:modelValue', checkList.value)
        } else if (
          checkList.value.length > 0 &&
          checkList.value.length < item
        ) {
          ctx.emit('change', {
            isCheckAll: 'indeterminate',
            checkList: checkList.value,
          })
          ctx.emit('update:modelValue', checkList.value)
        } else {
          ctx.emit('change', { isCheckAll: false, checkList: checkList.value })
          ctx.emit('update:modelValue', checkList.value)
        }
      },
      { deep: true }
    )

    onMounted(() => {})
    return {
      checkList,
      checkboxGroup,
    }
  },
}
</script>

<style>
.checkboxGroup {
  width: 100%;
}
</style>