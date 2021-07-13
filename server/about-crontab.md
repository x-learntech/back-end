# 关于Liunx的定时任务crontab

## CRON命令

查看状态：`service crond status`

启动/重启服务：`service crond start/restart`

让配置生效：`crontab /etc/crontab`

查看运行的任务：`crontab -l`

编辑当前正在运行的任务，保存后即时生效：`crontab -e`

## 命令格式说明

```bash
# 格式
crontab [-u user] file
crontab [-u user] [ -e | -l | -r ]
```

命令参数：

- -u user：用来设定某个用户的crontab服务，例如，”-u ixdba”表示设定ixdba用户的crontab服务，此参数一般有root用户来运行。
- file：file是命令文件的名字,表示将file做为crontab的任务列表文件并载入crontab。如果在命令行中没有指定这个文件，crontab命令将接受标准输入（键盘）上键入的命令，并将它们载入crontab。
- -e：编辑某个用户的crontab文件内容。如果不指定用户，则表示编辑当前用户的crontab文件。
- -l：显示某个用户的crontab文件内容，如果不指定用户，则表示显示当前用户的crontab文件内容。
- -r：从/var/spool/cron目录中删除某个用户的crontab文件，如果不指定用户，则默认删除当前用户的crontab文件。
- -i：在删除用户的crontab文件时给确认提示。

默认情况下，系统所有用户都可以使用crond服务。如需对crond服务的使用加限制，可以使用配置文件/etc/cron.allow和 /etc/cron.deny

```bash
# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name  command to be executed
```

## 经典例子

```bash
# 每隔5分钟运行
*/5 * * * * user command
# 每月1号和15号运行
0 0 1,15 * * user command
# 每隔30分钟请求一下 git 仓库，并记录日志
*/30 * * * * user /etc/profile;/bin/sh /data/www/auto.sh >> /data/logs/auto.log 2>&1
# 每隔30分钟请求一下 git 仓库，不记录日志
*/30 * * * * user /etc/profile;/bin/sh /data/www/auto.sh >> /dev/null 2>&1
# 每隔30分钟请求一下 git 仓库，不记录日志 简写
*/30 * * * * /bin/sh /data/www/auto.sh
```
