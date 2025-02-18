// webpack.config.js
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件路径
  entry: path.resolve('src/index.tsx'),
  output: {
    // 输出文件名格式，包含内容哈希以实现缓存控制
    filename: '[name].[contenthash].js',
    // 输出路径
    path: path.resolve(__dirname, 'dist'),
    // 构建前清理输出目录
    clean: true
  },
  plugins: [
    // 生成HTML文件并注入打包后的JS
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // 压缩HTML文件
      minify: true
    }),
    // 生成Service Worker用于PWA
    new GenerateSW({
      // 使新版本的Service Worker立即获取控制权
      clientsClaim: true,
      // 使新版本的Service Worker立即激活
      skipWaiting: true,
      // 运行时缓存配置
      runtimeCaching: [
        {
          // 缓存图片资源
          urlPattern: ({ request }) => request.destination === 'image',
          handler: 'CacheFirst', // 优先从缓存中获取
          options: {
            cacheName: 'images', // 缓存名称
            expiration: {
              maxEntries: 50, // 最大缓存数量
              maxAgeSeconds: 30 * 24 * 60 * 60 // 缓存有效期30天
            }
          }
        },
        {
          // 缓存API请求
          urlPattern: ({ url }) => url.pathname.startsWith('/api'),
          handler: 'NetworkFirst', // 优先从网络获取
          options: {
            cacheName: 'api-cache', // 缓存名称
            networkTimeoutSeconds: 10, // 网络超时时间
            expiration: {
              maxEntries: 100, // 最大缓存数量
              maxAgeSeconds: 6 * 60 * 60 // 缓存有效期6小时
            }
          }
        },
        {
          // 缓存HTML文档
          urlPattern: ({ request }) => request.destination === 'document',
          handler: 'NetworkFirst' // 优先从网络获取
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        // 使用swc-loader处理JavaScript和JSX文件
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/, // 排除node_modules目录
        use: 'swc-loader'
      },
      {
        // 处理图片资源
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource' // 将图片作为资源处理
      }
    ]
  },
  devServer: {
    // 配置开发服务器
    historyApiFallback: true, // 支持HTML5 History API
    hot: true // 启用热模块替换
  }
};