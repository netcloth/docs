# 服务部署

服务的部署按照文档顺序执行

## 1 对外端口开放
当前需要以下端口可在外网访问

* 4455 客户端和服务端建立TCP长链接端口
* 80   HTTP服务
* 1080 gRPC服务

## 2 启动基础服务

在基础环境准备中已启动了nginx服务，这里需要启动redis-server和consul服务

注意：如果redis-server已启动，则不需要执行redis相关操作

```bash
sudo cp /home/admin/code/netcloth-server/script/supervisor/consul.conf /etc/supervisor/conf.d/
sudo cp /home/admin/code/netcloth-server/script/supervisor/redis.conf /etc/supervisor/conf.d/

sudo supervisorctl
> update
> start consul
> start redis
> status
```

如果supervisor守护进程未启动，先启动supervisor守护进程

```bash
sudo service supervisor start
```

## 3 启动Go服务

```bash
sudo cp /home/admin/code/netcloth-server/script/supervisor/filestore.conf /etc/supervisor/conf.d/
sudo cp /home/admin/code/netcloth-server/script/supervisor/router.conf /etc/supervisor/conf.d/
sudo cp /home/admin/code/netcloth-server/script/supervisor/servicehub.conf /etc/supervisor/conf.d/
sudo cp /home/admin/code/netcloth-server/script/supervisor/group.conf /etc/supervisor/conf.d/

sudo supervisorctl
> update
> start consul
> start filestore
> start router
> start servicehub
> start group
> status
```

通过supervisorctl工具的status命令查看服务启动状态

## 4 启动C++服务
启动服务

```bash
cd home/admin/gateway/
./gateway
```
