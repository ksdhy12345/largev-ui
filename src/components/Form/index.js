// 导入组件，组件必须声明 name
import form from './Form.vue'

// 为组件提供 install 安装方法，供按需引入
form.install = function (Vue) {
  Vue.component(form.name, form)
}

// 默认导出组件
export default form;
