
# API Reference

## REST APIs

 After ```nchcli``` rest-server is enabled, You can see all the REST APIs from ```http://localhost:1317/swagger-ui/```  

* Get the latest block

```bash
curl http://rpc.netcloth.org/blocks/latest
```

* Get block by height

```bash
curl http://rpc.netcloth.org/blocks/{height}
```

* Broadcast transaction
  
```bash
curl -X POST "http://rpc.netcloth.org/txs" -H "accept: application/json" -H "Content-Type: application/json" -d "{transaction msg}"
```

* Get account info and balance

request:

```bash
curl http://rpc.netcloth.org/auth/accounts/{address}
```

response:

```json
{
  "height": "141896",
  "result": {
    "type": "nch/Account",
    "value": {
      "address": "nch17kfmq49p6vth0y83t4dwlpurdy70wgampcevhx",
      "coins": [
        {
          "denom": "pnch",
          "amount": "2326727347579935"
        }
      ],
      "public_key": {
        "type": "tendermint/PubKeySecp256k1",
        "value": "Ap5sCPzuGm2nWmfFdm+9vTpcIj7u7ReNo4yQpvlVSlYm"
      },
      "account_number": "15",
      "sequence": "19",
      "code_hash": ""
    }
  }
}
```



### IPAL API

* Register ipal node with command line

```bash
# This command creates an account interactively. The private key is encrypted with a password.
nchcli keys add <key name>

# Transfer
nchcli send --from $(nchcli keys show <key name2> -a) --to $(nchcli keys show <key name> -a) --amount 2000000pnch

# Register the service node on the blockchain. For the meaning of each parameter, please execute nchcli aipal cliam -h
nchcli ipal claim --from=$(nchcli keys show <key name> -a) --moniker=<node name>  --website=<website>--details="nch up" --endpoints "1|192.168.1.100:02" --bond=1000000pnch
```

* Query service node list

 ```bash
curl http://rpc.netcloth.org/ipal/list

response:
{
  "height": "66",
  "result": [
    {
      "operator_address": "nch1njcjlsgd59gnjhz3yy0u6sqntcelexdahggnsr",
      "moniker": "ipaltest",
      "website": "sky.com",
      "details": "nch up",
      "endpoints": [
        {
          "type": "1",
          "endpoint": "192.168.1.100:02"
        }
      ],
      "bond": {
        "denom": "pnch",
        "amount": "1000000"
      }
    }
  ]
}
```

* Querying IPAL by Address

```bash
curl http://rpc.netcloth.org/ipal/node/{addr}

e.g.
curl http://rpc.netcloth.org/ipal/node/nch19uspwrym4wr366teytlu4hre9rs7afsf33dgcy

{
  "height": "10005",
  "result": {
    "operator_address": "nch19uspwrym4wr366teytlu4hre9rs7afsf33dgcy",
    "moniker": "aipaltest",
    "website": "sky.com",
    "details": "nch up",
    "endpoints": [
      {
        "type": "1",
        "endpoint": "192.168.1.100:02"
      }
    ],
    "bond": {
      "denom": "pnch",
      "amount": "1400000"
    }
  }
}
```

### CIPAL API

* Querying CIPAL by Address

```bash
curl http://rpc.netcloth.org/cipal/query/{addr}

e.g. Already registered
curl http://rpc.netcloth.org/cipal/query/nch12zsau56la368qs23f6nmn2kfe6er6d5gue7u7g

{
  "height": "480",
  "result": {
    "user_address": "nch12zsau56la368qs23f6nmn2kfe6er6d5gue7u7g",
    "service_infos": [
      {
        "type": "1",
        "address": "nch1f94fzxp6hthrx3gzy4dmj6ccwh2xljuyzlwj8t"
      }
    ]
  }
}

e.g. unregistered
http://rpc.netcloth.org/cipal/query/nch1a6hy8k6hscffcjgpggjs9dru4x4g58znj6pn0z

{
  "height": "446",
  "result": null
}
```

### Query transaction by transaction hash

```bash
curl http://rpc.netcloth.org/txs/{tx_hash}

e.g.
curl http://rpc.netcloth.org/txs/779C97E3882E14FD13407E78C49C2BA343FC5F55BAA2C912B8D8216C1EE269E7

{
  "height": "9845",
  "txhash": "779C97E3882E14FD13407E78C49C2BA343FC5F55BAA2C912B8D8216C1EE269E7",
  "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\"}]",
  "logs": [
    {
      "msg_index": 0,
      "success": true,
      "log": ""
    }
  ],
  "gas_wanted": "200000",
  "gas_used": "14895",
  "events": [
    {
      "type": "message",
      "attributes": [
        {
          "key": "action",
          "value": "ipal_claim"
        },
        {
          "key": "module",
          "value": "ipal"
        }
      ]
    }
  ],
  "tx": {
    "type": "nch/StdTx",
    "value": {
      "msg": [
        {
          "type": "nch/IPALClaim",
          "value": {
            "from": "nch1dtpryue8ptzjjm32fwr0a7u5qg6wz02hhnpa30",
            "user_request": {
              "params": {
                "user_address": "nch1dtpryue8ptzjjm32fwr0a7u5qg6wz02hhnpa30",
                "server_ip": "192.168.1.111",
                "expiration": "2019-11-06T03:33:44.638974Z"
              },
              "signature": {
                "pub_key": {
                  "type": "tendermint/PubKeySecp256k1",
                  "value": "A2SqRJVreon6ihBFDSYX2b0JZG7dKf6Ss3cRW4NVopVi"
                },
                "signature": "f4OE31p418i6+7RLuuvMn6Vkp4hsC/42R78f/ePPOEgzpXcdNVOQ3tTZcY1YVtqi2cKLWwThY733H2lOjagkwA=="
              }
            }
          }
        }
      ],
      "fee": {
        "amount": [],
        "gas": "200000"
      },
      "signatures": [
        {
          "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "A2SqRJVreon6ihBFDSYX2b0JZG7dKf6Ss3cRW4NVopVi"
          },
          "signature": "QrcehQVCOot64tCy3pRe/tFHc4d72IHAkzw4+Qs62oIux5a7Ul0THXVmjtNmMqek8Soh+xudEiomWwaDkUWeaA=="
        }
      ],
      "memo": ""
    }
  },
  "timestamp": "2019-11-05T03:33:47Z"
}
```

