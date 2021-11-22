// 导入组件，组件必须声明 name
import radioGroup from './RadioGroup.vue'

// 为组件提供 install 安装方法，供按需引入
radioGroup.install = function (Vue) {
  Vue.component(radioGroup.name, radioGroup)
}
// 默认导出组件
export default radioGroup;
