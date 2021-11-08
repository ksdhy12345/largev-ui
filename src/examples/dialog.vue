<template>
  <div>
    <h2>对话框</h2>
    <ls-button @click="visibility = !visibility">弹出Dialog</ls-button>
    <ls-dialog
      :visibility="visibility"
      @ok="visibility = !visibility"
      @cancel="visibility = !visibility"
    >
      <p>这是一条消息这是一条消息...</p>
      <p>这是一条消息这是一条消息...</p>
      <p>这是一条消息这是一条消息...</p>
    </ls-dialog>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup() {
    let i = 0
    const handleClick = (event) => {
      Message.success({
        msg: `第${i++}条内容`,
      })
    }
    const handleClick2 = (event) => {
      Message.error()
    }
    const visibility = ref(false)

    return {
      handleClick,
      handleClick2,
      visibility,
    }
  },
}
</script>

<style scoped>
p {
  text-align: center;
}
</style>