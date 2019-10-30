## go 环境配置

### * 下载并安装go
```
# macOS系统执行如下命令
wget https://dl.google.com/go/go1.12.2.darwin-amd64.tar.gz
tar -xvf go1.12.2.darwin-amd64.tar.gz
mv go /usr/local

# ubuntu系统执行如下命令
wget https://dl.google.com/go/go1.12.2.linux-amd64.tar.gz
tar -xvf go1.12.2.linux-amd64.tar.gz
sudo mv go /usr/local
```

### * 设置环境变量
```
# 修改~/.bashrc，添加如下：
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
export GO111MODULE=on
```

修改完成后，执行如下命令：
```
source ~/.bashrc
```