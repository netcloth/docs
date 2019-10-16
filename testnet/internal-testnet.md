## 如何加入devnet

### 1. 环境配置

配置go环境，参见[这里](../go-install.md)

### 2. 源码编译nch节点程序
```
# 获取nch 源码
git clone https://github.com/NetCloth/netcloth-chain.git
cd netcloth-chain && git checkout v1.0.0

# 编译安装
make install

# 编译完成后，检查版本号
nchd version
nchcli version
```

### 3. 节点设置
```
nchd init local-nch-1 --chain-id nch-internal-testnet

# 拷贝主节点genesis文件,此处从github下载
wget https://raw.githubusercontent.com/NetCloth/docs/master/testnet/genesis.json -O  ~/.nchd/config/genesis.json

修改配置文件：~/.nchd/config/config.toml， 添加主节点seed， 如下：
# Comma separated list of seed nodes to connect to
seeds = "2a631b0341e971eccc8fde7b7c8e7f4dd02a57e0@18.191.12.61:26656"

# Comma separated list of nodes to keep persistent connections to
persistent_peers = "2a631b0341e971eccc8fde7b7c8e7f4dd02a57e0@18.191.12.61:26656"
```

### 4. 启动节点，同步区块
```
# 执行下面的命令后，控制台会打印日志，同步区块
nchd start --log_level "*:debug" --trace
```

### 5. 查看节点同步状态
```
# 打开一个新的终端
curl http://127.0.0.1:26657/status

输出如下：
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
      "id": "e6fe547b3b876b8603bf5e02bb0bfa0c73f4a5fa", //节点id
      "listen_addr": "tcp://0.0.0.0:26656", // 节点p2p连接监听地址
      "network": "nch-internal-testnet", //chain-id
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
      "latest_block_height": "1489",                                                           //最新区块高度
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

### 6. 导入助记词到钱包

```
# 导入助记词(alice为本地钱包用户名，可自定义)
nchcli keys add alice --recover

# 交互输出如下：
Enter a passphrase to encrypt your key to disk:
<此处会提示输入密码>
<再输入一次密码确认>
> Enter your bip39 mnemonic (此处会等待输入助记词，导入初始账户)

使用下面的助记词：
later orient logic fog car foam awful doctor path iron airport adjust forum course cigar obscure coconut portion today donor lyrics frown clever ticket


# 屏幕输出是这样的：
- name: alice // 本地账户名
  type: local
  address: nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm // 账户地址 
  pubkey: nchpub1addwnpepqden8ppdcqwjw4xr25erfvh844mjn0dqz0ajxj3cvmqge6l9vlq8j4c3cv5 // 账户公钥
  mnemonic: ""
  threshold: 0
  pubkeys: []
```

### 7. 创建新钱包地址：

#### * 设置nchcli命令行环境 
```
# nchcli
# Configure your CLI to eliminate need for chain-id flag
nchcli config chain-id nch-internal-testnet
nchcli config output json
nchcli config indent true
nchcli config trust-node true
```


#### * 创建新钱包地址 
```
# 创建地址
nchcli keys add dan

#根据提示，输入钱包密码，得到如下输出：

Enter a passphrase to encrypt your key to disk:
Repeat the passphrase:

- name: dan
  type: local
  address: nch1p3fuppcxud5rjsaywuyuguh6achmj5p0r6z6ve
  pubkey: nchpub1addwnpepqg8mfc6t9eaw9lal0c4tzma5vgmqzkgszwcgljcz3sy8rd2rukgxz9dtmph
  mnemonic: ""
  threshold: 0
  pubkeys: []



**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.
# 下面的即助记词
connect plug cigar purchase inflict enroll ten limb quantum never supply grid home case process claw truly grape federal liberty tree remove side quantum
```

### 8. 转账


#### * 查询转账前余额
```
nchcli query account nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm
{
  "type": "nch/Account",
  "value": {
    "address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "coins": [
      {
        "denom": "unch",
        "amount": "100000000"
      }
    ],
    "public_key": null,
    "account_number": "1",
    "sequence": "0"
  }
}

nchcli query account nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7
ERROR: {"codespace":"sdk","code":9,"message":"account nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7 does not exist"}`
```

#### * 转账
```
nchcli send --from nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --to nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7 --amount 10unch

或者
nchcli send --from $(nchcli keys show alice -a) --to $(nchcli keys show dan -a) --amount 10unch
```

#### * 查询转账后余额
```
nchcli query account nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm
或者
nchcli query account $(nchcli keys show alice -a)


{
  "type": "nch/Account",
  "value": {
    "address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "coins": [
      {
        "denom": "unch",
        "amount": "99999990"
      }
    ],
    "public_key": {
      "type": "tendermint/PubKeySecp256k1",
      "value": "A3MzhC3AHSdUw1UyNLLnrXcpvaAT+yNKOGbAjOvlZ8B5"
    },
    "account_number": "1",
    "sequence": "1"
  }
}

nchcli query account nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7
或者
nchcli query account $(nchcli keys show dan -a)

{
  "type": "nch/Account",
  "value": {
    "address": "nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7",
    "coins": [
      {
        "denom": "unch",
        "amount": "10"
      }
    ],
    "public_key": null,
    "account_number": "8",
    "sequence": "0"
  }
}
```

### 9. 发资产
```
nchcli issue --from nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --to nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --amount=10usd
```
执行后，会返回类似如下信息：
```
{
  "height": "0",
  "txhash": "F6EB13B37C4561179B78618DC71BF8B4FC900D4424B36ACC8D9727F972803C37",
  "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\"}]",
  "logs": [
    {
      "msg_index": 0,
      "success": true,
      "log": ""
    }
  ]
}
```

根据txhash查询上链后交易详情：
```
nchcli query tx F6EB13B37C4561179B78618DC71BF8B4FC900D4424B36ACC8D9727F972803C37


{
  "height": "728",
  "txhash": "F6EB13B37C4561179B78618DC71BF8B4FC900D4424B36ACC8D9727F972803C37",
  "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\"}]",
  "logs": [
    {
      "msg_index": 0,
      "success": true, // true表示交易执行成功，false表示执行失败
      "log": ""
    }
  ],
  "gas_wanted": "200000",
  "gas_used": "18504",
  "events": [
    {
      "type": "message",
      "attributes": [
        {
          "key": "action",
          "value": "issue"
        }
      ]
    }
  ],
  "tx": {  // 交易详情
    "type": "nch/StdTx",
    "value": {
      "msg": [
        {
          "type": "token/issue",
          "value": {
            "banker": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
            "address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
            "amount": {
              "denom": "usd",
              "amount": "10"
            }
          }
        }
      ],
      "fee": {
        "amount": [],
        "gas": "200000"
      },
      "signatures": [
        {
          "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "A3MzhC3AHSdUw1UyNLLnrXcpvaAT+yNKOGbAjOvlZ8B5"
          },
          "signature": "G+IpmYVe5ZgT+wmbXH4vuRjulQWgD8rnOnRXRVGuThZ02BypFkcYISUVZzUxT/mPWOddOJQ+9Ds6tno4sm5xZA=="
        }
      ],
      "memo": ""
    }
  },
  "timestamp": "2019-09-10T07:58:08Z"
}

```


