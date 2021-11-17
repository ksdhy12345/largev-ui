<template>
  <ls-table :data="data" borderd :column="column">
    <template #del="scope">
      <ls-button danger>删除id:{{scope.row.id}}</ls-button>
    </template>
    <template #edit="scope">
      <ls-button primary>编辑id:{{scope.row.id}}</ls-button>
    </template>
    <template #age="scope">
      <span style="color:red">{{scope.row.age}}</span>
    </template>
  </ls-table>
</template>

<script>
export default {
  data() {
    return {
      column: [
        { key: 'name', text: '姓名' },
        { key: 'age', text: '年龄', a: true },
        { key: 'edit', text: '编辑' },
        { key: 'del', text: '删除' },
      ],
      data: [
        {
          id: 1,
          name: '张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三',
          age: '181',
        },
        { id: 2, name: '李四', age: '189' },
        { id: 3, name: '王五', age: '18' },
      ],
    }
  },
}
</script>

<style>
</style>