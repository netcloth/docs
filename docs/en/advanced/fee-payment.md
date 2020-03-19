# Delegation of transaction fees payment (Meta Transaction)

NetCloth natively supports third-party transaction fee payment on the bottom layer. This article describes how to use a NetCloth blockchain network to pay the cost of a transaction by a third party.

## Process

The principle of Meta Transaction is mainly based on the following: When a transaction message contains multiple signatures, the NetCloth blockchain network will select the transaction fee in the first order according to the transaction signature order. For transaction structure, refer to [here](./transaction.md).

Take ```alice```and``` bob``` for examples. ```Bob``` generates an Tx on NetCloth chain, and ```Alice``` will pay the Tx fee. ```alice``` and ``` bob``` can generate a transaction together, and ```alice``` puts her own msg and signature at the first of signature lists. Several interactions of ```alice``` and``` bob``` will be involved in the process.

### 1. bob construct a transfer transaction
```bash
nchcli send --from $(nchcli keys show bob -a) --to $(nchcli keys show dan -a) --amount 1pnch --generate-only > unsigned.json
```

The above command constructs an unsigned transfer transaction and outputs it to the ```unsigned.json```.The main content is ``` Bob```Transfer ```1pnch``` to ```dan```, where ```--generate-only``` constructs an unsigned transaction. The contents of the ```unsigned.json``` file are as follows.

```json
{
	"type": "nch/StdTx",
	"value": {
		"msg": [{
			"type": "nch/MsgSend",
			"value": {
				"from_address": "nch15uawqy70c0ew4y6nc3rdcsfs3lnr0p0e8svku0",
				"to_address": "nch12kl4e092s6lt7uzkcd820d24ayxyks8kzv2kqk",
				"amount": [{
					"denom": "pnch",
					"amount": "1"
				}]
			}
		}],
		"fee": {
			"amount": [{
				"denom": "pnch",
				"amount": "2000000000"
			}],
			"gas": "200000"
		},
		"signatures": null,
		"memo": ""
	}
}
```

### 2. Bob sends unsigned transaction file to Alice
```Alice``` After receiving the ```Bob``` unsigned file ```unsigned.json```, it will:

#### (1) Construct a transaction initiated by ```Alice```
Take ```Alice``` to construct a transaction that transfers to herself as an example.```Alice``` executes the following command to generate an unsigned transaction

```bash
nchcli send --from $(nchcli keys show alice -a) --to $(nchcli keys show alice -a) --amount 1pnch --generate-only
```

The console output is as follows

```bash
{
	"type": "nch/StdTx",
	"value": {
		"msg": [{
			"type": "nch/MsgSend",
			"value": {
				"from_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
				"to_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
				"amount": [{
					"denom": "pnch",
					"amount": "1"
				}]
			}
		}],
		"fee": {
			"amount": [{
				"denom": "pnch",
				"amount": "2000000000"
			}],
			"gas": "200000"
		},
		"signatures": null,
		"memo": ""
	}
}

```

#### (2) Combine the msg part in (1) into the ```unsigned.json``` file and use it as the first msg

Merge the following sections into the ```unsigned.json``` file:
```json
{
	"type": "nch/MsgSend",
	"value": {
		"from_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
		"to_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
		"amount": [{
			"denom": "pnch",
			"amount": "1"
		}]
	}
}
```

The content of the merged ```unsigned.json``` file is as follows
```json
{
	"type": "nch/StdTx",
	"value": {
		"msg": [{
			"type": "nch/MsgSend",
			"value": {
				"from_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
				"to_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
				"amount": [{
					"denom": "pnch",
					"amount": "1"
				}]
			}
		}, {
			"type": "nch/MsgSend",
			"value": {
				"from_address": "nch15uawqy70c0ew4y6nc3rdcsfs3lnr0p0e8svku0",
				"to_address": "nch12kl4e092s6lt7uzkcd820d24ayxyks8kzv2kqk",
				"amount": [{
					"denom": "pnch",
					"amount": "1"
				}]
			}
		}],
		"fee": {
			"amount": [{
				"denom": "pnch",
				"amount": "2000000000"
			}],
			"gas": "200000"
		},
		"signatures": null,
		"memo": ""
	}
}
```

