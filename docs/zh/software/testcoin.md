## 自动申领内测token

### 创建新钱包地址：

#### * 设置nchcli命令行环境 
```
# nchcli
# Configure your CLI to eliminate need for chain-id flag
nchcli config chain-id nch-alphanet
nchcli config output json
nchcli config indent true
nchcli config trust-node true
```

#### * 创建新钱包地址 
```
# 创建地址
nchcli keys add dan

#根据提示，输入钱包密码，得到如下输出：

Enter a passphrase to encrypt your key to disk:
Repeat the passphrase:

- name: dan
  type: local
  address: nch1p3fuppcxud5rjsaywuyuguh6achmj5p0r6z6ve
  pubkey: nchpub1addwnpepqg8mfc6t9eaw9lal0c4tzma5vgmqzkgszwcgljcz3sy8rd2rukgxz9dtmph
  mnemonic: ""
  threshold: 0
  pubkeys: []



**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.
# 下面的即助记词
connect plug cigar purchase inflict enroll ten limb quantum never supply grid home case process claw truly grape federal liberty tree remove side quantum
```

内测链token申请地址：https://explorer.netcloth.org/nch/get_token?<你的钱包地址>

### 7. 转账


#### * 查询转账前余额
```
nchcli query account nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm
{
  "type": "nch/Account",
  "value": {
    "address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "coins": [
      {
        "denom": "unch",
        "amount": "100000000"
      }
    ],
    "public_key": null,
    "account_number": "1",
    "sequence": "0"
  }
}

nchcli query account nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7
ERROR: {"codespace":"sdk","code":9,"message":"account nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7 does not exist"}`
```

#### * 转账
```
nchcli send --from nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --to nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7 --amount 10unch

或者
nchcli send --from $(nchcli keys show alice -a) --to $(nchcli keys show dan -a) --amount 10unch
```

#### * 查询转账后余额
```
nchcli query account nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm
或者
nchcli query account $(nchcli keys show alice -a)


{
  "type": "nch/Account",
  "value": {
    "address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "coins": [
      {
        "denom": "unch",
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
nchcli query account $(nchcli keys show dan -a)

{
  "type": "nch/Account",
  "value": {
    "address": "nch19gs3mav6jtln6clwfneg296shz09xtcun2pjw7",
    "coins": [
      {
        "denom": "unch",
        "amount": "10"
      }
    ],
    "public_key": null,
    "account_number": "8",
    "sequence": "0"
  }
}
```
