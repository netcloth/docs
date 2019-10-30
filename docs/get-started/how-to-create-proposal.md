### 如何发起提案

本文介绍通过nchcli客户端操作提案的方法；本文假设你在运行私链或者devnet，并且有对应区块链的validator在出块；

* 提案的状态迁移: 创建提案-->抵押阶段-->投票阶段-->提案通过/失败
* 创建提案
* 提案抵押
* 提案投票


----

以修改最大验证人数量为例，首先查看当前值max_validators=100:
```
nchcli query staking params

{
  "unbonding_time": "604800000000000",
  "max_validators": 100,
  "max_entries": 7,
  "bond_denom": "unch",
  "max_lever": "20.000000000000000000"
}
```

#### 1.提案提交
##### 执行
```
nchcli tx gov submit-proposal param-change ./prososal.json --from $(nchcli keys show sky -a)

./prososal.json文件的内容如下，该提案是将最大验证人数量max_validators改成101:

{
  "title": "Staking Param Change",
  "description": "Update max validators",
  "changes": [
    {
      "subspace": "staking",
      "key": "MaxValidators",
      "value": 101
    }
  ]
}
```
#### 查询
```
nchcli query gov proposals

[
  {
    "content": {
      "type": "nch/ParameterChangeProposal",
      "value": {
        "title": "Staking Param Change",
        "description": "Update max validators",
        "changes": [
          {
            "subspace": "staking",
            "key": "MaxValidators",
            "value": "101"
          }
        ]
      }
    },
    "id": "1",
    "proposal_status": "DepositPeriod",
    "final_tally_result": {
      "yes": "0",
      "abstain": "0",
      "no": "0",
      "no_with_veto": "0"
    },
    "submit_time": "2019-09-30T09:28:22.951242Z",
    "deposit_end_time": "2019-10-02T09:28:22.951242Z",
    "total_deposit": [],
    "voting_start_time": "0001-01-01T00:00:00Z",
    "voting_end_time": "0001-01-01T00:00:00Z"
  }
]
```

#### 2.提案抵押
此时提案处于抵押阶段，只有对提案抵押一定的token提案才能进入下一阶段投票阶段

##### 执行
```
nchcli tx gov deposit 1 10000000unch --from $(nchcli keys show sky -a)

# nchcli tx gov deposit 提案号 token数量 --from 抵押者的公钥
```
#### 查询
```
nchcli query gov proposals

[
  {
    "content": {
      "type": "nch/ParameterChangeProposal",
      "value": {
        "title": "Staking Param Change",
        "description": "Update max validators",
        "changes": [
          {
            "subspace": "staking",
            "key": "MaxValidators",
            "value": "101"
          }
        ]
      }
    },
    "id": "2",
    "proposal_status": "VotingPeriod",
    "final_tally_result": {
      "yes": "0",
      "abstain": "0",
      "no": "0",
      "no_with_veto": "0"
    },
    "submit_time": "2019-09-30T09:28:22.951242Z",
    "deposit_end_time": "2019-10-02T09:28:22.951242Z",
    "total_deposit": [
      {
        "denom": "unch",
        "amount": "10000000"
      }
    ],
    "voting_start_time": "2019-09-30T09:31:44.461647Z",
    "voting_end_time": "2019-09-30T09:41:44.461647Z"
  }
]

可以得知目前提案处于投票阶段: VotingPeriod
```

#### 3.提案投票
只有提案投票数超过一定的比例提案才会被通过，否则提案被拒绝
##### 执行
```
nchcli tx gov vote 1 yes --from $(nchcli keys show sky -a)
```
#### 查询
投票阶段会一直持续到voting_end_time为止，每个区块间隔都会统计投票，以voting_end_time时间点判定最终的投票结果决定提案是否被通过，例子中的投票时间为10分钟，该参数在区块链第一次启动前在创世文件中修改，如果没有修改默认是2天，也就是投票阶段会持续2天才能确认提案是否被通过
```
# 本例在10分钟后查询提案状态如下：
nchcli query gov proposals
[
  {
    "content": {
      "type": "nch/ParameterChangeProposal",
      "value": {
        "title": "Staking Param Change",
        "description": "Update max validators",
        "changes": [
          {
            "subspace": "staking",
            "key": "MaxValidators",
            "value": "101"
          }
        ]
      }
    },
    "id": "2",
    "proposal_status": "Passed",
    "final_tally_result": {
      "yes": "1000000",
      "abstain": "0",
      "no": "0",
      "no_with_veto": "0"
    },
    "submit_time": "2019-09-30T09:28:22.951242Z",
    "deposit_end_time": "2019-10-02T09:28:22.951242Z",
    "total_deposit": [
      {
        "denom": "unch",
        "amount": "10000000"
      }
    ],
    "voting_start_time": "2019-09-30T09:31:44.461647Z",
    "voting_end_time": "2019-09-30T09:41:44.461647Z"
  }
]

# 确认最大验证人数量是否修改为101
nchcli query staking params

{
  "unbonding_time": "604800000000000",
  "max_validators": 101,
  "max_entries": 7,
  "bond_denom": "unch",
  "max_lever": "20.000000000000000000"
}

```

以上最终最大验证人数量由100修改成101
