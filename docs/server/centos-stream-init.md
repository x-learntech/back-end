# Centos 初始化

> 此处系统为 Centos Stream 9

```bash
# 查看centos的版本
cat /etc/redhat-release

# 更新系统软件
yum update -y

#安装编译工具
yum install wget gcc automake autoconf libtool yum-utils gcc-c++ -y
```

## 创建普通用户

```bash
# 创建一个名为user的用户
$ adduser user
# 给user创建登录密码
$ passwd user
# 设置完密码后就可以使用user用户名和密码来登录主机了。但是此时user并没有ROOT的权限，我们通过编辑sudoers文件给user赋权，在终端执行：
$ visudo
# 在sudoers的最后一行加入：
$ user    ALL=(ALL)       ALL

# 删除用户
$ userdel user
```

## 安全加固

```bash
$ vi /etc/ssh/sshd_config
# 在打开的配置文件末尾输入以下内容，其中Port您可以自行设置：
$ Port 10022
$ Protocol 2
$ PermitRootLogin no

# 保存后退出，然后reload ssh服务，使配置生效：
$ service sshd reload
# 当再次登录云主机时，您需要在配置文件中指定的Port参数：
ssh -p 10022 user@ip
```

## 防火墙

```bash
systemctl  start/stop/restart/status firewalld.service #启动/停止/重启/查看firewall
systemctl disable firewalld.service #禁止firewall开机启动

# 开启80端口:
firewall-cmd --zone=public --add-port=80/tcp --permanent

firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
```

> 命令含义：
> --zone #作用域
> --add-port=80/tcp #添加端口，格式为：端口/通讯协议
> --permanent #永久生效，没有此参数重启后失效

## 连接时间设置

修改/etc/ssh/sshd_config 文件，将 ClientAliveInterval 0 和 ClientAliveCountMax 3 的注释符号去掉，将 ClientAliveInterval 对应的 0 改成 60。

- ClientAliveInterval 指定了服务器端向客户端请求消息的时间间隔，默认是 0，不发送。而 ClientAliveInterval 60 表示每分钟发送一次，然后客户端响应，这样就保持长连接了。
- ClientAliveCountMax，使用默认值 3 即可。ClientAliveCountMax 表示服务器发出请求后客户端没有响应的次数达到一定值，就自动断开。

保存后退出，然后重启 ssh 服务，使配置生效： `service sshd reload`

## 通过 ssh 免密登录

```bash
# 本地生成sshkey，运行命令,一路回车
$ ssh-keygen
# 把公匙复制到目标主机的.ssh/authorized_keys 中
# 目标主机生成authorized_keys（若没有authorized_keys时）
$ cat ~/id_rsa.pub >> ~/.ssh/authorized_keys
# 确保没被注释
$ AuthorizedKeysFile .ssh/authorized_keys
# 配置合适的权限（手动时）
$ chmod 600 ~/.ssh/authorized_keys
# 重启（不一定）
$ service sshd restart
# 正常登录即可
$ ssh user@ip
```

## 配置国内源

PS：示例为阿里云源

```bash
# CentOS-Base.repo
#
# The mirror system uses the connecting IP address of the client and the
# update status of each mirror to pick mirrors that are updated to and
# geographically close to the client.  You should use this for CentOS updates
# unless you are manually picking other mirrors.
#
# If the mirrorlist= does not work for you, as a fall back you can try the
# remarked out baseurl= line instead.
#
#

[base]
name=CentOS-$releasever - Base - mirrors.aliyun.com
#failovermethod=priority
baseurl=https://mirrors.aliyun.com/centos-stream/$stream/BaseOS/$basearch/os/
        http://mirrors.aliyuncs.com/centos-stream/$stream/BaseOS/$basearch/os/
        http://mirrors.cloud.aliyuncs.com/centos-stream/$stream/BaseOS/$basearch/os/
gpgcheck=1
gpgkey=https://mirrors.aliyun.com/centos-stream/RPM-GPG-KEY-CentOS-Official

#additional packages that may be useful
#[extras]
#name=CentOS-$releasever - Extras - mirrors.aliyun.com
#failovermethod=priority
#baseurl=https://mirrors.aliyun.com/centos-stream/$stream/extras/$basearch/os/
#        http://mirrors.aliyuncs.com/centos-stream/$stream/extras/$basearch/os/
#        http://mirrors.cloud.aliyuncs.com/centos-stream/$stream/extras/$basearch/os/
#gpgcheck=1
#gpgkey=https://mirrors.aliyun.com/centos-stream/RPM-GPG-KEY-CentOS-Official

#additional packages that extend functionality of existing packages
[centosplus]
name=CentOS-$releasever - Plus - mirrors.aliyun.com
#failovermethod=priority
baseurl=https://mirrors.aliyun.com/centos-stream/$stream/centosplus/$basearch/os/
        http://mirrors.aliyuncs.com/centos-stream/$stream/centosplus/$basearch/os/
        http://mirrors.cloud.aliyuncs.com/centos-stream/$stream/centosplus/$basearch/os/
gpgcheck=1
enabled=0
gpgkey=https://mirrors.aliyun.com/centos-stream/RPM-GPG-KEY-CentOS-Official

[PowerTools]
name=CentOS-$releasever - PowerTools - mirrors.aliyun.com
#failovermethod=priority
baseurl=https://mirrors.aliyun.com/centos-stream/$stream/PowerTools/$basearch/os/
        http://mirrors.aliyuncs.com/centos-stream/$stream/PowerTools/$basearch/os/
        http://mirrors.cloud.aliyuncs.com/centos-stream/$stream/PowerTools/$basearch/os/
gpgcheck=1
enabled=0
gpgkey=https://mirrors.aliyun.com/centos-stream/RPM-GPG-KEY-CentOS-Official


[AppStream]
name=CentOS-$releasever - AppStream - mirrors.aliyun.com
#failovermethod=priority
baseurl=https://mirrors.aliyun.com/centos-stream/$stream/AppStream/$basearch/os/
        http://mirrors.aliyuncs.com/centos-stream/$stream/AppStream/$basearch/os/
        http://mirrors.cloud.aliyuncs.com/centos-stream/$stream/AppStream/$basearch/os/
gpgcheck=1
gpgkey=https://mirrors.aliyun.com/centos-stream/RPM-GPG-KEY-CentOS-Official
```

