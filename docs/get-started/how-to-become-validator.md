## 如何运行一个验证人

#### 1. 安装nch
请按照[教程](./how-to-join-alphanet.md)，安装nch

#### 2.创建账号
```
nchcli keys add cpucc
# 按照提示输入加密账号用的密码(后续执行各种交易都需要用该密码)，将命令返回的信息谨慎保存
```

#### 3.导入dev账号
```
# 导入助记词(sky为本地钱包用户名，可自定义)
nchcli keys add sky --recover

# 交互输出如下：
Enter a passphrase to encrypt your key to disk:
<此处会提示输入密码>
<再输入一次密码确认>
> Enter your bip39 mnemonic (此处会等待输入助记词，导入初始账户)

使用下面的助记词：
later orient logic fog car foam awful doctor path iron airport adjust forum course cigar obscure coconut portion today donor lyrics frown clever ticket
```

#### 4.向cpucc账号转账
```
nchcli send --from $(nchcli keys show sky -a) --to $(nchcli keys show cpucc -a) --amount 2000000unch

# 根据交互的提示输入yes，然后输入cpucc账号的密码

# 查询cpucc账号的余额是否是2000000unch
nchcli query account $(nchcli keys show cpucc -a)

确认返回的结果中有如下信息: 
    "coins": [
      {
        "denom": "unch",
        "amount": "2000000"
      }
    ],
```

#### 5.查询当前验证人列表
```
nchcli query staking validators

# 返回类似如下数据，这里可以看到有2个验证人，关注每个验证人的operator_address和status两个字段:

[
  {
    "operator_address": "nchvaloper1fr6fs47m8ns7vl0s4fusxkqq03l489gjndhujl",
    "consensus_pubkey": "nchvalconspub1zcjduepqhzj0ed5867wq5luqw8rhlj590v5msvutd4qgv93nfqv7hjvhgztsmzpq0l",
    "jailed": false,
    "status": 2,
    "tokens": "69100000",
    "delegator_shares": "69100000.000000000000000000",
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
      "update_time": "2019-09-25T08:47:15.300110886Z"
    },
    "min_self_delegation": "100",
    "self_delegation": "68810000.000000000000000000"
  },
  {
    "operator_address": "nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
    "consensus_pubkey": "nchvalconspub1zcjduepqr4h3edr60u0j0fa4pv8z6y6m57uye2g07ehpdrgjjhd0hq0urkeq4p4qf4",
    "jailed": false,
    "status": 2,
    "tokens": "15000000",
    "delegator_shares": "15000000.000000000000000000",
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
      "update_time": "2019-09-25T08:24:52.525067688Z"
    },
    "min_self_delegation": "1",
    "self_delegation": "1000000.000000000000000000"
  }
]
```

#### 6.创建验证人
```
nchcli tx staking create-validator \
  --amount=10000unch \
  --pubkey=$(nchd tendermint show-validator -o text) \
  --moniker="cpucc" \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="100" \
  --from=$(nchcli keys show cpucc -a)
  
  重点关注命令中最后一行--from=$(nchcli keys show cpucc -a)，cpucc对应的账号作为抵押者将成为要创建的验证人
```

#### 7.再次查询验证人列表
```
nchcli query staking validators         

可以发现多了一个moniker为cpucc的验证人

[
  {
    "operator_address": "nchvaloper1fr6fs47m8ns7vl0s4fusxkqq03l489gjndhujl",
    "consensus_pubkey": "nchvalconspub1zcjduepqhzj0ed5867wq5luqw8rhlj590v5msvutd4qgv93nfqv7hjvhgztsmzpq0l",
    "jailed": false,
    "status": 2,
    "tokens": "69100000",
    "delegator_shares": "69100000.000000000000000000",
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
      "update_time": "2019-09-25T08:47:15.300110886Z"
    },
    "min_self_delegation": "100",
    "self_delegation": "68810000.000000000000000000"
  },
  {
    "operator_address": "nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
    "consensus_pubkey": "nchvalconspub1zcjduepqr4h3edr60u0j0fa4pv8z6y6m57uye2g07ehpdrgjjhd0hq0urkeq4p4qf4",
    "jailed": false,
    "status": 2,
    "tokens": "15000000",
    "delegator_shares": "15000000.000000000000000000",
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
      "update_time": "2019-09-25T08:24:52.525067688Z"
    },
    "min_self_delegation": "1",
    "self_delegation": "1000000.000000000000000000"
  },
  {
    "operator_address": "nchvaloper15wgyc7vaydddxn4m3yxlwuylgfcmzy2tpk0x54",
    "consensus_pubkey": "nchvalconspub1zcjduepq7prnt8tul8qk8cqwgeqrgj3hh96n08sf6e37ppxedn2kas2y5h9ql9sfhz",
    "jailed": false,
    "status": 0,
    "tokens": "10000",
    "delegator_shares": "10000.000000000000000000",
    "description": {
      "moniker": "cpucc",
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
      "update_time": "2019-09-27T08:54:49.135022Z"
    },
    "min_self_delegation": "100",
    "self_delegation": "10000.000000000000000000"
  }
]

```

