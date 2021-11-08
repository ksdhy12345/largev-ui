import { render, createVNode } from 'vue';
import message from './Message.vue'
const arr = [];
let timer = null;
// 方案一：全部刷新
const success = (conf) => {
  arr.unshift(conf)
  if (!timer) {
    timer = setInterval(() => {
      if (!arr.length) {
        clearInterval(timer);
        timer = null;
        render(null, document.body)
      }
      arr.pop()
      render(null, document.body)
      render(createVNode(message, { arr }), document.body)
    }, 2000);
  }
  render(null, document.body)
  render(createVNode(message, { arr }), document.body)
}
const error = () => {
  render(null, document.body)
}

const Message = {
  success,
  error
}

// 默认导出组件
export default Message
