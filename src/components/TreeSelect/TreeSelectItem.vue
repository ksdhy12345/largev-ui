<template>
  <li>
    <div @click="toggle">
      <span class="ls-tree-select-title">
        <i
          class="iconfont icon-xiala ls-tree-select-icon"
          :class="{'ls-tree-select-open':isOpen}"
          v-if="item.children"
        ></i>
        {{item.label}}
      </span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <ls-tree-select-item v-for="(child,index) in item.children" :key="index" :item="child"></ls-tree-select-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'LsTreeSelectItem',
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    isFolder: function () {
      return this.item.children && this.item.children.length
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
      if (!this.isFolder) alert('选中了' + this.item.label)
    },
  },
}
</script>
<style src="../root.css"></style>
<style scoped>
/* .ls-tree-select {
  padding-left: 1rem;
} */
.ls-tree-select-icon {
  display: inline-block;
  transform: rotate(-90deg);
  font-size: 1rem;
}
.ls-tree-select-title {
  cursor: pointer;
  display: inline-block;
  /* margin: 0.3rem 0; */
  user-select: none;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
}
.ls-tree-select-open {
  transform: rotate(0deg);
}
</style>

