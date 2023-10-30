# SQL 基础语句

> 正常情况下，我们对业务的操作基本都是在CURD这个范畴，也就是新增、更新、查询、删除。然后就是结合业务需求围绕这些功能展开作业。

PS：暂定默认表名称为 t_table，且已连接好数据库。

## 查询

- 查询表所有数据
  
```sql
-- `*` 泛指所有
select * from t_table;

-- 查询表中所有的name值
select name from t_table;
```
