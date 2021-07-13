# Tar 命令

可以对文件和目录进行打包压缩(相较于 zip、gzip、bzip2 不能对目录进行压缩，tar 是一大优势)

用途：制作归档文件、释放归档文件

基本格式：

压缩---> tar [选项]... 归档文件名 源文件或目录

解压---> tar [选项]... 归档文件名 [-C 目标目录]

常用命令选项：

  -c：创建 .tar 格式的包文件 --create

  -x：解开 .tar 格式的包文件 --extract

  -v：输出详细信息 --verbose

  -f：表示使用归档文件 --file

  -t：列表查看包内的文件 --list（list the contents of an archive）

  -p：保持原文件的原来属性 --preserve-permissions

  -P：保持原文件的绝对路径 --absolute-names

## 打包（接上面选项）并压缩（接下面选项调用压缩）

-j --调用 bzip2

-z --调用 gzip

-J --调用 xz

所以：创建压缩包基本语法

tar -cjf 归档文件名 源目录或文件 ---> tar.bz2

tar -czf …… ---> tar.gz

tar -cJf …… ---> tar.xz （目前效果是最好的）www.kernel.org里的压缩包都是tar.xz

## 压缩效果：xz-->bzip2-->gz

======查看：tar tf 归档文件名

======解压：tar xf 归档文件名

## 具体示例

1、压缩-----创建压缩文件的时候，使用绝对路径指定创建压缩文件的路径

```bash
tar -czvf messages_passwd.tar.gz messages passwd
//同时将 2 个文件打包成 messages_passwd.tar.gz ,此文件存放在当前目录下

tar -tf messages_passwd.tar.gz
//利用-tf 选项查看压缩包里的内容
//再次打包文件，如果文件名相同，存放的路径也相同，会替换原来的文件

tar -czf /backup/messages_passwd.tar.gz messages passwd
//指定压缩打包文件存放的路径在/backup 目录下，不指定默认情况下在当前目录

2、解压-----可以解压.tar.gz .tar.bz2 .tar.xz 的压缩包

解压文件的时候，解压出来的文件默认情况下放在当前目录，如果当前目录下有相同的文件，后来解压出来的文件会替换原来的文件
