<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>

  #tab-bar {
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    left: 0;/*左边距*/
    right: 0;/*右边距*/
    bottom: 0;/*下边距*/

    box-shadow: 0px -2px 1px rgba(100, 100, 100, 0.1);
  }
</style>