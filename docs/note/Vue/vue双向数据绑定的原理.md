# vue双向绑定原理

+ 原理主要通过数据劫持和发布订阅模式实现的 
+ 通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，监听数据的变化
+ 在数据变动时发布消息给订阅者(watcher)，订阅者触发响应的回调(update)更新视图。

## 一、**什么是数据劫持**

+ 访问或者修改对象的某个属性时，都会触发相对应的函数，在这个函数里进行额外的操作或者修改返回结果。
+ 在触发函数的时候，在函数中所做的操作，就是劫持操作。

### Object.defineProperty

**语法：**

+ Object.defineProperty(obj,prop,descriptor)

**参数：**

+ obj：目标对象

+ prop：需要定义的属性或方法的名称

+ descriptor：目标属性所拥有的特性
  + **value**：属性的值
  + **writable**：如果为false，属性的值就不能被重写。
  + **get**：一旦目标属性被访问就会调回此方法，并将此方法的运算结果返回用户。
  + **set**：一旦目标属性被赋值，就会调回此方法。
  + **configurable**：如果为false，则任何尝试删除目标属性或修改属性性以下特性（writable, configurable, enumerable）的行为将被无效化。
  + **enumerable**：是否能在for...in循环中遍历出来或在Object.keys中列举出来。

**使用：**

```js
var info = {
    name:'hhh'
}
Object.keys(info).forEach(function(key){
    Object.defineProperty(info,key,{
        enumerable:true, // 是否能在for...in循环中遍历出来或在Object.keys中列举出来。
        configurable:true, // false，不可修改、删除目标属性或修改属性性以下特性
        get:function(){
            console.log('被访问了调用get');
        },
        set:function(){
            console.log('被设置了调用set');
        }
    })
})
/*
    控制台：
    输入:info.name
    打印：被访问了调用get

    输入:info.name = 'hjj'
    打印:被设置了调用set
*/
```

### **二、实现最简单的双向绑定**

```html
<div id="demo"></div>
<input type="text" id="inp">
<script>
    var info  = {};
    var demo = document.querySelector('#demo')
    var inp = document.querySelector('#inp')
    Object.defineProperty(info, 'name', {
        get: function() {
            return val;
        },
        set: function (newVal) {//当该属性被赋值的时候触发
            inp.value = newVal;
            demo.innerHTML = newVal;
        }
    })
    inp.addEventListener('input', function(e) {
        // 给obj的name属性赋值，进而触发该属性的set方法
        info.name = e.target.value;
    });
    info.name = 'hhhhh';//在给obj设置name属性的时候，触发了set这个方法
</script>
```

## 二、**vue如何实现**

### 2.1.**原理图**

![](./img/vue双向绑定原理/1.png)

### 2.2.**observer**

+ observer用来实现对每个vue中的data中定义的属性循环用Object.defineProperty()实现数据劫持，以便利用其中的setter和getter
+ 为每个属性都分配一个订阅者集合的管理者—dep，负责记录和通知订阅者
+ 当数据发生变化时发出一个notice(预告)，通知订阅者，订阅者会触发它的update方法，对视图进行更新。

### 2.3.**compile**

+ 在vue中v-model，v-bind，{{}}等都可以对数据进行显示，假如一个属性都通过这三个指令了，那么每当这个属性改变的时候，相应的这个三个指令的html视图也必须改变，

+ 于是vue中就是每当有这样的可能用到双向绑定的指令，就在一个Dep中增加一个订阅者，其订阅者只是更新自己的指令对应的数据，也就是v-model='name'和{{name}}有两个对应的订阅者，各自管理自己的地方。
+ 每当属性的set方法触发，就循环更新Dep中的订阅者。

## **三、vue代码实现**

 ### 3.1.observer实现

observer数据监听器，主要是给每个vue的属性用Object.defineProperty()实现数据劫持，监听数据的变化，如有变动可拿到最新值并通知订阅者。

