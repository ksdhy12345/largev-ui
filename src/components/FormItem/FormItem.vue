<template>
  <div class="ls-form-item">
    <label v-if="label" class="ls-label" :style="{width:this.form.labelWidth}">
      {{label}}
      <span v-if="mark">:</span>
    </label>
    <div class="ls-form-item-body">
      <slot></slot>
      <div class="ls-message-info">
        <transition name="fade">
          <span v-if="!resultInfo.result">{{resultInfo.message}}</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, onMounted, reactive, ref } from '@vue/runtime-core'
import { emitter } from '../Form/Form.vue'
export default {
  name: 'LsFormItem',
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
    mark: {
      type: Boolean,
      default: true,
    },
  },
  inject: ['form'],
  provide() {
    if (!inject('form')) {
      throw new Error('ls-form-item 组件必须放在 ls-Form 组件内')
    }
    return {
      rules: inject('form').rules[this.$props.prop],
      success: this.success,
      error: this.error,
    }
  },
  setup(props) {
    const resultInfo = reactive({ result: true, message: '' })
    const form = inject('form')
    const getResult = inject('getResult')
    const rules = form.rules[props.prop]

    // 验证成功
    const success = () => {
      resultInfo.result = true
      resultInfo.message = ''
    }

    // 验证失败
    const error = (errMessage) => {
      resultInfo.result = false
      resultInfo.message = errMessage
    }
    // 主动验证（点击submit）
    const validator = (callback) => {
      if (!rules) return
      const value = form.model[props.prop]
      // 非空校验
      if (rules.required && !value.trim().length) {
        error(rules.message || '请填写此项')
        getResult({
          result: false,
          message: rules.message || '请填写此项',
        })

        return
      }
      // 自定义校验
      if (rules.validator) {
        let info = rules.validator(value)
        if (!info.message) console.warn('请指定显示的错误提示信息')
        if (info.result) {
          success()
        } else {
          error(info.message)
          getResult({
            result: false,
            message: info.message,
          })
        }
      }
    }

    emitter.on('submit', () => {
      validator()
    })

    return {
      resultInfo,
      success,
      error,
    }
  },
}
</script>

<style>
.ls-form-item {
  display: flex;
  align-items: center;
  margin: 40px 0;
}
.ls-label {
  /* min-width: 150px;*/
  padding: 5px 10px;
  text-align: right;
}
.ls-form-item-body {
  position: relative;
}
.ls-message-info {
  position: absolute;
  color: red;
  top: 100%;
  font-size: 12px;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
</style>