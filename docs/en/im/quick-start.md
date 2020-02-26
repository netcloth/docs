# Quick deployment of NetCloth IM Sever

## 0 Procedures introduction
<p align="center">
	<img src="https://github.com/netcloth/docs/blob/master/docs/en/images/procedure%20of%20deploying%20IM%20server.png" alt="Sample" width = 80% height = 80%>
</p>

The deployment is divided into two parts: deploy a blockchain node and IM server deployment. If you have not deployed a blockchain node, please deploy the blockchain nodes according to the document ([click here](../get-started/how-to-join-testnet.md)) and then continue to build the instant messaging server.

## 1 OS and add user
### 1.1 Operating system requirements

The software development and operation and maintenance are based on the ** <font color=red>Ubuntu 18.04 server version </font>** operating system.

If you use other Linux OS, there will be slight differences during the deployment process.

### 1.2 Create admin

To deploy a server using the admin account, you need to create a new admin account and add sudo execution permissions

* Create a new admin user operation, which requires user sudo  or user root , then execute the following operations

```
adduser admin
usermod -aG sudo admin
```

## 2 Basic service deployment and startup

### 2.1  nginx installation and configuration
#### 2.1.1  Install nginx
* Create /etc/apt/sources.list.d/nginx.list ,and add the following content to the file
```
deb http://nginx.org/packages/mainline/ubuntu/ bionic nginx
deb-src http://nginx.org/packages/mainline/ubuntu/ bionic nginx
```
* After configuring the nginx source, execute the following command
```
wget http://nginx.org/keys/nginx_signing.key
apt-key add nginx_signing.key
apt-get update
apt-get install -y nginx
/etc/init.d/nginx start
```
* Execute nginx -v check，use nginx 1.16 or later version

#### 2.1.2 Modify nginx parameters
Modify the file:/etc/nginx/nginx.conf

```
worker_processes  auto;
```

Add a new configuration in the http option to set the body size limit of the POST request

```
client_max_body_size 20m;
```

#### 2.1.3 Start nginx service
```
nginx
```

### 2.2 install mongodb
* Refer to the [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition-using-deb-packages)  install version 4.2.X  mongodb 
* Start mongodb with the default configuration using the following command
```
systemctl start mongod
```
* User name settings (optional): if you want to increase permissions control for security reasons, please refer to the related mongodb documentation

### 2.3 Deploy redis-server

#### 2.3.1 Install redis server
```
sudo apt install redis-server
```

#### 2.3.2 Start redis server
/usr/bin/redis-server /etc/redis/redis.conf

If redis fails to start, check whether the network does not support IPV6. Modify the redis configuration via（/etc/redis/redis.conf）,
 
 ```
 bind 127.0.0.1 ::1
 ```
 Remove IP V6 address monitoring and modify it as following:
 ```
 bind 127.0.0.1
 ```

### 2.4 Download and install consul

```
wget https://releases.hashicorp.com/consul/1.6.1/consul_1.6.1_linux_amd64.zip

unzip consul_1.6.1_linux_amd64.zip
sudo mv consul /usr/local/bin
```

### 2.5 install supervisor

```
sudo apt install supervisor
```

## 3 Install Application Services

### 3.1 Download Program

```
wget http://47.104.248.183/resource/netcloth-server-latest.tar.gz
```

### 3.2 Modifying customized configurations
```
tar xvzf netcloth-server-latest.tar.gz
cd netcloth-server-latest
```
Modify the following 3 parameters in netcloth-server-latest/install.sh

* <font color=red>public_ip </font> The public IP of this instance
* <font color=red>keystore </font> The storage path of Keystore
* <font color=red>keystore_password  </font> Password to decrypted the Keystore

```
public_ip=127.0.0.1
keystore="./keystore.txt"
keystore_password="88888888"
```
After the modification , install the service (with root authority)

```
sh install.sh
```

## 4 Service startup
**<font color=red>Execute the following operations with root authority</font>**

### 4.1 Open external ports
The following ports are currently required to be accessible on the Internet

* 4455

 For lient and server establish TCP persistent connection
* 80 

For HTTP service
* 1080

 For gRPC service

### 4.2 Update Basic Service Configuration

#### 4.2.1 load new configuration of nginx
```
nginx -s reload
```

### 4.3 Start Application Service

#### 4.3.1 Starting Services via Supervisor
* Check whether supervisord has started normally. If not, start supervisord first
```
service supervisor start
```

Start Service

```
supervisorctl
> update
> status
```

*Check the service through the command "status" to ensure that the service is running
```
status 
```
* If the service is fatal, you can execute command restart, for example

```
restart offmsg
```



#### 4.3.2 Start gateway service

```
cd /home/admin/gateway/
./gateway
```