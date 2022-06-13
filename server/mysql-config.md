# Mysql 配置

官网地址：[https://www.mysql.com/](https://www.mysql.com/)

## 安转(centos 7)

- 安装 mysql 源

`yum localinstall https://repo.mysql.com//mysql80-community-release-el7-3.noarch.rpm`

- 安装 mysql

`yum install mysql-community-server`

```xml
# 解决下载缓慢问题？
# 找到缓存路径，然后去国内镜像下载对应版本的软件，然后重新执行安装
/var/cache/yum/x86_64/7/mysql80-community/packages
# 网易镜像
http://uni.mirrors.163.com/mysql/Downloads/
```

- 启动 mysql

`service mysqld start`

- 查看 mysql 启动状态

`service mysqld status`

- 获取 mysql 默认生成的密码

```bash
$ grep 'temporary password' /var/log/mysqld.log
2017-02-10T14:59:42.328736Z 1 [Note] A temporary password is generated for root@localhost: s/giN9Vo>L9h
```

冒号后面的都是密码(没有空格) 复制就好

- 换成自己的密码

`$ mysql -uroot -p`

Enter password: 输入上面复制的密码

- 更换密码

`mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';`

这个密码一定要足够复杂，不然会不让你改，提示密码不合法

- 退出 mysql

`mysql> quit;`

## 基本用法

```sql
# 查看版本
$ mysql --version
# 登录数据库
$ mysql -uroot -p # 用户名root，接下去输入密码
# 列出 MySQL 数据库管理系统的数据库列表。
$ SHOW DATABASES:
# 显示指定数据库的所有表，使用该命令前需要使用 use 命令来选择要操作的数据库。
$ SHOW TABLES:
# 查看当前用户
$ select user();
# 查看用户testuser的连接方式
$ mysql> select user, plugin from mysql.user where user="testuser";
```

### 一. 创建用户

**命令:**

`CREATE USER 'username'@'host' IDENTIFIED BY 'password';`

**说明：**

- username：你将创建的用户名
- host：指定该用户在哪个主机上可以登陆，如果是本地用户可用 localhost，如果想让该用户可以**从任意远程主机登陆**，可以使用通配符%
- password：该用户的登陆密码，密码可以为空，如果为空则该用户可以不需要密码登陆服务器

**例子：**

`CREATE USER 'dog'@'localhost' IDENTIFIED BY '123456'; CREATE USER 'pig'@'192.168.1.101_' IDENDIFIED BY '123456'; CREATE USER 'pig'@'%' IDENTIFIED BY '123456'; CREATE USER 'pig'@'%' IDENTIFIED BY ''; CREATE USER 'pig'@'%';`

### 二. 授权

**命令:**

`GRANT privileges ON databasename.tablename TO 'username'@'host'`

**说明:**

- privileges：用户的操作权限，如 SELECT，INSERT，UPDATE 等，如果要授予所的权限则使用 ALL
- databasename：数据库名
- tablename：表名，如果要授予该用户对所有数据库和表的相应操作权限则可用*表示，如*.\*

**例子:**

`GRANT SELECT, INSERT ON test.user TO 'pig'@'%'; GRANT ALL ON *.* TO 'pig'@'%';`

**注意:**

用以上命令授权的用户不能给其它用户授权，如果想让该用户可以授权，用以下命令:

`GRANT privileges ON databasename.tablename TO 'username'@'host' WITH GRANT OPTION;`

### 三.设置与更改用户密码

**命令:**

`SET PASSWORD FOR 'username'@'host' = PASSWORD('newpassword');`

如果是当前登陆用户用:

`SET PASSWORD = PASSWORD("newpassword");`

**例子:**

`SET PASSWORD FOR 'pig'@'%' = PASSWORD("123456");`

### 四. 撤销用户权限

**命令:**

`REVOKE privilege ON databasename.tablename FROM 'username'@'host';`

**例子:**

`REVOKE SELECT ON *.* FROM 'pig'@'%';`

**注意:**

假如你在给用户'pig'@'%'授权的时候是这样的（或类似的）：GRANT SELECT ON test.user TO 'pig'@'%'，则在使用 REVOKE SELECT ON _._ FROM 'pig'@'%';命令并不能撤销该用户对 test 数据库中 user 表的 SELECT 操作。相反，如果授权使用的是 GRANT SELECT ON _._ TO 'pig'@'%';则 REVOKE SELECT ON test.user FROM 'pig'@'%';命令也不能撤销该用户对 test 数据库中 user 表的 Select 权限。

具体信息可以用命令 SHOW GRANTS FOR 'pig'@'%'; 查看。

### 五.删除用户

**命令:**

`DROP USER 'username'@'host';`

远程访问：

```sql
mysql**>** use mysql;
mysql**>** update user set host = '%' where user = 'root';
mysql**>** select host, user from user;
mysql**>** flush privileges;
```

## 更改验证权限复杂度

> 有时候，只是为了自己测试，不想密码设置得那么复杂，譬如只想设置 root 的密码为 123456。

```sql
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('123456');
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
```

一般步骤：

1）该问题其实与 mysql 的 validate_password_policy 的值有关。查看一下 msyql 密码相关的几个全局参数：

```sql
mysql> SHOW VARIABLES LIKE 'validate_password%';
+--------------------------------------+--------+
| Variable_name                        | Value  |
+--------------------------------------+--------+
| validate_password.check_user_name    | ON     |
| validate_password.dictionary_file    |        |
| validate_password.length             | 8      |
| validate_password.mixed_case_count   | 1      |
| validate_password.number_count       | 1      |
| validate_password.policy             | MEDIUM |
| validate_password.special_char_count | 1      |
+--------------------------------------+--------+
7 rows in set (0.00 sec)
```

2）参数解释

> validate_password.dictionary_file 插件用于验证密码强度的字典文件路径。
> validate_password.length 密码最小长度，参数默认为 8，它有最小值的限制，最小值为：validate_password.number_count + validate_password.special_char_count + (2 \* validate_password.mixed_case_count)
> validate_password.mixed_case_count 密码至少要包含的小写字母个数和大写字母个数。
> validate_password.number_count 密码至少要包含的数字个数。
> validate_password.policy 密码强度检查等级，0/LOW、1/MEDIUM、2/STRONG。有以下取值:
> |Policy|Tests Performed|
> |:-|:-:|-:|
> |0 or LOW | Length|
> |1 or MEDIUM | Length; numeric, lowercase/uppercase, and special characters |
> |2 or STRONG | Length; numeric, lowercase/uppercase, and special characters; dictionary file |
> 默认是 1，即 MEDIUM，所以刚开始设置的密码必须符合长度，且必须含有数字，小写或大写字母，特殊字符。
> validate_password_special_char_count 密码至少要包含的特殊字符数。

3）修改 mysql 参数配置

```sql
mysql> set global validate_password.policy=0;
mysql> set global validate_password.mixed_case_count=0;
mysql> set global validate_password.number_count=0;
```

4）修改简单密码：

```sql
mysql> **SET** **PASSWORD** **FOR** 'root'@'localhost' = **PASSWORD**('123');
Query OK, 0 **rows** affected, 1 warning (0.00 sec)
```
