# 如何安装nch

## 最新版本

当前最新的内测版本为 v1.0.2

## 服务器配置

推荐的服务器配置：

* CPU 核数： 2
* 内存： 4GB
* 磁盘：100GB SSD
* 操作系统： Ubuntu 16.04+
* 带宽：10Mbps
* 开放端口： 26656和26657

## 安装

### 1. 搭建开发环境

安装git
``` bash
sudo apt-get update
sudo apt-get install git
```

安装和配置go，请点击[这里](../software/go-install.md)

### 2. 源码编译nch节点程序

```shell
# 获取nch 源码
git clone https://github.com/NetCloth/netcloth-chain.git
cd netcloth-chain && git checkout v1.0.2

# 设置goproxy(make install过程会下载依赖的go模块,设置适合自己的代理,大陆用户可以设置以下代理来加快下载速度)
export GOPROXY=https://mirrors.aliyun.com/goproxy/

# 安装statik
go get github.com/rakyll/statik

# 编译安装
make install

# 编译完成后，检查版本号
nchd version
nchcli version
```
