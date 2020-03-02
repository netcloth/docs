# 常见问题

## 概念

### 交易手续费

NetCloth 网络中发起交易，需要支付一定的交易手续费。

交易手续费 = Gas * GasPrice，其中Gas表示交易实际消耗的Gas数量, GasPrice为单位Gas价格。 一笔交易实际需要的Gas数量，代表了网络执行该交易时需要的资源多少，主要指计算、存储操作消耗。 GasPrice由用户指定，并且验证人节点可以自主配置其能接受的minimum-gas-prices(默认为1000.0pnch)。

在使用```nchcli```命令行工具发送交易时，可使用```---gas```指定交易的gas limit，如果交易执行实际消耗超过用户指定的gas limit，则交易失败，手续费不返还。  可使用```--gas-prices```指定交易的GasPrice，如果GasPrice低于网络中验证人所能接受的minimus-gas-prices，则交易会被丢弃，不被转发/打包。

### 关于NCH token

NCH 是NetCloth网络中的token，最小单位为pnch， 换算关系如下：

```
1 NCH = 10^12 pnch
```

## 节点运维

### 如何停止节点程序

**停止后台程序，可以执行如下命令**

```shell
# 停止nchd
kill -9 $(pgrep nchd)

# 停止 nchcli
kill -9 $(pgrep nchcli)
```

### 如何备份验证人节点

建议备份<your_custom_path>/.nchd/config目录，其中config目录下的priv_validator_key.json 为验证人节点私钥。


