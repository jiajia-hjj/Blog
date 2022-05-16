---
title: SVG基础
tags:
  - SVG
categories:
  - SVG
---



## 一、简介

+ 可缩放矢量图形（Scalable Vector Graphics）。

+ SVG 使用 XML 格式定义图像。

### 拓展：图形系统

我们的计算机有两种图形系统: 栅格图形和矢量图形。

- 栅格图形系统就是那种越放大越模糊的图片。
- 矢量图形就是怎么放大都不会影响清晰度。

### 兼容性

+ IE8以下和旧安卓设备（2.1-2.3）
+ 可以用 [Modernizr](https://modernizr.com/) 这样的库来检查并提供降级方案

```javascript
if (!Modernizr.svg) {
  $(".my-svg").attr("src", "images/logo.png");
}
```

### 优势

+ 无限缩放：由于 SVG 图像是矢量图像，可以无限缩放，SVG 图像可以适应不同的屏幕大小和分辨率

+ css 和 js 交互：由于是在 XML 中定义的，SVG 图像比 JPG 或 PNG 图像更灵活，而且我们可以使用 CSS 和 JavaScript 与它们进行交互。

+ SVG 可以做图标字体，比如 FontAwesome，因为它更小，并且允许使用多色图标。
+ SVG 在动画方面很简单。
+ SVG 提供了一些图像编辑效果，比如裁剪，蒙板，滤镜，旋转等等。
+ SVG 只是文本，因此可以使用 GZip 对其进行有效压缩。

### 在 Web 网页中插入 SVG

- CSS `background-image` 属性
- 在 HTML 中内联

- `img` 、 `object`、 `iframe` 或 `embed` 标签

**CSS `background-image` 属性**

```html
<style>
.svg-background {
  background-image: url(MySVG.svg);
  height: 200px;
  width: 300px;
}
</style>
<div class="svg-background"></div>
```

**使用img、object、embed 标签直接引用SVG**

```html
<html>
<body>
  <img src="./MySVG.svg"  />
   <object type="image/svg+xml" data="MySVG.svg"
    width="300" height="200">
   </object>
  <iframe src="MySVG.svg" frameborder="0"></iframe>
  <embed src="MySVG.svg" type="" />
</body>
</html>
```

**在 HTML 中内联**

```html
<html>
<body>
 <svg>
  ...
 </svg>
</body>
</html>
```

### **对比**

| 特性                     | SVG 内联 | `object`/`embed`/`iframe` | `img` |
| ------------------------ | -------- | ------------------------- | ----- |
| 可以与用户交互           | ✅        | ✅                         | ✅     |
| 支持动画                 | ✅        | ✅                         | ✅     |
| 可以运行 JavaScript 脚本 | ✅        | ✅                         | 👎🏼    |
| 可以从外部编写脚本       | ✅        | 👎🏼                        | 👎🏼    |



内联 SVG 图像无疑是最强大和最灵活的，它是使用 SVG 执行某些操作的唯一方法。

**如果想要 SVG 与您的脚本进行任何交互，它必须以内联的方式加载到 HTML中**。

如果不需要与 SVG 交互，只需在页面中显示它，将 SVG 加载至 `img` 、 `object` 或者 `embed` 中即可，如果您在不同的页面中重用 SVG 图像，或者 SVG 图像的大小相当大，那么加载 SVG 就特别方便。



# 二、坐标系统

## 视口

**视口代表在文档想使用的区域**，用width和height定义视口大小，单位默认为像素，也可以使用任何其他常用单位，如 `%` 或 `em`。

demo:viewport.svg

```html
<svg width="400" height="400">
</svg>
```

## 

SVG使用的坐标系统或者说网格系统是：原点（0，0）位于视口的左上角，x从左向右依次递增，y从上到小依次递增。

![img](https://cdn.nlark.com/yuque/0/2020/webp/299719/1601017708745-d634048a-57db-4220-9df6-f90f6d2a7e98.webp)

SVG的元素的单位可以不统一。

```html
<svg width="600" height="300" style="outline: 5px solid #e6e6e6">  
        //x y 设定位置
        <rect x="10px" y="10px" width="10" height="10" fill="blue" />  
        <rect x="4em" y="1em" width="10" height="10" fill="pink" />
        <rect x="10" y="50" width="10" height="10" fill="yellow" />
</svg>  
```

![img](https://cdn.nlark.com/yuque/0/2020/webp/299719/1601103269191-86f82afd-dcd8-4e8e-b62f-ced14bb9eeb1.webp)

## ViewBox

可以自己为视口设置坐标系，通过SVG元素上的[viewBox](http://know.webhek.com/svg/svg-viewbox-preserveaspectratio.html)属性。

viewBox="x, y, width, height"  // x:左上角横坐标，y:左上角纵坐标，width:宽度，height:高度

顾名思意是“视区盒子”的意思。

demo：viewBox.svg

```html
<svg width="400" height="300"
    viewBox="0,0,40,30"
     xmlns="http://www.w3.org/2000/svg"
     style="margin: 50px; border:1px solid #315ea0;">
    <rect x="10" y="5" width="20" height="15" fill="#cd0000"/>
</svg>
```

**1.** 如果没有`viewBox`, 应该是长这样的：

![img](https://cdn.nlark.com/yuque/0/2020/png/299719/1601104475059-5664fcf5-0acc-4c5b-b5d9-4bfb6e4c3eb4.png)

`<rect>`大小只有整个SVG舞台的`1/20`.

**2.** `viewBox="0,0,40,30"`相当于在SVG上圈了下图左上角所示的一个框框：

![img](https://cdn.nlark.com/yuque/0/2020/png/299719/1601104475069-04b7e087-d0eb-4836-8e2b-e78d6d6a650f.png)

**3.** 然后把这个框框，连同框框里的小矩形一起放大到整个SVG大小（如下gif）:

![img](https://cdn.nlark.com/yuque/0/2020/gif/299719/1601104475064-0d974c3c-bbb3-4aab-bc88-be3e2133f028.gif)

### preserveAspectRatio

为了解决SVG视口长宽比例和viewBox定义的长宽比例不同的问题以及如何对齐问题。这个时候就需要preserveAspectRatio属性了。

默认值

```
preserveAspectRatio="xMidYMid meet"
```

第1个值表示，viewBox如何与SVG viewport对齐；第2个值表示，如何维持高宽比。



**第1个值：**

| xMin | viewport和viewBox左边对齐                      |
| ---- | ---------------------------------------------- |
| xMid | viewport和viewBox x轴中心对齐                  |
| xMax | viewport和viewBox右边对齐                      |
| YMin | viewport和viewBox上边缘对齐。注意Y是大写。     |
| YMid | viewport和viewBox y轴中心点对齐。注意Y是大写。 |
| YMax | viewport和viewBox下边缘对齐。注意Y是大写。     |

`x`, `y`自由组合就可以了，如：

xMaxYMax

xMidYMid

demo:https://www.webhek.com/demos/codepens/31.html?height=450



**第2个值：**

值含义

| meet  | 保持纵横比缩放viewBox适应viewport          |
| ----- | ------------------------------------------ |
| slice | 保持纵横比同时比例小的方向放大填满viewport |
| none  | 扭曲纵横比以充分适应viewport               |

demo:viewBox.shtml

# 三、基础语法

## 基础形状

### 矩形

```html
<rect x="10" y="10" width="100" height="100"  rx="15"  ry="15" /> 
```

### 圆形

```html
<circle cx="100" cy="100" r="50" />
```

### 椭圆 

```html
<ellipse cx="100" cy="100" rx="60" ry="40" />
```

### 直线

使用x1,y1,x2,y2属性指定线段的起止点坐标

```html
<line x1="50" y1="50" x2="160" y2="160" stroke="red" />
```

### 折线 

使用points属性指定一系列点，不自动封闭图形

```html
<polyline points="20,100 40,60 70,80 100,20" fill="none" stroke="red" />
```

### 多边形 

由points属性指定的一系列坐标点界定，会自动封闭

```html
<polygon points="20,100 40,60 70,80 100,20" fill="none" stroke="red" />
```

## 路径

### path

SVG中所有基本形状都是path的简写形式，但是建议使用简写形式，因为这样可以使SVG文档更可读



path元素更通用，可以通过制定一系列相互连接的线、弧、曲线来绘制任意形状的轮廓，这些轮廓也可以填充或者绘制轮廓线实现不规则形状的点击，也可以用来定义裁剪区域或蒙版，还可以做路径动画 [看看这边](https://juejin.im/post/6844903621474123789#heading-0)



下表为path命令总结，其中大写表示**绝对坐标**，小写表示**相对坐标**

| 命令 | 参数                                      | 说明                                                         |
| ---- | ----------------------------------------- | ------------------------------------------------------------ |
| M m  | x y                                       | 移动画笔到给定坐标                                           |
| L l  | x y                                       | 绘制一条到给定坐标的线                                       |
| H h  | x                                         | 绘制一条到给定x坐标的横线                                    |
| V v  | y                                         | 绘制一条到给定y坐标的垂线                                    |
| A a  | rx ry x-axis-rotation large-arc sweep x y | 圆弧曲线命令有7个参数，依次表示x方向半径、y方向半径、旋转角度、大圆标识、顺逆时针标识、目标点x、目标点y。大圆标识和顺逆时针以0和1表示。0表示小圆、逆时针 |
| Q q  | x1 y1 x y                                 | 绘制一条从当前点到x,y控制点为x1,y1的二次贝塞尔曲线           |
| T t  | x y                                       | 绘制一条从当前点到x,y的光滑二次贝塞尔曲线，控制点为前一个Q命令的控制点的中心对称点，如果没有前一条则已当前点为控制点。 |
| C c  | x1 y1 x2 y2 x y                           | 绘制一条从当前点到x,y控制点为x1,y1 x2,y2的三次贝塞尔曲线     |
| S s  | x2 y2 x y                                 | 绘制一条从当前点到x,y的光滑三次贝塞尔曲线。第一个控制点为前一个C命令的第二个控制点的中心对称点，如果没有前一条曲线，则第一个控制点为当前的点。 |
| Z    |                                           | 闭合路径。从最后一个绘制点连线到开始点                       |

### maker

marker（标记）用来在path的开始、中间和结尾添加一个标记，比如箭头之类的。

标记是使用<marker>元素创建的。<marker> 元素必须嵌套在一个<defs>元素内。

demo:maker.html

```html
<svg width="500" height="100">
    <defs>
        <marker id="markerCircle" markerwidth="8" markerheight="8" refx="5" refy="5">
            <circle cx="5" cy="5" r="3" style="stroke: none; fill:#000000;"></circle>
        </marker>
        <marker id="markerArrow" markerwidth="13" markerheight="13" refx="2" refy="6" orient="auto">
            <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;"></path>
        </marker>
    </defs>
    <path d="M100,10 L150,10 L150,60" style="stroke: #6666ff; stroke-width: 1px; fill: none;
                       marker-mid:url(#markerArrow);
                       marker-start: url(#markerCircle);
                       marker-end: url(#markerArrow);
                     "></path>
</svg>
```

拿`markerCircle`举例：

- 定义了一个宽度为8(**markerWidth**=“8”)、高度为8(**markerHeight**=“8”)的标记。 由于标记是单独的图形元素，因此必须显式设置宽度和高度。
- **refx和refy**坐标设置标记内的点用作参考点。参考点是使用标记定位在路径开始处的点。在本示例中，refX和refY设置为圆的中心，这意味着圆的中心将放置在路径的起点处。如果不设置refX和refY，它们将被假定为0，这将使标记的左上角位于路径的开始处。

- 引用标记：

- - `marker-start`
  - `marker-mid`

- - `marker-end`

通过引用id属性来引用<marker>元素

```html
marker-start : url(#markerId);
```



- orient="auto"  自动定向   demo:maker-auto.shtml

也可以将orient属性的值设定为固定的度数(例如45度)， 这将使标记在使用时旋转该度数。

- 在直线line中marker-mid 是不起作用的，即使用path画一条直线也是一样的,marker-mid指的是路径中间的拐点。



## 文档结构

### g

 <g>元素用于将SVG形状**分组**在一起。

1. 添加到g元素上的变换会应用到其所有的子元素上。demo:g-1

```html
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <g transform="rotate(45 50 50)">
      <line x1="10" y1="10" x2="85" y2="10"
          style="stroke: #006600;"/>

      <rect x="10" y="20" height="50" width="75"
          style="stroke: #006600; fill: #006600"/>

      <text x="10" y="90" style="stroke: #660000; fill: #660000">
        走进SVG</text>
    </g>

</svg>
```

g元素没有X和Y属性，要移动<g>元素的内容，只能使用transform属性使用“ translate”函数，例如：transform ="translate(x,y)"。或者将<g>元素嵌套在<svg>元素内。 <svg>元素具有x和y属性

demo:g-2

```html
<svg width="320" height="150">
	<svg width="320" height="150" x="100">
    <g transform="rotate(45 50 50)">
        ...
		</g>
  </svg>
</svg>
```

1. g元素的样式由其子元素继承 demo:g-3

```html
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g style="stroke: #0000ff; stroke-width: 4px; fill: #ff0000">
    <!-- 方形圆形没有定义style继承了样式 -->
    <rect    x="10"  y="10" width="100" height="50" />
    <circle cx="150" cy="35" r="25" />
    <!-- 第三个圆形继承了stroke-width -->
    <circle cx="250" cy="35" r="25"
           style="stroke: #009900; fill: #00ff00;"/>
</g>
</svg>
```

1. g元素也可以用来定义复杂的对象，之后可以通过<use>元素来引用它们。

### defs

<defs>元素用于嵌入可在SVG内重用的定义，可以是形状元素，渐变，g等等。

```html
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <g id="group">
        <line x1="10" y1="10" x2="85" y2="10"
            style="stroke: #006600;"/>

        <rect x="10" y="20" height="50" width="75"
            style="stroke: #006600; fill: #006600"/>

        <text x="10" y="90" style="stroke: #660000; fill: #660000">
            走进SVG</text>
        </g>
    </defs>
</svg>
```

在<defs>元素中定义的形状不会显示在SVG图像中。

### use

重用SVG文档中其他位置的SVG形状。通过元素的ID引用

```html
<use xlink:href="#group" x="200" y="50" /> 
```

xlink:href，注意#

demo:use-defs



## 图案和渐变

填充图形或笔画除了使用fill,stroke纯色之外，还可以使用图案和渐变填充。

### 图案

使用图案填充图形，首先要用<pattern>定义一个图案对象

demo:pattern

```html
<svg width="1000" height="1000" xmlns ="http://www.w3.org/2000/svg">
    <!--先定义一个图案-->
    <defs>
        <pattern id="strip" patternUnits="userSpaceOnUse" x="0" y="0" width="6" height="6">
            <path d="M0 0 L6 0" style="stroke: black;fill: none"/>
        </pattern>
        <pattern id="polkadot" patternUnits="userSpaceOnUse" x="0" y="0" width="36" height="36" >
            <circle cx="12" cy="12" r="12" style="fill: url(#strip);stroke: black"/>
        </pattern>
    </defs>
    <!--使用-->
    <rect x="36" y="36" width="100" height="100" style="fill: url(#polkadot);stroke: black"/>
</svg>
```

![img](https://cdn.nlark.com/yuque/0/2020/webp/299719/1601026611853-2a6160e3-0850-4c8e-b402-61be50956fa0.webp)

patternUnits：定义如何排列图案，有两个可能的值：objectBoundingBox | userSpaceOnUse

```
patternUnits = userSpaceOnUse
```

按照原图案大小进行平铺。

```
patternUnits = objectBoundingBox
```

如果希望图案的大小基于要填充对象的大小计算，则需要设置patternUnits属性为objectBoundingBox(0到1之间的小数或百分比)

demo:pattern-2.svg

```html
<svg width="1000" height="1000" xmlns ="http://www.w3.org/2000/svg">
    <!--先定义一个图案-->
    <defs>
        <pattern id="strip" patternUnits="userSpaceOnUse" x="0" y="0" width="6" height="6">
            <path d="M0 0 L6 0" style="stroke: black;fill: none"/>
        </pattern>
        <pattern id="polkadot" patternUnits="objectBoundingBox" x="0" y="0" width="0.25" height="0.25" >
            <circle cx="12" cy="12" r="12" style="fill: url(#strip);stroke: black"/>
        </pattern>
    </defs>
    <!--使用-->
    <rect x="36" y="36" width="100" height="100" style="fill:url(#polkadot);stroke: black"/>
</svg>
```

![img](https://cdn.nlark.com/yuque/0/2020/png/299719/1601090278492-cc73f2b2-0890-4ab6-be8b-6cc31e094d9d.png)

[更详细的文章（一）](https://www.w3cplus.com/svg/svg-pattern-element.html)

[更详细的文章（二）](https://www.w3cplus.com/svg/svg-pattern-attributes.html)

### 线性渐变

性渐变是一系列颜色沿着一条直线过渡，在特定的位置指定想要的颜色，被称为渐变点。

线性渐变使用linearGradient元素表示：

```html
<defs>
	<linearGradient id="linear">
		<stop offset="0%" style="stop-color:#ffcc00;"></stop>
		<stop offset="100%" style="stop-color:#0099cc;"></stop>
	</linearGradient>
</defs>
	<rect x="20" y="20" width="200" height="100" style="fill:url(#linear);stroke:black;">
	</rect>
```

![img](https://cdn.nlark.com/yuque/0/2020/webp/299719/1601090312042-7c873e57-d784-46d3-a322-44ec7b16d5cb.webp)

### 径向渐变

径向渐变的每个渐变点是一个圆形路径，从中心点向外扩散。设置方式与线性渐变大致相同。如果填充对象边界框不是正方形的，则过渡路径会变成椭圆来匹配边界框的长宽比。

径向渐变使用radialGradient元素表示：

```html
<defs>
	<radialGradient id="radial" cx="50%" cy="50%" >
		<stop offset="0%" style="stop-color:#f00;"></stop>
		<stop offset="50%" style="stop-color:#0f0;"></stop>
		<stop offset="100%" style="stop-color:#00f;"></stop>
	</radialGradient>
</defs>
<rect x="20" y="20" width="200" height="200" style="fill:url(#radial);stroke:black;"></rect>
```

![img](https://cdn.nlark.com/yuque/0/2020/webp/299719/1601090347659-dd7b49ec-3027-4c21-a353-a265242feeca.webp)



## 文本

text元素，x指定文字最左侧坐标位置，y指定**文字baseline**所处y轴位置。默认样式黑色填充、没有轮廓。

css中影响字体样式的属性同样可以作用在<text>上：font-size, font-weight, font-family, font-style, font-decoration, word-spacing, letter-spacing。

注意，**文本颜色的设置用fill**而不是color

demo:text.svg,text-base.svg

```html
 <text x="0" y="15" fill="red">I am Leon</text>
```

### 对齐

默认<text>从起始位置(x,y)开始展示。但由于在svg中无法事先知道<text>的长度，所以无法仅通过改变(x,y)让<text>的中轴或结束位置位于指定位置。

text-anchor属性可以改变(x,y)作为起始坐标的定义。

- text-anchor="start"时，(x,y)为<text>的起始坐标。
- text-anchor="middle"时，(x,y)为<text>的中轴坐标。

- text-anchor="end"时，(x,y)为<text>的结束坐标。

```html
<g style="font-size:14pt">
        <path d="M 100 10 100 100" style="stroke:gray;fill:none"></path>
        <text x="100" y="30" style="text-anchor:start">Start</text>
        <text x="100" y="60" style="text-anchor:middle">Middle</text>
        <text x="100" y="90" style="text-anchor:end">End</text>
    </g>
```

![img](https://cdn.nlark.com/yuque/0/2020/png/299719/1601101542254-09ada4c9-54df-4331-b3ae-78674799d240.png)

### tspan元素

tspan元素与html的span元素类似，可以嵌套在文本内容中，可以单独改变其内部文本内容的样式，也可以单独定位，达到换行的效果。

demo:text-tspan.svg

```html
<text x="150" y="60">
    This is <tspan font-weight="bold" fill="red"> bold and red</tspan>
</text>
```

### 属性

| 属性   | 说明                   |
| ------ | ---------------------- |
| dx,dy  | x和y方向的偏移，相对。 |
| x,y    | 进行绝对定位           |
| rotate | 旋转字符               |

都可以同时设置多个值，这些值会依次作用包裹的字母上



dx,dy

```html
<text xmlns="http://www.w3.org/2000/svg" x="240" y="120">  
    <tspan>SVG 1</tspan>  
    <tspan dx="50,10,10,0,5" dy="50,10,10,10">SVG 2</tspan> 
    <tspan x="30" y="30">SVG 3</tspan>  
  </text>
```

demo:text-tspan-absolute.svg



x,y多坐标值

```html
<text x="150,170,190,210,230" y="50,70,90,110,120">SVG Text</text>
```

demo:text-xys.svg

demo:text-wave.shtml



rotate

```html
<text  x="150" y="60" rotate="30" style="font-size:24px;">以同一个角度旋转</text>
<text  x="150" y="120" rotate="30,60,90,120,150,180,210" style="font-size:24px;">旋转每一个文字</text>
```

demo:text-rotate.svg



### 纵向文本

文本一般从左到右排列，如果需要上下排列，则需要使用writing-mode属性。

设置writing-mode属性值为tb(top to bottom)，可以将文本上下排列。

```html
<text x="10" y="20" style="fill:red;writing-mode:tb">Hello</text>
```

demo:text-tb.svg

### 文本路径

如果要使得文本沿着某条路径排列，则需要使用textPath元素。需要将文本放在textPath元素内部，然后使用textPath元素的xlink:href属性引用一个定义好的path元素。

```html
<svg >
	<path id="a1" d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="red" fill="none"/>
	<defs>
        <path id="a1" d="M10 80 Q 52.5 10, 95 80 T 180 80" />
    </defs>
    <text>
        <textPath xlink:href="#a1">文字跟随路径排版，哈哈哈哈哈~</textPath>
    </text> 
</svg>
```

demo:text-path.svg

# 

# 
