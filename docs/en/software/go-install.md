# go environment configuration
Require golang version number>=1.13.5

## Check golang installation
```bash
go version

Results on ubuntu are as follows:
[20:09:04] root:~ # go version
go version go1.13.5 linux/amd64

Results on mac os are as follows:
➜  ~ go version
go version go1.13.5 darwin/amd64

If go version number is lower than 1.13.5, please uninstall golang completely, and remove the GO related path from the PATH environment variable
```

## Download and install go

```bash
# for macOS
wget https://dl.google.com/go/go1.13.5.darwin-amd64.tar.gz
tar -xvf go1.13.5.darwin-amd64.tar.gz
mv go /usr/local

# for ubuntu
wget https://dl.google.com/go/go1.13.5.linux-amd64.tar.gz
tar -xvf go1.13.5.linux-amd64.tar.gz
sudo mv go /usr/local
```

## Setting environment variables

```bash
# ：Modify ~/.bashrc and add the following:
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
export GO111MODULE=on
```

After the modification , execute the following command:

```bash
source ~/.bashrc
```
