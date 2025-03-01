// webpack.config.js
const {resolve} = require("path");

const { merge } = require("webpack-merge");
const { GenerateSW } = require("workbox-webpack-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _isProd = _mode === "production" ? true:false;
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ThemedProgressPlugin } = require('themed-progress-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');
// 调用 dotenv 并且配置路径
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
const webpackBaseConfig = {
  // 入口文件路径
  entry: resolve("src/index.tsx"),
  output: {
    // 输出文件名格式，包含内容哈希以实现缓存控制
    filename: "[name].[contenthash].js",
    // 输出路径
    path: resolve(__dirname, "dist"),
    // 构建前清理输出目录
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: _isProd
        ? 'styles/[name].[contenthash:5].css'
        : 'styles/[name].css',
      chunkFilename: _isProd
        ? 'styles/[name].[contenthash:5].css'
        : 'styles/[name].css',
      ignoreOrder: false,
    }),
    new ThemedProgressPlugin(),
    new webpack.DefinePlugin(envKeys)
    // 生成Service Worker用于PWA
    // new GenerateSW({
    //   // 使新版本的Service Worker立即获取控制权
    //   clientsClaim: true,
    //   // 使新版本的Service Worker立即激活
    //   skipWaiting: true,
    //   // 运行时缓存配置
    //   runtimeCaching: [
    //     {
    //       // 缓存图片资源
    //       urlPattern: ({ request }) => request.destination === "image",
    //       handler: "CacheFirst", // 优先从缓存中获取
    //       options: {
    //         cacheName: "images", // 缓存名称
    //         expiration: {
    //           maxEntries: 50, // 最大缓存数量
    //           maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存有效期30天
    //         },
    //       },
    //     },
    //     {
    //       // 缓存API请求
    //       urlPattern: ({ url }) => url.pathname.startsWith("/api"),
    //       handler: "NetworkFirst", // 优先从网络获取
    //       options: {
    //         cacheName: "api-cache", // 缓存名称
    //         networkTimeoutSeconds: 10, // 网络超时时间
    //         expiration: {
    //           maxEntries: 100, // 最大缓存数量
    //           maxAgeSeconds: 6 * 60 * 60, // 缓存有效期6小时
    //         },
    //       },
    //     },
    //     {
    //       // 缓存HTML文档
    //       urlPattern: ({ request }) => request.destination === "document",
    //       handler: "NetworkFirst", // 优先从网络获取
    //     },
    //   ],
    // }),
  ],
  module: {
    rules: [
      {
        // 使用swc-loader处理JavaScript和JSX文件
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/, // 排除node_modules目录
        use: "swc-loader",
      },
      {
        // 处理图片资源
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", // 将图片作为资源处理
      },
      {
        test: /\.css$/i,
        include: [
          resolve(__dirname, 'src'),
          resolve(__dirname, 'node_modules'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    // 设置文件扩展名
    extensions: [".ts", ".tsx", ".js", ".jsx",".json"],
    alias: {
      '@/*': resolve('src/*'),
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@pages': resolve('src/pages'),
      '@layouts': resolve('src/layouts'),
      '@assets': resolve('src/assets'),
      '@states': resolve('src/states'),
      '@service': resolve('src/service'),
      '@utils': resolve('src/utils'),
      '@lib': resolve('src/lib'),
      '@constants': resolve('src/constants'),
      '@connections': resolve('src/connections'),
      '@abis': resolve('src/abis'),
      '@types': resolve('src/types'),
    },
  },
};
module.exports = merge(webpackBaseConfig, _mergeConfig);
