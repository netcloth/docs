# Node RPC

Default port of Node RPC is 25567， and you can modify it with cmd opts ```--rpc.laddr=tcp://127.0.0.1:26657``` or config file.

## Info

### /block

```bash
curl http://127.0.0.1:26657/block?height={height}
```

### Get block at a specified height

```bash
curl http://127.0.0.1:26657/block_by_hash?hash={hash}
```

### Get block results at a specified height

```bash
curl http://127.0.0.1:26657/block_results?height={height}
```

### Get consensus state

```bash
curl http://127.0.0.1:26657/consensus_state
```

### Get the list of unconfirmed transactions

```bash
curl http://127.0.0.1:26657/unconfirmed_txs?limit=<num>
```

### Get data about unconfirmed transactions

```bash
curl http://127.0.0.1:26657/num_unconfirmed_txs?limit=100
```