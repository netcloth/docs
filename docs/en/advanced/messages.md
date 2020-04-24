# Msgs 

Messages are objects whose end-goal is to trigger state-transitions. They are wrapped in transactions, which may contain one or multiple of them.

Typically, messages are defined in a ./internal/types/msgs.go file inside the module's folder.

```go
// MsgSend - high level transaction of the coin module
type MsgSend struct {
	FromAddress sdk.AccAddress `json:"from_address" yaml:"from_address"`
	ToAddress   sdk.AccAddress `json:"to_address" yaml:"to_address"`
	Amount      sdk.Coins      `json:"amount" yaml:"amount"`
}
```

## defined msgs

### Transfer/Send

```json
        {
          "type": "nch/MsgSend",
          "value": {
            "from_address": "nch1qnazcenn7v5rdq02grglquc5kd3y4dh985rau4",
            "to_address": "nch1s260x9plzxxxp6c0g2zs2pfc9q65947kj0a5lq",
            "amount": [
              {
                "denom": "pnch",
                "amount": "2000000000000000"
              }
            ]
          }
        }
```

### IPAL Claim

```json
        {
          "type": "nch/IPALClaim",
          "value": {
            "operator_address": "nch1sdh9efnf2tjcatcytcrllexsrmwze4acwh8ulr",
            "moniker": "lucy猩势力",
            "website": "https://lucia.vip/",
            "details": "lucygroup",
            "extension": "",
            "endpoints": [
              {
                "type": "1",
                "endpoint": "http://123.56.178.94"
              },
              {
                "type": "3",
                "endpoint": "http://123.56.178.94"
              }
            ],
            "bond": {
              "denom": "pnch",
              "amount": "100000000000000000"
            }
          }
        }

```

### CIPAL Claim

```json
        {
          "type": "nch/CIPALClaim",
          "value": {
            "from": "nch10jzpt32gwradv9mcnr6fuuj0tnx7rq0psmmtju",
            "user_request": {
              "params": {
                "user_address": "nch1yfqwkqtjjt792fv3uktw7u22faf6kgz5yw5aqu",
                "service_info": {
                  "type": "1",
                  "address": "nch10jzpt32gwradv9mcnr6fuuj0tnx7rq0psmmtju"
                },
                "expiration": "2020-04-23T00:30:07Z"
              },
              "signature": {
                "pub_key": {
                  "type": "tendermint/PubKeySecp256k1",
                  "value": "A0+wSGNEmK6jXn7gsnW6QPaYCpKfFuxuR8qLN316xG9S"
                },
                "signature": "WJIyouvYpokLxQRzIAx+XI6oTqbJpicIr9xnodTBpNMxEbX3oRHvntkfKhbW1kwJRJddyO4ru2nmR3KsBv+qeg=="
              }
            }
          }
        }
```

### Create validator

```json
        {
        	"type": "nch/MsgCreateValidator",
        	"value": {
        		"description": {
        			"moniker": "lucy",
        			"identity": "",
        			"website": "",
        			"details": ""
        		},
        		"commission": {
        			"rate": "0.100000000000000000",
        			"max_rate": "0.200000000000000000",
        			"max_change_rate": "0.010000000000000000"
        		},
        		"min_self_delegation": "100",
        		"delegator_address": "nch1sdh9efnf2tjcatcytcrllexsrmwze4acwh8ulr",
        		"validator_address": "nchvaloper1sdh9efnf2tjcatcytcrllexsrmwze4ac4knwv0",
        		"pubkey": "nchvalconspub1zcjduepq7furf7y824vpxlu6jhd4d9u35hwax70pef99d8kleuutn662htlsrfw0rg",
        		"value": {
        			"denom": "pnch",
        			"amount": "10000000000000000"
        		}
        	}
        }
```

### Edit validator

```json
    {
      "type": "nch/MsgEditValidator",
      "value": {
        "Description": {
          "moniker": "moniker",
          "identity": "[do-not-modify]",
          "website": "http://www.website.com",
          "details": "validator details"
        },
        "address": "nchvaloper17kfmq49p6vth0y83t4dwlpurdy70wgam6ed7y2",
        "commission_rate": null,
        "min_self_delegation": null
      }
    }
```

### Contract msg

```json
        {
          "type": "nch/MsgContract",
          "value": {
            "from": "nch1s260x9plzxxxp6c0g2zs2pfc9q65947kj0a5lq",
            "to": "nch10zw6tps30qqy809a9e9rch5nzvfq3sdcgrg3r7",
            "payload": "5fb8c733123456781234567812345678123456781234567812345678123456781234567800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a",
            "amount": {
              "denom": "pnch",
              "amount": "100000000000000"
            }
          }
        }

```

### Delegate

```json
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
```

### Undelegate

```json
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
```

### Submit proposal

```json
    {
      "type": "nch/MsgSubmitProposal",
      "value": {
        "content": {
          "type": "nch/ParameterChangeProposal",
          "value": {
            "title": "Slashing Params Change",
            "description": "Update signed_blocks_window",
            "changes": [
              {
                "subspace": "slashing",
                "key": "signed_blocks_window",
                "value": "5000"
              }
            ]
          }
        },
        "initial_deposit": [],
        "proposer": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"
      }
    }
```

### Unjail

```json
    {
      "type": "nch/MsgUnjail",
      "value": {
        "address": "nchvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4"
      }
    }
```