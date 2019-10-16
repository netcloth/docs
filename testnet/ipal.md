## IPAL使用

IPAL相关操作，需要 nchcli工具，首先需要跑一个nchd节点。 加入测试网，参考[这里](internal-testnet.md)

### 1. IPAL声明

* 声明

```cassandraql
# usage :
# nchcli ipal claim  --user=<user key name> --proxy=<proxy key name> --ip=<server ip>

nchcli ipal claim --user nch13850ev9txukgjk5v42dsaey3ww7sjudtujsu6f --proxy nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --ip "192.168.1.110"
```


* 查询

根据用户地址，查询对应的ipal列表

```cassandraql
# usage
# nchcli query ipal <user-address>

nchcli query ipal nch13850ev9txukgjk5v42dsaey3ww7sjudtujsu6f
```

response:
```
{
  "user_address": "nch13850ev9txukgjk5v42dsaey3ww7sjudtujsu6f",
  "server_ip": "192.168.1.110"
}

```

### 2. 服务节点声明

* 声明

声明服务节点信息
```cassandraql
# usage
# nchcli ipal server-node-claim  --from=<user key name> --moniker=<name> --identity=<identity> --website=<website> --server=<server_endpoint> --details=<details>

nchcli ipal server-node-claim  --from=nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --moniker="nch-server-node-moniker --identity="nch-server-node-identity --website="http://website.com/server" --server=192.168.1.111:25559 --details="server node details" 

```

* 查询

查询所有的服务节点声明
```cassandraql
nchcli query server-nodes
```
response:
```cassandraql
[
  {
    "operator_address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "moniker": "nch-server-node-moniker --identity=nch-server-node-identity",
    "identity": "",
    "website": "http://website.com/server",
    "server_endpoint": "192.168.1.111:25559",
    "details": "server node details"
  }
]
```
