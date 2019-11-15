# NetCloth即时通讯服务部署环境准备
## 1 操作系统和用户添加
### 1.1 操作系统要求
必须使用Linux操作系统

当前使用的操作系统为Ubuntu 18.04 server版本，如果使用其他Linux版本在部署过程中会有略微差异。

### 1.2 创建admin用户
使用admin用户部署，需要新建一个admin账号，并且添加sudo执行权限

* 新造admin用户操作，需要sudo用户或root用户，执行以下操作

```
adduser admin
usermod -aG sudo admin
```
## 2 基础服务部署

### 2.1 PHP环境
下载[XAMPP](https://sourceforge.net/projects/xampp/files/XAMPP%20Linux/7.3.11/xampp-linux-x64-7.3.11-0-installer.run/download), 下载完成后执行如下操作：

```
chmod +x xampp-linux-x64-7.3.11-0-installer.run
sudo ./xampp-linux-x64-7.3.11-0-installer.run
```

安装完成后，停止Apache HTTP服务，执行如下操作

```
sudo /opt/lampp/lampp stop
```

 安装和配置nginx服务器

### 2.2 nginx安装和配置
#### 2.2.1 安装nginx
```
sudo apt install nginx-full
```
安装完成后执行nginx -v检查

#### 2.2.2 修改nginx参数
修改文件： /etc/nginx/nginx.conf

在http选项里面新增一行，设置POST请求Body大小限制

```
client_max_body_size 20m;
```
#### 2.2.3 设置反向代理

修改/etc/nginx/sites-available文件

在server配置里面增加如下选项

```
	location ~* ^/v1/(image|video|file|contacts) {
		proxy_next_upstream error timeout invalid_header http_500 http_503;
		proxy_pass  http://127.0.0.1:8001;
		proxy_set_header X-Forwarded-Proto http;
		proxy_set_header   Host             $host;
		proxy_set_header   X-Real-IP        $remote_addr;
		proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_redirect     off;
		proxy_connect_timeout      1000;
		proxy_send_timeout         2000;
		proxy_read_timeout         2000;
		#proxy_send_lowat          12000;
		proxy_buffer_size          128k;
		proxy_buffers              8 64k;
		proxy_busy_buffers_size    128k;
		proxy_temp_file_write_size 128k;
	}

	location ~* ^/v1/(ping|service|ipal) {
		proxy_next_upstream error timeout invalid_header http_500 http_503;
		proxy_pass  http://127.0.0.1:8000;
		proxy_set_header X-Forwarded-Proto http;
		proxy_set_header   Host             $host;
		proxy_set_header   X-Real-IP        $remote_addr;
		proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_redirect     off;
		proxy_connect_timeout      1000;
		proxy_send_timeout         2000;
		proxy_read_timeout         2000;
		#proxy_send_lowat          12000;
		proxy_buffer_size          128k;
		proxy_buffers              8 64k;
		proxy_busy_buffers_size    128k;
		proxy_temp_file_write_size 128k;
	}

	location ~* ^/v1/router {
		proxy_next_upstream error timeout invalid_header http_500 http_503;
		proxy_pass  http://127.0.0.1:8002;
		proxy_set_header X-Forwarded-Proto http;
		proxy_set_header   Host             $host;
		proxy_set_header   X-Real-IP        $remote_addr;
		proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_redirect     off;
		proxy_connect_timeout      1000;
		proxy_send_timeout         2000;
		proxy_read_timeout         2000;
		#proxy_send_lowat          12000;
		proxy_buffer_size          128k;
		proxy_buffers              8 64k;
		proxy_busy_buffers_size    128k;
		proxy_temp_file_write_size 128k;
	}
```

修改完成后执行如下命令检测和启动nginx

```
nginx -t
nginx
```

相关配置文件

* [nginx.conf](./config/nginx.conf)
* [default](./config/default)


### 2.3 部署redis-server

```
sudo apt install redis-server
```

### 2.4 consul下载和安装

```
wget https://releases.hashicorp.com/consul/1.6.1/consul_1.6.1_linux_amd64.zip

unzip consul_1.6.1_linux_amd64.zip
sudo mv consul /usr/local/bin
```

### 2.5 supervisor安装

```
sudo apt install supervisor
```
