## nextTick的原理

### 一、异步说明

> Vue 实现响应式并**不是数据发生变化之后 DOM 立即变化**，而是按一定的策略进行 DOM 的更新。

+ Vue 是**异步**执行 DOM 更新的。。

**异步执行运行机制：**

（1） 所有同步任务都在主线程上执行，形成一个执行栈。

（2）主线程之外，还存在一个"任务队列"。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

### 二、事件循环说明

+ Vue 在修改数据后，视图不会立刻更新，而是等**同一事件循环**中的所有数据变化完成之后，再统一进行视图更新。
+ [Event Loop](https://www.cnblogs.com/jiajia-hjj/p/15395960.html)

```html
<div id="app">
    <div>{{number}}</div>
    <div @click="handleClick">click</div>
</div>
<script src="./js/vue.js"></script>
<script>
    const app = new Vue({
        el: "#app",
        data() {
            return {
                number: 0,
            };
        },
        methods: {
            handleClick() {
                const that = this;
                for (let i = 0; i < 10; i++) {
                    this.number++;
                    //输出的是虚拟dom,内容是最新的
                    console.log(this.$el);
                    //输出真实的内容，内容都并没有变化，还是未更新的dom
                    console.log(this.$el.innerHTML);

                    //nextTick里面的代码会在DOM更新后执行--->里面的内容会在最后面输出
                    Vue.nextTick(function () {
                        console.log("nextTick获取更新后的dom");
                        console.log(that.$el.innerHTML);
                    });
                    /*
                     修改10次，值变化10次，但是视图触发只变化一次
                    */
                }
                console.log("============================");
                //输出真实的内容，内容都并没有变化，还是未更新的dom
                console.log(this.$el.innerHTML);
            },
        },
    });
</script>
```

**事件循环：**

第一个tick（本次更新循环）

1. 首先修改数据，这是同步任务。同一事件循环的所有的同步任务都在主线程上执行，形成一个执行栈，此时还未涉及DOM.

2. Vue开启一个异步队列，并缓冲在此事件循环中发生的所有数据变化。如果同一个watcher被多次触发，只会被推入队列中一次。

第二个tick(‘下次更新循环’)

+ 同步任务执行完毕，开始执行异步watcher队列的任务，更新DOM
+ Vue在内部尝试对异步队列使用原生的Promise.then和MessageChannel 方法，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。

第三个tick（下次 DOM 更新循环结束之后）

+ nexkTick的代码执行，这个时候DOM已经更新

  

**简单总结事件循环：**

+ 同步代码执行 -> 查找异步队列，推入执行栈，执行Vue.nextTick[事件循环1] ->查找异步队列，推入执行栈，执行Vue.nextTick[事件循环2]...

+ 异步是单独的一个tick，不会和同步在一个 tick 里发生，也是 DOM 不会马上改变的原因。

### 三、应用场景：

- 在Vue生命周期的`created()`钩子函数进行的DOM操作一定要放在`Vue.nextTick()`的回调函数中。
  + **原因**：是`created()`钩子函数执行时DOM其实并未进行渲染。
- 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作应该放在`Vue.nextTick()`的回调函数中。
  + **原因**：Vue异步执行DOM更新，只要观察到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变，如果同一个watcher被多次触发，只会被推入到队列中一次。