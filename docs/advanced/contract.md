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
以下面的合约为示例：

```js
pragma solidity ^0.4.16;
contract token {
    uint256 public amount;
    event Transfer(uint256 value);
    function token() public {
       amount = 0;
    }
    
    function transfer(uint256 value) public payable {
       amount += value;
    }

    function balance() public constant returns (uint balance) {
        return amount;
    }
    
}
```

可通过[remix](http://remix.ethereum.org/)在线编译完成后，将字节码(json结构体中object字段对应的值，不带双引号)和abi文件保存至本地文件。

假设本地的./demo/demo.bc为字节码文件，./demo/demo.abi为abi文件。

字节码:

```js
6060604052341561000f57600080fd5b5b600080819055505b5b60f3806100276000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680638a4068dd146051578063aa8c217c146059578063b69ef8a814607f575b600080fd5b605760a5565b005b3415606357600080fd5b606960b7565b6040518082815260200191505060405180910390f35b3415608957600080fd5b608f60bd565b6040518082815260200191505060405180910390f35b3460008082825401925050819055505b565b60005481565b6000805490505b905600a165627a7a7230582008fe16294f8095fa1b7b3c98d8ee5ace307dcfbd3d38b3de2463c026567c84d30029
```

abi:

```js
[
	{
		"constant": false,
		"inputs": [],
		"name": "transfer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "amount",
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
		"inputs": [],
		"name": "balance",
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]
```


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
+         contractAddr = nch1zmpvdp4f65shmj0eqg38shu4wexqzfugr6uhar           +
+                                                                             +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
```

如上，其中 ```nch1zmpvdp4f65shmj0eqg38shu4wexqzfugr6uhar``` 即新部署的合约地址。


查询合约代码

```bash
nchcli query vm code nch1zmpvdp4f65shmj0eqg38shu4wexqzfugr6uhar
```

## 调用智能合约

调用智能合约，需要使用abi文件。 假设合约对应的abi文件已经保存至./demo/demo.abi 。

```bash
nchcli vm call --contract_addr nch1zmpvdp4f65shmj0eqg38shu4wexqzfugr6uhar \
--abi_file ./demo/demo.abi --method transfer \
--args  "" --amount 1000000pnch \
--from $(nchcli keys show -a alice)
```

上述命令行调用合约，向合约发送了1000000pnch。 查询合约账户余额：

```bash
nchcli q account nch1zmpvdp4f65shmj0eqg38shu4wexqzfugr6uhar
```
