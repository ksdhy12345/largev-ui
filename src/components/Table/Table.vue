<template>
  <table cellspacing="0" cellpadding="0" class="ls-table">
    <thead class="ls-thead">
      <tr class="ls-tr">
        <td class="ls-td ls-td-checkbox" v-if="checked">
          <ls-checkbox
            v-model="checkAll"
            :indeterminate="indeterminate"
            @change="handleCheckAllChange"
          ></ls-checkbox>
        </td>
        <td class="ls-td" v-for="item in column" :key="item.prop">{{item.text}}</td>
      </tr>
    </thead>
  </table>
  <ls-checkbox-group v-model="checkedList" @change="handleCheckList">
    <table cellspacing="0" cellpadding="0" class="ls-table" :class="{'ls-table-borderd':borderd}">
      <tbody class="ls-tbody">
        <tr v-for="(item) in data" class="ls-tr" :key="item.id" :class="{'ls-tr-hover':hover}">
          <td v-if="checked" class="ls-td ls-td-checkbox">
            <ls-checkbox :labelData="item"></ls-checkbox>
          </td>
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
  </ls-checkbox-group>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
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
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],

  setup(props, ctx) {
    // 先找有没有自定义属性，如果有，则找模板，如果没有，则看有没有值，有值就显示值  没有就显示模板   如果都没有就为空
    // 选项组change

    const checkAll = ref(false)
    const indeterminate = ref(false)
    const checkedList = ref([])
    const handleCheckList = (val) => {
      if (val.isCheckAll == 'indeterminate') indeterminate.value = true
      else {
        indeterminate.value = false
        checkAll.value = val.isCheckAll
      }
    }
    // 全选change
    const handleCheckAllChange = (val) => {
      indeterminate.value = false
      checkedList.value = val ? props.data : []
    }

    watch(checkedList, () => ctx.emit('update:modelValue', checkedList.value))

    return {
      handleCheckList,
      handleCheckAllChange,
      checkAll,
      indeterminate,
      checkedList,
    }
  },
}
</script>
<style src="../root.css"></style>
<style scoped>
.ls-table {
  width: 100%;
  table-layout: fixed;
}
.ls-thead {
  font-weight: 700;
}
.ls-td {
  padding: 1.5rem 1rem;
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

.ls-td-checkbox {
  width: 1rem;
}
</style>