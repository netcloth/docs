

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


#### aipal API

* 注册aipal节点，目前不提供api，通过命令行完成
```
# 该命令以交互的方式创建账号aipaltest并关联相应的公钥账号，需要输入两次密码来创建账号，密码用户加密生成的私钥，相当于生成keystore，同时会输出24个单词的助记词
nchcli keys add aipaltest

# 向aipaltest账号转账，sky也需要创建账号，并申请测试token，申请方法(TODO: url)
nchcli send --from $(nchcli keys show sky -a) --to $(nchcli keys show cipaltest -a) --amount 2000000unch;

# 在区块链上注册服务节点，各个参数的含义请执行nchcli aipal cliam -h查看
nchcli aipal claim --from=aipaltest --moniker=aipaltest  --website=sky.com --details="nch up" --endpoints "1|192.168.1.100:02" --bond=1000000unch;
```

* 查询服务节点列表
rest接口查询
 ```cassandraql
curl http://localhost:1317/aipal/list
```

命令行查询
``` shell
nchcli q aipal list
```

* 根据地址/公钥查询节点信息(包含ip地址和类型标签)，区块链目前只支持按照地址查询，按照公钥查询需要sdk支持(将公钥转成地址再到区块链查询)
rest接口查询
```
curl http://localhost:1317/aipal/node/{addr}

e.g.
curl http://localhost:1317/aipal/node/nch19uspwrym4wr366teytlu4hre9rs7afsf33dgcy

{
  "height": "10005",
  "result": {
    "operator_address": "nch19uspwrym4wr366teytlu4hre9rs7afsf33dgcy",
    "moniker": "aipaltest",
    "website": "sky.com",
    "details": "nch up",
    "endpoints": [
      {
        "type": "1",
        "endpoint": "192.168.1.100:02"
      }
    ],
    "bond": {
      "denom": "unch",
      "amount": "1400000"
    }
  }
}
```
命令行查询
``` shell
nchcli q aipal node 地址

e.g.
nchcli q aipal node nch19uspwrym4wr366teytlu4hre9rs7afsf33dgcy

{
  "operator_address": "nch19uspwrym4wr366teytlu4hre9rs7afsf33dgcy",
  "moniker": "aipaltest",
  "website": "sky.com",
  "details": "nch up",
  "endpoints": [
    {
      "type": "1",
      "endpoint": "192.168.1.100:02"
    }
  ],
  "bond": {
    "denom": "unch",
    "amount": "1400000"
  }
}

```


#### cipal API

* 根据地址/公钥查询ip地址
```

```


