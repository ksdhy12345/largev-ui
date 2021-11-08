<template>
  <div class="ls-select" @click="showList=!showList">
    <ls-input disabled :placeholder="placeholder" class="ls-select-container"></ls-input>
    <i class="iconfont icon-shangla ls-select-icon" :class="{'ls-select-click':showList}"></i>
    <transition @before-enter="beforeEnter" @enter="enter">
      <div
        class="ls-select-options"
        v-show="showList"
        :style="[position == 'left' ? 'left:0' : 'right:0' ]"
        ref="options"
        :height="height + 'rem'"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
export default {
  name: 'LsSelect',
  props: {
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  provide(){
    return 
  },
  setup() {
    const showList = ref(false)
    const position = ref('left')
    const options = ref(null)
    const height = ref(0)

    // onMounted(() => {
    //   let childrenNum = options.value.children.length
    //   height.value = childrenNum > 5 ? 10 : childrenNum * 2
    // })

    const enter = (el, done) => {
    }

    const beforeEnter = () => {
    }

    return { showList, position, options, height, enter, beforeEnter }
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
  padding: 0.3125rem 0;
  box-shadow: 0.1875rem 0.1875rem 0.3125rem 0.125rem #f0f0f0;
  border-radius: 0.3125rem;
  top: calc(100% + 0.625rem);
  max-height: 10rem;
  overflow-y: auto;
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
/* .fade-enter-active,
.fade-leave-active {
  transition: height 1s ease;
  height: 100px;
}

.fade-enter-from,
.fade-leave-to {
  height: 0;
} */
</style>