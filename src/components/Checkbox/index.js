// 导入组件，组件必须声明 name
import checkbox from './Checkbox.vue'

// 为组件提供 install 安装方法，供按需引入
checkbox.install = function (Vue) {
  Vue.component(checkbox.name, checkbox)
}

// 默认导出组件
export default checkbox;
