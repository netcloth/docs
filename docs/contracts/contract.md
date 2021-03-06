# 智能合约教程

本教程包含智能合约相关的操作，需要你先在本地跑一个测试网节点或者私链。

配置相关的开发环境和依赖，参考[这里](../software/how-to-install.md)。

## 源码编译

```bash
git clone https://github.com/NetCloth/netcloth-chain.git
cd netcloth-chain && git checkout testnet

make install
```

## 初始化本地私链

[点击这里加入测试网](../get-started/how-to-join-testnet.md)，同步测试网区块需要花费一定的时间。此处将以私链为例。

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

```javascript
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

```javascript
608060405234801561001057600080fd5b506509184e72a0006000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610344806100696000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029
```

abi:

```javascript
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
--from $(nchcli keys show -a alice) \
--gas=1000000
```

其中：
 ```--code_file``` 指定字节码文件路径, 
 ```--gas``` 指定本次交易的gas上限，nchcli默认为10万; 创建合约消耗的gas比较多，需要指定一个比较大的值

交易发出后，终端响应如下：

```json
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

其中的```txhash```为交易哈希。 可根据返回的```txhash```，查询交易是否成功， 以及新创建的合约地址

```bash
nchcli query tx <txhash>
```

若返回结果中包含 ```"success": true```表示交易成功； 否则在raw_log字段会有错误详情。

交易详情中，其中的events结构中包含新创建的合约地址：

```json
 "events": [
    {
      "type": "message",
      "attributes": [
        {
          "key": "action",
          "value": "contract"
        },
        {
          "key": "module",
          "value": "vm"
        }
      ]
    },
    {
      "type": "new_contract",
      "attributes": [
        {
          "key": "address",
          "value": "nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc"
        }
      ]
    }
  ],
```

如上，其中 ```nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc``` 即新部署的合约地址。

根据上述新创建的合约地址，可查询区块链上的合约代码

```bash
nchcli query vm code nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc
```

## 调用智能合约

调用智能合约，需要使用abi文件。 假设合约对应的abi文件已经保存至./demo/demo.abi 。

```bash
nchcli vm call --from=$(nchcli keys show -a alice) \
--contract_addr=nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc \
--method=transfer \
--args="nch12dmr99v3eh39f97jnh5ga32ny2ddzznppumf2h 100" \
--amount=1000000pnch \
--abi_file=./demo/demo.abi
```

其中:
```--contract_addr ``` 指定要调用的合约地址， ```--abi_file```指定了合约对应的abi文件路径, ```--method``` 指定合约的方法名, ```--args ```指定合约方法对应的参数, ```--amount```指定向合约发送的资产数量, ```--from```指定本次调用的发起账户

上述示例调用了合约的```transfer```方法，该方法的声明如下

```javascript
function transfer(address to, uint256 value) public returns (bool success)
```

:::warning 建议
如果只想本地构造交易消息体，而不需要签名和广播，可以在nchcli命令行末尾带上```--generate-only```参数
:::


 查询合约账户余额：

```bash
nchcli query account nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc
```

## 调用合约方法，查询合约状态

查询合约状态需要使用abi文件。假设合约对应的abi文件已经保存至```./demo/demo.abi```

合约示例中，```balanceOf```为只读方法，可以根据该方法查询指定地址在合约中的状态。 

``` bash
# 调用合约的balanceOf方法，
nchcli query vm call $(nchcli keys show -a alice) nch1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc balanceOf ./demo/demo.abi \
--args="nch12dmr99v3eh39f97jnh5ga32ny2ddzznppumf2h"
```

通过```nchcli```的```query```方式调用合约，只能够查询状态，不会在链上记账。 也可以使用nchcli的这种方式，构造payload字段，用于合约相关的REST API。

## 智能合约相关API

智能合约相关的API，主要包括查询合约代码、预估交易gas和调用合约的方法。

参考[这里](../advanced/api.md#合约相关api)