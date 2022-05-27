
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
  if (typeof fn !== "function") return;
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
    } else {
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

### 下划线命名转驼峰命名

```ts
const camelize = (str: string): string => {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
}
```

### 数组去重

使用对象键值唯一的特点存储数组元素，最后将所有键名取出，实现数组去重；

```js
function uniqueArr(arr) {
    let set = {};
    for(let i in arr) {
        set[i] = i;
    }
    return Object.keys(set);
}
```

巧妙使用数组 reduce 方法和逗号表达式，可以得到更简洁的代码实现；

```js
let obj = arr.reduce((last, item) => (last[item] = item, last), {})
Object.keys(set);
```

### 交换变量值

在不使用额外变量的情况下，可以使用解构赋值语法、异或运算实现，数字还可使用加减运算交换；

```js
// 解构赋值
[foo, bar] = [bar, foo];

// 异或运算
a ^= b;
b ^= a;
a ^= b;

// 加减运算
a += b;
b = a - b;
a -= b;
```

### 一行代码

```js
// 获取随机布尔值
const getRandomBoolean = () => Math.random() >= 0.5;

// 判断是否是周末
const isWeekend = (date) => [0, 6].indexOf(date.getDay()) !== -1;

// 数组去重
const uniqueArr = (arr) => [...new Set(arr)];

// 随机字符串
const randomString = () => Math.random().toString(36).slice(2);

// 计算日期间相差天数
const daysDiff = (date, date2) => Math.ceil(Math.abs(date - date2) / 86400000);

// 复制文本到粘贴板
const copyTextToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
};

// 获取实际原始值类型
const trueTypeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

// 尾部截取显示省略号
const truncateString = (string, length) => {
  // return string.length < length ? string : `${string.slice(0, length - 3)}...`;
  return string.replace(new RegExp(`(.{${length - 3}}).*`), "$1...");
};

// 判断当前页面是否聚焦
const isTabInView = () => !document.hidden;  // Not hidden

// 判断是否是苹果设备
const isAppleDevice = () => /Mac|iPod|iPhone|iPad/.test(navigator.platform);
```

- [20 JavaScript One-Liners That Will Help You Code Like a Pro](https://dev.to/ovi/20-javascript-one-liners-that-will-help-you-code-like-a-pro-4ddc)

### canvas 下载为图片

```js
function screenShot(canvas) {
    let shot = canvas.toDataURL("image/png");
    downloadFile(new Date().getTime().toString(), shot);
}

function base64ToBlob(code) {
    let parts = code.split(";base64,");
    let type = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type });
}

function downloadFile(fileName, content) {
    let link = document.createElement("a");
    let blob = base64ToBlob(content);
    link.dispatchEvent(new MouseEvent("click"))
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click();
}
```

### 强制给定必须的参数

在 ES6 中，默认参数值在参数缺省时被计算。这让我们可以强制给定某个必须的参数：

```js
const required = () => {
    throw new Error('Missing parameter');
};

const getAges = (yearOfBirth = required()) => new Date().getFullYear() - yearOfBirth;
```

不带参数调用 `getAges()` 函数会抛出 `Missing parameter` 异常。

- [原文 Enforce required parameters](https://getfrontend.tips/enforce-required-parameters/)

### 格式化列表

我们可以利用 `Intl.ListFormat` 对象去用给定的区域格式化一个列表：

```js
const people = ['Foo', 'Bar', 'Fuzz'];

new Intl.ListFormat('en', { type: 'conjunction' }).format(people);
// 'Foo, Bar, and Fuzz'

new Intl.ListFormat('en-GB', { type: 'disjunction' }).format(people);
// 'Foo, Bar, or Fuzz'
```

- [原文 Format a list](https://getfrontend.tips/format-a-list/)

### 将一个数字格式化为货币字符串

给定一个数字，我们能将它格式化为一个货币字符串而不使用其他外部库。`NumberFormat` API 提供了一种简单的方式去格式化一个指定国家的货币：

```js
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // 人民币：CNY
    minimumFractionDigits: 2,
});
```

可选的 `minimumFractionDigits` 参数指示最小位数在小数部分。调用 `format` 方法将格式化输入，然后会根据国家为货币添加前缀或后缀。

```js
formatter.format(2345); // '$2,345.00'
formatter.format('2345'); // '$2,345.00'
formatter.format('10000000'); // '$10,000,000.00'
```

- [原文 Format a number as a currency string](https://getfrontend.tips/format-a-number-as-a-currency-string/)
- [MDN Intl.NumberFormat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

### 获取当前时间戳

```js
new Date().getTime();
Date.now();

// These method are the same
// The unary operator (`+`) calls the `valueOf` method automatically
+new Date();
new Date().valueOf();
```