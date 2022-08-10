---
title: 重写Page方法
tags:
  - 微信小程序公众号
categories:
  - 微信小程序公众号
---



> 业务场景，1)每个页面都需要加统计。2）统一处理扫小程序二维码，获取小程序二维码参数，及获取点击链接进来的参数。

## 一、阿拉丁统计核心

+  小程序就接入了阿拉丁统计，阿拉丁的接入方式除了配置以外，主要就一行引入代码。官方要求将以下代码写在app.js第一行代码。

```js
const ald = require('./utils/ald-stat.js')
```
+  一行代码，就可以统计到页面的访问量，分享量 。核心代码是通过重写Page方法实现的。 

## 二、怎么重写Page

```js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  }
  /**
   *  其他生命周期 省略...
   */
})
```

+ Page实际上是一个全局的方法，参数是一个对象，该对象有一些data和其他的生命周期。

+ 我们如果要重写Page方法，一定要在小程序初始化最早的时期重新赋值Page方法为我们自己方法，且要将原来的Page方法保存以备未来调用。 

```js
(function(){
    // 小程序原来的Page方法
    let originalPage = Page;
    // 我们自定义的Page方法
    Page = (config) => {
        // todo 在这里我们可以给配置对象进行加工
        // 将配置对象继续想下传递给小程序原来的Page方法
        originalPage (config);
    }
})();
```

  将以上代码放到app.js顶部，即可实现了对Page对象的重写。

## 三、Page对象重写的好处

  1） 可以实现全局页面的生命周期的监控和处理(埋点、分享统计、全局分享设置)

  2） 可以实现为所有的配置对象，增加函数和属性，来实现更好的封装。结果类似调用Vue的Vue.prototype。

  3） 可以统一处理扫小程序二维码，获取小程序二维码参数的逻辑 

## **四、具体业务场景**例子

再举两个实际的业务场景例子

  1）实现一个ajax方法，挂载到所有的配置对象上，所有的页面调用this.ajax即可以请求接口

  2)  拦截所有的小程序分享，如果页面有设置分享信息，就用页面的分享信息，如果没有分享信息的话，就用全局统一的分享信息；且所有的链接后面追加分享人ID

  以下是实现代码，注意：需要将代码放到app.js顶部

```js
(function(){
  // 小程序原来的Page方法
  let originalPage = Page;
  // 我们自定义的Page方法
  Page = (config) => {
    // 页面里可以通过this.ajax调用请求接口的方法
    config.ajax = function(){
      // 写wx.request的相关代码
    }
    // 默认分享信息
    let defaultShareInfo = {
      path: appendInviteId('/pages/index/index'),
      title: '全局设置的分享标题'
    }
    // 追加邀请人Id 参数: path(页面路径)
    function appendInviteId(path){
      // 分享人Id写成静态的 实际可能要读取缓存
      let inviteId = '9998877';
      // 路径是否包含inviteId 包含就返回路径
      if(path.includes('inviteId')){
        return path;
      // 路径不包含inviteId 则追加
      } else {
        return path.includes('?') ? `${path}&inviteId=${inviteId}` : `${path}?inviteId=${inviteId}`;
      }
    }
    // 重写onShareAppMessage方法
    let originalShareMethod = config.onShareAppMessage;
    config.onShareAppMessage = function(e) {
      // 配置对象有onShareAppMessage方法
      if( originalShareMethod ){
        // 配置对象实际返回的分享信息
        let returnVal =  originalShareMethod.call(this, e)
        // 如果有返回信息
        if(returnVal) {
          // 页面的分享信息没有邀请人id 则追加
          returnVal.path  = appendInviteId(returnVal.path)
          return returnVal
        // 如果页面对象没有返回信息
        } else {
          return defaultShareInfo
        }
      // 配置对象没有onShareAppMessage方法 直接返回默认的分享信息
      } else {
        return defaultShareInfo
      }
    }
    // 将配置对象继续想下传递给小程序原来的Page方法
    originalPage (config)
  }
})();
```





> 转自：
>
> [微信小程序如何重写Page方法？以及重写Page方法给开发者带来的好处](https://blog.csdn.net/weixin_42232156/article/details/121631099)