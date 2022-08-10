---
title: Promise
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---



### 一、基本使用

+ 用于异步操作，是一个构造函数。自己有all、reject、resolve方法。原型上有then、catch方法

+ 三种状态：
  - `pending`：初始值，不是fulfilled，也不是rejected
  - `fulfilled`：代表操作成功
  - `rejected`：代表操作失败

+ Promisse回调函数参数
  + **resolve**函数的作用：在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
  + **reject**函数的作用：在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出；

```js
function runAsync(){
    var p = new Promise((resolve, reject)=>{
        //做一些异步操作
        setTimeout(()=>{
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;            
}
runAsync().then((res)=>{
    console.log(data);//随便什么数
    //后面可以用传过来的数据做些其他操作
    //......
});


/*****************等价于*******************/
function runAsync(callback){
    setTimeout(()=>{
        console.log('执行完成');
        callback('随便什么数据');
    }, 2000);
}

runAsync((data)=>{
    console.log(data);
});
//如果有多层回调。会造成多层嵌套
```

+ 数据请求与数据处理明确的区分开来，增加了代码可读性和可维护性
+ **链式操作**，使得异步流程可以写成同步流程，解决地狱回调问题
+ 调用 then 之后返回的都是一个 Promise

```js
new Promise((resolve, reject)=>{
    // 第一次网络请求
    setTimeout(()=>{
        console.log('执行完成1');
        resolve('随便什么数据1');
    }, 2000);
}).then((res)=>{
    //第一次拿到结果的数据处理
    console.log(res);//随便什么数1
    //后面可以用传过来的数据做些其他操作
    //......
    // 第二次网络请求
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('执行完成2');
        resolve('随便什么数据2');
      },1000)
   });
    
}).then((res)=>{
    //第二次拿到结果的数据处理
    console.log(res);//随便什么数2
    //后面可以用传过来的数据做些其他操作
    //......
    return 2// 包装成 Promise.resolve(2)
}).then(res => {
    console.log(res) //2
  });


//地狱回调
setTimeout(()=>{
    console.log('第一次网络请求，执行完成1');
    setTimeout(()=>{
       console.log('第二次网络请求，执行完成2');
            setTimeout(()=>{
               console.log('第三次网络请求，执行完成3');
            },1000)
	},1000)
},1000)
```

### 二、捕捉错误

```js
//方法1：then的第二个回调
new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //假设网络请求，返回code=200、400
        var code=200
        if(code==200){
            resolve('操作成功');
        }else{
             reject('操作失败');
        }
    }, 2000);
}).then(data=>{
   console.log(data);
},err=>{
    console.log(err);     
})
//方法2：catch
new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //假设网络请求，返回code=200、400
        var code=200
        if(code==200){
            resolve('操作成功');
        }else{
             reject('操作失败');
        }
    }, 2000);
}).then(data=>{
   console.log(data);
}).catch(err=>{
    console.log(err);     
})
```

区别：

- promise.then(onFulfilled, onRejected)
  在`onFulfilled`中发生异常的话，在`onRejected`中是捕获不到这个异常的。
- promise.then(onFulfilled).catch(onRejected)
  `.then`中产生的异常能在`.catch`中捕获

### 三、Promise.resolve()

+ 可将现有对象转为Promise对象。**返回Promise实例对象**

```js
//1、参数不是具有then方法的对象，或根本就不是对象
const p1 = Promise.resolve("成功")
p1.then(res=>{
    console.log(res)//成功
})
// 等价于
const p1 = new Promise(resolve => resolve('成功'))
p1.then(res=>{
    console.log(res)//成功
})

```



```js
//2、参数是一个thenable对象
var foo = {
    then: (resolve, reject) => resolve('foo')
};
var p1 = Promise.resolve(foo);
//相当于
var p1 = new Promise((resolve, reject) => {
    foo.then(resolve, reject)
});
p1.then((str) => {
    console.log(str);//foo
})

//3、参数是一个 Promise 实例,Promise.resolve将不做任何修改、原封不动地返回这个实例。
var p= new Promise((resolve, reject) => {
     console.log('实例p')
});
var p1 = Promise.resolve(p);
p==p1//true
```

**resolve()本质作用**：

- promise是立即执行的，它创建的时候就会执行，不存在将promise推入微任务中的说法；
- resolve()是用来表示promise的状态为fullfilled，相当于只是定义了一个有状态的Promise，但是并没有调用它；
- promise调用then的前提是promise的状态为fullfilled；
- 只有promise调用then的时候，then里面的函数才会被推入微任务中；
  
  

>  参考转自：
>
> 

### 四、Promise.reject()

```js
const p1 = Promise.reject("失败")
p1.then(null,err=>{
    console.log(err)//失败
})
```



