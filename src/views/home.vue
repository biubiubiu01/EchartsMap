<!--  -->
<template>
  <div id="Home">
    <div class="select">
      <div class="select_item" v-for="item in mapList" :key="item.index" @click.stop="changeList(item)">
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
  import allMap from "@/components/allMap"
  export default {
    name: 'home',
    components: {
      sctterMap,
      dotMap,
      heatMap,
      allMap
    },
    data() {
      return {
        currenIndex: 'sctterMap',
        mapList: [{
            type: 'sctterMap',
            name: '分布图',
            index: 1,
          },
          {
            type: 'heatMap',
            name: '热力图',
            index: 2,
          },
          {
            type: 'dotMap',
            name: '散点图',
            index: 3,
          },
          {
            type: 'allMap',
            name: '综合地图',
            index: 4,
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
      left: 1%;
      top: 15%;
      z-index: 15;

      .select_item {
        padding: 6px 25px;
        color: rgb(179, 239, 255);
        background: rgba(147, 235, 248, .35);
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