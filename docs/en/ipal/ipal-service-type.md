# Introduction of IPAL Service Type
In IPAL, we define a service type numbering table to define each type of service.

Below we will introduce the commonly used Service Type and usage.

| Service Type | Description | Examples |
| ------------- | ------------------------- | ------------------------------------- |
| `1` | Type 1 for Single chat  | ```{ "type": "1", "endpoint": "http://192.168.100.1"}``` |
| `2` | Type 2 for group chat | ```{ "type": "2", "endpoint": "http://192.168.100.1"}```    |
| `3` | Type 3 for Mini App Portal  | ```{ "type": "3", "endpoint": "http://192.168.100.1"}```    |
| `4` |Type 4 for IPs or domains of Mini Apps  |   ```{"type":"4","endpoint":"{\"miniAppDomains\":[{\"moniker\":\"NetCloth Blog\",\"domain\":\"https://blog.netcloth.org\"}]}" }```  |

For full IPAL Service Type Lists [Click here](https://github.com/netcloth/NIPs/blob/master/nip-001.md)

## Service Type usage example:

**Declare a starfish node with chat feature**:
```bash
nchcli ipal claim --from=$(nchcli keys show -a alice) \
--moniker=netcloth \
--website="www.netcloth.org" \
--endpoints="1|http://219.22.22.22" \
--details="netcloth official server endpoint" \
--bond=100000000000000000pnch \
--gas 200000
```

**Declare a starfish node with chat and Mini app portal features**:

```bash
nchcli ipal claim --from=$(nchcli keys show -a alice) \
--moniker=netcloth \
--website="www.netcloth.org" \
--endpoints="1|http://219.22.22.22,3|http://219.22.22.23" \
--details="netcloth official server endpoint" \
--bond=100000000000000000pnch
```

**Declare a starfish node with chat,Mini app portal and IPs or domains of Apps features**

```bash
nchcli ipal claim --from=$(nchcli keys show -a alice) \
--moniker=netcloth \
--website="www.netcloth.org" \
--details="netcloth official server endpoint" \
--endpoints "1|http://47.104.248.183+++3|http://47.90.5.138+++4|{\"miniAppDomains\":[{\"moniker\":\"NetCloth Blog\",\"domain\":\"https://blog.netcloth.org\"},{\"moniker\":\"链闻社\",\"domain\":\"https://www.chainnews.com/\"},{\"moniker\":\"非小号\",\"domain\":\"https://feixiaohao.com\"},{\"moniker\":\"金财快讯\",\"domain\":\"https://m.jinse.com/lives\"},{\"moniker\":\"NetCloth Blog\",\"domain\":\"https://medium.com/@NetCloth/\"},{\"moniker\":\"Coindesk\",\"domain\":\"https://www.coindesk.com\"},{\"moniker\":\"Coinmarketcap\",\"domain\":\"https://www.coinmarketcap.com \"}]}" \
--bond=1000000000000000pnch \
--endpoint_delimiter "+++" \
--endpoint_type_delimiter "|"
```

We use --endpoint_delimiter and --endpoint_type_delimiter in nchcli. (Now the latest release of nchcli v1.0.9 is unavailable. You need clone the source code from developer brench then compile nchcli manually)

::: warning

When using nchcli for IPAL claim. You need use "|" to seperate between Service Type endpoint. Using "," to seperate multiple endpoints in endpoint column.

Endpoints is a json string, it may have conflicts with default separation character "|" or ",". If it happens, you can use ----endpoint_delimiter to set separation character between endpoints and --endpoint_type_delimiter between Type and endpoints.

:::



For more information about IPAL, [click here](./ipal.md)