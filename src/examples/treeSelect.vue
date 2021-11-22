<template>
  <div>
    <h2>树状选择器</h2>
    <ls-tree-select :data="data"></ls-tree-select>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
  setup() {
    const data = [
      {
        label: '一级标题1',
        children: [
          {
            label: '二级标题1',
            children: [
              {
                label: '三级标题1',
              },
            ],
          },
        ],
      },
      {
        label: '一级标题2',
        children: [
          {
            label: '二级标题2',
            children: [
              {
                label: '三级标题2',
              },
            ],
          },
        ],
      },
      {
        label: '一级标题3',
        children: [
          {
            label: '二级标题3',
            children: [
              {
                label: '三级标题3',
              },
            ],
          },
        ],
      },
    ]
    return {
      data,
    }
  },
}
</script>

<style>
</style>