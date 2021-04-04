<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper"
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() { // 轮播图都是再同一个地方展示，所以不用使用防抖函数，直接搞一个变量来记录是否加载。然后当图片加载一次后，想父组件传递事件后，直接修改这个值就完事
        if (!this.isLoad) {
          this.$emit('swiperImageLoad');
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
