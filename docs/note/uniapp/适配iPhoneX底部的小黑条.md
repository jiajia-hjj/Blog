# 适配iPhoneX底部的小黑条

## 一、场景

+ 由于iPhoneX去掉了物理按键，改为了底部小黑条，这就会导致屏幕适配问题，最常见的场景就是底部fixed的元素被阻挡的情况。对于这种问题，我们一般采取css或js的处理方式（适用于h5，小程序）。

## 二、css适配方案（推荐）
**第一步：设置网页的头部标签**

```html
<meta name="viewport" content="width=device-width, viewport-fit=cover">
```

**viewport-fit**：IOS11新增的特性，是为了iPhoneX而对meta标签做出的一个拓展属性。三个值：

+ contain：可视窗口完全包含网页内容
+ cover：网页内容完全覆盖可视窗口
+ auto：默认值，跟 contain 表现一致

**注意**：适配的关键在于必须设置`viewport-fit=cover`

**第二步：将页面主体设置在安全区域内**
这一步视实际场景而定，可以不设置

```css
body {
	padding-bottom: constant(safe-area-inset-bottom);/* 兼容 iOS < 11.2 */
	padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
```
**env()** 和 **constant()**是IOS11新增的css函数：

+ 有四个预定义的变量：safe-area-inset-bottom、safe-area-inset-top、safe-area-inset-left、safe-area-inset-right，分别是安全区域到各边界的距离。
+ 横竖屏的情况不一样
+ 对于不支持这两个属性的情况，浏览器会忽略。

**注意**：constant()在IOS11.2之后是不可使用的，因此要向后兼容，即env()，且二者位置不可调换。

**第三步：设置目标元素（fixed）的高度**

+ 对于目标元素，可设置bottom、padding-bottom、margin-bottom 均可：

```css
.fixed {
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
}
```

+ 或者新增一个height = constant(safe-area-inset-bottom)空白区块亦可，方案多样。

## 三、JS适配方案
+ 通过判断机型给底部fixed元素添加padding-bottom，或者新增个空白区块。

```js
function isIphoneX(){
	return /iphone/gi.test(window.navigator.userAgent) &&
        window.devicePixelRatio &&
        window.devicePixelRatio === 3 &&
        window.screen.width === 375 &&
        window.screen.height === 812;
}
```





> 转自：
>
> [详解关于移动端兼容iPhoneX底部小黑条](https://blog.csdn.net/weixin_43989257/article/details/107304018)