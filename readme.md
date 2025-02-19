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

### typechain
自动生成合约调用代码的ts类型文件，hardhat是自带的，truffle就需要自己操作了

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