```js
function defineReactive (obj, key, val) {
    //创建订阅器对象
    var dep = new Dep();
    Object.defineProperty(obj, key, {
        get: function() {
            //添加订阅者watcher到订阅器对象Dep
            if(Dep.target) {
                // JS的浏览器单线程特性，保证这个全局变量在同一时间内，只会有同一个监听器使用
                dep.addSub(Dep.target);
            }
            return val;
        },
        set: function (newVal) {
            if(newVal === val) return;
            val = newVal;
           // 作为发布者发出通知，通知后dep会循环调用各自的update方法更新视图
            dep.notify();
        }
    })
}
//遍历，对每个属性进行Object.defineProperty(),并添加至dep中,每个属性都new了一个Dep(订阅者集合的管理数组)
function observe(obj, vm) {
    Object.keys(obj).forEach(function(key) {
        defineReactive(vm, key, obj[key]);
    })
}
```

### 3.2.实现compile

compile指令解析器，对每个元素节点的指令进行扫描和解析，目的就是解析各种模板指令替换成对数据。

```js
function Compile(node, vm) {
    if(node) {
        this.$frag = this.nodeToFragment(node, vm);
        return this.$frag;
    }
}
Compile.prototype = {
    nodeToFragment: function(node, vm) {
        var self = this;
        var frag = document.createDocumentFragment();
        var child;
        while(child = node.firstChild) {
            console.log([child])
            self.compileElement(child, vm);
            frag.append(child); // 将所有子节点添加到fragment中
        }
        return frag;
    },
    compileElement: function(node, vm) {
        var reg = /\{\{(.*)\}\}/;
        //节点类型为元素(input元素这里)
        if(node.nodeType === 1) {
            var attr = node.attributes;
            // 解析属性
            for(var i = 0; i < attr.length; i++ ) {
                if(attr[i].nodeName == 'v-model') {//遍历属性节点找到v-model的属性
                    var name = attr[i].nodeValue; // 获取v-model绑定的属性名
                    node.addEventListener('input', function(e) {
                        // 给相应的data属性赋值，进而触发该属性的set方法
                        vm[name]= e.target.value;
                    });
                    new Watcher(vm, node, name, 'value');//创建新的watcher，会触发函数向对应属性的dep数组中添加订阅者，
                }
            };
        }
        //节点类型为text
        if(node.nodeType === 3) {
            if(reg.test(node.nodeValue)) {
                var name = RegExp.$1; // 获取匹配到的字符串
                name = name.trim();
                new Watcher(vm, node, name, 'nodeValue');
            }
        }
    }
}
```

### 3.3.watcher实现

作为连接Observer和Compile的一个中介点，在接收数据变更的同时，让Dep添加当前Watcher，并及时通知视图进行update。

```js
function Watcher(vm, node, name, type) {
    Dep.target = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.type = type;
    this.update();
    Dep.target = null;
}

Watcher.prototype = {
    update: function() {
        this.get();
        this.node[this.type] = this.value; // 订阅者执行相应操作
    },
    // 获取data的属性值
    get: function() {
        console.log(1)
        this.value = this.vm[this.name]; //触发相应属性的get
    }
}
```

### 3.4.实现Dep来为每个属性添加订阅者

```js
function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
        sub.update();
        })
    }
}
```

## 四、梳理

+ 首为每个vue属性用Object.defineProperty()实现数据劫持
+ 为每个属性分配一个订阅者集合的管理数组dep
+ 然后在编译的时候在该属性的数组dep中添加订阅者，v-model会添加一个订阅者，{{}}也会，v-bind也会，只要用到该属性的指令理论上都会
+ 接着为input会添加监听事件，修改值就会为该属性赋值，触发该属性的set方法
+ 在set方法内通知订阅者数组dep，订阅者数组循环调用各订阅者的update方法更新视图。





> 转自：
>
> [vue双向绑定原理分析](https://www.cnblogs.com/zhenfei-jiang/p/7542900.html)

