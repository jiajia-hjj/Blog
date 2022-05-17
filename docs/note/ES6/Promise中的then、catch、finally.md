---
title: Promise中的then、catch、finally
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---



**1、`Promise`的状态一经改变就不能再改变。**

```JS
const promise = new Promise((resolve, reject) => {
    resolve("success1");
    reject("error");
    resolve("success2");
});
promise.then(res => {
    console.log("then: ", res);
}).catch(err => {
    console.log("catch: ", err);
})
/*
结果：
	"then: success1"
*/
//构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用
```

**2、`.then`和`.catch`都会返回一个新的`Promise`。**

```js
const promise1 = new Promise((resolve, reject) => {
    console.log('promise1')
    resolve('resolve1')
})
const promise2 = promise1.then(res => {
    console.log(res)
})
console.log('1', promise1);
console.log('2', promise2);
/*
结果：
    'promise1'
    '1' Promise{<resolved>: 'resolve1'}
    '2' Promise{<pending>}
    'resolve1'
*/
```



**3、`catch`不管被连接到哪里，都能捕获上层未捕捉过的错误。**

```js
const promise = new Promise((resolve, reject) => {
    reject("error");
    resolve("success2");
});
promise
    .then(res => {
    console.log("then1: ", res);
}).then(res => {
    console.log("then2: ", res);
}).catch(err => {
    console.log("catch: ", err);
}).then(res => {
    console.log("then3: ", res);
})

/*
结果：
    "catch: " "error"
    "then3: " undefined
*/
//验证了，catch不管被连接到哪里，都能捕获上层未捕捉过的错误。

//至于then3也会被执行，那是因为catch()也会返回一个Promise，且由于这个Promise没有返回值，所以打印出来的是undefined。
```



**4、在`Promise`中，返回任意一个非 `promise` 的值都会被包裹成 `promise` 对象，例如`return 2`会被包装为`return Promise.resolve(2)`。**

**5、`Promise` 的 `.then` 或者 `.catch` 可以被调用多次, 但如果`Promise`内部的状态一经改变，并且有了一个值，那么后续每次调用`.then`或者`.catch`的时候都会直接拿到该值。**

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('timer')
    resolve('success')
  }, 1000)
})
const start = Date.now();
promise.then(res => {
  console.log(res, Date.now() - start)
})
promise.then(res => {
  console.log(res, Date.now() - start)
})
/*
执行结果：
    'timer'
    'success' 1001
    'success' 1002
 如果你足够快的话，也可能两个都是1001。
*/
```

**6、`.then` 或者 `.catch` 中 `return` 一个 `error` 对象并不会抛出错误，所以不会被后续的 `.catch` 捕获。**

```js
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})
/*
执行结果：
	"then: " "Error: error!!!"

*/
//这也验证了第4点和第6点，返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))。
```

如果你抛出一个错误的话，可以用下面👇两的任意一种：

```js
return Promise.reject(new Error('error!!!'));
// or
throw new Error('error!!!')
```

**7、`.then` 或 `.catch` 返回的值不能是 promise 本身，否则会造成死循环。**

```js
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)
```

因此结果会报错：

```
Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
```




**8、`.then` 或者 `.catch` 的参数期望是函数，传入非函数则会发生值透传。**

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
//第一个then和第二个then中传入的都不是函数，一个是数字类型，一个是对象类型，因此发生了透传，将resolve(1) 的值直接传到最后一个then里。
/*
执行结果：
	1

*/
//发生了透传，p.then()中的代码依旧也是会执行的。
Promise.resolve(1)
  .then(2)
  .then(console.log(3))
  .then(console.log(4))
/*
执行结果：
	3,

*/
```





**9、`.then`方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为`catch`是`.then`第二个参数的简便写法。**

+ `Promise.resolve('1')`的值会进入成功的函数，`Promise.reject('2')`的值会进入失败的函数。

```js
Promise.reject('err!!!')
  .then((res) => {
    console.log('success', res)
  }, (err) => {
    console.log('error', err)
  }).catch(err => {
    console.log('catch', err)
  })
/*
这里的执行结果是：
	'error' 'error!!!'
*/
```

+ 它进入的是`then()`中的第二个参数里面，而如果把第二个参数去掉，就进入了`catch()`中：

```js
Promise.reject('error!!!')
    .then((res) => {
    console.log('success', res)
}).catch(err => {
    console.log('catch', err)
})
/*
这里的执行结果是：
	'catch' 'error!!!'
*/
```

+ 但是有一个问题，如果是这个案例呢？

```js
Promise.resolve()
    .then(function success (res) {
    throw new Error('error!!!')
}, function fail1 (err) {
    console.log('fail1', err)
}).catch(function fail2 (err) {
    console.log('fail2', err)
})
//由于`Promise`调用的是`resolve()`，因此`.then()`执行的应该是`success()`函数，可是`success()`函数抛出的是一个错误，它会被后面的`catch()`给捕获到，而不是被`fail1`函数捕获。
/*
因此执行结果为：
	fail2 Error: error!!!
*/
```

