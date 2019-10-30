## 如何抵押和委托

这里假设你部署并同步了内测网的节点。

如何加入内测网，点击[这里](how-to-join-alphanet.md)。

#### 1. 创建验证人

* 新创建一个钱包地址
```
nchcli keys add dan

override the existing name dan [y/N]: y
Enter a passphrase to encrypt your key to disk:
Repeat the passphrase:
{
  "name": "dan",
  "type": "local",
  "address": "nch1l3c8k72wwt5fps9fs7h4tfdz9352m6dlsspdh5",
  "pubkey": "nchpub1addwnpepqt48jfuqrqy9n7d7vr6wvudq4nxrmupem8lw6t23k255j3mexgu0q3l6wuq",
  "mnemonic": "hair quantum left artwork save have egg runway spider virtual execute found seed link betray woman tongue check short load mutual razor dish asthma"
}
```

* 查询验证人列表
```
nchcli query staking validators

response:
[
  {
    "operator_address": "nchvaloper13lmppkumkmf6699q4gpukg8fz5pf2lgzqx0mrh", // 地址
    "consensus_pubkey": "nchvalconspub1zcjduepq6d8u2egnr2255yccgg2st2d0k5uzjq72lh2z2ktfsupry2mk0dqs3tpqkd",
    "jailed": false,
    "status": 2,
    "tokens": "1000000",
    "delegator_shares": "1000000.000000000000000000",
    "description": {
      "moniker": "local-nch",
      "identity": "",
      "website": "",
      "details": ""
    },
    "unbonding_height": "0",
    "unbonding_time": "1970-01-01T00:00:00Z",
    "commission": { // 佣金
      "commission_rates": {
        "rate": "0.100000000000000000",
        "max_rate": "0.200000000000000000",
        "max_change_rate": "0.100000000000000000"
      },
      "update_time": "2019-09-21T02:40:32.766803Z"
    },
    "min_self_delegation": "1",   // 验证人自委托最小数量
    "self_delegation": "0.000000000000000000" // 自委托数量
  }
]
```

* 创建一个验证人
```
# 先向dan转账
 nchcli send --from $(nchcli keys show alice -a) --to $(nchcli keys show dan -a) --amount 200000unch
 
# 创建验证人
# 使用刚才创建的dan作为验证人
nchcli tx staking create-validator \
  --amount=10000unch \
  --pubkey=$(nchd tendermint show-validator -o text) \
  --moniker="unch" \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="100" \
  --from=$(nchcli keys show dan -a)
  
response:
{
  "height": "0",
  "txhash": "B783FF4CA984B7F8EFC49DB68E40667D979E2112543DC9FD5FB36093C9E90B66",
  "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\"}]",
  "logs": [
    {
      "msg_index": 0,
      "success": true,
      "log": ""
    }
  ]
}
```

* 查询最新的验证人列表
```
nchcli query staking validators

response:
[
  {
    "operator_address": "nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
    "consensus_pubkey": "nchvalconspub1zcjduepq8djr2kyppk56fu7qkqdznsp3y5dclf7kqn45nkhlmv47qjwpupusf0rdzn",
    "jailed": false,
    "status": 2,
    "tokens": "1000000",
    "delegator_shares": "1000000.000000000000000000",
    "description": {
      "moniker": "local-nch",
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
        "max_change_rate": "0.100000000000000000"
      },
      "update_time": "2019-09-21T08:57:46.901757436Z"
    },
    "min_self_delegation": "1",
    "self_delegation": "2000000.000000000000000000"
  },
  {
    "operator_address": "nchvaloper1l3c8k72wwt5fps9fs7h4tfdz9352m6dlt34lyc",
    "consensus_pubkey": "nchvalconspub1zcjduepqzwnrt9n4zlp7eedxd4cnlex68aqenhvg9p7utatju99xcdlep92qpf3y5r",
    "jailed": false,
    "status": 0,
    "tokens": "10000",
    "delegator_shares": "10000.000000000000000000",
    "description": {
      "moniker": "unch",
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
      "update_time": "2019-09-21T09:22:23.433639783Z"
    },
    "min_self_delegation": "100",
    "self_delegation": "20000.000000000000000000"
  }
]
# 返回的结果中，可以看到新创建的验证人
# 如果没有查询到，可根据txhash查询交易是否失败
nchcli query tx <txhash>
```