#### (3) alice adjusts the gas required for the transaction
The ```unsigned.json``` file currently contains 2 msg. When the transaction is executed, it will consume more gas. Here,``` alice``` multiplies the transaction gas by 2. The ```unsigned.json``` file is as follows:

```json
{
	"type": "nch/StdTx",
	"value": {
		"msg": [{
				"from_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
				"to_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
				"amount": [{
					"denom": "pnch",
					"amount": "1"
				}]
			},
			{
				"type": "nch/MsgSend",
				"value": {
					"from_address": "nch15uawqy70c0ew4y6nc3rdcsfs3lnr0p0e8svku0",
					"to_address": "nch12kl4e092s6lt7uzkcd820d24ayxyks8kzv2kqk",
					"amount": [{
						"denom": "pnch",
						"amount": "1"
					}]
				}
			}
		],
		"fee": {
			"amount": [{
				"denom": "pnch",
				"amount": "4000000000"
			}],
			"gas": "400000"
		},
		"signatures": null,
		"memo": ""
	}
}
```

#### (4) Signature
```alice``` Signs the ```unsigned.json``` file, and the result is output to the ```signed-1.json``` file
```bash
nchcli tx sign unsigned.json --from $(nchcli keys show alice -a) > signed-1.json
```
We can obtain the signed ```signed-1.json``` file as follows:
```json
{
  "type": "nch/StdTx",
  "value": {
    "msg": [
      {
        "type": "nch/MsgSend",
        "value": {
          "from_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
          "to_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
          "amount": [
            {
              "denom": "pnch",
              "amount": "1"
            }
          ]
        }
      },
      {
        "type": "nch/MsgSend",
        "value": {
          "from_address": "nch15uawqy70c0ew4y6nc3rdcsfs3lnr0p0e8svku0",
          "to_address": "nch12kl4e092s6lt7uzkcd820d24ayxyks8kzv2kqk",
          "amount": [
            {
              "denom": "pnch",
              "amount": "1"
            }
          ]
        }
      }
    ],
    "fee": {
      "amount": [
        {
          "denom": "pnch",
          "amount": "4000000000"
        }
      ],
      "gas": "400000"
    },
    "signatures": [
      {
        "pub_key": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "AyNWrU4el+6kra99X5B1RuC7znqc2bdMkkXgyBrzZW+x"
        },
        "signature": "hujTY3yaVJVcl+4uGV7+8hOvyd6EvLpdITjVoX5fa91rJ+q93qVxYrIVjbZEC4hyQnWv2t6yY6ffGRuU9AmXtA=="
      }
    ],
    "memo": ""
  }
}
```

### 3. Alice will return the signed document to bob

```Bob``` receivessigned ```signed-1.json``` file from  ``` alice``` , then ```Bob``` signs the ``` signed-1.json``` file
```bash
nchcli tx sign signed-1.json --from $(nchcli keys show bob -a) > signed-2.json
```

We can get The signed ```signed-2.json``` as follows:
```json
{
  "type": "nch/StdTx",
  "value": {
    "msg": [
      {
        "type": "nch/MsgSend",
        "value": {
          "from_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
          "to_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
          "amount": [
            {
              "denom": "pnch",
              "amount": "1"
            }
          ]
        }
      },
      {
        "type": "nch/MsgSend",
        "value": {
          "from_address": "nch15uawqy70c0ew4y6nc3rdcsfs3lnr0p0e8svku0",
          "to_address": "nch12kl4e092s6lt7uzkcd820d24ayxyks8kzv2kqk",
          "amount": [
            {
              "denom": "pnch",
              "amount": "1"
            }
          ]
        }
      }
    ],
    "fee": {
      "amount": [
        {
          "denom": "pnch",
          "amount": "4000000000"
        }
      ],
      "gas": "400000"
    },
    "signatures": [
      {
        "pub_key": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "AyNWrU4el+6kra99X5B1RuC7znqc2bdMkkXgyBrzZW+x"
        },
        "signature": "hujTY3yaVJVcl+4uGV7+8hOvyd6EvLpdITjVoX5fa91rJ+q93qVxYrIVjbZEC4hyQnWv2t6yY6ffGRuU9AmXtA=="
      },
      {
        "pub_key": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "AqhO46Gf2J/WCj2/MgbcjkZDd+jZoaZUFWSj018+AIwi"
        },
        "signature": "or/oLTp2hUR36sILYVcKRQG8+31DcQd5aEu4FpLy670QLnsEcQPhff9lW3qxF0szjo0ED0STzLYuyqNkeBhUKQ=="
      }
    ],
    "memo": ""
  }
}
```

