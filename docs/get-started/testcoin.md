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