ps：我在腾讯云里选择此公共镜像，发现默认已经被替换为腾讯云的镜像了，就没必要额外修改了。

```bash
# 更新缓存
dnf makecache
```

from：[https://mirrors.ustc.edu.cn/help/centos.html](https://mirrors.ustc.edu.cn/help/centos.html)

## 软件管理工具 dnf

```bash
# dnf 版本
dnf --version

ll /usr/bin/yum
/usr/bin/yum -> dnf-3 # 可见yum是一个符号链接，链接到了dnf-3
```

```bash
dnf repolist # 列出系统上的存储库,状态是enabled

dnf repoinfo BaseOS # 查看某个repo的详细信息

dnf repolist -v BaseOS # 查看某个repo的详细信息

dnf list # 列出所有软件包

dnf list installed # 查看已安装的列表
```

```bash
# 查找包
dnf search zsh
# 查看包信息
dnf info zsh
# 安装
dnf install zsh
# 从指定的repo安装一个rpm包
dnf --enablerepo=BaseOS install zsh
# 仅下载，不安装
dnf download zsh
# 删除包
dnf remove zsh
# 删除缓存的无用软件包
dnf clean all
# 更新指定的软件包
dnf update zsh
# 更新所有的软件包
dnf update
# 也可以用upgrade
dnf upgrade
# 检查可以更新的软件包
dnf check-update
```

## git

```bash
sudo dnf -y install git

# 查看版本
git --version
# git version 2.31.1
```

## mysql

```bash
# 安装
sudo dnf install mysql mysql-server -y

# 验证是否安装成功
mysql --version

# 或者这样查看
ps -ef | grep mysql
mysqladmin --version # mysqladmin  Ver 8.0.30 for Linux on x86_64 (Source distribution)

# 开启服务
sudo systemctl start mysqld
# 查看运行状态
sudo systemctl status mysqld
# 开机启动
sudo systemctl enable mysqld
```

```bash
# 安全设置，比如，设置密码root
mysql_secure_installation

# 账户登录，此处为root
mysql -u root -p

# 新增用户： user:nufun pwd:123456
CREATE USER 'nufun'@'localhost' IDENTIFIED BY '123456';
# 授权用户所有权限
GRANT ALL ON *.* TO 'nufun'@'localhost';
# 刷新权限表
flush privileges;
```

PS：如果是低配版本的云服务器，比如 1 核 1G，那么建议关闭性能分析。不然，默认会占用约 40%的内存，优化后至少可以降一半。

```bash
# /etc/my.cnf
# This group is read both both by the client and the server
# use it for options that affect everything
#
[client-server]

[mysqld]
#关闭性能分析
performance_schema=off
```

## nginx

```bash
sudo dnf install nginx -y

# 开启服务
sudo systemctl start nginx
# 查看运行状态
sudo systemctl status nginx
# 开机启动
sudo systemctl enable nginx
```

## nodejs

```bash
# 以下是获取系统默认的nodejs版本
dnf info nodejs # =》Version      : 10.23.1

# 查看可用的nodejs版本，会列出 10、12、14、16、18这些版本，并默认了10版本
dnf module list nodejs
# 重置默认版本为18的最新稳定版
dnf module reset nodejs
dnf module enable nodejs:18
# 安装18版本
dnf module -y install nodejs:18/common
# 查看已经安装的module
dnf module list --installed
```

```bash
sudo dnf -y install nodejs

# 查看版本
node -v
# v16.16.0
```

## java

```bash
sudo dnf install java-11-openjdk -y

# 查看版本
java --version
# openjdk 11.0.17 2022-10-18 LTS
# OpenJDK Runtime Environment (Red_Hat-11.0.17.0.8-2.el9) (build 11.0.17+8-LTS)
# OpenJDK 64-Bit Server VM (Red_Hat-11.0.17.0.8-2.el9) (build 11.0.17+8-LTS, mixed mode, sharing)
```

## docker

PS：后续环境可能直接走 docker 了，低配版服务器不建议

手动更换为阿里云镜像

```bash
$ sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

$ sudo sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

# 官方源
# $ sudo yum-config-manager \
#     --add-repo \
#     https://download.docker.com/linux/centos/docker-ce.repo
```

脚本方式全自动安装最新稳定版，并设置镜像为阿里云

```bash
# $ curl -fsSL test.docker.com -o get-docker.sh
$ curl -fsSL get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh --mirror Aliyun
# $ sudo sh get-docker.sh --mirror AzureChinaCloud


# 验证安装是否成功
docker run --rm hello-world
```
