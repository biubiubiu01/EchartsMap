const path = require("path");
const webpack = require('webpack');
const os = require('os')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const routUrl = 'http://127.0.0.1:8080'

module.exports = {
  publicPath: './',
  dev: {
    host: getNetworkIp(),   //端口号
    port: 8999,
    autoOpen: true,  //自动打开
  },
  build: {
    productionGzipExtensions: ["js", "css"],  //需要开启g-zip的文件后缀
    productionGzip: true     //是否开启g-zip压缩
  }
}

//获取本地ip地址
function getNetworkIp() {
  var netWork = os.networkInterfaces()
  var ip = ''
  for (var dev in netWork) {
    netWork[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address
        return;
      }
    })
  }
  return ip || 'localhost'
}



