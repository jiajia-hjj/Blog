---
title: 箭头函数
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---



### 一、写法

- 如果只有一个参数，`()` 可以省
- 如果只有一条语句，`return`，`{}`可以省

```js
let fn=v=>v+v;
fn(1);//2
//相当于
let fn=function (v){
    return v+v;
}
```

+ 当省略{}和return时，如果返回的内容是一个对象，对象需要用括号（）括起来:

```dart
()=>({name:"hjj"});
```

### 二、特点

**1.箭头函数不能用于构造函数**

**2.箭头函数没有prototype属性**

```js
var F = () => {};
console.log(F.prototype); // undefined
```

**3.箭头函数不绑定arguments**

```js
var fn = () => {
  console.log(arguments);//报错
};
fn(8);
```

```js
//面试题：
function foo() {
    var f = (i) => arguments[0]+i;//arguments是foo中色
    return f(2);
}
console.log(foo(1)); // 3
```

**4.箭头函数不绑定this**

+ 箭头函数中的this指向的是定义时的this，而不是执行时的this。也就是说箭头函数没有自己的this，其内部的this绑定到它的外围作用域。
+ 对象内部的箭头函数若有this，则指向对象的外围作用域

```js
//面试题
window.color = "red";
//let 声明的全局变量不具有全局属性，即不能用window.访问
let color = "green";
let obj = {
    color: "blue",
    getColor: () => {
        return this.color;//this指向window
    }
};
let sayColor = () => {
    return this.color;//this指向window
};
obj.getColor();//red
sayColor();//red
```

**5.箭头函数无法使用 call（）或 apply（）来改变其运行的作用域。**

```js
//面试题
window.color = "red";
let color = "green";
let obj = {
　　color: "blue"
};
let sayColor = () => {
　　return this.color;
};
sayColor.apply(obj);//red
```



> 转自：[es6箭头函数的理解及面试题](https://www.jianshu.com/p/a416cb02e4a2)

