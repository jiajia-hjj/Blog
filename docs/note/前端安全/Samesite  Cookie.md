---
title: Samesite  Cookie
tags:
  - 前端安全
categories:
  - 前端安全
---





Chrome 51 开始，浏览器的 cookie 新增加了Samesite属性，用来防止 CSRF 攻击和用户追踪。

## 一、相关概念

+ 第一方cookie：第一方 cookie 指的是由网络用户访问的域，创建的 cookie。

+ 第三方cookie：第三方 cookie 是建立在别的域名不是你访问的域名（地址栏中的网址），比如：广告网络商就是最常见的第三方 cookies 的来源，他们用它们在多个网站上追踪用户的行为，当然这些活动可以用来调整广告。此外图像JavaScript 和 firame 通常也会导致第三方cookies 的生成。

**CSRF 攻击是什么？**

+ Cookie 往往用来存储用户的身份信息，恶意网站可以设法伪造带有正确 Cookie 的 HTTP 请求，这就是
  CSRF 攻击。
+ 举例来说，用户登陆了银行网站your-bank.com，银行服务器发来了一个 Cookie。

```
Set-Cookie: id = a3fWa;
```

+ 用户后来又访问了恶意网站 malicious.com上面有一个表单。

```html
<form  action = "your-bank.com/transfer" 
method = "POST">   
    ... 
</form>
```

+ 用户一旦被诱骗发送这个表单，银行网站就会收到带有正确 Cookie 的清求。为了防止这种攻击，表单一般都带有一个随机 token，告诉服务器这是真实请求。

```html
<form action = "your-bank.com/transfer" method = "POST">    
    <input  type = "hidden" name = "token" value = "dad3weg34" >   
    ... 
</form>
```

+ 这种第三方网站引导发出的 cookie，就称为第三方cookie。它除了用于 CSRF 攻击，还可以用于用户追踪。
  比如，Facebook 在第三方网站插入一张看不见的图片。

```html
<img  src = "facebook.com" style = "visibility:hidden;" >
```

+ 浏览器加载上面代码时，就会向 Facebook 发出带有cookie 的请求，从而 Facebook 就会知道你是
  谁，访问了什么网站。





## 二、Samesite属性

+ Samesite 是HTTP响应头 set-cookie 的属性之一。

+ 用来限制第三方 cookie ，从而减少安全风险。

**它可以设置三个值：**

**1、Strict**

+ 严格模式，表示这个 cookie 在任何情况下都不可能作为第三方 cookie。即当前URL与请求目标一致，才对带上Cookie.

```
Set-Cookie:CookieName = CookieValue; SameSite = Strict;
```

+ 这个规则过于严格，可能造成非常不好的用户体验。比如，当前网页有个GitHub 链接，用户点击
  跳转就不会带有 GitHub 的 Cookie，跳转过去总是末登陆状态。

**2、Lax**

+ 宽松模式，也是目前浏览器中的默认值。大多数情况也是不发送第三方cookie， 但是导航到目标网址的 Get 请求除外。

```
Set-Cookie:CookieName = CookieValue; SameSite = Lax;
```

+ 导航到目标网址的 GET 请求，只包括三种情况：链接，预加载请求，GET 表单。详见下表。

| 请求类型  | 示例                                 | 正常情况    | Lax         |
| --------- | ------------------------------------ | ----------- | ----------- |
| 链接      | `<a href="..."></a>`                 | 发送 Cookie | 发送 Cookie |
| 预加载    | `<link rel="prerender" href="..."/>` | 发送 Cookie | 发送 Cookie |
| GET 表单  | `<form method="GET" action="...">`   | 发送 Cookie | 发送 Cookie |
| POST 表单 | `<form method="POST" action="...">`  | 发送 Cookie | 不发送      |
| iframe    | `<iframe src="..."></iframe>`        | 发送 Cookie | 不发送      |
| AJAX      | `$.get("...")`                       | 发送 Cookie | 不发送      |
| Image     | `<img src="...">`                    | 发送 Cookie | 不发送      |

+ 使用这种方法的缺点是，因为它不支持子域，所以子域没有办法与主域共享登录信息每次转入子域的网站，都需要重新登录。
+ 还有一个问题就是它的兼容性不够好。

**3、None**

+ cookie将在所有上下文中发送，即允许跨域发送。

+ 必须同时设置`Secure`属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

```
Set-Cookie:flavor = choco; SameSite = None; Secure
```

## **三、如何使用Samesite Cookie**

+ 如果Samesite Cookie被设置为strict
  + 浏览器在任何跨域请求中都不会携带Cookie，新标签重新打开也不携带，所以说CSRF攻击基本没有机会。
  + 但是跳转子域名或者是新标签重新打开刚登陆的网站，之前的Cookie都不会存在。
  + 尤其是有登录的网站，那么我们新打开一个标签进入，或者跳转到子域名的网站，都需要重新登录。
  + 对于用户来讲，可能体验不会很好。

+ 如果SamesiteCookie被设置为Lax
  + 那么其他网站通过页面跳转过来的时候可以使用Cookie，可以保障外域连接打开页面时用户的登录状态。
  + 但相应的，其安全性也比较低。

+ 另外一个问题是Samesite的兼容性不是很好，现阶段除了从新版Chrome和Firefox支持以外，Safari以及iOS Safari都还不支持，现阶段看来暂时还不能普及。

+ Samesite Cookie目前有一个致命的缺陷：不支持子域。例如，种在topic.a.com下的Cookie，并不能使用a.com下种植的Samesite Cookie。这就导致了当我们网站有多个子域名时，不能使用Samesite Cookie在主域名存储用户登录信息。每个子域名都需要用户重新登录一次。

+ 总之，SamesiteCookie是一个可能替代同源验证的方案，但目前还并不成熟，其应用场景有待观望。