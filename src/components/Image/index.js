// 导入组件，组件必须声明 name
import Image from './Image.vue'

// 为组件提供 install 安装方法，供按需引入
Image.install = function (Vue) {
  Vue.component(Image.name, Image)
}

// 默认导出组件
export default Image;