## Smart Contract API

### Query Contract code

request:

```bash
curl http://localhost:1317/vm/code/nch19lhydp6k59c66x2vp3h4ua8r8535uh6dlmex6y
```

response:

```json
{
  "height": "1460",
  "result": "608060405234801561001057600080fd5b50600436106100a95760003560e01c80636b520757116100715780636b5207571461016e5780639cc7f7081461018c578063a17a9e66146101ce578063aef52a2c14610210578063cc445d4e1461022e578063dac0eb071461025c576100a9565b80631e1ed70b146100ae578063300308ba146100e65780633033413b146100f05780634903b0d11461010e5780635d33a27f14610150575b600080fd5b6100e4600480360360408110156100c457600080fd5b81019080803590602001909291908035906020019092919050505061028a565b005b6100ee6102a6565b005b6100f86102b0565b6040518082815260200191505060405180910390f35b61013a6004803603602081101561012457600080fd5b81019080803590602001909291905050506102b6565b6040518082815260200191505060405180910390f35b6101586102ce565b6040518082815260200191505060405180910390f35b6101766102d4565b6040518082815260200191505060405180910390f35b6101b8600480360360208110156101a257600080fd5b81019080803590602001909291905050506102dd565b6040518082815260200191505060405180910390f35b6101fa600480360360208110156101e457600080fd5b81019080803590602001909291905050506102fa565b6040518082815260200191505060405180910390f35b610218610315565b6040518082815260200191505060405180910390f35b61025a6004803603602081101561024457600080fd5b810190808035906020019092919050505061031b565b005b6102886004803603602081101561027257600080fd5b8101908080359060200190929190505050610329565b005b8060036000848152602001908152602001600020819055505050565b6064600081905550565b60005481565b60036020528060005260406000206000915090505481565b60015481565b60008054905090565b600060036000838152602001908152602001600020549050919050565b60008160008082825401925050819055506000549050919050565b60025481565b806001540160008190555050565b60016002540160028190555061033e816102fa565b6001600082825401925050819055505056fea26469706673582212207339ae9e785d6abe064a41bdebda6eb72d116c63a4382c77d452d75c3a7f4fa664736f6c63430006000033"
}
```

### Estimate Tx fees/Call method of Contracts

To acquire gas cost of executing contracts and the call method of contract by ```estimate_gas``` API. The ```gas``` returned is only estimated. To avoid the error "out of gas" while excuting the contract. We recommend you to set a larger number of gas limit. 

#### Create a Contract

To estimate the gas cost, you need to post a sturcture messages as following:

```json
{
	"from": "nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e",
	"to": "",
	"payload": "608060405234801561001057600080fd5b506509184e72a0006000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610344806100696000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029",
	"amount": {
		"denom": "pnch",
		"amount": "0"
	}
}
```

```from``` is the contract address which sent a Transaction.
```to``` is empty.
```Payload``` is contract codes converted to Hexadecimal form.
```Amount``` is the number of assets sent to contracts.

You can create a payload via ```nchcli```. The following is a Tx message of creating a contract without signature.

```bash
nchcli vm create --code_file=./demo/demo.bc \
--from $(nchcli keys show -a alice) --amount=0pnch \
--gas=1000000 --generate-only
```


request:

```bash
curl -X POST localhost:1317/vm/estimate_gas -d '
{
	"from": "nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e",
	"to": "",
	"payload": "608060405234801561001057600080fd5b506509184e72a0006000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610344806100696000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029",
	"amount": {
		"denom": "pnch",
		"amount": "0"
	}
}'
```

response:

```json
{
  "height": "473",
  "result": {
    "Gas": "240517",
    "Res": "608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029"
  }
}

# Gas is estimated gas cost,not real cost.
# Res is return of call methods.
```

#### Call contracts

You need to create payload according to the abi of call methods. You can refer to function of GetCmdQueryCallFee in https://github.com/netcloth/netcloth-chain/blob/develop/modules/vm/client/cli/query.go 

request:
```bash
curl -X POST localhost:1317/vm/estimate_gas -d '
{
	"from": "nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e",
	"to": "nch1k2npq7lgmha23wy7e2swu2hqwta3fpt6agk47h",
	"payload": "70a082310000000000000000000000000000000000000000000000000000000000000000",
	"amount": {
		"denom": "pnch",
		"amount": "1000000"
	}
}'
```

response:

```json
{
  "height": "298",
  "result": {
    "Gas": "14924",
    "Res": "0000000000000000000000000000000000000000000000000000000000000001"
  }
}

# Gas is estimated gas cost,not real cost.
# Res is return of call methods.
```

You can create ```post_data``` and ```payload``` via nchcli. Click [here](../contracts/contract.md#How-to-call-smart-contract).