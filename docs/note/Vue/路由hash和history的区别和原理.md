---
title: HashRouter 和 HistoryRouter 的区别和原理
tags:
 - Vue
categories:
 - Vue
---



+ vue - router 默认 hash 模式，还有一种是history 模式。

## 原理

**1、 hash 路由：**

+ hash 模式的工作原理是 `hashchange` 事件，可以在 window 监听 hash 的变化。

+ 在 url 后面随便添加一个`＃xx` 触发这个事件。 

+ Vue-router 默认的是 hash 模式一 使用 URL 的 hash 来模拟一个完整的 URL ，于是当 URL 改变的时候，页面不会重新加载，也就是单页应用了

+ 当＃后面的 hash 发生变化，不会导致浏览器向服务器发出请求，浏览器不发出请求就不会刷新页面，并且会触发 hasChange 这个事件，通过监听 hash 值的变化来实现更新页面部分内容的操作

+ 对于 hash 模式会创建 hashHistory 对象，在访问不同的路由的时候，会发生两件事：
  + HashHistory.push()将新的路由添加到浏览器访问的历史的栈顶
  + HasHistory.replace()替换到当前栈顶的路由

**2、 history 路由：**

+ 主要使用HTML5的 pushState()和 replaceState()这两个 api 结合 **window.popstate** 事件（监听浏览器前进后退）来实现的
+ pushState()可以改变 url 地址且不会发送请求， replaceState (）可以读取历史记录栈，还可以对浏览器记录进行修改

## 区别

1、 hash 模式较丑， history 模式较优雅

2、 pushState 设置的新 URL 可以是与当前 URL 同源的任意 URL ；而 hash 只可修改＃后面的部分，故只可设置与当前同文档的 URL 。

3、 pushState 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发记录添加到栈中。

4、 pushState 通过 stateObject 可以添加任意类型的数据到记录中；而 hash 只可添加短字符串。

5、 pushState 可额外设置 title 属性供后续使用。

6、 hash 兼容IE8以上， history 兼容E10以上。
7、 history 模式需要后端配合将所有访问都指向 index . html ，否则用户刷页面，会导致404错误

使用方法：

```js
// hash路由原理***************************        
// 监听hashchange方法        
window.addEventListener('hashchange',()=>{            
    div.innerHTML = location.hash.slice(1)        
})        
// history路由原理************************       
// 利用html5的history的pushState方法结合window.popstate事件（监听浏览器前进后退）       
function routerChange (pathname){            
    history.pushState(null,null,pathname)            
    div.innerHTML = location.pathname       
}        
window.addEventListener('popstate',()=>{            
    div.innerHTML = location.pathname        
})
```

## vue中如何监听HistoryRouter的变化的

**通过浏览器的地址栏来改变切换页面，前端实现主要有两种方式：**

+ 1、通过 hash 改变，利用 window . onhashchange 监听。

+ 2、 HistoryRouter通过 history 的改变，进行 js 操作加载页面。

**问题：**然而 history 并不像 hash 那样简单，因为 history 的改变，除了浏览器的几个前进后退（使用 `history.back()、history.forward()和 history.go()`方法来完成在用户历史记录中向后和向前的跳转。）等操作会主动触发 popstate 事件， **pushState、replaceState 并不会触发 popstate 事件**，要解决 history 监听的问题，方法是：

首先完成一个**订阅﹣发布模式**，然后**重写 history.pushState ,history.replaceState ，并添加消息通知**，这样一来只要 history 的无法实现监听函数就被我们加上了事件通知，只不过这里用的不是浏览器原生事件，而是通过我们创建的 `event-bus` 来实现通知，然后触发事件订阅函数的执行。

具体操作如下：

1、订阅﹣发布模式示例

```js
class  Dep  {  // 订阅池    
    constructor(name){        
        this.id = new Date() //这里简单的运用时间戳做订阅池的ID        
        this.subs = []       //该事件下被订阅对象的集合    
    }    
    defined(){              // 添加订阅者        
        Dep.watch.add(this);    
    }   
    notify() {              //通知订阅者有变化        
        this.subs.forEach((e, i) => {            
            if(typeof e.update === 'function'){                
                try {                  
                    e.update.apply(e)  //触发订阅者更新函数                
                } catch(err){                    
                    console.warr(err)                
                }           
            }        
        })    
    }
}
Dep.watch = null;
class Watch {    
    constructor(name, fn){        
        this.name = name;       //订阅消息的名称        
        this.id = new Date();   //这里简单的运用时间戳做订阅者的ID        
        this.callBack = fn;     //订阅消息发送改变时->订阅者执行的回调函数         
    }    
        add(dep) {             //将订阅者放入dep订阅池       
            dep.subs.push(this);    
        }    
    update() {//将订阅者更新方法        
        var cb = this.callBack; //赋值为了不改变函数内调用this        
        cb(this.name);            
    }
} 
```

2、重写history方法，并添加window.addHsitoryListener事件机制

```js
var  addHistoryMethod  =   (function() {  
    var  historyDep  =  new  Dep();        
    return  function(name)  {  
        if (name  ===  'historychange') {                
            return  function(name,  fn) {                    
                var  event  =  new  Watch(name,  fn)                     
                Dep.watch  =  event;                    
                historyDep.defined();                    
                Dep.watch  =  null; //置空供下一个订阅者使用                
            }            
        } else if(name === 'pushState' || name === 'replaceState') {      
            var method = history[name];                
            return function(){ 
                method.apply(history, arguments);                    
                historyDep.notify();                

            }            
        }        
    }
}())
window.addHistoryListener = addHistoryMethod('historychange');
history.pushState =  addHistoryMethod('pushState');
history.replaceState =  addHistoryMethod('replaceState');
```

