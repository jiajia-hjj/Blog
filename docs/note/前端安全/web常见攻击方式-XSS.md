---
title: web常见攻击方式-XSS
tags:
  - 前端安全
categories:
  - 前端安全
---

## 一、Web攻击是什么
+ Web攻击（webAttack）是针对用户上网行为或网站服务器等设备进行攻击的行为。
+ 如植入恶意代码，修改网站权限，获取网站用户隐私信息等等
+ 站点安全就是为保护站点不受未授权的访问、使用、修改和破坏而采取的行为或实践
+ 我们常见的Web攻击方式有
  + XSS (Cross Site Scripting) 跨站脚本攻击
  + CSRF (Cross-site request forgery)跨站请求伪造
  + SQL注入攻击

## 二、什么XSS 

+ XSS，**跨站脚本攻击**，允许攻击者将恶意代码植入到提供给其它用户使用的页面中
+ XSS涉及到三方，即攻击者、客户端与 web 应用
+ 攻击目标是为了盗取存储在客户端的cookie 或者其他网站用于识别客户端身份的敏感信息。
+ 一旦获取到合法用户的信息后，攻击者甚至可以假冒合法用户与网站进行交互
+ 简单说：XSS 就是攻击者想尽一切办法将可以执行的代码注入到网页中。

**举个例子：一个搜索页面，根据 url参数决定关键词的内容**

```html
<input type="text" value="<%= getParameter("keyword ") %>" >
<button > 搜索 </button>
<div> 
    您搜索的关键词是：<%= getParameter("keyword") %>
</div>
```

+ 这里看似并没有问题，但是如果不按套路出牌呢？
+ 用户输入 `"<script>alert('XSS');</script>`， 服务端会解析 ，拼接到HTML 中返回给浏览器。形成了如下的 HTML ：

```html
<input  type="text" value="">< script > alert('XSS'); </script>">
<button>搜索</button > 
<div>
	您搜索的关键词是"><script>alert('XSS');</script>
</div>
```

+ 浏览器无法分辨出`<script>alert('xSs');</script>`是恶意代码，因而将其执行，  alert 会弹出两次。 试想一下，如果是获取 cookie 发送对黑客服务器呢？
+ **我们应该如何进行防范呢？**  这只是浏览器把用户的输入当成了脚本进行了执行。那么只要告诉浏览器这段内容是文本就可以了。 

+ 修复：

```html
<input type="text" value="<%= escapeHTML(getParameter("keyword")) %>">
<button>搜索</button>
<div>
  您搜索的关键词是：<%= escapeHTML(getParameter("keyword")) %>
</div>
```

`escapeHTML()` 按照如下规则进行转义：

| 字符 | 转义后的字符 |
| ---- | ------------ |
| `&`  | `&amp;`      |
| `<`  | `&lt;`       |
| `>`  | `&gt;`       |
| `"`  | `&quot;`     |
| `'`  | `&#x27;`     |
| `/`  | `&#x2F;`     |

+ 经过了转义函数的处理后，最终浏览器接收到的响应为：

```html
<input type="text" value="&quot;&gt;&lt;script&gt;alert(&#x27;XSS&#x27;);&lt;&#x2F;script&gt;">
<button>搜索</button>
<div>
  您搜索的关键词是：&quot;&gt;&lt;script&gt;alert(&#x27;XSS&#x27;);&lt;&#x2F;script&gt;
</div>
```

+  恶意代码都被转义，不再被浏览器执行，而且搜索词能够完美的在页面显示出来。 



## 三、攻击类型

### 3.1.存储型(server端)

**1、攻击步骤：**

+ 攻击者将恶意代码**提交到目标网站的数据库中**
+ 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器
+ 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
+ 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击操作

**2、场景：**

+ 见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

### 3.2.反射型(server端)

**1、攻击步骤：**

+ 攻击者构造出特殊的 URL，其中包含恶意代码
+ 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML中返回给浏览器
+ 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
+ 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

**2、场景：**

+ 通过 URL 传递参数的功能，如网站搜索、跳转等
+ 由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。
+ POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见

**3、反射型 XSS跟存储型 XSS 的区别是：**

+ 存储型 XSS的恶意代码存在数据库里，反射型 XSS 的恶意代码存在URL里。

### 3.3.DOM型(浏览器端)
**2、攻击步骤：**

+ 攻击者构造出特殊的 URL,其中包含恶意代码
+ 用户打开带有恶意代码的 URL
+ 用户浏览器接收到响应后解析执行，前端JavaScript 取出 URL 中的恶意代码并执行
+ 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

**2、场景：**

+ 通过 URL 传递参数的功能，如网站搜索、跳转等

**3、DOM 型XSS跟前两种XSS 的区别：**

+ DOM 型XSS攻击中，取出和执行恶意代码由浏览器端完成，属于前端 Javascript 自身的安全漏洞，而其他两种XSS都属于服务端的安全漏洞

## 四、XSS的预防

通过前面介绍，看到 xss 攻击的两大要素：

+ 攻击者提交而恶意代码
+ 浏览器执行恶意代码



**预防方案：(防止攻击者提交恶意代码，防止浏览器执行恶意代码)**

+ 对数据进行严格的输出编码：
  + HTML元素的编码，JS编码，CSS编码，URL编码等等避免拼接HTML;
  + Vue/React 技术栈，避免使用 `v-html/dangerouslySetinnerHTML`
+ CSP HTTP Header，即 `Content-Securitv-Policy`、`X-XSS-Protection`增加攻击难度，配置CSP的本质是
  建立白名单，由浏览器进行拦截。

```
#有内容均来自站点的同一个源（不包括其子域名）
Content-Security-Policy:default-snc 'self'
#允许内容来自信任的域名及其子域名（域名不必须与CSP设置所在的域名相同)
Content-Security-Policy:delault-src 'self'*.trusted.com 
该服务器仅允许通过HTTPS方式并仅从test.com域名来访问文档
Content-Security-Policy:default-src https://test.com 
```

+ 输入验证：过滤掉用户输入的恶劣代码，然后提交给后端，比如一些常见的数字、URL、电话号码、邮箱地址等等做校验判断
+ 开启浏览器XSS防御：Http Only cookie ，禁止JavaScript 读取某些敏感 Cookie，攻击者完成 XSS注入后，也无法窃取此 Cookie.
  





> 参考：
>
> [前端安全系列（一）：如何防止XSS攻击？](https://juejin.cn/post/6844903685122703367)