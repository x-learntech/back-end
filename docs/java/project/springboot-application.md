# springboot 配置文件 application

application 配置文件有 properties 和 yml 两种格式，目前主流都推荐走 yml 方式，那就走 yml 方式吧。

当前 spring-boot 版本：2.5.5。

注意点：

- 冒号后面需要带一个空格
- 换行缩进表示层级关系

## 环境配置

```yml
spring:
  profiles:
    # application-{env}.yaml
    active: dev # 激活当前的配置文件 =》 application-dev.yml
```

```bash
#命令行激活
java -jar xxx.jar --spring.profiles.active=prod
```

以上等效于

```yml
spring.profiles.active = dev
```

可以通过注解 @Component + @ConfigurationProperties 配置前缀的方式，获取对应的配制信息

```java
@Component
@ConfigurationProperties(prefix="person")
```

- 修改配置文件的任意值，命令行优先
- 默认配置与环境配置同时生效
- 同名配置项，profile 配置优先

1、外部配置源

常用：Java 属性文件、YAML 文件、环境变量、命令行参数；

2、配置文件查找位置

- (1) classpath 根路径
- (2) classpath 根路径下 config 目录
- (3) jar 包当前目录
- (4) jar 包当前目录的 config 目录
- (5) /config 子目录的直接子目录

3、配置文件加载顺序：

1. 当前 jar 包内部的 application.properties 和 application.yml
2. 当前 jar 包内部的 `application-{profile}.properties` 和 `application-{profile}.yml`
3. 引用的外部 jar 包的 application.properties 和 application.yml
4. 引用的外部 jar 包的 `application-{profile}.properties` 和 `application-{profile}.yml`

4、指定环境优先，外部优先，后面的可以覆盖前面的同名配置项

## 静态资源

根据语义化，在 resources 目录下有一个 static 文件夹，可以将静态资源放到其中，浏览器可以直接访问。

从 mvc 源码中可以得知静态资源其他存放文件夹，按照顺序匹配（若有匹配则不会继续查找）：

- "classpath:/META-INF/resources/"
- "classpath:/resources/"
- "classpath:/static/"
- "classpath:/public/"

若需要自定义静态文件夹则需要配置 application.yml

```yml
spring:
  web:
    resources:
      static-locations: classpath:/cdn/
```
