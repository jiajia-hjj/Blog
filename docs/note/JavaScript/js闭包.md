---
title: 闭包
tags:
  - JavaScript
categories:
  - JavaScript
---





## **一、变量的作用域**

+ 函数内部可以直接读取全局变量

```js
function f1(){
    console.log(n);
}
var n=999;
f1(); // 999
```

+ 在函数外部无法读取函数内的局部变量

```js
function f1(){
    var n=999;
}
console.log(n); // error
```

+ 函数内部声明变量的时候，一定要使用var命令。不用的话，你实际上声明了一个全局变量

```js
function f1(){
    n=999;
}
f1();
console.log(n);  // 999
```

## **二、如何从外部读取局部变量？**

+ 函数内部的函数，可以访问外部函数的变量

```js
//f1内部的所有局部变量，f2都是可见的
function f1(){
    var n=999;
    function f2(){
        console.log(n); // 999
    }
}
```

**链式作用域**：子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

+ f2可以读取f1中的局部变量，那么只要把f2作为返回值，我们就可以在f1外部读取它的内部变量了

```js
function f1(){
    var n=999;
    function f2(){
         console.log(n);
    }
    return f2;

}
var result=f1();
result(); // 999
```

## **三、闭包的概念**

上述：f2函数，就是闭包。

**闭包函数：**声明在一个函数中的函数，叫做闭包函数。

**闭包：**一个内层函数中访问到其外层函数的作用域

本质上：闭包就是将函数内部和函数外部连接起来的一座桥梁

## **四、闭包的用途**

+ 一是可以读取函数内部的变量（见上述）
+ 二是这些变量的值始终保持在内存中

```js
function f1(){
    var n=999;
    nAdd=function(){n+=1}//全局变量。匿名函数,也是个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。
    function f2(){
         console.log(n);
    }
    return f2;
}
var result=f1();
result(); // 999
nAdd();
result(); // 1000
/*
   result==>闭包f2函数
   运行了两次，第一次的值是999，第二次的值是1000。
   这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。
   
   为什么会这样呢？
     f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制回收。
     
    理解：
   	 在某个内部函数的执行上下文创建时，会将父级函数的活动对象加到内部函数的 [[scope]] 中，形成作用域链，所以即使父级函数的执行上下文销毁（即执行上下文栈弹出父级函数的执行上下文），但是因为其活动对象还是实际存储在内存中可被内部函数访问到的，从而实现了闭包。
   
*/
```

## 五、闭包的应用

**函数作为参数被传递：**

```js
function print(fn) {
  const a = 200;
  fn();
}
const a = 100;
function fn() {
  console.log(a);
}
print(fn); // 100
```

==**注：**==**闭包，自由变量的查找，是在函数定义的地方，向上级作用域查找。不是在执行的地方。**----词法作用域，函数的作用域在函数定义的时候就决定了

**函数作为返回值被返回：**

```js
function create() {
  const a = 100;
  return function () {
    console.log(a);
  };
}
const fn = create();
const a = 200;
fn(); // 100
```

**应用实例：比如缓存工具，隐藏数据，只提供 API 。**

```js
function createCache() {
  const data = {}; // 闭包中被隐藏的数据，不被外界访问
  return {
    set: function (key, val) {
      data[key] = val;
    },
    get: function (key) {
      return data[key];
    },
  };
}

const c = createCache();
c.set("a", 100);
console.log(c.get("a")); // 100
```

**应用实例：埋点计数器**

```js
function  count()  {    
    var  num  =  0;    
    return  function ()  {        
        return  ++num    
    }
}
var  getNum  =  count();
var  getNewNum  =  count();
document.querySelectorAll('button')[0].onclick  =   function() {    
    console.log('点击加入购物车次数： ' + getNum());
}
document.querySelectorAll('button')[1].onclick  =   function() {    
    console.log('点击付款次数： ' + getNewNum());
}     
```

**应用实例：事件循环**

```js
var  lis  =  document.querySelectorAll('li');  
for  (var  i  =  0;  i  <  lis.length;  i++)  {     
    (function (j)  {                
        lis[j].onclick  =   function ()  {                    
            alert(j)                
        }            
    })(i) 
} 
//不用闭包操作都是一样的词法环境，打印出来的都是一样的值。es6用let
```



## **六、使用闭包的注意点**

+ 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

+ 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

## 七、总结

**闭包的作用**

+ 访问其他函数内部变量
+ 保护变量不被内存回收机制回收
+ 避免全局变量被污染，方便调用上下文的局部变量，加强封装性

**闭包的缺点**

+ 闭包长期占用内存，内存消耗很大，可能导致内存泄露
+ 延长作用域链

```js
function Cars(){
  this.name = "Benz";
  this.color = ["white","black"];
  this.num=1;
}

Cars.prototype.addNum = function(){
    var num = this.num; //保存一个副本到变量中
    nAdd=function(){n+=1}
    return function(){
        return num; //应用这个副本
    };
    num = null; //释放内存
};
var instance = new Cars();
console.log(instance.addNum()())
```

```js
function  showId() {
    var el = document.getElementById("app")
    el.onclick = function(){
        aler(el.id)   // 这样会导致闭包引用外层的el，当执行完showId后，el无法释放
    }
}

// 改成下面
function  showId() {
    var el = document.getElementById("app")
    var id  = el.id
    el.onclick = function(){
        aler(id)   // 这样会导致闭包引用外层的el，当执行完showId后，el无法释放
    }
    el = null    // 主动释放el
}
```

> 学习转自：
>
> [学习Javascript闭包（Closure）](https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

