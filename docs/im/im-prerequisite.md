# IM服务前置检查

## 1 区块链服务节点部署检查

* 启动rest server，参考[启动节点，同步区块](../get-started/how-to-join-testnet.md#_3-启动节点，同步区块)
* 检查区块链节点同步完成，参考[查看节点同步状态](../get-started/how-to-join-testnet.md#_4-查看节点同步状态)
* 区块链服务进程检查，执行 ps -ef|grep nch 命令检查到nchd和nchcli两个进程已正常运行

## 2 账号创建以及私钥文件导出

* 请参考[如何使用nchcli命令行导入/导出私钥](../advanced/keys.md)完成账号创建和私钥导出
* 将导出的私钥放在一个keystore.txt文件里面，后面部署IM服务时需要这个私钥文件以及读取这个私钥文件的密码

## 3 IM服务端IPAL声明

* 声明服务器提供IM服务 参考[声明IPAL](../ipal/ipal.md#声明IPAL)。声明完成以后，打开NetCloth APP，在“我的-设置-客户端服务设置（C-IPAL)-通信地址"里面可以看到你的节点，由于IM服务未部署，所以会显示无法连接。
* 如果在这里看不到你的服务声明，请检查IPAL声明是否成功。

完成以上步骤后，可以开始IM服务的部署，如果以上前置步骤未完成，请先解决修复。
