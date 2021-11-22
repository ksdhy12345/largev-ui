<template>
  <div class="ls-radio" :class="{'ls-radio-selected':selected}" @click="handleClick">
    <span class="ls-radio-before"></span>
    <slot></slot>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
export default {
  name: 'LsRadio',
  props: {
    value: {
      type: Boolean,
      required: false,
    },
  },
  inject: ['selected', 'change'],
  setup(props, { emit }) {
    const initSelected = inject('selected')
    const change = inject('change')
    const selected = computed(() => initSelected().value == props.value)

    const handleClick = () => {
      change(props.value)
    }

    return {
      selected,
      handleClick,
    }
  },
}
</script>

<style scoped>
.ls-radio {
  display: inline-flex;
  margin-right: 1rem;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.ls-radio-before {
  display: inline-flex;
  margin-right: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid var(--radio-border-color);
  justify-content: center;
  align-items: center;
}

.ls-radio-selected {
  color: var(--primary);
}

.ls-radio-selected .ls-radio-before {
  background-color: var(--primary);
  border-color: transparent;
}

.ls-radio-selected .ls-radio-before::before {
  content: '';
  height: 0.35rem;
  width: 0.35rem;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
}
</style>