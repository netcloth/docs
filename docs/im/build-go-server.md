# NetCloth即时通讯Go服务编译
## 1 Golang环境准备

安装Golang 1.12以上版本，最好安装1.13版本,设置GOPROXY和打开Module功能


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
```
cd /home/admin/code
git clone https://gitee.com/hangzhouzengxinxinxi/netcloth-server.git
cd /home/admin/code/netcloth-server
cd chat_proto/pb
./gen,sh
cd -


# 编译filestore
cd /home/admin/code/netcloth-server/go/server/filestore
go build
mkdir -p /home/admin/filestore/conf
mkdir -p /home/admin/filestore/logs
cp ./filestore /home/admin/filestore
cp -r ./conf/* /home/admin/filestore/conf


# 编译servicehub
cd /home/admin/code/netcloth-server/go/server/servicehub
go build
mkdir -p /home/admin/servicehub/conf
mkdir -p /home/admin/servicehub/logs
cp ./servicehub /home/admin/servicehub
cp -r ./conf/* /home/admin/servicehub/conf

# 修改 /home/admin/servicehub/conf/app.yaml文件

gateway:
  endpoint: "47.104.248.183:4455"
将此处的IP换成所在机器的公网IP

# 编译rourer
cd /home/admin/code/netcloth-server/go/server/rourer
go build
mkdir -p /home/admin/rourer/conf
mkdir -p /home/admin/rourer/logs
cp ./servicehub /home/admin/rourer
cp -r ./conf/* /home/admin/rourer/conf
```

## 4 拷贝keystore.txt文件
将keystore文件复制到如下3个目录

* /home/admin/filestore/conf
* /home/admin/servicesub/conf
* /home/admin/rourer/conf

将相应的conf/sdk.yaml里面的KeyStorePasswd配置修改下


