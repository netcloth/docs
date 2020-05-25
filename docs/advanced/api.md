
# REST API

```nchcli``` 开启rest-server后，浏览器访问 ```http://127.0.0.1:1317/swagger-ui/``` 可以看到所有的REST APIs

```bash
# 开启 rest-server
nchcli rest-server --node=http://127.0.0.1:26657
```

## 常用 API

### 查询节点信息

request：

```bash
curl http://127.0.0.1:1317/node_info
```

response：

```json
{
  "node_info": {
    "protocol_version": {
      "p2p": "7",
      "block": "10",
      "app": "0"
    },
    "id": "32d9a41f23c27d7e7b51b6ab7f6d30ba53319e31",
    "listen_addr": "tcp://0.0.0.0:26656",
    "network": "nch-chain", // chain id
    "version": "0.32.8",
    "channels": "4020212223303800",
    "moniker": "local-nch", 
    "other": {
      "tx_index": "on",
      "rpc_address": "tcp://127.0.0.1:26657"
    }
  },
  "application_version": {
    "name": "nch",
    "server_name": "nchd",
    "client_name": "nchcli",
    "version": "1.0.11-192-gfa5a542",
    "commit": "fa5a542a4af5493d45c3934a3c6e8e41cb724c98",
    "build_tags": "netgo",
    "go": "go version go1.13.5 darwin/amd64"
  }
}
```

### 查询节点同步状态

request:

```bash
curl http://127.0.0.1:1317/syncing
```

response:

```json
{
  "syncing": false   // true表示节点正在追赶最新区块，false表示节点已经处于最新区块状态
}
```

### 获取最新区块

request:

```bash
curl http://rpc.netcloth.org/blocks/latest
```

response:

```json
{
  "block_meta": {
    "block_id": {
      "hash": "D1DCF02C7BEB781E532BF02E5964EB2B13FFF6C334DDD3FC9F0320CF5293DEFB",
      "parts": {
        "total": "1",
        "hash": "E7233052B3DE6B99677FF48EC5B610D4D288ED5F65D2CFC14B96388441DA190D"
      }
    },
    "header": {
      "version": {
        "block": "10",
        "app": "0"
      },
      "chain_id": "nch-chain", // chain id
      "height": "964",  // 区块高度
      "time": "2020-01-08T06:48:04.491292Z", // 区块时间
      "num_txs": "0",
      "total_txs": "6",
      "last_block_id": {
        "hash": "787390598CF683E7B1AE1E438AAD286D436F52F06C79AC459C4375E6C14628BE",
        "parts": {
          "total": "1",
          "hash": "83E6CD2DB4FCE014E38CF1BEAA3746A2A7F9D92A8093BBD9B3FF14BB78A10E32"
        }
      },
      "last_commit_hash": "6991E025A3AF65D7D444E354EAA6AD6F2454E93D9D029602D659E15928BF11F5",
      "data_hash": "",
      "validators_hash": "C414E30D196E83F711DCB8161748563A1D968EC51C48F3D20141D20FE3657788",
      "next_validators_hash": "C414E30D196E83F711DCB8161748563A1D968EC51C48F3D20141D20FE3657788",
      "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
      "app_hash": "1146068A69F9F0FC77B2BDD121A445D25705059F2F8A68D4E4688B5B9D8D0AD9",
      "last_results_hash": "",
      "evidence_hash": "",
      "proposer_address": "A8FDB9C6D29B83E04EF9990107799BB598DBF3EE"
    }
  },
  "block": {
    "header": {
      "version": {
        "block": "10",
        "app": "0"
      },
      "chain_id": "nch-chain",
      "height": "964",
      "time": "2020-01-08T06:48:04.491292Z",
      "num_txs": "0",
      "total_txs": "6",
      "last_block_id": {
        "hash": "787390598CF683E7B1AE1E438AAD286D436F52F06C79AC459C4375E6C14628BE",
        "parts": {
          "total": "1",
          "hash": "83E6CD2DB4FCE014E38CF1BEAA3746A2A7F9D92A8093BBD9B3FF14BB78A10E32"
        }
      },
      "last_commit_hash": "6991E025A3AF65D7D444E354EAA6AD6F2454E93D9D029602D659E15928BF11F5",
      "data_hash": "",
      "validators_hash": "C414E30D196E83F711DCB8161748563A1D968EC51C48F3D20141D20FE3657788",
      "next_validators_hash": "C414E30D196E83F711DCB8161748563A1D968EC51C48F3D20141D20FE3657788",
      "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
      "app_hash": "1146068A69F9F0FC77B2BDD121A445D25705059F2F8A68D4E4688B5B9D8D0AD9",
      "last_results_hash": "",
      "evidence_hash": "",
      "proposer_address": "A8FDB9C6D29B83E04EF9990107799BB598DBF3EE"
    },
    "data": {
      "txs": null
    },
    "evidence": {
      "evidence": null
    },
    "last_commit": {
      "block_id": {
        "hash": "787390598CF683E7B1AE1E438AAD286D436F52F06C79AC459C4375E6C14628BE",
        "parts": {
          "total": "1",
          "hash": "83E6CD2DB4FCE014E38CF1BEAA3746A2A7F9D92A8093BBD9B3FF14BB78A10E32"
        }
      },
      "precommits": [
        {
          "type": 2,
          "height": "963",
          "round": "0",
          "block_id": {
            "hash": "787390598CF683E7B1AE1E438AAD286D436F52F06C79AC459C4375E6C14628BE",
            "parts": {
              "total": "1",
              "hash": "83E6CD2DB4FCE014E38CF1BEAA3746A2A7F9D92A8093BBD9B3FF14BB78A10E32"
            }
          },
          "timestamp": "2020-01-08T06:48:04.491292Z",
          "validator_address": "A8FDB9C6D29B83E04EF9990107799BB598DBF3EE",
          "validator_index": "0",
          "signature": "utrPds1hjv5VBpfJZzZu0B4Rmz44AnWLgI4X63slekly+Z+qwuziC//rmtIUvhDAsD4A1bfMN2EgjVk/wOv4Cg=="
        }
      ]
    }
  }
}
```

