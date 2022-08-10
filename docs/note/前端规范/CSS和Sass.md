---
title: CSS/Sass规范
tags:
  - 规范
categories:
  - 前端规范
---



# CSS/Sass

## CSS

### 代码格式化

类名建议使用破折号代替驼峰法。

样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写。

```
/* 推荐 */
.wcc{
    display:block;
}
.wcc-hd {
    color: #ff0;
}
    
/* 不推荐 */
.WCC{
    DISPLAY:BLOCK;
}
.wcc_hd {
    color: #ff0;
}
```

### 选择器

- 尽量少用通用选择器 `*`
- 尽量不使用 ID 选择器
- 不使用无具体语义定义的标签选择器
- 不要让嵌套选择器深度超过3层

```
/* 推荐 */
.wcc {}
.wcc li {}
.wcc li p{}

/* 不推荐 */
*{}
#wcc {}
.wcc div{}
```

### 代码缩进

统一使用四个空格进行代码缩进，使得各编辑器表现一致（各编辑器有相关配置）

```
.wcc {
    width: 100%;
    height: 100%;
}
```

### 分号

每个属性声明末尾都要加分号；

```
.wcc {
    width: 100%;
    height: 100%;
}
```

### 代码易读性

左括号与类名之间一个空格，冒号与属性值之间一个空格

```
/* 推荐 */
.wcc { 
    width: 100%; 
}
/* 不推荐 */
.wcc{ 
    width:100%;
}
```

逗号分隔的取值，逗号之后一个空格

```
/* 推荐 */
.wcc {
    box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc;
}
/* 不推荐 */
.wcc {
    box-shadow: 1px 1px 1px #333,2px 2px 2px #ccc;
}
```

为单个css选择器或新申明开启新行

```
/* 推荐 */
.wcc, 
.wcc-logo, 
.wcc-hd {
    color: #ff0;
}
.nav{
    color: #fff;
}
/* 不推荐 */
.wcc,.wcc-logo,.wcc-hd {
    color: #ff0;
}.nav{
    color: #fff;
}
```

颜色值 `rgb()` `rgba()` `hsl()` `hsla()` `rect()` 中不需有空格，且取值不要带有不必要的 0

```
/* 推荐 */
.wcc {
   color: rgba(255,255,255,.5);
}
/* 不推荐 */
.wcc {
  color: rgba( 255, 255, 255, 0.5 );
}
```

属性值十六进制数值能用简写的尽量用简写

```
/* 推荐 */
.wcc {
   color: #fff;
}
/* 不推荐 */
.wcc {
   color: #ffffff;
}
```

不要为 `0` 指明单位

```
/* 推荐 */
.wcc {
   margin: 0 10px;
}
/* 不推荐 */
.wcc {
   margin: 0px 10px;
}
```

### 属性值引号

css属性值需要用到引号时，统一使用单引号

```
/* 推荐 */
.wcc {
   font-family: 'Hiragino Sans GB';
}
/* 不推荐 */
.wcc {
   font-family: "Hiragino Sans GB";
}
```

### 属性书写顺序

1. 布局定位属性：display / position / float / clear / visibility / overflow
2. 自身属性：width / height / margin / padding / border / background
3. 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
4. 其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …

```
.wcc {
    display: block;
    position: relative;
    float: left;
    width: 100px;
    height: 100px;
    margin: 0 10px;
    padding: 20px 0;
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #333;
    background: rgba(0,0,0,.5);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
}
```

[mozilla官方属性顺序推荐](https://www.mozilla.org/css/base/content.css)

### CSS3浏览器私有前缀写法

CSS3 浏览器私有前缀在前，标准前缀在后

```
.wcc {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
}
```

更多关于浏览器私有前辍写法：[#Vendor-specific extensions](http://www.w3.org/TR/2011/REC-CSS2-20110607/syndata.html#vendor-keywords)

### 注释

- 注释以字符 `/*` 开始，以字符 `*/` 结束
- 注释不能嵌套

注释内容单独占一行，行与行之间相隔一行

```
/* 推荐 */
/* Comment Text */
.wcc{}
/* Comment Text */
.wcc{}

/* 不推荐 */
/*Comment Text*/
.wcc{
    display: block;
}
.wcc{
    display: block;/*Comment Text*/
}
```

在样式文件编码声明 `@charset` 语句下面注明页面名称、作者、创建日期等信息

```
@charset "UTF-8";
/*
 * Author: wendy
 * Version: 0.1.0
 * Compile Date: 2015-12-03 16:02
*/
```

## Sass

### 语法

- 严格遵守上面 “CSS规范” 中的 “编码规范”
- CSS 和 @include 声明按照以下逻辑排序（参见下文）

### 属性声明的排序

1. 属性声明

首先列出除去 @include 和嵌套选择器之外的所有属性声明。

```
.btn-green {
  background: green;
  font-weight: bold;
  
// ...
}
```

1. @include 声明

紧随后面的是 @include，这样可以使得整个选择器的可读性更高。

```
.btn-green {
  background: green;
  font-weight: bold;
  @include transition(background 0.5s ease);
  
// ...
}
```

1. 嵌套选择器

如果有必要用到嵌套选择器，把它们放到最后，在规则声明和嵌套选择器之间要加上空白，相邻嵌套选择器之间也要加上空白。嵌套选择器中的内容也要遵循上述指引。

```
.btn {
  background: green;
  font-weight: bold;
  @include transition(background 0.5s ease);
 
  .icon {
    margin-right: 10px;
  }
}
```

### 变量

可复用属性尽量抽离为页面变量，易于统一维护

```
// CSS
.wcc {
    color: red;
    border-color: red;
}

// SCSS
$color: red;
.wcc {
    color: $color;
    border-color: $color;
}
```

### 混合(mixin)

根据功能定义模块，然后在需要使用的地方通过 `@include` 调用，避免编码时重复输入代码段



```
// CSS
.wcc-1 {
    -webkit-border-radius: 5px;
    border-radius: 5px;
}
.wcc-2 {
    -webkit-border-radius: 10px;
    border-radius: 10px;
}

// SCSS
@mixin radius($radius:5px) {
    -webkit-border-radius: $radius;
    border-radius: $radius;
}
.wcc-1 {
    @include radius; //参数使用默认值
}
.wcc-2 {
    @include radius(10px);
}



// CSS
.wcc-1 {
    background: url(/img/icon.png) no-repeat -10px 0;
}
.wcc-2 {
    background: url(/img/icon.png) no-repeat -20px 0;
}

// SCSS
@mixin icon($x:0, $y:0) {
    background: url(/img/icon.png) no-repeat $x, $y;
}
.wcc-1 {
    @include icon(-10px, 0);
}
.wcc-2 {
    @include icon(-20px, 0);
}
```



### 扩展指令

应避免使用 @extend 指令，因为它并不直观，而且具有潜在风险，特别是用在嵌套选择器的时候。即便是在顶层占位符选择器使用扩展，如果选择器的顺序最终会改变，也可能会导致问题。（比如，如果它们存在于其他文件，而加载顺序发生了变化）。其实，使用 @extend 所获得的大部分优化效果，gzip 压缩已经帮助你做到了，因此你只需要通过 mixin 让样式表更符合 DRY 原则就足够了。

### 注释

- 全部遵循 CSS 注释规范
- 不使用 `/*! */` 注释方式
- 注释内不放 SASS 变量