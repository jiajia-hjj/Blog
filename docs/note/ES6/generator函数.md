---
title: Generator
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---



## 一、相关概念

### **1.1.引入的原因**
传统的JavaScript异步的实现是通过回调函数来实现的，但是这种方式有两个明显的缺陷：

- 缺乏可信任性。例如我们发起ajax请求的时候是把回调函数交给第三方进行处理，期待它能执行我们的回调函数，实现正确的功能
- 缺乏顺序性。众多回调函数嵌套使用，执行的顺序不符合我们大脑常规的思维逻辑，回调逻辑嵌套比较深的话调试代码时可能会难以定位。

Promise恢复了异步回调的可信任性，而Generator正是以一种**看似顺序、同步的方式实现了异步控制流程**，增强了代码可读性。

### **1.2.概念**

- **Generator**(生成器)是一类特殊的函数，跟普通函数声明时的区别是加了一个*号，以下两种方式都可以得到一个生成器函数：

- **Iterator**(迭代器)：当我们实例化一个生成器函数之后，这个实例就是一个迭代器。可以通过next()方法去启动生成器以及控制生成器的是否往下执行。
- **yield/next**：这是控制代码执行顺序的。
  + **yield 表达式**，可以在**生成器**函数内部暂停代码的执行，使其挂起，此时生成器函数仍然是运行并且是活跃的，其内部资源都会保留下来，只不过是处在暂停状态。
  + **next()**，在迭代器上调用next()方法，可以使代码从暂停的位置开始继续往下执行。

```javascript
// 首先声明一个生成器函数
function *main() {
    console.log('starting *main()');
    yield; // 打住，不许往下走了
    console.log('continue yield 1');
    yield; // 打住，又不许往下走了
    console.log('continue yield 2');
}
// 构造处一个迭代器it
let it = main(); 

// 调用next()启动*main生成器，表示从当前位置开始运行，停在下一个yield处。。。。第一个next()永远是用于启动生成器
it.next(); // 输出 starting *main()

// 继续往下走
it.next(); // 输出 continue yield 1

// 再继续往下走
it.next(); // 输出 continue yield 2
```



## 二、消息传递

作用之一：**消息传递**。通过yield ...和next(...)组合使用，可以在生成器的执行过程中构成一个**双向消息传递系统**。

- 当next(..)执行到yield语句处时，会暂停生成器的执行
  + next(...)会返回一个对象。如：{value：25，done：false}
  + yield语句后面带的值会赋给value。如果yield后面不加参数，则默认yield undefined;
  + 可以将yield ...看成return ...。
- 当生成器处于暂停状态时
  + 暂停的yield表达式，可以接收**下一个**启动它的next(...)传进来的值。
  + 当next(...)使生成器继续往下执行时，其传入的值会将原来的yield语句替换掉。
  + 如果下一个next(...)，没有传值过来，暂停的yield表达式返回undefined。

==**注意:**==

- 第一个next()仅仅是用于启动生成器用的，并不会传入任何东西，如果传入了参数也会被自动忽略掉。
- 最后一个next()执行完毕之后，得到的值是生成器return出来的值，如果有，默认return undefined
- next()返回对象的属性值：
  + **value**：从yield或return处拿到的值
  + **done**：boolean值，标识生成器是否执行完毕。

例子：

```javascript
function *main() {
    let x = yield "starting";
    let y = yield (x * 2);
    console.log(x, y);
    return x + y;
}

let it = main();

let res = it.next(); // 第一个next()用于启动生成器
console.log(res); 
//输出:{value: 'starting', done: false}==>yield语句后跟的值传给了next()的对象

res = it.next(5); // 向等待的第一个yield传入值5，*main()中的 x 被赋值为5
console.log(res);
//输出:{value: 10, done: false}==> yield语句后x * 2得到了10传给next(5)运行后的对象

res = it.next(20); // 向等待的第二个yield传入值20， *main()中的x被赋值为20
//输出: 5 20==>执行后面的console.log(x, y)语句分别输出x,y的值
console.log(res); 
//输出:{value: 25, done: true}==>return ...的值传给了next(20)运行后的对象
```

异常传值的情况：

