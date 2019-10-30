## Install and setup go env

### * download and install go
```
# for macOS, run commands:
wget https://dl.google.com/go/go1.12.2.darwin-amd64.tar.gz
tar -xvf go1.12.2.darwin-amd64.tar.gz
mv go /usr/local

# for ubuntu, run commands:
wget https://dl.google.com/go/go1.12.2.linux-amd64.tar.gz
tar -xvf go1.12.2.linux-amd64.tar.gz
sudo mv go /usr/local
```

### * setup go env
```
# edit ~/.bashrc and append：
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
export GO111MODULE=on
```

and then, run commands：
```
source ~/.bashrc
```