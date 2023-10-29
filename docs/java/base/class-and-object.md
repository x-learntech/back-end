# 认识类和对象

Java 是面向对象的语言。

1. 类是具有相同属性和行为的对象的集合或者说统称。对象是由类创建出来的一个实体。这个实体所具备的属性和行为已经被类所规定好了。**没有类，就无法创建对象。**
2. 必须先创建类，然后创建对象。问题变成了类中到底具备哪些属性和行为？要回答他，只能告诉大家思维方式，这种思维方式叫做抽象思维。但是每个人对同一类对象也就是类的属性和行为的认知是不一样的，这样通过抽象思维进行抽象的时候，可能照成设计的类的属性和行为不一样。

## 类是什么，对象又是什么，类和对象又有什么关系

类就是一类事物的**抽象**概念，它不指代某一个具体的事物，而是将这一类事物所具有的特点进行抽取，然后形成一个带有范围指向性的概念。

对象就是某一类中的**具体**的指代，表示的是一个实实在在的具体的事物。

由类生成对象的过程叫做实例化。如下图所示，类就相当于汽车设计图，生产的车好比就是实例化。

![0012-2zBPZ0](https://cdn-static.learntech.cn/notes/20211005/0012-2zBPZ0.png!min)

## Java 类模板和使用对象

1. 类的创建，定义成员属性和方法。
2. 创建和使用对象：用对象调用成员属性和方法。

## 抽象类

### 如何理解抽象方法

1. 抽象方法衍生背景：
   “用进废退”：多态的领域， 父类中被子类重写的实例方法，功能逐渐淡化，索性去掉方法体 退化为抽象方法

2. 抽象方法使用规则
   1. 抽象方法没有方法体
   2. 含有抽象方法的类必须是抽象类
   3. 抽象类中可以暂时没有抽象方法
   4. 抽象类中的抽象方法跟子类有什么联系？
      1. 如果子类完全实现了父类的抽象方法，那么子类可以不用声明为抽象类
      2. 如果子类没有完全实现父类的抽象方法，那么子类必须声明为抽象类

### 抽象类的语法规则

1. 被 abstract 修饰的类是抽象类
2. 抽象类中可以有抽象方法，也就是被 abstract 修饰的方法，也可以没有。
3. 抽象方法没有方法体，只有方法声明。
4. 子类继承抽象类需要重写父类所有的抽象方法，否则，子类也必须声明为抽象类
5. 抽象类有构造方法，但是不能被显示调用，也就是不能实例化，或者说抽象类没有对象。--防止直接调用抽象方法
6. 抽象类的构造方法只在子类实例化时隐式调用。
7. 抽象类的使用一般是作为引用类型，指向非抽象的引用实例，体现出多态。
8. 构造方法和静态方法都不能（abstract）抽象修饰
   静态方法不能被子类覆盖（重写），一旦声明为抽象方法，将永远没有具体的实现

## Java 中的常用类

### 比较器

Comparator 和 Comparable 比较：

1. Comparable 是排序接口；若一个类实现了 Comparable 接口，就意味着“该类支持排序”。作用在实体类上。
1. 而 Comparator 是比较器；我们若需要控制某个类的次序，可以建立一个“该类的比较器”来进行排序。作用在排序类上。

总结：Comparable 相当于“内部比较器”，而 Comparator 相当于“外部比较器”。

### 内部类

在 Java 中，可以将一个类定义在另一个类里面或者一个方法里面，这样的类称为内部类。广泛意义上的内部类一般来说包括这四种：成员内部类、局部内部类、匿名内部类和静态内部类。

1. 成员内部类

定义在类中，充当类的一个成员。

访问权限：内部类可以访问外部类的属性和方法，外部类想要访问内部类的成员必须先创建内部类的对象来访问。

创建对象：`new Outer().new Inner()`

2. 静态内部类

静态内部类可以理解为类的一个静态成员。

静态内部类不需要依赖于外部类的对象，可以直接创建自己的对象。

不能访问外部类的非 static 成员属性或方法，因为静态内部类不依赖外部对象，就可以自己创建对象，所以如果没有外部对象，就调用外部的实例成员，就产生了矛盾，因为外部的实例成员必须要有外部对象。

3. 局部内部类

定义在方法中，充当方法的一个变量，注意: 局部内部类就像是方法里面的一个局部变量一样，是不能有 public、protected、private 以及 static 修饰符的。

4. 匿名内部类

匿名内部类，通常作为方法传参时使用，用于继承抽象类或实现接口，代替子类或实现类，并不需要额外定义方法。Jdk8 开始可以使用 Lambda 表达式进行简化。

### 包装类

#### 包装类的概念

由于基本数据类型没有类和对象的概念，java 的设计理念是万事万物皆对象。所以特定为每一种基本数据类型量身定制了一个属于自己的类，称为包装类。

![2250-DpDcIT](https://cdn-static.learntech.cn/notes/20211005/2250-DpDcIT.png!min)

在这八个类名中，除了 Integer 和 Character 类以后，其它六个类的类名和基本数据类型一致，只是类名的第一个字母大写即可。

#### 包装类的应用

由于集合中不能存储基本数据类型，我们所看到的类似 `list.add(6);` 语句事实上存储的都是包装类型，由基本数据类型升级成包装类的过程叫做“装箱”，反之称为“拆箱”；

1. 装箱—拆箱 包装类 –基本数据类型 **自动进行**
2. 向上转型—向下转型 父类—子类
3. 强制类型转换—自动转换 byte-short-int-long float-double

#### 包装类的构造方法

1. 所有包装类都可将与之对应的基本数据类型作为参数，来构造它们的实例
2. 除 Character 类外，其他包装类可将一个字符串作为参数构造它们的实例

注意事项

1. Boolean 类构造方法参数为 String 类型时，若该字符串内容为 true(不考虑大小写)，则该 Boolean 对象表示 true，否则表示 false
2. 当 Number 包装类（除了 Character 和 Boolean 其它的包装类）构造方法参数为 String 类型时，字符串不能为 null，且该字符串必须可解析为相应的基本数据类型的数据，否则编译不通过，运行时会抛出 NumberFormatException 异常

总结：包装类的构造方法一般都有重载，一个构造方法的参数是对应的基本数据类型，另一个构造方法的参数是字符串类型。

#### 包装类的常用方法

1. `XXXValue()`：包装类转换成基本类型（实例方法）

`byteValue()、intValue()、longValue()、shortValue()、doubleValue()、floatValue()、charValue()、booleanValue()`

2. `toString()`：以字符串形式返回包装对象表示的基本类型数据（基本类型->字符串）（静态方法）
3. `parseXXX()`：把字符串转换为相应的基本数据类型数据（Character 除外）（字符串->基本类型）（静态方法）
4. `valueOf()`（静态方法）
   (1) 所有包装类都有如下方法（基本类型->包装类）
   `public static Type valueOf(type value)`
   (2) 除 Character 类外，其他包装类都有如下方法（字符串->包装类）
   `public static Type valueOf(String s)`
5. `compare()`（静态方法）
   比较两个基本数据类型的大小，返回一个 int，搭配比较器使用。

### String 类

- **常用方法**：

1. 长度 length()
2. 拼接 str.concat(str2)
3. 格式化

```java
 //方式一
System.out.printf("大家好，我的名字叫：%s,我今年：%d岁了，我的存款有：%f %n","曹操",36,999.99);
//方式二
String s = String.format("大家好，我的名字叫：%s,我今年：%d岁了，我的存款有：%f","曹操",36,999.99);
System.out.println(s);
```

4. charAt(index)返回指定索引处的字符
5. indexOf(str)返回指定字符串在此字符串中第一次出现处的索引
6. compareTo(str2)比较两个字符串
7. equals()和 equalsIgnoreCase()
8. getBytes()使用默认字符集将字符串变为字节数组，IO 流中会用到
9. toCharArray() 字符串转换为字符数组
10. 截取：subString()
11. 转换成大小写 toLowerCase() toUpperCase()
12. 截取前后空白 trim()
13. 替换：replace()
14. 分割：split()
15. 正则匹配 matches(String reg) 返回 boolean

**PS：在Java中，==比较的是对象引用，而equals比较的是值。**

- **构造方法**

```java
new String()
    //字符串和字节数组，字符数组之间的相互转换--字符串截取substring方法的底层实现
new String(char[] arr)
new String(byte[] bs)
```

### StringBuffer 和 StringBuilder

1.区别

1.1 String 是不可变的对象, 因此在每次对 String 类型进行改变的时候其实都等同于生成了一个新的 String 对象，然后将指针指向新的 String 对象，这样不仅效率低下，而且大量浪费有限的内存空间，所以经常改变内容的字符串最好不要用 String 。

1.2 当对字符串进行修改的时候，特别是字符串对象经常改变的情况下，需要使用 StringBuffer 和 StringBuilder 类。和 String 类不同的是，StringBuffer 和 StringBuilder 类的对象能够被多次的修改，并且不产生新的未使用对象。StringBuilder 类在 Java 5 中被提出，它和 StringBuffer 之间的最大不同在于 StringBuilder 的方法不是线程安全的（不能同步访问）。由于 StringBuilder 相较于 StringBuffer 有速度优势，所以多数情况下建议使用 StringBuilder 类。然而在应用程序要求线程安全的情况下，则必须使用 StringBuffer 类。

![2320-1603843891502](https://cdn-static.learntech.cn/notes/20211005/2320-1603843891502.png!min)

- 继承结构图

![2320-1603844129113](https://cdn-static.learntech.cn/notes/20211005/2320-1603844129113.png!min)

2.相同

StringBuffer 和 StringBuilder 用法一样，

测试：循环 1W 次，String 和 StringBuilder，StringBuffer 的拼接操作，对比耗时。

3.常用方法

```java
//1.追加
 append()
//2.插入
  insert()
//3.倒置
  reverse()
```

## IO 流

![2339-image-20201104163012878](https://cdn-static.learntech.cn/notes/20211005/2339-image-20201104163012878.png!min)

### File 类

File 类以抽象的方式代表文件名和目录路径名。该类主要用于文件和目录的创建、文件的查找和文件的删除等。

File 对象代表磁盘中实际存在的文件和目录。通过以下构造方法创建一个 File 对象。

- 常用构造方法

```java
new File(File parent,String child );
new File(String parent,String child);
new File(String pathName);
```

- 常用方法

| 方法名                  | 描述                               |
| ----------------------- | ---------------------------------- |
| String getName()        | 获取文件（夹）名                   |
| String getPath()        | 获取文件（夹）路径                 |
| boolean exists()        | 文件（夹）是否存在                 |
| boolean isFile()        | 是否是一个文件                     |
| boolean isDirectory()   | 是否是一个目录（文件夹）           |
| boolean createNewFile() | 创建一个文件                       |
| boolean mkdir()         | 创建一个具体的文件夹               |
| boolean mkdirs()        | 创建多级文件夹                     |
| boolean delete()        | 删除某个文件（夹）                 |
| String [] list()        | 返回某个文件夹下的所有文件（夹）名 |
| File [] listFiles()     | 获取某个文件夹下所有的文件（夹）   |

### 字节流

#### 1.字节输入流

- 构造方法

```java
new FileInputStream(String文件路径);
new FileInputStream(File文件对象);
```

- 使用步骤

```powershell
1.创建输入流流对象
2.调用read方法
3.关闭流对象
```

- read 方法：从字节输入流中读取数据

```java
//无参，返回一个字节，表示读取一个字节数据
int read()
//传入一个字节数组，表示将读到的字节存入数组中，返回存入的字节个数
int read(byte[] bytes)
//传入一个字节数组，数组下标，存放个数，表示将读到的字节存入数组，从数组的第off+1个元素开始存放，共存放len个。返回实际存入的字节个数。
int read(byte[] b,int off,int len)
```

- 常用方法

```java
//返回字节输入流中还有多少个可以读取的字节个数
int available();
```

#### 字节输出流

- 构造方法

```java
new FileOutputStream(String);
new FileOutputStream(String,Boolean);
new FileOutputStream(File);
new FileOutputStream(File,Boolean);
```

- 使用步骤

```powershell
1.创建输出流对象
2.调用write方法
3.关闭流对象
```

- write 方法：向字节输出流中写入数据

```java
 //写入一个字节数据b
void write(int b);
 //将字节数组b写入输出流中
void write(byte[] b);
 //从字节数组b的第off+1个元素开始，向输出流中写入len个字节
void write(byte[] b,int off,int len);
```

### 字符流

读写字符数据文件：txt 文件。

#### 1.字符输入流

- 构造方法

```java
new FileReader(String);
new FileReader(File);
```

- 使用步骤

```powershell
1.构建流对象
2.调用read方法
3.关闭流对象
```

- read 方法：从字符输入流中读取字符数据

```java
//读取一个字符，并返回读到的字符，如果没有读到，返回-1
int read();
//读取到的字符存入字符数组c
read(char[] c);
//读取到的字符存入字符数组c，从下标offset开始，个数为len
read(char[] c,int offset,int len);
```

#### 字符输出流

- 构造方法

```java
new FileWriter(String);
new FileWriter(String,boolean);
new FileWriter(File);
new FileWriter(File,boolean);
```

- write 方法：向字符输出流中写入字符数据

```java
//写入一个字符
void write(int c)
//写入一个字符串
void write(String str)
//写入一个字符数组
void write(char[] c)
//写入一个字符串，从off开始，写len个
void write(String str,int off,int len)
//写入一个字符数组，从off开始，写len个
void write(char[] c,int off,int len)
```
