## 为什么使用swc-loader替换babel-loader?
swc-loader和babel-loader配置差不多，rust写的，性能更好。这个作者也是turbopack的作者。

## 工具库
### ethers
一个轻量的用于与以太坊链交互的库，具备一下功能：
1. 连接到以太坊网络
2. 钱包管理
3. 智能合约交互
4. 发送交易
5. 监听事件
6. 查询链上数据
### lucide-react
icons图标库
### @tanstack/react-query 
1. 数据获取：
简化从 API 或其他数据源获取数据的过程。
提供声明式的方式来定义和使用数据获取逻辑。
2. 缓存管理：
自动缓存服务器响应，减少不必要的网络请求。
提供智能的缓存失效和重新获取策略。
3. 背景更新：
在后台自动更新数据，保持 UI 与服务器数据的同步。
4. 分页和无限加载：
提供内置支持，轻松实现分页和无限滚动功能。
5. 预取：
允许预先获取数据，提高用户体验。
6. 乐观更新：
支持乐观更新，使 UI 能够立即响应用户操作，同时在后台进行实际的服务器更新。
7. 重试逻辑：
内置智能重试机制，处理网络错误和失败的请求。
8. 开发者工具：
提供开发者工具，用于调试和监控查询状态。
9. 服务器端渲染（SSR）支持：
与服务器端渲染兼容，支持 Next.js 等框架。
10. 状态管理：
可以作为全局状态管理解决方案的替代或补充。

## ether连接钱包并调用合约
1. 获取合约的abi信息
2.链接钱包
```js 
const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
});
```
3. 获取钱包的余额
```js
const balance = await window.ethereum.request({
    method: 'eth_getBalance',
    params: [address, 'latest'],
});

```
4. 调用合约
```js
const provider = new ethers.BrowserProvider(window.ethereum);
signer = await provider.getSigner();
contract = new ethers.Contract(contractAddress, contractABI, signer);
```
5. 监听合约事件
```js
// 事件名称和参数根据合约定义的事件来定
contract.addListener('Instructor', (name, age) => {
 
});
```
6. 调用合约方法
```js
const tx = await contract.setInfo(name, parseInt(age));
infoDisplay.innerHTML = '交易已发送，等待确认...';
await tx.wait();
```
7. loading可关闭


## 架构项目配置
### .swcrc

#### **1. 基础配置 (`$schema`)**
```json
"$schema": "https://json.schemastore.org/swcrc"
```
- **作用**：提供 JSON Schema 校验文件的位置，帮助 IDE 提供智能提示和语法检查。
---
#### **2. JavaScript 编译器配置 (`jsc`)**
##### **2.1 解析器配置 (`parser`)**
```json
"parser": {
  "syntax": "typescript",
  "tsx": true,
  "decorators": true,
  "dynamicImport": true
}
```
- **`syntax: "typescript"`**：使用 TypeScript 语法解析代码。
- **`tsx: true`**：允许解析 TSX（React JSX）语法。
- **`decorators: true`**：支持装饰器语法（如 `@Component`）。
- **`dynamicImport: true`**：允许动态导入（如 `import('module')`）。
##### **2.2 转换配置 (`transform`)**
```json
"transform": {
  "legacyDecorator": true,
  "decoratorMetadata": true,
  "react": {
    "runtime": "automatic",
    "refresh": true,
    "development": false,
    "pragma": "React.createElement",
    "pragmaFrag": "React.Fragment"
  }
}
```
- **`legacyDecorator`**：启用旧版装饰器语法（非 TC39 标准）。
- **`decoratorMetadata`**：为装饰器生成元数据（需 TypeScript 的 `emitDecoratorMetadata` 配合）。
- **React 转换**：
  - **`runtime: "automatic"`**：使用 React 17+ 的自动 JSX 运行时（无需手动导入 React）。
  - **`refresh: true`**：启用 React 热刷新（通常用于开发环境）。
  - **`development: false`**：禁用开发模式专用代码（适用于生产构建）。
  - **`pragma`** 和 **`pragmaFrag`**：手动指定 JSX 工厂函数（若 `runtime` 为 `classic` 时生效）。
