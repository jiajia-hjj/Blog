---
title: JS语句
tags:
  - JavaScript
categories:
  - JavaScript
---



## 一、分支结构

### 1.1.switch语句

基本语法:

```javascript
switch (expression) {
  case 常量1:
    语句;
    break;
  …
  case 常量n:
    语句;
    break;
  default:
    语句;
    break;
}
```

==**注：**==

+ **break**：可以省略，如果省略，代码会继续执行下一个case。
+ default ：关键词规定不存在 case 匹配时所运行的代码。
+ switch 语句在比较值时使用的是**全等操作符**, 因此不会发生类型转换（如，字符串'10' 不等于数值 10）

案例：判断周末

```js
switch (new Date().getDay()) {
    case 4:
    case 5:
        text = "周末快到了：）";
        break; 
    case 0:
    case 6:
        text = "今天是周末~";
         break;
    default: 
        text = "期待周末！";
} 
```

## 二、循环结构

### 2.1.while语句

基本语法：

```js
// 先判断，当满足条件，进入循环
while (循环条件) {
  //循环体
}
```

代码示例：计算1-100之间所有数的和

```javascript
var i = 1;
var sum = 0;
// 判断条件
while (i <= 100) {
  // 循环体
  sum += i;
  // 自增
  i++;
}
console.log(i,sum);//101 5050
```

### 2.2.do...while语句

基础语法：

```javascript
//先做循环，直到不满足条件，结束循环
//所以不管条件成不成立，都会执行一次。
do {
  // 循环体;
} while (循环条件);
```

代码示例：

```javascript
// 初始化变量
var i = 1;
var sum = 0;
do {
  sum += i;//循环体
  i++;//自增
} while (i <= 100);//循环条件
console.log(i,sum);//101 5050
```

### 2.3.for语句

基础语法：

```javascript
for (初始化表达式1; 判断表达式2; 自增表达式3) {
  // 循环体4
}

//for...in,遍历对象
for(var key in obj) {
  console.log(key + "==" + obj[key]);
}
```

代码示例：

```js
var sum = 0;
for (var i = 0; i <= 100; i++) {
 sum += i;//循环体
}
console.log(i,sum);//101 5050
```

### 2.4.continue和break

+ **break：**立即跳出整个循环，即循环结束，开始执行循环后面的内容（直接跳到大括号）

+ **continue：**立即跳出当前循环，继续下一次循环（跳到i++的地方）

