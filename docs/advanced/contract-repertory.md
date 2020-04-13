# 智能合约仓库

本文档介绍NetCloth链上常用智能合约模板。

## 资产发行合约

### ERC20

* ERC20规范，参考[这里](https://github.com/netcloth/contracts/blob/master/token/erc20/readme.md)
* 测试网示例合约地址：```nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4```
  
#### 创建合约

创建合约，指定4个参数：```_initialSupply, _name, _decimals, _symbol```，此外指定的4个参数值分别为: 

```
_initialSupply: 1000000000
_name: token
_decimals: 18
_symbol: TOKEN
```

```bash
nchcli vm create --code_file=./erc20.bc --from $(nchcli keys show -a alice) --amount=0pnch --args 000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000005746f6b656e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005544f4b454e000000000000000000000000000000000000000000000000000000 --gas 10000000
```

创建合约将消耗比较多的gas， 上述命令指定了gas数量为10000000 (nchcli命令行默认为200000)
::: warning notice
关于如何将构造函数参数转成二进制并传给命令行，文档将稍后更新，敬请期待。

开发者可参考nch sdk[示例](https://github.com/netcloth/go-sdk/blob/master/util/contract_util_test.go)
:::

合约创建成功后，根据txHash反查交易信息，其中new_contract部分对应新创建的合约地址，此处生成的合约地址为```nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4```

#### 查询token代号

调用合约的symbol方法，查询token代号

```bash
# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址

nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 symbol "" 0pnch ./erc20.abi
```

结果：

```json
{
  "Gas": "3273",
  "Res": "00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000005544f4b454e000000000000000000000000000000000000000000000000000000"
}

# 反序列化后结果：TOKEN
```

#### 查询token名称

调用合约的name方法，查询token名称

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 name "" 0pnch ./erc20.abi
```

结果：

```json
{
  "Gas": "3230",
  "Res": "00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000005746f6b656e000000000000000000000000000000000000000000000000000000"
}

# 反序列化后结果：token
```

#### 查询token总量

调用合约的totalSupply方法，查询token总量

```bash
# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址

nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 totalSupply "" 0pnch ./erc20.abi
```

结果：

```json
{
  "Gas": "1050",
  "Res": "000000000000000000000000000000000000000000000000000000003b9aca00"
}
```

以上结果中 ```000000000000000000000000000000000000000000000000000000003b9aca00```即返回的16进制余额，可通过[进制转换工具](https://tool.oschina.net/hexconvert)或如下命令行转成10进制

```bash
res=000000000000000000000000000000000000000000000000000000003b9aca00
echo $((16#${res}))

#结果： 1000000000
```

#### 查询token精度

调用合约的decimals方法，查询token精度

```bash
# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址

nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 decimals "" 0pnch ./erc20.abi
```

结果：

```json
{
  "Gas": "1053",
  "Res": "0000000000000000000000000000000000000000000000000000000000000012"
}
```

以上结果中 ```0000000000000000000000000000000000000000000000000000000000000012```即返回的16进制余额，可通过[进制转换工具](https://tool.oschina.net/hexconvert)或如下命令行转成10进制

```bash
res=0000000000000000000000000000000000000000000000000000000000000012
echo $((16#${res}))

#结果： 18
```

#### 查询余额
  
示例的合约，在构造函数中将余额初始在```msg.sender```也即创建合约的账户中。

查询alice账户在合约中的余额，调用合约的```balanceOf```方法：

```bash
# 将alice地址转成16进制
nchcli keys parse $(nchcli keys show -a alice)
# 最前面添加24个0， 补齐为32个字节, 例如: 0000000000000000000000009bfaf060dfa1b249b3f5a913505993444c0dea35

# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址
nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 balanceOf 0000000000000000000000009bfaf060dfa1b249b3f5a913505993444c0dea35 0pnch ./erc20.abi
```

查询结果如下：

```json
{
  "Gas": "1218",
  "Res": "000000000000000000000000000000000000000000000000000000003b9aca00"
}
```

以上结果中 ```000000000000000000000000000000000000000000000000000000003b9aca00```即返回的16进制余额，转成10进制:

```bash
res=000000000000000000000000000000000000000000000000000000003b9aca00
echo $((16#${res}))

#结果： 1000000000
```

#### 转账

调用合约的transfer方法，向```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e``` 转账10000个TOKEN

```bash
# 将nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e地址转成16进制
nchcli keys parse nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e
# 最前面添加24个0， 补齐为32个字节, 例如: 0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a

# 将10000转成16进制，并被齐为32个字节，即 0000000000000000000000000000000000000000000000000000000000002710
printf %064x 10000

nchcli vm call --from=$(nchcli keys show -a alice) --contract_addr=nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 --amount=0pnch --abi_file=./erc20.abi --method=transfer --args="0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a0000000000000000000000000000000000000000000000000000000000002710"
```
  
查询```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e```在合约中的TOKEN余额

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 balanceOf 0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a 0pnch ./erc20.abi
```

结果：

```json
{
  "Gas": "1218",
  "Res": "0000000000000000000000000000000000000000000000000000000000002710"
}

# 转成10进制： 10000
res=0000000000000000000000000000000000000000000000000000000000002710
echo $((16#${res}))

```

查询 alice 账户在合约中的TOKEN余额

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 balanceOf 0000000000000000000000009bfaf060dfa1b249b3f5a913505993444c0dea35 0pnch ./erc20.abi
```

结果：

```json
{
  "Gas": "1218",
  "Res": "000000000000000000000000000000000000000000000000000000003b9aa2f0"
}

# 转成10进制： 999990000
res=000000000000000000000000000000000000000000000000000000003b9aa2f0
echo $((16#${res}))
```

### ERC721