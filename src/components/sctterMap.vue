<!--  -->
<template>
  <div class="echarts">
    <div class="echarts" ref="sctterMap"></div>
    <p class="back" @click.stop="backTop">返回</p>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'sctterMap',
  data() {
    return {
      myCharts: null,
      parentJson: [],
      geoJsonData: {},
      mapData: [],
      parentInfo: [
        {
          cityName: '全国',
          level: 'china',
          code: 100000,
        },
      ],
    }
  },
  mounted() {
    this.getGeoJson(100000)
  },
  methods: {
    //获取geoJson数据
    getGeoJson(adcode) {
      let that = this
      AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
        var districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: true, //打开事件支持
        }))
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
          if (error) {
            console.error(error)
            return
          }
          let Json = areaNode.getSubFeatures()
          if (Json.length > 0) {
            that.parentJson = Json
          } else if (Json.length === 0) {
            Json = that.parentJson.filter((item) => {
              if (item.properties.adcode == adcode) {
                return item
              }
            })
            if (Json.length === 0) return
          }
          that.geoJsonData = {
            features: Json,
          }
          that.getMapData()
        })
      })
    },
    //获取数据
    getMapData() {
      this.mapData = this.geoJsonData.features.map((item) => {
        return {
          name: item.properties.name,
          value: Math.random() * 1000,
          level: item.properties.level,
          cityCode: item.properties.adcode,
        }
      })
      //去渲染echarts
      this.initEcharts()
    },
    initEcharts() {
      this.myChart = echarts.init(this.$refs.sctterMap)
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
      echarts.registerMap('Map', this.geoJsonData) //注册
      this.myChart.setOption(
        {
          backgroundColor: '#050038',
          tooltip: {
            trigger: 'item',
            formatter: (p) => {
              let val = p.value
              if (window.isNaN(val)) {
                val = 0
              }
              let txtCon = p.name + ':' + val.toFixed(2)
              return txtCon
            },
          },
          title: {
            show: true,
            x: 'center',
            y: 'top',
            text:
              this.parentInfo[this.parentInfo.length - 1].cityName +
              '地图实现点击下钻',
            textStyle: {
              color: 'rgb(97, 142, 205)',
              fontSize: 16,
            },
          },
          //这里可以添加echarts内置的，例如下载图片等
          toolbox: {
            feature: {
              dataView: {
                show: false,
              },
              magicType: {
                show: false,
              },
              restore: {
                show: false,
              },
              saveAsImage: {
                show: true,
                name:
                  this.parentInfo[this.parentInfo.length - 1].cityName + '地图',
                pixelRatio: 2,
              },
            },
            iconStyle: {
              normal: {
                borderColor: '#41A7DE',
              },
            },
            itemSize: 15,
            top: 20,
            right: 22,
          },
          dataRange: {
            right: '2%',
            bottom: '3%',
            icon: 'circle',
            align: 'left',
            splitList: [
              {
                start: 0,
                end: 0,
                label: '未发生',
                color: '#6ead51',
              },
              {
                start: 0,
                end: 250,
                label: '0-150',
                color: '#92b733',
              },
              {
                start: 250,
                end: 500,
                label: '250-500',
                color: '#c4aa29',
              },
              {
                start: 500,
                end: 750,
                label: '500-750',
                color: '#ce6c2b',
              },
              {
                start: 750,
                label: '750以上',
                color: '#c92626',
              },
            ],
            textStyle: {
              color: '#0fccff',
              fontSize: 16,
            },
          },
          series: [
            {
              name: '地图',
              type: 'map',
              map: 'Map',
              roam: true, //是否可缩放
              zoom: 1.15, //缩放比例
              data: this.mapData,
              itemStyle: {
                normal: {
                  show: true,
                  areaColor: 'rgba(0,0,0,0)',
                  borderColor: 'rgb(185, 220, 227)',
                  borderWidth: '1',
                },
              },
              label: {
                normal: {
                  show: true, //显示省份标签
                  textStyle: {
                    color: 'rgb(249, 249, 249)', //省份标签字体颜色
                    fontSize: 12,
                  },
                },
                emphasis: {
                  //对应的鼠标悬浮效果
                  show: true,
                  textStyle: {
                    color: '#000',
                  },
                },
              },
            },
          ],
        },
        true
      )
      let that = this
      this.myChart.off('click')
      this.myChart.on('click', (params) => {
        if (
          that.parentInfo[that.parentInfo.length - 1].code ==
          params.data.cityCode
        ) {
          return
        }
        let data = params.data
        that.parentInfo.push({
          cityName: data.name,
          level: data.level,
          code: data.cityCode,
        })
        that.getGeoJson(data.cityCode)
      })
    },
    //返回上一级
    backTop() {
      if (this.parentInfo.length === 1) return
      this.parentInfo.pop()
      this.getGeoJson(this.parentInfo[this.parentInfo.length - 1].code)
    },
  },
}
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  position: relative;
}
.back {
  position: absolute;
  left: 2%;
  top: 2%;
  color: #eee;
  z-index: 99999;
  cursor: pointer;
}
</style>