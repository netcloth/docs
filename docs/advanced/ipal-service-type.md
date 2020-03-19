# IPAL Service Type说明
IPAL中，我们通过制定一个Service Type的编号表来定义各类型的服务。

以下我们将介绍常用的Service Type及用法。

| Service Type  |     描述     | endpoint       |    示例        |
| ------------- | ------------------------- | ------------------------- | ------------------------------------- |
| `1` | type 1 用于单聊   | endpoint为单聊服务节点的IP |  ```{ "type": "1", "endpoint": "http://192.168.100.1"}``` |
| `2` | type 2 用于群聊   | endpoint为群聊服务节点的IP | ```{ "type": "2", "endpoint": "http://192.168.100.1"}```    |
| `3` | type 3 用于小应用主页入口   | endpoint为小应用主页入口地址 | ```{ "type": "3", "endpoint": "http://192.168.100.1"}```    |
| `4` | type 4 用于小应用域名和IP   | endpoint为一个json字符串，包含具体小应用的名字和域名  | ```{"type":"4","endpoint":"{\"miniAppDomains\":[{\"moniker\":\"NetCloth Blog\",\"domain\":\"https://blog.netcloth.org\"}]}" }```  |

完整的Service Type列表 [点此查看](https://github.com/netcloth/NIPs/blob/master/nip-001.md)

## Service Type使用示例：

**声明一个提供聊天服务的IPAL**:

```bash
nchcli ipal claim --from=$(nchcli keys show -a alice) \
--moniker=netcloth \
--website="www.netcloth.org" \
--endpoints="1|http://219.22.22.22" \
--details="netcloth official server endpoint" \
--bond=100000000000000000pnch \
--gas 200000
```

**声明一个带聊天和小应用主页入口的IPAL**:

```bash
nchcli ipal claim --from=$(nchcli keys show -a alice) \
--moniker=netcloth \
--website="www.netcloth.org" \
--endpoints="1|http://219.22.22.22,3|http://219.22.22.23" \
--details="netcloth official server endpoint" \
--bond=100000000000000000pnch
```

**声明一个带聊天、小应用区和小应用内容的IPAL**:

```bash
nchcli ipal claim --from=$(nchcli keys show -a alice) \
--moniker=netcloth \
--website="www.netcloth.org" \
--details="netcloth official server endpoint" \
--endpoints "1|http://47.104.248.183+++3|http://47.90.5.138+++4|{\"miniAppDomains\":[{\"moniker\":\"NetCloth Blog\",\"domain\":\"https://blog.netcloth.org\"},{\"moniker\":\"链闻社\",\"domain\":\"https://www.chainnews.com/\"},{\"moniker\":\"非小号\",\"domain\":\"https://feixiaohao.com\"},{\"moniker\":\"金财快讯\",\"domain\":\"https://m.jinse.com/lives\"},{\"moniker\":\"NetCloth Blog\",\"domain\":\"https://medium.com/@NetCloth/\"},{\"moniker\":\"Coindesk\",\"domain\":\"https://www.coindesk.com\"},{\"moniker\":\"Coinmarketcap\",\"domain\":\"https://www.coinmarketcap.com \"}]}" \
--bond=1000000000000000pnch \
--endpoint_delimiter "+++" \
--endpoint_type_delimiter "|"
```

上例中nchcli使用了--endpoint_delimiter 和  --endpoint_type_delimiter 两个选项(测试网nchcli暂未支持，如果有需要，请使用develop分支源码编译nchcli工具)。

::: warning 提示

在用 nchcli 客户端声明IPAL时，Service Type和endpoint之间默认用“|”分隔符，多个endpoint之间默认用“,”分隔符。

声明小应用的endpoints是一个json字符串，可能会和默认的"|"或","分隔符冲突，此时需要用 --endpoint_delimiter选项指定endpoint之间的分隔符，用--endpoint_type_delimiter指定Service Type和endpoint之间的分隔符。
:::

关于IPAL的更多介绍，[点击这里](./ipal.md)