# Service deployment

Deployment of services is performed in document order

## 1 Open to external ports
The following ports are currently required to be accessible on the Internet

* 4455  Client and server establish TCP long link port
* 80   HTTP service

## 2 Start basic services

The nginx service has been started in the basic environment preparation. Here you need to start the redis-server and consul services.

```bash
sudo cp /home/admin/code/netcloth-server/script/supervisor/consul.conf /etc/supervisor/conf.d/
sudo cp /home/admin/code/netcloth-server/script/supervisor/redis.conf /etc/supervisor/conf.d/

sudo supervisorctl
> update
> start consul
> start redis
> status
```

If the supervisor daemon is not started, start the supervisor daemon first

```bash
sudo service supervisor start
```

## 3 Start Go service

```bash
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

View the service startup status through the status command of the supervisorctl tool

## 4 Start C ++ service

```bash
cd /home/admin/chatserver
./chatserver
```
