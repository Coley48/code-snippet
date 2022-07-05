
## JS

### 封装
#### Promise 包装器

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
    if (typeof fn === "function") {
      fn(next, ...params);
    } else {
      next()
    }
  });
}
```

#### 封装 axios

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

<!-- ==================================================================================== -->
### 格式化
#### 强制给定必须的参数

在 ES6 中，默认参数值在参数缺省时被计算。这让我们可以强制给定某个必须的参数：

```js
const required = () => {
    throw new Error('Missing parameter');
};

const getAges = (yearOfBirth = required()) => new Date().getFullYear() - yearOfBirth;
```

不带参数调用 `getAges()` 函数会抛出 `Missing parameter` 异常。

- [原文 Enforce required parameters](https://getfrontend.tips/enforce-required-parameters/)

#### 格式化列表

我们可以利用 `Intl.ListFormat` 对象去用给定的区域格式化一个列表：

```js
const people = ['Foo', 'Bar', 'Fuzz'];

new Intl.ListFormat('en', { type: 'conjunction' }).format(people);
// 'Foo, Bar, and Fuzz'

new Intl.ListFormat('en-GB', { type: 'disjunction' }).format(people);
// 'Foo, Bar, or Fuzz'
```

- [原文 Format a list](https://getfrontend.tips/format-a-list/)

#### 将一个数字格式化为货币字符串

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

<!-- ==================================================================================== -->
### 数组操作
#### 数组去重

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

最简单的方式就是利用 Set 自带的特性去重，然后转换为数组；

```js
let uniqueArr = [...new Set(arr)]
```

#### 获取数组等级

```js
const ranking = (arr) => arr.map((item, index, array) => Array.filter((value) => value > item).length + 1);
```

#### 获取数组中最大的数

```js
// ... 在不同浏览器中对数组大小有不同限制
Math.max(...array);

const getMaximum = (arr) => arr.reduce((a, b) => Math.max(a, b));
```

- [Pass an array as function arguments](https://getfrontend.tips/pass-an-array-as-function-arguments/)

#### 获取数组中首尾元素

```js
const { length, 0: first, [length - 1]: last } = arr;
```

- [Pick the first and last items of an array](https://getfrontend.tips/pick-the-first-and-last-items-of-an-array/)

<!-- ==================================================================================== -->
### 日期操作
#### 提取日期中年月日时分秒
```js
new Date().toLocaleString().replace(/\b(\d)\b/g, "0$1").split(/\D/); // ['2022', '07', '04', '14', '32', '55']
```

#### 判断是否闰年
```js
let year = new Date().getFullYear();
(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 // false
```

#### 获取时区字符串

```js
Intl.DateTimeFormat().resolvedOptions().timeZone // 'Asia/Shanghai'
```

#### 判断是否是周末
```js
const isWeekend = (date) => [0, 6].indexOf(date.getDay()) !== -1;
```

####  计算日期间相差天数
```js
const daysDiff = (date, date2) => Math.ceil(Math.abs(date - date2) / 1000 * 60 * 60 * 24);
```

#### 获取当前时间戳

```js
new Date().getTime();
Date.now();

// The unary operator (`+`) calls the `valueOf` method automatically
+new Date();
new Date().valueOf();
```

<!-- ==================================================================================== -->
### 正则表达式
#### 隐藏电话号码

```js
let str = "12345678910";
str.replace(/(\d{3}).*(\d{4})/, "$1### **$2"); // '123**8910'
```

#### 批量替换

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
#### 判断是否原生支持的方法

```js
function isNative (Ctor) {
    return typeof Ctor === "function" && /native code/.test(Ctor.toString());
},
```
#### 下划线命名转驼峰命名

```ts
const camelize = (str: string): string => {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
}
```

#### 尾部截取显示省略号
```js
const truncateString = (string, length) => {
  // return string.length < length ? string : `${string.slice(0, length - 3)}...`;
  return string.replace(new RegExp(`(.{${length - 3}}).*`), "$1...");
};
```

####  判断是否是苹果设备

```js
const isAppleDevice = () => /Mac|iPod|iPhone|iPad/.test(navigator.platform);
```

<!-- ==================================================================================== -->
### 随机值
####  随机布尔值

```js
Math.random() >= 0.5;
```

#### 随机字符串

```js
// 字符串
Math.random().toString(36).slice(2);

// 颜色字符串
"#" + Math.random().toString(16).slice(2, 8);
```

#### 随机 IP 地址

```js
[1, 0, 0, 0].map((v) => Math.floor(Math.random() * 255) + v).join('.');
```

#### 生成 UUID

```js
const uuid = (a) => (a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/\d/g, uuid));
```

<!-- ==================================================================================== -->
### DOM
#### 判断滚动条是否在底部

```js
document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;
```

#### 判断是否 IE 浏览器

```js
!!document.documentMode;
```

#### 获取选中的文本

```js
window.getSelection().toString();
```

### 数学 Math
#### 根据两点计算直线角度

```js
Math.atan2(y2 - y1, x2 - x1); // 弧度
Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI; // 度数 
```

#### 计算两点间距离

```js
Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
```

#### 线性插值

```js
const lerp = (a, b, amount) => (1 - amount) * a + amount * b;
```

#### 最大公约数

```js
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
```

#### 十进制转二进制

```js
function decToBin(num) {
  if (num === 0) 
    return 0;
  else
    return (num % 2) + 10 * decToBin(~~(num / 2)));  
}
```

#### 浮点数取整

JavaScript 的位运算以 32 二进制执行，进行位运算时，会先将数值转换成 32 位有符号整数；

```js
// 位运算取整
52.555 | 0; // 5

