# centos 8 升级到 centos stream 8

> centos 8 开始，dnf已经替代了yum，成为了新的软件管理工具

```bash
# 首先，输入如下命令，查看你的dnf仓库是否有centos-release-stream
dnf search centos-release-stream
# 安装centos-release-stream
dnf install -y centos-release-stream
# 设置默认仓库
dnf swap centos-linux-repos centos-stream-repos
# 检查下当前系统，其实就已经切换为stream了
cat /etc/centos-release # CentOS Stream release 8
# 将已安装的软件包同步到最新的可用版本 可选
dnf distro-sync
```

替换为国内清华大学的源：

```bash
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
         -e 's|^#baseurl=http://mirror.centos.org/$contentdir|baseurl=https://mirrors.ustc.edu.cn/centos|g' \
         -i.bak \
         /etc/yum.repos.d/CentOS-Stream-AppStream.repo \
         /etc/yum.repos.d/CentOS-Stream-BaseOS.repo \
         /etc/yum.repos.d/CentOS-Stream-Extras.repo \
         /etc/yum.repos.d/CentOS-Stream-PowerTools.repo
```

from：[https://mirrors.ustc.edu.cn/help/centos.html](https://mirrors.ustc.edu.cn/help/centos.html)

## 软件安装

默认获取的版本可能是不是最新的，可以通过以下方式切换，以安装nodejs为例：

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
