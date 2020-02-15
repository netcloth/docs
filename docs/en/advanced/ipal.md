# How to use IPAL

For IPAL related operations, the nchcli tool is required. 
First, an nchd full node needs to be run. Join the testnet, see [here](../get-started/how-to-join-testnet.md)

## 1. IPAL

* IPAL claim

```shell
# usage :
# nchcli ipal claim --from=<user key name> --moniker=<name> --website=<website> --endpoints=<endpoints> --details=<details> --bond=<bond>

nchcli ipal claim --from=ipaltest --moniker=ipaltest  --website=ipaltest.com --details="ipal test" --endpoints "1|192.168.1.100:1000,2|192.168.1.200:2000" --bond=1400000unch
```

* Querying the IPAL List

```shell
# usage
# nchcli query ipal list

nchcli query ipal ipal
```

response:

```shell
[
  {
    "operator_address": "nch196mwu4e5l86t73rhw690xkfdagx6lkmkrxpsta",
    "moniker": "ipaltest",
    "website": "ipaltest.com",
    "details": "ipal test",
    "endpoints": [
      {
        "type": "1",
        "endpoint": "192.168.1.100:1000"
      },
      {
        "type": "2",
        "endpoint": "192.168.1.200:2000"
      }
    ],
    "bond": {
      "denom": "unch",
      "amount": "1400000"
    }
  },
  {
    "operator_address": "nch1f2h4shfaugqgmryg9wxjyu8ehhddc5yuh0t0fw",
    "moniker": "sky",
    "website": "sky.com",
    "details": "sky test",
    "endpoints": [
      {
        "type": "1",
        "endpoint": "192.168.2.100:1000"
      },
      {
        "type": "2",
        "endpoint": "192.168.2.200:2000"
      }
    ],
    "bond": {
      "denom": "unch",
      "amount": "1400000"
    }
  }
]

```

* Query IPAL

```shell
# usage
# nchcli query ipal node <node_address>

nchcli query ipal node nch196mwu4e5l86t73rhw690xkfdagx6lkmkrxpsta
```

response:

```shell
{
  "operator_address": "nch196mwu4e5l86t73rhw690xkfdagx6lkmkrxpsta",
  "moniker": "ipaltest",
  "website": "ipaltest.com",
  "details": "ipal test",
  "endpoints": [
    {
      "type": "1",
      "endpoint": "192.168.1.100:1000"
    },
    {
      "type": "2",
      "endpoint": "192.168.1.200:2000"
    }
  ],
  "bond": {
    "denom": "unch",
    "amount": "1400000"
  }
}

```

## 2. CIPAL

* claim

```shell
# usage
# nchcli cipal claim --user=<user key name> --proxy=<proxy address> --service_address=<service address> --service_type=<service type>

nchcli cipal claim --user cipaltest --proxy nch1f2h4shfaugqgmryg9wxjyu8ehhddc5yuh0t0fw --service_type 1 --service_address nch196mwu4e5l86t73rhw690xkfdagx6lkmkrxpsta
```

* query

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
