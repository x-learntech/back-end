# Nginx 配置

Nginx 出现的初衷是为了解决著名的 C10K 问题而出现的。和传统的 Web Server 不一样，Nginx 使用了异步事件处理机制架构。这种架构可以轻松高效地处理大量的请求，并且非常的节省内存。高性能是 Nginx 最大的优点。安装用稳定版，以下出现的配置只在 Mac 或者 centos 环境下验证过。

官网是：[nginx](http://nginx.org/)

为什么选择 Nginx：

1. 占用内存小。这得益于 Nginx 使用 C 语言编写，能够高效使用 CPU、内存等系统资源。并且作者自己造了很多的轮子，比如 Nginx 自己实现了内存管理系统，动态数组机制等。Nginx 作者对内存的使用控制简直到了丧心病狂的地步，所以非常的节省系统资源，特别是内存；
2. 高并发。在 Linux 系统上，Nginx 使用了 epoll 机制，能够高效处理大量的连接数。理论上，Nginx 可以同时处理的最大连接数取决于你的机器的物理内存，上不封顶；
3. 高可靠性。我认为 Nginx 的高可靠性主要体现在两方面:
   1. Nginx 使用了 Master-Worker 机制，真正处理请求的是 Worker 进程。Master 进程可以监控 Worker 进程的运行状况，当某个 Worker 进程因意外原因退出的时候，Master 会重新启动 Worker 进程；
   2. Nginx 的内部框架非常优秀。它的各个模块都非常简单，所以也非常的稳定。
4. 热部署。可能大家觉得这个原因并不重要，其实在实际的线上环境是非常重要的。代码上线之后，我们只需要执行 `nginx -s reload` 命令就可以完成 Nginx 的重启，其他的交给 Nginx 就可以了，你可以安心去喝咖啡了。

ps：C10K 就是 Client 10000 问题，即「在同时连接到服务器的客户端数量超过 10000 个的环境中，即便硬件性能足够，依然无法正常提供服务」，简而言之，就是单机 1 万个并发连接问题。

## nginx.conf 配置文件

nginx 采用了简单的文本格式的配置文件，下图总结了 nginx 指令一些特性。

![1506-aZ48b1](https://cdn-static.learntech.cn/notes/20211115/1506-aZ48b1.png!min)

Nginx 配置文件主要分成四部分：main（全局设置）、server（主机设置）、upstream（上游服务器设置，主要为反向代理、负载均衡相关配置）和 location（URL 匹配特定位置后的设置），每部分包含若干个指令。

- main 部分设置的指令将影响其它所有部分的设置；
- server 部分的指令主要用于指定虚拟主机域名、IP 和端口；
- upstream 的指令用于设置一系列的后端服务器，设置反向代理及后端服务器的负载均衡；
- location 部分用于匹配网页位置（比如，根目录`/`，`/images`，等等）。

他们之间的关系式：

- server 继承 main
- location 继承 server
- upstream 既不会继承指令也不会被继承。它有自己的特殊指令，不需要在其他地方的应用。

## 常用指令说明

### main 全局配置

nginx 在运行时与具体业务功能（比如 http 服务或者 email 服务代理）无关的一些参数，比如工作进程数，运行的身份等。

- woker_processes 2
  在配置文件的顶级 main 部分，worker 角色的工作进程的个数，master 进程是接收并分配请求给 worker 处理。这个数值简单一点可以设置为 cpu 的核数 `grep ^processor /proc/cpuinfo | wc -l`，也是 auto 值，如果开启了 ssl 和 gzip 更应该设置成与逻辑 CPU 数量一样甚至为 2 倍，可以减少 I/O 操作。如果 nginx 服务器还有其它服务，可以考虑适当减少。
- worker_cpu_affinity
  也是写在 main 部分。在高并发情况下，通过设置 cpu 粘性来降低由于多 CPU 核切换造成的寄存器等现场重建带来的性能损耗。如 `worker_cpu_affinity 0001 0010 0100 1000;` （四核）。
- worker_connections 2048
  写在 events 部分。每一个 worker 进程能并发处理（发起）的最大连接数（包含与客户端或后端被代理服务器间等所有连接数）。nginx 作为反向代理服务器，计算公式：最大连接数 = `worker_processes * worker_connections / 4`，所以这里客户端最大连接数是 1024，这个可以增到到 8192 都没关系，看情况而定，但不能超过后面的 worker_rlimit_nofile。当 nginx 作为 http 服务器时，计算公式里面是除以 2。
- worker_rlimit_nofile 10240
  写在 main 部分。默认是没有设置，可以限制为操作系统最大的限制 65535。
- use epoll
  写在 events 部分。在 Linux 操作系统下，nginx 默认使用 epoll 事件模型，得益于此，nginx 在 Linux 操作系统下效率相当高。同时 Nginx 在 OpenBSD 或 FreeBSD 操作系统上采用类似于 epoll 的高效事件模型 kqueue。在操作系统不支持这些高效模型时才使用 select。

### http 服务器

与提供 http 服务相关的一些配置参数。例如：是否使用 keepalive 啊，是否使用 gzip 进行压缩等。

- `sendfile on`
  开启高效文件传输模式，sendfile 指令指定 nginx 是否调用 sendfile 函数来输出文件，减少用户空间到内核空间的上下文切换。对于普通应用设为 on，如果用来进行下载等应用磁盘 IO 重负载应用，可设置为 off，以平衡磁盘与网络 I/O 处理速度，降低系统的负载。
- `keepalive_timeout 65`：长连接超时时间，单位是秒，这个参数很敏感，涉及浏览器的种类、后端服务器的超时设置、操作系统的设置，可以另外起一片文章了。长连接请求大量小文件的时候，可以减少重建连接的开销，但假如有大文件上传，65s 内没上传完成会导致失败。如果设置时间过长，用户又多，长时间保持连接会占用大量资源。
- `send_timeout`：用于指定响应客户端的超时时间。这个超时仅限于两个连接活动之间的时间，如果超过这个时间，客户端没有任何活动，Nginx 将会关闭连接。
- `client_max_body_size 10m`
  允许客户端请求的最大单文件字节数。如果有上传较大文件，请设置它的限制值
- `client_body_buffer_size 128k`
  缓冲区代理缓冲用户端请求的最大字节数

### 模块 http_proxy

这个模块实现的是 nginx 作为反向代理服务器的功能，包括缓存功能

- `proxy_connect_timeout 60`
  nginx 跟后端服务器连接超时时间(代理连接超时)
- `proxy_read_timeout 60`
  连接成功后，与后端服务器两个成功的响应操作之间超时时间(代理接收超时)
- `proxy_buffer_size 4k`
  设置代理服务器（nginx）从后端 realserver 读取并保存用户头信息的缓冲区大小，默认与 proxy_buffers 大小相同，其实可以将这个指令值设的小一点
- `proxy_buffers 4 32k`
  proxy_buffers 缓冲区，nginx 针对单个连接缓存来自后端 realserver 的响应，网页平均在 32k 以下的话，这样设置
- `proxy_busy_buffers_size 64k`
  高负荷下缓冲大小（`proxy_buffers*2`）
- `proxy_max_temp_file_size`
  当 proxy_buffers 放不下后端服务器的响应内容时，会将一部分保存到硬盘的临时文件中，这个值用来设置最大临时文件大小，默认 1024M，它与 proxy_cache 没有关系。大于这个值，将从 upstream 服务器传回。设置为 0 禁用。
- `proxy_temp_file_write_size 64k`
  当缓存被代理的服务器响应到临时文件时，这个选项限制每次写临时文件的大小。proxy_temp_path（可以在编译的时候）指定写到哪那个目录。

### 模块 http_gzip

- `gzip on`：开启 gzip 压缩输出，减少网络传输。
  - `gzip_min_length 1k`：设置允许压缩的页面最小字节数，页面字节数从 header 头得 content-length 中进行获取。默认值是 20。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大。
  - `gzip_buffers 4 16k`：设置系统获取几个单位的缓存用于存储 gzip 的压缩结果数据流。4 16k 代表以 16k 为单位，安装原始数据大小以 16k 为单位的 4 倍申请内存。
  - `gzip_http_version 1.0`：用于识别 http 协议的版本，早期的浏览器不支持 Gzip 压缩，用户就会看到乱码，所以为了支持前期版本加上了这个选项，如果你用了 Nginx 的反向代理并期望也启用 Gzip 压缩的话，由于末端通信是 http/1.0，故请设置为 1.0。
  - `gzip_comp_level 6`：gzip 压缩比，1 压缩比最小处理速度最快，9 压缩比最大但处理速度最慢(传输快但比较消耗 cpu)
  - `gzip_types`：配 mime 类型进行压缩，无论是否指定,”text/html”类型总是会被压缩的。
  - `gzip_proxied any`：Nginx 作为反向代理的时候启用，决定开启或者关闭后端服务器返回的结果是否压缩，匹配的前提是后端服务器必须要返回包含”Via”的 header 头。
  - `gzip_vary on`：和 http 头有关系，会在响应头加个 Vary: Accept-Encoding ，可以让前端的缓存服务器缓存经过 gzip 压缩的页面。

## server 虚拟主机

http 服务上支持若干虚拟主机。每个虚拟主机一个对应的 server 配置项，配置项里面包含该虚拟主机相关的配置。在提供 mail 服务的代理时，也可以建立若干 server。每个 server 通过监听地址或端口来区分。

- listen
  
  监听端口，默认 80，小于 1024 的要以 root 启动。可以为 `listen *:80`、`listen 127.0.0.1:80` 等形式。

  若带上 default 参数，例如：`listen 80 default;` 则若其他网站解析失败或未设置时会访问这个配置。

- server_name
  
  服务器名，如 localhost、www.example.com，可以通过正则匹配。

### 模块 http_stream

这个模块通过一个简单的调度算法来实现客户端 IP 到后端服务器的负载均衡，upstream 后接负载均衡器的名字，后端 realserver 以 host:port options; 方式组织在 {} 中。如果后端被代理的只有一台，也可以直接写在 proxy_pass 。

## location

http 服务中，某些特定的 URL 对应的一系列配置项。location是nginx的一大利器，该指令可以让根据请求的URI分别进行不同的处理。示例如下：

- `root /var/www/html`
  定义服务器的默认网站根目录位置。如果 locationURL 匹配的是子目录或文件，root 没什么作用，一般放在 server 指令里面或/下。
- `index index.jsp index.html index.htm`
  定义路径下默认访问的文件名，一般跟着 root 放
- `proxy_pass http:/backend`
  请求转向 backend 定义的服务器列表，即反向代理，对应 upstream 负载均衡器。也可以 `proxy_pass http://ip:port`。
- `proxy_redirect off;`
- `proxy_set_header Host $host;`
- `proxy_set_header X-Real-IP $remote_addr;`
- `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`
  这四个暂且这样设，如果深究的话，每一个都涉及到很复杂的内容。

匹配情况分类:

1. 普通匹配(没有任何修饰符)
2. 精确匹配(以 `=` 开头)
3. 最长前缀匹配(以 `^~` 开头)
4. 正则匹配
    - 区分大小写的正则(以 `~` 开头)
    - 忽略大小写的正则(以 `~*` 开头)
5. 内部location(以 `@` 开头)

匹配顺序： ![1607-Y8QAMt](https://cdn-static.learntech.cn/notes/20211115/1607-Y8QAMt.png!min)

## 其它

### 访问控制 allow/deny

隐藏版本号： `server_tokens off;`

在 http，server，location 中设置，建议在全局 http 中设置。

### 访问控制 allow/deny

Nginx 的访问控制模块默认就会安装，而且写法也非常简单，可以分别有多个 allow,deny，允许或禁止某个 ip 或 ip 段访问，依次满足任何一个规则就停止往下匹配。如：

```nginx
location /nginx-status {
 stub_status on;
 access_log off;

 allow 192.168.10.100;
 allow 172.29.73.0/24;
 deny all;
}
```

### 为访问的路径设置登录密码

```nginx
# htpasswd -c htpasswd admin
New passwd:
Re-type new password:
Adding password for user admin

# htpasswd htpasswd admin //修改admin密码
# htpasswd htpasswd sean //多添加一个认证用户
```

打开上面 nginx-status 的两行注释，重启 nginx 生效。

### 列出目录 autoindex

Nginx 默认是不允许列出整个目录的。如需此功能，打开 nginx.conf 文件，在 location，server 或 http 段中加入 `autoindex on;`，另外两个参数最好也加上去:

- `autoindex_exact_size off;` 默认为 on，显示出文件的确切大小，单位是 bytes。改为 off 后，显示出文件的大概大小，单位是 kB 或者 MB 或者 GB
- `autoindex_localtime on;`
  默认为 off，显示的文件时间为 GMT 时间。改为 on 后，显示的文件时间为文件的服务器时间

```nginx
# 列出图片
location /images {
  root /var/www/nginx-default/images;
  autoindex on;
  autoindex_exact_size off;
  autoindex_localtime on;
}
```

## 一些常见的设置

### 默认配置文件 default.config

```nginx
#user  nobody;
worker_processes  1;

error_log  /usr/local/Cellar/nginx/logs/error.log;
#error_log  /usr/local/Cellar/nginx/logs/error.log  notice;
#error_log  /usr/local/Cellar/nginx/logs/error.log  info;

#pid        /usr/local/Cellar/nginx/logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    # access_log  /usr/local/Cellar/nginx/logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    gzip  on;
    add_header Cache-Control 'public, max-age=0';
    include servers/*;
}
```

### 经典的 80 端口设置

```nginx
# 静态文件 demo
server {
    listen       80;
    server_name  static.domain.cn;

    #access_log  /var/log/nginx/log/host.access.log  main;
    root  /data/www/static;
    index index.html;
    location / {

    }
}

# 后端PHP CI框架 demo
# PHP 7.x，下同
server {
    listen       80;
    server_name  api.domain.cn;
    # access_log  /var/log/nginx/api.domain.access.log  main;
    set $root_path  '/data/www/domain/api';
    root $root_path;
    index index.php index.html;
    if ($request_uri !~* (^\/$|\/(favicon\.ico|css|js|page_err|images|cache|chart|upload|fonts|plugin|robots\.txt|MP_verify_en|index\.php.*)))
    {
        rewrite ^/(.*)$ /index.php/$1 break;
    }

    location ~ .*\.php?($|/)
    {
        fastcgi_intercept_errors on;
        fastcgi_index  index.php;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
  # 静态资源
   location ~* ^/(css|img|js|flv|swf|download)/(.+)$ {
        root $root_path;
    }

}

# laravel/lumen 框架 demo
server {
    listen 80;
    server_name api.party.local;
    #access_log /var/log/nginx/log/host.access.log main;
    root /data/public;
    index index.php index.html;

    location / {
    try_files $uri $uri/ /index.php?$query_string;
    }

    #error_page 404 /404.html;
    # redirect server error pages to the static page /50x.html
    #
    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        root /usr/share/nginx/html;
    }
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    location ~ .*\.php?($|/)
    {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### 经典的 443 端口设置（https）

```nginx
# 后端PHP CI框架 demo
server {
    listen       443 ssl;
    server_name  api.domain.cn;

    ssl_certificate /etc/nginx/cert/api.domain.public.pem;
    ssl_certificate_key /etc/nginx/cert/api.domain.private.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_session_cache shared:SSL:50m;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-Xss-Protection 1;

    #access_log  /var/log/nginx/log/host.access.log  main;
    set $root_path  '/data/www/domain/api';
    root $root_path;
    index index.php index.html;
    if ($request_uri !~* (^\/$|\/(favicon\.ico|css|js|page_err|images|cache|chart|upload|fonts|plugin|robots\.txt|index\.php.*)))
    {
        rewrite ^/(.*)$ /index.php/$1 break;
    }

    location ~ .*\.php?($|/)
    {
        fastcgi_intercept_errors on;
        fastcgi_index  index.php;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }

   location ~* ^/(css|img|js|flv|swf|download)/(.+)$ {
        root $root_path;
    }
}

# node 小程序服务器端
upstream app_weapp {
    server localhost:8800;
    keepalive 8;
}

server {
    listen      80;
    server_name api.amoylife.cn;
    rewrite ^(.*)$ https://$server_name$1 permanent;
}

server {
    listen 443 ssl;
    server_name api.amoylife.cn;

    ssl_certificate /etc/nginx/cert/api.amoylife.cn_bundle.crt;
    ssl_certificate_key /etc/nginx/cert/api.amoylife.cn.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA;
    ssl_session_cache shared:SSL:50m;

    location / {
      proxy_pass http://app_weapp;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### nodejs、 java 等环境配置

此方法也可以做本地反向代理，处理接口跨域问题。

```nginx
upstream party_client {
    #weight 参数表示权值，权值越高被分配到的几率越大
    #1.down 表示单前的server暂时不参与负载
    #2.weight 默认为1.weight越大，负载的权重就越大。
    #3.backup： 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。
    server 127.0.0.1:8801 max_fails=3 fail_timeout=2s weight=1;
    keepalive 10;
}

upstream party_client_api {
    server 127.0.0.1:8000 max_fails=3 fail_timeout=2s;
    keepalive 10;
}

server {
    listen 80;
    server_name party.local;

    #access_log /var/log/nginx/log/host.access.log main;
    #root /Users/ruxin/party-project/party-construction-server/public;
    #index index.php index.html;

    # api路径转换
    location ~ ^/api/.* {
        rewrite ^/api/(.*)$ /$1 break; # 此行表示请求接口有带/api/，后端实际接口不带/api/
        proxy_pass http://party_client_api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header V-Insecurity Yes;
        proxy_read_timeout 30;
        proxy_connect_timeout 10;
    }

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header V-Insecurity Yes;
        proxy_read_timeout 120;
        proxy_connect_timeout 120;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass  http://party_client;
    }

    #error_page 404 /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

### 强制 https，history 模式

```nginx
# http to https
server {
    listen 80;
    server_name www.learntech.cn learntech.cn;
    rewrite ^(.*) https://$server_name$1 permanent;
    gzip  on;
}

# vue/react等 history 模式重定向
server {
    listen 80;
    server_name url;

    root /data/www/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 二级目录独立站点

> 指二级目录是一个独立的站点，通常对应react或者Vue框架中的 PUBLIC_PATH 属性。

```nginx
# 前端h5配置start
location /h5/ {
  # 不缓存 html 或 htm 后缀页面
  if ($request_filename ~* .*\.(?:htm|html)$) {
    add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    access_log on;
  }

  alias /www/path/h5/;
  index index.html;
  try_files $uri $uri/ /index.html =404; # history 模式，404 重定向
}
# 前端h5配置end
```

其他：[nginx在线配置工具](https://nginxconfig.io/)

PS：新的竞争对手> [Caddy](https://caddyserver.com/)
