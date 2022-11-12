# Centos 8 环境初始化

1、更新系统软件

`yum update`

2、安装编译工具

```bash
yum install wget gcc automake autoconf libtool yum-utils gcc-c++
```

--------------------------------------------------------------------------------

## Nginx

1. 安装 nginx 官方源(<http://nginx.org/en/linux_packages.html>)

`yum localinstall http://nginx.org/packages/centos/8/x86_64/RPMS/+xxx.rpm(获取对应地址)`

2. 安装nginx
`yum install nginx`

3. 启动nginx
`service nginx start`

4. 访问 `http://你的ip/`
如果成功安装会出来nginx默认的欢迎界面

开机启动设置：

```bash
systemctl enable nginx
systemctl daemon-reload
```

## MYSQL

1. 安装mysql源
`yum localinstall  https://dev.mysql.com/get/mysql80-community-release-el8-1.noarch.rpm`

2. 安装mysql
`yum install mysql-server`

3. 查看mysql是否安装成功

```bash
ps -ef | grep mysql
mysqladmin --version
# mysqladmin  Ver 8.0.17 for Linux on x86_64 (Source distribution)
```

4. 启动mysql
`service mysqld start`

5. 查看mysql启动状态
`service mysqld status`

6. mysql登录（不用密码登录）

```bash
mysql -uroot
```

7. 更换密码

```bash
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';//修改密码
flush privileges;//刷新权限表
```

这个密码一定要足够复杂，不然会不让你改，提示密码不合法

8. 退出mysql;
`mysql> quit;`

9. 用新密码再登录，试一下新密码
`$ mysql -uroot -p`
Enter password:输入你的新密码

10. 确认密码正确后，退出mysql;
mysql> quit;

11. 开机启动设置：

```bash
systemctl enable mysqld
systemctl daemon-reload
```

ps：相关安转目录

```bash
/usr/bin # 相关命令
/usr/share/mysql # 配置文件目录
/var/lib/mysql # 数据库文件存放目录
/etc/my.cnf.d # mysql的启动配置文件
client.cnf # mysql客户端配置文件
mysql-server.cnf # mysql
守护进程配置文件mysql-default-authentication-plugin.cnf # 默认权限授权配置文件

# 新增用户：
user:nufun pwd:123456
CREATE USER 'nufun'@'localhost' IDENTIFIED BY '123456';
# 授权用户所有权限
GRANT ALL ON *.* TO 'nufun'@'localhost';
```

## PHP7

1. 下载php7源码包

`wget -O php7.tar.gz https://www.php.net/distributions/php-7.2.28.tar.gz`

2. 解压源码包

`tar -xvf php7.tar.gz`

3. 打开解压好的包

`cd php-7.2.28`

4. 安装php依赖包

`yum install libxml2 libxml2-devel openssl openssl-devel bzip2 bzip2-devel libcurl libcurl-devel libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel gmp gmp-devel libmcrypt libmcrypt-devel readline readline-devel libxslt libxslt-devel`

5. 编译配置（安装后查看编译配置：`php -i | grep configure` ）
(这一步可能我们会遇到很多configure error，我们一一解决，基本都是相关软件开发包没有安装导致右键黏贴，再enter。)

```bash
./configure \
--prefix=/usr/local/php \
--with-config-file-path=/etc \
--enable-fpm \
--with-fpm-user=nginx \
--with-fpm-group=nginx \
--enable-inline-optimization \
--disable-debug \
--disable-rpath \
--enable-shared \
--enable-soap \
--with-libxml-dir \
--with-xmlrpc \
--with-openssl \
--with-mhash \
--with-pcre-regex \
--with-zlib \
--enable-bcmath \
--with-iconv \
--with-bz2 \
--enable-calendar \
--with-curl \
--with-cdb \
--enable-dom \
--enable-exif \
--enable-fileinfo \
--enable-filter \
--with-pcre-dir \
--enable-ftp \
--with-gd \
--enable-gd-jis-conv \
--with-openssl-dir \
--with-jpeg-dir \
--with-png-dir \
--with-zlib-dir \
--with-freetype-dir \
--with-gettext \
--with-gmp \
--with-mhash \
--enable-json \
--enable-mbstring \
--enable-mbregex \
--enable-mbregex-backtrack \
--with-libmbfl \
--with-onig \
--enable-pdo \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--with-zlib-dir \
--with-readline \
--enable-session \
--enable-shmop \
--enable-simplexml \
--enable-sockets \
--enable-sysvmsg \
--enable-sysvsem \
--enable-sysvshm \
--enable-wddx \
--with-libxml-dir \
--with-xsl \
--enable-zip \
--enable-mysqlnd-compression-support \
--with-pear \
--enable-opcache
```

如有有出现错误可查找一下 ，大部分可能都是依赖问题。

```bash
# 例如：libxml2，同理，把libxml2替换为对应的模块名即可
configure: error: xml2-config not found. Please check your libxml2 installation.
# 解决：
$ yum install libxml2 libxml2-devel
```

6. 编译与安装

`make && make install`

这里要make好久，要耐心一下

7. 添加 PHP 命令到环境变量

```bash
# vim /etc/profile
PATH=$PATH:/usr/local/php/bin
export PATH
```

要使改动立即生效执行

`source /etc/profile`

查看环境变量

`echo $PATH`

查看php版本

`php -v`

8. 配置php-fpm

```bash
cp php.ini-production /etc/php.ini
cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf
cp sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm
chmod +x /etc/init.d/php-fpm
```

9. 启动php-fpm

`/etc/init.d/php-fpm start`

开机启动设置：

```bash
#systemctl enable php-fpm
#systemctl daemon-reload
```

重启：`sudo service php-fpm restart`

```bash
# 修改 /etc/nginx/conf.d/default.conf
location ~ \.php$ {
  root           /usr/share/nginx/html;
  fastcgi_pass   127.0.0.1:9000;
  fastcgi_index  index.php;
  fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
  include        fastcgi_params;
}
```

```bash
# 删除 PHP7
rm -rf /usr/local/php /bin/php /usr/local/sbin/php-fpm /usr/local/bin/php /usr/local/bin/pear /usr/local/bin/peardev /usr/local/bin/pecl /usr/local/bin/phar /usr/local/bin/phar.phar /usr/local/bin/php-cgi /usr/local/bin/php-config /usr/local/bin/phpdbg /usr/local/bin/phpize
```

重启Nginx使修改生效

## Nodejs （当前最新版10.13.0）

```bash
curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum -y install nodejs
```

## Git（当前最新版本2.25.1）

安装依赖库：

```bash
# yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel -y
# yum install  gcc perl-ExtUtils-MakeMaker
# yum remove git #卸载依赖的旧版本
```

### 源码安装

1. 下载git源码包
wget -O git.tar.gz <https://www.kernel.org/pub/software/scm/git/git-2.25.1.tar.gz>
2. 解压源码包: tar -xvf git.tar.gz
3. 进入git源码目录：cd git-2.15.0
4. 执行三步常规安装命令：检测环境配置并且设置安装路径，编译，安装；

```bash
make prefix=/usr/local/git all
make prefix=/usr/local/git install
echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/bashrc
source /etc/bashrc # 实时生效
```

5. 验证安装成功：`git --version`

### yum 安装

`yum install git`

## JAVA（1.8）

1. 从 <http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html> 获取源码包，然后下载（具有时效性）
`wget  <http://download.oracle.com/otn-pub/java/jdk/8u152-b16/aa0333dd3019491ca4f6ddbe78cdb6d0/jdk-8u152-linux-x64.rpm?AuthParam=1510742091_046546a2c06f4dff78e0de6bc635d054>`

2. 安装 rpm 源码包。

```bash
rpm -ivh jdk-8u152-linux-x64.rpm?AuthParam=1510742091_046546a2c06f4dff78e0de6bc635d054
```

1. 输入java -version 进行测试

后台运行：`nohup java -jar nufun-basketball.jar &`

## Redis（当前最新版5.0.0）

```bash
wget http://download.redis.io/releases/redis-5.0.6.tar.gz
tar xzf redis-5.0.0.tar.gz
cd redis-5.0.0
make
make install
```

配置redis随系统启动：`./utils/install_server.sh`

```bash
Please select the redis port for this instance: [6379] 
Selecting default: 6379
Please select the redis config file name [/etc/redis/6379.conf] 
Selected default - /etc/redis/6379.conf
Please select the redis log file name [/var/log/redis_6379.log] 
Selected default - /var/log/redis_6379.log
Please select the data directory for this instance [/var/lib/redis/6379] 
Selected default - /var/lib/redis/6379
Please select the redis executable path [/usr/local/bin/redis-server] 
```

注意：make命令执行完成编译后，会在src目录下生成6个可执行文件，分别是`redis-server、redis-cli、redis-benchmark、redis-check-aof、redis-check-rdb、redis-sentinel。make install`安装完成后，会在`/usr/local/bin`目录下生成下面几个可执行文件，它们的作用分别是：

```xml
redis-server：Redis服务器端启动程序 
redis-cli：Redis客户端操作工具。也可以用telnet根据其纯文本协议来操作 
redis-benchmark：Redis性能测试工具 
redis-check-aof：数据修复工具
```

Redis服务查看、开启、关闭:

- 通过`ps -ef|grep redis`命令查看Redis进程
- 开启Redis服务操作通过`/etc/init.d/redis_6379 start`命令，也可通过（`service redis_6379 start`）
- 关闭Redis服务操作通过`/etc/init.d/redis_6379 stop`命令，也可通过（`service redis_6379 stop`）

redis.conf 的配置信息

```xml
1、daemonize 如果需要在后台运行，把该项改为yes
2、pidfile 配置多个pid的地址 默认在/var/run/redis.pid
3、bind 绑定ip，设置后只接受来自该ip的请求
4、port 监听端口，默认是6379
5、loglevel 分为4个等级：debug verbose notice warning
6、logfile 用于配置log文件地址
7、databases 设置数据库个数，默认使用的数据库为0
8、save 设置redis进行数据库镜像的频率。
9、rdbcompression 在进行镜像备份时，是否进行压缩
10、dbfilename 镜像备份文件的文件名
11、Dir 数据库镜像备份的文件放置路径
12、Slaveof 设置数据库为其他数据库的从数据库
13、Masterauth 主数据库连接需要的密码验证
14、Requriepass 设置 登陆时需要使用密码
15、Maxclients 限制同时使用的客户数量
16、Maxmemory 设置redis能够使用的最大内存
17、Appendonly 开启append only模式
18、Appendfsync 设置对appendonly.aof文件同步的频率（对数据进行备份的第二种方式）
19、vm-enabled 是否开启虚拟内存支持 （vm开头的参数都是配置虚拟内存的）
20、vm-swap-file 设置虚拟内存的交换文件路径
21、vm-max-memory 设置redis使用的最大物理内存大小
22、vm-page-size 设置虚拟内存的页大小
23、vm-pages 设置交换文件的总的page数量
24、vm-max-threads 设置VM IO同时使用的线程数量
25、Glueoutputbuf 把小的输出缓存存放在一起
26、hash-max-zipmap-entries 设置hash的临界值
27、Activerehashing 重新hash
```

## MongoDB

官网地址：[https://docs.mongodb.com/master/tutorial/install-mongodb-on-red-hat/](https://docs.mongodb.com/master/tutorial/install-mongodb-on-red-hat/)

## PS：其他

### 服务进程查看命令

```bash
systemctl start nginx.service              #启动nginx服务
systemctl enable nginx.service             #设置开机自启动
systemctl disable nginx.service            #停止开机自启动
systemctl status nginx.service             #查看服务当前状态
systemctl restart nginx.service　          #重新启动服务
systemctl list-units --type=service        #查看所有已启动的服务
```

解压缩：

```bash
# 压缩：tar -zcv -f 生成的文件 要打包的文件
tar -zcv -f nufun.tar.gz nufun/
# 解压：tar -xvf 文件
tar -xvf nufun.tar.gz
```

ps：后续很多都走docker了
