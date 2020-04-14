# 智能合约仓库

本文档介绍NetCloth链上常用智能合约模板。

## NRC-20

* NRC-20规范，参考[这里](https://github.com/netcloth/contracts/blob/master/token/nrc20/readme.md)
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
--from $(nchcli keys show -a alice) \
--amount=0pnch \
--args 000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000005746f6b656e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005544f4b454e000000000000000000000000000000000000000000000000000000 \
--gas 10000000
```

创建合约将消耗比较多的gas， 上述命令指定了gas数量为10000000 (nchcli命令行默认为200000)
::: warning notice
关于如何将构造函数参数转成二进制并传给命令行，开发者可参考nch sdk[示例](https://github.com/netcloth/go-sdk/blob/master/util/contract_util_test.go)
:::

合约创建成功后，根据txHash反查交易信息，其中new_contract部分对应新创建的合约地址，此处生成的合约地址为```nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4```

### 查询token代号

调用合约的symbol方法，查询token代号

```bash
# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址

nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 symbol "" 0pnch ./nrc20.abi
```

结果：

```json
{
  "Gas": "3273",
  "Res": "00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000005544f4b454e000000000000000000000000000000000000000000000000000000"
}

# 反序列化后结果：TOKEN
```

### 查询token名称

调用合约的name方法，查询token名称

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 name "" 0pnch ./nrc20.abi
```

结果：

```json
{
  "Gas": "3230",
  "Res": "00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000005746f6b656e000000000000000000000000000000000000000000000000000000"
}

# 反序列化后结果：token
```

### 查询token总量

调用合约的totalSupply方法，查询token总量

```bash
# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址

nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 totalSupply "" 0pnch ./nrc20.abi
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

### 查询token精度

调用合约的decimals方法，查询token精度

```bash
# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址

nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 decimals "" 0pnch ./nrc20.abi
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

### 查询余额
  
示例的合约，在构造函数中将余额初始在```msg.sender```也即创建合约的账户中。

查询alice账户在合约中的余额，调用合约的```balanceOf```方法：

```bash
# 将alice地址转成16进制
nchcli keys parse $(nchcli keys show -a alice)
# 最前面添加24个0， 补齐为32个字节, 例如: 0000000000000000000000009bfaf060dfa1b249b3f5a913505993444c0dea35

# nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 为新创建的合约地址
nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 balanceOf 0000000000000000000000009bfaf060dfa1b249b3f5a913505993444c0dea35 0pnch ./nrc20.abi
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

### 转账

调用合约的transfer方法，向```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e``` 转账10000个TOKEN

```bash
# 将nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e地址转成16进制
nchcli keys parse nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e
# 最前面添加24个0， 补齐为32个字节, 例如: 0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a

# 将10000转成16进制，并被齐为32个字节，即 0000000000000000000000000000000000000000000000000000000000002710
printf %064x 10000

# 将上述2个参数拼接起来，即调用转账需要传入的参数：0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a0000000000000000000000000000000000000000000000000000000000002710

# 用nchcli命令行调用合约的 transfer 方法
nchcli vm call --from=$(nchcli keys show -a alice) \
--contract_addr=nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 \
--amount=0pnch \
--abi_file=./nrc20.abi \
--method=transfer --args="0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a0000000000000000000000000000000000000000000000000000000000002710"
```
  
查询```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e```在合约中的TOKEN余额

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 balanceOf 0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a 0pnch ./nrc20.abi
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
nchcli q vm call $(nchcli keys show -a alice) nch1q8j4n4dn26lcnx8yhjl65jeqhutn8cjmureyt4 balanceOf 0000000000000000000000009bfaf060dfa1b249b3f5a913505993444c0dea35 0pnch ./nrc20.abi
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

## NRC-721

* NRC-721规范，参考[这里](https://github.com/netcloth/contracts/blob/master/token/nrc721/readme.md)
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
--amount=0pnch \
--args 0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000086e6674546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034e46540000000000000000000000000000000000000000000000000000000000 \
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

nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t symbol "" 0pnch ./nrc721.abi
```

结果：

```json
{
  "Gas": "3259",
  "Res": "000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000034e46540000000000000000000000000000000000000000000000000000000000"
}

# 反序列化后结果：NFT
```

### 查询token名称

调用合约的name方法，查询token名称

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t name "" 0pnch ./nrc721.abi
```

结果：

```json
{
  "Gas": "3283",
  "Res": "000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000086e6674546f6b656e000000000000000000000000000000000000000000000000"
}

# 反序列化后结果：nftToken
```

### 查询token精度

对于NFT而言，每一枚代币都是独一无二的，不可分割。

### 产生token

示例合约中，加入了自定义的方法MyMint(该方法不在标准接口中)，用于演示产生token。

向alice地址，产生tokenId为1的NFT

```bash
# 将alice地址转成16进制
# 最前面添加24个0， 补齐为32个字节, 例如: 0000000000000000000000005376329591cde25497d29de88ec553229ad10a61
bytes=$(nchcli keys parse $(nchcli keys show -a alice) | grep bytes | sed 's/"bytes"://;s/"//g;s/[[:space:]]//g' | tr A-Z a-z)
echo $bytes | awk '{printf("%064s",$0)}'  # 得到32字节的地址

# tokenID为1时，对应的32字段字符串为: 0000000000000000000000000000000000000000000000000000000000000001

nchcli vm call \
--from=$(nchcli keys show -a alice) \
--contract_addr=nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
--amount=0pnch \
--abi_file=./nrc721.abi \
--method=MyMint \
--args="0000000000000000000000005376329591cde25497d29de88ec553229ad10a610000000000000000000000000000000000000000000000000000000000000001" \
--gas 300000
```

上述命令指定了```--gas 300000```, 是因为此次合约调用将消耗比较多的gas。

### 查询余额
  
上一步中，为alice产生了一枚NFT 代币。查询alice账户在合约中的余额，调用合约的```balanceOf```方法：

```bash
# 将alice地址转成16进制
# 最前面添加24个0， 补齐为32个字节, 例如: 0000000000000000000000009bfaf060dfa1b249b3f5a913505993444c0dea35
bytes=$(nchcli keys parse $(nchcli keys show -a alice) | grep bytes | sed 's/"bytes"://;s/"//g;s/[[:space:]]//g' | tr A-Z a-z)
args=$(echo $bytes | awk '{printf("%064s",$0)}')

# nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t 为新创建的合约地址
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t balanceOf ${args} 0pnch ./nrc721.abi
```

查询结果如下：

```json
{
  "Gas": "1218",
  "Res": "0000000000000000000000000000000000000000000000000000000000000001"
}
```

以上结果中 ```000000000000000000000000000000000000000000000000000000003b9aca00```即返回的16进制余额，转成10进制:

```bash
res=0000000000000000000000000000000000000000000000000000000000000001
echo $((16#${res}))

#结果： 1, 即alice账户余额为1
```

### 查询token所属owner

每一枚NFT token都对应一个拥有者，调用ownerOf方法，可根据tokenId查询其owner。

查询tokenId为1的NFT token所属owner地址：

```bash
# tokenId为1，对应的32字节为：0000000000000000000000000000000000000000000000000000000000000001
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t ownerOf 0000000000000000000000000000000000000000000000000000000000000001 0pnch ./nrc721.abi
```

结果：
```json
{
  "Gas": "3180",
  "Res": "0000000000000000000000005376329591cde25497d29de88ec553229ad10a61"
}
```

其中```0000000000000000000000005376329591cde25497d29de88ec553229ad10a61```即对应alice地址。

```bash
addr=0000000000000000000000005376329591cde25497d29de88ec553229ad10a61
nchcli keys parse $(echo $addr | sed 's/^0*//g') | sed -n 3p
```

### 查询token总量

新创建的示例合约，token总量为0，调用MyMint产生了1个NFT token。

调用合约的totalSupply方法，可查询token总量

```bash
# nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t 为新创建的合约地址

nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t totalSupply "" 0pnch ./nrc721.abi
```

结果：

```json
{
  "Gas": "1142",
  "Res": "0000000000000000000000000000000000000000000000000000000000000001"
}

# 即token总量为1
```

### 转账

* 调用合约的transferFrom方法，从alice账户向```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e``` 转账tokenId为1的NFT token

```bash
# 将alice地址转成16进制
# 最前面添加24个0， 补齐为32个字节, 例如: 0000000000000000000000009bfaf060dfa1b249b3f5a913505993444c0dea35
bytes=$(nchcli keys parse $(nchcli keys show -a alice) | grep bytes | sed 's/"bytes"://;s/"//g;s/[[:space:]]//g' | tr A-Z a-z)
echo $bytes | awk '{printf("%064s",$0)}'

# 将nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e地址转成16进制
# 最前面添加24个0， 补齐为32个字节, 例如: 0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a
bytes=$(nchcli keys parse nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e | grep bytes | sed 's/"bytes"://;s/"//g;s/[[:space:]]//g' | tr A-Z a-z)
echo $bytes | awk '{printf("%064s",$0)}'

# 将转账数量1转成16进制，并被齐为32个字节，即 0000000000000000000000000000000000000000000000000000000000000001
printf %064x 10000

# 将上述3个参数拼接起来，即调用转账需要传入的参数： 0000000000000000000000005376329591cde25497d29de88ec553229ad10a610000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a0000000000000000000000000000000000000000000000000000000000000001

# 用nchcli命令行调用合约的 transferFrom 方法
nchcli vm call \
--from=$(nchcli keys show -a alice) \
--contract_addr=nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t \
--amount=0pnch \
--abi_file=./nrc721.abi \
--method=transferFrom \
--args="0000000000000000000000005376329591cde25497d29de88ec553229ad10a610000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a0000000000000000000000000000000000000000000000000000000000000001"
```
  
* 查询```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e```在合约中的TOKEN余额

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t balanceOf 0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a 0pnch ./nrc721.abi
```

结果：

```json
{
  "Gas": "1407",
  "Res": "0000000000000000000000000000000000000000000000000000000000000001"
}

# 转成10进制： 1
res=0000000000000000000000000000000000000000000000000000000000000001
echo $((16#${res}))
```

* 查询 alice 账户在合约中的TOKEN余额

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t balanceOf 0000000000000000000000009bfaf060dfa1b249b3f5a913505993444c0dea35 0pnch ./nrc721.abi
```

结果：

```json
{
  "Gas": "1407",
  "Res": "0000000000000000000000000000000000000000000000000000000000000000"
}

# 转成10进制： 0
res=0000000000000000000000000000000000000000000000000000000000000000
echo $((16#${res}))
```

* 查看 tokenId为1的NFT token所属owner

```bash
nchcli q vm call $(nchcli keys show -a alice) nch1zypvh2q606ztw4elfgla0p6x4eruz3md6euv2t ownerOf 0000000000000000000000000000000000000000000000000000000000000001 0pnch ./nrc721.abi
```

结果：

```json
{
  "Gas": "3180",
  "Res": "0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a"
}
```

其中```0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a```即对应地址```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e```

```bash
addr=0000000000000000000000008b5cece82c2a9992f087b2b9e7bf5d2a5a593b1a
nchcli keys parse $(echo $addr | sed 's/^0*//g') | sed -n 3p
```

## 红包合约

## 锁仓合约

## 数据上链合约

## 消息撤回合约
## DEX