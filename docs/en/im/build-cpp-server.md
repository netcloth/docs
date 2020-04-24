# Instant Messaging C ++ Service Compilation
## 1 Compilation environment preparation

### 1.1 Install cmake

```bash
sudo apt install cmake
```

## 2 nstall C ++ compilation dependencies

### 2.1 Install spdlog

```bash
cd /home/admin/code
git cone https://github.com/gabime/spdlog.git
cd spdlog
mkdir build
cd build
cmake ../
make
sudo make install
```

### 2.2 Install json library

```bash
cd /home/admin/code
git cone https://github.com/nlohmann/json.git
cd json
mkdir build
cd build
cmake ../
make
sudo make install
```

### 2.3 Install libcurl

```bash
sudo apt install libcurl4-openssl-dev
```

### 2.4  Install hiredis

```bash
cd /home/admin/code
git clone https://github.com/redis/hiredis.git
cd hiredis
make
sudo make install
```

## 3  Compile C ++ services

*Use code of *<font color=red>master</font> branch

```bash
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

## Deploying C ++ services

```bash
cd /home/admin/code/chat-server/server

mkdir -p /home/admin/chatserver/conf
mkdir -p /home/admin/chatserver/logs
mkdir -p /home/admin/chatserver/run

cp build/chatserver /home/admin/chatserver/
cp conf/* /home/admin/chatserver/conf
```

modify /home/admin/chatserver/conf/chatserver.conf

Replace server.local_ip and router.addr with your local IP

Start service

```bash
cd home/admin/chatserver/
./chatserver
```
