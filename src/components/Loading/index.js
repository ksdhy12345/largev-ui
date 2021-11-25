// 导入组件，组件必须声明 name
import loading from './Loading.vue'

// 为组件提供 install 安装方法，供按需引入
loading.install = function (Vue) {
  Vue.component(loading.name, loading)
}
// 默认导出组件
export default loading;
