# 区块链节点常见问题

## 概念

### 验证人

NetCloth区块链网络需要一组验证人来维护网络的安全。 验证人的主要作用是通过参与网络共识，收集网络中的交易并打包新区块，以获得网络出块激励。
此外，验证人还将通过提案投票的形式参与链上治理，节点的投票权取决于其总质押token数量。

如何创建验证人，点击[这里](../get-started/how-to-become-validator.md)

### 质押

NetCloth区块链网络是基于BPoS共识算法的，网络中验证人的投票权取决于其总质押的token数量。 验证人可以将自身的token委托给自己，用户可将自已钱包的token委托给指定的验证人，也可以自己创建一个验证人然后委托给自己。

如何质押，点击[这里](../get-started/how-to-delegate.md)

### 交易手续费

NetCloth 网络中发起交易，需要支付一定的交易手续费。

交易手续费 = Gas * GasPrice，其中Gas表示交易实际消耗的Gas数量, GasPrice为单位Gas价格。 一笔交易实际需要的Gas数量，代表了网络执行该交易时需要的资源多少，主要指计算、存储操作消耗。 GasPrice由用户指定，并且验证人节点可以自主配置其能接受的minimum-gas-prices(默认为1000.0pnch)。

在使用```nchcli```命令行工具发送交易时，可使用```--gas```指定交易的gas limit，如果交易执行实际消耗超过用户指定的gas limit，则交易失败，手续费不返还； 如果交易执行实际消耗未超过用户指定的gas limit，则剩余的gas会返还。 可使用```--gas-prices```指定交易的GasPrice，如果GasPrice低于网络中验证人所能接受的minimus-gas-prices，则交易会被丢弃，不被转发/打包。

如果不想通过```--gas```指定交易的gas limit，可通过```--gas auto``` 自动指定，nchcli会预估交易gas；通常情况下，交易实际消耗的gas会大于预估，为了避免out of gas，建议同时带上```--gas-adjustment```参数，建议```--gas-adjustment=1.5```。

请注意：在设定```--gas-prices```时，请至少带一位小数，最多12位小数（如1000.0、1100.0）。输入整数是无效的。

如何发起一笔交易？点击[这里](../software/nchcli.md#交易)

### 关于NCH token

NCH 是NetCloth网络中的token，最小单位为pnch， 换算关系如下：

```javascript
    1 NCH = 10^12 pnch
```

## 节点运维

### 如何停止节点程序

停止后台程序，可执行如下命令：

```bash
# 停止nchd
kill -9 $(pgrep nchd)

# 停止 nchcli
kill -9 $(pgrep nchcli)
```

### 如何重启节点程序

重启节点，可执行如下命令：

```bash
kill -9 $(pgrep nchd)
kill -9 $(pgrep nchcli)

nohup nchd start 1>nchd.out 2>&1 &
nohup nchcli rest-server 1>cli.out 2>&1 &
```

### 如何备份验证人节点

建议备份<your_custom_path>/.nchd/config目录，其中config目录下的priv_validator_key.json 为验证人节点私钥。 请妥善保安验证人节点私钥，丢失后将无法恢复。

### 私链启动失败

本地搭建私有链，执行```nchd start```失败，控制台显示

```javascript
ERROR: error during handshake: error on replay: validator set is nil in genesis and still empty after InitChain
```

解决方法：确保创建初始验证人时，保证抵押 >= 1 NCH (即10^12 pnch)

## 其它

### 查询账户不存在

执行命令```nchcli q account <address>```查询账户时，返回 ```ERROR: account xxx does not exist```

**原因：**

1. 本地新创建的账户并且余额为0，是离线账户，不存在于世界状态中，链上不存在。

2. 本地新创建的账户并且有余额，查询时提示不存在，可能是本地节点尚未同步到最新区块，待同步到最新区块后查询即可。

### 加入NetCloth Dev Community, 扫描下方二维码
<p align="center">
	<img src="http://nch.oss-cn-hangzhou.aliyuncs.com/img/dev_group.jpg?raw=true" alt="Sample" width = 40% height = 40%>
</p>