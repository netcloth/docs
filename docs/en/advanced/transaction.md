# Transaction Structure
A transaction on the NetCloth chain mainly includes type, msg, fee, signatures, and memo, of which type, fee, signatures, and memo are common to different transaction types, and the difference lies in the content of msg.
```json
{
	"type": "nch / StdTx", // transaction type, will be nch / StdTx
	"value": {// transaction value
	"msg": [], // msg array
	"fee": {}, // transaction fee
	"signatures": [], // transaction signature, one-to-one correspondence with msg
	"memo": "" // memo attached to the transaction
  }
}
```

For transaction fees, please refer to [here](../Q&A.md#_1-transaction-fees).


Comparing the two transactions of transfer and IPAL, the transaction structure is as follows:
Structure of the transfer transaction:
```json
{
	"type": "nch / StdTx", // transaction type, will be nch / StdTx
	"value": {
		"msg": [{// msg structure of transfer
		"type": "nch / MsgSend", // msg type of transfer
		"value": {// msg value of the transfer
		"from_address": "nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e", // transferor's address
		"to_address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm", // Transferee's address
		"amount": [{// number of assets to transfer
					"denom": "pnch",
					"amount": "1"
				}]
			}
		}],
		"fee": {// transaction fees
			"amount": [{
				"denom": "pnch",
				"amount": "1000000000"
			}],
			"gas": "100000" // maximum gas amount setted by the transaction
		},
		"signatures": [{// transaction signature
			"pub_key": {
				"type": "tendermint/PubKeySecp256k1",
				"value": "AjJLEV6oaYKEzpplQfoxeSo1YbVftXH6jTEqUTNv3gaj"
			},
			"signature": "fVKrW3Zo+YRSo4NjmpEXxBRGIgZErlFN5ZyTbRBfcwQPtu5t/NKqZaCcpkaDPS/V0SREmXU+Ce5i6bSYRR9ssA=="
		}],
		"memo": "" // memo attached to the transaction
	}
}
```

Structure of the IPAL transaction:
```json
{
	"type": "nch / StdTx", // transaction type, will be nch / StdTx
	"value": {
		"msg": [{// msg structure of IPAL
			"type": "nch/IPALClaim", //msg type of IPAL		
			"value": {// msg value of IPAL
				"operator_address": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e", // address
				"moniker": "moniker", 
				"website": "http://www.webiste.com",
				"details": "details", // Introduction of your node
				"endpoints": [{// starfish node address
					"type": "1",
					"endpoint": "192.168.1.100:10000"
				}, {
					"type": "2",
					"endpoint": "192.168.1.101:20000"
				}],
				"bond": {// number of bonded assets
					"denom": "pnch",
					"amount": "100000"
				}
			}
		}],
		"fee": {// transaction fee
			"amount": [{
				"denom": "pnch",
				"amount": "1000000000"
			}],
			"gas": "100000" // maximum gas amount specified by the transaction
		},
		"signatures": [{// transaction signature
			"pub_key": {
				"type": "tendermint/PubKeySecp256k1",
				"value": "AjJLEV6oaYKEzpplQfoxeSo1YbVftXH6jTEqUTNv3gaj"
			},
			"signature": "fVKrW3Zo+YRSo4NjmpEXxBRGIgZErlFN5ZyTbRBfcwQPtu5t/NKqZaCcpkaDPS/V0SREmXU+Ce5i6bSYRR9ssA=="
		}],
		"memo": "" // memo attached to the transaction

	}
}
```

The NetCloth chain contains a variety of msg types. For details, please refer to the github source code. The definition of various msg structures is located in each msg.go file in the modules directory.