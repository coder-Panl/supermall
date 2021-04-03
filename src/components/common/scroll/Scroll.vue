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
        //observeDOM: true, // 最新的插件里面，这个不加页面不能滚动。。
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2. 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      // 3. 监听上拉加载更多
    /*  this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })*/

      // 3. 监听item 的图片加载完成 ,完成后刷新scroll
      const refresh = this.debounce(this.refresh, 200) // 使用防抖函数来执行， const refresh 是将这个防抖函数的内存指针保存在refresh里面，防止指针变化，生成新的对象
      this.$bus.$on('itemImageLoad', () => {
        refresh(); // 调用防抖函数。
      })
    },
    methods: {
      // 定义一个防抖函数
      // 解释： 调用这个函数会传进来一个要执行的function和延迟的时间，这个时间是给定时器使用的，用一个内存指针来调用这个防抖函数的，都会有一个定时器开始做延迟，
      // 结果每次调用防抖函数的时候，定时器的时间还没到，就被clearTimeout取消了，直到最后一次进来后，没有后续的clearTimeout来取消，它才会正常结束定时，执行传进来的那个方法
      debounce(func, delay) {  //  传进来要执行的函数，和延迟的时间。
        let timer = null;  // 定义一个参数来记载函数setTimeout执行id
        return function (...args) {
          if (timer) clearTimeout(timer)  // clearTimeout 是用来取消一个定时器函数的执行的。其实这里可以不用判断，直接clearTimeout来取消执行。
          timer = setTimeout(() => {  // timer接收 这个定时器的id
            func.apply(this, args)
          }, delay)
        }
      },
      scrollTo(x, y, time=300) { // 定义返回最上面的按钮的方法，time=300相当于设置的默认值。
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {// 等数据请求完成后，并且将新的数据展示出来后，需要执行下 finishPullUp 来告诉已经加载完成了，可以再次进行上拉加载更多了。这个做个延时是避免频繁请求加载
        setTimeout(() => {
          this.scroll.finishPullUp()
        }, 2000)
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
