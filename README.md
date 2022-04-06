# code-snippet
Some useful code snippets.

### JS

**隐藏电话号码**

```js
let str = "12345678910";
str.replace(/(\d{3}).*(\d{4})/, "$1****$2"); // '123****8910'
```

**批量替换**

```js
function newDecode(param) {
    let replacement = {
      "%25" :"%",
      "%3F" :"?",
      "%24" :"$",
      "%2F" :"/",
      "%22" :"\"",
      "%2C" :",",
    }
    let reg = new RegExp(Object.keys(replacement).join("|"), "g");
    let result = param.replace(reg, ($0) => replacement[$0]);

    return result;
}
```

**Promise包装器**

```js
function toPromise(fn, ...params) {
  return new Promise((resolve, reject) => {
    let next = (mark) => {
      if (mark === false || mark instanceof Error) {
        reject(mark);
      } else {
        resolve(true);
      }
    };
    if (fn) {
      fn(next, ...params);
    }
    else {
      next()
    }
  });
}
```

**获取 url 查询参数**

```ts
function getSearchParams(key: string): string {
    const searchString = window.location.search || window.location.href.split("?")[1];
    const searchParams = new URLSearchParams(searchString);
    return searchParams.get(key) || ""
}
```

**判断是否原生支持的方法**

```js
function isNative (Ctor) {
    return typeof Ctor === "function" && /native code/.test(Ctor.toString());
},
```

**判断是否微信环境**

```ts
// 是否微信环境
function isWeChat(): boolean {
    return /MicroMessenger/i.test(window.navigator.userAgent);
}
```

**公众号获取用户 openid**

```ts
// redirect 地址是在公众平台配置的网页授权域名 
function getUserOpenId(redirect, callback = (res: string): void => { res }): void {
    const code = getSearchParams('code');
    if (code) {
        callback(code);
    } else {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${encodeURIComponent(redirect)}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`
    }
}
```

[JS-SDK说明文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

**网页调用微信 api 配置**

```ts
// url 为当前页面地址，要与计算签名的地址一致
function configWechatAPI(url: string): Promise<any> {
    return axios.post("/backend/api", { url }).then((res: any) => {
        const data = res.data.data;
        wx.config({
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp , // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名
            jsApiList: ["updateAppMessageShareData", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        });
        return res;
    })
}
```

**封装 axios**

```ts
const gAxios = Vue.axios.create({
    baseURL,
});

export function httpPost(url: string, data?: any, config?: AxiosRequestConfig) {
    return gAxios.post(url, data, config);
}
export function httpGet(url: string, params?: any, config?: AxiosRequestConfig) {
    if (params) {
        const searchString = new URLSearchParams(Object.entries(params)).toString();
        return gAxios.get(url + '?' + searchString, config);
    }
    return gAxios.get(url, config);
}

// 请求拦截器
gAxios.interceptors.request.use(function (config: AxiosRequestConfig) {
    // 请求之前
    return config;
}, function (error: AxiosError) {
    // 请求错误
    return Promise.reject(error);
});

// 响应拦截器
gAxios.interceptors.response.use(function (response: AxiosResponse) {
    // 响应数据
    return response;
}, function (error: AxiosError) {
    // 响应错误
    return Promise.reject(error);
});
```

[axios 文档](https://www.kancloud.cn/yunye/axios/234845)


**Webpack 自定义插件**

```js
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Hello World Plugin', (stats) => {
        console.log('Hello World!');
      }
    );
  }
}
```


### CSS

**滚动行为**

```css
body {
  scroll-behavior: auto | smooth;
}
```

**禁用选中**

```css
.user-select-none {
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
```

**隐藏滚动条**

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

**灰度变换**

```css
html {
  filter: grayscale(1);
}
```

**正片叠底**

```css
.mix-background {
  mix-blend-mode: normal | multiply | hard-light | difference;
}
```

### HTML

**内容折叠**

```html
<details>
    <summary>Details</summary>
    Something small enough to escape casual notice.
</details>
```

### Vue

**动态缓存**

```html
// app.vue
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