# How to install nch

## The latest version

The latest internal beta version is v1.0.8

## Server configuration

Recommended server configuration:

* CPU cores: 2
* RAM: 4GB+
* Disk: 100GB+ SSD
* OS: Ubuntu 18.04
* Bandwidth:10Mbps
* Open ports: 26656 and 26657

## Installation

### 1. Setting up a development environment

* Install git

```shell
sudo apt-get update
sudo apt-get install git
```

To install and configure go, click [here](../software/go-install.md)

### 2. Build nch from source code

```shell 
# Get nch source
git clone https://github.com/NetCloth/netcloth-chain.git
cd netcloth-chain && git checkout v1.0.8


# Install statik
sudo apt-get update
sudo apt-get install golang-statik

# Compile and install
make install

# After compiling, Check version number
nchd version
nchcli version
```
