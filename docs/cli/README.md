# 转账

## * 查询转账前余额

```bash
nchcli query account nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm
```

response:

```json
{
  "type": "nch/Account",
  "value": {
    "address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "coins": [
      {
        "denom": "pnch",
        "amount": "100000000"
      }
    ],
    "public_key": null,
    "account_number": "1",
    "sequence": "0"
  }
}

```bash
nchcli query account nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7
```

帐户不存在：
```json
ERROR: {"codespace":"sdk","code":9,"message":"account nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7 does not exist"}
```

## * 转账

```bash
nchcli send --from nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --to nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7 --amount 10pnch

或者
nchcli send --from $(nchcli keys show alice -a) --to $(nchcli keys show lucy -a) --amount 10pnch
```

## * 查询转账后余额

```bash
nchcli query account nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm
或者
nchcli query account $(nchcli keys show alice -a)


{
  "type": "nch/Account",
  "value": {
    "address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "coins": [
      {
        "denom": "pnch",
        "amount": "99999990"
      }
    ],
    "public_key": {
      "type": "tendermint/PubKeySecp256k1",
      "value": "A3MzhC3AHSdUw1UyNLLnrXcpvaAT+yNKOGbAjOvlZ8B5"
    },
    "account_number": "1",
    "sequence": "1"
  }
}

nchcli query account nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7
或者
nchcli query account $(nchcli keys show lucy -a)

{
  "type": "nch/Account",
  "value": {
    "address": "nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7",
    "coins": [
      {
        "denom": "pnch",
        "amount": "10"
      }
    ],
    "public_key": null,
    "account_number": "8",
    "sequence": "0"
  }
}
```
