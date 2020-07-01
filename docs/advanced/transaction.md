# 交易和签名

## 交易结构

```NetCloth```链上一笔交易主要包含```msg, fee, signatures```和```memo```：

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

关于交易费用，参考[这里](../Q&A.md#交易手续费)。

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

```NetCloth```链包含多种msg类型，具体可参考github源码，各种msg结构的定义位于modules目录各个msg.go文件。

## 签名构造

go语言版本的交易构造和广播，参考[go-sdk](https://github.com/netcloth/go-sdk)。

以构造转账交易签名为例：

示例私钥：

```ini
# 十六进制
50aa0816d2f43512564ec41120c91d17224f0d6df9aa1e45d0eeeca97adab213
```

示例公钥：

```ini
02BBDC958286248620929E2A4A9C84FE0384F502BFBC1A5738F77CE0319A1344D0

# base64编码为
ArvclYKGJIYgkp4qSpyE/gOE9QK/vBpXOPd84DGaE0TQ
```

### 构造签名结构体

构造并填充如下结构体

```go
type StdSignMsg struct {
   ChainID       string    `json:"chain_id" yaml:"chain_id"`
   AccountNumber uint64    `json:"account_number" yaml:"account_number"`
   Sequence      uint64    `json:"sequence" yaml:"sequence"`
   Fee           StdFee    `json:"fee" yaml:"fee"`
   Msgs          []sdk.Msg `json:"msgs" yaml:"msgs"`
   Memo          string    `json:"memo" yaml:"memo"`
}
```

示例如下：

```json
{
	"account_number": "0",
	"chain_id": "nch-chain",
	"fee": {
		"amount": [{
			"amount": "200000000",
			"denom": "pnch"
		}],
		"gas": "200000"
	},
	"memo": "",
	"msgs": [{
		"type": "nch/MsgSend",
		"value": {
			"amount": [{
				"amount": "1",
				"denom": "pnch"
			}],
			"from_address": "nch12dmr99v3eh39f97jnh5ga32ny2ddzznppumf2h",
			"to_address": "nch12vgxe8qgdnuqlvnvyskua2rssxpqg4yyldrqep"
		}
	}],
	"sequence": "1"
}
```

其中```account_number```和```sequence```可通过 [account API接口](./api.md#查询帐户信息及余额) 获得， ```account_number```是固定的，```sequence```表示当前帐户的交易数 。

```chain_id```表示链id，不同的链有不同的id。公测网的链id为```nch-testnet```

转帐的```msg type```为```"nch/MsgSend"```，更多msg type参考[这里](./messages.md) 。

### 序列化

按字段名称的字典序排列(fee和msgs结构体内也按字段句字典序排列), 序列化。 序列化后的bytes：

```properties
7b226163636f756e745f6e756d626572223a2230222c22636861696e5f6964223a226e63682d636861696e222c22666565223a7b22616d6f756e74223a5b7b22616d6f756e74223a22323030303030303030222c2264656e6f6d223a22706e6368227d5d2c22676173223a22323030303030227d2c226d656d6f223a22222c226d736773223a5b7b2274797065223a226e63682f4d736753656e64222c2276616c7565223a7b22616d6f756e74223a5b7b22616d6f756e74223a2231222c2264656e6f6d223a22706e6368227d5d2c2266726f6d5f61646472657373223a226e63683132646d7239397633656833396639376a6e6835676133326e793264647a7a6e7070756d663268222c22746f5f61646472657373223a226e6368313276677865387167646e75716c766e7679736b756132727373787071673479796c6472716570227d7d5d2c2273657175656e6365223a2231227d
```

对bytes做sha256处理, 结果为

```properties
faae9f8c864576c51aef8e52adcca4096ded8fa392c305612df31ef918850d1e
```

### 私钥签名

签名:

```properties
2c80b2e9069e43949bd8b5b2c93f19cd223435a5418e01c196626fd749067b28092f260d2af03fc8fa64fd1c262bd727435926aff1f8a9ad65251a71a9e1a113
```

最终构造出签名:

```json
{
	"pub_key": {
		"type": "tendermint/PubKeySecp256k1",
		"value": "ArvclYKGJIYgkp4qSpyE/gOE9QK/vBpXOPd84DGaE0TQ"
	},
	"signature": "LICy6QaeQ5Sb2LWyyT8ZzSI0NaVBjgHBlmJv10kGeygJLyYNKvA/yPpk/RwmK9cnQ1kmr/H4qa1lJRpxqeGhEw=="
}
```

其中```tendermint/PubKeySecp256k1```固定为公钥类型， ```value```为公钥的```base64```编码
```signature```的值为```signature```的```base64```编码。

### 调用RPC接口发起交易

```bash
curl -X POST "http://rpc.netcloth.org/txs" \
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

response:

```json
{
  "height": "48",
  "txhash": "F84D70288E145E5193DA29562E84F689A400A6DD225E0F0434855D895F356845",
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
  "gas_used": "75946",
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
          "value": "nch12dmr99v3eh39f97jnh5ga32ny2ddzznppumf2h"
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
          "value": "nch12vgxe8qgdnuqlvnvyskua2rssxpqg4yyldrqep"
        },
        {
          "key": "amount",
          "value": "1pnch"
        }
      ]
    }
  ]
}

```

其中mode有三种：

* **block**: 交易被确认后返回,平均需等待2.5秒
* **sync**: 交易在当前节点通过后返回
* **async**: 立即返回,不对交易进行任何处理