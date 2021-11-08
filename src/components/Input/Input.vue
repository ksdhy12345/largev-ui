<template>
  <div
    class="ls-input"
    :class="[
      {'ls-input-disabled':disabled},
      {'ls-input-hover':hover},
    ]"
    :style="{width:width+'px'}"
    ref="inputOut"
  >
    <i
      class="iconfont ls-input-icon"
      :class="beforeIcon"
      v-if="beforeIcon"
      @click="beforeIconClick"
    ></i>
    <input
      ref="input"
      class="ls-input-inner"
      :class="[
        {'ls-input-disabled':disabled},
        $attrs.class
      ]"
      :type="type"
      :name="name"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      :value="modelValue || value"
      :placeholder="placeholder"
      :disabled="disabled"
      :autofocus="autofocus"
      autocomplete="false"
    />
    <i class="iconfont icon-guanbi ls-input-icon" v-if="isClear" @click="clear"></i>
    <i class="iconfont ls-input-icon" :class="afterIcon" v-if="afterIcon" @click="afterIconClick"></i>
    <i
      class="iconfont ls-input-icon icon-yanjing"
      v-if="type === 'password'"
      @click="tabShowPassword"
    ></i>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { inject, nextTick } from '@vue/runtime-core'
export default {
  name: 'LsInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      name: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      required: true,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    afterIcon: {
      type: String,
      default: '',
    },
    beforeIcon: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 300,
    },
  },
  emits: [
    'update:modelValue',
    'blur',
    'focus',
    'afterIconClick',
    'beforeIconClick',
  ],
  inject: ['rlues', 'success', 'error'],
  setup(props, ctx) {
    const { emit } = ctx

    const input = ref(null)
    const hover = ref(false)
    const value = ref('')

    const rules = inject('rules')
    const success = inject('success')
    const error = inject('error')

    const handleInput = (event) => {
      emit('update:modelValue', event.target.value)
    }

    const isClear = computed(() => {
      return props.clearable && props.modelValue && !props.disabled
    })

    const clear = () => {
      emit('update:modelValue', '')
      input.value.focus()
    }

    const handleFocus = (event) => {
      if (!props.disabled) hover.value = true
      emit('focus', event)
    }

    const validator = (value) => {
      // 非空校验
      if (rules.required && !value.trim().length) {
        error(rules.message || '请填写此项')
        return
      }
      // 自定义校验
      if (rules.validator) {
        let info = rules.validator(value)
        if (!info.message) console.warn('请指定显示的错误提示信息')
        info.result ? success() : error(info.message)
      }
    }

    const handleBlur = (event) => {
      if (!props.disabled) hover.value = false
      rules && validator(event.target.value)
      emit('blur', event)
    }

    const afterIconClick = () => {
      emit('afterIconClick')
    }

    const tabShowPassword = () => {
      input.value.type = input.value.type === 'text' ? 'password' : 'text'
    }

    const beforeIconClick = () => {
      emit('afterIconClick')
    }

    return {
      handleInput,
      isClear,
      clear,
      handleFocus,
      handleBlur,
      afterIconClick,
      beforeIconClick,
      input,
      hover,
      value,
      tabShowPassword,
    }
  },
}
</script>
<style src="../root.css"></style>
<style>
.ls-input {
  display: inline-block;
  border: 1px solid var(--default);
  padding: 12px 15px;
  /* display: inline-flex; */
  display: flex;
}

.ls-input-hover {
  border-color: var(--hover);
}

.ls-input:hover {
  border-color: var(--hover);
}

.ls-input-disabled {
  cursor: not-allowed;
}

.ls-input-inner {
  border: none;
  display: block;
  outline: none;
  width: 100%;
}
.ls-input-inner:disabled {
  background-color: transparent;
}

.ls-input-icon {
  cursor: pointer;
}
.ls-input-icon:first-child {
  margin-right: 15px;
}
.ls-input-icon:nth-child(3),
.ls-input-icon:nth-child(4) {
  margin-left: 15px;
}
</style>