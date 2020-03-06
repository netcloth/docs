# go 环境配置
要求golang版本号>=1.13.5

## 检查golang安装
```bash
查看golang版本
go version

在ubuntu上执行结果如下:
[20:09:04] root:~ # go version
go version go1.13.5 linux/amd64

在mac os上执行结果如下:
➜  ~ go version
go version go1.13.3 darwin/amd64

如果版本号低于1.13.5请彻底卸载golang，并将GO相关的path从PATH环境变量中删除
```

## 下载并安装go

```bash
# macOS系统执行如下命令
wget https://dl.google.com/go/go1.13.5.darwin-amd64.tar.gz
tar -xvf go1.13.5.darwin-amd64.tar.gz
mv go /usr/local

# ubuntu系统执行如下命令
wget https://dl.google.com/go/go1.13.5.linux-amd64.tar.gz
tar -xvf go1.13.5.linux-amd64.tar.gz
sudo mv go /usr/local
```

## 设置环境变量

```bash
# 修改~/.bashrc，添加如下：
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
export GO111MODULE=on
```

修改完成后，执行如下命令：

```bash
source ~/.bashrc
```
