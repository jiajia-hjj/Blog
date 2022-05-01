# 解决移动端 Retina 屏幕 1px 边框问题

## 一、概念

+ 设备独立像素 = CSS 像素 = 逻辑像素，DIP，单位为px。
+ 设备像素 = 物理像素，分辨率，单位为pt。
+ DPR（ 设备像素比，devicePixelRatio）= 物理像素 / 逻辑像素。

## 二、造成边框变粗的原因

+ 因为css中的1px并不等于移动设备的1px，这些由于不同的手机有不同的像素密度。
+ 在`retina`屏的手机上， `dpr`为`2`或`3`，`css`里写的`1px`宽度映射到物理像素上就有`2px`或`3px`那么宽。
+ 如iPhone6的`dpr`为`2`，物理像素`750`（x轴）,则它的逻辑像素为`375`。 也就是说，1个逻辑像素，在`x`轴和`y`轴方向，需要2个物理像素来显示，即：dpr=2时，表示1个CSS像素由4(2x2)个物理像素点组成
+ 设计稿：750px，1px边框====>物理像素
+ 我们：375px，1px边框====>CSS 像素，所以应该是0.5px边框

参考文章：[移动端开发的屏幕、图像、字体与布局的兼容适配](https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650084087&idx=1&sn=8895cffe7d04771a11f8d9736599e1f7&chksm=83db8f92b4ac06842ac2d8007322f3369c61af79b63d2505aca393b7a9b594c42d9222cf3013&token=1922545122&lang=zh_CN)

## 三、解决边框变粗的8种办法

### 1、0.5px边框

**设置0.5边框：**

```css
.border {
    border: 1px solid #999;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border {
       border-width: 0.5px;
    }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border {
       border-width: 0.333333px;
    }
}
```