### 查询指定高度的区块

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| height | int | 指定区块高度 |

request:

```bash
curl http://rpc.netcloth.org/blocks/{height}
```

response 同上

### 查询帐户信息及余额

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 帐户地址 |

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

### 查询账户余额

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 帐户地址 |

request:

```bash
curl http://127.0.0.1:1317/bank/balances/{address}
```

response:

```json
{
  "height": "298106",
  "result": [
    {
      "denom": "pnch", // 资产名字
      "amount": "4326724505525934" // 资产数量 1 nch = 10 ^12 pnch
    }
  ]
}
```

### 查询最新的活跃验证人集合

查询当前参与共识的前100名验证人集合：

request:

```bash
curl http://127.0.0.1:1317/validatorsets/latest
```

response:

```json
{
  "height": "0",
  "result": {
    "block_height": "959100",
    "validators": [
      {
        "address": "nchvalcons1zu8m6mmt53n4pr5twwlmw2c5lasv9w5yqx3vvr", // 验证人地址
        "pub_key": "nchvalconspub1zcjduepqdkjkn8kt4wtwd3j6mtl4rxxjp0al353hdrfne66rsmcpd2q837xq5nnfjp", // 验证人公钥
        "proposer_priority": "13325070",
        "voting_power": "10000000" // 投票权
      },
      {
        "address": "nchvalcons1t5gu4fg6jm3zxr2ytw5k6azj3rflx399eztgv3",
        "pub_key": "nchvalconspub1zcjduepqmuwh6n4z00c30njm7935hwl3vqzrdkrzw48fjkdlhxgkhh4s6p8qupd7au",
        "proposer_priority": "5587140",
        "voting_power": "10"
      },
      {
        "address": "nchvalcons16qd3q96uzau9lzup9gtl0g5e3py8t5q0z0m4gr",
        "pub_key": "nchvalconspub1zcjduepqnnex0jl2whugnzmr84kytykykqjd0807ncjqdkqkhkkyr7g0e7fspcfqn6",
        "proposer_priority": "4114340",
        "voting_power": "9902960"
      },
      {
        "address": "nchvalcons1m88754ad97scehy6kkjqa5d6pws88fpxfegzft",
        "pub_key": "nchvalconspub1zcjduepq36m84fazfs0q8rc7mj4xy5zw7psmxtrefpagy40y0nmx45px98cqwchwh2",
        "proposer_priority": "-19693618",
        "voting_power": "5498351"
      },
      {
        "address": "nchvalcons1mf5czylhw3zcv4nhhnd0xrtwn2ah0mvasr4f0k",
        "pub_key": "nchvalconspub1zcjduepqjgta0rptwln6jz0rz4kw6cnhcm5g4wr9epm9spkcertkq5ty88nqe329lx",
        "proposer_priority": "-3332930",
        "voting_power": "10000000"
      }
    ]
  }
}
```

### 查询token供应量

查询NCH供应量

```bash
curl http://127.0.0.1:1317/supply/total
```

response:

```json
{
  "height": "298035",
  "result": [
    {
      "denom": "pnch",
      "amount": "53305160738079199885"
    }
  ]
}
```

其中 ```1 NCH = 10 ^ 12 pnch```

### 通过交易hash查询交易

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| txhash | string | 交易hash |

request:

```bash
curl http://127.0.0.1:1317/txs/{txhash}
```

response:

```json
{
  "height": "959150",
  "txhash": "5E53D158DF0B117B2ED07211F8ADA27369A47C3341EF34B1F96070E0F681BF78",
  "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\"}]",
  "logs": [
    {
      "msg_index": 0,
      "success": true,
      "log": ""
    }
  ],
  "gas_wanted": "200000",
  "gas_used": "40551",
  "events": [
    {
      "type": "message",
      "attributes": [
        {
          "key": "action",
          "value": "send"
        },
        {
          "key": "sender",
          "value": "nch1qnazcenn7v5rdq02grglquc5kd3y4dh985rau4"
        },
        {
          "key": "module",
          "value": "bank"
        }
      ]
    },
    {
      "type": "transfer",
      "attributes": [
        {
          "key": "recipient",
          "value": "nch19vnsnnseazkyuxgkt0098gqgvfx0wxmv96479m"
        },
        {
          "key": "amount",
          "value": "20000000pnch"
        }
      ]
    }
  ],
  "tx": {
    "type": "nch/StdTx",
    "value": {
      "msg": [
        {
          "type": "nch/MsgSend",
          "value": {
            "from_address": "nch1qnazcenn7v5rdq02grglquc5kd3y4dh985rau4",
            "to_address": "nch19vnsnnseazkyuxgkt0098gqgvfx0wxmv96479m",
            "amount": [
              {
                "denom": "pnch",
                "amount": "20000000"
              }
            ]
          }
        }
      ],
      "fee": {
        "amount": [
          {
            "denom": "pnch",
            "amount": "200"
          }
        ],
        "gas": "200000"
      },
      "signatures": [
        {
          "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "A41jr9C+YQtzn3YxgYcB6/V9SeViUSyg1SI7TMFV+cSJ"
          },
          "signature": "hmYV0VQy38yQ2odp83g7Zq+tMicvnYgP7Uy2SnXoUGd/iFugdMwSc5+azWkKkkVQxrWdBy0n8Bn3iAvc0bR/ig=="
        }
      ],
      "memo": "for test"
    }
  },
  "timestamp": "2020-01-08T07:00:45Z"
}
```

