---
title: em和rem
tags:
  - 移动web
categories:
  - 移动web
---





### 一、rem认识

+ em rem是相对单位
+ em大小是基于父元素的字体大小
+ rem的大小是基于？
  1. 浏览器默认的字体大小是16px
  2. r 意思 root 根元素，html标签 
  3. rem的大小是基于html元素的字体大小

### 二、适配方案rem

宽度和高度都能做到适配（等比缩放）

**思路：**

+ 通过控制`html`上的字体大小，去控制页面上所有以rem为单位的基准值控制尺寸
+ 把页面上px单位转换成rem单位

**页面制作的时候 psd 上的量取的px转成rem使用，怎么换算？？？**

+ 预设一个基准值 方便计算如100px 

```css
html{
	font-size: 100px;
}
```

+ 适配的时候设置基准值  320px  50px 怎么算：（640px 100px ===320px 【50px】）

+ 换算公式：**当前rem基准值 = 预设的基准值 / 设计稿宽度 * 当前设备的宽度** 

**怎么去改变rem基准值 （js换算，媒体查询推荐）**

```css
@media (min-width: 320px) {
    html{
        font-size: 50px;
    }
}
@media (min-width: 414px) {
    html{
        font-size: 64.6875px;
    }
}
@media (min-width: 640px) {
    html{
        font-size: 100px;
    }
}
```

###  三、rem+less移动端适配

+ less用来维护适配方案

**变量**：rem适配方案不好维护  设备会更新  设计稿尺寸  预设基准值

```less
/*******variables.less********/
//适配主流设备十几种
@adapterDeviceList:750px,720px,640px,540px,480px,424px,414px,400px,384px,375px,360px,320px;
//设计稿尺寸
@psdWidth:750px;
//预设基准值
@baseFontSize:100px;
//设备的种类
@len:length(@adapterDeviceList);
```

**mixins**

```less
/*******mixins.less********/
//遍历使用的是for循环，less没有循环语法
//使用函数的迭代，根据数组的长度去停止当前循环
//给函数的执行附加条件
//需要序号来判断  通过序号遍历 @index 1 开始
//遍历成功
.adapterMixin(@index) when(@index > 0){
    @media (min-width:extract(@adapterDeviceList,@index)){
      html{
        font-size: @baseFontSize/@psdWidth * extract(@adapterDeviceList,@index);
      }
    }

  .adapterMixin(@index - 1);
}

```

+ adapter.less中调用

```less
.adapterMixin(@len);
.nav{
    padding: 10rem/@baseFontSize 15rem/@baseFontSize;
}
```

