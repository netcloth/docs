# 常见问题及排除

## 1 部署IM服务节点时，端口的开发策略

* IM服务器在公网上必须开放以下端口
  * 80   HTTP服务端口
  * 1080 gRPC服务端口
  * 4455 网关长连接端口

* 以下端口在公网上不能开放访问
  * 6379 redis服务端口
  * 27017 mongodb服务端口

## 2 NetCloth客户端看不到部署的IM服务节点

在NetCloth客户端通信地址列表显示的服务节点必须完成IPAL声明，请检查[IPAL声明](../advanced/ipal.html#声明ipal)是否完成

## 3 NetCloth客户端能看到我的服务节点，但是显示无法连接

在服务器上执行 **nchcli q ipal list** 命令,找到你的服务节点，查看endpoints数组type为1的endpoint。

例如，通过命令查看nchtest02节点的配置如下所示：

```
{
    "operator_address": "nch1mzj5jhaevmh0780jrztvkaw5m4ylm4c63psgpu",
    "moniker": "nchtest02",
    "website": "www.nchtest02.org",
    "details": "nchtest02 server endpoint",
    "endpoints": [
      {
        "type": "1",
        "endpoint": "http://47.104.199.106"
      },
      {
        "type": "3",
        "endpoint": "http://47.90.5.138"
      }
    ],
    "bond": {
      "denom": "pnch",
      "amount": "1000000000000000"
    }
  }
```

找到endpoint为 http://47.104.199.106， 然后执行如下命令，检查是否可以访问

```
curl http://47.104.199.106/v1/ping
```

如果能正常访问，应该会显示“ping” 回应。如果curl命令执行失败，可以按如下步骤查

* IPAL注册时，endpoint是否填写了有效的http地址
* 该IP在公网是否可以正常访问
* 该IP的80端口是否已经放开访问，通过 telnet ip 80 检查
* 检查IM服务servicehub服务是否正常启动

## 4.客户端能发出CIPAL交易，但无法通过TXID查询到交易状态
   
   
**原因**：CIPAL交易需要节点支付手续费，手续费不足会导致CIPAL交易无法正常上链

**解决**：确保对应的区块链钱包账户余额足够支付手续费

## 5 服务节点可以连接，但是客户端无法登陆
