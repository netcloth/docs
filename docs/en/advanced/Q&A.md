
# FAQ
## Concept

### 1.Transaction Fees

creating a transaction in the NetCloth network requires paying a certain transaction fees.

Transaction fees = Gas * GasPrice, where Gas represents the actual amount of Gas consumed in the transaction, and GasPrice is the unit Gas price. The amount of Gas actually needed for a transaction represents how much resources the network needs to execute the transaction, mainly referring to the consumption of computing and storage operations. The GasPrice is specified by the user, and the validator node can autonomously configure the minimum-gas-prices that it can accept (the default is 1000.0pnch).

When using the ```nchcli``` command line to send transactions, you can use```---gas``` to specify the gas limit of the transaction. If the actual consumption of the transaction exceeds the gas limit specified by the user, the transaction will fail. The Tx fee is not refundable. You can use ```--gas-prices``` to specify the GasPrice of the transaction. If the GasPrice is lower than the minimus-gas-prices acceptable to validators in the network, the transaction will be discarded and not be verified.

Tips: When setting ```--gas-prices```, remember enter at least one decimal (up to 12 digits). (e.g 1000.0, 1100.0). 
A Integer is invalid when setting ```--gas-prices```.

How to send a Tx? [Click here](../software/nchcli.md)

### About NCH token

NCH is a token in the NetCloth network. The minimum unit is pnch. The conversion relationship is as follows:

```javascript
1 NCH = 10^12 pnch
```

## Node operation and maintenance

### How to stop the node program

**To stop the background program, you can execute the following command**

```bash
# Stop nchd
kill -9 $(pgrep nchd)

# Stop nchcli
kill -9 $(pgrep nchcli)
```

### How to restart the node program

```bash
kill -9 $(pgrep nchd)
kill -9 $(pgrep nchcli)

nohup nchd start 1>nchd.out 2>&1 &
nohup nchcli rest-server 1>cli.out 2>&1 &
```

### How to backup validator nodes

It is recommended to backup the```<your_custom_path>/.nchd/config``` directory, where ```priv_validator_key.json``` in the ```config``` directory is the private key of the validator node.

### Query account does not exist

When executing the command ```nchcli q account <address>```， it returns  ```ERROR: account xxx does not exist```

**reason：**

1. The newly created account locally with balance 0, it is an offline account, and does not exist on the chain。

2. The newly created account locally with balance not 0, it may be that the local node has not been synchronized to the latest block. Your can query it after synchronizing to the latest block.
