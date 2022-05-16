---
title: 内置对象
tags:
  - JavaScript
categories:
  - JavaScript
---



+ JS中的对象分为3种：内置对象、浏览器对象、自定义对象
+ 查[MDN](https://developer.mozilla.org/zh-CN/)

### Math对象

```js
Math.PI			// 圆周率
Math.random()// 生成随机数，范围[0,1)
Math.floor()/Math.ceil()// 向下取整/向上取整
Math.round()	// 取整，四舍五入
Math.abs()		// 绝对值
Math.max()/Math.min()// 求最大和最小值

Math.sin()/Math.cos()// 正弦/余弦
Math.power()/Math.sqrt() // 求指数次幂/求平方根
```

```
//1-10随机数
Math.ceil(Math.random()*1)
```



### Date对象

+ 参照时间：1970年1月1日0点UTC（世界标准时间）。

+ 构造函数

```js
new Date();//"Tue Aug 31 2021 22:14:47 GMT+0800 (中国标准时间)"
//Date构造函数的参数。返回值和new Date()相同。
//1. 毫秒数
new Date(1630418805483);
//2. 日期字符串
new Date('2021-8-31 22:06:45')
//3.年、月、日……(月份从0开始)
new Date(2021,7,31,22,06,45)
```

+ 获取当前日期的**毫秒数**

```js
var date = new Date();
date.valueOf();
date.getTime();
Date.parse(data)
//HTML5中提供的方法，有兼容性问题
Date.now();

// 不支持HTML5的浏览器，可以用下面这种方式
var now = + new Date();	
console.log(now)//1630420547076	
```

- 日期格式化方法

```javascript
var date = new Date();
date.toString()		// "Tue Aug 31 2021 22:40:41 GMT+0800 (中国标准时间)"
date.valueOf()		// 1630420647628
// 下面格式化日期的方法，在不同浏览器可能表现不一致，一般不用
date.toDateString() //"Tue Aug 31 2021"
date.toTimeString() //"22:40:41 GMT+0800 (中国标准时间)"
date.toLocaleDateString()//"2021/8/31"
date.toLocaleTimeString()//"下午10:40:41"
```

- 获取日期指定部分

```javascript
getTime()  	  // 返回毫秒数和valueOf()结果一样，valueOf()内部调用的getTime()
getMilliseconds() 
getSeconds()  // 返回0-59
getMinutes()  // 返回0-59
getHours()    // 返回0-23
getDay()      // 返回星期几 0周日   6周6
getDate()     // 返回当前月的第几天
getMonth()    // 返回月份，***从0开始***
getFullYear() //返回4位的年份  如 2016
```

### Array对象

+ 创建数组对象的两种方式

```js
//方式1：字面量方式
var arr = [1, 2, 3];
//方式2：new Array()
var arr = new Array('zs', 'ls', 'ww');
```

+ [数组操作]()

### 正则表达式对象 

[正则表达式]()

### String对象

- 创建字符串对象

```javascript
//方式1：字面量方式
var str = "Hello World";
//new String()
var str = new String('Hello World');
//方式2：获取字符串中字符的个数
console.log(str.length);//11
```

[字符串对象的常用方法]()

