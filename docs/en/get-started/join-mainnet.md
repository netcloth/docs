## Testnet gentx files

The NetCloth mainnet has not yet been started. You can participate in the creation of the genesis file and apply to become the initial verifier for the start of the mainnet.


### Requirement

Recommended server configuration:

* CPU cores: 2
* RAM: 4GB+
* Disk: 100GB+ SSD
* OS: Ubuntu 18.04
* Bandwidth:10Mbps
* Open ports: 26656 and 26657

To install and configure go, click [here](../software/go-install.md)

#### Build nch from source code

```bash
# Get nch source code
git clone https://github.com/NetCloth/netcloth-chain.git
cd netcloth-chain && git checkout testnet-v1.2.0

# Install statik
sudo apt-get update
sudo apt-get install golang-statik

# Compile and install
make install

# Check version
nchd version
nchcli version
```

### 1. Create an account

```bash
nchcli keys add <key_name>
```

config nchcli

```bash
nchcli config chain-id nch-chain
nchcli config output json
nchcli config indent true
nchcli config trust-node true
```

### 2. Initialize your node

```bash
nchd init --moniker=<node_name> --chain-id nch-chain
```

This command will create the genesis& config files in the home directory(~/.nchd/ by default).

### 3. Execute gentx command

```bash
nchd gentx \
  --amount=1000000000000pnch \
  --pubkey $(nchd tendermint show-validator) \
  --ip=<node_public_IP> \
  --node-id=$(nchd tendermint show-node-id) \
  --name=<key_name> \
  --details=<validator details> \
  --website=<webiste>
```

This commond will generate the transaction in the directory ``` ~/.nchd/config/gentx/``` 

The default commission data is：

```bash
delegation amount: 10000000000000pnch
commission rate: 0.1
commission max rate: 0.2
commission max change rate: 0.01
min_self_delegation: 1 nch
```

You could also change thesemetrics.

### 4. Sumbit your gentx.json

Save your gentx file as [github-user-name].json,  ansd submit your json file tohttps://github.com/netcloth/mainnet/tree/master/gentx by creating a pull request.