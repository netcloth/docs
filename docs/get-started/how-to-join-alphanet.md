# 如何加入内测网

## 1. 安装nch

请按照[教程](../software/how-to-install.md)，安装nch

## 2. 节点设置

```shell
nchd init local-nch-1 --chain-id nch-alphanet

# 拷贝主节点genesis文件,此处从github下载
wget https://raw.githubusercontent.com/NetCloth/docs/master/alphanet/genesis.json -O  ~/.nchd/config/genesis.json
如果wget很慢或失败请尝试手动下载文件,地址:https://github.com/NetCloth/docs/blob/master/alphanet/genesis.json

修改配置文件：~/.nchd/config/config.toml， 添加主节点seed， 如下：
# Comma separated list of seed nodes to connect to
seeds = "2fc9bf7a9a69101fd1876bdf73366c406379d292@18.191.12.61:26656"

# Comma separated list of nodes to keep persistent connections to
persistent_peers = "2fc9bf7a9a69101fd1876bdf73366c406379d292@18.191.12.61:26656"
```

## 3. 启动节点，同步区块

```shell
# 执行下面的命令后，控制台会打印日志，同步区块
nchd start --log_level "*:debug" --trace
```

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
      "network": "nch-alphanet", //chain-id
      "version": "0.32.2",
      "channels": "4020212223303800",
      "moniker": "local-nch-1", // 节点名称
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

当节点同步到的区块高度和区块浏览器上一致时，表示节点已经同步完成，此时一个全节点就部署完成了。

## 更多资源

* 内测链区块浏览器地址： <https://explorer.netcloth.org>
* 申请内测的token，点击[这里](testcoin.md)