```javascript
function *main() {
    let x = yield "starting";
    let y = yield (x * 2);
    console.log(x, y);
}

let it = main();

let res = it.next('1111'); // '1111'被丢弃啦~~
console.log(res.value);  // 输出"starting"

res = it.next(); // 不给yield传值 x成了undefined
console.log(res.value); // 输出NaN （undefined * 2得到了NaN传给next()运行后的对象）

res = it.next(); // 不给yield传值 y未拿到值
// 输出undefined undefined
console.log(res.value); // 输出undefined  (默认return undefined;)
```

## 三、应用

### 3.1同步化表达

例子如：预加载

```js
function* loadUI() {
    showLoadingScreen();
    yield loadUIDataAsynchronously();
    hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next();
// 卸载UI
loader.next()
/*
第一次迭代器调用next()，显示Loading界面，并且异步加载数据。
等到数据加载完成，再一次调用next()，则会隐藏Loading界面。

这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰
*/
```

以同步的方式部署ajax操作：

```JS
function request(url) {
    makeAjaxCall(url, function(response){
        it.next(response);
    });
}
function* main() {
    //请求数据1
    var result1 = yield request("http://some.url");
    //拿到后操作数据……

    //请求数据2
    var result2 = yield request("http://some.url");
    //拿到后操作数据……
}
var it = main();
it.next();
```

### 3.2.流程控制中的应用

Generator具体是如何解决传统回调中存在的缺乏顺序性问题的呢？

需求：对请求到的数据进行+2操作。

+ **使用传统回调函数实现异步：**

```javascript
function getNum () {
    // 模拟发起ajax请求
    setTimeout(() => {//模拟返回过来的数据
        let num=1//模拟返回过来的数据
        if(num>0){
            handleTxt(num);
        }else{
            console.log(err);
        }
    }, 100);
}
function  handleNum(num) {
    let num =num+2;
    console.log(num);
}
getNum();
/*
num只能在ajax请求拿到数据之后才能运行，所以需要嵌套在请求的success回调中执行。
*/
```

+ **使用Promise实现：**

```js
function getNum() {
    // 模拟发起ajax请求
    return new Promise((resolve,reject)=>{
        setTimeout(() => {//模拟返回过来的数据
            let num=1//模拟返回过来的数据
            if(num>0){
                resolve(num);
            }else{
                console.log(err);
            }
        }, 100);
    })

}
function  handleNum(num) {
   // do something……
    let num =num+2;
    console.log(num);
}
getNum().then(res=>{
    handleNum(res)
}).catch(err=>{
     console.log(err);
});
```

+ **使用Generator实现异步：**

```javascript
function getNum() {
    // 模拟发起ajax请求
    setTimeout(()=>{
        let num = 1//模拟返回过来的数据
        if(num>0){
            it.next(num); // 将num传给yield表达式
        }else{
            console.log(err);
        }
    },1000);
}
function *handleNum() {
    try{
        let num = yield getNum();
        num =num+2;
        console.log(num);
    }
    catch(err) {
        console.log(err); // 接收错误
    }
}
let it = handleNum();
it.next(); // 启动生成器

/*
同步写法实现异步的顺序应该是，调用操作数据函数，数据哪里来的，应该写操作数据的函数中。
yield是用于在异步流程中暂停阻塞代码，它阻塞的只有生成器里面的代码，生成器外部的丝毫不受影响。
let num = yield getNum();通过yield把异步的流程完全抽离出去，实现了看似顺序同步的代码。
*/
```

### 3.4.Generator+Promise

**1.如果将Generator和Promise结合在一起使用，既让代码看起来顺序同步，又恢复了可信任性。**
 改成Generator + Promise实现：

```javascript
function getNum() {
    //把得到的promise return出去
    return new Promise((resolve,reject)=>{
        // 模拟发起ajax请求
        setTimeout(()=>{
            let num = 1//模拟返回过来的数据
            if(num>0){
                resolve(num)
            }else{
                reject(err);
            }
        },1000);
    })
}
function *handleNum() {
    try {
        let num = yield getNum();
        // do something……
        num+=2;
        console.log(num);
    }
    catch(err) {
        console.log(err); // 接收错误
    }
}

let it = handleNum();
let promise = it.next().value; // 注意，这里拿到yield出来的promise
promise.then(res => {
    it.next(res); // 拿到res传给yield表达式
}).catch((err)=>{
    it.throw(err); // 抛出错误
});
```

