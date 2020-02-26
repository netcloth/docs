# 如何加入测试网

## 1. 安装nch

请按照[教程](../software/how-to-install.md)，安装nch

## 2. 节点设置

**初始化节点配置**：

```shell
# 作法：
# nchd init <your_custom_name> --chain-id nch-testnet
# 示例:
nchd init lucy --chain-id nch-testnet
```

上述命令会初始化验证人和节点配置文件，默认的home目录为```~/```，如果需要设定home目录，可以带上```--home=<your_custom_path>```

**下载测试网genesis文件**：

```shell
# 拷贝主节点genesis文件,此处从github下载
wget https://raw.githubusercontent.com/netcloth/testnet/master/genesis.json -O  ~/.nchd/config/genesis.json
如果wget很慢或失败请尝试手动下载文件,地址:https://github.com/netcloth/docs/blob/master/testnet/genesis.json
```

上述命令将测试网genesis文件下载到默认home下的config目录，如果有设定的home，则需要下载到```<your_custom_path>/.nchd/config/genesis.json```,  后面用到home目录的地方均相同。


**修改配置文件，增加初始种子节点**：

```
修改配置文件：~/.nchd/config/config.toml， 添加主节点seed， 如下：
# Comma separated list of seed nodes to connect to
seeds = "e60b962168d85c5b594cb8238e8f8f536c2d2ae2@13.58.188.155:26656,5bd7dc0cb3872e9e7371e7609342875d547e0195@13.124.101.63:26656,d172e23ea6bd1ecb77f058796689110c8387fe5a@18.191.12.61:26656"

# Comma separated list of nodes to keep persistent connections to
persistent_peers = "e60b962168d85c5b594cb8238e8f8f536c2d2ae2@13.58.188.155:26656,5bd7dc0cb3872e9e7371e7609342875d547e0195@13.124.101.63:26656,d172e23ea6bd1ecb77f058796689110c8387fe5a@18.191.12.61:26656"```

## 3. 启动节点，同步区块

```shell
# 执行下面的命令后，控制台会打印日志，同步区块
nchd start --log_level "*:debug" --trace
```

上述命令会将日志打印到控制台，如果要停止节点程序，按```ctrl +c```即可。如果要后台启动

## 4. 查看节点同步状态

```shell
# 打开一个新的终端
curl http://127.0.0.1:26657/status

# 输出如下：
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

## 更多资源

* 测试区块浏览器地址： <https://explorer.netcloth.org>
* 申请测试token，点击[这里](testcoin.md)
* 创建测试网验证人，点击[这里](./how-to-become-validator.md)
