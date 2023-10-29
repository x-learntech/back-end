# Node.js

> 官网：[https://nodejs.org/zh-cn/](https://nodejs.org/zh-cn/)

传送门：[**大前端 - Node**](https://front.learntech.cn:88/node/)

什么是 Node.js？

- Node.js 是一个基于 **Chrome V8 引擎**的 JavaScript 运行环境。
- Node.js 使用了一个**事件驱动、非阻塞式 I/O** 的模型，使其轻量又高效。

在 Node.js 里运行 JavaScript 跟在 Chrome 里运行 JavaScript 有什么不同？

- Chrome 浏览器用的是同样的 JavaScript 引擎和模型。
- 在 Node.js 里写 JS 和在 Chrome 里写 JS，几乎没有不一样!

不一样的地方在于：

- Node.js 没有浏览器 API，即 document，window 等。
- 加了许多 Node.js API。

对于前端开发人员来说，你在 Chrome 里写 JavaScript 控制浏览器。对于开发者来说，Node.js 让你用类似的方式，控制整个计算机。

用 Node.js 客户端技术(electron)实现，可以最大限度复用现有工程。

PS：由于<Highlight color="#3498db">很多知识点其实是跟 JavaScript 重复的或者几乎一样的，就不再重复出现</Highlight>，可以参考：[大前端](https://front.learntech.cn/node/)

## BFF层（Backend for Frontend）

![2331-KyAGEs](https://cdn-static.learntech.cn/notes/20211006/2331-KyAGEs.png!min)

- 对用户侧提供 HTTP 服务
- 使用后端 RPC 服务

## commonJs 模块规范

## 包管理工具 npm

npm 是什么？

Node.js 的包管理工具

包是什么？

别人写的 Node.js 模块。

## 异步

异步编程 - callback

回调函数格式规范：

- error-first callback • node-style callback
- 第一个参数是 error，后面的参数才是结果。

异步流程控制：

- Promise
- async/await

## 非阻塞 I/O

- I/O 即 Input/Output，一个系统的输入和输出。
- 阻塞 I/O 和非阻塞 I/O 的区别就在于系统接收输入再到输出期间，能不能接收其他输入。

示例说明：

- 阻塞 I/O 例子，去饭堂吃，排队打饭：排队 =》等前面的人打饭 =》轮到你打饭 =》吃饭
- 非阻塞 I/O，出去吃，餐厅点菜：坐下 =》点菜 =》等待 =》吃饭

> 系统=食堂阿姨/服务生，输入=点菜，输出=端菜。
>
> 饭堂阿姨只能一份一份饭地打 -> 阻塞 I/O
>
> 服务生点完菜之后可以服务其他客人 -> 非阻塞 I/O

理解非阻塞 I/O 的要点在于：

- 确定一个进行 Input/Output 的系统。
- 思考在 I/O 过程中，能不能进行其他 I/O。

![2307-4E0HzM](https://cdn-static.learntech.cn/notes/20211006/2307-4E0HzM.png!min)

## RPC 调用

Remote Procedure Call(远程过程调用)

- 和 Ajax 有什么相同点?
  - 都是两个计算机之间的网络通信
  - 需要双方约定一个数据格式
- 和 Ajax 有什么不同点?
  - 不一定使用 DNS 作为寻址服务
  - 应用层协议一般不使用 HTTP
  - 基于 TCP 或 UDP 协议
- 寻址/负载均衡
  - Ajax：使用 DNS 进行寻址
  ![2334-0iWKDQ](https://cdn-static.learntech.cn/notes/20211006/2334-0iWKDQ.png!min)
  - RPC：使用特有服务进行寻址
  ![2335-MIU2GT](https://cdn-static.learntech.cn/notes/20211006/2335-MIU2GT.png!min)
- TCP 通信方式
  - 单工通信
  - 半双工通信
  - 全双工通信
- 二进制协议
  - 更小的数据包体积
  - 更快的编解码速率

## Buffer 编解码二进制数据包

- 大小端问题
  - 几个 Byte 里，高位与低位的编排顺序不同。
- 处理方法与 string 接近
  - 使用 concat 而不是 + 来避免 utf-8 字符拼接问题。
- Protocol Buffer
  - Google 研发的二进制协议编解码库
  - 通过协议文件控制 Buffer 的格式

## 性能分析

工具：

- Node.js 自带 profile
- Chrome devtool
- npm - clinic

## 子进程与线程

线程

- 进行运算调度的单元
- 进程内的线程共享进程内的资源

- 进程类似“公司”
- 线程类似公司的“职员”

Node.js 的事件循环

- 主线程运行 v8 与 JavaScript
- 多个子线程通过事件循环被调度
- 使用子进程或线程利用更多 CPU 资源

## cluster 模块

• 主进程启动多个子进程，由主进程轮流分发请求，子进程代为处理

## 进程守护与管理

第三方管理工具：[pm2](https://github.com/Unitech/pm2)

## 常见框架

- [express](https://expressjs.com/)

  核心功能：

  - 路由
  - request/response 简化
    - request:pathname、query 等
    - response:send()、json()、jsonp()等
  - 中间件

    - 更好地组织流程代码
    - 异步会打破 Express 的洋葱模型

- [koa](https://github.com/koajs/koa)

  核心功能：

  - 路由
  - 比 Express 更极致的 request/response 简化
  - 使用 async function 实现的中间件
    - 有“暂停执行”的能力
    - 在异步的情况下也符合洋葱模型
  - 精简内核，所有额外功能都移到中间件里实现。

  Express vs Koa：

  - Express 门槛更低，Koa 更强大优雅。
  - Express 封装更多东西，开发更快速，Koa 可定制型更高。

- [egg.js](https://eggjs.org/zh-cn/) 阿里开源的为企业级框架和应用而生的框架
- [nestjs](https://docs.nestjs.cn/) JavaScript版本的SpringBoot

## 部分资料及社区

- [koa2-note](https://github.com/chenshenhai/koa2-note)
- [cnodejs 社区](https://cnodejs.org/)
- [Sequelize ORM](https://sequelize.org/)
- [mongoosejs](https://mongoosejs.com/docs/guide.html)
- [graphql](https://graphql.cn/)
