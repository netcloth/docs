# 如何配置并上架您自己的小应用区

NetCloth APP(版本1.1.7及以上)已支持分布式应用平台的展示。各海星节点可自定义上架小应用区，并配置自己的小应用

## 1.配置小应用区前端展示页

小应用区前端展示页由H5组成，[点击这里](https://github.com/netcloth/Home-H5)获得开源的前端展示页，以及配置方法。

## 2.区块链操作
上一步我们配置了H5的展示前端，现在我们要将这个前端链接发布至NetCloth区块链上，这样使用NetCloth APP的用户就能看到你的小应用区了。

使用IPAL声明，注册成为海星节点，并发送IPAL声明你的服务地址。

### 2.1 加入测试网络，同步区块
你需要搭建测试网络的区块链节点，待区块同步完成后再进行下一步。详情请看[这里](../get-started/how-to-join-testnet.md)

如果您已经搭建了区块链节点，请跳过这一步

### 2.2 注册海星节点，发送IPAL声明

Example（以NetCloth Official节点为例）
```
nchcli ipal claim --from=$(nchcli keys show -a alice) --moniker=netcloth --website="www.netcloth.org" --endpoints="1|http://219.22.22.22,3|http://<Your Mini Apps Portal IP or domain>" --details="netcloth official server endpoint" --bond=100000000000000000pnch``

```
其中，endpoints字段由数组组成，数字部分表示Service Type，后面跟随的域名或IP为该服务的地址。其中1表示的是海星节点IM服务端的入口地址，3表示你的H5前端地址。

了解更多IPAL相关，请点击[这里](./ipal.md)。

了解更多有关IPAL Service Type的种类，请点击[这里](./ipal-service-type.md)。

IPAL声明成功后，你的海星节点就注册成功了。现在只需要在NetCloth的“设置”-->"客户端服务设置"-->"应用地址"-->找到你的节点，选择连接。你就可以在NetCloth APP上看到你的小应用区啦。

