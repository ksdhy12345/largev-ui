<template>
  <header>
    <h1>
      largev-ui
      <span>v1.0.0</span>
    </h1>
  </header>
  <div class="container">
    <br />
    <br />
    <br />
    <div class="content">
      <div class="menu">
        <ul>
          <li>
            <a href="#button">按钮</a>
          </li>
          <li>
            <a href="#input">输入框</a>
          </li>
          <li>
            <a href="#form">表单</a>
          </li>
          <li>
            <a href="#dialog">对话框</a>
          </li>
          <li>
            <a href="#select">下拉框</a>
          </li>
          <li>
            <a href="#table">表格</a>
          </li>
          <li>
            <a href="#checkbox">多选框</a>
          </li>
          <li>
            <a href="#radio">单选框</a>
          </li>
          <li>
            <a href="#treeSelect">树形选择器</a>
          </li>
          <li>
            <a href="#wordCloud">词云</a>
          </li>
        </ul>
      </div>
      <div class="inner">
        <div>
          <Button id="button"></Button>
        </div>
        <div>
          <Input id="input"></Input>
        </div>
        <div>
          <Form id="form"></Form>
        </div>
        <div>
          <Dialog id="dialog" />
        </div>
        <div>
          <Select id="select" />
        </div>
        <div>
          <Table id="table" />
        </div>
        <div>
          <Checkbox id="checkbox" />
        </div>
        <div>
          <Radio id="radio" />
        </div>

        <div>
          <TreeSelect id="treeSelect" />
        </div>
        <div>
          <WordCloud id="wordCloud" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import Button from './examples/button.vue'
import Input from './examples/input.vue'
import Form from './examples/form.vue'
import Dialog from './examples/dialog.vue'
import Select from './examples/select.vue'
import Table from './examples/table.vue'
import Checkbox from './examples/checkbox'
import Radio from './examples/radio'
import TreeSelect from './examples/treeSelect'
import WordCloud from './examples/wordCloud'
export default {
  name: 'App',
  components: {
    Button,
    Input,
    Form,
    Dialog,
    Select,
    Table,
    TreeSelect,
    Checkbox,
    Radio,
    WordCloud,
  },
  setup(props, ctx) {},
}
</script>

<style scoped>
body {
  margin: 0;

  margin-bottom: 200px;
}
.container {
  margin: 100px 0;
}
.content {
  width: 100%;
  display: flex;
}
header {
  /* top: 0; */
  /* position: fixed; */
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
header h1 {
  width: 80%;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
}

.menu {
  flex: 1;
  position: relative;
}

.inner {
  flex: 3;
}

.inner > div {
  padding: 100px;
}

.container {
  max-width: 80%;
  margin: 0 auto;
}
ul {
  padding: 15px;
  list-style: none;
  position: fixed;
  top: 35%;
}
ul > li {
  line-height: 30px;
}
a {
  text-decoration: none;
  color: #000;
  font-weight: 700;
}
a:hover {
  color: rgb(64, 158, 255);
}

* {
  font-family: 方正启体简体, 'Microsoft YaHei', 微软雅黑, 宋体;
  /* font-size: 19pt; */
  letter-spacing: 0.1em;
}
@media screen and (max-width: 1000px) {
  .menu {
    display: none;
  }
  .inner > div {
    padding: 0;
  }
}
</style>
