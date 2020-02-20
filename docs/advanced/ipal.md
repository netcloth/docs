# IPAL使用

IPAL相关操作，需要 nchcli工具，首先需要跑一个nchd节点。 加入测试网，参考[这里](../get-started/how-to-join-testnet.md)

## 1. IPAL

* 声明IPAL

```shell
# usage :
nchcli ipal claim --from=<from key> --moniker=<moniker> --website=<website> --endpoints=<endpoints> --details=<details> --bond=<bond coins>

nchcli ipal claim --from=$(nchcli keys show -a alice) --moniker=netcloth --website="www.netcloth.org" --endpoints="1|219.22.22.22:8899,2|221.11.11.11:9999" --details="netcloth official server endpoint" --bond=100000000000000000pnch
```

* 查询IPAL列表

```shell
# usage
# nchcli query ipal list
```

response:

```shell
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

```shell
# usage
# nchcli query ipal node <node_address>

nchcli query ipal node nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e
```

response:

```shell
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

## 2. CIPAL

* 声明

```shell
# usage
# nchcli cipal claim --user=<user key name> --proxy=<proxy address> --service_address=<service address> --service_type=<service type>

nchcli cipal claim --proxy=$(nchcli keys show -a alice) --service_address="219.22.22.22:8899" --service_type=1 --user=$(nchcli keys show -a jack)
```

* 查询

```shell
# usage
# nchcli query cipal query_cipal <user-address>
nchcli query cipal query_cipal nch1g3wacwwjl89apn2yplgjtalz8ss05adx4vg2q4
```

response:

```shell
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
