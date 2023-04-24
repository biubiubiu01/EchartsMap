# EchartsMap


> 使用echarts+Amap 获取行政区边界的geoJson
前提准备：首先你要去高德api上申请密钥，免费的，一天可以发出5000次请求，次数太多了你要去花钱申请企业版，直通车：[https://developer.amap.com/](https://developer.amap.com/)

> 地址预览：[https://gist006.gitee.io/echartsmap/#/](https://gist006.gitee.io/echartsmap/#/)

> vue-antd-admin后台管理系统，有兴趣可以看看：[vue-antd-admin](https://github.com/biubiubiu01/vue-antd-admin)
> vue3-basic-admin后台管理系统，有兴趣可以看看：[vue3-basic-admin](https://github.com/biubiubiu01/vue3-basic-admin)


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


掘金:[https://juejin.im/user/5d6cc5b56fb9a06acf2b747f](https://juejin.im/user/5d6cc5b56fb9a06acf2b747f)

## 捐赠

开源不易，若觉得这个项目对你有用，可以点个[star](https://github.com/biubiubiu01/EchartsMap)，欢迎提出建议和bug :smile: 。如果这个项目对你有所帮助，可以给作者买杯咖啡，欢迎投喂，任意金额捐赠加好友问题咨询。

<img src="https://i.328888.xyz/2023/02/28/zV27Q.jpeg" alt="alipay" width="250"><img src="https://i.328888.xyz/2023/02/28/zVw2H.jpeg" alt="wechat" width="250">

## 扫码领大红包啦，有朋友领到88元大红包
<img src="https://i.328888.xyz/2023/04/24/iSolbq.jpeg" alt="alipay" width="250">

