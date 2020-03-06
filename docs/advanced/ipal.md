# IPAL使用

IPAL相关操作，需要 nchcli工具，首先需要跑一个nchd节点。 加入测试网，参考[这里](../get-started/how-to-join-testnet.md)

## 1. IPAL

### IPAL介绍
IP Address List 是NetCloth网络特有的寻址模块，IPAL记录的是海星节点的信息，包括接入点IP、节点名、联系方式等信息。用户可以通过链上查找IPAL列表，筛选自己喜欢的海星节点并使用服务。

简而言之，节点需要通过IPAL将相关信息提交至区块链，用户才可以在NetCloth APP的通讯地址列表里看到节点。

<p align="center">
	<img src="https://github.com/netcloth/netcloth/blob/master/images/4.png?raw=true" alt="Sample" width = 80% height = 80%>
</p>

* 声明IPAL

```bash
# usage :
nchcli ipal claim --from=<from key> --moniker=<moniker> --website=<website> --endpoints=<endpoints> --details=<details> --bond=<bond coins>

#举例
nchcli ipal claim --from=$(nchcli keys show -a alice) --moniker=netcloth --website="www.netcloth.org" --endpoints="1|http://219.22.22.22:8899,2|http//221.11.11.11:9999" --details="netcloth official server endpoint" --bond=100000000000000000pnch
```

其中：

- <font color=red>Monikor：</font>海星节点的名称

- font color=red>website（选填）：</font>节点的官网

- <font color=red>endpoints：:</font>IM服务端的公网IP（如何搭建IM服务端，详见[这里](../im/README.md))

- <font color=red>details（选填）：:</font>节点的介绍

- <font color=red>bond：</font>抵押NCH的数量，抵押量越高，在NetCloth APP节点列表检索中排名越靠前

* 查询IPAL列表

```bash
# usage
# nchcli query ipal list
```

response:

```json
[[
  {
    "operator_address": "nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e",
    "moniker": "netcloth",
    "website": "www.netcloth.org",
    "details": "netcloth official server endpoint",
    "endpoints": [
      {
        "type": "1",
        "endpoint": "219.22.22.22:8899"
      },
      {
        "type": "2",
        "endpoint": "221.11.11.11:9999"
      }
    ],
    "bond": {
      "denom": "pnch",
      "amount": "100000000000000000"
    }
  }
]

```

* 查询IPAL

```bash
# usage
# nchcli query ipal node <node_address>

nchcli query ipal node nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e
```

response:

```json
{
  "operator_address": "nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e",
  "moniker": "netcloth",
  "website": "www.netcloth.org",
  "details": "netcloth official server endpoint",
  "endpoints": [
    {
      "type": "1",
      "endpoint": "219.22.22.22:8899"
    },
    {
      "type": "2",
      "endpoint": "221.11.11.11:9999"
    }
  ],
  "bond": {
    "denom": "pnch",
    "amount": "100000000000000000"
  }
}
```

IPAL声明成功后，你可以在NetCloth APP中看到自己的节点了。[点此下载APP](http://chat-app.netcloth.org)

## 2. CIPAL

### CIPAL介绍

C-IPAL（Client IP Address List）协议是IPAL的一种扩展，面向客户端用户。用户使用各类服务均需要通过C-IPAL申明地址。

具体的实现流程为：用户在NetCloth APP端向连接的节点发送CIPAL申明交易-->用户所连的海星节点收到用户的CIPAL消息体-->海星节点将消息体加上自己的地址，并签名构建新的交易-->将CIPAL交易广播至区块链节点-->验证人打包CIPAL交易，上链。

<p align="center">
	<img src="https://github.com/netcloth/netcloth/blob/master/images/5.png?raw=true" alt="Sample" width = 80% height = 80%>
</p>

* 声明

```bash
# usage
# nchcli cipal claim --user=<user key name> --proxy=<proxy address> --service_address=<service address> --service_type=<service type>

nchcli cipal claim --proxy=$(nchcli keys show -a alice) --service_address="219.22.22.22:8899" --service_type=1 --user=$(nchcli keys show -a jack)
```

* 查询

```bash
# usage
# nchcli query cipal query_cipal <user-address>
nchcli query cipal query_cipal nch1g3wacwwjl89apn2yplgjtalz8ss05adx4vg2q4
```

response:

```json
{
  "user_address": "nch1g3wacwwjl89apn2yplgjtalz8ss05adx4vg2q4",
  "service_infos": [
    {
      "type": "1",
      "address": "nch196mwu4e5l86t73rhw690xkfdagx6lkmkrxpsta"
    }
  ]
}
```

* CIPAL手续费

CIPAL是一类特殊的交易，需要海星节点为用户支付交易手续费，请保证账户有足够的余额用于支付手续费。 

关于手续费，点击[这里](../advanced/Q&A.md#交易手续费)