<!--  -->
<template>
  <div id="Home">
    <div class="select">
      <div
        class="select_item"
        v-for="item in mapList"
        :key="item.index"
        @click.stop="changeList(item)"
      >
        <p class="name" :class="item.type==currenIndex?'active':''">{{item.name}}</p>
      </div>
    </div>
    <component :is="currenIndex" v-cloak />
  </div>
</template>

<script>
import sctterMap from '@/components/sctterMap'
import dotMap from '@/components/dotMap'
import heatMap from '@/components/heatMap'
export default {
  name: 'home',
  components: { sctterMap, dotMap, heatMap },
  data() {
    return {
      currenIndex: 'sctterMap',
      mapList: [
        {
          type: 'sctterMap',
          name: '分布图',
          index: 1,
        },
        {
          type: 'dotMap',
          name: '散点图',
          index: 2,
        },
        {
          type: 'heatMap',
          name: '热力图',
          index: 3,
        },
      ],
    }
  },
  mounted() {},
  methods: {
    changeList(val) {
      if (val.type == this.currenIndex) {
        return
      }
      this.currenIndex = val.type
    },
  },
}
</script>
<style lang="scss" scoped>
#Home {
  width: 100%;
  height: 100%;
  position: relative;
  .select {
    position: absolute;
    right: 10%;
    top: 15%;
    z-index: 9999;
    .select_item {
      padding: 6px 25px;
      color: rgb(0, 221, 255);
      background: rgb(8, 24, 84);
      border-radius: 15px;
      margin: 25px 0;
      cursor: pointer;
      .active {
        color: rgb(254, 217, 50);
      }
    }
  }
}
</style>