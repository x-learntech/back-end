# Java 异常

## 一. 什么是异常

**异常机制：**

​ 异常机制是指当程序出现错误后，程序如何处理。具体来说，异常机制提供了程序退出的安全通道。当出现错误后，程序执行的流程发生改变，程序的控制权转移到异常处理器。

通俗地说：为了让程序继续执行下去，而不至于中断。

**程序错误：**

​ 程序错误分为三种：1.编译错误；2.运行时错误；3.逻辑错误。

- （1）编译错误：是因为程序没有遵循语法规则，编译程序能够自己发现并且提示我们错误的原因和位置。
- （2）运行时错误：是因为程序在执行时，运行环境发现了不能执行的操作。
- （3）逻辑错误：是因为程序没有按照预期的逻辑顺序执行。

异常也就是指程序运行时发生错误，而异常处理就是对这些错误进行处理和控制。

**虚拟机对异常的两种处理方式**：

1. 捕获异常

2. 抛出异常

### 1.1.异常结构

![2330-wps1](https://cdn-static.learntech.cn:88/notes/20211005/2330-wps1.jpg!min)

### 1.2.异常收集

| 序号 | 异常名称                                 | 异常描述                                     |
| ---- | ---------------------------------------- | -------------------------------------------- |
| 1    | java.lang.NullPointerException           | 空指针异常:对象为空，并且调用相应方法。      |
| 2    | java.lang.ClassNotFoundException         | 找不到指定类，常出现在反射中                 |
| 3    | java.lang.ArrayIndexOutOfBoundsException | 数组下标越界                                 |
| 4    | java.lang.NumberFormatException:         | 数字格式化异常                               |
| 5    | java.lang.ArithmeticException:           | 数学运算异常                                 |
| 6    | java.lang.StackOverflowError             | 内存空间溢出错误，方法递归调用中，经常发生   |
| 7    | java.lang.ClassCastException             | 类型转换异常，向下转型中经常发生             |
| 8    | java.text.ParseException                 | 时间格式化异常，SimpleDateFormart 中经常发生 |
| 9    | java.util.InputMismatchException         | 输入类型不匹配异常                           |

## 二.捕获异常

### 1.try-catch

```powershell
try：尝试着执行可能会出现异常的代码
catch:如果try中的代码在执行过程中，出现了异常，捕获该异常，如果没有异常，就不执行。
```

- 引入案例

```powershell
使用Scanner录入5名学员的成绩，当输入第2名学员的成绩时，输入的不是数字，此时会出现异常，使用try-catch捕获该异常，并在catch中输出提示信息，从而不让程序中断，可以继续录入后续学员成绩。
```

- 单个 try-catch

```java
try{

}catch(){

}
```

- 多个 catch

```java
try{

}catch(){

}catch(){

}
//多个catch在捕获异常时，子类异常catch块在前面，父类异常catch块在后面
```

### 2.try-catch-finally

```java
try{

}catch(){

}finally{
    //通常用来释放资源
}
```

break,return,System.exit(1)语句在异常处理中的作用

### 3.深入认识异常

- java 中的小括号中可以写什么

```java
1.判断条件 if() while()
2.形参列表 方法声明时
3.传递实参 方法调用时
4.异常捕获声明 catch(异常类 e)
5.强制类型转换或向下转型
```

- 在出现异常时，谁给 e 实例化的呢？

```powershell
思考：
如果让你来设计java，程序出错了之后，如何让程序员知晓呢，有效的表述方式是什么呢？

java的异常机制：
1.建立大量的用于表述某种异常的类，组成一个以Throwable为首的异常家族。
2.当程序执行出现异常时，立即创建相应异常类的对象。
3.使用catch(异常类型 e)捕获创建的异常对象。
```

## 三.声明和抛出异常

### 1.使用 throws 声明异常

​ 运用于方法声明之上，用于表示当前方法不处理异常，而是提醒该方法的调用者来处理异常

```java
public void fun1() throws ParseException {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date date = format.parse("2020-10-12");
}
```

### 2.使用 throw 抛出异常

​ throw 用在方法内，用来抛出一个异常对象，将这个异常对象传递到调用者处，并**结束当前方法**的执行。

```java
public void fun2() {
     throw new NullPointerException("空指针异常");
     System.out.println("hello world");//会报红，提示unreachable statement,该语句不可能被执行
}
```

- 扩展 1--嵌套 try-catch

```java
@Test
public void fun2()  {
    try {
        throw new Exception("非运行时异常，哈哈哈");
    } catch (Exception e) {
        e.printStackTrace();
        try {
            throw new ParseException("解析异常，哈哈哈",0);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }finally {
        try {
            throw new TimeoutException("超时异常，哈哈哈");
        } catch (TimeoutException e) {
            e.printStackTrace();
            try {
                throw new SQLException("SQL异常");
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }
}
```

- 扩展 2--代替返回语句

```java
public int  funR1(){
        try {
            return 1;
        }catch (Exception e){
           throw new RuntimeException();
        }
    }
public int  funR2(){
    if(true) {
        return 1;
    }else{
        throw new RuntimeException();
    }
}
```

## 四.自定义异常

​ JDK 中定义了大量的异常类，可以描述编程时出现的大部分异常情况,但对于一些特殊情景下的异常，我们可以自己去定义。

**创建步骤：**

- 创建一个异常类
- 加入异常家族中（继承某个异常父类）

```java
public class HeroNotExistException extends RuntimeException {
   private String m;

   public String getM() {
       return m;
   }

   public void setM(String m) {
       this.m = m;
   }
//两个参数的有参构造，一个传递给父类Throwable,一个自己用
   public HeroNotExistException(String message, String m){
      super(message);
      this.m=m;
   }

   public static void main(String[] args) {
       Scanner sc=new Scanner(System.in);
       System.out.println("请输入您最欣赏的历史人物：");
       String name = sc.next();
       if(name.equals("孙悟空")){
           try{
               throw new HeroNotExistException("英雄人物不存在","哈哈");
           }catch (HeroNotExistException e){
               e.printStackTrace();
               System.out.println(e.getM());
           }
       }
   }

}
```

## 总结

```powershell
1、java中异常分为两大类：
   checked exception (非运行时异常)
   unchecked exception (运行时异常)

2、java中所有的异常类都会直接或间接地继承自Exception。

3、RuntimeException类也是直接继承Exception类，它叫运行时异常，换句话说：java中所有的运行时异常都会直接或间接继承自RuntimeException。

4、java中凡是继承自Exception而不是继承自RuntimeException的类都是非运行时异常。对于非运行时异常，必须要对其进行处理，处理方式有两种：
   使用try...catch捕获处理
   在所在方法声明 throws Exception

5、对于运行时异常，我们可以不对其处理，推荐不对其处理

6、空指针异常，出现该异常时原因市在于某个引用为null，但是还使用它调用方法。

7、自定义异常，通常就是定义了一个继承自Exception类的子类，那么这个类就是一个自定义异常类。通常情况下，我们都会直接继承自Exception，一般不会继承某个运行时异常类。

8、我们可以使用多个catch块来捕获异常，这时需要将父类型catch块放到子类型catch之后，这样才能保证后续的catch可能被执行，否则子类型的catch将永远无法到达，java编译器会编译报错。

11、如果try块中存在return语句，那么首先也需要将finally块中的代码执行完毕，然后方法再返回。

12、如果try块中存在System.exit(0)，会终止当前运行的java虚拟机，程序会强制性结束执行。
```
