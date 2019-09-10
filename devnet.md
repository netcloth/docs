## 如何加入devnet

### 1. 环境配置

#### * 安装go
```
# macOS系统执行如下命令
wget https://dl.google.com/go/go1.12.2.darwin-amd64.tar.gz
tar -xvf go1.12.2.darwin-amd64.tar.gz
mv go /usr/local

## ubuntu系统执行如下命令
wget https://dl.google.com/go/go1.12.2.linux-amd64.tar.gz
tar -xvf go1.12.2.linux-amd64.tar.gz
sudo mv go /usr/local
```

#### * 设置环境变量
```
修改~/.bashrc，添加如下：
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
export GO111MODULE=on
```
### 2. 源码编译nch节点程序
```
# 获取nch 源码
git clone https://github.com/NetCloth/netcloth-chain.git
cd netcloth-chain

# 编译安装
make install

# 编译完成后，检查版本号
nchd version
nchcli version
```

### 3. 节点设置
```
nchd init local-nch-1 --chain-id nch-devnet

# 拷贝主节点genesis文件,此处从github下载
wget https://raw.githubusercontent.com/NetCloth/devnet/master/genesis.json -O  ~/.nchd/config/genesis.json

修改配置文件：~/.nchd/config/config.toml， 添加主节点seed， 如下：
# Comma separated list of seed nodes to connect to
seeds = "3ba2252fde21ff3d5e0c6dbe84ab28999f449b2b@13.58.188.155:26656"

# Comma separated list of nodes to keep persistent connections to
persistent_peers = "3ba2252fde21ff3d5e0c6dbe84ab28999f449b2b@13.58.188.155:26656"
```

### 4. 启动节点，同步区块
```
nchd start --log_level "*:debug" --trace
```

### 5. 查看节点同步状态
```
curl http://127.0.0.1:26657/status

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
      "id": "e6fe547b3b876b8603bf5e02bb0bfa0c73f4a5fa",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "nch-devnet",
      "version": "0.32.2",
      "channels": "4020212223303800",
      "moniker": "local-nch-1",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://127.0.0.1:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "A4E5D60DE7CFB6598846A4131302C8FD28F2697DF2291B33B0892A9EACB562D8",
      "latest_app_hash": "32F0B29280EDF3BEAE98424D9AA256EDBEFC973D1C33431A8D74FCA3BC3B6582",
      "latest_block_height": "1489",
      "latest_block_time": "2019-09-10T05:33:13.428333584Z",
      "catching_up": false
    },
    "validator_info": {
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
# 导入助记词
nchcli keys add alice --recover
Enter a passphrase to encrypt your key to disk:
<此处会提示输入密码>
<再输入一次密码确认>
> Enter your bip39 mnemonic
<此处输入刚才生成的助记词>
# 屏幕输出是这样的：
- name: alice // 本地帐户名
  type: local
  address: nch133vmttt6n49jac5zn3z0klcpe7m8qlugyggx5w // 帐户地址 
  pubkey: nchpub1addwnpepqvawpe3hd5tvdszs6af9kz5lfdw6tent7kv6ru6tacwjtz5fqelh28r3kzv // 帐户公钥
  mnemonic: ""
  threshold: 0
  pubkeys: []
```

### 7. 创建新钱包地址：

#### * 设置nchcli命令行环境 
```
# nchcli
# Configure your CLI to eliminate need for chain-id flag
nchcli config chain-id nch-chain
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