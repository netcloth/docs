# NetCloth即时通讯C++服务编译
## 1 编译环境准备

### 1.1 安装cmake

```
sudo apt install cmake
```


## 2 安装C++编译依赖环境

### 2.1 安装spdlog

```
cd /home/admin/code
git cone https://github.com/gabime/spdlog.git
cd spdlog
mkdir build
cd build
cmake ../
make
sudo make install
```

### 2.2 安装json库
```
cd /home/admin/code
git cone https://github.com/nlohmann/json.git
cd json
mkdir build
cd build
cmake ../
make
sudo make install
```

### 2.3 安装libcurl

```
sudo apt install libcurl4-openssl-dev
```

### 2.4 安装hiredis

```
cd /home/admin/code
git clone https://github.com/redis/hiredis.git
cd hiredis
make
sudo make install
```

## 3 编译C++服务
使用代码的*<font color=red>master</font>分支

```
cd /home/admin/code
git clone https://gitee.com/hangzhouzengxinxinxi/chat-server.git
cd chat-server
git submodule update --init --recursive
cd chat_proto/pb
./gen.sh

cd /home/admin/code/chat-server/CommonLib/out/for_linux
./build-boost.sh
cd boost_1_69_0
sudo ./b2 install

cd /home/admin/code/chat-server/server
mkdir build
cd build
cmake ../
make
```

## 部署C++服务

```
cd /home/admin/code/chat-server/server

mkdir -p /home/admin/chatserver/conf
mkdir -p /home/admin/chatserver/logs
mkdir -p /home/admin/chatserver/run

cp build/chatserver /home/admin/chatserver/
cp conf/* /home/admin/chatserver/conf
```

修改 /home/admin/chatserver/conf/chatserver.conf
将server.local_ip 和 router.addr 替换成本机的内网IP

启动服务

```
cd home/admin/chatserver/
./chatserver
```
