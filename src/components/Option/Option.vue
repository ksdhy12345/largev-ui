<template>
  <div
    class="ls-option"
    :class="{'ls-option-empty':empty,'ls-option-selected':selected() == value}"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script>
import { inject, ref, watch } from '@vue/runtime-core'
export default {
  name: 'LsOption',
  inject: ['select'],
  props: {
    value: {
      type: String,
      default: '',
    },
    empty: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const change = inject('change')
    const selected = inject('selected')

    const handleClick = (e) => {
      if (!props.empty) {
        change(props.value, e.target.innerText)
      }
    }
    return {
      handleClick,
      change,
      selected,
    }
  },
}
</script>
<style src="../root.css"></style>
<style scoped>
.ls-option {
  padding: 0 2rem 0 1.25rem;
  font-size: 0.8rem;
  line-height: 2rem;
  white-space: nowrap;
}
.ls-option:hover {
  background-color: var(--select-selected);
}
.ls-option-empty {
  text-align: center;
  cursor: default;
}
.ls-option-empty:hover {
  background-color: inherit;
}
.ls-option-selected {
  background-color: var(--select-selected);
  color: var(--primary);
  font-weight: 700;
}
</style>