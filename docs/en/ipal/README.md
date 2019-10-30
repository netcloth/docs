## IPAL Instructions

### 1. IPAL claim

* claim

```cassandraql
# usage :
# nchcli ipal claim  --user=<user key name> --proxy=<proxy key name> --ip=<server ip>

nchcli ipal claim --user nch13850ev9txukgjk5v42dsaey3ww7sjudtujsu6f --proxy nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --ip "192.168.1.110"
```


* query

```cassandraql
# usage
# nchcli query ipal ipal <user-address>

nchcli query ipal ipal nch13850ev9txukgjk5v42dsaey3ww7sjudtujsu6f
```

response:
```
{
  "user_address": "nch13850ev9txukgjk5v42dsaey3ww7sjudtujsu6f",
  "server_ip": "192.168.1.110"
}

```

### 2. ServiceNode claim

* claim

```cassandraql
# usage
# nchcli aipal claim--from=<user key name> --moniker=<name> --website=<website> --server=<server_endpoint> --details=<details> --service_type=<uint64> --bond=<bond tokens>

nchcli aipal claim  --from=nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --moniker="nch-server-node-moniker"  --website="http://website.com/server" --server="192.168.1.111:25559" --details="server node details" --bond 1000000unch
```

* query

query all the servicenodes
```cassandraql
nchcli query aipal servicenodes
```

response:
```cassandraql
[
  {
    "operator_address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "moniker": "nch-server-node-moniker",
    "website": "http://website.com/server",
    "service_type": "1",
    "server_endpoint": "192.168.1.111:25559",
    "details": "server node details",
    "bond": {
      "denom": "unch",
      "amount": "1000000"
    }
  }
]
```
