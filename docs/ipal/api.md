

## REST APIs

```nchcli``` 开启rest-server后，浏览器访问 ```http://localhost:1317/swagger-ui/``` 可以看到所有的REST APIs


*  获取最新区块
```cassandraql
curl http://localhost:1317/blocks/latest
```

* 获取指定高度的区块
```cassandraql
curl http://localhost:1317/blocks/{height}
```

* 广播交易
  
```cassandraql
curl -X POST "http://localhost:1317/txs" -H "accept: application/json" -H "Content-Type: application/json" -d "{transaction msg}"
```


#### ipal相关查询

* 查询服务节点列表
 ```cassandraql
curl http://localhost:1317/aipal/list
```

* 查询c-ipal
```cassandraql

```
