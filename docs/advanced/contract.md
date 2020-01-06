# 智能合约教程(内测)

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
nchcli config chain-id <chain-id>
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
以下面的合约为示例：

```js
pragma solidity ^0.4.16;
contract token {
    mapping (address => uint256) public balances;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    function token() public {
        balances[msg.sender] = 10000000000000;
    }
    
    function transfer(address to, uint256 value) payable public returns (bool success) {
       require(balances[msg.sender] >= value);
       balances[msg.sender] -= value;
       balances[to] += value;
       emit Transfer(msg.sender, to, value);
       return true;
    }

    function balanceOf(address owner) public view returns (uint256 balance) {
        return balances[owner];
    }
}
```

可通过[remix](http://remix.ethereum.org/)在线编译完成后，将字节码(json结构体中object字段对应的值，不带双引号)和abi文件保存至本地文件。

假设本地的./demo/demo.bc为字节码文件，./demo/demo.abi为abi文件。

字节码:

```js
608060405234801561001057600080fd5b506509184e72a0006000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610344806100696000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029
```

abi:

```js
[
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
]
```


### 部署智能合约

```bash
nchcli vm create --code_file=./demo/demo.bc \
--from $(nchcli keys show -a alice) --amount=0pnch \
--gas=1000000
```

其中：
 ```--code_file``` 指定字节码文件路径, 
 ```--amount``` 表示向合约发送的资产数量， 由于示例合约的构造函数属性不为payable，所以传0pnch,
 ```--gas``` 指定本次交易的gas上限，nchcli默认为10万; 创建合约消耗的gas比较多，需要指定一个比较大的值

交易发出后，终端响应如下：
```
{
  "height": "0",
  "txhash": "C991A111B943E8C1D6BCA1F35A93BFC7F268C963F0B286340AF647D228FBCB01",
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

其中的```txhash```为交易哈希，可根据返回的```txhash```，查询交易是否成功

```bash
nchcli q tx <txhash>
```

若返回结果中包含 ```"success": true```表示交易成功； 否则在raw_log字段会有错误详情。

合约部署成功后，在链上会有一个新的地址生成。 可以通过```nchd```启动时的控制台输出，查找新部署的合约地址：

```bash
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+                                                                             +
+         contractAddr = nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc           +
+                                                                             +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
```

如上，其中 ```nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc``` 即新部署的合约地址。

合约部署成功后，可根据合约地址，查询合约代码

```bash
nchcli query vm code nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc
```

## 调用智能合约

调用智能合约，需要使用abi文件。 假设合约对应的abi文件已经保存至./demo/demo.abi 。

```bash
nchcli vm call --contract_addr nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc \
--abi_file ./demo/demo.abi --method transfer \
--args  "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002" --amount 1000000pnch \
--from $(nchcli keys show -a alice)
```

其中:
```--contract_addr ``` 指定要调用的合约地址， ```--abi_file```指定了合约对应的abi文件路径, ```--method``` 指定合约的方法名, ```--args ```指定合约方法对应的参数, ```--amount```指定向合约发送的资产数量, ```--from```指定本次调用的发起账户

上述示例调用了合约的```transfer```方法，该方法的声明如下
```js
    function transfer(address to, uint256 value) public returns (bool success)
```

```transfer``` 方法需要2个参数，分别为接收方地址和转账数量。示例中接收地址为全0， 转帐数量为2， 分别将这2个参数转成16进制，并补齐为32个字节。如下：

```
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002
```


 查询合约账户余额：

```bash
nchcli q account nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc
```

## 调用只读方法，查询合约状态

查询合约状态需要使用abi文件。假设合约对应的abi文件已经保存至./demo/demo.abi


合约示例中，```balanceOf```为只读方法，可以根据该方法查询指定地址在合约中的状态。

``` bash
# 调用合约的balanceOf方法，获取状态
nchcli q vm call $(nchcli keys show -a alice) nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc balanceOf "0000000000000000000000000000000000000000000000000000000000000000" 0pnch ./demo/demo.abi
```

查询alice帐户在合约中的状态：
```
# 使用nchcli先将alice的地址转成16进制
nchcli keys parse $(nchcli keys show -a alice)

# 补齐为32个字节, 例如: 0000000000000000000000008a68bdace7153f631c35a5d9eec55e9e1eb0c85f

# 使用nchcli查询状态
nchcli q vm call $(nchcli keys show -a alice) nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc balanceOf "0000000000000000000000008a68bdace7153f631c35a5d9eec55e9e1eb0c85f" 0pnch ./demo/demo.abi
```


该命令仅在本地区块链节点执行存储查询操作，不会产生交易，仅用于查询
