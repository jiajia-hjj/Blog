---
title: md5数据加密
tags:
  - 浏览器
categories:
  - 浏览器
---



## md5数据加密

app.js文件中引入加密文件md5.js

```
import { hexMD5 } from "./md5.js"
```

### 1、签名规则

1）参数名根据ASCII码从小到大排序；
2）参数名区分大小写；
3）sign参数不参与签名；
4）生成url-encode的请求字符串（例如：code=1&msg=url_encode('成功')），加上md5key值，以及Token，然后进行MD5操作
5）md5key协商约定

### 2、对数据进行加密，生成签名。

```js
//生成签名
createSign(data){
  const Token=this.globalData.loginfo.token||wx.getStorageSync('token')||'';
  const o = util.urlEncode(util.sortASCII(data)).slice(1) + APP_KEY + Token;
  const sign = hexMD5(o);
  return sign
}
```

### 3、request请求

```js
import {BASE_URL} from './utils/const.js'; 
// 发起 HTTPS 网络请求
export const md5Request=(method,url,data)=> {
  const token = getApp().globalData.loginfo.token||wx.getStorageSync('token') || "";
  const sign=getApp().createSign(data);
  return new Promise((resolve,reject)=>{
     wx.request({
      url: BASE_URL + url,
      data: data||{},
      method: method ? method : "GET",
      header: {
        'content-type': method == "GET" ? 'application/json' : 'application/x-www-form-urlencoded',
        'token': token,
        'sign':sign
      },
      success(res){
        resolve(res.data)
      },
      fail(res) {
        reject(res.data);
      }
    })
  })
 
}
```

 
