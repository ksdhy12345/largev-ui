// 导入组件，组件必须声明 name
import WordCloud from './WordCloud.vue'

// 为组件提供 install 安装方法，供按需引入
WordCloud.install = function (Vue) {
  Vue.component(WordCloud.name, WordCloud)
}
// 默认导出组件
export default WordCloud;
