
# IPAL相关API

## REST APIs

```nchcli``` 开启rest-server后，浏览器访问 ```http://rpc.netcloth.org/swagger-ui/``` 可以看到所有的REST APIs

* 获取最新区块

```shell
curl http://rpc.netcloth.org/blocks/latest
```

* 获取指定高度的区块

```shell
curl http://rpc.netcloth.org/blocks/{height}
```

* 广播交易
  
```shell
curl -X POST "http://rpc.netcloth.org/txs" -H "accept: application/json" -H "Content-Type: application/json" -d "{transaction msg}"
```

### ipal API

* 注册ipal节点，目前不提供api，通过命令行完成

``` shell
# 该命令以交互的方式创建账号aipaltest并关联相应的公钥账号，需要输入两次密码来创建账号，私钥通过密码加密，相当于生成keystore，同时会输出24个单词的助记词
nchcli keys add ipaltest

# 向aipaltest账号转账，sky也需要创建账号，并申请测试token，申请方法(TODO: url)
nchcli send --from $(nchcli keys show sky -a) --to $(nchcli keys show ipaltest -a) --amount 2000000unch

# 在区块链上注册服务节点，各个参数的含义请执行nchcli aipal cliam -h查看
nchcli ipal claim --from=$(nchcli keys show ipaltest -a) --moniker=ipaltest  --website=sky.com --details="nch up" --endpoints "1|192.168.1.100:02" --bond=1000000unch
```

* 查询服务节点列表

rest接口查询

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
        "denom": "unch",
        "amount": "1000000"
      }
    }
  ]
}
```

* 根据地址查询IPAL
rest接口查询

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
      "denom": "unch",
      "amount": "1400000"
    }
  }
}
```

### cipal API

* 根据地址查询CIPAL

rest接口查询

``` shell
curl http://rpc.netcloth.org/cipal/query/{addr}

e.g. 已经注册
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

e.g. 没有注册
http://rpc.netcloth.org/cipal/query/nch1a6hy8k6hscffcjgpggjs9dru4x4g58znj6pn0z

{
  "height": "446",
  "result": null
}
```

### 根据交易hash查询交易结果

通用接口

rest接口查询

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
