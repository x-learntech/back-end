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
