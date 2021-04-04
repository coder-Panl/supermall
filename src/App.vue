<template>
  <div id="app" class="wrapper">
    <keep-alive> <!--keep-alive 让组件保持活跃，防止组件被销毁-->
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabBar/MainTabBar";
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>
<style>
  @import "assets/css/base.css";
</style>
