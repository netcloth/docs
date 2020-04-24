# NetCloth即时通讯服务部署环境准备

## 部署流程简介

![流程图](../images/procedure_IM_deploy.png)

部署分为区块链及服务端部署两部分，如您尚未部署区块链节点及程序，请先按照文档部署区块链节点（[点击这里查看](../get-started/how-to-join-testnet.md)），再继续进行即时通讯服务端的搭建。

## 1 操作系统和用户添加
### 1.1 操作系统要求
软件的开发和运维都是基于**<font color=red>Ubuntu 18.04 server版本</font>**操作系统。

如果使用其他Linux版本在部署过程中会有略微差异。

### 1.2 创建admin用户
使用admin用户部署，需要新建一个admin账号，并且添加sudo执行权限

* 新造admin用户操作，需要sudo用户或root用户，执行以下操作

```bash
adduser admin
usermod -aG sudo admin
```

### 1.3 获取netcloth-server源代码
当前代码托管在[码云](https://gitee.com)平台，账户名和密码如下

#### 1.3.1 代码权限

```bash
账号：netcloth_guest
密码：diei12@31kl#$ed
```

#### 1.3.2 获取源代码和相关依赖生成

```bash
mkdir -p /home/admin/code
cd /home/admin/code
git clone https://gitee.com/hangzhouzengxinxinxi/netcloth-server.git
```

使用代码的*<font color=red>master</font>分支

## 2 基础服务部署

## 2 基础服务部署和启动

### 2.1 nginx安装和配置

#### 2.1.1 安装版本nginx

* 创建 /etc/apt/sources.list.d/nginx.list 文件，添加如下内容到该文件
  
```bash
deb http://nginx.org/packages/mainline/ubuntu/ bionic nginx
deb-src http://nginx.org/packages/mainline/ubuntu/ bionic nginx
```

* 配置完nginx源以后，执行如下命令
  
```bash
wget http://nginx.org/keys/nginx_signing.key
apt-key add nginx_signing.key
apt-get update
apt-get install -y nginx
```

* 执行nginx -v检查，使用nginx 1.16以上版本

#### 2.1.2 启动nginx服务

```bash
nginx
```

### 2.2 mongodb安装和启动

### 2.2.1 安装

* 参考[Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition-using-deb-packages)文档 安装4.2.X版本 mongodb 

```bash
wget https://repo.mongodb.org/apt/ubuntu/dists/bionic/mongodb-org/4.2/multiverse/binary-amd64/mongodb-org-server_4.2.5_amd64.deb
dpkg -i mongodb-org-server_4.2.5_amd64.deb
```

### 2.2.2 启动mongodb

* 通过如下命令，以默认配置启动mongodb

```bash
systemctl start mongod
```

* 用户名账号设置(可选)：如果出于安全考虑，可以增加权限控制，参考mongodb相关文档设置

### 2.3 部署redis-server

#### 2.3.1 安装redis server

```bash
sudo apt install redis-server
```

#### 2.3.2 启动redis server

/usr/bin/redis-server /etc/redis/redis.conf

如果redis启动失败，检查是否是网络不支持IP V6，查看日志文件/var/log/redis/redis-server.log

通过修改redis配置（/etc/redis/redis.conf）,
 
 ```properties
 bind 127.0.0.1 ::1
 ```
 去除IP V6地址监听，修改成如下：
 
 ```properties
 bind 127.0.0.1
 ```

### 2.4 consul下载和安装

```bash
wget https://releases.hashicorp.com/consul/1.7.2/consul_1.7.2_linux_amd64.zip
unzip consul_1.7.2_linux_amd64.zip
mv consul /usr/local/bin
```

### 2.5 supervisor安装

```bash
sudo apt install supervisor
```

## 3 环境变量设置
在.bashrc或.bash_profile中添加如下配置，GOPROXY变量看网络状况决定是否配置,配置完后执行source .bashrc

```bash
export PATH=$PATH:/usr/local/bin:/usr/local/go/bin:/home/admin/go/bin

export GOPATH=/home/admin/go
export GO111MODULE=on
export GOPROXY=https://goproxy.io

LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
export LD_LIBRARY_PATH
```
