---
title: 使用CSS提高页面性能
tags:
  - CSS
  - 性能优化
categories:	
  - 性能优化
  - CSS
---

**实现方法：**

1. 内联首屏关键 CSS 
2. 异步加载 CSS 
3. 资源压缩
4. 合理使用选择器
5. 减少使用昂贵的属性
6. 不要使用＠ import


## 一、内联首屏关键 CSS 
+ 在打开一个页面，页面首要内容出现在屏幕的时间影响着用户的体验，而通过内联 css 关键代码，能够使浏览器在下载完 html 后就能立刻渲染。
+ 如果外部引用 css 代码，在解析 html 结构过程中遇到外部 css 文件，才会开始下载 css 代码，再渲染。
+ 所以，css 内联的使用使渲染时间提前。
+ 注意：但是较大的 css 代码并不合适内联（初始拥塞窗口、没有缓存），而其余代码则采取外部引用方式

## 二、异步加载 CSS 


在 css 文件请求、下载、解析完成之前，css 会阻塞渲染，浏览器将不会渲染任何已处理的内容。

前面加载内联代码后，后面的外部引用 css 则没必要阻塞浏览器渲染。这时候就可以采取异步加方案，主要有如下：

+ 使用 javascript 将 link 标签插到 head 标签最后

```js
// 创建link标签
const myCSS = document.createElement( "link" );
myCSS.rel = "stylesheet";
myCSS.href = "mystyles.css";
// 插入到header的最后位置
document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
```

+ 设置 `link` 标签 `media` 属性为 `noexis` ，浏览器会认为当前样式表不适用当前类型，会在不阻塞页面渲染的情况下再进行下载。加载完成后，将`media` 的值设为 `screen` 或`all`，从而让浏览器开始解析 `CSS`

```html
<link  rel = "stylesheet" href = "mystyles.css" media = "noexist" onload = "this.media='all'" >
```

+ 通过 rel 属性将 link 元素标记为 `alternate` 可选样式表，也能实现浏览器异步加载。同样别忘了完成之后，将 `rel` 设回 `stylesheet` 

```html
<link  rel = "alternate stylesheet" href = "mystyles.css" onload = "this.rel='stylesheet'">
```



## 三、资源压缩

利用 `webpack` 、 `gulp / grunt` 、 `rollup` 等模块化工具，将 `css` 代码进行压缩，使文件变小，大大降低了浏览器的加载时间
## 四、合理使用选择器
+ `CSS` 匹配的规则是从右往左开始匹配，例如`#markdown · content h3`匹配规则如下：
  + 先找到`h3`标签元素
  + 然后去除祖先不是`.content` 的元素
  + 最后去除祖先不是`#markdown` 的元素

+ 如果嵌套的层级更多，页面中的元素更多，那么匹配所要花费的时间代价自然更高，所以我们在编写选择器的时候，可以遵循以下规则
  + 不要嵌套使用过多复杂选择器，最好不要三层以上
  + 使用 id 选择器就没必要再进行嵌套
  + 通配符和属性选择器效率最低，避免使用
    

## 五、减少使用昂贵的属性

+ 在页面发生重绘的时候，昂贵属性如 `box-shadow` / `border-radius` / `filter` ／透明度／`:nth-child` 等，会降低浏览器的渲染性能。



## 六、不要使用＠ import 
+  css 样式文件有两种引入方式，一种是`link`元素，另一种是`@import` 
+ `@import` 会影响浏览器的并行下载，使得页面在加载时增加额外的延迟，增添了额外的往返耗时
+ 而且多个`＠import` 可能会导致下载顺序紊乱
+ 比如一个 css 文件 `index.css` 包含了以下内容：`@import url("reset.css")`
+ 那么浏览器就必须先把 index . css 下载、解析和执行后，才下载、解析和执行第二个文件`reset.css`

 ## 七、其他
+ 减少重排操作，以及减少不必要的重绘
+ 了解哪些属性可以继承而来，避免对这些属性重复编写
+  cssSprite ，合成所有 icon 图片，用宽高加上 `backgroud - position` 的背景图方式显现出我们要的 icon 图，减少了 http 请求
+ 把小的 icon 图片转成base64编码
+ CSS3动画或者过渡尽量使用 transform 和 opacity 来实现动画，不要使用left和top 属性



## 八、总结

+ CSS实现性能的方式可以从述择器嵌套、属性特性、减少 http 这三面考虑，同时还要注意 CSS代码的加载顺序