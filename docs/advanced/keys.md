# 如何使用nchcli命令行导入/导出私钥

## 创建新帐户

使用```nchcli``` 工具创建新帐户

```shell
nchcli keys add <key_name>
```

根据提示，输入钱包密码，得到示例如下输出：

```shell
- name: lucy
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

## 导出私钥文件

```nchcli export``` 可以导出加密格式的私钥

```shell
nchcli keys export <name> [flags]
```

上述命令行导出加密的私钥，类似如下格式：

```
-----BEGIN TENDERMINT PRIVATE KEY-----
salt: F49D9D8EB12849AD84405420E518870B
kdf: bcrypt

pMKOcIxmaPskH6T3/H1cDrrFT7jfJxRb7JsG2Vkc5wiAsJ3Nl2kb3OJtu1lCSYli
gJDlh038lb1X4LhKjqpnEXa7FvsJtLXGXpX1PIY=
=ONle
-----END TENDERMINT PRIVATE KEY-----
```

## 导入私钥文件

```nchcli import``` 可以导入加密的私钥文件

```shell
nchcli keys import <name> <keyfile> [flags]
```

查看已经导入的key

```shell
nchcli keys list
```