# code-snippet
Some useful code snippets.

### JS RegExp

**隐藏电话号码**

```js
let str = "12345678910";
str.replace(/(\d{3}).*(\d{4})/, "$1****$2");
```

**批量替换**

```js
function newDecode(url) {
    let origin = url.split(/%2F/).pop(); // 分割
    let param = decodeURIComponent(origin); // 解码

    let replacement = {
      "%25" :"%",
      "%3F" :"?",
      "%24" :"$",
      "%2F" :"/",
      "%22" :"\"",
      "%2C" :",",
    }
    let reg = new RegExp(Object.keys(replacement).join("|"), "g");
    let result = param.replace(reg, ($0) => replacement[$0]); // 替换

    return result;
}
```