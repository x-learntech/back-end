# 命令行备忘

>- 学会在终端中进行命令查询
>
>    1. `命令 --help`
>    2. `man 命令`
>    3. `info 命令`
>    4. `whatis 命令`
>   - [tldr](https://github.com/tldr-pages/tldr)

## ping地址测试

```shell
ping 「地址」
```

## ssh登录

```shell
ssh 「用户名@地址」 -p 「端口号，默认：22」
```

- 若某远程主机识别已更改，则需删除保存在本机的此IP所有秘钥（删除`known_hosts`保存某ip的秘钥）

    ```shell
    ssh-keygen -R 「地址」
    ```

## 服务进程查看命令

```bash
systemctl start nginx.service              #启动nginx服务
systemctl enable nginx.service             #设置开机自启动
systemctl disable nginx.service            #停止开机自启动
systemctl status nginx.service             #查看服务当前状态
systemctl restart nginx.service　          #重新启动服务
systemctl list-units --type=service        #查看所有已启动的服务
```

## 修改用户权限

```bash
chmod 777 /home/user
# 注：仅把/home/user目录的权限设置为rwxrwxrwx
chmod -R 777 /home/user 
# 注：表示将整个/home/user目录与其中的文件和子目录的权限都设置为rwxrwxrwx`
# 其中，参数`-R`表示启动递归处理
```

权限数字含义为：

- 对用户可读可写：4（读取）+ 2（写入）= 6；
- 对用户组可读可执行：4（读取）+ 1（执行）= 5；
- 对其他用户仅可读：4（读取）；

针对文件的三种权限：

　　　- 读文件内容（r），写数据到文件（w），作为命令执行文件（x）

针对目录的三种权限：

　　　- 读包含在目录中的文件名称（r）；
　　　- 写信息到目录中去（增加和删除索引点的连结，w）；
　　　- 搜索目录（能用该目录名称作为路径名去访问它所包含的文件和子目录）；

## 远程复制文件（夹）

```shell
scp -P 「端口号，默认：22」 「来源文件」 「目标路径」
```

1. 远程 -> 本地

    ```shell
    scp 「远程用户名@远程地址」:「远程文件」 「本地存放路径」
    ```

2. 本地 -> 远程

    ```shell
    scp 「本地文件」 「远程用户名@远程地址」:「远程存放路径」
    ```

>注意：本机和远程主机的目录权限、文件权限。

## 同步文件（夹）

```shell
rsync 「来源文件」 「目标文件」
```

仅传输有差异内容，性能更好，参数更复杂。

## 改密码

```shell
passwd
```

## 指令在PATH变量的路径

```shell
which 「指令」
```

## hosts文件位置

1. macOS、Linux

    `/etc/hosts`
2. Windows

    `C:\Windows\System32\drivers\etc\hosts`

## 验证文件的数字签名

1. MD5

    ```shell
    # macOS
    md5 「文件」
    md5 -s 「字符串」    # 或`echo -n 「字符串」 | md5`

    # Linux
    md5sum 「文件」
    echo -n 「字符串」 | md5sum

    # Windows
    md5sum.exe 「文件」
    echo -n 「字符串」 | md5sum.exe
    ```

2. SHA

    ```shell
    # macOS、Linux
    shasum 「文件」
    echo -n 「字符串」 | shasum
    # 使用特定算法：`-a, --algorithm   1 (default), 224, 256, 384, 512, 512224, 512256`
    # Linux额外还可以使用特定算法：`sha224sum sha256sum sha384sum sha512sum`

    # Windows
    sha1sum.exe 「文件」
    echo -n 「字符串」 | sha1sum.exe
    # 使用特定算法：`sha224sum.exe sha256sum.exe sha384sum.exe sha512sum.exe`
    ```

## 查看/设置环境变量

```shell
echo $「变量」          # 查看变量

export 「变量」=「值」   # 设置变量
```

## 查看本机IP

```shell
# macOS、Linux
ifconfig    # 查看`en0 的 inet`

# Windows
ipconfig    # 查看`以太网适配器 本地连接 的 IPv4 地址`
```

## 执行文件

>要对路径名/文件名中的`标点`和`空格`进行`\`转义。

```shell
./「文件名」.sh

. 「路径名/文件名」.sh
```

## （Unix-like）开机自动运行的脚本

```shell
# macOS、Linux
vi ~/.bash_profile  # bash
vi ~/.zshrc         # zsh

# 如：可以把定义环境变量放在里面`export NODE_ENV=development`

# source 脚本   # 当前运行一遍
```

## 端口查看

PS：macOS、Linux 下

```shell
# 列出端口信息格式 
# lsof -i :「端口号」

# 列出3000端口进程信息
lsof -i :3000
```

## 进程查杀

PS：macOS、Linux 下

- 按进程ID

```bash
# kill 「PID」

# 强制kill
kill -9 「PID」 
kill -KILL 「PID」

# 命令中断导致 
kill -2 「PID」

# 杀死指定用户所有进程
kill -9 $(ps -ef | grep user) //方法一 过滤出user用户进程 
kill -u user //方法二
```

- 按进程名

```bash
# kill node
pkill node
pkill -9 node # 结束所有的 node 进程

# killall 用于杀死一个进程，与 kill 不同的是它会杀死指定名字的所有进程。
killall node
killall -9 node # 结束所有的 node 进程
```

pkill 和 killall 应用方法差不多。

最常用的信号是：

1 (HUP)：重新加载进程。
9 (KILL)：杀死一个进程。
15 (TERM)：正常停止一个进程。

## 创建文件

1. `touch 「文件名」`

    >若文件已存在，则更新文件时间为当前系统时间。
2. `vi 「文件名」`

    >编辑文件。若文件不存在，则先创建后编辑。
3. `echo "「内容」" > 「文件名」`

    >若文件已存在，则替换文件内容。
    >
>4. `less/more/cat 「已存在文件」 > 「文件名」`，`cd >/>> 「文件名」`

## 查看磁盘空间占用

1. 以磁盘分区为单位查看文件系统的磁盘空间情况

    ```shell
    df -h
    ```

2. 指定的目录或文件所占用的磁盘空间

    ```shell
    // macOS
    du -h -d1 「路径」

    // Linux
    du -h --max-depth=1 「路径」
    ```

3. 查找超过10M的文件

    ```shell
    find 「路径」 -size +10M
    ```

## 解压缩 tar

基本格式：

压缩---> tar [选项]... 归档文件名 源文件或目录

解压---> tar [选项]... 归档文件名 [-C 目标目录]

常用命令选项：

- -c：创建 .tar 格式的包文件 --create
- -x：解开 .tar 格式的包文件 --extract
- -v：输出详细信息 --verbose
- -f：表示使用归档文件 --file
- -t：列表查看包内的文件 --list（list the contents of an archive）
- -p：保持原文件的原来属性 --preserve-permissions
- -P：保持原文件的绝对路径 --absolute-names

```bash
# 压缩：tar -zcv -f 生成的文件 要打包的文件
tar -zcv -f nufun.tar.gz nufun/
# 解压：tar -xvf 文件
tar -xvf nufun.tar.gz
```

## macOS命令

## brew更新

```shell
brew update && brew upgrade && brew cask upgrade
```

## 打开文件（夹）

```shell
open 「路径/文件」
```
