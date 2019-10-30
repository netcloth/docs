## How to install nch

### Latest Version

The latest version of nch is v1.0.0

### Server configuration

Recommended server configurations：
* CPU cores： 2
* Memory： 4GB
* Disk：100GB SSD
* OS： Ubuntu 16.04+
* Bandwidth：10Mbps
* Open ports： 26656 and 26657

### Install

#### Install go

Install go by following the [instructions](../software/go-install.md)

#### Build nch from source
```
# Get source code
git clone https://github.com/NetCloth/netcloth-chain.git
cd netcloth-chain && git checkout v1.0.0

# build and install
make install

# check version
nchd version
nchcli version
```