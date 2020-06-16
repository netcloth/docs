# 锁仓账号
用于在创世文件添加初始账号，在区块链网络启动后账号部分或所有余额被冻结一定时间才能释放，在转账或抵押等使用资产的时候系统会自动计算，无需主动出发释放，有两种释放策略

## 如何使用
``` sh
nchd add-genesis-account nch1402zhyzws3r9zgm9umlc5fxnmjxjmhgeaj7s4k [账号总额度] --vesting-amount [锁仓额度] --vesting-start-time [epoch timestap] --vesting-end-time [epoch timestap]
```
- '账号总额度'包含'锁仓额度'，锁仓额度不能大于账号总额度
- --vesting-start-time和--vesting-end-time为utc时间的时间戳，--vesting-end-time必须大于--vesting-start-time

## 两种释放策略
### 设定开始和结束时间根据时间线性释放

``` sh
# nch1402zhyzws3r9zgm9umlc5fxnmjxjmhgeaj7s4k账号余额3000NCH，其中锁仓2000NCH，在1592279100时间之前实际可用余额是1000NCH，锁仓部分按照时间[1592279100,1592279700]线性释放，实际账号可用额度根据时间来计算
nchd add-genesis-account nch1402zhyzws3r9zgm9umlc5fxnmjxjmhgeaj7s4k 3000000000000000pnch --vesting-amount 2000000000000000pnch --vesting-start-time 1592279100 --vesting-end-time 1592279700
```

### 在指定日期一次性释放
不指定--vesting-start-time即可
``` sh
# nch1402zhyzws3r9zgm9umlc5fxnmjxjmhgeaj7s4k账号余额3000NCH，其中锁仓2000NCH，在1592279700时间之前实际可用余额是1000NCH，在1592279700时间点后可用额度3000NCH
nchd add-genesis-account nch1402zhyzws3r9zgm9umlc5fxnmjxjmhgeaj7s4k 3000000000000000pnch --vesting-amount 2000000000000000pnch --vesting-end-time 1592279700
```