**2.当多个Promise并发请求时，正确的写法可以更好地提高性能。**

 例如：

```javascript
function getNum (data,time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

function *handleNum() {
	let num1=yield getNum(1,3000);//请求1获取到 num1
    console.log('num1:'+num1);
    let num2=yield getNum(2,2000);//请求2获取到 num2   
    console.log('num2:'+num2);  
    let newNum = num1+num2;               
    console.log('newNum:'+newNum);                     
    let num3=yield getNum(newNum,2000);//请求3需要依赖于前面两个请求
     console.log('num3:'+num3);                       
   
}
let it = handleNum();
it.next().value.then(res=>{
    return it.next(res).value;
}).then(res=>{
    return it.next(res).value;
}).then(res=>{
    return it.next(res).value;
}).catch(err=>{
     resolve(err);
})
/*
  生成器执行时会先发出请求1,请求1返回后才会发出请求2,请求2返回之后，再发出请求3。
  其实在这里请求1和2之间不存在依赖关系，是可以同时进行的。
*/
```

效率更高的写法：

```javascript
function getNum (data,time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

function *handleNum() {
	let num1= getNum(1,3000);//请求1获取到 num1
    let num2= getNum(2,2000);//请求2获取到 num2  
    let n1=yield num1;
    let n2=yield num2;
    let newNum = n1+n2;
    console.log('num1:'+n1);
    console.log('num2:'+n2);            
    console.log('newNum:'+newNum);                     
    let num3=yield getNum(newNum,2000);//请求3需要依赖于前面两个请求
     console.log('num3:'+num3);                       
   
}
let it = handleNum();
it.next().value.then(res=>{
    return it.next(res).value;
}).then(res=>{
    return it.next(res).value;
}).then(res=>{
    return it.next(res).value;
}).catch(err=>{
     resolve(err);
})
/*
  num1和num2可以同时进行，不会相互阻塞。
*/
```

## 五.async和await

yield + Promise的写法需要我们对拿到的promise的决议进行人工处理，区分成功或失败。async/await直接调用即可执行。[async和await]()

```javascript
function getNum() {
    //把得到的promise return出去
    return new Promise((resolve,reject)=>{
        // 模拟发起ajax请求
        setTimeout(()=>{
            let num = 1//模拟返回过来的数据
            if(num>0){
                resolve(num)
            }else{
                reject(err);
            }
        },1000);
    })
}
async function handleNum() {
    try {
        let num = await getNum(); // await会暂停在这，直到promise决议(请求返回)getNum
        // do something……
        num+=2;
        console.log(num);
    }catch(err) {
        console.log(err);
    }
}
dealData();
```

## 六.yield* 委托

> **为什么要用委托呢？**
>
> 因为，一个代码组织合理的程序中，出于功能模块化等原因，我们很可能在一个生成器中调用另外一个生成器，比如在a()中调用b()，但是通常情况下a()的实例中是无法使用next方法对b()内部进行操控的，所以这个时候我们就可以使用yield将b()委托给a()。

+ **yield*表达式**：用于在 Generator 函数内部，调用另一个 Generator 函数。实际是遍历后面的Generator函数。
+ 合理地进行生成器分离和使用委托，可以使代码可读性更强，更易维

```javascript
function *a() {
    console.log('a start');
    yield "a1";
    yield "a2";
    console.log('a end');
}
function *b() {
    console.log('b start');
    yield "b1";
    yield *a(); // 将a委托给b
    yield "b2";
    console.log('b end');
}

let it = b();
                        
console.log(it.next());//b start
                       // {value:"b1", done: false}
console.log(it.next());//a start
                       //{value:"a1", done: false}
console.log(it.next());//{value:"a2", done: false}
                      
console.log(it.next());//a end
                       //{value:"b2", done: false}
console.log(it.next());//b end
                       //{value:undefined, done: true}


/*************等价于**************/
function* b(x,y){
    console.log('b start');
    yield "b1";
    for(var value of a()){
      //console.log('value'+value) //a1  a2
      yield value;
    }
    yield "b2";
    console.log('b end');
}
```



> 参考转自：
>
> [Generator详解](https://www.jianshu.com/p/83da0901166f)
>
> [ES6系列之Generator](https://www.jianshu.com/p/6055bd421ca4)

