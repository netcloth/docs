# nchcli命令行工具

nchcli命令行工具，主要用来做key管理，向区块链网络发送交易和查询数据。

## 查询

### 查询节点状态

```shell
nchcli status
```

### 查询余额

```shell
nchcli query account [address]
```

### 根据txHash查询交易

```shell
nchcli query tx [hash]
```

### 查询验证人列表

```shell
nchcli query staking validators
```

### 查询IPAL列表

```shell
nchcli query ipal list
```

## 交易

### 转帐

```shell
nchcli send --from <key name> --to=<account address> --chain-id=<chain-id> --amount=<amount>pnch --gas=200000 --gas-prices=1000.0pnch

```

其中，如果转账不带```--gas-prices```参数，默认的gasprices就为1000.0pnch，如手动指定gasprices，需要带上至少一位小数（最多12位）

了解更多有关手续费的详情，[点击这里](../advanced/Q&A.md)

### 创建验证人

创建验证人，参考[这里](../get-started/how-to-become-validator.md)

### 向验证人委托

```shell
Example:
$ nchcli tx staking delegate nchvaloper1l2rsakp388kuv9k8qzq6lrm9taddae7fpx59wm <amount>pnch --from <mykey> --gas=200000 --gas-prices=1000.0pnch

Usage:
  nchcli tx staking delegate [validator-addr] [amount] [flags]
```

## 钱包key管理

### 创建新地址

```shell
nchcli keys add <name> [flags]
```

### key导出

```shell
nchcli keys export <name> [flags]
```

### key导入

```shell
nchcli keys import <name> <keyfile> [flags]
```
