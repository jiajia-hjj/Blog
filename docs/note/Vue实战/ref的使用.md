---
title: ref的使用
tags:
  - Vue
categories:
  - Vue实战
---



## 一、普通元素绑定ref ，获取dom元素

+ document.querySelector('.wrapper')这种方式获取dom不好。很多的地方可能都叫wrapper,不准确。

+ 普通元素上添加属性ref

```html
<div ref="dd">ddddd</div>
```

+ 获取使用

```js
 console.log(this.$refs.dd);//获取dom
```

## 二、组件绑定ref，获取组件对象

+ 组件上添加属性ref

```html
<cpn ref="aa"></cpn>
```

+ 获取使用

```js
console.log(this.$refs.aa);//获取组件对象，可以操作使用组件对象的属性和方法
console.log(this.$refs.aa.name);//获取组件对象的属性
this.$refs.aa.showToast();//调用属性上的方法
```

