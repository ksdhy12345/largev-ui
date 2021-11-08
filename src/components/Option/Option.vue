<template>
  <div class="ls-option">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LsOption',
}
</script>

<style>
.ls-option {
  padding: 0 2rem 0 1.25rem;
  font-size: 0.8rem;
  line-height: 2rem;
  white-space: nowrap;
}
.ls-option:hover {
  background-color: rgb(245, 247, 250);
}
</style>