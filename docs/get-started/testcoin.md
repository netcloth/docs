# 如何申领内测token

## 创建新账户

如果你已经有账户，可跳过此步骤。

如果没有账户，可以使用```nchcli``` 按如下操作，创建一个新账户：

```shell
nchcli keys add <key_name>
```

根据提示，输入钱包密码，得到示例如下输出：

```shell
- name: dan
  type: local
  address: nch1p3fuppcxud5rjsaywuyuguh6achmj5p0r6z6ve  // 地址
  pubkey: nchpub1addwnpepqg8mfc6t9eaw9lal0c4tzma5vgmqzkgszwcgljcz3sy8rd2rukgxz9dtmph  // 公钥
  mnemonic: "" 
  threshold: 0
  pubkeys: []

**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.
# 下面的即助记词
connect plug cigar purchase inflict enroll ten limb quantum never supply grid home case process claw truly grape federal liberty tree remove side quantum
```

其中助记词可用来恢复账户，恢复账户的命令是：

```shell
nchcli keys add <key_name> --recover
```

## 申领内测token

水龙头地址： ```https://docs.netcloth.org/nch/get_token?<address>```  
浏览器访问该地址，将```<address>```替换为你的钱包地址即可获得内测token
