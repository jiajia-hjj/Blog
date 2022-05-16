---
title: 函数
tags:
  - JavaScript
categories:
  - JavaScript
---



## 一、定义方式

```js
//方式1：函数声明
function func () {}
//方式2：函数表达式
var func = function () {}

//方式3
var func=new Function()//es6

var sum = new Function('a', 'b', 'return a + b');
console.log( sum(1, 2) ); // 3
```

+ [new Function](https://javascript.info/new-function)

## 二、函数调用

### 2.1.调用方式

- 普通函数

```js
// 带参数的函数声明
function 函数名(形参1, 形参2, 形参...){
  // 函数体
}
// 带参数的函数调用
函数名(实参1, 实参2, 实参3);
```

- 构造函数
- 对象方法

 ### 2.2.this 指向

函数的调用方式决定了 `this` 指向的不同：

| 调用方式     | 指向（非严格模式） | 备注                         |
| ------------ | ------------------ | ---------------------------- |
| 普通函数调用 | window             | 严格模式下是 undefined       |
| 构造函数调用 | 实例对象           | 原型方法中 this 也是实例对象 |
| 对象方法调用 | 该方法所属对象     |                              |
| 事件绑定方法 | 绑定事件对象       |                              |
| 定时器函数   | window             |                              |

### 2.3.call、apply、bind

+ https://www.cnblogs.com/jiajia-hjj/p/15867092.html

## 三、函数成员

- **arguments**对象：存储了传递的**所有的实参**。不是一个数组，arguments是一个**伪数组**，可以进行遍历。
  + arguments[index]：实参集合
  
  + length：实参的个数
  + callee：引用函数本身
  
- **caller**：函数的调用者

- **length**：形参的个数

- **name**：函数的名称

```js
function func1(x, y) {
  console.log(func1.length) // 2  ==>形参的个数
  console.log(func1.name) //func1 ==> 函数的名字
  console.log(func1.caller) //函数的调用者
    
  console.log(arguments) // [10, 20, 30, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  //不需要明确指出参数名，就能访问每个实参。  
  console.log(arguments[0]);//10
  console.log(arguments[1]);//20
  console.log(arguments[2]);//30
  console.log(arguments.length);//2==>实参的个数
  console.log(arguments.callee)//函数本身
  console.log(arguments.callee === func1) //true==>函数本身
  console.log(arguments instanceof Array) //false==>w
}

function func2() {
  func1(10, 20, 30)
  console.log(func2.caller) //null
}

func2()
```

+ arguments.callee，实现匿名递归函数

```js
var sum = function (n) {
        if (1 == n) {
            return 1;
        } else {
            return n + arguments.callee(n - 1);
        }
   }
console.log(sum(6));//21
```

## 四、函数闭包

### 4.1.匿名函数

+ **匿名函数自调用**：匿名函数不能通过直接调用来执行，因此可以通过匿名函数的自调用的方式来执行

```js
(function (str) {
   console.log(123+str);
})('hello');
//123hello


var func = (function () {
    var init = function () {
      ...
    };
        console.log('21121')
    return {
        init: init
    }
}());
func.init();
```

+ 作用：(1) **防止全局变量污染**。(2) 通过匿名函数实现闭包。

### 4.2.概念

+ 有权访问**另一个函数作用域内变量**的函数都是闭包
+ 简单理解：定义在一个函数内部的函数。

### 4.3.特点

 **1、外部访问函数内部变量**

```js
function func1(){
    var n=999;
    function func2(){
        console.log(n)
    }
    return func2;
}
var result=func1();//===>转换： result=func2
result(); // 999  ===>转换：func2()

/**
func2可以访问func1内部的所有局部变量。
想要外部读取func1的内部变量，可把func2作为返回值。
**/
```

 **2、局部变量会常驻在内存中**

````js
function func1(){
    var n=1;
    var b=2;

    function func2(){
        n++
        console.log(n,b)
    }
    function func3(){
        b+=2;
    }
      }

	func3();
    return  func2, 
      
}
var result=func1();//===>转换： result=func2
result(); // 2,4  ===>转换：func2()
result(); // 3,4  ===>转换：func2()
````

 **3、可以避免使用全局变量，防止全局变量污染**

 **4、缺点：会造成内存泄漏**（有一块内存空间被长期占用，而不被释放）

+ 解决方法在退出函数之前，将不使用的局部变量全部删除。
+ 删除闭包，result= null

```js
var result=(function(){
    var n=1;
    function func2(){
        n++
        console.log(n)
    }
   function  clearVariable(){
       n=null
   }
    return {
       func2:func2, 
       clearVariable:clearVariable
    } 
})()
result.func2(); // 2
result.func2(); // 3
result.clearVariable();//清除变量
result.func2(); // 1
```

## 五、函数递归

```js
//阶乘的递归
function factorial (num) {
  if (num <= 1) {
    return 1
  } else {
    //return num * arguments.callee(num - 1)  
    return num * factorial(num - 1)
  }
}
factorial(5)//120
//注:必须要有结束递归的条件
```

**应用场景**：深拷贝、菜单树、遍历 DOM 树

## 六、重载和重写

**重载**：相同的函数名，但是函数的参数个数或类型不同。调用的时候根据函数的参数来区别不同的函数。

**覆盖**（也叫**重写**）：函数名和参数都一样，只是函数的实现体不一样。一般用于子类覆盖父类的方法。

+ js同一个作用域，出现两个名字一样的函数，后面的会覆盖前面的。js只有重写（覆盖），没有重载

```js
//重载
function add(n1,n2){
    console.log(n1+n2);
}
function add(n1,n2,n3){
    console.log(n1+n2+n3);
}
add(1,2);//NaN
add(1,2,3);//6
//重写
function text(){
    console.log('text1');
}
function text(){
    console.log('text2');
}
text();//"text2"
```

+ 可以根据arguments个数实现重载

```js
function fn(){
    switch(arguments.length){
        case 0:
            addFn(arguments.length)
            break
        case 1:
            deleteFn(arguments.length)
    }
}
function addFn(n){
    console.log(n++)
}
function deleteFn(n){
    console.log(n--)
}
fn()  // 1
fn(1) // 0
```



