/**
 * webpack有个merge的函数可以合并配置项【可自行观看】
 * https://webpack.js.org/guides/production/#setup
 *
 * webpack 配置基础文件
 * @Author: xiezuobing(948466)[435321508@qq.com]
 * @Date: 2018-05-11 20:30:49
 * @Last Modified by: xiezuobing
 * @Last Modified time: 2018-06-08 13:55:51
 */

const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const merge = require('webpack-merge');
//进入条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
module.exports = merge({
  output: {
    path: path.resolve(process.cwd(), 'build')
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        //babel转换
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      //字体文件解析
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 512
            }
          }
        ]
      },
      //图片解析
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            //引用图片压缩插件
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          },
          {
            // url-loader 当图片较小的时候会把图片BASE64编码，
            // 大于limit参数的时候还是使用file-loader 进行拷贝
            // 当使用这个loader时，不需要再使用file-loader
            loader: 'url-loader',
            options: {
              // 指定限制
              limit: 512
            }
          }
        ]
      },
      //html解析
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      //json文件解析
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      //视频文件解析
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 512
          }
        }
      }
    ]
  },
  plugins: [
    // 环境变量定义插件
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // 编译进度条
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    })
    //css打包成文件
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // })
  ],
  resolve: {
    //   modules: ["app", "node_modules"],
    //   extensions: [".js", ".jsx", ".react.js"],
    //   alias: {} //配置别名可以加快webpack查找模块的速度
    // mainFields: ["browser", "jsnext:main", "main"]
  }
  // target: "web", // Make web variables accessible to webpack, e.g. window
});