### 广播交易
  
```bash
curl -X POST "http://127.0.0.1:1317/txs" -H "accept: application/json" -H "Content-Type: application/json" -d "{transaction msg}"
```

示例：

```bash
curl -X POST "http://127.0.0.1:1317/txs" \
         -H "accept: application/json" \
         -H "Content-Type: application/json" \
         -d \
'{
	"tx": {
		"msg": [{
			"type": "nch/MsgSend",
			"value": {
				"from_address": "nch12dmr99v3eh39f97jnh5ga32ny2ddzznppumf2h",
				"to_address": "nch12vgxe8qgdnuqlvnvyskua2rssxpqg4yyldrqep",
				"amount": [{
					"denom": "pnch",
					"amount": "1"
				}]
			}
		}],
		"fee": {
			"amount": [{
				"denom": "pnch",
				"amount": "200000000"
			}],
			"gas": "200000"
		},
		"memo": "",
		"signatures": [{
			"pub_key": {
				"type": "tendermint/PubKeySecp256k1",
				"value": "ArvclYKGJIYgkp4qSpyE/gOE9QK/vBpXOPd84DGaE0TQ"
			},
			"signature": "LICy6QaeQ5Sb2LWyyT8ZzSI0NaVBjgHBlmJv10kGeygJLyYNKvA/yPpk/RwmK9cnQ1kmr/H4qa1lJRpxqeGhEw=="
		}]
	},
	"mode": "block"
}'

```

其中mode有三种：

* **block**: 交易被确认后返回,平均需等待2.5秒
* **sync**: 交易在当前节点通过后返回
* **async**: 立即返回,不对交易进行任何处理
  
## mint API

### 查询模块参数

```bash
curl http://127.0.0.1:1317/minting/parameters
```

response:

```json
{
  "height": "220423",
  "result": {
    "mint_denom": "pnch", 
    "inflation_rate_change": "0.100000000000000000", // 通胀变化率
    "inflation_max": "0.200000000000000000", // 通胀率上限
    "inflation_min": "0.100000000000000000", // 通胀率下限
    "goal_bonded": "0.670000000000000000",  // 目标质押率
    "blocks_per_year": "6311520" // 每年产生的区块数量
  }
}
```

其中```inflation_min``` 和```inflation_rate_change```之和为staking预期收益率。

### 查询通胀率

```bash
curl http://127.0.0.1:1317/minting/inflation
```

response:

```json
{
  "height": "220447",
  "result": "0.133387934377043585"  // 通胀率13.3%
}
```

### 查询年供应量

```bash
curl http://127.0.0.1:1317/minting/annual-provisions
```

response:

```json
{
  "height": "220468",
  "result": "13400328832956503440.019644248096678283" // nch年供应总量 1 nch = 10 ^ 12 pnch
}
```

## staking 相关

### 查询staking全局参数

```bash
curl http://127.0.0.1:1317/staking/parameters
```

response:

```json
{
  "height": "297709",
  "result": {
    "unbonding_time": "1209600000000000", // 解除绑定需要的时间，单位为秒
    "max_validators": 100,  // 当前验证人最大数量
    "max_validators_extending": 300, // 验证人数量上限
    "max_validators_extending_speed": 10, // 每年增加的验证人数量
    "next_extending_time": "1617657186", //  下一次增加验证人的时间
    "max_entries": 7,
    "bond_denom": "pnch",
    "max_lever": "20.000000000000000000" // 验证人质押最大杠杆率
  }
}
```

### 查询staking pool

```bash
curl http://127.0.0.1:1317/staking/pool
```

response:

```json
{
  "height": "220583",
  "result": {
    "not_bonded_tokens": "999900000000000", // staking pool中未质押的token数量
    "bonded_tokens": "2076999996642029000" // staking pool中总质押的token数量
  }
}
```

### 查询指定地址的所有委托信息

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 账户地址 |

以地址```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e``` 为例

```bash
# curl http://127.0.0.1:1317/staking/delegators/{address}/delegations

curl http://127.0.0.1:1317/staking/delegators/nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e/delegations
```

response:

```json
{
  "height": "297516",
  "result": [
    {
      "delegator_address": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e",// 质押者地址
      "validator_address": "nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4",// 验证人地址
      "shares": "1000000000000000000.000000000000000000",// 质押所得的股份
      "balance": "1000000000000000000" // 余额
    },
    {
      "delegator_address": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e",
      "validator_address": "nchvaloper1ngm3k874204rwz23m46wqhlv8w9vyjtd9yqm7x",
      "shares": "200000000000.000000000000000000",
      "balance": "200000000000"
    }
  ]
}
```

其中```balance```字段即委托的pnch资产数量。

### 查询正在解除委托的信息

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 账户地址 |

以地址```nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e``` 为例

```bash
# curl http://127.0.0.1:1317/staking/delegators/{address}/unbonding_delegations
curl http://127.0.0.1:1317/staking/delegators/nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e/unbonding_delegations
```

response:

