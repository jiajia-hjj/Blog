## 一、BOM的概念

+ 浏览器对象模型，浏览器对象模型提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。
+ BOM由多个对象组成，其中代表浏览器窗口的Window对象是BOM的顶层对象，其他对象都是该对象的子对象。

我们在浏览器中的一些操作都可以使用BOM的方式进行编程处理，

比如：刷新浏览器、后退、前进、在浏览器中输入URL等

## 二、BOM的顶级对象window

+ window是浏览器的顶级对象，当调用window下的属性和方法时，可以省略window
  注意：window下一个特殊的属性 window.name

## 三、对话框

- alert()
- prompt()
- confirm()

## 四、页面加载事件

- onload

```javascript
window.onload = function () {
  // 当页面加载完成执行
  // 当页面完全加载所有内容（包括图像、脚本文件、CSS 文件等）执行
}
```

- onunload

```javascript
window.onunload = function () {
  // 当用户退出页面时执行
}
```

## 五、定时器

**setTimeout()和clearTimeout()**

+ 在指定的毫秒数到达之后执行指定的函数，只执行一次

```javascript
// 创建一个定时器，1000毫秒后执行，返回定时器的标示
var timerId = setTimeout(function () {
  console.log('Hello World');
}, 1000);

// 取消定时器的执行
clearTimeout(timerId);
```

**setInterval()和clearInterval()**

+ 定时调用的函数，可以按照给定的时间(单位毫秒)周期调用函数

```javascript
// 创建一个定时器，每隔1秒调用一次
var timerId = setInterval(function () {
  var date = new Date();
  console.log(date.toLocaleTimeString());
}, 1000);

// 取消定时器的执行
clearInterval(timerId);
```

## 六、location对象

+ location对象是window对象下的一个属性，时候的时候可以省略window对象

+ location可以获取或者设置浏览器地址栏的URL

**URL**：统一资源定位符 

- URL的组成

```
scheme://host:port/path/filename?query#fragment
协议：//域名:端口号/服务器上的路径/文档的名称?参数#锚
```

+ 主机= 域名+端口号

**location有哪些成员？**

- 使用chrome的控制台查看

- 查[MDN](https://developer.mozilla.org/zh-CN/)

- 属性：
  + href->当前地址，跳转页面
  + protocol->协议，
  + host->主机，主机= 域名+端口号
  + hostname->主机的域名
  + port->端口号，
  + search->参数，
  + hash->锚点，
  + location.assign->加载新文档

**案例**

解析URL中的query，并返回对象的形式

```javascript
function getQuery(queryStr) {
  var query = {};
  if (queryStr.indexOf('?') > -1) {
    var index = queryStr.indexOf('?');
    queryStr = queryStr.substr(index + 1);
    var array = queryStr.split('&');
    for (var i = 0; i < array.length; i++) {
      var tmpArr = array[i].split('=');
      if (tmpArr.length === 2) {
        query[tmpArr[0]] = tmpArr[1];
      }
    }
  }
  return query;
}
//https://mp.weixin.qq.com/wxamp/index/index?lang=zh_CN&token=1971504964
console.log(location.search);//?lang=zh_CN&token=1971504964
console.log(location.href);//https://mp.weixin.qq.com/wxamp/index/index?lang=zh_CN&token=1971504964
console.log(getQuery(location.search));//{lang: "zh_CN", token: "1971504964"}
console.log(getQuery(location.href));//{lang: "zh_CN", token: "1971504964"}
```

## 七、history对象

路径变页面也变，页面刷新

- back() 前一个 URL。
- forward() 下一个 URL
- go() 某个具体页面

路径会变，但是页面不会变，页面不刷新

```js
history.pushState({},'','home') 
history.replaceState({},'','home') 
```

```js
//当前：http://localhost:8080/#/
//pushState   history.pushState(对象，title,url) 
history.pushState({},'','home')   //http://localhost:8080/home
history.pushState({},'','about')   //http://localhost:8080/about
history.pushState({},'','me')   //http://localhost:8080/me  栈顶
history.bock()  http://localhost:8080/about#/
history.bock()  http://localhost:8080/home#/
//replaceState 
history.replaceState(对象，title,url)
 http://localhost:8080/#/
history.replaceState({},'','home')    http://localhost:8080/home
history.replaceState({},'','about')    http://localhost:8080/about
history.bock()  替换，不能返回
//go
history.pushState({},'','home')  // http://localhost:8080/home
history.pushState({},'','about') //http://localhost:8080/about
history.pushState({},'','me')   //http://localhost:8080/me 
history.pushState({},'','demo') //http://localhost:8080/demo
history.pushState({},'','test') //http://localhost:8080/test 
history.go(-1) ==history.back() //http://localhost:8080/demo#/
history.go(-2)   http://localhost:8080/about#/
history.go(2)   http://localhost:8080/demo#/
history.forward(1)==hiatory.go(1)   http://localhost:8080/test#/
```

## 八、navigator对象

常用来判断设备

- userAgent：通过userAgent可以判断用户浏览器的类型
- platform：通过platform可以判断浏览器所在的系统平台类型.