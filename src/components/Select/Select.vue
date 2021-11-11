<template>
  <div class="ls-select" tabindex="0" @blur="showList = false" @keypress.enter="handleClick">
    <ls-input
      :disabled="isInputDisabled"
      :placeholder="placeholder"
      class="ls-select-container"
      v-model="selectLabel"
      @click="handleClick"
      @blur="handleBlur"
      @focus="showList = false"
      @change.stop
      ref="input"
    ></ls-input>

    <i
      class="iconfont icon-shangla ls-select-icon"
      :class="{'ls-select-click':showList}"
      @click="handleClick"
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
      >
        <ls-option v-if="isEmpty" empty>{{empty}}</ls-option>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
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
      validator: (val) => ['default', 'search'].includes(val),
      default: 'default',
    },
  },
  emits: ['update:modelValue,change'],
  provide() {
    return { change: this.change, selected: () => this.select }
  },
  methods: {
    change(value, label) {
      this.$emit('update:modelValue', value)
      value !== '' && this.$emit('change', value)
      this.select = value
      this.selectLabel = label
      this.showList = false
    },
  },
  setup(props, { slots }) {
    // 传入条目
    const children = ref(0)
    const showList = ref(false)
    const position = ref('left')
    const height = ref(0)
    const isEmpty = ref(false)
    const select = ref('')
    const selectLabel = ref('')
    const input = ref(null)

    const isInputDisabled = computed(
      () => props.type == 'default' && !props.filter
    )

    const handleClick = () => {
      showList.value = !showList.value
      if (!isInputDisabled.value && !showList.value) input.value.blur()
      if (select.value == '') {
        selectLabel.value = ''
      }
    }

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
    const menuLeave = function (el) {
      el.style.maxHeight = 0
      el.style.transition = 'all 0.2s ease-out'
    }

    const handleBlur = () => {
      showList.value = false
      if (select.value == '') {
        selectLabel.value = ''
      }
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
      selectLabel,
      input,
      selectLabel,
      isInputDisabled,
      handleBlur,
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
}
.ls-select {
  display: flex;
  align-items: center;
  width: 350px;
  border: 1px solid var(--default);
  cursor: pointer;
  position: relative;
}
.ls-select-container {
  cursor: pointer;
  border: none;
}
.ls-select-icon {
  margin: 0 10px;
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