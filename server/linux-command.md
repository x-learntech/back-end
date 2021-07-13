# Linux 基本命令

## 基本目录解释

> / (root, 根目录)：与开机系统有关;
> /usr (unix software resource)：与软件安装/执行有关;
> /var (variable)：与系统运作过程有关。
> /sbin (system binary)
> /srv 可以视为『service』的缩写
> / home：用户目录
> /etc/：几乎系统的所有配置文件案均在此，尤其 passwd,shadow o
> /boot:开机配置文件，也是预设摆放核心 vmlinuz 的地方
> /usr/bin, /bin：一般执行档摆放的地方
> /usr/sbin, /sbin：系统管理员常用指令集
> /dev：摆放所有系统装置文件的目录
> /var/log：摆放系统注册表文件的地方
> /run：CentOS 7 以后才有，将经常变动的项目(每次开机都不同，如程序的 PID)移动到内存暂存，所以 /run 并不占实际磁盘容量

## 基本名词解释

> cd (change directory, 变换目录)
> pwd 是 Print Working Directory
> cat 由第一行开始显示文件内容 cat 是 Concatenate (连续) 的简写
> tac  从最后一行开始显示，可以看出 tac 是 cat 的倒着写!
