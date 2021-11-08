<template>
  <transition name="fade" appear>
    <div class="ls-dialog-mask" v-if="visibility" :style="{zIndex}">
      <div class="ls-dialog-content">
        <div class="ls-dialog-header">{{title}}</div>
        <div class="ls-dialog-body">
          <slot></slot>
        </div>
        <div class="ls-dialog-footer">
          <ls-button v-if="isOk" @click="handleOk">{{okText}}</ls-button>
          <ls-button v-if="isCancel" @click="handleCancel">{{cancelText}}</ls-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LsDialog',
  props: {
    visibility: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
    isOk: {
      type: Boolean,
      default: true,
    },
    isCancel: {
      type: Boolean,
      default: true,
    },
    okText: {
      type: String,
      default: '确认',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    zIndex: {
      type: Number,
      default: 100,
    },
  },
  emits: ['ok', 'cancel'],
  setup(props, { emit }) {
    const handleOk = (event) => {
      emit('ok', event)
    }
    const handleCancel = (event) => {
      emit('cancel', event)
    }
    return {
      handleOk,
      handleCancel,
    }
  },
}
</script>

<style scoped>
.ls-dialog-footer {
  display: flex;
}
.ls-dialog-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  background-color: rgba(0, 0, 0, 0.5);
}

.ls-dialog-content {
  min-width: 400px;
  background-color: #fff;
  border-radius: 5px;
}

.ls-dialog-header {
  padding: 15px;
  font-size: 18px;
}
.ls-dialog-body {
  padding: 0 15px;
}
.ls-dialog-footer {
  display: flex;
  flex-flow: row-reverse;
  padding: 15px;
}

.ls-dialog-footer .ls-btn {
  margin-left: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>