<template>
  <svg class="ls-loading-circular" viewBox="25 25 50 50">
    <circle class="ls-loading-path" cx="50" cy="50" r="20" fill="none" />
  </svg>
</template>

<script>
export default {
  name:'LsLoading'
}
</script>

<style src="../root.css"></style>
<style scoped>
@keyframes ls-loading-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes ls-loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }

  to {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}

.ls-loading-circular {
  display: inline;
  height: 50px;
  width: 50px;
  animation: ls-loading-rotate 2s linear infinite;
}

.ls-loading-path {
  animation: ls-loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--primary);
  stroke-linecap: round;
}
</style>