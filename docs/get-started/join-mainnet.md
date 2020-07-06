# 加入主网

NetCloth主网尚未启动，你可以参与创世文件的生成，申请成为主网启动的初始验证人。

## 1.安装最新程序

请点击[这里](../software/how-to-install.md)安装最新测试版本程序

## 2. 创建账户

执行如下命令，创建一个钱包地址

```bash
# <key_name> 为本地自定义的名字
nchcli keys add <key_name>
```

配置nchcli

```bash
nchcli config chain-id nch-chain
nchcli config output json
nchcli config indent true
nchcli config trust-node true
```

## 3. 初始化节点

执行如下命令，初始化节点

```bash
# moniker字段为节点名，可自定义
nchd init --moniker=<node_name> --chain-id nch-chain
```

该命令会在home目录下(默认为~/.nchd/)创建相应genesis&config文件

## 4. 执行gentx交易

使用步骤1创建的验证人账户，执行gentx交易

```bash
nchd gentx \
  --amount=1000000000000pnch \
  --pubkey $(nchd tendermint show-validator) \
  --ip=<node_public_IP> \
  --node-id=$(nchd tendermint show-node-id) \
  --name=<key_name> \
  --details=<validator details> \
  --website=<webiste>
```

交易的结果存储在 ``` ~/.nchd/config/gentx/``` 目录下。

上述命令设置的验证人参数为：

```javascript
delegation amount: 10000000000000pnch
commission rate: 0.1
commission max rate: 0.2
commission max change rate: 0.01
min_self_delegation: 1 nch
```

如果要修改上述参数，可通过```nchd gentx -h```查看命令行选项。

## 5. 提交gentx文件

将步骤3产生的json文件保存为 [github-user-name].json,  通过提交pull request将json文件提交到https://github.com/netcloth/mainnet/tree/master/gentx 目录下。

## 6. 备份私钥和验证人配置

妥善保存助记词和~/.nchd/config，~/.nchcli目录的数据，含有账号和验证人的私钥等信息，如果泄露可能导致token丢失，如果遗失账号将无法恢复，账号的资产将无法使用。
