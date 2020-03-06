# How to use IPAL

For IPAL related operations, the nchcli tool is required. 
First, an nchd full node needs to be run. Join the testnet, see [here](../get-started/how-to-join-testnet.md)

## 1. IPAL

### Introductions of IPAL
 IP Address List is a unique addressing module of NetCloth network. IPAL records such information of starfish nodes as access point IP, node name, and contact information. By searching IPAL list on the chain, users can filter their favorite starfish nodes and enjoy the service.

<p align="center">
	<img src="https://github.com/netcloth/netcloth/blob/master/images/en/4.png?raw=true" alt="Sample" width = 80% height = 80%>
</p>

In a word. Starfish nodes must upload their information to NetCloth chain ledger via IPAL Claim. After it, users can find nodes in Communication Address List of NetCloth APP.

* IPAL claim

```bash
# usage :
# nchcli ipal claim --from=<user key name> --moniker=<name> --website=<website> --endpoints=<endpoints> --details=<details> --bond=<bond>

nchcli ipal claim --from=nch13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e --moniker=ipaltest  --website=ipaltest.com --details="ipal test" --endpoints "1|192.168.1.100:1000,2|192.168.1.200:2000" --bond=1400000pnch
```

* Querying the IPAL List

```bash
# usage
# nchcli query ipal list

nchcli query ipal ipal
```

response:

```bash
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
      "denom": "pnch",
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
      "denom": "pnch",
      "amount": "1400000"
    }
  }
]

```

* Query IPAL

```bash
# usage
# nchcli query ipal node <node_address>

nchcli query ipal node nch196mwu4e5l86t73rhw690xkfdagx6lkmkrxpsta
```

response:

```bash
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
    "denom": "pnch",
    "amount": "1400000"
  }
}
```

Once succeeded, you could find you node on NetCloth APP.
[Click Here to Download](http://chat-app.netcloth.org)

## 2. CIPAL

### Introduction of CIPAL
The Client IP Address List (C-IPAL) protocol is an extension of IPAL, facing for client users. Submitting an address through C-IPAL is required by users with a need of enjoying various services. 

The specific procedures are here:

```javascript
a) A user send CIPAL Claim to the starfish node he/she connected on NetCloth APP

b) The starfish node receive the CIPAL Claim body from the user.

c) The starfish node add its NCH Address, create a new transaction with its sign.

d) The starfish node broadcast the Tx to other blockchain nodes.

e) Validators validate the CIPAL Claim, then update it to NetCloth chain ledger via a new block.
```

<p align="center">
	<img src="https://github.com/netcloth/netcloth/blob/master/images/en/5.png?raw=true" alt="Sample" width = 80% height = 80%>
</p>

* claim

```bash
# usage
# nchcli cipal claim --user=<user key name> --proxy=<proxy address> --service_address=<service address> --service_type=<service type>

nchcli cipal claim --user cipaltest --proxy nch1f2h4shfaugqgmryg9wxjyu8ehhddc5yuh0t0fw --service_type 1 --service_address nch196mwu4e5l86t73rhw690xkfdagx6lkmkrxpsta
```

* query

```bash
# usage
# nchcli query cipal query_cipal <user-address>
nchcli query cipal query_cipal nch1g3wacwwjl89apn2yplgjtalz8ss05adx4vg2q4
```

response:

```bash
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

* CIPAL Tx fees

CIPAL is a special tx type. The starfish node will pay the tx fees instead of users. Please ensure you having enough NCH in you balance.