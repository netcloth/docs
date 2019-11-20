# 服务部署

服务的部署按照文档顺序执行

## 1 对外端口开放
当前需要以下端口可在外网访问

* 4455 客户端和服务端建立TCP长链接端口
* 80   HTTP服务

## 2 启动基础服务

在基础环境准备中已启动了nginx服务，这里需要启动redis-server和consul服务

```
sudo cp /home/admin/code/netcloth-server/script/supervisor/consul.conf /etc/supervisor/conf.d/
sudo cp /home/admin/code/netcloth-server/script/supervisor/redis.conf /etc/supervisor/conf.d/

sudo supervisorctl
> update
> start consul
> start redis
> status
```

如果supervisor守护进程未启动，先启动supervisor守护进程

```
sudo service supervisor start
```

## 3 启动Go服务

```
sudo cp /home/admin/code/netcloth-server/script/supervisor/filestore.conf /etc/supervisor/conf.d/
sudo cp /home/admin/code/netcloth-server/script/supervisor/router.conf /etc/supervisor/conf.d/
sudo cp /home/admin/code/netcloth-server/script/supervisor/servicehub.conf /etc/supervisor/conf.d/

sudo supervisorctl
> update
> start filestore
> start router
> start servicehub
> status
```

通过supervisorctl工具的status命令查看服务启动状态

## 4 启动C++服务

```
cd /home/admin/chatserver
./chatserver
```
