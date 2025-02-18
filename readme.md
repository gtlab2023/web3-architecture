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