# Java 工程

因为 springboot 已经成为了 Java 行业中事实上的标准，所以 Java 项目工程也都是围绕着 springboot 展开。

- [spring-boot](https://spring.io/projects/spring-boot)

## 目前涉及常用框架

| 框架                                                                                        | 说明                  |
| ------------------------------------------------------------------------------------------- | --------------------- |
| [Spring Boot](https://spring.io/projects/spring-boot)                                       | 应用开发框架          |
| [MySQL](https://www.mysql.com/cn/)                                                          | 数据库服务器          |
| [Druid](https://github.com/alibaba/druid)                                                   | JDBC 连接池、监控组件 |
| [MyBatis](http://www.mybatis.org/mybatis-3/zh/index.html)                                   | 数据持久层框架        |
| [MyBatis-Plus](https://mp.baomidou.com/)                                                    | Mybatis 增强工具包    |
| [Redis](https://redis.io/)                                                                  | key-value 数据库      |
| [Elasticsearch](https://www.elastic.co/cn/)                                                 | 分布式搜索引擎        |
| [Dubbo](http://dubbo.apache.org/)                                                           | 分布式 RPC 服务框架   |
| [RocketMQ](https://rocketmq.apache.org)                                                     | 消息中间件            |
| [Zookeeper](http://zookeeper.apache.org/)                                                   | 分布式系统协调        |
| [XXL-Job](http://www.xuxueli.com/xxl-job/)                                                  | 分布式任务调度平台    |
| [springfox-swagger2](https://github.com/springfox/springfox/tree/master/springfox-swagger2) | API 文档              |
| [swagger-bootstrap-ui](https://gitee.com/xiaoym/swagger-bootstrap-ui)                       | Swagger 增强 UI 实现  |

## 项目打包与运行

因为现在都是走前后端分离的模式，所以 java 服务也都是打包成 jar 包去发布的。

```bash
# 打包
mvn -Dmaven.test.skip -U clean install
# 运行
java -jar xxx.jar
```

nohup 是 no hang up 不挂起的意思，如果你正在运行一个进程，而且你觉得在退出帐户时该进程还不会结束，那么可以使用 nohup 命令。该命令可以在你退出帐户/关闭终端之后继续运行相应的进程。**该命令运行后是前台进程。**

&指让程序后台运行。

### 两者特点

使用 nohup 运行程序：

- 结果默认会输出到 nohup.out
- 使用 Ctrl + C 发送 SIGINT 信号，程序关闭
- 关闭 session 发送 SIGHUP 信号，程序免疫

使用&后台运行程序：

- 结果会输出到终端
- 使用 Ctrl + C 发送 SIGINT 信号，程序免疫
- 关闭 session 发送 SIGHUP 信号，程序关闭

结合上面两个命令可以让程序后台运行，关闭窗口或者 ctrl+c 都不会中断进程

```bash
# 程序后台运行
nohup java -jar xxx.jar &
```

### 日志文件的处理

| 类型                        | 文件描述符 | 含义                 |
| --------------------------- | ---------- | -------------------- |
| 标准输入（standard input）  | 0          | 从键盘输入           |
| 标准输出（standard output） | 1          | 输出到屏幕（控制台） |
| 错误输出（error output）    | 2          | 输出到屏幕（控制台） |

使用`nohup java -jar xxx.jar`命令会默认生成一个 `nohup.out` 文件来记录日志，标准输出和错误输出都会在该文件中。

如果我们要将日志输出到指定的其他文件时可以使用输出符号 `>` 指定你的文件。例如将文件输出到`log.txt` 中可以使用命令：`nohup java -jar xxx.jar 1>log.txt`字符`1`可以省略，这样标准输出日志会输出到 `log.txt`文件中，但是错误的日志怎么处理呢？我需要使用到**命令的重定向绑定**。修改命令为：`nohup java -jar xxx.jar >log.txt 2>&1 &` 将错误输出重定向到标准输出`1`中，这样标准输出和错误输出都会在`log.txt`文件中。

### 如果不需要日志该如何设置

有的时候程序中已经指定了日志的位置，那么就不需要`nohup.out`文件了，这时候要丢弃这个文件。

`/dev/null`代表 linux 的空设备文件，所有往这个文件里面写入的内容都会丢失，俗称`黑洞`,

我们可以把日志输出指向这里： `nohup java -jar xxx.jar >/dev/null 2>&1`

### 小结

后台启动并且不需要nohup.out文件的命令：

```bash
nohup java -jar xxx.jar   >/dev/null 2>&1 &
```
