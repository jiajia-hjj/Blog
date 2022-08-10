---
title: ES6笔记
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---



## 兼容性

+  IE10+、 Chrome、FireFox、移动端、NodeJS（混合开发中使用，老版本中不用）

**解决不兼容办法，编译、转换**

+ 使用转换工具babel

## let和const

**var 的问题：**

+ 可以重复声明，没有报错和警告；
+ 无法限制修改
+ 没有块级作用域， `{ }`

**let 和 const：**

- 不能重复声明
- 有块级作用域，`{ }` 块内声明的，块外无效
- let 是变量，可以修改；const 是常量，不能修改。
- 注：对象中的属性值可以被修改（重新声明赋值）

**典型例子：**

```html
<input type="button" value="按钮1">
<input type="button" value="按钮2">
<input type="button" value="按钮3">
<script>
    var aBtn = document.getElementsByTagName('input')
    for (var i=0; i < aBtn.length; i++) {
        aBtn[i].onclick = function () {
            alert(i)
        }
    }
    //点击3个按钮，蹚出结果都是3。没有块级作用域的问题
    
    //解决办法一：let
    for (let i = 0; i < aBtn.length; i++) {
        aBtn[i].onclick = function () {
            alert(i)
        }
    }
    //解决办法二：函数有作用域
    for (var i = 0; i < aBtn.length; i++) {
        // 封装到函数里，限制作用域
        (function (i) {
            aBtn[i].onclick = function () {
                alert(i)
            }
        })(i)
    }

</script>
```

## 解构赋值

+ 左右两个边结构必须一样

```js
//1、数组
let [a, b, c] = [1, 2, 3, 4]
console.log(a, b, c)//1 2 3

let [a, ...b] = [1, 2, 3];
console.log(a, b)//a=>1,b=[2,3]

//2、对象
let {x, y, z} = {x: 1,z: 3,y: 2}
console.log(x, y, z)//1 2 3

let { baz : foo } = { baz : 'ddd' };
console.log(foo)//'ddd'

let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
console.log(a, b,rest)//a=>10,b=>20,rest => {c: 30, d: 40}

```

## 字符串

字符串模版

- 使用反引号，`${变量}`
- 可以折行

[字符串方法]()

## json

- 是一种用于数据交换的文本格式
- 键值对的方式，属性必须加双引号。
- JSON.parse(string) ：接受一个 **JSON 字符串**并将其转换成一个JS**对象**。
- JSON.stringify(obj) ：接受一个 JavaScript **对象**并将其转换为一个 **JSON 字符串**。

```js
//对象==>JSON 字符串
//JS对象
var person = { name: "hjj", age: 12 };
JSON.stringify(person)//'{"name":"hjj","age":12}'
//JSON对象:
var person = { "name": "hjj", "age": "12" };
JSON.stringify(person)//'{"name":"hjj","age":"12"}'
//JSON 字符串==>对象
/var str='{"name":"hjj","age":12}'
JSON.parse(str)//{name: 'hjj', age: 12}
```

## 
