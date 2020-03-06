# How to create a proposal

This article describes how to operate proposals with the nchcli client. This article assumes that you are running a private chain or devnet, and there is a validator corresponding to the blockchain;

* Proposal status transition: Create Proposal-> Delegate Phase-> Voting Phase-> Proposal Pass / Fail
* Create proposal
* Proposal delegation
* Proposal voting

----

Take modifying the maximum number of validators as an example, first check the current value max_validators = 100:

```bash
nchcli query staking params

{
  "unbonding_time": "604800000000000",
  "max_validators": 100,
  "max_entries": 7,
  "bond_denom": "pnch",
  "max_lever": "20.000000000000000000"
}
```

## 1.Proposal submission

* submit a proposal
  
```bash
nchcli tx gov submit-proposal param-change ./prososal.json --from $(nchcli keys show sky -a)

# The content of the file is to change the maximum number of validators max_validators to 101:

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

* query proposal
  
```bash
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

## 2.Proposal delegation

At this point the proposal is in the delegate phase. Only proposals with a certain delegations can enter the next voting stage

* delegate a proposal
  
```bash
nchcli tx gov deposit 1 10000000pnch --from $(nchcli keys show sky -a)

```

* query proposal

```bash
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
        "denom": "pnch",
        "amount": "10000000"
      }
    ],
    "voting_start_time": "2019-09-30T09:31:44.461647Z",
    "voting_end_time": "2019-09-30T09:41:44.461647Z"
  }
]

# It can be seen that the current proposal is in the voting stage: VotingPeriod
```

## 3.Proposal voting

The proposal will be approved only if the number of votes in the proposal exceeds a certain percentage, otherwise the proposal will be rejected

* vote a proposal
  
```bash
nchcli tx gov vote 1 yes --from $(nchcli keys show sky -a)
```

* query a proposal

```bash
# In this example, the query status of the proposal after 10 minutes is as follows:
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
        "denom": "pnch",
        "amount": "10000000"
      }
    ],
    "voting_start_time": "2019-09-30T09:31:44.461647Z",
    "voting_end_time": "2019-09-30T09:41:44.461647Z"
  }
]

# Confirm whether the maximum number of validators is changed to 101
nchcli query staking params

{
  "unbonding_time": "604800000000000",
  "max_validators": 101,
  "max_entries": 7,
  "bond_denom": "pnch",
  "max_lever": "20.000000000000000000"
}
```

The above final maximum number of validators was changed from 100 to 101