### 五、Promise.all()

+ Promise.all([p1, p2, ...])，**返回新的Promise实例对象**
+ 并行执行异步操作的能力，在所有异步操作执行完后才执行then回调。
+ promise数组中任何一个promise为reject的话，则整个Promise.all调用会立即终止。
+ 使用场景：需求场景赖于多个请求，都已经请求完才能往下做。（如预加载，都加载完后，我们再进行页面的初始化）

```js
Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve('result1');
            //reject('err1')//有一个失败的话就执行catch
        },1000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve('result2')
        },2000);
    }),
]).then(results=>{
    console.log(results);//['result1', 'result2']
    console.log(results[0]);//result1
    console.log(results[1]);//result2
}).catch(err=>{
    console.log(err);//err1
})
//输出：===>
//['result1', 'result2']
//result1
//result2
```

### 六、Promise.race()  

+ Promise.race([p1, p2, p3])  ，**返回新的Promise实例对象**
+ 哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态

```js
Promise.race([
    new Promise((resolve, reject) => {
        setTimeout(()=>{
            //resolve('result1');
            reject('err1')
        },1000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve('result2')
        },2000);
    }),
]).then(result=>{
    console.log(result);
}).catch(err=>{
    console.log(err);
})
//输出：===>
//err1
```

应用：用race给某个异步请求设置超时时间，并且在超时后执行相应的操作

```js
//请求某个图片资源
function requestImg(){
    var p = new Promise(function(resolve, reject){
        var img = new Image();
        img.onload = function(){
            resolve(img);
        }
        img.src = 'xxxxxx';
    });
    return p;
}

//延时函数，用于给请求计时
function timeout(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('图片请求超时');
        }, 5000);
    });
    return p;
}

Promise
.race([requestImg(), timeout()])
.then(function(results){
    console.log(results);
})
.catch(function(reason){
    console.log(reason);
});
```

### 七、存在的问题：

+ promise一旦新建就会立即执行，无法中途取消

+ 当处于pending状态时，无法得知当前处于哪一个状态，是刚刚开始还是刚刚结束

+ 如果不设置回调函数，promise内部的错误，就无法反映到外部
+ promise封装ajax时，由于promise是异步任务，会被延后到整个脚本同步代码执行完，并且将响应回调函数延迟到现有队列的最后，如果大量使用会大大降低了请求效率。==(见[Event Loop]())

```js
console.log(1)
new Promise((resolve)=>{
   setTimeout(()=>{//t1宏任务
        resolve(4)
       console.log(3);
   },0)
}).then(res=>{//t2微任务，本轮事件循环的结束时执行。
     console.log(res);
})
console.log(2);
/*
输出：1,2,3,4
*/
```

### 八、Promise解决回调信任问题

把一个回调传入第三方的异步函数如foo()是，可能会出现的问题：

+ 调用回调过早
+ 调用回调过晚（没调)
+ 调用回调次数过多过少
+ 未能传递所需的参数，环境
+ 吞掉可能出现的错误和异常

**Promise解决**

+ **调用过早、调用过晚**：promise的then是异步的，所以不论你调用早或者晚，状态改变的早或者晚，都要等这一轮宏任务完成后才能去执行微任务，去执行then。

+ **回调未调用**：

  + 首先，没有任何东西（包括错误）能阻止promise决议，如果你对promise注册了一个完成回调和一个拒绝回调，那么promise总会完成一个。
  + 如果你完全不决议，我们也可以设置一些机制，比如用竟态超时；

  ```js
  function timeoutPromise(delay){
      return new Promise(function(resolve,reject){
          setTimeout(function(){
              reject('timeout');
          },delay);
      });
  }
  //如果任务没有在规定时间完成，就发送一个错误信息
  Promise.race([foo(),timeoutPromise(3000)]);
  ```

+ **调用回调次数过多过少：**promise，三种状态，一旦被确定为成功或者失败，就不能再被更改。再次调用无效。
+ **未能传递参数/环境值**：在promise中，最多只能有一个决议值，如果你没有显式决议，那么这个值就是undefined，如果要传递多个值，你可以把他们封装到数组或者对象中
+ **吞掉错误或者异常**：当程序出现异常时，那么这个决议会被捕捉，使得这个决议被拒绝。





> 参考转自：
>
> [大白话讲解Promise（一）](https://www.cnblogs.com/lvdabao/p/es6-promise-1.html)
>
> [Promise.resolve()](https://segmentfault.com/a/1190000020980101)
>
> [Promise.resolve()详解](https://www.cnblogs.com/qianxiaox/p/14124551.html)
>
> [JS异步之Promise解决信任问题(一)](https://blog.csdn.net/qq_44222205/article/details/107812318)

