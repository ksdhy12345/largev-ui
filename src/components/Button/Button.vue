<template>
  <button
    class="ls-btn"
    :disabled="disabled"
    :class="[
        {'ls-btn-disabled':disabled},
        {'ls-btn-type-circle':type=='circle'},
        {'ls-btn-type-icon':type=='icon'},
        {'ls-btn-danger':danger},
        {'ls-btn-warning':warning},
        {'ls-btn-success':success},
        {'ls-btn-primary':primary},
      ]"
    @click="handleClick"
  >
    <i :class="'ls-btn-before-icon iconfont ' + prefix" v-if="prefix"></i>
    <slot></slot>
    <i :class="'ls-btn-after-icon iconfont ' + suffix" v-if="suffix"></i>
  </button>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
  name: 'LsButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
      validator: (val) => ['default', 'circle', 'icon'].includes(val),
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    danger: {
      type: Boolean,
      default: false,
    },
    warning: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (event) => {
      emit('click', event)
    }
    return {
      handleClick,
    }
  },
}
</script>

<style src="../root.css"></style>
<style>
.ls-btn {
  background-color: #fff;
  border: 1px solid var(--default);
  border-radius: 0.1875rem;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
.ls-btn:active {
  background-color: var(--btn-click);
}

.ls-btn-type-circle {
  border-radius: 1.5625rem;
  padding: 0.75rem 1.4375rem;
}
.ls-btn-type-icon {
  border-radius: 50%;
  padding: 0.75rem 0.75rem;
}
.ls-btn-disabled {
  cursor: not-allowed;
}
.ls-btn-before-icon {
  margin-right: 0.625rem;
}
.ls-btn-after-icon {
  margin-left: 0.625rem;
}
.ls-btn-primary {
  color: #fff;
  border: none;
  background-color: var(--primary);
}
.ls-btn-primary:active {
  color: #fff;
  border: none;
  background-color: var(--primary-select);
}
.ls-btn-danger {
  color: #fff;
  border: none;
  background-color: var(--danger);
}
.ls-btn-danger:active {
  color: #fff;
  border: none;
  background-color: var(--danger-select);
}
.ls-btn-warning {
  color: #fff;
  border: none;
  background-color: var(--warning);
}
.ls-btn-warning:active {
  color: #fff;
  border: none;
  background-color: var(--warning-select);
}
.ls-btn-success {
  color: #fff;
  border: none;
  background-color: var(--success);
}
.ls-btn-success:active {
  color: #fff;
  border: none;
  background-color: var(--success-select);
}
</style>