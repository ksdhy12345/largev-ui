<template>
  <table cellspacing="0" class="ls-table" :class="{'ls-table-borderd':borderd}">
    <thead class="ls-thead">
      <tr class="ls-tr">
        <td class="ls-td" v-for="item in column" :key="item.prop">{{item.text}}</td>
      </tr>
    </thead>
    <tbody class="ls-tbody">
      <tr v-for="(item) in data" class="ls-tr" :key="item.id" :class="{'ls-tr-hover':hover}">
        <td class="ls-td" v-for="item2 in column" :key="item2">
          <template v-if="item2.custom">
            <slot :row="item" :name="item2.key"></slot>
          </template>
          <template v-else-if="item[item2.key]">{{item[item2.key]}}</template>
          <template v-else>
            <slot :row="item" :name="item2.key"></slot>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'LsTable',
  props: {
    data: {
      type: Array,
      default: [],
    },
    column: {
      type: Array,
    },

    borderd: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, ctx) {
    // 先找有没有自定义属性，如果有，则找模板，如果没有，则看有没有值，有值就显示值  没有就显示模板   如果都没有就为空
  },
}
</script>
<style src="../root.css"></style>
<style scoped>
.ls-table {
  min-width: 40rem;
  table-layout: fixed;
}
.ls-thead {
  font-weight: 700;
}
.ls-td {
  padding: 1rem;
  border-bottom: 1px solid var(--table-border);
}
.ls-tbody .ls-tr:last-child .ls-td {
  border-bottom: none;
}
.ls-table-borderd {
  border: 1px solid var(--table-out-border);
}
.ls-table-borderd td {
  border-right: 1px solid var(--table-border);
}
.ls-table-borderd tr td:last-child {
  border-right: none;
}
.ls-tr-hover:hover {
  background-color: var(--table-hover);
}
</style>