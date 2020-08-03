const webpackConfig = require('./webpack.config')
const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('../vue.config')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  //更好的看到webpack警告和错误

const devConfig = merge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    compress: true,
    host: config.dev.host,
    port: config.dev.port,
    hot: true,
    inline: true,
    hotOnly: true,  //当编译失败时，不刷新页面
    overlay: true,  //用来在编译出错的时候，在浏览器页面上显示错误
    publicPath: '/',  //一定要加
    open: config.dev.autoOpen,
    proxy: config.dev.proxyTable,
    watchOptions: {
      // 不监听的文件或文件夹，支持正则匹配
      ignored: /node_modules/,
      // 监听到变化后等1s再去执行动作
      aggregateTimeout: 1000,
      // 默认每秒询问1000次
      poll: 1000
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      devConfig.devServer.port = port
      devConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devConfig.devServer.host}:${port}`],
          }
        })
      )
      resolve(devConfig)
    }
  })
})
