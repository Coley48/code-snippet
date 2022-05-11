
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

FFC/GFC 会使 margin: auto 在垂直方向上居中元素；flex/grid 格式化上下文中，设置了 margin: auto 的元素，在通过 justify-content 和 align-self 进行对齐之前，任何正处于空闲的空间都会分配到该方向的自动 margin 中去；而 margin auto 会自动分配水平和垂直方向上的剩余空间；

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