* 也可以根据验证人的地址查询
```
# 根据operator_address查询对应的验证人信息(本例中查询的地址为nchvaloper13lmppkumkmf6699q4gpukg8fz5pf2lgzqx0mrh)
# usage: nchcli query staking validator  <validatorAddress>
nchcli query staking validator nchvaloper1l3c8k72wwt5fps9fs7h4tfdz9352m6dlt34lyc

response:
{
  "operator_address": "nchvaloper1l3c8k72wwt5fps9fs7h4tfdz9352m6dlt34lyc",
  "consensus_pubkey": "nchvalconspub1zcjduepqzwnrt9n4zlp7eedxd4cnlex68aqenhvg9p7utatju99xcdlep92qpf3y5r",
  "jailed": false,
  "status": 0,
  "tokens": "10000",
  "delegator_shares": "10000.000000000000000000",
  "description": {
    "moniker": "unch",
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
    "update_time": "2019-09-21T09:22:23.433639783Z"
  },
  "min_self_delegation": "100",
  "self_delegation": "20000.000000000000000000"
}
```

#### 2.委托
* 向验证人委托nch
```
#委托分2种：验证人自委托 和 用户委托
# usage: nchcli tx staking delegate <validatorAddress> <amountToBond> --from <delegatorKeyName> 

# 使用alice账号向验证人
nchcli tx staking delegate nchvaloper1l3c8k72wwt5fps9fs7h4tfdz9352m6dlt34lyc 6000000unch --from  $(nchcli keys show alice -a)

response:
{
  "chain_id": "nch-devnet",
  "account_number": "1",
  "sequence": "3",
  "fee": {
    "amount": [],
    "gas": "200000"
  },
  "msgs": [
    {
      "type": "nch/MsgDelegate",
      "value": {
        "delegator_address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
        "validator_address": "nchvaloper1l3c8k72wwt5fps9fs7h4tfdz9352m6dlt34lyc",
        "amount": {
          "denom": "unch",
          "amount": "6000000"
        }
      }
    }
  ],
  "memo": ""
}

confirm transaction before signing and broadcasting [y/N]: y
Password to sign with 'alice':
{
  "height": "0",
  "txhash": "BB7078A2DF865971B701C4BC7D58BB3287F46870FA04883000ED45AC14590157",
  "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\"}]",
  "logs": [
    {
      "msg_index": 0,
      "success": true,
      "log": ""
    }
  ]
}
```

* 查询委托信息
```
# 查询账户alice的所有委托
usage: nchcli query staking delegations <delegatorAddress>
nchcli query staking delegations $(nchcli keys show alice -a) 

response:
[
  {
    "delegator_address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "validator_address": "nchvaloper1l3c8k72wwt5fps9fs7h4tfdz9352m6dlt34lyc",
    "shares": "6000000.000000000000000000",
    "balance": "6000000"
  }
]

# 查询特定账户和验证人之间的委托（参数为委托者地址和验证人地址）
# usage: nchcli query staking delegation  <delegatorAddress> <validatorAddress>
nchcli query staking delegation  $(nchcli keys show alice -a) nchvaloper1l3c8k72wwt5fps9fs7h4tfdz9352m6dlt34lyc

response:
{
  "delegator_address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
  "validator_address": "nchvaloper1l3c8k72wwt5fps9fs7h4tfdz9352m6dlt34lyc",
  "shares": "6000000.000000000000000000",
  "balance": "6000000"
}

# 查询账户的委托收益
# usage: nchcli query distribution rewards <delegatorAddress> 
nchcli query distribution rewards nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm

response:
{
  "rewards": [
    {
      "validator_address": "nchvaloper1l3c8k72wwt5fps9fs7h4tfdz9352m6dlt34lyc",
      "reward": [
        {
          "denom": "unch",
          "amount": "1549405.172331827904000000"
        }
      ]
    }
  ],
  "total": [
    {
      "denom": "unch",
      "amount": "1549405.172331827904000000"
    }
  ]
}
```


