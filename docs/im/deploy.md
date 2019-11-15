# 启动和部署所有服务
除了C++的chatserver以后，其他的服务都使用supervisor管理，supervisor管理脚本放在/etc/supervisor/conf.d目录

需要创建如下配置文件

### 1 配置redis-server，使用  touch redis.conf 命令

```
[program:redis]
command=/usr/bin/redis-server
stdout_logfile=/run/log/redis.log
stderr_logfile=/run/log/redis_error.log
```

### 2  配置 consul.conf
```
[program:consul]
command=/usr/local/bin/consul agent -dev -client 0.0.0.0 --ui
autostart=true
autorestart=true
startsecs=20
startretries=3
stopasgroup=true
stdout_logfile=/run/log/consul.log
stderr_logfile=/run/log/consul_error.log
```

### 3 配置 filestore.conf

```
[program:filestore]
directory=/home/admin/filestore/
command=./filestore
autostart=true
autorestart=true
startsecs=20
startretries=3
stopasgroup=true
stdout_logfile=/home/admin/filestore/logs/stdout.log
stderr_logfile=/home/admin/filestore/logs/stderr.log
```

### 4 配置 router.conf
```
[program:router]
directory=/home/admin/router/
command=./router
autostart=true
autorestart=true
startsecs=20
startretries=3
stopasgroup=true
stdout_logfile=/home/admin/router/logs/stdout.log
stderr_logfile=/home/admin/router/logs/stderr.log
```

### 5 配置 servicehub.conf
```
[program:servicehub]
directory=/home/admin/servicehub/
command=./servicehub
autostart=true
autorestart=true
startsecs=20
startretries=3
stopasgroup=true
stdout_logfile=/home/admin/servicehub/logs/stdout.log
stderr_logfile=/home/admin/servicehub/logs/stderr.log
```

### 6 启动所有服务

执行 supervisoctl 命令
然后输入  reload
输入 status 查看服务状态,应该需要全部是running状态才是正常