// 取反取整
~~52.555; // 5
```

#### 转换为罗马数字

```js
const lookup = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
];

const convertToRoman = (number) =>
    lookup.reduce((curr, [key, value]) => {
        curr += key.repeat(Math.floor(number / value));
        number = number % value;
        return curr;
    }, '');

convertToRoman(20); // 'XX'
convertToRoman(21); // 'XXI'
convertToRoman(2021); // 'MMXXI'
```

- [Replace multiple if statements with a lookup table](https://getfrontend.tips/replace-multiple-if-statements-with-a-lookup-table/)

<!-- ==================================================================================== -->
### 其他
#### 环境判断

```js
// 判断是否运行在 Jest 环境下
typeof process !== 'undefined' && process.env.JEST_WORKER_ID !== undefined;

// 判断是否运行在 NodeJS 环境下
typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

// 判断是否运行在 浏览器 环境下
typeof window === 'object' && typeof document === 'object';

// 判断是否黑暗模式
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
```

#### 解码 JWT token

```js
const decode = (token) =>
    decodeURIComponent(
        atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );
```

#### canvas 下载为图片

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

#### 交换变量值

在不使用额外变量的情况下，可以使用解构赋值语法、异或运算实现，数字还可使用加减运算交换；

```js
// 解构赋值
[foo, bar] = [bar, foo];

// 异或运算
a ^= b;
b ^= a;
a ^= b;

// 数组
a = [b, (b = a)][0];
// 立即执行函数
a = ((x) => x)(b, (b = a));

// 加减运算
a += b;
b = a - b;
a -= b;

// 逗号表达式 
a = b + ((b = a), 0);
a = b * ((b = a), 1);
```

#### 获取 url 查询参数

```ts
function getSearchParams(key: string): string {
    const searchString = window.location.search || window.location.href.split("?")[1];
    const searchParams = new URLSearchParams(searchString);
    return searchParams.get(key) || ""
}
```

#### 复制文本到粘贴板
```js
const copyTextToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
};
```

#### 获取实际原始值类型
```js
const trueTypeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
```

#### 判断当前页面是否聚焦
```js
const isTabInView = () => !document.hidden;  // Not hidden
```