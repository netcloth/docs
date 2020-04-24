# Node RPC

Node RPC默认端口26657， 可通过```--rpc.laddr=tcp://127.0.0.1:26657``` 启动参数 或者修改配置文件更改。

RPC是基于Tendermint中自带的RPC库构建的, 具体细节和更多API可参考Tendermint文档。

## Info

### 获取指定高度的区块

```bash
curl http://127.0.0.1:26657/block?height={height}
```

### 根据Hash获取区块

```bash
curl http://127.0.0.1:26657/block_by_hash?hash={hash}
```

### 获取指定区块高度的区块结果

```bash
curl http://127.0.0.1:26657/block_results?height={height}
```

### 获取共识状态

```bash
curl http://127.0.0.1:26657/consensus_state
```

### 获取未确认交易信息列表

```bash
curl http://127.0.0.1:26657/unconfirmed_txs?limit=<num>
```

### 获取未确认交易数据

```bash
curl http://127.0.0.1:26657/num_unconfirmed_txs?limit=100
```