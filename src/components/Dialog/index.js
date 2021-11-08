// 导入组件，组件必须声明 name
import dialog from './Dialog.vue'

// 为组件提供 install 安装方法，供按需引入
dialog.install = function (Vue) {
  Vue.component(dialog.name, dialog)
}

// 默认导出组件
export default dialog;
