---
sidebar_position: 5
---

# 命令行备忘

> 默认为 Linux 环境

- 学会在终端中进行命令查询
  1. `命令 --help`
  2. `man 命令`
  3. `info 命令`
  4. `whatis 命令`
  5. [tldr 三方工具](https://github.com/tldr-pages/tldr)

## 基本目录解释

> / (root, 根目录)：与开机系统有关;
> /usr (unix software resource)：与软件安装/执行有关;
> /var (variable)：与系统运作过程有关。
> /sbin (system binary)
> /srv：可以视为『service』的缩写
> /home：用户目录
> /etc/：几乎系统的所有配置文件案均在此，尤其 passwd,shadow o
> /boot：开机配置文件，也是预设摆放核心 vmlinuz 的地方
> /usr/bin, /bin：一般执行档摆放的地方
> /usr/sbin, /sbin：系统管理员常用指令集
> /dev：摆放所有系统装置文件的目录
> /var/log：摆放系统注册表文件的地方
> /run：CentOS 7 以后才有，将经常变动的项目(每次开机都不同，如程序的 PID)移动到内存暂存，所以 /run 并不占实际磁盘容量

## 经典命令

> cd (change directory, 变换目录)
> pwd 是 Print Working Directory
> cat 由第一行开始显示文件内容 cat 是 Concatenate (连续) 的简写
> tac 从最后一行开始显示，可以看出 tac 是 cat 的倒着写!

## ping 地址测试

```shell
ping 「地址」
```

## ssh 登录

```shell
ssh 「用户名@地址」 -p 「端口号，默认：22」
```

- 若某远程主机识别已更改，则需删除保存在本机的此 IP 所有秘钥（删除`known_hosts`保存某 ip 的秘钥）

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

## 查看文件权限

```bash
ls -l
# drwxrwxrwx  49 ruxin  wheel   1.5K Nov 29 12:45 .
# 对应权限信息通用格式含义：
# drwxrwxrwx　number　user　group　filesize　updatetime　filename
```

可以看到通用格式分成了 7 部分，分别是：

1. 文件属性，即文件的类型/读/写/执行等权限，共 10 个字符。

第一个字符表示类型，d 表示文件夹，- 表示非文件夹。

后 9 个字符分 3 组，表示该文件对于当前用户(user)、当前用户所在组(group)、其他用户(other)的读/写/执行权限。

rwx：代表属主权限，-代表无权限；r 代表具有可读权限； w 代表具有可写权限；x 代表具有可执行权限。

2. number，即文件 inode 数量，inode 表示储存文件元信息的区域。
3. user，即当前用户名。
4. group，即当前用户所在的组的名字。
5. filesize，即该文件大小，单位是 byte。
6. updatetime，即文件的最后修改时间。
7. filename，即文件名。

## 修改用户权限

修改权限的命令格式：

```bash
chmod [<权限范围><权限操作><具体权限>] [文件或目录…]
```

chmod 权限表示 分为数字和字符两种模式。

### 权限范围

- u：User，即文件或目录的拥有者。
- g：Group，即文件或目录的所属群组。
- o：Other，除了文件或目录拥有者或所属群组之外，其他用户皆属于这个范围。
- a：All，即全部的用户，包含拥有者，所属群组以及其他用户。

### 权限操作

- +：表示增加权限
- -：表示取消权限
- =：表示唯一设定权限

### 具体权限

- r：表示可读取
- w：表示可写入
- x ：表示可执行

```bash
chmod 777 /home/user
# 注：仅把/home/user目录的权限设置为rwxrwxrwx

# 下面代码等效于上面，rwx部分场景可以顺序随机，部分场景不行
chmod a+rwx /home/user

chmod -R 777 /home/user
# 注：表示将整个/home/user目录与其中的文件和子目录的权限都设置为rwxrwxrwx`
# 其中，参数`-R`表示启动递归处理
```

权限数字含义为：

- 可读可写可执行：4（读取）+ 2（写入）+ 1（可执行）= 7；
- 可读可写：4（读取）+ 2（写入）= 6；
- 可读可执行：4（读取）+ 1（执行）= 5；
- 仅可读：4（读取）；

针对文件的三种权限：

- 读文件内容（r），写数据到文件（w），作为命令执行文件（x）

针对目录的三种权限：

- 读包含在目录中的文件名称（r）；
- 写信息到目录中去（增加和删除索引点的连结，w）；
- 搜索目录（能用该目录名称作为路径名去访问它所包含的文件和子目录）；

## 更改文件或者目录权限

```bash
# 修改目录及其子目录的拥有者为当前用户
sudo chown -R $(whoami) dir
```

- `chown` change owner 的缩写。
- `$(whoami)` who am i ，获取当前的用户。
- `-R` –recursive 的缩写，递归处理，将指定目录和所有子目录一并处理。

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

> 注意：本机和远程主机的目录权限、文件权限。

## 同步文件（夹）

```shell
rsync 「来源文件」 「目标文件」
```

仅传输有差异内容，性能更好，参数更复杂。如果 ssh 命令有附加的参数，则必须使用 `-e` 参数指定所要执行的 SSH 命令。

```bash
# 设置
# ROOT_DIR=$(dirname $0)
# DEST_DIR=/data/www/learntech-back/build
# 下面 -e ssh 可以省略
rsync -av -e ssh source/ user@remote_host:/destination
# 服务器下载同步文件到本地
rsync -av -e "ssh -p 1022" user@ip:/data/www/my-admin/servers/.env.production /Users/ruxin/websites/nest-admin
# 本地文件同步到服务器，把来源和目标对换一下
rsync -av -e "ssh -p 1022" /Users/ruxin/websites/nest-admin/.env.production user@ip:/data/www/my-admin/servers/
# --exclude 参数排除文件，如下排除 file1.txt 和 .开头的文件
rsync -av --exclude={'file1.txt','dir1/.*'} source/ destination
# 文件传输完成后执行 pm2 restart 命令
rsync -azv --exclude '.*' --delete "${ROOT_DIR}/dist/" -e "ssh -p 6000" "${USER}@${DEST_HOST}:${DEST_DIR}" && ssh -p 6000 "${USER}@${DEST_HOST}" "pm2 restart <app-name>"
# 同步数据并显示总体的传输进度
rsync --info=progress2 -av source/ destination/
# 当前文件夹内容压缩成example.zip
zip -q example.zip .

```

解释：

- `-a`：归档模式，表示递归复制并保持文件属性。
- `-v`：详细模式，显示传输过程中的信息。
- `-z`：在传输中压缩文件。
- `-q` 或 `--quiet`：抑制输出，只返回最终的结果。
- `-e "ssh -p 6000"`：指定使用 SSH 协议，并指定端口为 6000。
- `--delete`：删除目标目录中那些在源目录中不存在的文件。
- `--ignore-existing`：忽略目标目录中不存在的文件。该选项会在目标目录中存在同名文件时才进行更新，而如果目标中没有对应的文件，则不会进行任何操作。这样可以避免因目标文件不存在而产生的错误。
- `--progress`：显示每个文件的进度，文件多时不适合
- `--info=progress2`：选项是在较新版本的 rsync 中引入的（大约在 rsync 3.1.0 及以上版本），显示总体进度

[更多请查阅](https://www.ruanyifeng.com/blog/2020/08/rsync.html)

## 改密码

```shell
passwd
```

## 指令在 PATH 变量的路径

```shell
which 「指令」
```

## hosts 文件位置

1. macOS、Linux

   `/etc/hosts`

2. Windows

   `C:\Windows\System32\drivers\etc\hosts`

## 文件数字签名

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

## 查看本机 IP

```shell
# macOS、Linux
ifconfig    # 查看`en0 的 inet`

# Windows
ipconfig    # 查看`以太网适配器 本地连接 的 IPv4 地址`
```

## 执行文件

> 要对路径名/文件名中的`标点`和`空格`进行`\`转义。

```shell
./「文件名」.sh

. 「路径名/文件名」.sh
```

## 开机自运行脚本

```shell
# macOS、Linux
vi ~/.bash_profile  # bash
vi ~/.zshrc         # zsh

# 如：可以把定义环境变量放在里面`export NODE_ENV=development`

source 脚本   # 当前运行一遍，即相当于激活配置
```

## 端口查看

PS：macOS、Linux 下

lsof（list open files）是一个查看当前系统文件的工具。在 linux 环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。

命令参数：

- -a 列出打开文件存在的进程
- -c 进程名 列出指定进程所打开的文件
- -g 列出 GID 号进程详情
- -d 文件号 列出占用该文件号的进程
- +d 目录 列出目录下被打开的文件
- +D 目录 递归列出目录下被打开的文件
- -n 目录 列出使用 NFS 的文件
- -i 条件 列出符合条件的进程。（4、6、协议、:端口、 @ip ）
- -p 进程号 列出指定进程号所打开的文件
- -u 列出 UID 号进程详情
- -h 显示帮助信息
- -v 显示版本信息

```shell
# 列出端口信息格式
# lsof -i :「端口号」

# 列出3000端口进程信息
lsof -i :3000
```

## 进程查杀

PS：macOS、Linux 下

- 按进程 ID

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

1.  `touch 「文件名」`

    > 若文件已存在，则更新文件时间为当前系统时间。

2.  `vi 「文件名」`

    > 编辑文件。若文件不存在，则先创建后编辑。

3.  `echo "「内容」" > 「文件名」`

        >若文件已存在，则替换文件内容。
        >

    > 4. `less/more/cat 「已存在文件」 > 「文件名」`，`cd >/>> 「文件名」`

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

3. 查找超过 10M 的文件

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

## macOS 命令

## brew 更新

```shell
brew update && brew upgrade && brew cask upgrade
```

## 打开文件（夹）

```shell
open 「路径/文件」
```
