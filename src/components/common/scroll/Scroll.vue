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
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1. 创建BSscroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true, // 最新的插件里面，这个不加页面不能滚动。。
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2. 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      // 3. 监听上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=300) { // 定义返回最上面的按钮的方法，time=300相当于设置的默认值。
        this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {// 等数据请求完成后，并且将新的数据展示出来后，需要执行下 finishPullUp 来告诉已经加载完成了，可以再次进行上拉加载更多了。这个做个延时是避免频繁请求加载
        setTimeout(() => {
          this.scroll.finishPullUp()
        }, 2000)
      }
    }
  }
</script>

<style scoped>

</style>
