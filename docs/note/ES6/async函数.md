---
title: async
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---





本质：**async 函数就是 Generator 函数的语法糖。**

## 一、基本使用

+ **async关键字**，表明函数是一个异步函数。
+  **await 表达式**，只能在async内部使用。

### 返回值

+ 返回值是Promise对象。

```js
async function helloAsync(){
    return "helloAsync";
}
  
console.log(helloAsync())  // Promise {<resolved>: "helloAsync"}
 
helloAsync().then(v=>{
   console.log(v);         // helloAsync
})
```

### **await 表达式**

**await针对所跟不同表达式的处理方式：**

+ Promise 对象：await 会暂停执行，等待 Promise 对象 resolve，然后恢复 async 函数的执行，并返回处理结果。
+ 非 Promise 对象：直接返回对应的值。

await后跟Promise 对象：

```js
function testAwait (txt,time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(txt);
    }, time);
  });
}
 
async function helloAsync() {
  var x = await testAwait ("hello world",3000);
  console.log('x'+x); 
  var y= await testAwait ("hhhhhh",2000);
  console.log('y'+y); 
}
helloAsync ();
/**
    输出：
    xhello world
    yhhhhhh
**/
```

await后跟非 Promise 对象：

```js
async function asyncFun1() {
    var x=await new Promise((resolve,reject)=>{
        setTimeout(()=>{
           console.log(1);
            resolve(11);
        },3000)
    })
    await console.log(x);
    await  setTimeout(()=>{
        console.log(2)
    },2000)
    await  setTimeout(()=>{
        console.log(3)
    },1000)
    await console.log(4)
}
asyncFun1();
//输出：1 11 4 3 2
```

await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

```js
function testAwait (txt,time) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(txt=='HHH'){
                reject('错误')
            }else{
                resolve(txt);
            }
        }, time);
    });
}
async function helloAsync() {
    try{
        var x = await testAwait ("hello world",3000);
         console.log('x'+x); 
         var y= await testAwait ("HHH",2000);
         console.log('y'+y); 
    }catch(err){
        console.log(err);
    }
}
helloAsync ();
/**
    输出：
     xhello world
     错误
**/
/********************等价于******************/
async function helloAsync() {
    var x = await testAwait ("hello world",3000).then(res=>{
        console.log('x'+res); 
        //return res
    }).catch(err=>{
        console.log(err);
    });

    var y= await testAwait ("HHH",2000).then(err=>{
        console.log('y'+res); 
    }).catch(err=>{
        console.log(err);
    });
    console.log('x'+x,'y'+y); 
    /*
    x:undefined y:undefined
    ===>x：使用then中没有return的话。x就为undefined
    */
}
helloAsync ();

```

### 应用

```js
function request(url,data) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {//请求
            if(res.code==200){
                resolve(res);
            }else{
                reject(err);
            }
        }, time);
    });
}
async function main() {
    try{
        //请求数据
        var result = await request("/url");
        //拿到后操作数据
        //....
    }catch(err){
         //错误处理操作....
          console.log(err)
    }
    
}
main();

```

## 二、async 函数的优点

### 2.1.对比于Generator

**内置执行器：**

+ 调用Generator函数不会立即执行，而是返回迭代器对象。需要手动执行迭代器对象(next())。
+ 使用async函数可以像使用普通函数一样，直接调用即可执行。

**语义化更强：**

+ Generator用星号表示声明的函数是生成器函数，yield 暂停执行

+ async关键字表示是一个异步的函数，await表示需要等待执行。相对于yield表达式，语义化更强。

**返回值是Promise：**

+ Generator函数的返回值是Iterator对象。
+ async函数返回值是Promise对象，可以使用then方法来指定下一步的操作。

### 2.2.对比于Promise

+ 把每次异步返回的结果,在最外面就可拿到（await表达返回值），不需要链式调用，只要用同步的写法就可以了。更加直观，而且更适合处理并发调用的问题。

### 总结

+ async和generator函数主要就是为了解决异步的并发调用使用的 ，async相比promise的链式调用，传参更加方便，异步顺序更加清晰

  

> 参考：
>
> [深入浅出ES6教程『async函数』](https://www.jianshu.com/p/631f9406c4e0) 

