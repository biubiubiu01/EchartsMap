# EchartsMap

> 使用echarts+Amap 获取行政区边界的geoJson
前提准备：首先你要去高德api上申请密钥，免费的，一天可以发出5000次请求，次数太多了你要去花钱申请企业版，直通车：[https://developer.amap.com/](https://developer.amap.com/)

渲染步骤主要分为：

1. 根据行政区code去获取行政区边界geoJson

   你要先cdn引入：

       <script src='http://webapi.amap.com/maps?v=1.3&key='你申请的key'&plugin=AMap.DistrictSearch'></script>
       <script src="//webapi.amap.com/ui/1.0/main.js"></script>

    在build/webpack.base.conf.js里面让webpack不处理aMap的依赖库

      externals: {
        'AMap':'AMap',
        'AMapUI': 'AMapUI'
      }

    通过AMapUI的DistrictExplorer 方法去获取行政区geoJson

    具体可查看：[https://lbs.amap.com/api/amap-ui/reference-amap-ui/geo/district-explorer](https://lbs.amap.com/api/amap-ui/reference-amap-ui/geo/district-explorer)

1. 获取地图数据

1. 渲染echarts图

1. 点击地图下钻


地图主要分为：

分布图、散点图、热力图、航线图等



--npm install   

--cd EchartsMap

--npm run dev



