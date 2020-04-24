# nchcli command line tool

The nchcli command line tool is mainly used for key management, sending transactions and querying data on the blockchain network.

## Query

### Query node status
```bash
nchcli status
```

### Query balances
```bash
nchcli query account [address]
```

### Query transactions by txHash
```bash
nchcli query tx [hash]
```

### Query validator lists
```bash
nchcli query staking validators
```

### Query IPAL Lists
```bash
nchcli query ipal list
```

## Transactions

### Transfer
```bash
nchcli send --from <key name> --to=<account address> --chain-id=<chain-id> --amount=<amount>pnch --gas=200000 --gas-prices=1000.0pnch

```

Tips: If the transfer does not include the `--gas-prices` parameter, the default gasprices is 1000.0pnch. If you manually specify the gasprices, you need to bring at least one decimal (up to 12 digits)

For more details on Tx fees, [click here](../advanced/Q&A.md)


## Validators

### Create a validator
How to Create a validator, refer to [here](../get-started/how-to-become-validator.md)

### Modify a validator

To change parameters of the validator. (e.g. Commission,moniker,website,detail,etc.)

```bash
Usage:
nchcli tx staking edit-validator [flags]

Example:
nchcli tx staking edit-validator \
--commission-rate=<commission-rate> \
--identity=<identity> \
--moniker=<moniker> \
--node=<node public ip> \
--website=<webisite> \
--details=<details> 
```

### Delegate to validators
```bash
#Example:
nchcli tx staking delegate nchvaloper1l2rsakp388kuv9k8qzq6lrm9taddae7fpx59wm <amount>pnch --from <mykey> --gas=200000 --gas-prices=1000.0pnch

#Usage:
nchcli tx staking delegate [validator-addr] [amount] [flags]
```
### Withdraw your staking

Withdraw a part of shares you delegated to validators

```bash
#Usage:
nchcli tx staking unbond [validator-addr] [amount] [flags]

#Example:
nchcli tx staking unbond nchvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj 100pnch --from mykey
```

### WIthdraw your rewards

Withdraw your rewards from a specific validator. If you are a validator,you can withdraw both rewards and commissions.

```bash
#Example:
nchcli tx distr withdraw-rewards nchvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj --from mykey


# Withdraw rewards and commissions If you are a validator
nchcli tx distr withdraw-rewards nchvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj --from mykey --commission
```

### Withdraw all rewards

```bash
#Usage:
nchcli tx distribution withdraw-all-rewards [flags]

#Example:
nchcli tx distr withdraw-all-rewards --from mykey
```

### Unjail the validator

You can unjail a validator with the command ``` unjail``` after the validator is jailed.

```bash
#Usage:
nchcli tx slashing unjail [flags]

#Example:
nchcli tx slashing unjail --from mykey
```

## Wallet key management

### Create a new address
```bash
nchcli keys add <name> [flags]
```

### List Keys

```bash
nchcli keys list
```

### Show key info

```bash
nchcli keys show <name> [flags]
```

### Export keys
```bash
nchcli keys export <name> [flags]
```

### Import keys
```bash
nchcli keys import <name> <keyfile> [flags]
```