**10、`.finally`方法也是返回一个`Promise`，他在`Promise`结束的时候，无论结果为`resolved`还是`rejected`，都会执行里面的回调函数。**

+ `.finally()`方法不管`Promise`对象最后的状态如何都会执行
+ `.finally()`方法的回调函数不接受任何的参数，也就是说你在`.finally()`函数中是没法知道`Promise`最终的状态是`resolved`还是`rejected`的
+ 它最终返回的默认会是一个**上一次的Promise对象值**，不过如果抛出的是一个异常则返回异常的`Promise`对象。

来看看这个简单的例子：

```js
Promise.resolve('1').then(res => {
    console.log(res)
}).finally(() => {
    console.log('finally')
})

Promise.resolve('2').finally(() => {
    console.log('finally2')
    return '我是finally2返回的值'
}).then(res => {
    console.log('finally2后面的then函数', res)
})
/*
执行结果为：
'1'
'finally2'
'finally'
'finally2后面的then函数' '2'
*/
```

`finally`中抛出的是一个异常：

```js
Promise.resolve('1')
  .finally(() => {
    console.log('finally1')
    throw new Error('我是finally中抛出的异常')
  })
  .then(res => {
    console.log('finally后面的then函数', res)
  })
  .catch(err => {
    console.log('捕获错误', err)
  })
/*
执行结果为：
'finally1'
'捕获错误' Error: 我是finally中抛出的异常
*/
//但是如果改为return new Error('我是finally中抛出的异常')，打印出来的就是'finally后面的then函数 1'
```

看一个比较难的例子：

```js
function promise1 () {
  let p = new Promise((resolve) => {
    console.log('promise1');
    resolve('1')
  })
  return p;
}
function promise2 () {
  return new Promise((resolve, reject) => {
    reject('error')
  })
}
promise1()
  .then(res => console.log(res))
  .catch(err => console.log(err))
  .finally(() => console.log('finally1'))

promise2()
  .then(res => console.log(res))
  .catch(err => console.log(err))
  .finally(() => console.log('finally2'))
```

执行过程：

- 首先定义了两个函数`promise1`和`promise2`，先不管接着往下看。
- `promise1`函数先被调用了，然后执行里面`new Promise`的同步代码打印出`promise1`
- 之后遇到了`resolve(1)`，将`p`的状态改为了`resolved`并将结果保存下来。
- 此时`promise1`内的函数内容已经执行完了，跳出该函数
- 碰到了`promise1().then()`，由于`promise1`的状态已经发生了改变且为`resolved`因此将`promise1().then()`这条微任务加入本轮的微任务列表(**这是第一个微任务**)
- 这时候要注意了，代码并不会接着往链式调用的下面走，也就是不会先将`.finally`加入微任务列表，那是因为`.then`本身就是一个微任务，它链式后面的内容必须得等当前这个微任务执行完才会执行，因此这里我们先不管`.finally()`
- 再往下走碰到了`promise2()`函数，其中返回的`new Promise`中并没有同步代码需要执行，所以执行`reject('error')`的时候将`promise2`函数中的`Promise`的状态变为了`rejected`
- 跳出`promise2`函数，遇到了`promise2().catch()`，将其加入当前的微任务队列(**这是第二个微任务**)，且链式调用后面的内容得等该任务执行完后才执行，和`.then()`一样。
- OK， 本轮的宏任务全部执行完了，来看看微任务列表，存在`promise1().then()`，执行它，打印出`1`，然后遇到了`.finally()`这个微任务将它加入微任务列表(**这是第三个微任务**)等待执行
- 再执行`promise2().catch()`打印出`error`，执行完后将`finally2`加入微任务加入微任务列表(**这是第四个微任务**)
- OK， 本轮又全部执行完了，但是微任务列表还有两个新的微任务没有执行完，因此依次执行`finally1`和`finally2`。

结果：

```
'promise1'
'1'
'error'
'finally1'
'finally2'
```

+ 可以理解为**链式调用后面的内容需要等前一个调用执行完才会执行。**

+ 就像是这里的`finally()`会等`promise1().then()`执行完才会将`finally()`加入微任务队列，其实如果这道题中你把`finally()`换成是`then()`
  



> 转自：
>
> https://juejin.cn/post/6844904077537574919



```js
//promise抛出错误可以继续往下执行
function promise1 () {
  let p = new Promise((resolve,reject) => {
    console.log('promise1');
    reject('1')
  })
  console.log(1111111)
  return p;
}
promise1();

/*
promise1
VM566:6 1111111
Promise {<rejected>: '1'}
VM574:7 Uncaught (in promise) 1
*/


//如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。
async function promise1 () {
  let p = await new Promise((resolve,reject) => {
    console.log('promise1');
    reject('1')
  })
  console.log(1111111)
  return p;
}
promise1();

/*
promise1
Promise {<rejected>: '1'}
VM574:7 Uncaught (in promise) 1
*/
```

