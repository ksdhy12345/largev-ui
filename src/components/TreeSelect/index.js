// 导入组件，组件必须声明 name
import TreeSelect from './TreeSelect.vue'

// 为组件提供 install 安装方法，供按需引入
TreeSelect.install = function (Vue) {
  Vue.component(TreeSelect.name, TreeSelect)
}
// 默认导出组件
export default TreeSelect;
