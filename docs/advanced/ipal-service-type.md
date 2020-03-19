# IPAL Service Type说明
IPAL中，我们通过制定一个Service Type的编号表来定义各类型的服务。

以下我们将介绍常用的Service Type及用法。

| Service Type  |     描述            |    示例        |
| ------------- | ------------------------- | ------------------------------------- |
| `1` | 用于单聊   | ```{ "type": "1", "endpoint": "http://192.168.100.1"}``` |
| `2` | 用于群聊   | ```{ "type": "2", "endpoint": "http://192.168.100.1"}```    |
| `3` | 用于小应用主页入口   | ```{ "type": "3", "endpoint": "http://192.168.100.1"}```    |
| `4` | 用于小应用域名和IP   |   ```{"type":"4","endpoint":"{\"miniAppDomains\":[{\"moniker\":\"NetCloth Blog\",\"domain\":\"https://blog.netcloth.org\"}]}" }```  |

完整的Service Type列表 [点此查看](https://github.com/netcloth/NIPs/blob/master/nip-001.md)

* Service Type使用示例：

**声明一个提供聊天服务的IPAL**:

```bash
 nchcli ipal claim --from=$(nchcli keys show -a alice) --moniker=netcloth --website="www.netcloth.org" --endpoints="1|http://219.22.22.22" --details="netcloth official server endpoint" --bond=100000000000000000pnch
```

**声明一个带聊天和小应用主页入口的IPAL**:

```bash
 nchcli ipal claim --from=$(nchcli keys show -a alice) --moniker=netcloth --website="www.netcloth.org" --endpoints="1|http://219.22.22.22,3|http://xx.xx.xx.xx" --details="netcloth official server endpoint" --bond=100000000000000000pnch
```

关于IPAL的更多介绍，[点击这里](./ipal.md)