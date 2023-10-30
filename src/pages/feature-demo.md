---
title: Test
description: Using the power of React in Docusaurus Markdown documents, thanks to MDX
slug: /markdown-features
---

# 测试

```mdx-code-block
import BrowserWindow from '@site/src/components/BrowserWindow';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```jsx title="src/pages/index.js"
import React from 'react';
import FeatureDisplay from './_featureDisplay.mdx';
// highlight-next-line
import MDXContent from '@theme/MDXContent';

export default function LandingPage() {
  return (
    <div>
      {/* highlight-start */}
      <MDXContent>
        <FeatureDisplay />
      </MDXContent>
      {/* highlight-end */}
    </div>
  );
}
```

## 实时编辑

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

```bash npm2yarn
npm install --save @docusaurus/theme-live-codeblock
```

```js title="docusaurus.config.js"
export default {
  plugins: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    liveCodeBlock: {
      /**
       * The position of the live playground, above or under the editor
       * Possible values: "top" | "bottom"
       */
      playgroundPosition: 'bottom',
    },
  },
};
```

## 模块渲染

```mdx-code-block
import HomepageFeatures from '@site/src/components/HomepageFeatures';

<HomepageFeatures />
```

## 多Tab模式

```mdx-code-block
<Tabs>
<TabItem value="Current version structure">
```

```bash
# The new file.
docs/new.md

# Edit the corresponding sidebar file.
sidebars.js
```

```mdx-code-block
</TabItem>
<TabItem value="Older version structure">
```

```bash
# The new file.
versioned_docs/version-1.0.0/new.md

# Edit the corresponding sidebar file.
versioned_sidebars/version-1.0.0-sidebars.json
```

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

<BrowserWindow minHeight={240}>

<><Highlight color="#25c2a0">Docusaurus green</Highlight> and <Highlight color="#1877F2">Facebook blue</Highlight> are my favorite colors.</>

I can write **Markdown** alongside my _JSX_!

</BrowserWindow>
```

````diff
- ```jsx {3}
+ ```jsx {4}
  function HighlightSomeText(highlight) {
    if (highlight) {
+     console.log('Highlighted text found');
      return 'This text is highlighted!';
    }

    return 'Nothing highlighted';
  }
  ```
````

## mdx引用

```mdx-code-block
import PartialExample from './mdx/_markdown-partial-example.mdx';

<BrowserWindow>
  <PartialExample name="大前端" />
</BrowserWindow>
```

## 告示

:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::caution

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
