# 如何运行一个验证人

NetCloth区块链网络需要一组验证人来维护网络的安全。 验证人的主要作用是通过参与网络共识，收集网络中的交易并打包新区块，以获得网络出块激励。
此外，验证人还将通过提案投票的形式参与链上治理，节点的投票权取决于其总魅力押token数量。

验证人节点的抵押分2部分：自身抵押 和 用户抵押， 其中 自身抵押:用户抵押 比例不能小于 1/20。（如一个验证人自身抵押20NCH，用户最多可向其抵押380NCH，总抵押量不可超过400NCH）

验证人离线不能正常工作，或者参与恶意投票，将会受到对应的惩罚。（验证人会被强制离线，同时所抵押的NCH部分会被Slush）

## 1. 安装并部署全节点

请首先按照[教程](./how-to-join-testnet.md)，部署测试网的全节点，并且确保同步到了最新区块高度。

## 2. 设置nchcli环境变量

``` bash
nchcli config chain-id nch-testnet
nchcli config output json
nchcli config indent true
nchcli config trust-node true
```

## 3.创建账号

```shell
# 示例 <> 中的内容需要根据情况替换，后面不再提示

nchcli keys add <key_name>
# 按照提示输入加密账号用的密码(后续执行各种交易都需要用该密码)，将命令返回的信息谨慎保存
```

## 4. 获得测试token

获得测试token， 请参照[这里](./testcoin.md)

## 5.创建验证人

```shell

nchcli tx staking create-validator \
  --amount=10000000000pnch \
  --pubkey=$(nchd tendermint show-validator -o text) \
  --moniker=<validator_name> \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="100" \
  --from=$(nchcli keys show -a <key_name>) \
  --ip=<node_public_ip>
  --gas=200000
```

上述命令创建验证人，```--moniker``` 指定了验证人节点名称, ```--amount```指定了初始抵押token数量, 其中 ```1 nch = 1000 000 000 000 pnch```， 1 nch为 1个投票权(voting power)，抵押token数量至少需要 1 nch才能参与共识。

## 6.查询验证人列表

```shell
nchcli query staking validators

可以发现列表中新增加的验证人lucy

[
  {
    "operator_address": "nchvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e",
    "consensus_pubkey": "nchvalconspub1zcjduepqua3tt6kl7v7sd558m24fj3s039fhmsxcv9fc49rqn0uwcuelvrmsdp3hwt",
    "jailed": false,
    "status": 0,
    "tokens": "10000",
    "delegator_shares": "10000000000.000000000000000000",
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
    "self_delegation": "10000000000.000000000000000000"
  }
]

```

## 7.让刚创建的验证者出块

step5创建了验证人，此时其状态为0，0表示还没有绑定，因为没有抵押足够的pnch;（p表示pico 1p=10<sup>-12</sup>）
1000000000000pnch为1个voting power，voting power的最小单位为1，只有它>=1时候才能够变成绑定状态2，才能成为活跃验证者出块，因此至少还需要抵押990000000000pnch

可以用自己的账号给自己抵押，也可以让别的账号给自己的验证者抵押，这里分别展示：

这里需要用到步骤4中lucy账号对应的验证人地址operator_address: nchvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e

### 7.1 抵押990000000000pnch

```shell
nchcli tx staking delegate <address-validator-operator> 990000000000pnch --from=<key name>

e.g.:
nchcli tx staking delegate nchvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e 990000000000pnch --from=$(nchcli keys show -a <key name>)

```

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
    "delegator_shares": "1000000000000.000000000000000000",
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
    "self_delegation": "510000000000.000000000000000000"
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

# 可以看到新增加验证人lucy的status变成2，成为活跃验证人，可通过区块浏览器查看出块情况
```

## 9. 关于验证人出块奖励和离线惩罚

验证人长期在线并参与网络共识，会得到对应比例的奖励。出块奖励取决于网络每年的通胀系统和当前验证人总质押toke的比重。


针对活跃验证的人异常行为，区块链网络会将其设置为jail状态，并削减一定比例的质押token。异常行为主要有2种：

#### 1. 长时间不参与网络共识

在固定时间窗口```signed_blocks_window```内，验证人的缺块数目比例大于```min_signed_per_window```，则以```slash_fraction_downtime```比例惩罚验证人的绑定的token,并将其置为jail状态。直到jail时间超过```downtime_jail_duration```，才能通过unjail命令解除jail。

默认参数如下:

```
signed_blocks_window: 10000
min_signed_per_window: 50%
slash_fraction_downtime: 0.05%
downtime_jail_duration: 2天
```

#### 2. 恶意投票

共识过程中发起相互矛盾的投票, 即验证人对同一高度同一Round区块进行不同签名。

双签的惩罚默认参数:
```
slash_fraction_double_sign:0.5 %
```