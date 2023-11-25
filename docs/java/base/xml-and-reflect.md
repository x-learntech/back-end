# Xml 和反射

## Xml

### 1.xml 简介

可扩展标记语言，简称 XML。是一种用于标记电子文件使其具有结构性的标记语言。 在电子计算机中，标记指计算机所能理解的信息符号，通过此种标记，计算机之间可以处理包含各种的信息比如文章等。它可以用来标记数据、定义数据类型，是一种允许用户对自己的标记语言进行定义的源语言。 它非常适合万维网传输，提供统一的方法来描述和交换独立于应用程序或供应商的结构化数据。是 Internet 环境中跨平台的、依赖于内容的技术，也是当今处理分布式结构信息的有效工具。早在 1998 年，W3C 就发布了 XML1.0 规范，使用它来简化 Internet 的文档信息传输。

- 存储数据
- 传输数据

案例：

- 写一个 xml 文件，用来储存家庭的人口信息（姓名，年龄等）。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<families>
    <family>
        <person>
            <name>父亲</name>
            <age>36</age>
        </person>
        <person>
            <name>母亲</name>
            <age>35</age>
        </person>
    </family>
    <family>
        <person>
            <name>父亲</name>
            <age>36</age>
        </person>
        <person>
            <name>母亲</name>
            <age>35</age>
        </person>
    </family>
</families>
```

- 总结特点

```powershell
1.必须要有一个跟标签
2.任意标签之间只能是包含关系或并列关系，合理的嵌套
3.除了标签体，还可以有属性和文本。
4.xml中没有内置任何标签，没有内置任何属性。所以：标签和属性都是自定义的。
```

### 2.xml 解析

- 解析方式

```powershell
DOM(Document Object Model)解析：是基于 XML 文档树结构的解析,整颗树加载到内存中，耗内存，可多次获取。

SAX(Simple API for XML)解析：是基于事件流的解析。效率高，数据量小，仅一次获取 。

DOM4J解析：融合了Dom和Sax的优点，即能保证效率，同时也可多次获取。著名的开发框架Spring和Hibernate都使用了Dom4j的功能。
```

#### 增删改

- 文档对象的来源

  - 文档对象可以是通过 SaxReader 获取到的
  - 也可以是 `DocumentHelper.createDocument()`;

- 增删改操作都需要将文档对象重新写入 xml 文件，用更新后的 dom 去覆盖之前的 dom 树

```java
//1.准备输出流--可以尝试用System.out
FileOutputStream out = new FileOutputStream("src/xml/b.xml");
//2.准备格式化对象
OutputFormat format = OutputFormat.createPrettyPrint();
format.setEncoding("utf-8");
//3.构建xml输出流对象
XMLWriter writer = new XMLWriter(out,format);
//4.将文档对象，写入输出流
writer.write(doc);
//5.刷新缓冲区，关闭资源
writer.close();
```

## Reflect

### 1.反射概念

​ JAVA 反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意方法和属性；这种动态获取信息以及动态调用对象方法的功能称为 java 语言的反射机制。

**理解 Reflect**

- 反射

![2352-image-20201106165818756](https://cdn-static.learntech.cn:88/notes/20211005/2352-image-20201106165818756.png!min)

- 反转

```powershell
理解为控制反转，权力的反转：
每一个人都有活着的权力，行动和自由的权力；每一个类都有创建对象，调用属性和方法的权力。现在将类的这些权力转交给Class对象，让它来帮助某个类去完成这些操作。
```

- 理解 Class

```powershell
每一个实体类都会被编译成字节码文件，java眼中万事万物都是对象，那么天下所有的字节码文件都可以看成是对象，谁的对象呢？ 当然得有一个类，来代表所有的字节码文件，这个类就是Class类。
即：所有类文件被编译成字节码文件后，都可以看成是Class类的对象。
例如：
Class c=Dog.class; //Dog.class就表示Dog类文件被编译后的字节码文件
```

### 2.反射功能

- 三种方式获取 Class 对象

```java
@Test//获取Class --范围：所有的字节码文件
    public void test1() throws ClassNotFoundException {
        //方式1--通过类名
        Class c=Dog.class;//Dog.java编译后的字节码文件
        Class c1=Book.class;//Book.java编译后的字节码文件
        //方式2--通过对象
        Class c3 = new Dog().getClass();
        //方式3--通过类路径
        Class c4 = Class.forName("reflect1.Book");
    }
```

- 管理无参构造

```java
//1.管理无参构造
    @Test
    public void test2() throws Exception {
        //1.获取到某个类的字节码文件对象，即Class的对象
        Class<Dog> c = Dog.class;
        //2.帮Dog调用无参构造
        Dog dog = c.newInstance();
        System.out.println(dog);
    }
```

- 管理有参构造

```java
//2.管理有参构造
    @Test
    public void test3() throws Exception {
        //1.获取到某个类的字节码文件对象，即Class的对象
        Class<Dog> c = Dog.class;
        //2.获取有参构造的管理对象--2个参数的那个
        Constructor<Dog> con = c.getDeclaredConstructor(String.class,int.class);
        //3.帮助Dog类调用有参构造
        Dog dog = con.newInstance("旺财",2);
        System.out.println(dog);
    }
```

- 管理属性

```java
//3.管理属性
    @Test
    public void test4() throws Exception {
        //1.获取到某个类的字节码文件对象，即Class的对象
        Class<Dog> c = Dog.class;
        //2.获取某个属性的管理对象
        Field f = c.getDeclaredField("name");
        //先创建一个狗狗对象
        Dog dog = c.newInstance();
        f.setAccessible(true);//开启私有属性操作权限
        //3.帮助dog给name属性赋值
        f.set(dog,"来福");
        System.out.println(dog);
    }
```

- 管理方法

```java
 //4.管理方法
    @Test
    public void test5() throws Exception {
        //1.获取到某个类的字节码文件对象，即Class的对象
        Class<Dog> c = Dog.class;
        //2.获取某个方法setAge(int age)的管理对象
        Method m = c.getDeclaredMethod("setAge", int.class);
        //先创建一个狗狗对象
        Dog dog = c.newInstance();
        //3.帮助dog给调用setAge方法
        m.invoke(dog,3);
        //System.out.println(dog);
        //管理toString方法
        Method m2 = c.getDeclaredMethod("toString");
        System.out.println(m2.invoke(dog));
    }
```

#### 案例

**反射结合泛型案例**

```powershell
将一个map中的数据转存到一个实体类对象中。
```

```java
 @Test//案例一：将一个map中的数据转存到一个实体类对象中。
    public void test5() throws Exception {
        HashMap<String, Object> map = new HashMap<>();
        map.put("name","旺财");
        map.put("age",3);
        Dog dog = getObject(map, Dog.class);
        System.out.println(dog);
    }

    public <T> T getObject(Map<String,Object> map, Class<T> c) throws Exception {
        T t = c.newInstance();
        //1.拆开map
        Set<Map.Entry<String, Object>> entries = map.entrySet();
        for (Map.Entry<String, Object> entry : entries) {
            String key = entry.getKey();
            //2.将map中的值存入T这个类的对象属性中
            Field f = c.getDeclaredField(key);
            f.setAccessible(true);
            f.set(t,entry.getValue());
        }
        return t;
    }
```
