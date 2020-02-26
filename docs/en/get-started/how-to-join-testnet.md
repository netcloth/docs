# How to join the tesetnet
## 1. Install nch
 
Please follow the [tutorial](../software/how-to-install.md) to install nch

## 2. Settings

```shell
# usage: 
# nchd init <your_custom_name> --chain-id nch-testnet
# example:
nchd init lucy --chain-id nch-testnet

# Download genesis file  from github
wget https://raw.githubusercontent.com/netcloth/docs/master/testnet/genesis.json -O  ~/.nchd/config/genesis.json

# Modify the configuration file:~/.nchd/config/config.toml， add seed-nodes as follows:
# Comma separated list of seed nodes to connect to
seeds = "e60b962168d85c5b594cb8238e8f8f536c2d2ae2@13.58.188.155:26656,5bd7dc0cb3872e9e7371e7609342875d547e0195@13.124.101.63:26656,d172e23ea6bd1ecb77f058796689110c8387fe5a@18.191.12.61:26656"

# Comma separated list of nodes to keep persistent connections to
persistent_peers = "e60b962168d85c5b594cb8238e8f8f536c2d2ae2@13.58.188.155:26656,5bd7dc0cb3872e9e7371e7609342875d547e0195@13.124.101.63:26656,d172e23ea6bd1ecb77f058796689110c8387fe5a@18.191.12.61:26656"```

## 3. Start nchd

```shell
# After executing the following command, the console will print the log
nchd start --log_level "*:debug" --trace
```

## 4. View node synchronization status

```shell
# Open a new terminal
curl http://127.0.0.1:26657/status

# The output is as follows:
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "204d94d5a6dbf73a89101a0d084c2fb56462963a", // Node id
      "listen_addr": "tcp://0.0.0.0:26656", // Node p2p connection listening address
      "network": "nch-testnet", //chain-id
      "version": "0.32.2",
      "channels": "4020212223303800",
      "moniker": "lucy", // Node name
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://127.0.0.1:26657"
      }
    },
    "sync_info": {  //Current node information
      "latest_block_hash": "A4E5D60DE7CFB6598846A4131302C8FD28F2697DF2291B33B0892A9EACB562D8", // Latest block hash
      "latest_app_hash": "32F0B29280EDF3BEAE98424D9AA256EDBEFC973D1C33431A8D74FCA3BC3B6582",
      "latest_block_height": "1489",     // The latest block height to which the current node is synchronized                                                      // Latest block height
      "latest_block_time": "2019-09-10T05:33:13.428333584Z",                                  // Latest block time
      "catching_up": false
    },
    "validator_info": { // Validator information
      "address": "92E0F0A50779E67A2AC25AAF6BCD1E5CF0841DFE",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "cGvHGxHXzOk/L5yVtxeyS9U1mGBNFszvAdYlQoQVGCw="
      },
      "voting_power": "0"
    }
  }
```

When the height of the block synchronized by the node is the same as that on the block browser，indicates that the nodes have completed synchronization. At this point, a full node is deployed.

## More resources

* Blockchain browser address of the testnet : <https://explorer.netcloth.org>
* Apply for a token for test token, click [here](./testcoin.md)