##### **2.3 其他编译器选项**
```json
"target": "es2022",
"loose": true,
"externalHelpers": true,
"keepClassNames": true
```
- **`target: "es2022"`**：将代码编译为 ES2022 标准。
- **`loose: true`**：生成更简洁但可能不符合严格规范的代码（性能优化）。
- **`externalHelpers: true`**：将辅助函数（如 `_classCallCheck`）提取为外部依赖（需配合 `@swc/helpers`）。
- **`keepClassNames: true`**：保留原始类名（避免被压缩为短名称）。
---
#### **3. 模块配置 (`module`)**
```json
"module": {
  "type": "es6",
  "strict": true,
  "strictMode": true,
  "lazy": true,
  "noInterop": false
}
```
- **`type: "es6"`**：输出 ES 模块（ESM）。
- **`strict: true`**：禁止意外导出未定义的变量。
- **`strictMode: true`**：在模块顶部添加 `"use strict";`。
- **`lazy: true`**：动态导入的模块按需加载（如 `() => import('./module')`）。
- **`noInterop: false`**：生成代码以确保 ESM 和 CommonJS 的互操作性。
---
#### **4. 其他全局配置**
```json
"minify": true,
"sourceMaps": true,
"exclude": ["node_modules", ".git", "dist"]
```
- **`minify: true`**：压缩输出代码（移除空格、混淆变量名等）。
- **`sourceMaps: true`**：生成 Source Map 文件（便于调试生产代码）。
- **`exclude`**：跳过指定目录/文件的处理（避免处理无关内容）。
---
#### **关键配置总结**
| 配置项                 | 核心作用                                                                 |
|-----------------------|------------------------------------------------------------------------|
| `jsc.parser.decorators` | 支持装饰器语法（常用于 Angular/NestJS）。                                |
| `jsc.transform.react.runtime` | 自动导入 React JSX 运行时（减少代码冗余）。                              |
| `jsc.externalHelpers`  | 减少代码体积，复用公共辅助函数。                                          |
| `module.type`          | 输出现代浏览器支持的 ESM 格式。                                           |
| `minify`               | 优化生产代码体积。                                                       |
---
#### **潜在注意事项**
1. **装饰器兼容性**：`legacyDecorator` 和 `decoratorMetadata` 需与 TypeScript 配置（如 `tsconfig.json` 中的 `experimentalDecorators`）保持一致。
2. **React 开发模式**：`react.development: false` 适用于生产构建，若需调试应设为 `true`。
3. **外部依赖**：启用 `externalHelpers` 时需确保 `@swc/helpers` 已安装，或在打包工具中配置注入。
此配置适合基于 TypeScript + React 的项目，面向现代浏览器进行高性能生产构建。

### webpack
使用`webpack-merge`对开发环境和线上环境的配置进行分离。

### service-worker

## 开发问题
### 1. 使用scripty执行shell脚本报错`spawn Unknown system error -8`?

### 2. webpack中output的clean:true和clean-webpack-plugin插件的作用有什么区别？
webpack 中的 `output.clean: true` 和 `clean-webpack-plugin` 插件都用于清理构建目录，但它们有一些区别和特点：

1. `output.clean: true`

   这是 webpack 5 引入的内置选项。

   特点：
   - 简单易用，只需在配置中添加一行
   - 由 webpack 原生支持，不需要额外安装插件
   - 默认只清理 `output.path` 指定的目录
   - 性能可能比插件稍好，因为它是内置功能

   限制：
   - 功能相对基础，主要用于清理输出目录
   - 配置选项较少，灵活性不如插件

   示例：
   ```javascript
   module.exports = {
     output: {
       clean: true
     }
   };
   ```

2. `clean-webpack-plugin`

   这是一个第三方插件，在 webpack 5 之前就广泛使用。

   特点：
   - 提供更多的配置选项和灵活性
   - 可以清理多个目录
   - 可以排除特定文件或文件夹
   - 提供更详细的日志输出
   - 可以在编译之前或之后清理

   限制：
   - 需要额外安装和导入插件
   - 配置稍微复杂一些

   示例：
   ```javascript
   const { CleanWebpackPlugin } = require('clean-webpack-plugin');

   module.exports = {
     plugins: [
       new CleanWebpackPlugin({
         cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*'],
         cleanAfterEveryBuildPatterns: ['static*.*', '!static1.js'],
         verbose: true
       })
     ]
   };
   ```

选择建议：

1. 如果你使用 webpack 5 或更高版本，并且只需要基本的清理功能，使用 `output.clean: true` 就足够了。

2. 如果你需要更高级的清理功能，比如清理多个目录、排除特定文件、或者在特定时机清理，那么 `clean-webpack-plugin` 可能更适合。

3. 在一些复杂的项目中，你甚至可能会同时使用两者，以满足不同的清理需求。

总的来说，`output.clean: true` 更简单直接，而 `clean-webpack-plugin` 提供了更多的控制和灵活性。选择哪一个取决于你的具体需求和项目复杂度。

### 3.连接钱包是怎么设置要连接的网络和用户呢？
在getDefaultConfig方法中配置chains

### 4.调用存钱方法时，钱包终止了我的交易，错误信息是 This transaction would have cost you extra fees, so we stopped it. Your money is still in your wallet.，似乎是gas有所限制
调用之前可以动态评估一下gasLimit，然后增加20%的缓冲，再调用
```tsx
import { useEstimateGas, useContractWrite } from 'wagmi'

const { data: estimatedGas } = useEstimateGas({
  to: contractAddress,
  data: encodeFunctionData({
    abi: contractABI,
    functionName: 'deposit',
    args: [amount],
  }),
  value: amount,
})

const { write } = useContractWrite({
  ...otherConfig,
  request: {
    ...request,
    gasLimit: estimatedGas ? BigInt(Math.floor(Number(estimatedGas) * 1.2)) : undefined, // 增加 20% 的缓冲
  },
})

```
## todoList
- [ ] 封装一个error组件做错误处理
- [ ] 通过etherscan获取合约信息和abi
- [ ] 优化合约交互的体验，比如刷新和事件的监控处理
- [ ] 补充线上环境webpack配置
- [ ] 通过连接git仓库部署