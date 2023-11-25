# Java 简介

Java 名字的由来，实际上是一个有趣的故事。

我们所见到的 Java 标志，总是一杯热咖啡，这杯热咖啡你很难与计算机编程联想到一起。这杯热咖啡：Java 这个名字的由来，是 Java 创始人员团队中其中一名成员由于灵感想到的，想起自己在 Java 岛（爪哇岛）上曾喝过一种美味的咖啡，于是这种计算机编程语言就命名为 Java。

![2130-DfFehp](https://cdn-static.learntech.cn:88/notes/20211003/2130-DfFehp.png!min)

谈谈你对 Java 平台的理解？“Java 是解释执行”，这句话正确吗？

Java 本身是一种面向对象的语言，最显著的特性有两个方面，一是所谓的“书写一次，到处运行”（Write once, run anywhere），能够非常容易地获得跨平台能力；另外就是垃圾收集（GC, Garbage Collection），Java 通过垃圾收集器（Garbage Collector）回收分配内存，大部分情况下，程序员不需要自己操心内存的分配和回收。

我们日常会接触到 JRE（Java Runtime Environment）或者 JDK（Java Development Kit）。 JRE，也就是 Java 运行环境，包含了 JVM（Java Virtual Machine） 和 Java 类库，以及一些模块等。而 JDK 可以看作是 JRE 的一个超集，提供了更多工具，比如编译器、各种诊断工具等。

对于“Java 是解释执行”这句话，这个说法不太准确。我们开发的 Java 的源代码，首先通过 Javac 编译成为字节码（bytecode），然后，在运行时，通过 Java 虚拟机（JVM）内嵌的解释器将字节码转换成为最终的机器码。但是常见的 JVM，比如我们大多数情况使用的 Oracle JDK 提供的 Hotspot JVM，都提供了 JIT（Just-In-Time）编译器，也就是通常所说的动态编译器，JIT 能够在运行时将热点代码编译成机器码，这种情况下部分热点代码就属于编译执行，而不是解释执行了。

JAVA 跨平台原理：

![2020-JAVA跨平台原理](https://cdn-static.learntech.cn:88/notes/20211001/2020-JAVA跨平台原理.png!min)

命令行编译运行，此过程涉及到两个命令：javac 编译，java 运行

- Javac 命令：检查 java 程序是否有单词拼写和语法错误
- Java 命令：调用 jvm（java 虚拟机）来运行程序，程序不允许有逻辑错误。

各种不同的平台的虚拟机都使用统一的程序存储格式——字节码（ByteCode）是构成平台无关性的另一个基石。Java虚拟机只与由字节码组成的Class文件进行交互。

我们说Java语言可以Write Once ,Run Anywhere。这里的Write其实指的就是生成Class文件的过程。

因为Java Class文件可以在任何平台创建，也可以被任何平台的Java虚拟机装载并执行，所以才有了Java的平台无关性。

## [Java 基础](base/)

虽然是始于前端放眼全栈，但因为编程语言很多都是相通的，所以一些太过基础的就不再重复了。

### 关键字，注释，标识符

1. 关键字

java 开发中已被占用并赋予特殊含义的单词，在创造 java 语言时，就预先规定的语法规则。如：`public class static ...`

特点：全部小写。

2. 注释(三种)

```java
单行注释 //
多行注释 /*  被注释的内容    */   快捷键：ctrl +shift+/
文档注释/**  被注释的内容    */   常用在一个类的前面，声明该类的功能，作者，和编写时间
```

3. 标识符

除了 java 预先占用的单词以外，剩下的我们自己取的名字，包含：变量名 类名 方法名。

命名规则：

- 整个变量名的取名可用范围：大小写字母、_ 、$、￥、数字，遵循驼峰命名法
- 其中变量名开头第一个字符不能以数字开头，不用中文

### Java 程序的结构

```java
public class Hello {

 public static void main(String[] args) {
  System.out.println("Hello!");
 }

}
```

### Java 中的关键字和保留字

一、关键字

Java 中的关键字是有对编译器有特殊意义的词。比如 class 是用来定义类的关键字，编译器遇到 class 就知道这是定义了一个类。

![1936-OjONcR](https://cdn-static.learntech.cn:88/notes/20211003/1936-OjONcR.png!min)

二、保留字

保留字是 Java 预留的关键字，虽然现在还没有作为关键字，但是以后的升级版本中会成为关键字 保留字包括：goto、const。

### 数值类型的应用场景

一、整型的应用场景

整型主要用来存储整数，如：1，2，3 等等。按照存储数据的范围不同分为四种，分别是：byte、short、int、long，数据表示范围依次增大。选择数据类型的时候可以参考表示范围来选取，但实际应用中，int 和 long 是常用的数据类型，而 byte 和 short 使用较少，即使数值比较小一般也会使用 int 类型。

byte 类型主要对二进制数据进行存储，在文件输入输出流部分将会使用，用于二进制数据的传输。

short 类型在有的需求中会用到，比如：对于登录账号的状态表示，一般用 0 表示正常，1 表示冻结，2 表示已删除。这里的数值比较固定，值也比较小，可以使用 short 类型表示。

二、浮点型的应用场景

浮点类型表示小数，包括 float 和 double 两种类型，具体使用哪种数据类型，也是可以按照表示范围进行选择。但 double 类型 使用相对较多。

应用场景主要是要求数据精度高、并且数据量大的情况，如：医学、化学、军事、天文等领域。 这里需要注意，浮点型因为其表示方式的原因，会产生精度丢失的问题，所以会结合 BigDecimal 类进行使用，具体可以看一 下《浮点型数据教辅》的内容。因为还没有学到类的定义和使用，可以了解一下这种处理方式。

### Java 基本数据类型的范围

![1958-k04SRD](https://cdn-static.learntech.cn:88/notes/20211003/1958-k04SRD.png!min)

备注：

1. E 表示 10 次方
2. boolean 包括 true 和 false 两个值
3. char 类型占 2 个字节，即 16 位

### Java 中常见的转义字符

转义字符是一些有特殊意义的字符，用来表示常见的不能显示的字符。下面介绍一下所有转义字符和他们所对应的意义：

![2003-c6MxVh](https://cdn-static.learntech.cn:88/notes/20211003/2003-c6MxVh.png!min)

### Java 方法

方法声明，语法格式:

```xml
访问修饰符 返回类型 方法名(参数列表){
  方法体
}
```

方法分类，根据方法是否带参数、是否返回值，可分为四类:

- 无参无返回值方法
- 无参带返回值方法
- 带参无返回值方法
- 带参带返回值方法

方法重载：

方法名相同，参数列表不同。

可变参数总结：

- 可变参数一定是方法中的最后一个参数
- 数组可以传递给可变参数的方法，反之不行
- 在重载中，含有可变参数的方法是最后被选中的

### Java 异常

![2037-kDmrqM](https://cdn-static.learntech.cn:88/notes/20211003/2037-kDmrqM.png!min)

## spring-boot

- [spring-boot 官网](https://spring.io/projects/spring-boot)

## 开发工具

[IDEA](https://www.jetbrains.com/zh-cn/idea/)

必安装插件：Lombok

## 扩展阅读

[To Be Top Javaer - Java工程师成神之路](https://github.com/hollischuang/toBeTopJavaer)
