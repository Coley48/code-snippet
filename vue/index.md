## Vue

### 动态缓存

```html
<!-- app.vue -->
<keep-alive :include="$store.state.keepAlivePages">
  <router-view />
</keep-alive>
```

```js
// router.js
// 页面缓存列表，路由 name 需要与页面组件名一致，才能应用缓存；
const keepAlivePages = Array.from(routes.filter((route: RouteConfig) => {
  return route.meta && route.meta.keepAlive;
}), (route) => route.name)
```

[Vue keep-alive api](https://cn.vuejs.org/v2/api/#keep-alive)

### 组件二次封装

```vue
<template>
  <div class="my-input">
    <el-input v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-input>
  </div>
</template>
```