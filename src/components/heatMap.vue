<!--  -->
<template>
  <div class="echarts" ref="heatMap"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'heatMap',
  data() {
    return {
      myCharts: null,
      map: {},
      parentJson: [],
      geoJsonData: {},
      mapData: []
    }
  },
  mounted() {
    this.getGeoJson(100000)
  },
  methods: {
    //获取geoJson数据
    getGeoJson(adcode) {
      this.map = new AMap.Map('map', {
        resizeEnable: true,
        center: [116.30946, 39.937629],
        zoom: 3
      })
      let that = this
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        var districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: true, //打开事件支持
          map: this.map
        }))
        districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
          if (error) {
            console.error(error)
            return
          }
          let Json = areaNode.getSubFeatures()
          if (Json.length > 0 && Json[0].properties.level == 'district') {
            that.parentJson = Json
          } else if (Json.length == 0) {
            Json = that.parentJson.filter(item => {
              if (item.properties.adcode == adcode) {
                return item
              }
            })
          }
          that.geoJsonData = {
            features: Json
          }
          that.getMapData()
        })
      })
    },
    //获取数据
    getMapData() {
      this.mapData = this.geoJsonData.features.map((item, index) => {
        return {
          name: item.properties.name,
          value: [item.properties.center[0], item.properties.center[1], 40]
        }
      })
      //去渲染echarts
      this.initEcharts()
    },
    initEcharts() {
      this.myChart = echarts.init(this.$refs.heatMap)
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
      echarts.registerMap('Map', this.geoJsonData) //注册
      this.myChart.setOption(
        {
          backgroundColor: '#050038',
          tooltip: {
            trigger: 'item'
          },
          title: {
            show: true,
            x: 'center',
            y: 'top',
            text: '热力图',
            textStyle: {
              color: 'rgb(97, 142, 205)',
              fontSize: 16
            }
          },
          //这里可以添加echarts内置的，例如下载图片等
          toolbox: {
            feature: {
              dataView: {
                show: false
              },
              magicType: {
                show: false
              },
              restore: {
                show: false
              },
              saveAsImage: {
                show: true,
                name: '地图',
                pixelRatio: 2
              }
            },
            iconStyle: {
              normal: {
                borderColor: '#41A7DE'
              }
            },
            itemSize: 15,
            top: 20,
            right: 22
          },
          visualMap: {
            show: true,
            left: '2%',
            bottom: '1%',
            min: 0,
            max: 40,
            text: ['40', '0'],
            inRange: {
              color: ['#41A7DE', '#eac736', '#fffc00', '#ff2600']
            },
            textStyle: {
              color: '#0fccff',
              fontSize: 12
            }
          },
          geo: {
            show: true,
            map: 'Map', //使用
            roam: true,
            itemStyle: {
              normal: {
                show: true,
                areaColor: 'rgba(0,0,0,0)',
                borderColor: 'rgb(15, 163, 227)',
                borderWidth: '1',
                shadowColor: 'rgba(63, 218, 255, 0.5)',
                shadowBlur: 20
              },
              //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              emphasis: {
                show: true,
                areaColor: '#050038',
                borderColor: '#83BAFF'
              }
            },
            label: {
              normal: {
                show: false //显示省份标签
              },
              emphasis: {
                //对应的鼠标悬浮效果
                show: false
              }
            },
            zoom: 1.25
          },
          series: [
            {
              name: '地图',
              type: 'heatmap',
              data: this.mapData,
              coordinateSystem: 'geo',
              pointSize: 13, //修改热力图点的半径
              blurSize: 15 //阴影的大小
            }
          ]
        },
        true
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>