**使用0.5px边框，存在的问题(兼容性问题）：**

+ iOS 8 和 OS X Yosemite 支持 0.5px 的边框。

+ retina 屏的浏览器，iOS 7 和之前版本，OS X Mavericks 及以前版本，还有 Android 设备，可能不认识0.5px的边框，将会把它解释成0px，没有边框。

**不兼容0.5px，解决方案：**

+ 通过JS 检测浏览器能否处理0.5px的边框，如果可以，给html标签元素添加个class。

```js
if (window.devicePixelRatio && devicePixelRatio >= 2) {
  var testElem = document.createElement('div');
  testElem.style.border = '.5px solid transparent';
  document.body.appendChild(testElem);
}
if (testElem.offsetHeight == 1) {
  document.querySelector('html').classList.add('hairlines');
}
  document.body.removeChild(testElem);
}
```

+ css：

```css
.border {
    border: 1px solid #999;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .hairlines .border {
        border-width: 0.5px;
    }
}
```

### 2、border-image

**优点：**兼容目前所有机型

**缺点：**

+ 修改颜色麻烦, 需要替换图片
+ 圆角需要特殊处理，并且边缘会模糊

**border-image实现：**

+ 准备一张符合你要求的border-image：

<img src="E:\04-学习\05-css\img\上下边框1px.png" style="zoom:20%;" />

+ 上下边框样式设置：

```css
.border-image-1px{
    border: 1px solid #000;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
    .border-image-1px {
        border-width:1px 0;
        -webkit-border-image: url(img/border-1.png) 2 0 stretch;
        border-image: url(img/border-1.png) 2 0 stretch;
    }
}
```

### 3、background-image

**优点：**兼容目前所有机型

**缺点：**

- 修改颜色麻烦, 需要替换图片
- 圆角需要特殊处理，并且边缘会模糊

**实现：**

+ 准备一张符合你要求的background-image
+ 然后将边框模拟在背景上，样式设置：

```css
.background-image-1px{
    background: url(img/liner-1px.png) repeat-x top left/  100% 1px,
        url(img/liner-1px.png) repeat-y top right/1px 100%, 
        url(img/liner-1px.png) repeat-x bottom left/ 100% 1px,
        url(img/liner-1px.png) repeat-y top left/1px  100%;
}
```

### 4、多背景渐变实现

**优点：**

- 可以实现单条、多条边框
- 边框的颜色随意设置

**缺点：**

- 代码量不少
- 圆角没法实现
- 多背景图片有兼容性问题

**实现：**

与background-image方案类似，只是将图片替换为css3渐变。设置1px的渐变背景，50%有颜色，50%透明。
样式设置：

```css
.background-gradient-1px {
    background:
        linear-gradient(#000, #000 100%, transparent 100%) left / 1px 100% no-repeat,
        linear-gradient(#000, #000 100%, transparent 100%) right / 1px 100% no-repeat,
        linear-gradient(#000,#000 100%, transparent 100%) top / 100% 1px no-repeat,
        linear-gradient(#000,#000 100%, transparent 100%) bottom / 100% 1px no-repeat
}
/* 或者 */
.background-gradient-1px{
    background:
        -webkit-gradient(linear, left top, right bottom, color-stop(0, transparent), color-stop(0, #000), to(#000)) left / 1px 100% no-repeat,
        -webkit-gradient(linear, left top, right bottom, color-stop(0, transparent), color-stop(0, #000), to(#000)) right / 1px 100% no-repeat,
        -webkit-gradient(linear, left top, right bottom, color-stop(0, transparent), color-stop(0, #000), to(#000)) top / 100% 1px no-repeat,
        -webkit-gradient(linear, left top, right bottom, color-stop(0, transparent), color-stop(0, #000), to(#000)) bottom / 100% 1px no-repeat
}
```

### 5、使用box-shadow模拟边框

**优点：**

- 代码量少，可以满足所有场景

**缺点：**

- 边框有阴影，颜色变浅

**实现：**
样式设置：

```css
.box-shadow-1px {
    box-shadow: inset 1px 1px 1px -1px #000,inset -1px -1px 1px -1px #000;
}
```

### 6、viewport + rem 

在`devicePixelRatio = 2` 时，输出viewport

```html
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
<!--效果等价于-->
<meta name="viewport" content="width=750, user-scalable=no"/>
```

在`devicePixelRatio = 3` 时，输出viewport

```html
<meta name="viewport" content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no">
<!--效果等价于-->
<meta name="viewport" content="width=1125, user-scalable=no"/>
```

### 7、伪类 + transform

**优点：**

- 所有场景都能满足
- 支持圆角(伪类和本体类都需要加border-radius)

**缺点：**

- 对于已经使用伪类的元素(例如clearfix)，可能需要多层嵌套

**原理：**

+ 是把原先元素的 border 去掉
+ 然后利用 :before 或者 :after 重做 border 
+ 并 transform 的 scale 缩小一半，原先的元素相对定位，新做的 border 绝对定位。

**实现：**

单条border样式设置：

```css
.scale-1px {
    position: relative;
    border: none;
}
.scale-1px:after {
    content: "";
    position: absolute;
    bottom: 0;
    background: #000;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
    transform-origin: 0 0;
}
```

四条boder样式设置:

```css
.scale-1px {
    border: 1px solid pink;
}
 /* dpr大于等于2 */
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
    .scale-1px {
        position: relative;
        margin-bottom: 20px;
        border: none;
    }
    .scale-1px:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid #000;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
    }
}
```

### 8、svg

**优点：**实现简单，可以实现圆角，

**缺点：**需要学习 `svg` 语法

**实现：**

+ 因为 `svg` 是矢量图形，它的 `1px` 对应的物理像素就是 `1px`



学习中...[svg]()

## 四、总结

综上，推荐使用：

- 伪元素 + transform 实现
- svg 实现
- 新项目可以尝试使用 `viewport` 方案





> 学习参考：
>
> [7种方法解决移动端Retina屏幕1px边框问题](https://www.jianshu.com/p/7e63f5a32636)
>
> [如何解决移动端 Retina 屏 1px 像素问题 ？](https://www.jianshu.com/p/839c788ec260)

