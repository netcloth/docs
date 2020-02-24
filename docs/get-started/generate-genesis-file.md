## 参与Testnet的Genesis文件生成

### 前置条件

推荐的服务器配置：

* CPU 核数： 2
* 内存： 4GB
* 磁盘：100GB SSD
* 操作系统： Ubuntu 18.04
* 带宽：10Mbps
* 开放端口： 26656和26657


安装和配置go，请点击[这里](https://docs.netcloth.org/software/go-install.html)

安装testnet版本的软件, 执行如下命令

```cassandraql
# 获取nch 源码
git clone https://github.com/NetCloth/netcloth-chain.git
cd netcloth-chain && git checkout testnet

# 设置goproxy(make install过程会下载依赖的go模块,设置适合自己的代理,大陆用户可以设置以下代理来加快下载速度)
export GOPROXY=https://mirrors.aliyun.com/goproxy/

# 安装statik
sudo apt-get update
sudo apt-get install golang-statik

# 编译安装
make install

# 编译完成后，检查版本号
nchd version
nchcli version
```

### 1. 创建账户
执行如下命令，创建一个验证人账户

```cassandraql
nchcli keys add <key_name>
```

### 2. 初始化节点
执行如下命令，初始化节点

```cassandraql
# moniker字段为节点名，可自定义
nchd init --moniker=<node_name> --chain-id nch-testnet
```

该命令会在home目录下(默认为~/.nchd/)创建相应genesis&config文件

### 3. 执行gentx交易

使用步骤1创建的验证人账户，执行gentx交易

```cassandraql
nchd gentx \
  --amount=10000000000000pnch \
  --pubkey $(nchd tendermint show-validator) \
  --ip=<node_public_IP> \
  --node-id=$(nchd tendermint show-node-id) \
  --name=<key_name>
```

交易的结果存储在 ``` ~/.nchd/config/gentx/``` 目录下。

上述命令设置的验证人参数为：
```cassandraql
delegation amount: 10000000000000pnch
commission rate: 0.1
commission max rate: 0.2
commission max change rate: 0.01
min_self_delegation: 1pnch
```

如果要修改上述参数，可通过```nchd gentx -h```查看命令行选项。

### 4. 提交gentx文件

将步骤3产生的json文件保存为 [github-user-name].json,  通过提交pull request将json文件提交到https://github.com/netcloth/testnet/tree/master/gentx 目录下。