```json
{
  "height": "297565",
  "result": [
    {
      "delegator_address": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e",// 质押者地址
      "validator_address": "nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4",// 验证人地址
      "entries": [
        {
          "creation_height": "297562",// 质押所在高度
          "completion_time": "2020-05-08T02:21:26.09861357Z",// 质押在该时间后可到账
          "initial_balance": "100",
          "balance": "100"
        },
        {
          "creation_height": "297565",
          "completion_time": "2020-05-08T02:21:42.274943985Z",
          "initial_balance": "1000",
          "balance": "1000"
        }
      ]
    }
  ]
}
```

### 查询指定地址相关的staking交易

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 账户地址 |

request:

```bash
# curl http://127.0.0.1:1317/staking/delegators/{address}/txs

curl http://127.0.0.1:1317/staking/delegators/nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e/txs
```

response:

```json
{
  "height": "0",
  "result": [
    {
      "total_count": "1",
      "count": "1",
      "page_number": "1",
      "page_total": "1",
      "limit": "100",
      "txs": [
        {
          "height": "59510",
          "txhash": "A083C40A4FCB147AA980C657352AB438C556F0819BBDDB92C4CA3FE2004C5E03",
          "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\",\"events\":null}]",
          "logs": [
            {
              "msg_index": 0,
              "success": true,
              "log": "",
              "events": null
            }
          ],
          "gas_wanted": "200000",
          "gas_used": "121812",
          "events": [
            {
              "type": "delegate",
              "attributes": [
                {
                  "key": "validator",
                  "value": "nchvaloper1ngm3k874204rwz23m46wqhlv8w9vyjtd9yqm7x"
                },
                {
                  "key": "amount",
                  "value": "200000000000"
                }
              ]
            },
            {
              "type": "message",
              "attributes": [
                {
                  "key": "action",
                  "value": "delegate"
                },
                {
                  "key": "module",
                  "value": "staking"
                },
                {
                  "key": "sender",
                  "value": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"
                }
              ]
            }
          ],
          "tx": {
            "type": "nch/StdTx",
            "value": {
              "msg": [
                {
                  "type": "nch/MsgDelegate",
                  "value": {
                    "delegator_address": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e",
                    "validator_address": "nchvaloper1ngm3k874204rwz23m46wqhlv8w9vyjtd9yqm7x",
                    "amount": {
                      "denom": "pnch",
                      "amount": "200000000000"
                    }
                  }
                }
              ],
              "fee": {
                "amount": [
                  {
                    "denom": "pnch",
                    "amount": "200000000"
                  }
                ],
                "gas": "200000"
              },
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "Awr8DyzH0jUKExpjigPJHgbBI37yX6opS/GPav9kGEfg"
                  },
                  "signature": "+MUQb82PPhXTJZC+6mnvjviWygmw/IDfrtI7cM1MR7tiKby2Qlxwb5KOfXu/bOaZp3eZp3J/+fZdqdzWETyaRA=="
                }
              ],
              "memo": ""
            }
          },
          "timestamp": "2020-04-09T06:56:47Z"
        }
      ]
    },
    {
      "total_count": "2",
      "count": "2",
      "page_number": "1",
      "page_total": "1",
      "limit": "100",
      "txs": [
        {
          "height": "297562",
          "txhash": "CF307F6AE1965362B14CE6DCDD5F32C60F32DFB2E4F7EC9CCD9206455A0F8D24",
          "data": "0B08A684D3F50510C2F2822F",
          "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\",\"events\":null}]",
          "logs": [
            {
              "msg_index": 0,
              "success": true,
              "log": "",
              "events": null
            }
          ],
          "gas_wanted": "200000",
          "gas_used": "178987",
          "events": [
            {
              "type": "message",
              "attributes": [
                {
                  "key": "action",
                  "value": "begin_unbonding"
                },
                {
                  "key": "sender",
                  "value": "nch1jv65s3grqf6v6jl3dp4t6c9t9rk99cd82tew25"
                },
                {
                  "key": "sender",
                  "value": "nch1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3c05a6u"
                },
                {
                  "key": "module",
                  "value": "staking"
                },
                {
                  "key": "sender",
                  "value": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"
                }
              ]
            },
            {
              "type": "transfer",
              "attributes": [
                {
                  "key": "recipient",
                  "value": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"
                },
                {
                  "key": "amount",
                  "value": "1846536647819945615pnch"
                },
                {
                  "key": "recipient",
                  "value": "nch1tygms3xhhs3yv487phx3dw4a95jn7t7lv0gvvg"
                },
                {
                  "key": "amount",
                  "value": "100pnch"
                }
              ]
            },
            {
              "type": "unbond",
              "attributes": [
                {
                  "key": "validator",
                  "value": "nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4"
                },
                {
                  "key": "amount",
                  "value": "100"
                },
                {
                  "key": "completion_time",
                  "value": "2020-05-08T02:21:26Z"
                }
              ]
            }
          ],
          "tx": {
            "type": "nch/StdTx",
            "value": {
              "msg": [
                {
                  "type": "nch/MsgUndelegate",
                  "value": {
                    "delegator_address": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e",
                    "validator_address": "nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4",
                    "amount": {
                      "denom": "pnch",
                      "amount": "100"
                    }
                  }
                }
              ],
              "fee": {
                "amount": [
                  {
                    "denom": "pnch",
                    "amount": "200000000"
                  }
                ],
                "gas": "200000"
              },
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "Awr8DyzH0jUKExpjigPJHgbBI37yX6opS/GPav9kGEfg"
                  },
                  "signature": "Jaqz7Wp9z9ZIiEpfFVF5pAwgPQy8IxozS6TFtGJgtWhHVqiQQ4hkV8P47hlM3ssczE6FeMiB4wgxQVp7ahE3tA=="
                }
              ],
              "memo": ""
            }
          },
          "timestamp": "2020-04-24T02:21:26Z"
        },
        {
          "height": "297565",
          "txhash": "AB56091DAADAAAB0117B6845851B1EF1D825CA020E108496E35A1B08DF669912",
          "data": "0C08B684D3F50510F19F8D8301",
          "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\",\"events\":null}]",
          "logs": [
            {
              "msg_index": 0,
              "success": true,
              "log": "",
              "events": null
            }
          ],
          "gas_wanted": "200000",
          "gas_used": "182568",
          "events": [
            {
              "type": "message",
              "attributes": [
                {
                  "key": "action",
                  "value": "begin_unbonding"
                },
                {
                  "key": "sender",
                  "value": "nch1jv65s3grqf6v6jl3dp4t6c9t9rk99cd82tew25"
                },
                {
                  "key": "sender",
                  "value": "nch1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3c05a6u"
                },
                {
                  "key": "module",
                  "value": "staking"
                },
                {
                  "key": "sender",
                  "value": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"
                }
              ]
            },
            {
              "type": "transfer",
              "attributes": [
                {
                  "key": "recipient",
                  "value": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"
                },
                {
                  "key": "amount",
                  "value": "18117412891340pnch"
                },
                {
                  "key": "recipient",
                  "value": "nch1tygms3xhhs3yv487phx3dw4a95jn7t7lv0gvvg"
                },
                {
                  "key": "amount",
                  "value": "1000pnch"
                }
              ]
            },
            {
              "type": "unbond",
              "attributes": [
                {
                  "key": "validator",
                  "value": "nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4"
                },
                {
                  "key": "amount",
                  "value": "1000"
                },
                {
                  "key": "completion_time",
                  "value": "2020-05-08T02:21:42Z"
                }
              ]
            }
          ],
          "tx": {
            "type": "nch/StdTx",
            "value": {
              "msg": [
                {
                  "type": "nch/MsgUndelegate",
                  "value": {
                    "delegator_address": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e",
                    "validator_address": "nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4",
                    "amount": {
                      "denom": "pnch",
                      "amount": "1000"
                    }
                  }
                }
              ],
              "fee": {
                "amount": [
                  {
                    "denom": "pnch",
                    "amount": "200000000"
                  }
                ],
                "gas": "200000"
              },
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "Awr8DyzH0jUKExpjigPJHgbBI37yX6opS/GPav9kGEfg"
                  },
                  "signature": "sfP13jY6tktUhi7jxsDcI0DhbEJj6s1eL2ihsWvX0pgXw2erM8tX/bKWdBaINZ6+QDJbiwdUUOAKPnZ0OA311Q=="
                }
              ],
              "memo": ""
            }
          },
          "timestamp": "2020-04-24T02:21:42Z"
        }
      ]
    },
    {
      "total_count": "0",
      "count": "0",
      "page_number": "1",
      "page_total": "0",
      "limit": "100",
      "txs": []
    }
  ]
}
```

