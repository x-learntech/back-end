# Java 中的关键字

## 类、接口、方法、变量、代码块修饰符

![1021-9KFMtT](https://cdn-static.learntech.cn/notes/20211004/1021-9KFMtT.jpg!min)

1、class 类

class 关键字用来声明新的 Java 类，该类是相关变量和/或方法的集合。类是面向对象的程序设计方法的基本构造单位。要使用类，通常使用 new 操作符将类的对象实例化，然后调用类的方法来访问类的功能。

2、abstract 声明抽象

abstract 关键字可以修改类或方法。abstract 类可以扩展（增加子类），但不能直接实例化。abstract 方法不在声明它的类中实现，但必须在某个子类中重写。采用 abstract 方法的类本来就是抽象类，并且必须声明为 abstract。

3、extends 继承、扩展

extends 关键字用在 class 或 interface 声明中，用于指示所声明的类或接口是其名称后跟有 extends 关键字的类或接口的子类。子类继承父类的所有 public 和 protected 变量和方法（但是不包括构造函数）。子类可以重写父类的任何非 final 方法。一个类只能扩展一个其他类，但一个接口可以继承多个接口。

4、implements 实现

implements 关键字在 class 声明中使用，以指示所声明的类提供了在 implements 关键字后面的名称所指定的接口中所声明的所有方法的实现。类必须提供在接口中所声明的所有方法的实现。一个类可以实现多个接口。

5、interface 接口

interface 关键字用来声明新的 Java 接口，接口是方法的集合。

6、final 最终、不可改变

在 Java 中，final 关键字可以用来修饰类、方法和变量（包括成员变量和局部变量）。final 方法在编译阶段绑定，称为静态绑定(static binding)。下面就从这四个方面来了解一下 final 关键字的基本用法。

6.1、修饰类

当用 final 修饰一个类时，表明这个类不能被继承，不能有子类。也就是说，如果一个类你永远不会让他被继承，就可以用 final 进行修饰。final 类中的成员变量可以根据需要设为 final，但是要注意 final 类中的所有成员方法都会被隐式地指定为 final 方法。

6.2、修饰方法

下面这段话摘自《Java 编程思想》：

> 使用 final 方法的原因有两个。第一个原因是把方法锁定，以防任何继承类修改它的含义；第二个原因是效率。在早期的 Java 实现版本中，会将 final 方法转为内嵌调用。但是如果方法过于庞大，可能看不到内嵌调用带来的任何性能提升。在最近的 Java 版本中，不需要使用 final 方法进行这些优化了。

因此，如果只有在想明确禁止该方法在子类中被覆盖的情况下才将方法设置为 final 的。

还有就是，类的 private 方法会隐式地被指定为 final 方法。

6.3、修饰变量

修饰变量是 final 用得最多的地方。

对于一个 final 变量，如果是基本数据类型的变量，则其数值一旦在初始化之后便不能更改；如果是引用类型的变量，则在对其初始化之后便不能再让其指向另一个对象。引用变量被 final 修饰之后，虽然不能再指向其他对象，但是它指向的对象的内容是可变的。

6.4、final 参数

当函数参数为 final 类型时，你可以读取使用该参数，但是无法改变该参数的值或者引用指向。道理同 final 变量。

7、strictfp 严格,精准

strictfp 的意思是 FP-strict，也就是说精确浮点的意思。在 Java 虚拟机进行浮点运算时，如果没有指定 strictfp 关键字时，Java 的编译器以及运行环境在对浮点运算的表达式是采取一种近似于我行我素的行为来完成这些操作，以致于得到的结果往往无法令人满意。而一旦使用了 strictfp 来声明一个类、接口或者方法时，那么所声明的范围内 Java 的编译器以及运行环境会完全依照浮点规范 IEEE-754 来执行。因此如果想让浮点运算更加精确，而且不会因为不同的硬件平台所执行的结果不一致的话，那就请用关键字 strictfp。

可以将一个类、接口以及方法声明为 strictfp，但是不允许对接口中的方法以及构造函数声明 strictfp 关键字。

8、static 静态

static 可以用于修饰属性，可以修饰代码块，也可以用于修饰方法，还可以用于修饰类。

8.1、static 修饰属性

无论一个类生成了多少个对象，所有这些对象共同使用唯一一份静态的成员变量；一个对象对该静态成员变量进行了修改，其他对象的该静态成员变量的值也会随之发生变化。如果一个成员变量是 static 的，那么我们可以通过‘类名.成员变量名’的方式来使用它。

8.2、static 修饰方法

static 修饰的方法叫做静态方法。对于静态方法来说，可以使用‘类名.方法名’的方式来访问。静态方法只能继承，不能重写（Override），因为重写是用于表现多态的，重写只能适用于实例方法，而静态方法是可以不生成实例直接用类名来调用，这就会与重写的定义所冲突，与多态所冲突，所以静态方法不能重写，只能是隐藏。

static 方法与非 static 方法：不能在静态方法中访问非静态成员变量；可以在静态方法中访问静态的成员变量。可以在非静态方法中访问静态的成员变量：因为静态方法可以直接用类名来调用，而非静态成员变量是在创建对象实例时才为变量分配内存和初始化变量值。

不能在静态方法中使用 this 关键字：因为静态方法可以直接用类名来调用，而 this 实际上是创建实例时，实例对应的一个应用，所以不能在静态方法上使用 this。

8.3、static 修饰代码块

静态代码块。静态代码块的作用也是完成一些初始化工作。首先执行静态代码块，然后执行构造方法。静态代码块在类被加载的时候执行，而构造方法是在生成对象的时候执行；要想调用某个类来生成对象，首先需要将类加载到 Java 虚拟机上（JVM），然后由 JVM 加载这个类来生成对象。

类的静态代码块只会执行一次，是在类被加载的时候执行的，因为每个类只会被加载一次，所以静态代码块也只会被执行一次；而构造方法则不然，每次生成一个对象的时候都会调用类的构造方法，所以 new 一次就会调用构造方法一次。如果继承体系中既有构造方法，又有静态代码块，那么首先执行最顶层的类的静态代码块，一直执行到最底层类的静态代码块，然后再去执行最顶层类的构造方法，一直执行到最底层类的构造方法。注意：静态代码块只会执行一次。

8.4、static 修饰类

这个有点特殊，首先，static 是可以用来修饰类的，但是 static 是不允许用来修饰普通类，只能用来修饰内部类，被 static 所修饰的内部类可以用 new 关键字来直接创建一个实例，不需要先创建外部类实例。static 内部类可以被其他类实例化和引用（即使它是顶级类）。

其实理解起来也简单。因为 static 主要是修饰类里面的成员，包括内部类、属性、方法这些。修饰这些变量的目的也很单纯，那就是暗示这个成员在该类之中是唯一的一份拷贝，即便是不断的实例化该类，所有的这个类的对象都会共享这些 static 成员。这样就好办了。因为是共享的、唯一的，所以，也就不需要在实例化这个类以后再通过这个类来调用这个成员了，显然有点麻烦，所以就简单一点，直接通过类名直接调用 static 成员，更加直接。然而这样设置之后，就出现了一个限制，就是，static 方法之中不能访问非 static 属性，因为这个时候非 static 属性可能还没有给他分配内存，该类还没有实例化。

所以，通常，static 关键字意味着应用它的实体在声明该实体的类的任何特定实例外部可用。

可以从类的外部调用 static 方法，而不用首先实例化该类。这样的引用始终包括类名作为方法调用的限定符。

9、synchronized 线程、同步

synchronized 关键字可以应用于方法或语句块，并为一次只应由一个线程执行的关键代码段提供保护。

synchronized 关键字可防止代码的关键代码段一次被多个线程执行。

10、transient 短暂

transient 关键字可以应用于类的成员变量，以便指出该成员变量不应在包含它的类实例已序列化时被序列化。

当一个对象被串行化的时候，transient 型变量的值不包括在串行化的表示中，然而非 transient 型的变量是被包括进去的。

11、volatile 易失

volatile 关键字用于表示可以被多个线程异步修改的成员变量。

注意：volatile 关键字在许多 Java 虚拟机中都没有实现。volatile 的目标用途是为了确保所有线程所看到的指定变量的值都是相同的。

12、native 本地

native 关键字可以应用于方法，以指示该方法是用 Java 以外的语言实现的，方法对应的实现不是在当前文件，而是在用其他语言（如 C 和 C++）实现的文件中。

Java 不是完美的，Java 的不足除了体现在运行速度上要比传统的 C++慢许多之外，Java 无法直接访问到操作系统底层（如系统硬件等），为此 Java 使用 native 方法来扩展 Java 程序的功能。

13、enum 枚举

枚举类型（Enumerated Type） 很早就出现在编程语言中，它被用来将一组类似的值包含到一种类型当中。而这种枚举类型的名称则会被定义成独一无二的类型描述符，在这一点上和常量的定义相似。不过相比较常量类型，枚举类型可以为申明的变量提供更大的取值范围。

## 包的关键字

包的定义：

我们学习 java 时，生成的 class 文件都是位于当前目录中，假如出现了同名文件，则会出现文件覆盖问题，因此就需要设置不同的目录(定义包)，来解决同名文件冲突问题。并且在大型项目中，更加需要模块化，将不同的模块保存在不同的包里，然后编译时再进行一起执行。这样的代码将更易于维护，并且支持多人开发。

### package

在 java 中可以通过 package 关键字来定义包(也就是目录路径)，该语句需要写在文件首行。若缺省该语句，则指定为无名包。

> package 顶层包名.子包名

- 包对应于文件系统的目录，package 语句中，用“.” 来指明包（目录）的层次
- 包通常用小写单词标识，通常使用所在公司域名的倒置：com.baidu.xxx
- 每"."一次，就代表一层文件目录
- 同一个包下，不能命名同名的接口、类；不同的包下，可以命名同名的接口、类

### import

使用 package 包可以将编译出来的 class 进行分开保存，那么如果想不同包之间互相调用，则需要使用 import 关键字来声明包的入口位置。

> import 包名.类名

1. 在源文件中使用 import 显式的导入指定包下的类或接口
2. 声明在包的声明和类的声明之间
3. 如果需要导入多个类或接口，那么就并列显式多个 import 语句即可
4. 举例：可以使用 `java.util.*` 的方式，一次性导入 util 包下所有的类或接口
5. 如果导入的类或接口是 java.lang 包下的，或者是当前包下的，则可以省略此 import 语句
6. 如果在代码中使用不同包下的同名的类。那么就需要使用类的全类名的方式指明调用的是哪个类
7. 如果已经导入 java.a 包下的类。那么如果需要使用 a 包的子包下的类的话，仍然需要导入

## 基本数据类型

![2333-YpoymU](https://cdn-static.learntech.cn/notes/20211004/2333-YpoymU.jpg!min)

## 变量引用

![2333-LaGwDO](https://cdn-static.learntech.cn/notes/20211004/2333-LaGwDO.jpg!min)

## 程序控制、条件循环

1、流程判断

```java
if(布尔值) {
  ...
} else {
  ...
}
```

2、for 循环

```java
for (数据类型 变量值 : 数组) {
  ...
}
for (数据类型 变量值 : 数组) {
  ...
}
```

3、while 循环

```java
while (布尔值) {
  ...
}
do {
  ...
} while (布尔值);
```

4、switch 选择

```java
switch(变量){
    case 值1 :
       //语句
       break; //可选
    case 值2 :
       //语句
       break; //可选
    //你可以有任意数量的case语句
    default : //可选
       //语句
}
```

5、instanceof 对象类型判断

```java
result = 需要判断的对象 instanceof 已知对象
// result为布尔值
```

6、continue 关键字

continue：表示跳过当前程序，继续下一个，一般用于循环语句

```java
for (int i = 0; i < 10; i++) {
  if(i == 6){
    //如果i等于6 ，就跳过，进行下一次循环
    continue;
  }
}
```

7、break 关键字

break：表示跳过当前程序，结束，一般用于循环语句

```java
for (int i = 0; i < 10; i++) {
  if(i == 6){
    //如果i等于6 ，就跳过，结束循环语句
    continue;
  }
}
```

8、return 关键字

return：结束当前流程，返回结果！

9、assert 关键字

assert：断言是为了方便调试程序，并不是发布程序的组成部分。理解这一点是很关键的，后面会单独介绍！

断言是通过关键字 assert 来定义的，一般的，它有两种形式。

```java
// 例如：assert <bool expression>;
boolean isStudent = false; assert isStudent;
// 例如：assert <bool expression> : <message>;
boolean isSafe = false;  assert isSafe : "Not Safe at all";
```

## 错误处理

1、异常捕捉

```java
try {
  ...
} catch (Exception e) {
  //异常
} finally {
  //异常最终执行语句
}
```

2、异常抛出

```java
throw new Exception();

throws Exception

public static void main(String[] args) throws Exception {
  try {
    System.out.println("hello world");
  } catch (Exception e) {
    throw new Exception();
  } finally {
    System.out.println("异常结束");
  }
}
```

## 访问控制

> ✓ 表示可以访问，x 表示不能访问

![1020-r3og1X](https://cdn-static.learntech.cn/notes/20211004/1020-r3og1X.jpg!min)

1、private（私有化）

private 关键字是访问控制修饰符，可以应用于内部类、方法或类的变量字段。只能在声明 private（内部）类、方法或字段的类中引用这些类、方法或字段。在类的外部或者对于子类而言，它们是不可见的。

2、default（缺省）

default：关键字是可以应用于类、方法或类的变量字段的访问控制修饰符。当没有指定类的访问权限的时候，虚拟机就会默认的形式给类划定界限！默认修饰的类无法被其他包的类继承！

3、protected（受保护的）

protected：关键字是可以应用于内部类、方法或类的变量字段的访问控制修饰符。可以在声明 protected 类、方法或字段的类、同一个包中的其他任何类以及任何子类（无论子类是在哪个包中声明的）中引用这些类、方法或字段。

4、public（公共的）

public：关键字是可以应用于类、方法或类的变量字段的访问控制修饰符。可以在其他任何类或包中引用 public 类、方法或字段。

## 保留字

正确识别 java 语言的关键字（keyword）和保留字（reserved word）是十分重要的。Java 的关键字对 java 的编译器有特殊的意义，他们用来表示一种数据类型，或者表示程序的结构等。保留字是为 java 预留的关键字，他们虽然现在没有作为关键字，但在以后的升级版本中有可能作为关键字。 识别 java 语言的关键字，不要和其他语言如 c/c++的关键字混淆。const 和 goto 是 java 的保留字。 所有的关键字都是小写。

1、goto 跳转

goto 保留关键字，但无任何作用。结构化程序设计完全不需要 goto 语句即可完成各种流程，而 goto 语句的使用往往会使程序的可读性降低，所以 Java 不允许 goto 跳转。

2、const 静态

const 保留字，是一个类型修饰符，使用 const 声明的对象不能更新。与 final 某些类似。

## 关键字汇总

![1019-FPYJpg](https://cdn-static.learntech.cn/notes/20211004/1019-FPYJpg.jpg!min)