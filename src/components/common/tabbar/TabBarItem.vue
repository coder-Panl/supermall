<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot><!--定义具名插槽--><!--定义具名插槽--></div>
    <div v-else><slot name="item-icon_active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {//这里是父传子的传值
      link: String,
      activeColor: {
        type: String,
        default: 'RGB(216,30,6)'
      }
    },
    data() {
      return {
        //isActive: false
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.link) !== -1 //判断当前页面和和激活页面是不是用一个，用于改变显示的图片
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {} //判断当前页面和和激活页面是不是用一个，用于改变字体颜色
      }
    },
    methods: {
      itemClick() {
        if (this.$route.path.indexOf(this.link) == -1) { //跳转的时候判断要跳转的路由时不时当前路由，不是的话才跳转
          this.$router.push(this.link)
        }
      }
    }
  }
</script>

<style scoped>

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
