# IM服务快速部署

## 1 部署准备工作

### 1.1 部署流程

部署分为区块链及服务端部署两部分，如您尚未部署区块链节点及程序，请先按照文档部署区块链节点（[点击这里查看](../get-started/how-to-join-testnet.md)），再继续进行即时通讯服务端的部署

完成区块链部署后，检查是否已经满足部署IM服务的各项前置要求。请按照[IM前置要求检查](./im-prerequisite.md)

### 1.2 选择操作系统

软件的开发和运维都是基于**<font color=red>Ubuntu 18.04 server版本</font>**操作系统。

如果使用其他Linux版本在部署过程中会有略微差异。

### 1.3 获取NetCloth安装包

```bash
wget http://47.104.248.183/resource/netcloth-server-latest.tar.gz
tar xvzf netcloth-server-latest.tar.gz
```

## 2 基础服务部署

NetCloth提供脚本执行基础服务的安装和启动，执行如下命令即可

```bash
cd netcloth-server-latest
./init_ubuntu_env.sh
```

如果部署机器的网络不支持IPv6, 会导致**<font color=red>redis server 启动失败</font>**

通过修改redis配置/etc/redis/redis.conf,
 
 ```properties
 bind 127.0.0.1 ::1
 ```
 
去除IP V6地址监听，修改成如下：
 
 ```properties
 bind 127.0.0.1
 ```

修改完成后，redis-server会自行启动。如果想了解基础服务的安装配置戏精，请参考[文档](./prepare-deploy-environment.md)

## 3 应用服务部署

### 3.2 修改节点参数设置

```bash
cd netcloth-server-latest
```

修改netcloth-server-latest/netcloth.conf中的如下3个参数

* public_ip 本机公网IP
* keystore  节点keystore文件存储路径
* keystore_password 读取keystore文件的密码

```properties
public_ip=127.0.0.1
keystore="./keystore.txt"
keystore_password=""
```

必须根据自己节点的情况对这三个做修改。修改完成后，安装服务(root权限）

```bash
./install.sh
```

**关于keystore**，请参考[这里](../advanced/keys.md)

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

### 4.4 日志收集

如果需要NetCloth开发人员协助判断，请先收集日志

```bash
./appctl.sh trace
```

将收集到的tracelog.tar.gz日志发送给NetCloth开发人员

### 4.4 测试服务节点

打开NetCloth App，连接你的服务节点进行IM功能测试。
