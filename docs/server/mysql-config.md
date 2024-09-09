# MySQL 配置

官网地址：[https://www.mysql.com/](https://www.mysql.com/)

本环境基于 Mac 系统，brew 安装。

Mysql 9 以后不再支持 `mysql_native_password` 密码权限插件，需要改成 `caching_sha2_password`。

## 基本用法

```bash
# 查看版本
mysql --version
# 登录数据库
mysql -uroot -p # 用户名root，接下去输入密码
# 使用 --skip-grant-tables 免密码登录 MySQL（如果您无法正常登录）：
mysql -u root --skip-grant-tables
# 列出 MySQL 数据库管理系统的数据库列表。
SHOW DATABASES;
# 显示指定数据库的所有表，使用该命令前需要使用 use 命令来选择要操作的数据库。
SHOW TABLES;
# 查看当前用户
select user();
# 查看用户 test 的连接方式
mysql> select user, plugin from mysql.user where user="test";
# 查看 MySQL 中用户使用的认证插件
SELECT User, Host, plugin FROM mysql.user;
# 刷新权限
FLUSH PRIVILEGES;
# 备份数据
mysqldump -u root -p --all-databases > all_databases_backup.sql;
# 恢复数据
mysql -u root -p < all_databases_backup.sql
```

### 一. 创建用户

**命令:**

```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```

**说明：**

- username：你将创建的用户名
- host：指定该用户在哪个主机上可以登陆，如果是本地用户可用 localhost，如果想让该用户可以**从任意远程主机登陆**，可以使用通配符%
- password：该用户的登陆密码，密码可以为空，如果为空则该用户可以不需要密码登陆服务器

**例子：**

```sql
CREATE USER 'dog'@'localhost' IDENTIFIED BY '123456';
CREATE USER 'pig'@'192.168.1.101' IDENTIFIED BY '123456';
CREATE USER 'pig'@'%' IDENTIFIED BY '123456';
CREATE USER 'pig'@'%' IDENTIFIED BY '';
CREATE USER 'pig'@'%';
```

### 二. 授权

**命令:**

```sql
GRANT privileges ON databasename.tablename TO 'username'@'host'
```

**说明:**

- privileges：用户的操作权限，如 SELECT，INSERT，UPDATE 等，如果要授予所的权限则使用 ALL
- databasename：数据库名
- tablename：表名，如果要授予该用户对所有数据库和表的相应操作权限则可用`*`表示，如 `*.*`

**例子:**

```sql
GRANT SELECT, INSERT ON test.user TO 'pig'@'%'; GRANT ALL ON *.* TO 'pig'@'%';
```

**注意:**

用以上命令授权的用户不能给其它用户授权，如果想让该用户可以授权，用以下命令:

```sql
GRANT privileges ON databasename.tablename TO 'username'@'host' WITH GRANT OPTION;
```

### 三.设置与更改用户密码

**命令:**

```sql
ALTER USER 'username'@'host' IDENTIFIED BY 'newpassword';
```

如果是当前登陆用户用:

```sql
ALTER USER USER() IDENTIFIED BY 'new_password';
```

### 四. 撤销用户权限

**命令:**

```sql
REVOKE privilege ON databasename.tablename FROM 'username'@'host';
```

**例子:**

```sql
REVOKE SELECT ON *.* FROM 'pig'@'%';
```

**注意:**

- 如果您使用 `REVOKE SELECT ON _._ FROM 'pig'@'%';`，这将撤销用户 pig 对所有数据库和表的 SELECT 权限，但不会影响特定表的权限。
- 如果您使用 `REVOKE SELECT ON test.user FROM 'pig'@'%';`，而该用户的权限是通过 `GRANT SELECT ON _._`授予的，则这条命令不会撤销 pig 对 test.user 表的 SELECT 权限，因为权限是基于全局的。

具体信息可以用命令 `SHOW GRANTS FOR 'pig'@'%';` 查看。

MySQL 9 以后设置密码：

在 MySQL 提示符下，您可以运行以下命令来修改用户的密码和认证插件。例如，假设您要为用户 root 更新密码并使用 caching_sha2_password 插件：
sql

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'new_password';
```

### 五.删除用户

**命令:**

`DROP USER 'username'@'host';`

远程访问：

```sql
mysql> use mysql;
mysql> update user set host = '%' where user = 'root';
mysql> select host, user from user;
mysql> flush privileges;
```

## 更改验证权限复杂度

> 有时候，只是为了自己测试，不想密码设置得那么复杂，譬如只想设置 root 的密码为 123456。

```sql
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('123456');
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
```

一般步骤：

1）该问题其实与 mysql 的 **validate_password_policy** 的值有关。查看一下 mysql 密码相关的几个全局参数：

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

## 检查 MySQL 错误日志

错误日志通常位于 `/var/log/mysql/error.log` 或 `/opt/homebrew/var/mysql/your_hostname.err`。使用以下命令查看日志：

```bash
tail -n 50 /opt/homebrew/var/mysql/your_hostname.err
```

## 删除数据目录（请确保您已经备份）

```bash
sudo rm -rf /opt/homebrew/var/mysql/*
```
