# centos 8 升级到 centos stream 9

```bash
# 首先，输入如下命令，查看你的dnf仓库是否有centos-release-stream
dnf search centos-release-stream
# 安装centos-release-stream
dnf install -y centos-release-stream
# 设置默认仓库
dnf swap centos-linux-repos centos-stream-repos
# 检查下当前系统，其实就已经切换为stream了
cat /etc/centos-release # CentOS Stream release 8
```
