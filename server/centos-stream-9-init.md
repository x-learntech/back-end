# Centos Stream 9 初始化

```bash
# 查看centos的版本
cat /etc/redhat-release 
```

## 配置国内源 阿里云源

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

ps：我在腾讯云里选择此公共镜像，发现默认已经被替换为腾讯云的镜像了。

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
dnf download nginx
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

## mysql

```bash
# 安装
sudo dnf install mysql mysql-server

# 验证是否安装成功
mysql --version

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

# root 账户登录
mysql -u root -p

# 新增用户： user:nufun pwd:123456
CREATE USER 'nufun'@'localhost' IDENTIFIED BY '123456';
# 授权用户所有权限
GRANT ALL ON *.* TO 'nufun'@'localhost';
```

## nginx

```bash
sudo dnf install nginx
```

## docker

PS：后续环境可能直接走docker了

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
