<template>
  <Tab-bar>
    <Tab-bar-item link="/home">
      <img src="~assets/img/tabbar/首页.svg" slot="item-icon"/>
      <img src="~assets/img/tabbar/首页_active.svg" slot="item-icon_active"/>
      <div slot="item-text">首页</div><!--使用具名插槽-->
    </Tab-bar-item>
    <Tab-bar-item link="/category">
      <img src="~assets/img/tabbar/分类.svg" slot="item-icon"/>
      <img src="~assets/img/tabbar/分类_active.svg" slot="item-icon_active"/>
      <div slot="item-text">分类</div>
    </Tab-bar-item>
    <Tab-bar-item link="/cart">
      <img src="~assets/img/tabbar/购物车.svg" slot="item-icon"/>
      <img src="~assets/img/tabbar/购物车_active.svg" slot="item-icon_active"/>
      <div slot="item-text">购物车</div>
    </Tab-bar-item>
    <Tab-bar-item link="/profile">
      <img src="~assets/img/tabbar/我的.svg" slot="item-icon"/>
      <img src="~assets/img/tabbar/我的_active.svg" slot="item-icon_active"/>
      <div slot="item-text">我的</div>
    </Tab-bar-item>
  </Tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
