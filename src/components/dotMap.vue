<!--  -->
<template>
  <div class="echarts" ref="dotMap"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'dotMap',
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
          value: [item.properties.center[0], item.properties.center[1], index]
        }
      })
      //去渲染echarts
      this.initEcharts()
    },
    initEcharts() {
      this.myChart = echarts.init(this.$refs.dotMap)
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
      echarts.registerMap('Map', this.geoJsonData) //注册
      this.myChart.setOption(
        {
          backgroundColor: '#050038',
          tooltip: {
            trigger: 'item',
            formatter: p => {
              let val = p.value
              if (window.isNaN(val)) {
                val = 0
              }
              let txtCon = p.name + '<br>' + '<hr>' + '数值 : ' + val.toFixed(2)
              return txtCon
            }
          },
          title: {
            show: true,
            x: 'center',
            y: 'top',
            text: '散点图',
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
              type: 'effectScatter',
              data: this.mapData.slice(0, -5),
              coordinateSystem: 'geo',
              //这里可以设置点的大小
              symbolSize: function(val) {
                return val[2] / 1.3
              },
              showEffectOn: 'emphasis', //高亮时显示特效
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true, //动画效果
              label: {
                normal: {
                  formatter: p => {
                    return p.value[2]
                  },
                  position: 'center', //地图上是否有文字
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255, 128, 0,0.8)' //地图点的颜色
                }
              },
              layoutCenter: ['50%', '50%'], //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
              layoutSize: 430
            },
            {
              name: 'top5',
              type: 'effectScatter',
              data: this.mapData.slice(-3),
              coordinateSystem: 'geo',
              //这里可以设置点的大小
              symbolSize: function(val) {
                return val[2]
              },
              showEffectOn: 'render', //高亮时显示特效
              rippleEffect: {
                brushType: 'fill'
              },
              hoverAnimation: false,
              label: {
                normal: {
                  formatter: p => {
                    return p.value[2]
                  },
                  position: 'center', //地图上是否有文字
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255, 128, 0,0.8)' //地图点的颜色
                }
              },
              layoutCenter: ['50%', '50%'], //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
              layoutSize: 430
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