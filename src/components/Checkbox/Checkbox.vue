<template>
  <div class="ls-checkbox">
    <span
      class="ls-checkbox-before"
      :class="[
      {'ls-checkbox-before-checked': !indeterminate && (modelValue === undefined ? isChecked : modelValue)},
      {
        'ls-checkbox-before-indeterminate':indeterminate
      }
      ]"
      @click="handleClick"
    ></span>
    <span
      class="ls-checkbox-label"
      :class="{'ls-checkbox-label-checked':modelValue === undefined ? isChecked : modelValue ||indeterminate}"
      @click="handleClick"
    >{{label}}</span>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch, inject } from '@vue/runtime-core'
export default {
  name: 'LsCheckbox',
  props: {
    label: {
      type: String,
      default: '',
    },
    // 兼容表格的写法
    labelData: {
      type: Object,
      default: {},
    },
    modelValue: {
      type: String,
      required: true,
    },
    // 半选
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  inject: ['checkboxGroup', 'initList'],
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const checkboxGroupChange = inject('checkboxGroup')
    const initList = inject('initList')
    const isChecked = ref(
      (initList && initList().includes(props.label || props.labelData)) || false
    )

    if (initList) {
      watch(initList, () => {
        if (initList().includes(props.label || props.labelData)) {
          isChecked.value = true
        } else {
          isChecked.value = false
        }
      })
    }

    const handleClick = () => {
      if (props.modelValue !== undefined) {
        emit('change', !props.modelValue)
        emit('update:modelValue', !props.modelValue)
      } else {
        isChecked.value = !isChecked.value
        if (checkboxGroupChange) {
          checkboxGroupChange({
            isChecked: isChecked.value,
            label: props.label,
            labelData: props.labelData,
          })
        }
        emit('change', isChecked.value)
      }
    }

    return {
      handleClick,
      isChecked,
      checkboxGroupChange,
      initList,
    }
  },
}
</script>

<style scoped>
.ls-checkbox {
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
}
.ls-checkbox-before {
  display: inline-flex;
  border: 1px solid var(--default);
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.ls-checkbox-before-checked::after {
  content: '';
  position: absolute;
  top: 50%;
  margin-top: -0.5rem;
  display: block;
  width: 0.3rem;
  height: 0.7rem;
  border-color: var(--primary);
  border-style: solid;
  border-width: 0 0.15rem 0.15rem 0;
  transform: rotate(45deg);
}

.ls-checkbox-label {
  cursor: pointer;
  user-select: none;
}
.ls-checkbox-label-checked {
  color: var(--primary);
}

.ls-checkbox-before-indeterminate:after {
  content: '-';
  color: var(--primary);
  display: inline;
  line-height: 1rem;
  position: absolute;
}
</style>