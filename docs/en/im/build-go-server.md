# Compiling go service

## 1 Golang Compile Environment

Install Golang 1.12 or later, preferably 1.13, set GOPROXY and open Module function

## 2 gRPC and Protobuf related dependencies

### 2.1 clone gRPC Code

```bash
mkdir /home/admin/code
cd /home/admin/code
git clone https://github.com/grpc/grpc.git
cd grpc
git submodule update --init --recursive

```

Note: Domestic network may take a long time

### 2.2  Compile Protobuf

```bash
cd /home/admin/code/grpc/third_party/protobuf
./autogen.sh
./configure
make
sudo make install
```

If autogen.sh fails, install automake.

```bash
sudo apt install automake autoconf libtool
```

### 2.3 Compile gRPC

```bash
cd /home/admin/code/grpc/
make
sudo make install
```

### 2.4 Install gRPC-go

```bash
go get -u github.com/golang/protobuf/protoc-gen-go
```

## 3 Compile Go service

The current code is hosted on [Code Cloud] (https://gitee.com) platform, the account name and password are as follows

### 3.1 Code permissions

```bash
netcloth_guest
diei12@31kl#$ed
```

### 3.2 Get source code and related dependency generation

```bash
cd /home/admin/code
git clone https://gitee.com/hangzhouzengxinxinxi/netcloth-server.git
```

*Use code of *<font color=red>master</font> Branch

### 3.3 Compile

##### 3.3.1 Dependency acquisition

```bash
cd /home/admin/code/netcloth-server
sh deps.sh
```

#### 3.3.2 Service compilation

```bash
cd /home/admin/code/netcloth-server/go
make
make install
```

#### 3.3.3 Configuration modification

*  modify /home/admin/servicehub/conf/app.yaml

```bash
gateway:
  endpoint: "47.104.248.183:4455"
```
 Replace the IP here with the public IP of the machine

#### 3.3.4 Copy the keystore.txt file
Copy the keystore file to the following 3 directories

* /home/admin/filestore/conf
* /home/admin/servicesub/conf
* /home/admin/router/conf


Modify the configuration keystore.KeyStorePasswd in the corresponding conf / sdk.yaml to the corresponding password