### 4. bob sends the final file to the network

```bob``` will broadcast the final``` signed-2.json``` file to the blockchain network.
```bash
nchcli tx broadcast signed-2.json
```

The response is as follows:
```json
{
  "height": "0",
  "txhash": "7B7DA9B0F9398134AF1782A4E438505C61CAECCA500673C73D6F9BC3B59FF8F8",
  "raw_log": "[]"
}
```


After sending, you can query transaction details according to txHash:
```bash
nchcli q tx 7B7DA9B0F9398134AF1782A4E438505C61CAECCA500673C73D6F9BC3B59FF8F8
```

The query results are as follows:
```json
{
  "height": "1330",
  "txhash": "7B7DA9B0F9398134AF1782A4E438505C61CAECCA500673C73D6F9BC3B59FF8F8",
  "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\",\"events\":null},{\"msg_index\":1,\"success\":true,\"log\":\"\",\"events\":null}]",
  "logs": [
    {
      "msg_index": 0,
      "success": true,
      "log": "",
      "events": null
    },
    {
      "msg_index": 1,
      "success": true,
      "log": "",
      "events": null
    }
  ],
  "gas_wanted": "400000",
  "gas_used": "104507",
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
          "value": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa"
        },
        {
          "key": "module",
          "value": "bank"
        },
        {
          "key": "action",
          "value": "send"
        },
        {
          "key": "sender",
          "value": "nch15uawqy70c0ew4y6nc3rdcsfs3lnr0p0e8svku0"
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
          "value": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa"
        },
        {
          "key": "amount",
          "value": "1pnch"
        },
        {
          "key": "recipient",
          "value": "nch12kl4e092s6lt7uzkcd820d24ayxyks8kzv2kqk"
        },
        {
          "key": "amount",
          "value": "1pnch"
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
            "from_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
            "to_address": "nch1pgd5p27eg9s9mhqq63nauexjfhg8mhfz2rpdsa",
            "amount": [
              {
                "denom": "pnch",
                "amount": "1"
              }
            ]
          }
        },
        {
          "type": "nch/MsgSend",
          "value": {
            "from_address": "nch15uawqy70c0ew4y6nc3rdcsfs3lnr0p0e8svku0",
            "to_address": "nch12kl4e092s6lt7uzkcd820d24ayxyks8kzv2kqk",
            "amount": [
              {
                "denom": "pnch",
                "amount": "1"
              }
            ]
          }
        }
      ],
      "fee": {
        "amount": [
          {
            "denom": "pnch",
            "amount": "4000000000"
          }
        ],
        "gas": "400000"
      },
      "signatures": [
        {
          "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "AyNWrU4el+6kra99X5B1RuC7znqc2bdMkkXgyBrzZW+x"
          },
          "signature": "hujTY3yaVJVcl+4uGV7+8hOvyd6EvLpdITjVoX5fa91rJ+q93qVxYrIVjbZEC4hyQnWv2t6yY6ffGRuU9AmXtA=="
        },
        {
          "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "AqhO46Gf2J/WCj2/MgbcjkZDd+jZoaZUFWSj018+AIwi"
          },
          "signature": "or/oLTp2hUR36sILYVcKRQG8+31DcQd5aEu4FpLy670QLnsEcQPhff9lW3qxF0szjo0ED0STzLYuyqNkeBhUKQ=="
        }
      ],
      "memo": ""
    }
  },
  "timestamp": "2020-03-15T10:15:12Z"
}
```