<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        /*let ss = '';
        if (item == '流行') {
          ss = 'pop'
        } else if (item == '新款') {
          ss = 'new'
        } else {
          ss = 'sell'
        }
        this.$parent.homedefaults = ss*/
        this.$emit('tabClick', index)
      }
    },
    props: {
      titles: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
    height: 40px;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
