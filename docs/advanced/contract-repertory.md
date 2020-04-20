# 智能合约仓库

本文档介绍NetCloth链上常用智能合约模板。

合约模板仅用于演示，如果有任何问题或建议，欢迎在[github上](https://github.com/netcloth/contracts)交流反馈。

## NRC-20

* NRC-20规范，参考[这里](https://github.com/netcloth/contracts/blob/master/token/nrc20/readme.md)
* 合约ABI，参考[这里](https://github.com/netcloth/contracts/blob/master/token/nrc20/nrc20.abi)
* 测试网示例合约地址：```nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4```
  
### 创建合约

创建合约，指定4个参数：```_initialSupply, _name, _decimals, _symbol```，此处指定的4个参数值分别为: 

```text
_initialSupply: 1000000000
_name: token
_decimals: 18
_symbol: TOKEN
```

```bash
nchcli vm create --code_file=./nrc20.bc \
--from=$(nchcli keys show -a alice) \
--args="1000000000 token 18 TOKEN" \
--abi_file="./nrc20.abi" \
--gas=10000000
```

创建合约将消耗比较多的gas， 上述命令指定了gas数量为10000000 (nchcli命令行默认为200000)
::: warning 提示
关于如何将构造函数参数转成二进制并传给命令行，开发者可参考nch sdk[示例](https://github.com/netcloth/go-sdk/blob/master/util/contract_util_test.go)
:::

合约创建成功后，根据txHash反查交易信息，其中new_contract部分对应新创建的合约地址，此处生成的合约地址为```nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4```

### 查询token代号

调用合约的symbol方法，查询token代号

```bash
# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址

nchcli q vm call $(nchcli keys show -a alice) \
nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 symbol ./nrc20.abi
```

结果：

```json
{"Gas":3273,"Result":["TOKEN"]}
```

### 查询token名称

调用合约的name方法，查询token名称

```bash
nchcli q vm call $(nchcli keys show -a alice) \
nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 name ./nrc20.abi
```

结果：

```json
{"Gas":3230,"Result":["token"]}
```

### 查询token总量

调用合约的totalSupply方法，查询token总量

```bash
# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址
nchcli q vm call $(nchcli keys show -a alice) \
nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 totalSupply ./nrc20.abi
```

结果：

```json
{"Gas":1050,"Result":[1000000000]}
```

### 查询token精度

调用合约的decimals方法，查询token精度

```bash
# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址
nchcli q vm call $(nchcli keys show -a alice) \
nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 decimals ./nrc20.abi
```

结果：

```json
{"Gas":1053,"Result":[18]}
```

### 查询余额
  
示例的合约，在构造函数中将余额初始在```msg.sender```也即创建合约的账户中。

查询alice账户在合约中的余额，调用合约的```balanceOf```方法：

```bash
# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址
nchcli q vm call $(nchcli keys show -a alice) \
nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 balanceOf ./nrc20.abi \
--args "$(nchcli keys show -a alice)"
```

查询结果如下：

```json
{"Gas":1218,"Result":[1000000000]}
```

### 转账

调用合约的transfer方法，向```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e``` 转账10000个TOKEN

```bash
nchcli vm call --from=$(nchcli keys show -a alice) \
--contract_addr=nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 \
--method=transfer \
--abi_file=./nrc20.abi \
--args="nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e 10000"
```
  
查询```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e```在合约中的TOKEN余额

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 \
balanceOf ./nrc20.abi --args="nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"
```

结果：

```json
{"Gas":1218,"Result":[10000]}
```

查询 alice 账户在合约中的TOKEN余额

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 \
balanceOf ./nrc20.abi --args=$(nchcli keys show -a alice)
```

结果：

```json
{"Gas":1218,"Result":[999990000]}
```

## NRC-721

* NRC-721规范，参考[这里](https://github.com/netcloth/contracts/blob/master/token/nrc721/readme.md)
* 合约ABI，参考[这里](https://github.com/netcloth/contracts/blob/master/token/nrc721/nrc721.abi)
* 测试网示例合约地址：```nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t```
  
### 创建合约

创建合约，指定2个参数：```_name, _symbol```， 此处指定的2个参数值分别为: 

```text
_name: nftToken
_symbol: NFT
```

```bash
nchcli vm create \
--from $(nchcli keys show -a alice) \
--code_file=./nrc721.bc \
--args "nftToken NFT" \
--abi_file="./nrc721.abi" \
--gas 10000000
```

创建合约将消耗比较多的gas， 上述命令指定了gas数量为10000000 (nchcli命令行默认为200000)
::: warning notice
关于如何将构造函数参数转成二进制并传给命令行，开发者可参考nch sdk[示例](https://github.com/netcloth/go-sdk/blob/master/util/contract_util_test.go)
:::

合约创建成功后，根据txHash反查交易信息，其中new_contract部分对应新创建的合约地址，此处生成的合约地址为```nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t```

### 查询token代号

调用合约的symbol方法，查询token代号

```bash
# nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t 为新创建的合约地址
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
symbol ./nrc721.abi
```

结果：

```json
{"Gas":3259,"Result":["NFT"]}
```

### 查询token名称

调用合约的name方法，查询token名称

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
name ./nrc721.abi
```

结果：

```json
{"Gas":3283,"Result":["nftToken"]}
```

### 查询token精度

对于NFT而言，每一枚代币都是独一无二的，不可分割。

### 产生token

示例合约中，加入了自定义的方法MyMint(该方法不在标准接口中)，用于演示产生token。

向alice地址，产生tokenId为1的NFT

```bash
nchcli vm call \
--from=$(nchcli keys show -a alice) \
--contract_addr=nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
--method=MyMint \
--abi_file=./nrc721.abi \
--args="$(nchcli keys show -a alice) 1" \
--gas 300000
```

上述命令指定了```--gas 300000```, 是因为此次合约调用将消耗比较多的gas。

### 查询余额
  
上一步中，为alice产生了一枚NFT 代币。查询alice账户在合约中的余额，调用合约的```balanceOf```方法：

```bash
# nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t 为新创建的合约地址
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
balanceOf ./nrc721.abi --args=$(nchcli keys show -a alice)
```

查询结果如下：

```json
{"Gas":1429,"Result":[1]}
```

### 查询token所属owner

每一枚NFT token都对应一个拥有者，调用ownerOf方法，可根据tokenId查询其owner。

查询tokenId为1的NFT token所属owner地址：

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
ownerOf ./nrc721.abi --args="1"
```

结果：

```json
{"Gas":3180,"Result":["nch12dmr99v3eh39f97jnh5ga32ny2ddzznppumf2h"]}
```

### 查询token总量

新创建的示例合约，token总量为0，调用MyMint产生了1个NFT token。

调用合约的totalSupply方法，可查询token总量

```bash
# nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t 为新创建的合约地址
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
totalSupply ./nrc721.abi
```

结果：

```json
{"Gas":1142,"Result":[1]}
```

### 转账

* 调用合约的transferFrom方法，从alice账户向```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e``` 转账tokenId为1的NFT token

```bash
# 用nchcli命令行调用合约的 transferFrom 方法
# transferFrom有三个参数：from, to, tokenId
nchcli vm call \
--from=$(nchcli keys show -a alice) \
--contract_addr=nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
--method=transferFrom \
--abi_file=./nrc721.abi \
--args="$(nchcli keys show -a alice) nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e 1"
```
  
* 查询```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e```在合约中的TOKEN余额

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
balanceOf ./nrc721.abi \
--args="nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"
```

结果：

```json
{"Gas":1407,"Result":[1]}
```

* 查询 alice 账户在合约中的TOKEN余额

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
balanceOf ./nrc721.abi \
--args="$(nchcli keys show -a alice)"
```

结果：

```json
{"Gas":1407,"Result":[0]}
```

* 查看 tokenId为1的NFT token所属owner

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
ownerOf ./nrc721.abi \
--args="1"
```

结果：

```json
{"Gas":3180,"Result":["nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"]}
```

## 红包合约

## 锁仓合约

* 合约源码，参考[这里](https://github.com/netcloth/contracts/blob/master/vesting/linear-vesting.sol)
* 合约ABI，参考[这里](https://github.com/netcloth/contracts/blob/master/vesting/linear-vesting.abi)
* 测试网示例合约地址：```nch1qq3t449wyy0a3s3rafzrxjzj6ne6vhndpaf2t2```

### 创建合约

示例合约为线性释放合约。

```bash
nchcli vm create --code_file=./linear-vesting.bc \
--from $(nchcli keys show -a vesting) \
--gas 10000000
```

得到新合约地址：```nch1qq3t449wyy0a3s3rafzrxjzj6ne6vhndpaf2t2```

### 创建一笔锁仓资产

调用合约的create接口， 创建一笔锁仓资产，其中create有3个参数，分别为:

```text
_to: 收款地址
_vestingStartTime: 锁仓开始时间，时间戳
_vestingEndTime: 锁仓结束时间，时间戳
```

调用create接口, 向```nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e```提供一笔锁仓资产：

::: warning 提示
生成当前时间对应的时间戳, shell命令行:```date +%s```

生成1天后的时间戳，linux shell命令行: ```date --date="+1 day" +%s```, 
                mac OS shell命令行: ```date -v+1d +%s```
:::

```bash
nchcli vm call \
--from=$(nchcli keys show -a vesting) \
--contract_addr=nch1qq3t449wyy0a3s3rafzrxjzj6ne6vhndpaf2t2 \
--method=create \
--abi_file=./linear-vesting.abi \
--args="nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e 1587107450 1587107950" \
--amount=100000000000000pnch \
--gas=300000
```

其中 ```--amount``` 指定了向合约中锁仓的NCH资产数量。 ``` 1 NCH = 10 ^ 12 pnch```
### 查询合约

* 查询地址```nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e```的锁仓信息：
  
```bash
nchcli q vm call $(nchcli keys show -a alice) nch1qq3t449wyy0a3s3rafzrxjzj6ne6vhndpaf2t2 \
vestingInfo ./linear-vesting.abi --args="nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e"
```

* 查询合约中余额

```bash
nchcli q account nch1qq3t449wyy0a3s3rafzrxjzj6ne6vhndpaf2t2
```

结果:

```json
{
  "type": "nch/Account",
  "value": {
    "address": "nch1qq3t449wyy0a3s3rafzrxjzj6ne6vhndpaf2t2",
    "coins": [
      {
        "denom": "pnch",
        "amount": "1000000000000000"
      }
    ],
    "public_key": null,
    "account_number": "10",
    "sequence": "0",
    "code_hash": "7b7ba65442305d9879c1bfc54c741773c7d030e726532edd041c7fe84e29eb75"
  }
}
```

### 申领锁仓资产

使用```nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e```地址，从合约中申领锁仓资产：

```bash
nchcli vm call \
--from=nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e \
--contract_addr=nch1qq3t449wyy0a3s3rafzrxjzj6ne6vhndpaf2t2 \
--method=claim \
--abi_file=./linear-vesting.abi \
--gas=300000
```

示例合约会根据锁仓库数量、_vestingStartTime和_vestingStartTime计算线性释放的数量。

## 数据上链合约

## 消息撤回合约

* 合约源码，参考[这里](https://github.com/netcloth/contracts/blob/master/recall/recall_payable.sol)
* 合约ABI，参考[这里](https://github.com/netcloth/contracts/blob/master/recall/recall_payable.abi)
* 测试网示例合约地址：```nch1ylj55r9c5u027cdggrsz7e72etf2vtuc0aek43```
  
### 创建合约

创建合约，指定1个参数：```_initFee```:

```text
_initFee: 1000000000000
```

```bash
nchcli vm create --code_file=./recall_payable.bc \
--from $(nchcli keys show -a recall) \
--args="1000000000000" \
--abi_file=./recall_payable.abi \
--gas 10000000
```

创建合约将消耗比较多的gas， 上述命令指定了gas数量为10000000 (nchcli命令行默认为200000)
::: warning notice
关于如何将构造函数参数转成二进制并传给命令行，开发者可参考nch sdk[示例](https://github.com/netcloth/go-sdk/blob/master/util/contract_util_test.go)
:::

合约创建成功后，根据txHash反查交易信息，其中new_contract部分对应新创建的合约地址，此处生成的合约地址为```nch1ylj55r9c5u027cdggrsz7e72etf2vtuc0aek43```

### 调用合约

调用合约的recall接口， 三个参数分别为```fromPubKey, toPubKey, recallType, timestamp```

```bash
nchcli vm call \
--from=$(nchcli keys show -a recall) \
--contract_addr=nch1ylj55r9c5u027cdggrsz7e72etf2vtuc0aek43 \
--method=recall \
--abi_file=./recall_payable.abi \
--args="04b9d3c18fb7609153f60afb31c9077440aeeed9ce932729a89f0f056a6422acd301f89062175973e7bbdfcff1cec42951f68e046748e8e91b8870774ce6c2f59d  14b9d3c18fb7609153f60afb31c9077440aeeed9ce932729a89f0f056a6422acd301f89062175973e7bbdfcff1cec42951f68e046748e8e91b8870774ce6c2f59e 1 1587354403" \
--amount=1000000000000pnch \
--gas=300000
```

### 查询fee

调用合约的fee方法，可查询fee

```bash
# nch1ylj55r9c5u027cdggrsz7e72etf2vtuc0aek43 为新创建的合约地址

nchcli q vm call $(nchcli keys show -a recall) nch1ylj55r9c5u027cdggrsz7e72etf2vtuc0aek43 fee ./recall_payable.abi
```

结果：

```json
{"Gas":1093,"Result":[1000000000000]}
```

### 查询消息撤回记录

```bash
nchcli q vm call $(nchcli keys show -a recall) nch1ylj55r9c5u027cdggrsz7e72etf2vtuc0aek43 queryRecall ./recall_payable.abi --args="04b9d3c18fb7609153f60afb31c9077440aeeed9ce932729a89f0f056a6422acd301f89062175973e7bbdfcff1cec42951f68e046748e8e91b8870774ce6c2f59d  14b9d3c18fb7609153f60afb31c9077440aeeed9ce932729a89f0f056a6422acd301f89062175973e7bbdfcff1cec42951f68e046748e8e91b8870774ce6c2f59e 1"
```

结果：

```json
{"Gas":5724,"Result":[1587354403,"nch1q0yd85ypys5pwyujk8r6u9seglyxyzgfj4g0se"]}
```

::: warning 提示
关于如何查询合约事件，开发者可参考nch sdk[示例](https://github.com/netcloth/go-sdk/blob/master/client/test/contract_call_test/contract_call_test.go)
:::

## DEX

## 更多资源

* 合约仓库github地址，点击[这里](https://github.com/netcloth/contracts)
* NIPs github地址，点击[这里](https://github.com/netcloth/NIPs)