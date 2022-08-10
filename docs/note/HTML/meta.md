---
title: meta
tags:
  - HTML
categories:
  - HTML
---
## 01.meta viewport 相关

```
<meta name="viewport" content="width=device-width">

<meta name="viewport" content="initial-sacle=0.5">
```





```html
< !DOCTYPE  html >    <!--H5标准声明，使用 HTML5 doctype，不区分大小写-->
<head lang="en"> <!--标准的 lang 属性写法-->
<meta charset=’utf-8′>    <!--声明文档使用的字符编码-->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1″/>   <!--优先使用 IE 最新版本和 Chrome-->
<meta name="description" content="不超过150个字符"/>       <!--页面描述-->
<meta name="keywords" content=""/>     <!-- 页面关键词-->
<meta name="author" content="name, email@gmail.com"/>    <!--网页作者-->
<meta name="robots" content="index,follow"/>      <!--搜索引擎抓取-->
<meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no"> <!--为移动设备添加 viewport-->
<meta name="apple-mobile-web-app-title" content="标题"> <!--iOS 设备 begin-->
<meta name="apple-mobile-web-app-capable" content="yes"/>  <!--添加到主屏后的标题（iOS 6 新增）是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏-->
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL"><!--添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）-->
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
<meta name="format-detection" content="telphone=no, email=no"/>  <!--设置苹果工具栏颜色-->
<meta name="renderer" content="webkit"> <!-- 启用360浏览器的极速模式(webkit)-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">     <!--避免IE使用兼容模式-->
<meta http-equiv="Cache-Control" content="no-siteapp" />    <!--不让百度转码-->
<meta name="HandheldFriendly" content="true">     <!--针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓-->
<meta name="MobileOptimized" content="320″>   <!--微软的老式浏览器-->
<meta name="screen-orientation" content="portrait">   <!--uc强制竖屏-->
<meta name="x5-orientation" content="portrait">    <!--QQ强制竖屏-->
<meta name="full-screen" content="yes">              <!--UC强制全屏-->
<meta name="x5-fullscreen" content="true">       <!--QQ强制全屏-->
<meta name="browsermode" content="application">   <!--UC应用模式-->
<meta name="x5-page-mode" content="app">   <!-- QQ应用模式-->
<meta name="msapplication-tap-highlight" content="no">    <!--windows phone 点击无高亮设置页面不缓存-->
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
```



## 02.常用的meta元素有哪些

元数据，不会显示在页面上，是用来让机器识别的，通水对SEO起着重要作用。

## charset

```html
< meta  charset = "utf-8" >
```

### name&content

author——作者

```html
<meta  name = "author" content = "Tony" >
```

keywords——关键字

```html
<meta  name = "keywords" content = "HTML, CSS, JavaScript" >

```

description——网站整体的描述

```html
<meta  name = "description" content = "My tutorials on HTML, CSS and JavaScript" >
```

viewport——对页面视图相关进行定义

```html
<!--
width = device-width—— 控制视口的大小，将页面宽度设置为跟随屏幕宽度变化而变化
initial-scale=1.0—— 设置浏览器首次加载页面时的初始缩放比例(0.0 - 10.0 正数)
maximum-scale=1.0—— 允许用户缩放的最大比例(0.0 - 10.0 正数)， 必须大于等于
minimum-scale=1.0—— 允许用户缩放的最小比例(0.0 - 10.0 正数)， 必须小于等于
use-scalable = no—— 是否允许用户手动缩放(yes或者no) 
-->
<meta  name = "viewport" 
content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, minmum-scale=1.0" >
```

generator——生成页面软件的标识符

```html
<meta  name = "generator" content = "Hexo 3.8.0" >
```

theme-colorr——定义主题颜色

```html
<meta  name = "theme-color" content = "#222" >
```

### http-equiv&content

X-UA-Compatible——告知浏览器以何种版本渲染界面

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">     <!--避免IE使用兼容模式--> 
```

Cache-Control——请求和响应遵循的缓存机制，可以声明缓存的内容，修改过期时间，可多次声明

```html
<meta  http - equiv = "Cache-Control" content = "no-transform" ><!--不得对资源进行转换或者转变-->
< meta  http - equiv = "Cache-Control" content = "no-siteapp" > <!--不让百度转码-->
```

refresh——30s刷新一次文档

```html
< meta  http-equiv = "refresh" content = "30" >
```

### property&content

让网页成为一个富媒体对象，同意网页内容被其他网站引用，同时在应用的时候不会只是一个链接，会提取相应的信息展示给用户。

```html
<meta  property = "og:type" content="website" > 
<meta  property = "og:url" content="https://zjgyb.github.io/index.html" > 
<meta  property="og:site_name" content = "tony's blog" >
```