### 查询指定地址绑定(委托)的所有验证人

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 账户地址 |

request:

```bash
#curl http://127.0.0.1:1317/staking/delegators/{address}/validators


curl http://127.0.0.1:1317/staking/delegators/nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e/validators
```

response:

```json
{
  "height": "297604",
  "result": [
    {
      "operator_address": "nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4",
      "consensus_pubkey": "nchvalconspub1zcjduepqvskj36yf5cfp9rajuze30yexvejvtthkq6za3zpqkc84m0h93lvqvjv4uu",
      "jailed": false,
      "status": 2,
      "tokens": "999999999999998900",// 总token数量
      "delegator_shares": "999999999999998900.000000000000000000", // 总抵押股份数量
      "description": {
        "moniker": "netcloth",
        "identity": "47CB8FD16ABA8CA6",
        "website": "https://www.netcloth.org",
        "details": "Make You and Your Network Unique"
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.100000000000000000"
        },
        "update_time": "2020-04-05T15:13:06.386573523Z"
      },
      "min_self_delegation": "1",
      "self_delegation": "999999999999998900.000000000000000000" // 验证人自抵押数量
    },
    {
      "operator_address": "nchvaloper1ngm3k874204rwz23m46wqhlv8w9vyjtd9yqm7x",
      "consensus_pubkey": "nchvalconspub1zcjduepq6fd5l7nj7j7hqw7latmgmcqkertxsc45et90lam3js49832tzausf866r2",
      "jailed": false,
      "status": 0,
      "tokens": "210000000000",
      "delegator_shares": "210000000000.000000000000000000",
      "description": {
        "moniker": "nova",
        "identity": "",
        "website": "http://111.229.68.141",
        "details": "validator details nova"
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2020-04-08T08:10:55.971059518Z"
      },
      "min_self_delegation": "100",
      "self_delegation": "10000000000.000000000000000000"
    }
  ]
}
```

### 查询指定地址和指定验证的人委托信息

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 账户地址 |
| ValidatorAddress | string | 验证人地址 |

request:

```bash
# curl http://127.0.0.1:1317/staking/delegators/{address}/delegations/{ValidatorAddress}

curl http://127.0.0.1:1317/staking/delegators/nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e/delegations/nchvaloper1ngm3k874204rwz23m46wqhlv8w9vyjtd9yqm7x 
```

response:

