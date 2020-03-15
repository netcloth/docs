# 交易结构

NetCloth链交易结构，主要包含type, msg, fee, signatures和memo，其中type, fee, signatures和memo为不同的交易类型所共有，不同的在于msg的内容。

```json
{
  "type": "nch/StdTx", // 交易type，固定为nch/StdTx
  "value": { // 交易value
    "msg": [], // msg数组
    "fee": {}, // 交易费用
    "signatures": [], // 交易签名，和msg一一对应
    "memo": "" // 交易附带的memo
  }
}
```

以转帐和IPAL两种交易作为对比，交易结构如下：

转帐交易的结构：

```json
{
	"type": "nch/StdTx", // 交易type，固定为nch/StdTx
	"value": {
		"msg": [{ // 转帐的msg结构
			"type": "nch/MsgSend", // 转帐的msg type
			"value": { // 转帐的msg value
				"from_address": "nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e",  // 转出方地址
				"to_address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",  // 转入方地址
				"amount": [{ // 转帐数量
					"denom": "pnch",
					"amount": "1"
				}]
			}
		}],
		"fee": { // 交易费用
			"amount": [{
				"denom": "pnch",
				"amount": "1000000000"
			}],
			"gas": "100000" // 交易指定的最大gas数量
		},
		"signatures": [{ // 交易签名
			"pub_key": {
				"type": "tendermint/PubKeySecp256k1",
				"value": "AjJLEV6oaYKEzpplQfoxeSo1YbVftXH6jTEqUTNv3gaj"
			},
			"signature": "fVKrW3Zo+YRSo4NjmpEXxBRGIgZErlFN5ZyTbRBfcwQPtu5t/NKqZaCcpkaDPS/V0SREmXU+Ce5i6bSYRR9ssA=="
		}],
		"memo": "" // 交易附带的memo
	}
}
```

IPAL交易的结构：

```json
{
	"type": "nch/StdTx", // 交易type，固定为nch/StdTx
	"value": {
		"msg": [{ // IPAL的msg结构
			"type": "nch/IPALClaim", // IPAL的msg type
			"value": { // IPAL的msg value
				"operator_address": "nch13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e", // 地址
				"moniker": "moniker", // 名字
				"website": "http://www.webiste.com", // 网站
				"details": "details", //  详情
				"endpoints": [{ // 服务节点地址
					"type": "21",
					"endpoint": "192.168.1.100:10000"
				}, {
					"type": "2",
					"endpoint": "192.168.1.101:20000"
				}],
				"bond": { // 质押资产数量
					"denom": "pnch",
					"amount": "100000"
				}
			}
		}],
		"fee": { // 交易费用
			"amount": [{
				"denom": "pnch",
				"amount": "1000000000"
			}],
			"gas": "100000" // 交易指定的最大gas数量
		},
		"signatures": [{ // 交易签名
			"pub_key": {
				"type": "tendermint/PubKeySecp256k1",
				"value": "AjJLEV6oaYKEzpplQfoxeSo1YbVftXH6jTEqUTNv3gaj"
			},
			"signature": "fVKrW3Zo+YRSo4NjmpEXxBRGIgZErlFN5ZyTbRBfcwQPtu5t/NKqZaCcpkaDPS/V0SREmXU+Ce5i6bSYRR9ssA=="
		}],
		"memo": "" //  交易附带的memo

	}
}
```

NetCloth链包含多种msg类型，具体可参考github源码，各种msg结构的定义位于modules目录各个msg.go文件。