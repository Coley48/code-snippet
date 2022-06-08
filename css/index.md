
## CSS

### 滚动行为

```css
body {
  scroll-behavior: auto | smooth;
}
```

### 禁用选中

```css
.user-select-none {
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
```

### 隐藏滚动条

```less
// less
.no-scrollbar {
    ::-webkit-scrollbar { /* Chrome Safari */
        display: none;
        width: 0;
    }
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
}
```

### 灰度变换

```css
html {
  filter: grayscale(1);
}
```

### 正片叠底效果

```css
.mix-background {
  mix-blend-mode: normal | multiply | hard-light | difference;
}
```

### 水平垂直居中

`FFC/GFC` 会使 `margin: auto` 在垂直方向上居中元素；`flex/grid` 格式化上下文中，设置了 `margin: auto` 的元素，在通过 `justify-content` 和 `align-self` 进行对齐之前，任何正处于空闲的空间都会分配到该方向的自动 `margin` 中去；而 `margin auto` 会自动分配水平和垂直方向上的剩余空间；

```html
<div class="g-container">
    <div class="g-box"></div>
</div>
```

```css
.g-container {
    width: 100vw;
    height: 100vh;
    
    display: flex;
    // display: grid;
    // display: inline-flex;
    // display: inline-grid;

}

.g-box {
    width: 40vmin;
    height: 40vmin;
    background: #000;
    margin: auto;
}
```

### 行内元素伪元素断行

```css
.primary::after {
    content: '\A';
    white-space: pre;
}
```

- [原文 Add a line break between inline elements](https://getfrontend.tips/add-a-line-break-between-inline-elements/)

### flex 内容弹性布局 footer 置底

通过设置 `flex-grow: 1` 让 `main` 内容弹性伸缩，使得 `footer` 始终在页面底部；

```html
<body>
    <div class="container">
        <header>...</header>
        <main>...</main>
        <footer>...</footer>
    </div>
</body>
```

```css
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header,
footer {
    flex-shrink: 0;
}

main {
    flex-grow: 1;
}
```

- [原文 Always put the footer at the bottom](https://getfrontend.tips/always-put-the-footer-at-the-bottom/)

### 通过 :is 伪类选择器组合样式

`:is` 伪类选择器为其参数中列出的选择器匹配到的所有元素应用样式：

```css
header a:hover,
nav a:hover,
footer a:hover {
    text-decoration: underline;
}

:is(header, nav, footer) a:hover {
    text-decoration: underline;
}
```

- [原文 Combine styles with the :is pseudo-class selector](https://getfrontend.tips/combine-styles-with-the-is-pseudo-class-selector/)

### 在 CSS 属性选择器中忽略大小写敏感


可以在选择器的 `]` 前面添加 `i`，使 CSS 属性选择器忽略大小写敏感；

```css
a[href$='.png' i]:after {
    content: url(/img/png.svg);
}
```

- [原文 Ignore case sensitivity in a CSS attribute selector](https://getfrontend.tips/ignore-case-sensitivity-in-a-css-attribute-selector/)

### currentColor 关键字

在父元素中定义的 `color` 属性值，可以在该元素以及子元素中通过 `currentColor` 关键字访问；

```css
div {
    color: #fff;
    background-image: linear-gradient(to bottom, currentColor, #fff);
}

div a {
    border-bottom: 1px solid currentColor;
    color: currentColor;
    text-decoration: none;
}
```

- [Reuse the current color](https://getfrontend.tips/reuse-the-current-color/)

### 填充加载失败的图片

利用 `::before` 和 `::after` 伪元素填充加载失败的图片；

```css
img {
    position: relative;
    /* The initial styles */
    display: block;
    height: auto;
    min-height: 4rem;
    width: 100%;
}

img::before,
img::after {
    /* Take full size of the image */
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

img::before {
    /* Hide the default placeholder */
    background: #fff;
    content: '';
}

img::after {
    /* Taken from the `alt` attribute of the element */
    content: attr(alt) ' image is broken';
    border: 2px dotted #d1d5db;

    /* Center */
    display: flex;
    align-items: center;
    justify-content: center;
}
```

- [Style broken images](https://getfrontend.tips/style-broken-images/)

### 文本省略


```css
/* 单行省略 */
.single-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 多行省略 */
.multiple-truncate {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
```

- [-webkit-line-clamp MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-line-clamp)
- [Truncate long text](https://getfrontend.tips/truncate-long-text/)