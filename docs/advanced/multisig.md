# 多签账户教程

## 创建多签账号

如下创建一个包含3个子账号的多重签名账号，且指定最小签名数为2。只有交易签名数大于等于2时，该交易才会在网络中被广播。

```bash
# 用法
nchcli keys add <multisig-key-name>  --multisig-threshold=2 \
--multisig=<sub-key-name-1>,<sub-key-name-2>,<sub-key-name-3>

# 示例, 创建一个多签账号mm,指定3个子账号分别为本地的alice,bob,dan，指定最小签名数为2
nchcli keys add mm --multisig-threshold=2 --multisig=alice,bob,dan
```

:::warning 建议
如果没有子账户的私钥，你需要先收集到子账户的公钥，通过
```nchcli keys add <key-name> --pubkey```
导入pubkeys，创建offline密钥。

:::

查看创建好的多签账号

```bash
# 用法
nchcli keys show <multisig-key-name>

# 示例，查看帐户mm:
nchcli keys show mm
```

## 用多签账户创建离线交易

从多签账户，创建一个离线的转账交易

```bash
# 用法
# 创建从多签账户转账到alice账户的离线交易
nchcli send --to=$(nchcli keys show alice -a) \
--amount=10unch --gas-prices=1.0unch  \
--from=$(nchcli keys show <multisig-key-name> -a) \
--generate-only

# 示例，从mm多签账户转账10unch到alice账户的离线交易，数量10unch，gas价格1.0unch, 
# 交易消息体保存到unsigned.json文件
nchcli send --to=$(nchcli keys show alice -a) \
--amount=10unch --gas-prices=1.0unch  \
--from=$(nchcli keys show mm -a) \
--generate-only > unsigned.json
```

## 签名多签交易

上述的mm多签账户，最小交易签名数为2， 需要使用2个以上子账户对离线交易消息 unsigned.json进行签名。

示例中的3个子账户分别为alice,bob,dan，我们先使用子账户alice签名，签名信息保存至signed-1.json

```bash
nchcli tx sign unsigned.json --from $(nchcli keys show alice -a) \
--multisig=$(nchcli keys show mm -a) --signature-only > signed-1.json
```

再使用子账户bob签名，签名信息保存至signed-2.json

```bash
nchcli tx sign unsigned.json --from $(nchcli keys show bob -a) \
--multisig=$(nchcli keys show mm -a) --signature-only > signed-2.json
```

此时交易签名数已经为2，满足mm帐户预设的阈值2。 执行如下命令，将离线交易unsigned.json，和signed-1.json、signed-2.json签名合并

```bash
# 将离线交易unsigned.json，和signed-1.json、signed-2.json签名签名合并到signed.json文件
nchcli tx multisign unsigned.json mm signed-1.json signed-2.json > signed.json
```

## 广播离线交易

使用如下命令，将离线交易signed.json广播到网络

```bash
nchcli tx broadcast signed.json
```