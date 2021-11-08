// 导入组件，组件必须声明 name
import formItem from './FormItem.vue'

// 为组件提供 install 安装方法，供按需引入
formItem.install = function (Vue) {
  Vue.component(formItem.name, formItem)
}

// 默认导出组件
export default formItem;
