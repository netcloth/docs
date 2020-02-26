# 如何使用nchcli命令行导入/导出私钥

## 导出私钥

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

## 导入私钥

```nchcli import``` 可以导入加密的私钥文件

```
nchcli keys import <name> <keyfile> [flags]
```

查看已经导入的key

```
nchcli keys list
```