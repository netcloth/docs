# 向验证人委托

这里假设你部署并同步了测试网的节点。

如何加入测试网，点击[这里](../get-started/how-to-join-testnet.md)。

## 新创建一个钱包地址

如果你已经拥有钱包，可跳过此步骤

```bash
nchcli keys add lucy

override the existing name lucy [y/N]: y
Enter a passphrase to encrypt your key to disk:
Repeat the passphrase:
{
  "name": "lucy",
  "type": "local",
  "address": "nch1l3c8k72wwt5fps9fs7h4tfdz9352m6dlsspdh5",
  "pubkey": "nchpub1addwnpepqt48jfuqrqy9n7d7vr6wvudq4nxrmupem8lw6t23k255j3mexgu0q3l6wuq",
  "mnemonic": "hair quantum left artwork save have egg runway spider virtual execute found seed link betray woman tongue check short load mutual razor dish asthma"
}
```

## 获得测试token

获得测试token， 请参照[这里](../get-started/testcoin.md)

## 委托

### 查询验证人列表

```bash
nchcli query staking validators
```

response:

```json
[
  {
    "operator_address": "nchvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e",
    "consensus_pubkey": "nchvalconspub1zcjduepqua3tt6kl7v7sd558m24fj3s039fhmsxcv9fc49rqn0uwcuelvrmsdp3hwt",
    "jailed": false,
    "status": 2,
    "tokens": "1000000",
    "delegator_shares": "1000000.000000000000000000",
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
      "update_time": "2019-10-30T11:21:01.013731989Z"
    },
    "min_self_delegation": "100",
    "self_delegation": "510000.000000000000000000"
  },
  {
    "operator_address": "nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
    "consensus_pubkey": "nchvalconspub1zcjduepq3zr5cyenfyz8qprts7344nl8gclm3st669hyrhgy9gae7l8ajuus5uttte",
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
      "update_time": "2019-10-30T08:10:34.407927185Z"
    },
    "min_self_delegation": "1",
    "self_delegation": "1000000.000000000000000000"
  }
]
```

上述返回结果中，```operator_address```即验证人地址。

如果是自己创建的验证人，可以通过```nchcli```查询自己的验证人地址：

```bash
nchcli keys show <key-name> --bech va
```

* 也可以根据验证人的地址查询验证人

```bash
# 根据operator_address查询对应的验证人信息(本例中查询的地址为nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z)
# usage: nchcli query staking validator  <validatorAddress>
nchcli query staking validator nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z
```

response:

```json
{
  "operator_address": "nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
  "consensus_pubkey": "nchvalconspub1zcjduepq3zr5cyenfyz8qprts7344nl8gclm3st669hyrhgy9gae7l8ajuus5uttte",
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
    "update_time": "2019-10-30T08:10:34.407927185Z"
  },
  "min_self_delegation": "1",
  "self_delegation": "1000000.000000000000000000"
}
```

### 向验证人委托nch

向验证人委托，需要你的账户里持有一定数量的nch。

```bash
#委托分2种：验证人自委托 和 用户委托
# usage: nchcli tx staking delegate <validatorAddress> <amountToBond> --from <delegatorKeyName> 

# 使用alice账号向验证人
nchcli tx staking delegate nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z 6000000pnch \
--from  $(nchcli keys show alice -a) \
--gas 200000
```

response:

```json
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
          "denom": "pnch",
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

### 查询委托信息

* 查询账户alice的所有委托

```bash
# usage: nchcli query staking delegations <delegatorAddress>
nchcli query staking delegations $(nchcli keys show alice -a)
```

response:

```json
[
  {
    "delegator_address": "nch133vmttt6n49jac5zn3z0klcpe7m8qlugyggx5w",
    "validator_address": "nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
    "shares": "13000000.000000000000000000",
    "balance": "13000000"
  }
]
```

* 查询特定账户和验证人之间的委托
  
```bash
# 参数为委托者地址和验证人地址
# usage: nchcli query staking delegation  <delegatorAddress> <validatorAddress>
nchcli query staking delegation  $(nchcli keys show alice -a) nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z
```

response:

```json
{
  "delegator_address": "nch133vmttt6n49jac5zn3z0klcpe7m8qlugyggx5w",
  "validator_address": "nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
  "shares": "13000000.000000000000000000",
  "balance": "13000000"
}
```

* 查询账户的委托收益

```bash
# usage: nchcli query distribution rewards <delegatorAddress> 
nchcli query distribution rewards nch133vmttt6n49jac5zn3z0klcpe7m8qlugyggx5w
```

response:

```json
{
  "rewards": [
    {
      "validator_address": "nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
      "reward": [
        {
          "denom": "pnch",
          "amount": "3022184400.676553570237000000"
        }
      ]
    }
  ],
  "total": [
    {
      "denom": "pnch",
      "amount": "3022184400.676553570237000000"
    }
  ]
}
```

### 取回委托的nch

```bash
# usage: nchcli tx staking unbond <validator_address> 100pnch --from <mykey>
# 示例：
nchcli tx staking unbond nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z 100pnch \
--from  $(nchcli keys show alice -a) \
--gas 200000
```

更多关于验证人解绑、取回奖励和佣金，点击[这里](../software/nchcli.md#解委托)