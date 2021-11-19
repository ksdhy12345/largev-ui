// 导入组件，组件必须声明 name
import checkboxGroup from './CheckboxGroup.vue'

// 为组件提供 install 安装方法，供按需引入
checkboxGroup.install = function (Vue) {
  Vue.component(checkboxGroup.name, checkboxGroup)
}

// 默认导出组件
export default checkboxGroup;
