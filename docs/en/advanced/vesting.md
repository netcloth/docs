# Vesting Account

It is used to add an initial account to the genesis file. After the blockchain network is started, some or all of the account balance will be frozen for a certain period of time before it is released. The system will automatically calculate when using assets such as transfers or mortgages. There is no need to initiate the release. There are two vesting strategy.

## How to use

```bash
nchd add-genesis-account nch1402zhyzws3r9zgm9umlc5fxnmjxjmhgeaj7s4k <total amount of coins> --vesting-amount <amount of coins for vesting accounts> --vesting-start-time <epoch timestap> --vesting-end-time <epoch timestap>
```

```text
      --vesting-end-time uint     schedule end time (unix epoch) for vesting accounts
      --vesting-start-time uint   schedule start time (unix epoch) for vesting accounts
```

## Vesting policy
 
### with vesting-start-time

```bash
nchd add-genesis-account nch1402zhyzws3r9zgm9umlc5fxnmjxjmhgeaj7s4k 3000000000000000pnch --vesting-amount 2000000000000000pnch --vesting-start-time 1592279100 --vesting-end-time 1592279700
```

### without vesting-start-time

vesting from current time


```bash
nchd add-genesis-account nch1402zhyzws3r9zgm9umlc5fxnmjxjmhgeaj7s4k 3000000000000000pnch --vesting-amount 2000000000000000pnch --vesting-end-time 1592279700
```
