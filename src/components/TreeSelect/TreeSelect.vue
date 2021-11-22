<template>
  <ul>
    <ls-tree-select-item :item="item" v-for="(item,i) in data" :key="i"></ls-tree-select-item>
  </ul>
</template>

<script>
import { ref } from '@vue/reactivity'
import LsTreeSelectItem from './TreeSelectItem.vue'
export default {
  name: 'LsTreeSelect',
  components: { LsTreeSelectItem },
  props: {
    data: {
      type: Array,
      required: true,
      default: [],
    },
  },
  setup(props) {
    const list = ref(props.data)
    const handleClick = (val) => {
      if (val) console.log(val.parent())
    }

    return {
      handleClick,
      list,
    }
  },
}
</script>
<style src="../root.css"></style>
<style scoped>
ul {
  padding-left: 1em;
  line-height: 1.5em;
}
</style>