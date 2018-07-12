const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态资源的插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空打包目录的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //js代码压缩插件
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//css压缩插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
//css按需加载
const PurifyCSSPlugin = require('purifycss-webpack');
const postcssOptions = require('./postcssConfig');
module.exports = merge(baseConfig, {
  entry: {
    polyfill: ['babel-polyfill'],
    main: [
      // path.join(process.cwd(), "src/prod.js")
      path.join(process.cwd(), 'src/example/Todomvc/index.js')
    ]
  },

  output: {
    // 这里是文件名配置规则
    filename: '[name].[chunkhash:5].js',
    // 文件块名配置规则
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    // 这里根据实际的上限规则配置
    publicPath: '/'
  },
  module: {
    rules: [
      {
        //处理自己的css文件
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: postcssOptions
          }
        ]
      },
      {
        //处理自己的scss/sass文件
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: postcssOptions
          },
          'sass-loader'
        ]
      },
      {
        //处理自己的less文件
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: postcssOptions
          },
          'less-loader'
        ]
      },
      {
        //编译处于node_modules中的css文件
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'post',
        loaders: ['es3ify-loader'],
        include: [path.resolve(process.cwd(), './src')]
      }
    ]
  },
  // 新增优化配置，压缩插件配置在plugins黎明会被覆盖哦
  // https://webpack.js.org/configuration/optimization/
  optimization: {
    //webpack4.x的最新优化配置项，用于提取公共代码
    // https://webpack.docschina.org/plugins/split-chunks-plugin/
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial', //有三个值可能"initial"，"async"和"all"。配置时，优化只会选择初始块，按需块或所有块。
          name: 'common', //名字
          minChunks: 2, //分割前的代码最大块数
          maxInitialRequests: 5, // entry(入口)的并行请求数
          minSize: 30000 // 最小值
        }
      }
    },
    //是否压缩
    minimize: true,
    minimizer: [
      // 多入口使用
      new WebpackParallelUglifyPlugin({
        uglifyJS: {
          output: {
            beautify: false, //不需要格式化
            comments: false //不保留注释
          },
          compress: {
            properties: false, //属性
            warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
            drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器（生产环境就没有log了）
            collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
          },
          ie8: true // 兼容ie8的精髓，简单且强大
        }
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // 页面压缩相关配置
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(path.resolve(process.cwd(), 'src/**/*.js'))
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(process.cwd(), 'src/lib'), //lib对象文件夹
    //     to: path.resolve(process.cwd(), 'build/lib'), //lib目标文件夹
    //     ignore: ['.*']
    //   }
    // ]),
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(process.cwd()),
      verbose: true,
      dry: false
    })
  ],
  devtool: false,
  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
  },
  resolve: {
    //   modules: ["app", "node_modules"],
    //   extensions: [".js", ".jsx", ".react.js"],
    //   alias: {} //配置别名可以加快webpack查找模块的速度
    // mainFields: ["browser", "jsnext:main", "main"]
    mainFields: ['main']
  }
});
