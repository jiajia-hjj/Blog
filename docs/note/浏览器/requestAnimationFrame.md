---
title: requestAnimationFrame
tags:
  - 浏览器
  - js
categories:
  - 浏览器
  - js
---



### requestAnimationFrame

+ 帧动画

**1、与 setTimeout、setInterval的优势主要有两点：**

+ 每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
+ 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。

**2、停止requestAnimationFrame**

```js
var rafId = requestAnimationFrame(animloop);
//如果left等于50 停止动画
if(left == 50){
	cancelAnimationFrame(rafId)
}
```

**3、改变频率**

```js
//频率，一般每秒60Hz,改成15Hz
var fps = 15;
//一帧执行的时间
var fpsInterval = 1000 / fps;
//当前执行时间
var nowTime = 0;
//上一帧执行的时间
var lastTime =  Date.now();

(function animloop() {
    //记录当前时间
    nowTime = Date.now()
    // 当前时间-上一帧执行的时间>fpsInterval，那么执行动画，并更新上次执行时间
    if(nowTime-lastTime > fpsInterval){
        lastTime = nowTime
        render();//执行某个操作
    }
    requestAnimationFrame(animloop);
})()
```

**4、兼容性**

```js
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
```