```json
{
  "height": "297650",
  "result": {
    "delegator_address": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e",
    "validator_address": "nchvaloper1ngm3k874204rwz23m46wqhlv8w9vyjtd9yqm7x",
    "shares": "200000000000.000000000000000000", // 股份数量
    "balance": "200000000000" // 余额
  }
}
```

### 查询所有的验证人

```bash
curl http://127.0.0.1:1317/staking/validators
```

response:

```json
{
  "height": "297671",
  "result": [
    {
      "operator_address": "nchvaloper1zvweukts45nt3x032jr0ay2yqnlqatu4pmecxv",
      "consensus_pubkey": "nchvalconspub1zcjduepqdcpd5n6gze7hdnmmqnazhu9cdppvv0zgemnup54mhc3wwh5fdesq9lwrns",
      "jailed": false,
      "status": 2,
      "tokens": "504000002202717023",
      "delegator_shares": "504000002202717023.000000000000000000",
      "description": {
        "moniker": "skr",
        "identity": "",
        "website": "",
        "details": "skr"
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2020-04-05T16:24:40.150790125Z"
      },
      "min_self_delegation": "100",
      "self_delegation": "504000002202717023.000000000000000000"
    },
    {
      "operator_address": "nchvaloper1ra02wuvm5jxmkv4tk24mtt25ue3c3rkqzv4n94",
      "consensus_pubkey": "nchvalconspub1zcjduepq696d6v90ragj98p5tdjfgq8nfc7g3tet5v63l0vzq88nkkk274jst0lk2u",
      "jailed": false,
      "status": 2,
      "tokens": "99989999840399000",
      "delegator_shares": "99989999840399000.000000000000000000",
      "description": {
        "moniker": "node",
        "identity": "",
        "website": "",
        "details": "node validator"
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2020-04-05T16:27:17.345540582Z"
      },
      "min_self_delegation": "100",
      "self_delegation": "99989999840399000.000000000000000000"
    },
    {
      "operator_address": "nchvaloper1fj4x6w7495vw2wfqegs8kqs2347c0vqck5cqve",
      "consensus_pubkey": "nchvalconspub1zcjduepq8mujsxceqjhvagaz2ncsvc26v7z60qz5dm209ac7w3zg2utx8rrq2cjdpz",
      "jailed": false,
      "status": 2,
      "tokens": "5000000000000",
      "delegator_shares": "5000000000000.000000000000000000",
      "description": {
        "moniker": "秋月夜",
        "identity": "",
        "website": "",
        "details": ""
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2020-04-14T01:37:16.214981939Z"
      },
      "min_self_delegation": "100",
      "self_delegation": "5000000000000.000000000000000000"
    },
    {
      "operator_address": "nchvaloper1sdh9efnf2tjcatcytcrllexsrmwze4ac4knwv0",
      "consensus_pubkey": "nchvalconspub1zcjduepq7furf7y824vpxlu6jhd4d9u35hwax70pef99d8kleuutn662htlsrfw0rg",
      "jailed": false,
      "status": 2,
      "tokens": "10000000000000000",
      "delegator_shares": "10000000000000000.000000000000000000",
      "description": {
        "moniker": "lucy",
        "identity": "",
        "website": "",
        "details": ""
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2020-04-05T16:06:28.409617672Z"
      },
      "min_self_delegation": "100",
      "self_delegation": "10000000000000000.000000000000000000"
    },
    {
      "operator_address": "nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4",
      "consensus_pubkey": "nchvalconspub1zcjduepqvskj36yf5cfp9rajuze30yexvejvtthkq6za3zpqkc84m0h93lvqvjv4uu",
      "jailed": false,
      "status": 2,
      "tokens": "999999999999998900",
      "delegator_shares": "999999999999998900.000000000000000000",
      "description": {
        "moniker": "netcloth",
        "identity": "47CB8FD16ABA8CA6",
        "website": "https://www.netcloth.org",
        "details": "Make You and Your Network Unique"
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.100000000000000000"
        },
        "update_time": "2020-04-05T15:13:06.386573523Z"
      },
      "min_self_delegation": "1",
      "self_delegation": "999999999999998900.000000000000000000"
    },
    {
      "operator_address": "nchvaloper1nkw4wxj6wttwm3uergymmr8c2fvspuk9smxuk0",
      "consensus_pubkey": "nchvalconspub1zcjduepqdzcgr896jaxnzwwjppcvl8ufyvrsvz5m8u6cszur73fsw7y7h6xqxmt6q3",
      "jailed": false,
      "status": 2,
      "tokens": "5900000000000000",
      "delegator_shares": "5900000000000000.000000000000000000",
      "description": {
        "moniker": "super",
        "identity": "",
        "website": "",
        "details": ""
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2020-04-07T07:13:33.305704177Z"
      },
      "min_self_delegation": "100",
      "self_delegation": "5900000000000000.000000000000000000"
    },
    {
      "operator_address": "nchvaloper14mqkzeh7l5nwyyf4nddmm63j2hyk39uaa646pp",
      "consensus_pubkey": "nchvalconspub1zcjduepqs8vyhlj4ydyyanlhr3twy2zrc3gyv3p65x0wxy3vccdga0st5eusvaee4m",
      "jailed": false,
      "status": 2,
      "tokens": "1000000000000000",
      "delegator_shares": "1000000000000000.000000000000000000",
      "description": {
        "moniker": "ston",
        "identity": "",
        "website": "",
        "details": "ston"
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2020-04-08T12:14:35.918437806Z"
      },
      "min_self_delegation": "100",
      "self_delegation": "1000000000000000.000000000000000000"
    },
    {
      "operator_address": "nchvaloper1c0fvrqdfsgdefqkftdrjh2nvk02cakdywnagna",
      "consensus_pubkey": "nchvalconspub1zcjduepqaum6ege3uv3h5dn3pxdvn3gt8shwqgg9p9jv4j779s9fmfju4p3q70fps0",
      "jailed": false,
      "status": 2,
      "tokens": "1890010000000000",
      "delegator_shares": "1890010000000000.000000000000000000",
      "description": {
        "moniker": "uranus",
        "identity": "",
        "website": "",
        "details": ""
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.050000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2020-04-06T07:54:41.17571637Z"
      },
      "min_self_delegation": "100",
      "self_delegation": "1890010000000000.000000000000000000"
    },
    {
      "operator_address": "nchvaloper17kfmq49p6vth0y83t4dwlpurdy70wgam6ed7y2",
      "consensus_pubkey": "nchvalconspub1zcjduepq85kevn2e489ce2c4yu5rrh92a7nwyrukh5dgjtlmg8gvv5cpaglsvks3fw",
      "jailed": false,
      "status": 2,
      "tokens": "4000099304191000",
      "delegator_shares": "4000099304191000.000000000000000000",
      "description": {
        "moniker": "iavl 🚀",
        "identity": "",
        "website": "",
        "details": "play 2048"
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2020-04-05T16:44:28.06067581Z"
      },
      "min_self_delegation": "100",
      "self_delegation": "4000099304191000.000000000000000000"
    }
  ]
}
```

