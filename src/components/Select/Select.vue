<template>
  <div class="ls-select" tabindex="0" @blur="showList = false">
    <ls-input
      :disabled="isInputDisabled"
      :placeholder="select.selectLabel || placeholder"
      class="ls-select-container"
      v-model="inputValue"
      @click="handleClick"
      @focus="handleInputFocus"
      @change.stop
      @blur="handleInputBlur"
      ref="input"
    ></ls-input>

    <i
      class="iconfont icon-shangla ls-select-icon"
      style="font-size:1rem"
      :class="{'ls-select-click':showList}"
    ></i>
    <transition
      name="default"
      v-on:enter="menuEnter"
      v-on:leave="menuLeave"
      enter-class="default-enter"
      leave-to-class="default-leave-to"
    >
      <div
        class="ls-select-options"
        v-if="showList"
        :style="[position == 'left' ? 'left:0' : 'right:0' ]"
        :height="height + 'rem'"
        ref="options"
      >
        <ls-option v-if="isEmpty" empty>{{empty}}</ls-option>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, reactive, ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
import Option from '../Option/Option.vue'
export default {
  components: { Option },
  name: 'LsSelect',
  props: {
    placeholder: {
      type: String,
      default: '请选择',
    },
    maxItem: {
      // 最多展示多少条，再多就会出现下拉框
      type: Number,
      default: 5,
    },
    // v-model
    modelValue: {
      type: String,
      required: true,
    },

    empty: {
      type: String,
      default: '暂无数据',
    },
    filter: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      validator: (val) => ['default'].includes(val),
      default: 'default',
    },
  },
  emits: ['update:modelValue,change'],
  provide() {
    return {
      change: this.change,
      selected: () => this.select.selectValue,
      /**
       * 该方式传递响应式数据会丢失初始数据响应
       */
      filter: () => this.inputValue,
    }
  },

  setup(props, { emit }) {
    // 传入条目
    const children = ref(0)
    const showList = ref(false)
    const position = ref('left')
    const height = ref(0)
    const isEmpty = ref(false)
    const input = ref(null)
    const options = ref(null)

    // input值（可筛选时）
    const inputValue = ref('')

    // 当前选中项
    const select = reactive({
      selectLabel: '',
      selectValue: '',
    })

    const isInputDisabled = computed(
      () => props.type == 'default' && !props.filter
    )

    // 点击 select 选择器
    const handleClick = (e) => {
      showList.value = !showList.value
      if (!showList.value) {
        e.target.blur()
        inputValue.value = select.selectLabel
      }
    }

    // 动画
    const menuEnter = function (el, done) {
      children.value = el.children.length
      el.style.maxHeight =
        (children.value > props.maxItem
          ? props.maxItem * 2
          : children.value * 2) + 'rem'
      if (
        (children.value == 1 && el.children[0].attributes.empty) ||
        children.value == 0
      ) {
        isEmpty.value = true
        el.style.maxHeight = '2rem'
      }
      el.style.transition = 'all 0.2s ease-in'
      done()
      if (children.value <= props.maxItem) {
        el.style.overflowY = 'hidden'
      } else {
        el.style.overflowY = 'auto'
      }
    }
    // 动画
    const menuLeave = function (el) {
      el.style.maxHeight = 0
      el.style.transition = 'all 0.2s ease-out'
    }

    // 子组件选中调用父组件的change
    /**
     * @param value 选中的值
     * @param label 选中值的文本
     */
    const change = (value, label) => {
      // 展示文本的改变
      select.selectLabel = label
      inputValue.value = label
      // 记录选中的值
      select.selectValue = value
      // 响应外层的 v-model
      emit('update:modelValue', value)
      // 响应外层的 onchange
      value !== '' && emit('change', value)
      // 关闭选项列表
      showList.value = false
      input.value.blur()
    }

    // 筛选过滤结果为空时提供空值
    watch(inputValue, () => {
      if (inputValue.value == '') {
        isEmpty.value = false
      } else {
        nextTick(() => {
          if (!isInputDisabled.value && showList.value) {
            if (
              !Array.from(options.value.children).filter(
                (el) =>
                  el.attributes.ismatch.value == 'true' &&
                  el.attributes.empty.value != 'true'
              ).length
            ) {
              isEmpty.value = true
            } else {
              isEmpty.value = false
            }
          }
        })
      }
    })

    const handleInputFocus = (e) => {
      inputValue.value = ''
    }

    const handleInputBlur = () => {
      inputValue.value = select.selectLabel
      showList.value = false
    }

    return {
      showList,
      position,
      height,
      handleClick,
      menuEnter,
      menuLeave,
      children,
      isEmpty,
      select,
      handleInputFocus,
      handleInputBlur,
      input,
      isInputDisabled,
      change,
      options,
      inputValue,
    }
  },
}
</script>

<style src="../root.css"></style>
<style>
.ls-select-click {
  transform: rotate(180deg);
}
.ls-select-icon {
  transition: all 300ms;
  position: absolute;
  top: 0;
  right: 0;
}
.ls-select {
  width: 20rem;
  border: 1px solid var(--default);
  cursor: pointer;
  position: relative;
}
.ls-select-container {
  cursor: pointer;
  border: none;
}
.ls-select-icon {
  padding: 0.8rem 1rem;
}
.ls-select-options {
  position: absolute;
  min-width: 100%;
  border: 1px solid #e6e6e6cc;
  background-color: #fff;
  padding: 0.3125rem 0;
  box-shadow: 0.1875rem 0.1875rem 0.3125rem 0.125rem #f0f0f0;
  border-radius: 0.3125rem;
  top: calc(100% + 0.625rem);
  overflow-y: hidden;
  z-index: var(--select-option-zIndex);
}
::-webkit-scrollbar {
  width: 0.3125rem;
  height: 0.3125rem;
}
::-webkit-scrollbar-thumb {
  background-color: var(--default);
  background-clip: padding-box; /*背景被裁剪到内边距框   content-box 背景裁剪到内容框*/
  min-height: 1.75rem;
  border-radius: 0.125rem;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
}

.default-enter-active {
  transition: all 0.2s ease-in;
}

.default-leave-active {
  transition: all 0.2s ease-out;
}

.default-enter,
.default-leave-to {
  max-height: 0;
}
</style>