# NetCloth Instant messaging service deployment environment preparation

## Procedures introduction

![](../../images/procedure_IM_deploy.png)

The deployment is divided into two parts: deploy a blockchain node and IM server deployment. If you have not deployed a blockchain node, please deploy the blockchain nodes according to the document ([click here](../get-started/how-to-join-testnet.md)) and then continue to build the instant messaging server.

## 1 OS and user add

### 1.1 OS requirements

Software development and operation and maintenance are based on **<font color=red>Linux</font>** operating system.

The current operating system is Ubuntu 18.04 server version, C ++ compiler is 7.x or above, and supports **<font color=red>C++ 17</font> **. If you use other Linux versions during the deployment There will be slight differences.

### 1.2 Create admin user

To deploy using the admin user, you need to create a new admin account and add sudo execution permissions

* To create a new admin user, you need the sudo or root user to perform the following operations:

```
adduser admin
usermod -aG sudo admin
```
## 2 Basic service deployment

### 2.1 nginx install and configuration
#### 2.1.1 Install nginx
```
sudo apt install nginx-full
```
Perform nginx -v check after installation, use nginx 1.14 or later

#### 2.1.2 Modify nginx parameters
Modify the file: /etc/nginx/nginx.conf

Add a new line in the http option to set the body size limit of the POST request

```
client_max_body_size 20m;
```
#### 2.1.3 Setting up a reverse proxy

Modify / etc / nginx / sites-available / default (Ubutu nginx 1.14) or /etc/nginx/conf.d/default.conf (nginx 1.15 and above) files.

Add the following options in the server configuration

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

After the modification is completed, execute the following command to detect and start nginx

```
nginx -t
nginx
```

Related configuration files

* [nginx.conf](./config/nginx.conf)
* [default](./config/default)


### 2.2 deploy redis-server

```
sudo apt install redis-server
```

### 2.3 Download and install consul

```
wget https://releases.hashicorp.com/consul/1.6.1/consul_1.6.1_linux_amd64.zip

unzip consul_1.6.1_linux_amd64.zip
sudo mv consul /usr/local/bin
```

### 2.4 Install supervisor

```
sudo apt install supervisor
```

## 3 Environment variable settings
 Add the following configuration to the .bashrc or .bash_profile. The GOPROXY variable depends on the network status to determine whether to configure. After the configuration, execute source .bashrc

```
export PATH=$PATH:/usr/local/bin:/usr/local/go/bin:/home/admin/go/bin

export GOPATH=/home/admin/go
export GO111MODULE=on
export GOPROXY=https://goproxy.io

LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
export LD_LIBRARY_PATH
```
