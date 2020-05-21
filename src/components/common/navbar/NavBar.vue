<template>
  <div id="nav-bar">
    <div class="nav-left"><slot name="left"></slot></div>
    <div class="nav-center"><slot name="center">标题</slot></div>
    <div class="nav-right"><slot name="right"></slot></div>
  </div>
</template>

<script>
	export default {
		name: "NavBar"
	}
</script>

<style scoped>
  #nav-bar {
    font-size: 0.3rem;
    position: relative;
    z-index: 10;
    display: flex;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }

  .nav-left {
    width: 0.8rem;
  }

  .nav-center {
    flex: 1;
  }

  .nav-right {
    width: 0.8rem;
  }
</style>
