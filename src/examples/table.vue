<template>
  <div>
    <h2>表格</h2>
    <h3>普通表格</h3>
    <ls-table :data="data1" borderd :column="column1"></ls-table>
    <br />
    <br />
    <br />
    <h3>不带边框的表格</h3>
    <ls-table :data="data1" :column="column1" hover></ls-table>
    <br />
    <br />
    <br />
    <h3>自定义内容的表格</h3>
    <ls-table :data="data3" :column="column3">
      <template #age="scope">
        <span style="color:red">{{scope.row.age}}</span>
      </template>
    </ls-table>
    <br />
    <br />
    <br />
    <h3>加操作的表格</h3>
    <ls-table :data="data2" borderd :column="column2">
      <!-- template 名称和字段名对应，内置绑定变量为row，通过row拿到整行数据 -->
      <!-- <template #[字段名]="scope">
        <ls-button danger>{{scope.row.[字段名]}}</ls-button>
      </template>-->
      <template #del>
        <ls-button danger>删除</ls-button>
      </template>
      <template #edit>
        <ls-button primary>编辑</ls-button>
      </template>
      <template #age="scope">
        <span style="color:red">{{scope.row.age}}</span>
      </template>
    </ls-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 必须传key 对应下面的字段名
      column1: [
        { key: 'name', text: '姓名' },
        { key: 'age', text: '年龄' },
      ],
      data1: [
        {
          id: 1,
          name: '张三',
          age: '181',
        },
        { id: 2, name: '李四', age: '189' },
        { id: 3, name: '王五', age: '18' },
      ],
      column3: [
        { key: 'name', text: '姓名' },
        { key: 'age', text: '年龄', custom: true },
      ],
      data3: [
        {
          id: 1,
          name: '张三',
          age: '181',
        },
        { id: 2, name: '李四', age: '189' },
        { id: 3, name: '王五', age: '18' },
      ],
      column2: [
        { key: 'name', text: '姓名' },
        { key: 'age', text: '年龄', custom: true },
        { key: 'edit', text: '编辑' },
        { key: 'del', text: '删除' },
      ],
      data2: [
        {
          id: 1,
          name: '张三',
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