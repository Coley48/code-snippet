
## JS

### 隐藏电话号码

```js
let str = "12345678910";
str.replace(/(\d{3}).*(\d{4})/, "$1### **$2"); // '123**8910'
```

### 批量替换

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

### Promise包装器

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

### 获取 url 查询参数

```ts
function getSearchParams(key: string): string {
    const searchString = window.location.search || window.location.href.split("?")[1];
    const searchParams = new URLSearchParams(searchString);
    return searchParams.get(key) || ""
}
```

### 判断是否原生支持的方法

```js
function isNative (Ctor) {
    return typeof Ctor === "function" && /native code/.test(Ctor.toString());
},
```

### 封装 axios

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
