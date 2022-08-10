---
title: HTML规范
tags:
  - 规范
categories:
  - 前端规范
---

## DOCTYPE 声明

HTML文件必须加上 DOCTYPE 声明，并统一使用 HTML5 的文档声明：

```
<!DOCTYPE html>
```

## 页面语言LANG

推荐使用属性值 `cmn-Hans-CN`（简体, 中国大陆），但是考虑浏览器和操作系统的兼容性，目前仍然使用 `zh-CN` 属性值。

```
<html lang="zh-CN">
```



更多地区语言参考：

zh-SG 中文 (简体, 新加坡)  对应 cmn-Hans-SG 普通话 (简体, 新加坡)

zh-HK 中文 (繁体, 香港)   对应 cmn-Hant-HK 普通话 (繁体, 香港)

zh-MO 中文 (繁体, 澳门)   对应 cmn-Hant-MO 普通话 (繁体, 澳门)

zh-TW 中文 (繁体, 台湾)   对应 cmn-Hant-TW 普通话 (繁体, 台湾)

## CHARSET

一般情况下统一使用 “UTF-8” 编码

```
<meta charset="UTF-8">
```

由于历史原因，有些业务可能会使用 “GBK” 编码

```
<meta charset="GBK">
```

## 元素及标签闭合

**HTML元素共有以下5种：**

- 空元素：area、base、br、col、command、embed、hr、img、input、keygen、link、meta、param、source、track、wbr
- 原始文本元素：script、style
- RCDATA元素：textarea、title
- 外来元素：来自MathML命名空间和SVG命名空间的元素。
- 常规元素：其他HTML允许的元素都称为常规元素。

**元素标签的闭合应遵循以下原则：**

- 原始文本元素、RCDATA元素以及常规元素都有一个开始标签来表示开始，一个结束标签来表示结束。
- 某些元素的开始和结束标签是可以省略的，如果规定标签不能被省略，那么就绝对不能省略它。
- 空元素只有一个开始标签，且不能为空元素设置结束标签。
- 外来元素可以有一个开始标签和配对的结束标签，或者只有一个自闭合的开始标签，且后者情况下该元素不能有结束标签。

**为了能让浏览器更好的解析代码以及能让代码具有更好的可读性，有如下约定：**

- 所有具有开始标签和结束标签的元素都要写上起止标签，某些允许省略开始标签或和束标签的元素亦都要写上。
- 空元素标签都不加 “/” 字符

推荐：

```
<div>
    <h1>我是h1标题</h1>
    <p>我是一段文字，我有始有终，浏览器能正确解析</p>
</div>
<br>
```

不推荐：

```
<div>
    <h1>我是h1标题</h1>
    <p>我是一段文字，我有始无终，浏览器亦能正确解析
</div>
<br/>
```

更多关于元素及标签关闭：[#Elements](http://www.w3.org/TR/html5/syntax.html#elements-0)

## 书写风格

### HTML代码大小写

HTML标签名、类名、标签属性和大部分属性值统一用小写

推荐：

```
<div class="demo"></div>
```

不推荐：

```
<div class="DEMO"></div>

<DIV CLASS="DEMO"></DIV>
```

HTML文本、CDATA、JavaScript、meta标签某些属性等内容可大小写混合

```
<!-- 优先使用 IE 最新版本和 Chrome Frame -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

<!-- HTML文本内容 -->
<h1>I AM WHAT I AM </h1>

<!-- JavaScript 内容 -->
<script type="text/javascript">
    var demoName = 'demoName';
    ...
</script>
    
<!-- CDATA 内容 -->
<script type="text/javascript"><![CDATA[
...
]]></script>
```

### 类型属性

不需要为 CSS、JS 指定类型属性，HTML5 中默认已包含

推荐：

```
<link rel="stylesheet" href="" >
<script src=""></script>
```

不推荐：

```
<link rel="stylesheet" type="text/css" href="" >
<script type="text/javascript" src="" ></script>
```

### 元素属性

- 元素属性值使用双引号语法
- 元素属性值可以写上的都写上

推荐：

```
<input type="text">
    
<input type="radio" name="name" checked="checked" >
```

不推荐：

```
<input type=text>   
<input type='text'>
    
<input type="radio" name="name" checked >
```

更多关于元素属性：[#Attributes](http://www.w3.org/TR/html5/syntax.html#attributes-0)

### 特殊字符引用

在 HTML 中不能使用小于号 “<” 和大于号 “>”特殊字符，浏览器会将它们作为标签解析，若要正确显示，在 HTML 源代码中使用字符实体。

推荐：

```
<a href="#">more&gt;&gt;</a>
```

不推荐：

```
<a href="#">more>></a>
```

更多关于符号引用：[#Character references](http://www.w3.org/TR/html5/syntax.html#character-references)

### 代码缩进

统一使用四个空格进行代码缩进，使得各编辑器表现一致（各编辑器有相关配置）



```
<div class="jdc">
    <a href="#"></a>
</div>
```

### 代码嵌套

元素嵌套规范，每个块状元素独立一行，内联元素可选

推荐：

```
<div>
    <h1></h1>
    <p></p>
</div>  
<p><span></span><span></span></p>
```

不推荐：

```
<div>
    <h1></h1><p></p>
</div>  
<p> 
    <span></span>
    <span></span>
</p>
```

段落元素与标题元素只能嵌套内联元素

推荐：

```
<h1><span></span></h1>
<p><span></span><span></span></p>
```

不推荐：

```
<h1><div></div></h1>
<p><div></div><div></div></p>
```

## IE 兼容模式

IE 支持通过特定的 <meta> 标签来确定绘制当前页面所应该采用的 IE 版本。除非有强烈的特殊需求，否则最好是设置为 edge mode，从而通知 IE 采用其所支持的最新的模式。



```
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

## 可用性

- 正确使用alt属性
- 确保链接和按钮正确使用（不要用`<div class=button>`这种粗暴的做法）
- 不依赖于颜色来传达信息
- 给表单做好lable标记

```
<!-- bad -->
<h1><img alt="Logo" src="logo.png"></h1>

<!-- good -->
<h1><img alt="My Company, Inc." src="logo.png"></h1>
```

## 性能

除非有非要在加载内容前加载脚本的必要性由，不然别这样做，这样会阻碍网页渲染。如果你的样式表很大，必须独立放到一个文件里。两次HTTP 请求不会显著降低性能。

```
<!-- bad -->
<!doctype html>
<meta charset=utf-8>
<script src=analytics.js></script>
<title>Hello, world.</title>
<p>...</p>

<!-- good -->
<!doctype html>
<meta charset=utf-8>
<title>Hello, world.</title>
<p>...</p>
<script src=analytics.js></script>
```

## 注释

### 单行注释

一般用于简单的描述，如某些状态描述、属性描述等

注释位于要注释代码的上面，单独占一行

推荐：

```
<!-- Comment Text -->
<div>...</div>
```

不推荐：

```
<div>...</div><!--Comment Text-->   
    
<div><!--Comment Text-->
    ...
</div>
```

### 模块注释

一般用于描述模块的名称以及模块开始与结束的位置

`<!--Comment Text-->` 表示模块开始，`<!--/Comment Text-->` 表示模块结束

```
<!--统一顶部导航-->
<script type="text/javascript">topMenu();</script>
<!--/统一顶部导航-->
```