#### 8.让刚创建的验证者出块
step10中成功创建了验证人，此时其状态为0，0表示还没有绑定，因为没有抵押足够的unch;

1000000unch为1个voting power，voting power的最小单位为1，只有它>=1时候才能够变成绑定状态2，才能成为活跃验证者出块，因此至少还需要抵押990000unch

可以用自己的账号给自己抵押，也可以让别的账号给自己的验证者抵押，这里分别展示：

这里需要用到步骤7中cpucc账号对应的验证人地址operator_address: nchvaloper15wgyc7vaydddxn4m3yxlwuylgfcmzy2tpk0x54

##### 8.1 给自己抵押500000unch
```
nchcli tx staking delegate nchvaloper15wgyc7vaydddxn4m3yxlwuylgfcmzy2tpk0x54 500000unch --from $(nchcli keys show cpucc -a)

```
##### 8.2 用别的账号给自己抵押490000unch
```
nchcli tx staking delegate nchvaloper15wgyc7vaydddxn4m3yxlwuylgfcmzy2tpk0x54 490000unch --from $(nchcli keys show sky -a)
```

8.1和8.2唯一不同的--from参数是从哪个账号抵押

#### 9.再次确认验证人状态为活跃验证人
```
nchcli query staking validators


[
  {
    "operator_address": "nchvaloper1fr6fs47m8ns7vl0s4fusxkqq03l489gjndhujl",
    "consensus_pubkey": "nchvalconspub1zcjduepqhzj0ed5867wq5luqw8rhlj590v5msvutd4qgv93nfqv7hjvhgztsmzpq0l",
    "jailed": false,
    "status": 2,
    "tokens": "69100000",
    "delegator_shares": "69100000.000000000000000000",
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
      "update_time": "2019-09-25T08:47:15.300110886Z"
    },
    "min_self_delegation": "100",
    "self_delegation": "68810000.000000000000000000"
  },
  {
    "operator_address": "nchvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
    "consensus_pubkey": "nchvalconspub1zcjduepqr4h3edr60u0j0fa4pv8z6y6m57uye2g07ehpdrgjjhd0hq0urkeq4p4qf4",
    "jailed": false,
    "status": 2,
    "tokens": "15000000",
    "delegator_shares": "15000000.000000000000000000",
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
      "update_time": "2019-09-25T08:24:52.525067688Z"
    },
    "min_self_delegation": "1",
    "self_delegation": "1000000.000000000000000000"
  },
  {
    "operator_address": "nchvaloper15wgyc7vaydddxn4m3yxlwuylgfcmzy2tpk0x54",
    "consensus_pubkey": "nchvalconspub1zcjduepq7prnt8tul8qk8cqwgeqrgj3hh96n08sf6e37ppxedn2kas2y5h9ql9sfhz",
    "jailed": false,
    "status": 2,
    "tokens": "1000000",
    "delegator_shares": "1000000.000000000000000000",
    "description": {
      "moniker": "cpucc",
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
      "update_time": "2019-09-27T08:54:49.135022Z"
    },
    "min_self_delegation": "100",
    "self_delegation": "510000.000000000000000000"
  }
]

# 可以看到cpucc对应的status变成2，此时节点成为活跃验证人，开始出块
```