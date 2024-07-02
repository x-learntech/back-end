# Debian 初始化

因为家里的 nas Docker 中使用的服务器环境是直接基于 nginx Docker 容器扩展的，然后 nginx 底层使用的是 debian 12，这边顺手记录一下。

基于个性化定制自己的 Docker 容器。因为当前自己需要用到的运行环境主要就是 node，php，https，所以主要是围绕这三块处理的：

```bash
FROM nginx:latest

# 添加标签
LABEL name="my-nginx-php-node" version="1.0.0"

# 安装依赖及环境
RUN sed -i 's/http:\/\/deb.debian.org/https:\/\/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list.d/debian.sources &&\
    apt-get update && apt-get install -y git curl wget cron vim openssh-server rsync locales vsftpd &&\
    apt-get install -y php8.2 php8.2-common php8.2-cli php8.2-fpm php8.2-mysql php8.2-opcache php8.2-zip php8.2-gd php8.2-mbstring php8.2-curl php8.2-xml php8.2-intl php8.2-imagick &&\
    git clone --depth 1 https://gitee.com/neilpang/acme.sh.git &&\
    cd acme.sh &&\
    ./acme.sh --install -m email@email.com &&\
    echo 'alias acme.sh=~/.acme.sh/acme.sh' >> ~/.bashrc &&\
    . ~/.bashrc &&\
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
    apt-get install -y nodejs

VOLUME ["/data", "/etc/nginx", "/var/log/nginx", "/app/config"]

EXPOSE 22 80 443 8080

# 复制 entrypoint.sh 脚本
COPY entrypoint.sh /entrypoint.sh

# 设置 ENTRYPOINT
ENTRYPOINT ["sh", "/entrypoint.sh"]

# 运行默认命令
CMD ["nginx", "-g", "daemon off;"]
```

## 使用 Docker 容器

其中上面有涉及的文件都是位于 Dockerfile 同层级的目录下，比如 entrypoint.sh，run-test.sh。

entrypoint.sh 如下：

```bash
#!/bin/bash

# 启动 SSH 服务
service ssh start
# 启动 定时 服务
service cron start
# 启动 PHP-FPM 服务
service php8.2-fpm start

# 启动 Node 服务
npm install -g pm2
pm2 start /app/config/ecosystem.config.js

# 运行 Nginx 进程
nginx -g "daemon off;"
```

run-test.sh 如下：

```bash
#!/bin/bash

docker run --name my-nginx-php-node -d -p 1022:22 \
-p 1080:80 \
-v /真机path/app/config:/app/config \
-v /真机path/data:/data \
-v /真机path/etc/nginx:/etc/nginx \
-v /真机path/log:/var/log \
my-nginx-php-node
```

其中 ecosystem.config.js 内容示例如下：

```bash
const path = require("path");

module.exports = {
  apps: [
    {
      name: "my-node-app1",
      script: "npm",
      args: "start", // 使用 npm start 命令
      cwd: path.resolve(__dirname, "../../data/koa2"),
      // watch: ["/data/koa2/index.js"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      restart_policy: {
        window: 1000,
        attempts: 5,
      },
    },
    {
      name: "my-node-app2",
      script: path.resolve(__dirname, "../../data/koa2/new.js"), // node xxx.js
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      restart_policy: {
        window: 1000,
        attempts: 5,
      },
    },
  ],
};
```

### 构建 Docker images 镜像

```bash
docker build -t my-nginx-php-node:latest .
```

### 导出 Docker tar 格式镜像

```bash
docker save -o my-nginx-php-node.tar my-nginx-php-node:latest
```

### 运行 Docker 容器，实际运行需要补充对应的挂载目录

```bash
./run-test.sh
```
