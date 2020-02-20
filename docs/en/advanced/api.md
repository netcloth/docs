
# IPAL API

## REST APIs

 After ```nchcli``` rest-server is enabled, You can see all the REST APIs from ```http://localhost:1317/swagger-ui/```  

* Get the latest block

```shell
curl http://rpc.netcloth.org/blocks/latest
```

* Get block by height

```shell
curl http://rpc.netcloth.org/blocks/{height}
```

* Broadcast transaction
  
```shell
curl -X POST "http://rpc.netcloth.org/txs" -H "accept: application/json" -H "Content-Type: application/json" -d "{transaction msg}"
```

### IPAL API

* Register ipal node with command line

``` shell
# This command creates an account interactively. The private key is encrypted with a password.
nchcli keys add <key name>

# Transfer
nchcli send --from $(nchcli keys show <key name2> -a) --to $(nchcli keys show <key name> -a) --amount 2000000pnch

# Register the service node on the blockchain. For the meaning of each parameter, please execute nchcli aipal cliam -h
nchcli ipal claim --from=$(nchcli keys show <key name> -a) --moniker=<node name>  --website=<website>--details="nch up" --endpoints "1|192.168.1.100:02" --bond=1000000pnch
```

* Query service node list

 ``` shell
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

``` shell
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


``` shell
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

``` shell
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
