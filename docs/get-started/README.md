<<<<<<< HEAD
# How to Install

## 1. Modify Configurations

Configuration items marked as 'Must modify' must be modified

### 1.1. nch.config

``` shell
# chain_id, just use default value
chain_id=nch-alphanet

# Must modify, node_moniker is your nch node name
node_moniker=test

# Must modify, the name of your validator, this will be showed in nch explorer: https://explorer.netcloth.org/validators
validator_moniker=test

# The local account name is used to associate a pair of public and private key pairs when creating an account. It is required to enter a password to protect the public and private key pairs corresponding to the account. Warning: Please save the mnemonic printed on the screen during the installation process.
nch_account_name=test
```

### 1.2. ipal.config

``` shell
# Must modify, the ipal service name which can query by url: http://rpc.netcloth.org/ipal/list, should be represent your organization
ipal_moniker=test

# Must modify
ipal_website=test

# Must modify
ipal_details=test

# Must modify, Only need to modify the ip address after '1|', it must start with http://, The ip address points to the server where the chat server program is installed.
ipal_endpoints="1|http://192.168.100.1"
```

## 2. Inatall

The installation process requires four passwords. The first and second passwords are used to create a local account. The two entries are made to ensure the correctness of the password input. The third time is to sign the transaction when the validator is created, and the fourth time to sign the transaction when the ipal service is created.

During the installation process, the blockchain node will be started and synchronized to the latest block. A corresponding progress bar will be displayed on the screen. Please wait for the installation script to complete and do not terminate the installation process.

``` shell
bash main.sh
```
=======
## 快速开始

### 区块链操作

* [如何加入内测网](how-to-join-alphanet.md)
* [申领内测token](testcoin.md)
* [如何创建验证人](how-to-become-validator.md)
* [如何抵押和委托](how-to-delegate.md)
* [如何发起提案](how-to-create-proposal.md)

### IPAL操作
* [IPAL操作文档](../advanced/ipal.md)
* [IPAL API](../advanced/api.md)
  
### 即时通讯服务部署
* [即时通讯服务部署](../im/README.md)
>>>>>>> 0287f6f131a15bcae1d26cd39bbc16490bcf5e40
