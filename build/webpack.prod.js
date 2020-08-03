const webpackConfig = require('./webpack.config')
const merge = require('webpack-merge')
const path = require('path')
const config = require('../vue.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')     //清除dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin")   //提取css
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')    //缓存第三方模块
const optimizeCss = require('optimize-css-assets-webpack-plugin');


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


const prodConfig = merge(webpackConfig, {
  mode: "production",
  devtool: 'none',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          }, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          }, 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css',
    }),
    new HardSourceWebpackPlugin(),
    new optimizeCss({
      cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      },
      canPrint: true //是否将插件信息打印到控制台
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  prodConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp("\\.(" + config.build.productionGzipExtensions.join("|") + ")$"),
      threshold: 10240, // 只有大小大于10k的资源会被处理
      minRatio: 0.6 // 压缩比例，值为0 ~ 1
    })
  )
}

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prodConfig.plugins.push(
    new BundleAnalyzerPlugin()
  )
}


module.exports = prodConfig