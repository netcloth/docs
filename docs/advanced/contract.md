# 智能合约教程

本教程包含智能合约相关的操作。

开发者体验智能合约需要下载github上的develop分支，源码编译后，本地搭建私有链。

配置相关的开发环境和依赖，参考[这里](../software/how-to-install.md)。

## 源码编译

```bash
git clone https://github.com/NetCloth/netcloth-chain.git
cd netcloth-chain && git checkout develop

make install
```

## 初始化本地私链

### 初始化

```bash
# usage:
nchd init <local-node-name> --chain-id <chain-id>

# 示例：
nchd init local-nch --chain-id nch-chain
```

:::warning
如果执行```nchd init```出错，说明之前跑过nchd程序，可先备份一下之前的数据，然后重新初始化本地私链
```mv ~/.nchd ~/.nchd.bakup```
:::

### 创建钱包地址

```bash
# Copy the `Address` output here and save it for later use 
nchcli keys add jack

# Copy the `Address` output here and save it for later use
nchcli keys add alice
```

### 将钱包地址加入genesis文件，并初始化余额

```bash
# Add both accounts, with coins to the genesis file
nchd add-genesis-account $(nchcli keys show jack -a) 100000000000000000000pnch
nchd add-genesis-account $(nchcli keys show alice -a) 100000000000000000000pnch
```

### 创建验证人

```bash
# create validator
nchd gentx \
  --amount 1000000000000pnch \
  --commission-rate "0.10" \
  --commission-max-rate "0.20" \
  --commission-max-change-rate "0.10" \
  --pubkey $(nchd tendermint show-validator) \
  --name alice


# collect gentx
nchd collect-gentxs
```

### 配置命令行钱包nchcli

```bash
# Configure your CLI to eliminate need for chain-id flag
nchcli config chain-id nch-chain
nchcli config output json
nchcli config indent true
nchcli config trust-node true
```

### 启动本地私链

完成以上配置后，执行如下命令，启动本地私链

```bash
nchd start --log_level "*:debug" --trace
```

## 创建智能合约

### 编写智能合约

智能合约支持solidity语言。
可通过[remix](http://remix.ethereum.org/)在线编译完成后，将字节码(json结构体中object字段对应的值，不带双引号)和abi文件保存至本地文件。

假设本地的./demo/demo.bc为字节码文件，./demo/demo.abi为abi文件。

### 部署智能合约

```bash
nchcli vm create --code_file=./demo/demo.bc \
--from $(nchcli keys show -a alice) --amount=0unch \
--gas=1000000
```

根据终端返回的txhash，查询交易是否成功

```bash
nchcli q tx <txhash>
```

若返回结果中包含 ```"success": true```表示交易成功； 否则在raw_log字段会有错误详情。

合约部署成功，在链上会有一个新的地址生成。 可以通过nchd启动时的控制台输出，查找新部署的合约地址：

```bash
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+                                                                             +
+         contractAddr = nch1ncce66negyp2gpjd89gpvy99kll3shzzjjrnpz           +
+                                                                             +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
```

如上，其中 ```nch1ncce66negyp2gpjd89gpvy99kll3shzzjjrnpz``` 即新部署的合约地址。

## 调用智能合约

调用智能合约，需要使用abi文件。 假设合约对应的abi文件已经保存至./demo/demo.abi 。

```bash
nchcli vm call --contract_addr nch1ncce66negyp2gpjd89gpvy99kll3shzzjjrnpz \
--abi_file ./demo/demo.abi --method transfer \
--args  "00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002" \
--from $(nchcli keys show -a alice) -y
```

