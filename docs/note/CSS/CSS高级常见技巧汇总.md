# CSS常见技巧汇总

## 1、设置input

**取消input的边框**

```css
input{
    border: none;
    outline: none;
}
```

**设置input的placeholder的样式**

```css
input::-webkit-input-placeholder {    /* Chrome/Opera/Safari */
    color: red;
}
input::-moz-placeholder { /* Firefox 19+ */  
    color: red;
}
input:-ms-input-placeholder { /* IE 10+ */
    color: red;
}
input:-moz-placeholder { /* Firefox 18- */
    color: red;
}
```

**设置input聚焦时的样式**

```css
input:focus {   
  background-color: pink;
}
```



## 2、单行和多行文本超出省略号

**单行文本出现省略号**

```css
//ellipsis
@mixin ellipsis{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.online{
    width: 100px;
    @include ellipsis;
}
```

**多行文本出现省略号**

```scss
@mixin txtline($num){
    display: -webkit-box; /*重点，不能用block等其他，将对象作为弹性伸缩盒子模型显示*/
    -webkit-box-orient: vertical; /*从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）*/
    -webkit-line-clamp: $num; /*行数，超出几行隐藏且多余的用省略号表示...*/
    line-clamp: $num;
    overflow: hidden;
}

.twoline{
    width: 100px;
    @include txtline(2);
}
```

## 3、负边距使用技巧

+ 规律: 左为负时，是左移，右为负时，是右拉。上下与左右类似

```css
*{
    margin:0;
    padding:0;
}
.wrap{
    /* 利用负值技巧进行整体移动 */
    margin-left:-6px;
}
.item{
    float:left;
    width: 20%;
    height: 300px;
    border-left:6px solid #fff;
    box-sizing: border-box;
}
```

```html
<div class="wrap">
    <div class="item" style="background-color: red;"></div>
    <div class="item" style="background-color: green;"></div>
    <div class="item" style="background-color: yellow;"></div>
    <div class="item" style="background-color: pink;"></div>
    <div class="item" style="background-color: green;"></div>
</div>
```

## 4、outline属性的妙用技巧

和border的区别: outline不计算大小 border计算大小

##  5、虚线框绘制技巧

```css
.dotted-line {
    width: 800px;
    margin: auto;
    padding: 20px;
    border: 1px dashed transparent;
    background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-45deg, red 0, #ccc .25em, white 0, white .75em);
}
```

## 6、隐藏文本的常用两种方法

```css
/*方法1：*/
text-indent: -9999px; 
/*方法2：*/
font-size: 0;
```

## 7、表格

 **表格边框合并**

```
table{
  border-collapse: collapse;
}
```

## 8、卡券效果制作

```css
.coupon {
    width: 300px;
    height: 100px;
    line-height: 100px;
    margin: 50px auto;
    text-align: center;
    position: relative;
    background: radial-gradient(circle at right bottom, transparent 10px, #ffffff 0) top right /50% 51px no-repeat,
        radial-gradient(circle at left bottom, transparent 10px, #ffffff 0) top left / 50% 51px no-repeat,
        radial-gradient(circle at right top, transparent 10px, #ffffff 0) bottom right / 50% 51px no-repeat,
        radial-gradient(circle at left top, transparent 10px, #ffffff 0) bottom left / 50% 51px no-repeat;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .2));
}
.coupon span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    color: red;
    font-size: 50px;
    font-weight: 400;
}
```

```html
<p class="coupon">
 <span>200</span>优惠券
</p>
```



持续更新中....
