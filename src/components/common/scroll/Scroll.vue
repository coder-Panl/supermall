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

  import {debounce} from "common/utils/utils";

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
        click: true, // click是让组件可以被点击事件监听
        probeType: this.probeType,  // probeType是用于监听页面的滚动，this.probeType是让外界来觉决定是否监听
        pullUpLoad: this.pullUpLoad  // pullUpLoad用来监听上拉加载。this.pullUpLoad是让外界来决定是否监听
      })

      // 2. 监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {// 写过判断来让判断是否监听，让代码更加严谨
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      // 3. 监听上拉加载更多
    /*  this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })*/
      // 监听scroll滚动到底部
      if (this.pullUpLoad) { // 写过判断来让判断是否监听，让代码更加严谨
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        })
      }

      // 3. 监听item 的图片加载完成 ,完成后刷新scroll
      const refresh = debounce(this.refresh, 200) // 使用防抖函数来执行， const refresh 是将这个防抖函数的内存指针保存在refresh里面，防止指针变化，生成新的对象
      this.$bus.$on('itemImageLoad', () => {
        refresh(); // 调用防抖函数。
      })
    },
    methods: {
      scrollTo(x, y, time=300) { // 定义返回最上面的按钮的方法，time=300相当于设置的默认值。
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {// 等数据请求完成后，并且将新的数据展示出来后，需要执行下 finishPullUp 来告诉已经加载完成了，可以再次进行上拉加载更多了。这个做个延时是避免频繁请求加载 ,
        this.scroll && setTimeout(() => { // 可以严谨一点，再这里判断scroll是否有值 this.scroll
          this.scroll.finishPullUp()
        }, 2000)
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