### 根据验证人地址，获取验证人信息

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| ValidatorAddress | string | 验证人地址 |

```bash
# curl http://127.0.0.1:1317/staking/validators/{ValidatorAddress}

curl http://127.0.0.1:1317/staking/validators/nchvaloper17kfmq49p6vth0y83t4dwlpurdy70wgam6ed7y2
```

response:

```json
{
  "height": "297689",
  "result": {
    "operator_address": "nchvaloper17kfmq49p6vth0y83t4dwlpurdy70wgam6ed7y2",
    "consensus_pubkey": "nchvalconspub1zcjduepq85kevn2e489ce2c4yu5rrh92a7nwyrukh5dgjtlmg8gvv5cpaglsvks3fw",
    "jailed": false,
    "status": 2,
    "tokens": "4000099304191000", // 总token数量
    "delegator_shares": "4000099304191000.000000000000000000", // 总股份数量
    "description": {
      "moniker": "iavl 🚀",
      "identity": "",
      "website": "",
      "details": "play 2048"
    },
    "unbonding_height": "0",
    "unbonding_time": "1970-01-01T00:00:00Z",
    "commission": {
      "commission_rates": {
        "rate": "0.100000000000000000",
        "max_rate": "0.200000000000000000",
        "max_change_rate": "0.010000000000000000"
      },
      "update_time": "2020-04-05T16:44:28.06067581Z"
    },
    "min_self_delegation": "100",
    "self_delegation": "4000099304191000.000000000000000000" // 自抵押数量
  }
}

```

## distribution API

### 查询模块参数

```bash
curl http://127.0.0.1:1317/distribution/parameters
```

response:

```json
{
  "height": "0",
  "result": {
    "community_tax": "0.020000000000000000",
    "base_proposer_reward": "0.010000000000000000",
    "bonus_proposer_reward": "0.040000000000000000",
    "withdraw_addr_enabled": true
  }
}
```

### 查询指定地址的所有委托收益

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 账户地址 |

```bash
# curl http://127.0.0.1:1317/distribution/delegators/{address}/rewards

curl http://127.0.0.1:1317/distribution/delegators/nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e/rewards
```

response:

```json
{
  "height": "0",
  "result": {
    "rewards": [
      {
        "validator_address": "nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4",
        "reward": [
          {
            "denom": "pnch",
            "amount": "3514187551895590.134393692914846600"
          }
        ]
      },
      {
        "validator_address": "nchvaloper1ngm3k874204rwz23m46wqhlv8w9vyjtd9yqm7x",
        "reward": null
      }
    ],
    "total": [
      {
        "denom": "pnch",
        "amount": "3514187551895590.134393692914846600"
      }
    ]
  }
}
```

### 指定地址和验证人地址，查询委托收益

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 账户地址 |
| ValidatorAddress | string | 验证人地址 |

request: 

```bash
# curl http://127.0.0.1:1317/distribution/delegators/{address}/rewards/{ValidatorAddress}

curl http://127.0.0.1:1317/distribution/delegators/nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e/rewards/nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4
```

response:

```json
{
  "height": "0",
  "result": [
    {
      "denom": "pnch",
      "amount": "3623265033622849.014408463014861700"
    }
  ]
}
```

### 查询收益的取现地址

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| delegatorAddr | string | 委托人的账户地址 |

request:

```bash
# curl http://127.0.0.1:1317/distribution/delegators/{delegatorAddr}/withdraw_address


curl http://127.0.0.1:1317/distribution/delegators/nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e/withdraw_address
```

response:

```json
{
  "height": "301608",
  "result": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"
}
```

### 查询验证人收益

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| validatorAddr | string | 验证人地址 |

request:

```bash
# curl http://127.0.0.1:1317/distribution/validators/{validatorAddr}

curl http://127.0.0.1:1317/distribution/validators/nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4
```

response:

```json
{
  "height": "0",
  "result": {
    "operator_address": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e",
    "self_bond_rewards": [
      {
        "denom": "pnch",
        "amount": "24600830777753870.939086144470712200"
      }
    ],
    "val_commission": [
      {
        "denom": "pnch",
        "amount": "207906177334510092.043971528899436676"
      }
    ]
  }
}
```

