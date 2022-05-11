## WeChat

### 判断是否微信环境

```ts
// 是否微信环境
function isWeChat(): boolean {
    return /MicroMessenger/i.test(window.navigator.userAgent);
}
```

### 公众号获取用户 openid

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

### 网页调用微信 api 配置

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