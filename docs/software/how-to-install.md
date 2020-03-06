# 如何安装nch节点程序

## 最新版本

当前最新测试版本为 testnet-v1.0.1

## 服务器配置

推荐的服务器配置：

* CPU 核数： 2
* 内存： 4GB
* 磁盘：100GB SSD
* 操作系统： Ubuntu 18.04
* 带宽：10Mbps
* 开放端口： 26656和26657

## 安装

### 1. 搭建开发环境

安装依赖

```bash
sudo apt-get update
sudo apt-get install git gcc cmake make golang-statik
```

安装和配置go，请点击[这里](../software/go-install.md)

### 2. 源码编译nch节点程序

```bash
# 获取nch 源码
git clone https://github.com/netcloth/netcloth-chain.git
cd netcloth-chain && git checkout testnet-v1.0.1

# 设置goproxy(make install过程会下载依赖的go模块,设置适合自己的代理,大陆用户可以设置以下代理来加快下载速度)
export GOPROXY=https://mirrors.aliyun.com/goproxy/

# 编译安装
make install
```

编译安装完成后，检查版本号

```bash
nchd version
nchcli version
```

到这时，nch节点程序就安装完成了。接下来，你可以尝试加入测试网，点击[这里](../get-started/how-to-join-testnet.md)