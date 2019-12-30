# 智能合约教程

本教程包含智能合约相关的操作。

开发者体验智能合约需要下载github上的develop分支，源码编译后，本地搭建私有链。

本教程假设你已配置好NetCloth相关的开发环境和依赖，参考[这里](../software/how-to-install.md)。

## 源码编译


```bash
git clone https://github.com/NetCloth/netcloth-chain.git
cd netcloth-chain && git checkout develop

make install
```

## 初始化本地私链

```
# Initialize configuration files and genesis file
nchd init local-nch --chain-id nch-chain

# Copy the `Address` output here and save it for later use 
nchcli keys add jack

# Copy the `Address` output here and save it for later use
nchcli keys add alice

# Add both accounts, with coins to the genesis file
nchd add-genesis-account $(nchcli keys show jack -a) 1000000000000unch
nchd add-genesis-account $(nchcli keys show alice -a) 1000000000000unch

# create validator
nchd gentx \
  --amount 1000000unch \
  --commission-rate "0.10" \
  --commission-max-rate "0.20" \
  --commission-max-change-rate "0.10" \
  --pubkey $(nchd tendermint show-validator) \
  --name alice

# collect gentx
nchd collect-gentxs


# Configure your CLI to eliminate need for chain-id flag
nchcli config chain-id nch-chain
nchcli config output json
nchcli config indent true
nchcli config trust-node true
```

:::warning
如果执行```nchd init```出错，说明之前跑过nchd程序，可先备份一下之前的数据，然后重新初始化本地私链
```mv ~/.nchd ~/.nchd.bakup```


:::

## 创建智能合约

### 编写智能合约

### 部署智能合约

## 调用智能合约

TODO