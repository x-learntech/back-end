# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

- 样式和布局：<https://docusaurus.io/zh-CN/docs/styling-layout>

## 快速开始

```bash
# 本地运行
pnpm start

# 项目编译
pnpm build
```

## 代码演示

```jsx live
function Clock(props) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div>
      <h2>现在是 {date.toLocaleTimeString()}。</h2>
    </div>
  );
}
```

## 代码扩展

```bash npm2yarn
npm install @docusaurus/remark-plugin-npm2yarn
```

## 文档配置

[Configuration](https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-content-docs)

```xml
---
id: doc-markdown
title: 文档 Markdown 特性
hide_title: false
hide_table_of_contents: false
sidebar_label: Markdown
sidebar_position: 3
pagination_label: Markdown 特性
custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: 我解决不了这个问题时在哪里找到你
keywords:
  - docs
  - docusaurus
image: https://i.imgur.com/mErPwqL.png
slug: /myDoc
last_update:
  date: 1/1/2000
  author: 自定义作者名
---
```
