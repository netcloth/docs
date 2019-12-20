# NetCloth即时通讯Go服务编译

## 1 Golang编译环境

安装Golang 1.13.5 版本,设置GOPROXY和打开Module功能

## 2 gRPC和Protobuf相关依赖

### 2.1 clone gRPC代码

```
mkdir /home/admin/code
cd /home/admin/code
git clone https://github.com/grpc/grpc.git
cd grpc
git submodule update --init --recursive

```
备注：国内网络可能需要较长时间

### 2.2 编译Protobuf
```
cd /home/admin/code/grpc/third_party/protobuf
./autogen.sh
./configure
make
sudo make install
```
如果执行autogen.sh失败，清安装automake
```
sudo apt install automake autoconf libtool
```
### 2.3 编译gRPC
```
cd /home/admin/code/grpc/
make
sudo make install
```

### 2.4 安装gRPC-go
执行
```
go get -u github.com/golang/protobuf/protoc-gen-go
```

## 3 编译Go服务

##### 3.1 生成协议文件
```
cd /home/admin/code/netcloth-server/chat_proto
./gen.sh
```

#### 3.3.2 服务编译

```
cd /home/admin/code/netcloth-server/go
make
make install
```

#### 3.3.3 配置修改

* 修改 /home/admin/servicehub/conf/app.yaml

```
gateway:
  endpoint: "47.104.248.183:4455"
```
将此处的IP换成所在机器的公网IP


#### 3.3.4 拷贝keystore.txt文件
将keystore文件复制到如下3个目录

* /home/admin/filestore/conf
* /home/admin/servicesub/conf
* /home/admin/router/conf
* /home/admin/group/conf

将相应的conf/sdk.yaml里面的配置keystore.KeyStorePasswd修改成相应的密码