### 查询验证人自委托的金收益

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| validatorAddr | string | 验证人地址 |

request:

```bash
# curl http://127.0.0.1:1317/distribution/validators/{validatorAddr}/rewards

curl http://127.0.0.1:1317/distribution/validators/nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4/rewards
```

response:

```json
{
  "height": "0",
  "result": [
    {
      "denom": "pnch",
      "amount": "24751495467847722.773354985367475000"
    }
  ]
}
```

## IPAL相关 API

### 注册ipal节点

目前不提供api，通过命令行完成

``` bash
# 注册服务节点，各个参数的含义请执行nchcli ipal cliam -h查看
nchcli ipal claim --from=$(nchcli keys show alice -a) \
--moniker=ipaltest  \
--website=sky.com \
--details="nch up" \
--endpoints "1|http://192.168.1.100:02" \
--bond=1000000000000000pnch
```

IPAL 声明详细参数，可点击[这里](./ipal.md)

### 查询服务节点列表

rest接口查询

 ```bash
curl http://127.0.0.1:1317/ipal/list
```

response:

```json
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

### 根据地址查询IPAL

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 账户地址 |

rest接口查询

```bash
curl http://127.0.0.1:1317/ipal/node/{address}

e.g.
curl http://127.0.0.1:1317/ipal/node/nch19uspwrym4wr366teytlu4hre9rs7afsf33dgcy
```

response:

```json
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

### 根据地址查询CIPAL

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 账户地址 |

rest接口查询

```bash
curl http://127.0.0.1:1317/cipal/query/{address}

e.g. 已经注册
curl http://127.0.0.1:1317/cipal/query/nch12zsau56la368qs23f6nmn2kfe6er6d5gue7u7g
```

response:

```json
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

e.g. 没有注册
curl http://127.0.0.1:1317/cipal/query/nch1a6hy8k6hscffcjgpggjs9dru4x4g58znj6pn0z

{
  "height": "446",
  "result": null
}
```

## 提案相关API

### 查询所有提案

```bash
curl http://127.0.0.1:1317/gov/proposals
```

## 合约相关API

### 查询合约代码

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| address | string | 合约账户地址 |

request:

```bash
# curl http://localhost:1317/vm/code/{address}

curl http://localhost:1317/vm/code/nch19lhydp6k59c66x2vp3h4ua8r8535uh6dlmex6y
```

response:

```json
{
  "height": "1460",
  "result": "608060405234801561001057600080fd5b50600436106100a95760003560e01c80636b520757116100715780636b5207571461016e5780639cc7f7081461018c578063a17a9e66146101ce578063aef52a2c14610210578063cc445d4e1461022e578063dac0eb071461025c576100a9565b80631e1ed70b146100ae578063300308ba146100e65780633033413b146100f05780634903b0d11461010e5780635d33a27f14610150575b600080fd5b6100e4600480360360408110156100c457600080fd5b81019080803590602001909291908035906020019092919050505061028a565b005b6100ee6102a6565b005b6100f86102b0565b6040518082815260200191505060405180910390f35b61013a6004803603602081101561012457600080fd5b81019080803590602001909291905050506102b6565b6040518082815260200191505060405180910390f35b6101586102ce565b6040518082815260200191505060405180910390f35b6101766102d4565b6040518082815260200191505060405180910390f35b6101b8600480360360208110156101a257600080fd5b81019080803590602001909291905050506102dd565b6040518082815260200191505060405180910390f35b6101fa600480360360208110156101e457600080fd5b81019080803590602001909291905050506102fa565b6040518082815260200191505060405180910390f35b610218610315565b6040518082815260200191505060405180910390f35b61025a6004803603602081101561024457600080fd5b810190808035906020019092919050505061031b565b005b6102886004803603602081101561027257600080fd5b8101908080359060200190929190505050610329565b005b8060036000848152602001908152602001600020819055505050565b6064600081905550565b60005481565b60036020528060005260406000206000915090505481565b60015481565b60008054905090565b600060036000838152602001908152602001600020549050919050565b60008160008082825401925050819055506000549050919050565b60025481565b806001540160008190555050565b60016002540160028190555061033e816102fa565b6001600082825401925050819055505056fea26469706673582212207339ae9e785d6abe064a41bdebda6eb72d116c63a4382c77d452d75c3a7f4fa664736f6c63430006000033"
}
```

### 预估交易费用/调用合约方法

调用```estimate_gas``` API接口，可同时获取合约交易消耗的gas和合约方法的返回值，其中返回的gas只是预估值，真正发起链上记账时，建议适当上调，避免Out of Gas错误。

#### 创建合约

预估创建合约交易的gas，需要向接口post一个如下的结构体：

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

其中from为交易发起的合约地址，to为空, payload为合约代码的十六进制形式，amount为向合约发送的资产数量。

可通过```nchcli```构造payload，，如下构造一个创建合约的交易消息，不做签名

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

```bash
{
  "height": "473",
  "result": {
    "Gas": "240517",
    "Res": "608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029"
  }
}

# Gas为预估的费用
# Res为创建合约的返回值，即所部署的合约代码
```

#### 调用合约

调用合约的payload要根据调用方法的abi来构造，可参考代码 https://github.com/netcloth/netcloth-chain/blob/develop/modules/vm/client/cli/query.go 的GetCmdQueryCallFee函数

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

# Gas为预估的费用
# Res为调用方法的返回值
```

其中post_data及payload的生成 ，可以借助nchcli工具，参考[这里](../contracts/contract.md##调用智能合约)
