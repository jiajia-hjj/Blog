---
title: Promise中的all和race
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---



### 4. Promise中的all和race

`.all()`的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。

`.race()`的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。

#### 4.1 Promise.all中没有异常

我们知道如果直接在脚本文件中定义一个`Promise`，它构造函数的第一个参数是会立即执行的，就像这样：

```
const p1 = new Promise(r => console.log('立即打印'))
```

控制台中会立即打印出 “立即打印”。

因此为了控制它什么时候执行，我们可以用一个函数包裹着它，在需要它执行的时候，调用这个函数就可以了：

```js
function runP1 () {
    const p1 = new Promise(r => console.log('立即打印'))
    return p1
}
runP1() // 调用此函数时才执行
```

现在来构建这么一个函数：

```js
function runAsync (x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
    return p
}
```

该函数传入一个值`x`，然后间隔一秒后打印出这个`x`。

如果我用`.all()`来执行它会怎样呢？

```js
function runAsync (x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
    return p
}
Promise.all([runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log(res))
```

先来想想此段代码在浏览器中会如何执行？

没错，当你打开页面的时候，在间隔一秒后，控制台会同时打印出`1, 2, 3`，还有一个数组`[1, 2, 3]`。

```
1
2
3
[1, 2, 3]
```

所以你现在能理解这句话的意思了吗：**有了all，你就可以并行执行多个异步操作，并且在一个回调中处理所有的返回数据。**

`.all()`后面的`.then()`里的回调函数接收的就是所有异步操作的结果。

而且这个结果中数组的顺序和`Promise.all()`接收到的数组顺序一致！！！

> 有一个场景是很适合用这个的，一些游戏类的素材比较多的应用，打开网页时，预先加载需要用到的各种资源如图片、flash以及各种静态文件。所有的都加载完后，我们再进行页面的初始化。

#### 4.2  Promise.all中有异常

我新增了一个`runReject`函数，它用来在`1000 * x`秒后`reject`一个错误。

同时`.catch()`函数能够捕获到`.all()`里最先的那个异常，并且只执行一次。

会怎样执行呢 ？

```js
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
function runReject (x) {
  const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
  return p
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

执行结果

```
// 1s后输出
1
3
// 2s后输出
2
Error: 2
// 4s后输出
4
```

`.catch`是会捕获最先的那个异常，在这道题目中最先的异常就是`runReject(2)`的结果。

另外，如果一组异步操作中有一个异常都不会进入`.then()`的第一个回调函数参数中。

注意，为什么不说是不进入`.then()`中呢 🤔️？

哈哈，大家别忘了`.then()`方法的第二个参数也是可以捕获错误的：

```
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res), 
  err => console.log(err))
```

#### 4.3 Promise.race中没有异常

`race`，比赛，赛跑的意思。

所以使用`.race()`方法，它只会获取最先执行完成的那个结果，其它的异步任务虽然也会继续进行下去，不过`race`已经不管那些任务的结果了。

```js
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log('result: ', res))
  .catch(err => console.log(err))
```

执行结果为：

```
1
'result: ' 1
2
3
复制代码
```

> 这个race有什么用呢？使用场景还是很多的，比如我们可以用race给某个异步请求设置超时时间，并且在超时后执行相应的操作

#### 4.4 Promise.race中有异常

```JS
function runAsync(x) {
  const p = new Promise(r =>
    setTimeout(() => r(x, console.log(x)), 1000)
  );
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log("result: ", res))
  .catch(err => console.log(err));
```

遇到错误的话，也是一样的，`runReject(0)`最先执行完，所以进入了`catch()`中：

```
0
'Error: 0'
1
2
3
```

#### 总结

- `Promise.all()`的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
- `.race()`的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
- `Promise.all().then()`结果中数组的顺序和`Promise.all()`接收到的数组顺序一致。
- `all和race`传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被`then`的第二个参数或者后面的`catch`捕获；但并不会影响数组中其它的异步任务的执行。





> 转自：
>
> https://juejin.cn/post/6844904077537574919