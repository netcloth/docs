# 加入测试网

本文档介绍如何部署一个测试网全节点。

## 1. 安装nch节点程序

当前最新测试版本为: **testnet-v1.3.0**

* 如果你还没有安装nch节点程序，请点击[这里](../software/how-to-install.md)安装最新测试版本程序。

* 如果你已经安装过nch节点，确认程序已升级为[最新测试版本](./../software/how-to-install.md#最新版本)。执行如下命令，查看你的程序版本:

```bash
nchd version
nchcli version
```

如果之前有运行过nch程序，则需要先停止程序。如何停止程序，点击[这里](../Q&A.md#如何重启节点程序)

## 2. 节点设置

初次部署节点程序，需要先初始化配置：

* **初始化节点配置**：

```bash
# 作法：
# nchd init <your_custom_name> --chain-id nch-testnet
# 示例:
nchd init mynode --chain-id nch-testnet
```

上述命令会初始化验证人和节点配置文件，默认的home目录为```~/```，如果需要设定home目录，可以带上```--home=<your_custom_path>```

::: warning 提示
如果之前有同步过测试网的区块数据，需要先删除本地数据，再重新初始化：

```bash
rm -rf ~/.nchd

nchd init mynode --chain-id nch-testnet
```

上述命令，会重置区块链数据库。
:::

* **下载测试网genesis文件**：

```bash
# 拷贝主节点genesis文件,此处从github下载
wget http://nch.oss-cn-hangzhou.aliyuncs.com/pkgs/genesis.json -O  ~/.nchd/config/genesis.json
```

上述命令将测试网genesis文件下载到默认home下的config目录，如果有设定的home，则需要下载到```<your_custom_path>/.nchd/config/genesis.json```,  后面用到home目录的地方均相同。

* **修改配置文件，增加初始种子节点**：

```bash
修改配置文件：~/.nchd/config/config.toml， 在[p2p]配置部分，修改seeds和persistent_peers配置项，添加种子节点seed， 如下：
# Comma separated list of seed nodes to connect to

seeds = "7d215e97342e7ffd8f25995681bffb73d1caf083@44.242.149.39:26656,d027471e3c92163bd7f9d07acc19f04787613d8b@44.234.190.81:26656,1b34a4053a9a9205cba2dd67ee8a071031f38d5a@44.242.146.255:26656"

# Comma separated list of nodes to keep persistent connections to
persistent_peers = "7d215e97342e7ffd8f25995681bffb73d1caf083@44.242.149.39:26656,d027471e3c92163bd7f9d07acc19f04787613d8b@44.234.190.81:26656,1b34a4053a9a9205cba2dd67ee8a071031f38d5a@44.242.146.255:26656"
```

## 3. 启动节点，同步区块

```bash
# 后台运行nchd
nohup nchd start 1>nchd.out 2>&1 &
```

::: warning 提示
nchd start 默认日志级别是info， 如果需要查看debug日志，可以带上--log_level "*:debug"执行：

```bash
nohup nchd start --log_level "*:debug" 1>nchd.out 2>&1 &
```

:::

上述命令将nchd进程运行在后台 ，并将控制台输出重定向到nchd.out文件。

* 如果需要启动rest-server， 执行如下命令：

先设置一下nchcli环境

```bash
nchcli config chain-id nch-testnet
nchcli config output json
nchcli config indent true
nchcli config trust-node true
```

后台运行nchcli，开启rest server

```bash
nohup nchcli rest-server 1>cli.out 2>&1 &
```

关于```nchcli```客户端更多使用方法，参考[这里](../software/nchcli.md)

## 4. 查看节点同步状态

打开一个新的终端，查看节点状态：

```bash
curl http://127.0.0.1:26657/status
```

输出如下：

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "204d94d5a6dbf73a89101a0d084c2fb56462963a", //节点id
      "listen_addr": "tcp://0.0.0.0:26656", // 节点p2p连接监听地址
      "network": "nch-testnet", //chain-id
      "version": "0.32.2",
      "channels": "4020212223303800",
      "moniker": "lucy", // 节点名称
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://127.0.0.1:26657"
      }
    },
    "sync_info": {  //当前节点信息
      "latest_block_hash": "A4E5D60DE7CFB6598846A4131302C8FD28F2697DF2291B33B0892A9EACB562D8", // 最新的区块 hash
      "latest_app_hash": "32F0B29280EDF3BEAE98424D9AA256EDBEFC973D1C33431A8D74FCA3BC3B6582",
      "latest_block_height": "1489",     // 当前节点同步到的最新区块高度                                                      //最新区块高度
      "latest_block_time": "2019-09-10T05:33:13.428333584Z",                                  //最新区块时间 
      "catching_up": false
    },
    "validator_info": { // 验证人信息
      "address": "92E0F0A50779E67A2AC25AAF6BCD1E5CF0841DFE",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "cGvHGxHXzOk/L5yVtxeyS9U1mGBNFszvAdYlQoQVGCw="
      },
      "voting_power": "0"
    }
  }
```

**检查是否同步完成**

当节点同步到的区块高度和区块浏览器上一致时，表示节点已经同步完成，此时一个全节点就部署完成了。

之后你可以使用nchcli的各项指令，点击[这里](../software/nchcli.md)

**测试网全节点同步到最新区块高度后**，你可以尝试创建测试网验证人，点击[这里](../validator/how-to-become-validator.md)

## 更多资源

* 部署节点监控工具，点击[这里](../software/monitor.md)
* 查看常见问题，点击[这里](../Q&A.md)
* 测试区块浏览器地址： <https://explorer.netcloth.org>
* 申请测试token，点击[这里](testcoin.md)
* 加入NetCloth Dev Community, 扫描下方二维码
<p align="center">
	<img src="http://nch.oss-cn-hangzhou.aliyuncs.com/img/dev_group.jpg?raw=true" alt="Sample" width = 40% height = 40%>
</p>
