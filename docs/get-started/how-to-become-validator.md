# 如何运行一个验证人

## 1. 安装并部署全节点

请首先按照[教程](./how-to-join-alphanet.md)，部署内测网的全节点，并且确保同步到了最新区块高度。

## 2.创建账号

```shell
# usage: nchcli keys add <key_name>

# 示例：
nchcli keys add dan
# 按照提示输入加密账号用的密码(后续执行各种交易都需要用该密码)，将命令返回的信息谨慎保存
```

## 3. 获得内测token

获得内测token， 请参照[这里](./testcoin.md)

## 4. 设置nchcli环境变量
``` bash
nchcli config chain-id nch-alphanet 
nchcli config output json 
nchcli config indent true 
nchcli config trust-node true
```

## 5.创建验证人

```shell
# usage: nchcli tx staking create-validator --from=<key_name> --amount=1000000unch --moniker=<your_custom_name>  --commission-rate=0.1 --identity=<identity_string>

# 示例：
nchcli tx staking create-validator \
  --amount=10000unch \
  --pubkey=$(nchd tendermint show-validator -o text) \
  --moniker="dan" \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="100" \
  --from=$(nchcli keys show dan -a)
  
# 重点关注命令中最后一行--from=$(nchcli keys show dan -a)，dan对应的账号作为抵押者将成为要创建的验证人
```

## 6.查询验证人列表

```shell
nchcli query staking validators

可以发现多了一个moniker为dan的验证人

[
  {
    "operator_address": "nchvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e",
    "consensus_pubkey": "nchvalconspub1zcjduepqua3tt6kl7v7sd558m24fj3s039fhmsxcv9fc49rqn0uwcuelvrmsdp3hwt",
    "jailed": false,
    "status": 0,
    "tokens": "10000",
    "delegator_shares": "10000.000000000000000000",
    "description": {
      "moniker": "dan",
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
    "self_delegation": "10000.000000000000000000"
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

## 7.让刚创建的验证者出块

step5创建了验证人，此时其状态为0，0表示还没有绑定，因为没有抵押足够的unch;

1000000unch为1个voting power，voting power的最小单位为1，只有它>=1时候才能够变成绑定状态2，才能成为活跃验证者出块，因此至少还需要抵押990000unch

可以用自己的账号给自己抵押，也可以让别的账号给自己的验证者抵押，这里分别展示：

这里需要用到步骤4中dan账号对应的验证人地址operator_address: nchvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e

### 7.1 给自己抵押500000unch

```shell
nchcli tx staking delegate nchvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e 500000unch --from $(nchcli keys show dan -a)

```

### 7.2 也可用别的账号给dan抵押490000unch

```shell
nchcli tx staking delegate nchvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e 490000unch --from $(nchcli keys show bob -a)
```

5.1和5.2唯一不同的--from参数是从哪个账号抵押

## 8.再次确认验证人状态为活跃验证人

```shell
nchcli query staking validators

[
  {
    "operator_address": "nchvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e",
    "consensus_pubkey": "nchvalconspub1zcjduepqua3tt6kl7v7sd558m24fj3s039fhmsxcv9fc49rqn0uwcuelvrmsdp3hwt",
    "jailed": false,
    "status": 2,
    "tokens": "1000000",
    "delegator_shares": "1000000.000000000000000000",
    "description": {
      "moniker": "dan",
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

# 可以看到dan对应的status变成2，此时节点成为活跃验证人，可通过区块浏览器查看出块情况
```
