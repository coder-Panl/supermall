<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/> <!-- 如果需要监听组件的点击，需要 @click.native-->
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1. 请求多个数据
      this.getHomeMultidata();
      // 2. 请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {
      /**
       * 事件监听的相关方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },

      // 回到最上面的按钮方法
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 1000); /*通过ref拿到scroll对象，然后访问scroll对象的scrollTo方法。传入 x y 和返回的时间*/
      },

      contentScroll(position) {
          this.isShowBackTop = -position.y > 500  // 判断当滚动大于500的时候就显示出来。
      },

      /*loadMore() {
        this.getHomeGoods(this.currentType) // 因为请求的方法已经写过了，所以直接调用，并且我们的这个currentType正好是记录的是当前显示的内容，所以直接传入，这个方法就会只加载当前的数据
      },*/
      /**
       * 网络请求的相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1 // page的默认值初始是0.然后在created的时候，请求这个方法会加1，相当于初始化了所有的第一页数据的。然后再进行上拉加载更多的时候，会在加1 请求第二页数据
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list) // ... 是可变数组解析，他会将一组数组一个个解析出来，然后挨个push进去
          this.goods[type].page += 1

          // this.$refs.scroll.finishPullUp() // 调用子组件的方法，来告诉页面已经上拉加载完成，可以再次进行上拉加载
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/
</style>
