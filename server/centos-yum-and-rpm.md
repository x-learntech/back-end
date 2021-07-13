# Centos YUM 和 RPM

centos 安装和管理软件的方式有yum和rpm，其中YUM基于RPM包管理的。

## RPM 全名是『 RedHat Package Manager 』简称则为 RPM

### 选项与参数

```bash
[选项...]
-a：查询所有套件；
-b<完成阶段><套件档>+或-t <完成阶段><套件档>+：设置包装套件的完成阶段，并指定套件档的文件名称；
-c：只列出组态配置文件，本参数需配合"-l"参数使用；
-d：只列出文本文件，本参数需配合"-l"参数使用；
-e<套件档>或--erase<套件档>：删除指定的套件；
-f<文件>+：查询拥有指定文件的套件；
-h或--hash：套件安装时列出标记；
-i：显示套件的相关信息；
-i<套件档>或--install<套件档>：安装指定的套件档；
-l：显示套件的文件列表；
-p<套件档>+：查询指定的RPM套件档；
-q：使用询问模式，当遇到任何问题时，rpm指令会先询问用户；
-R：显示套件的关联性信息；
-s：显示文件状态，本参数需配合"-l"参数使用；
-U<套件档>或--upgrade<套件档>：升级指定的套件档；
-v：显示指令执行过程；
-vv：详细显示指令执行过程，便于排错。

查询已安装软件的信息:
-q :仅查询，后面接的软件名称是否有安装;
-qa :列出所有的，已经安装在本机 Linux 系统上面的所有软件名称;
-qi :列出该软件的详细信息 (information)，包含开发商、版本与说明等; 
-ql :列出该软件所有的文件与目录所在完整文件名 (list);
-qc :列出该软件的所有配置文件 (找出在 /etc/ 底下的檔名而已)
-qd :列出该软件的所有说明文件 (找出与 man 有关的文件而已)
-qR :列出与该软件有关的相依软件所含的文件 (Required 的意思)
-qf :由后面接的文件名，找出该文件属于哪一个已安装的软件;
-q --scripts:列出是否含有安装后需要执行的脚本档，可用以 debug 喔! 查询 个 RPM 文件内含有的信息:
-qp[icdlR]:注意 -qp 后面接的所有参数以上面的说明一致。但用途仅在于找出 RPM 文件内的信息，而非已安装的软件信息!
```

```bash
常见命令：
# 安装软件
rpm -ivh package_name
# 选项与参数:
-i :install 的意思
-v :察看更细部的安装信息画面 
-h :以安装信息列显示安装进度

# 卸载软件
rpm -e package_name

# 查询package_name软件
rpm -qa|grep package_name

# 其他
-Uvh：后面接的软件即使没有安装过，则系统将予以直接安装; 若后面接的软件有安装过旧版，则系统自动更新至新版;
-Fvh：如果后面接的软件并未安装到你的 Linux 系统上，则该软件不会被安装;亦即只有已安装至你 Linux 系统内的软件会被『升级』!
rpm --rebuilddb <==重建数据库
```

## YUM [option] [查询工作项目] [相关参数]

YUM(全称为 Yellow dog Updater, Modified)是一个在Fedora和RedHat以及SUSE中的Shell前端软件包管理器。

### 选项与参数

```xml
[option]:主要的选项，包括有:
-y :当 yum 要等待用户输入时，这个选项可以自动 供 yes 的响应;
--installroot=/some/path :将该软件安装在 /some/path 而不使用默认路径 
[查询工作项目] [相关参数]:这方面的参数有:
search :搜寻 个软件名称或者是 述 (description) 的重要关键字;
list :列出目前 yum 所管理的所有的软件名称与版本，有点类似 rpm -qa; 
info :同上，不过有点类似 rpm -qai 的执行结果; 
provides:从文件去搜寻软件!类似 rpm -qf 的功能!
```

```bash
yum update  升级系统
yum install  ～ 安装指定软件包
yum update ～ 升级指定软件包
yum remove ～ 卸载指定软件
yum grouplist   查看系统中已经安装的和可用的软件组，可用的可以安装
yum grooupinstall ～安装上一个命令显示的可用的软件组中的一个
yum grooupupdate ～更新指定软件组的软件包
yum grooupremove ～ 卸载指定软件组中的软件包
yum deplist ～ 查询指定软件包的依赖关系
yum list yum\* 列出所有以yum开头的软件包
yum localinstall ～ 从硬盘安装rpm包并使用yum解决依赖
```

yum 会把下载的软件包和header存储在cache中，而不会自动删除。如果我们觉得它们占用了磁盘空间，可以使用 `yum clean` 指令进行清除，更精确的用法是 `yum clean headers` 清除header，`yum clean packages` 清除下载的rpm包，`yum clean all` 清除所有。
