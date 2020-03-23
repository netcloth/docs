# IM服务快速部署

## 0 部署流程简介

部署分为区块链及服务端部署两部分，如您尚未部署区块链节点及程序，请先按照文档部署区块链节点（[点击这里查看](../get-started/how-to-join-testnet.md)），再继续进行即时通讯服务端的搭建。

完成区块链部署后，检查是否已经满足部署IM服务的各项前置要求。请按照[IM前置要求检查](./im-prerequisite.md)

## 1 操作系统和用户添加

### 1.1 操作系统要求

软件的开发和运维都是基于**<font color=red>Ubuntu 18.04 server版本</font>**操作系统。

如果使用其他Linux版本在部署过程中会有略微差异。

### 1.2 创建admin用户

使用admin用户部署，需要新建一个admin账号，并且添加sudo执行权限

* 新建admin用户操作，需要sudo用户或root用户，执行以下操作

```bash
adduser admin
usermod -aG sudo admin
```

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

```
nginx
```

### 2.2 mongodb安装和启动

### 2.2.1 安装

* 参考[Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition-using-deb-packages)文档 安装4.2.X版本 mongodb 
* 如果官网安装速度比较慢，也可以通过NetCloth服务器下载，执行如下操作

``` shell
wget http://47.104.248.183/resource/mongodb-org-server_4.2.1_amd64.deb
dpkg -i mongodb-org-server_4.2.1_amd64.deb
```

### 2.2.2 启动mongodb

* 通过如下命令，以默认配置启动mongodb

```
systemctl start mongod
```

* 用户名账号设置(可选)：如果出于安全考虑，可以增加权限控制，参考mongodb相关文档设置

### 2.3 部署redis-server

#### 2.3.1 安装redis server

```
sudo apt install redis-server
```

#### 2.3.2 启动redis server

/usr/bin/redis-server /etc/redis/redis.conf

如果redis启动失败，检查是否是网络不支持IP V6，通过修改redis配置（/etc/redis/redis.conf）,
 
 ```
 bind 127.0.0.1 ::1
 ```
 去除IP V6地址监听，修改成如下：
 
 ```
 bind 127.0.0.1
 ```

### 2.4 consul下载和安装

```bash
wget https://releases.hashicorp.com/consul/1.6.1/consul_1.6.1_linux_amd64.zip

unzip consul_1.6.1_linux_amd64.zip
sudo mv consul /usr/local/bin
```

### 2.5 supervisor安装

```bash
sudo apt install supervisor
```

## 3 安装应用服务

### 3.1 程序下载

```bash
wget http://47.104.248.183/resource/netcloth-server-latest.tar.gz
tar xvzf netcloth-server-latest.tar.gz
```

### 3.2 修改节点参数设置

```bash
cd netcloth-server-latest
```

修改netcloth-server-latest/netcloth.conf中的如下3个参数

* public_ip 本机公网IP
* keystore  节点keystore文件存储路径
* keystore_password 读取keystore文件的密码

```
public_ip=127.0.0.1
keystore="./keystore.txt"
keystore_password=""
```

必须根据自己节点的情况对这三个做修改。修改完成后，安装服务(root权限）

```bash
./install.sh
```

**关于keystore**

关于keystore，请参考[这里](../advanced/keys.md)

## 4 服务启动

**<font color=red>以root权限进行以下步骤的操作</font>**

### 4.1 对外端口开放

当前需要以下端口可在外网访问

* 4455 客户端和服务端建立TCP长链接端口
* 80   HTTP服务
* 1080 gRPC服务

### 4.2 启动服务

执行如下命令启动netcloth im服务

```bash
./appctl.sh start
```

* 通过supervisorctl status命令检查服务，确保服务都处于running状态
* 如果服务有fatal出现，可以执行start，如 start offmsg

### 4.3 检查服务

执行如下命令检查netcloth im服务部署情况

```bash
./appctl.sh check
```

如果部署正常，则会输出"sanity check ok"

### 4.4 测试服务节点

打开NetCloth App，连接你的服务节点进行IM功能测试。
