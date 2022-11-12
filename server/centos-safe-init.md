# Centos 常规安全初始化

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
--zone #作用域
--add-port=80/tcp  #添加端口，格式为：端口/通讯协议
--permanent   #永久生效，没有此参数重启后失效

## 连接时间设置

- 修改/etc/ssh/sshd_config文件，将ClientAliveInterval 0和ClientAliveCountMax 3的注释符号去掉，将ClientAliveInterval对应的0改成60。
>
ClientAliveInterval指定了服务器端向客户端请求消息的时间间隔，默认是0，不发送。而ClientAliveInterval 60表示每分钟发送一次，然后客户端响应，这样就保持长连接了。
ClientAliveCountMax，使用默认值3即可。ClientAliveCountMax表示服务器发出请求后客户端没有响应的次数达到一定值，就自动断开。
保存后退出，然后reload ssh服务，使配置生效： service sshd reload

> 使用命令直接用户修改配置文件，设置“TMOUT=1800”，即超时时间为30分钟

```bash
$ vi /etc/profile # 添加下面两行
#设置为30分钟
TMOUT=1800
```

## 通过ssh免密登录

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
