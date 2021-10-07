# 注解

## 1.1 定义

Annotation(注解)，用于为 Java 代码提供元数据。简单理解注解可以看做是一个个标签，用来标记代码。是一种应

用于类、方法、参数、变量、构造器及包的一种特殊修饰符。

## 1.2 注解的声明

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface MyAnnotation{

}
```

## 1.3 元注解

> 元注解就是注解到注解上的注解，或者说元注解是一种基本注解，它能用来注解其他注解。
> 我们可以将元注解看成一种特殊的修饰符，用来解释说明注解，它是注解的元数据。

- @Documented

被@Documented 修饰的 Annotation 类将会被 javadoc 工具提取成文档。

- @Inherited

被@Inherited 修改的 Annotation 将具有继承性，如果某个类使用了@MyAnnotation 注解(定义该 Annotation 时使

用了@Inherited 修饰)修饰，则其子类将自动被@MyAnnotation 修饰。

- @Retention

被@Retention 修改的注解，结合 RetentionPolicy.XXX 可以指定该注解存在的声明周期。

> SOURCE:仅存在 Java 源码文件，经过编译器后便丢弃
> CLASS:存在 Java 源文件，以及经过编译器后生成的 Class 字节码文件，但在运行时 JVM 中不再保留
> RUNTIME:存在源文件、变异生成的 Class 字节码文件，以及保留在运行时 JVM 中，可以通过反射读取注解信息

- @Target

表示该注解类型所使用的程序元素类型，结合 ElementType.XXX 来使用。

- @Repeatable

Java8 新增的可重复注解。

## 1.4 JDK 中常见注解

- @Override

用于告知编译器，我们需要覆写超类的当前方法。

- @Deprecated

使用这个注解，用于告知编译器，某一程序元素(比如方法，成员变量)不建议使用了(即过时了)。

- @SuppressWarnings

用于告知编译器忽略特定的警告信息，例在泛型中使用原生数据类型，编译器会发出警告，当使用该注解后，则不
会发出警告。

- @FunctionalInterface

用户告知编译器，检查这个接口，保证该接口是函数式接口，即只能包含一个抽象方法，否则就会编译出错。

## 1.5 自定义注解使用

- 格式

```java
@Documented
@Target(ElementType.METHOD)
@Inherited
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotataion{
    String name();
    int age() default 17;
    String hello() default "spring boot";
}
```

- 成员变量

> 定义:用无形参的方法形式来声明，注解方法不能带参数，比如 name(),age()
> 类型:前面可以用数据类型来修饰
> 默认值:成员变量可以有默认值，比如 default "spring boot"

- 注解使用

```java
@MyAnnotation(name="Jack",age=16)
public class Person {
}
```

- 反射获取类上的注解

```java
//1.获取需要解析注解的类
Class<Person> clazz=Person.class;
//2.判断该类上是否有注解
if(clazz.isAnnotationPresent(MyAnnotation.class)){
  //3.获取该类上的注解
  MyAnnotation myAnnotation=clazz.getAnnotation(MyAnnotation.class);
  //4.打印出注解上的内容
  System.out.println(myAnnotation.name()+":"+myAnnotation.age());
}
```
