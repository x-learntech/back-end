# MongoDB 配置

- 官网地址：[https://www.mongodb.com/](https://www.mongodb.com/)
- 中文：[https://www.mongodb.org.cn/](https://www.mongodb.org.cn/)

## 安装流程(centos 7)

官方安装说明文档：[https://docs.mongodb.com/master/tutorial/install-mongodb-on-red-hat/](https://docs.mongodb.com/master/tutorial/install-mongodb-on-red-hat/)

```bash
# Create a /etc/yum.repos.d/mongodb-org-4.2.repo file so that you can install MongoDB directly using yum:

[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc

# yum 安装
$ sudo yum install -y mongodb-org
```

By default, MongoDB runs using the mongod user account and uses the following default directories:

>
/var/lib/mongo (the data directory)
/var/log/mongodb (the log directory)

```bash
# 开机启动
sudo systemctl start mongod
sudo systemctl daemon-reload
# 检查运行状态
sudo systemctl status mongod // enable stop restart
# 移除软件
sudo yum erase $(rpm -qa | grep mongodb-org)
# 移除数据
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongo
```

MongoDB默认将数据文件存储在/var/lib/mongo目录，默认日志文件在/var/log/mongodb中。如果要修改,可以在 /etc/mongod.conf 配置中指定备用日志和数据文件目录。

PS：Mac版本安装

```bash
brew tap mongodb/brew
brew install mongodb/brew/mongodb-community
```

Mac版本的配置文件默认在 /usr/local/etc/mongod.conf

## 安全设置

保护MongoDB的3个简单的方法：

>
绑定局域网IP，杜绝互联网访问
配置防火墙，保护27017端口
配置账号密码，对数据库进行访问控制

#### 用户及权限

```bash
# 登录本地 MongoDB 服务：
$ mongo
# 设置管理员账户
$ use admin
$ db.createUser({ user: "admin", pwd: "123456", roles: [{ role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase"] })
# 验证创建是否成功，成功返回1
$ db.auth("admin", "123456")
# 创建一个数据库
$ use db
# 创建数据库新用户，用户跟着数据库走
$ db.createUser({ user: 'weapp', pwd: 'weapp-dev', roles: ['dbAdmin', 'readWrite']});
# 创建完成后，使用 exit 退出命令行工具。

# 编辑配置文件
$ sudo vi /etc/mongod.conf
# 添加添加或开启以下参数，有缩进
#security:
security:
 authorization: enabled
# 需重启MongoDB
$ sudo service mongod restart
# 若重启报错，如下提示：
# Process: 19337 ExecStart=/usr/bin/mongod $OPTIONS (code=exited, status=2)
# 需修复权限问题，在/var/lib/mongo 和 /var/log/mongodb 下授权
$ sudo chown -R mongod:mongod /var/lib/mongo
# /tmp/*.sock 下授权
$ chown mongod:mongod /tmp/*.sock
```

```bash
# 连接验证
$ mongo -u user -p pwd --authenticationDatabase database

# 查看现有db
$ show dbs;
```

- user文档字段介绍：
>
user字段，为新用户的名字；
pwd字段，用户的密码；
cusomData字段，为任意内容，例如可以为用户全名介绍；
roles字段，指定用户的角色，可以用一个空数组给新用户设定空角色；
在roles字段,可以指定内置角色和用户定义的角色。

- MongoDB内置角色有如下：
>
Read：允许用户读取指定数据库
readWrite：允许用户读写指定数据库
dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
root：只在admin数据库中可用。超级账号，超级权限
