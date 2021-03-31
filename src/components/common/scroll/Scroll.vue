<template>
  <!--
    ref: 如果是绑定在组件中，那么通过this.$resf.refname 获取到的是一个组件对象
         如果是绑定在普通的元素中，那么通过this.$refs.refname 获取的到的是一个元素对象
  -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true, // 最新的插件里面，这个不加页面不能滚动。。
        click: true
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time);
      }
    }
  }
</script>

<style scoped>

</style>
