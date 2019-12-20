# NetCloth即时通讯C++服务编译
## 1 编译环境准备

### 1.1 安装autotool

```
sudo apt install automake autoconf libtool
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

### 2.5 安装boost

```
wget https://dl.bintray.com/boostorg/release/1.69.0/source/boost_1_69_0.tar.gz
tar xvzf boost_1_69_0.tar.gz
cd boost_1_69_0
./bootstrap.sh
sudo ./b2 install
```

## 3 编译C++服务
使用代码的*<font color=red>master</font>分支

```
cd /home/admin/code/netcloth-server
./autogen.sh
mkdir build
cd build
../configure
make
```

## 部署C++服务

```
mkdir -p /home/admin/gateway/conf
mkdir -p /home/admin/gateway/logs
mkdir -p /home/admin/gateway/run

cp /home/admin/code/netcloth-server/cpp/build/src/gateway/home/admin/gateway/ /home/admin/gateway/
cp /home/admin/code/netcloth-server/cpp/src/gateway/conf/* /home/admin/gateway/conf
```

修改 /home/admin/gateway/conf/gateway.conf
将172.31.199.154替换成本机的内网IP

