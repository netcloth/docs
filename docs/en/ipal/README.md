## IPAL Instructions

### 1. CIPAL claim

* claim

```bash
# usage :
# nchcli cipal claim  --user=<user key name> --proxy=<proxy key name> --service_address=<service_address> --service_type=<type> 

#For example
nchcli cipal claim --from=$(nchcli keys show -a jack) --proxy=$(nchcli keys show -a alice) --service_address="1|http://219.22.22.22:8899" --service_type=1 --user=$(nchcli keys show -a jack)
```

Monikor:Node's Name

<font color=red>website（Optional）</font> Official website of your node

<font color=red>endpoints：</font> The public IP of IM sever（How to deploy an IM Sever，[Click here](../im/README.md))

<font color=red>details（Optional):</font>Introduction of your node.

<font color=red>bond:</font> The number of NCH as your collateral, the more NCH you bonded, the higher ranking of your node showing on NetCloth APP



* query

```bash
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

After the success of IPAL Claim，You can find your node on NetCloth APP. [Click here to Download](http://chat-app.netcloth.org)

### 2. ServiceNode claim

* claim

```bash
# usage
# nchcli aipal claim--from=<user key name> --moniker=<name> --website=<website> --server=<server_endpoint> --details=<details> --service_type=<uint64> --bond=<bond tokens>

nchcli aipal claim  --from=nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --moniker="nch-server-node-moniker"  --website="http://website.com/server" --server="192.168.1.111:25559" --details="server node details" --bond 1000000pnch
```

* query

query all the servicenodes
```bash
nchcli query aipal servicenodes
```

response:
```json
[
  {
    "operator_address": "nch13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "moniker": "nch-server-node-moniker",
    "website": "http://website.com/server",
    "service_type": "1",
    "server_endpoint": "192.168.1.111:25559",
    "details": "server node details",
    "bond": {
      "denom": "pnch",
      "amount": "1000000"
    }
  }
]
```
