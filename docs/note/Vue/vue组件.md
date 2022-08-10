---
title: vue组件
tags:
  - Vue
categories:
  - Vue
---



## 一、基本使用

```html
<div id="app">
    <!--3、使用组件-->
    <my-cpn></my-cpn>
</div>
<script>
    //1.创建组件构造器
    const cpnC= Vue.extend({
        template:`
            <div>
                <h2>我是cpnC的标题</h2>
            </div>
			`
    })
    //2、注册组件 Vue.component('组件的标签名',组件构造器)
    Vue.component('cpn',cpnC);
    //3、使用组件
    const app=new Vue({
        el:'#app'
    })
</script>
```

### 1.1.全局组件和局部组件

全局组件

```js
 Vue.component('cpn',cpnC);
/***********等价于**********/
 Vue.component('cpn',{
     template:`
        <div>
        	<h2>我是cpnC的标题</h2>
        </div>
        `
 });
```

局部组件

```js
const app=new Vue({
    el:'#app'
    components:{
        // cpn使用组件时的组件名，cpnC组件构造器
        cpn:cpnC
    }
})
/***********等价于**********/
const app=new Vue({
    el:'#app'
    components:{
        // cpn使用组件时的组件名，cpnC组件构造器
        cpn:{
            template:`
                <div>
                    <h2>我是cpnC的标题</h2>
                </div>
               `  		
		}
    }
})
```

### 1.2.模板的分类写法

+ script标签，注意：类型必须是text/x-template

```html
<script type="text/x-template" id="cpn">
    <div>
      <h2>我是cpn的标题</h2>
    </div>
</script>
```

+ template标签

```html
<template id="cpn">
    <!--子组件很多标签，必须有个根节点-->
    <div>
      <h2>我是cpn的标题</h2>
    </div>
</template>
```

+ 使用

```js
Vue.component('cpn',{
    template:'#cpn'
});
```

### 1.3.手脚架中的写法

+ 创建组件，.vue文件

```html
<template>
    <div>
        <h1>我是ChildA组件</h1>
    </div>
</template>

<script>
    export default {
        name: "ChildA",
    };
</script>


<style scoped>
</style>

```

+ 父组件导入并使用

```html
<template>
    <div id="app">
        <!--3、template中引入组件-->
        <child-a></child-a>
    </div>
</template>

<script>
    //1、import导入
    import ChildA from "./components/ChildA.vue";
    //2、components 中加上组件名
    export default {
        name: "App",
        components: {
            ChildA,
        }
    };
</script>
```



## 二、数据的存放

+ 子组件不能直接访问父组件
  + 组件是一个单独功能模块的封装：这个模块有属于自己的html模板，也有自己的数据data。
  + 即使能直接访问父组件，所有数据放父组件中，父组件就会变得很臃肿
+ 子组件有自己的data，必须是个函数，这个函数返回一个对象，对象内部保存这数据。

+ **为什么data必须是一个函数**

  + 一个组件可以被多次引用。

  + Object是引用数据类型，如果data是个对象，每个组件的data 指向同一个地址，一个数据改变了其他也改变了。
  + data是一个函数时，每次调用都重新return一个新的对象，没有相互影响。

  ````js
  /*********是个对象***************/
  var Component= function() {
  }
  Component.prototype.data = {//是同一个对象,内存地址一样
    a: 1,
    b: 2
  }
  // 使用组件
  var component1 = new Component()
  var component2 = new Component()
  component1.data.b = 3
  component2.data.b   //3
  /*********是个函数***************/
  var Component= function() {
  }
  Component.prototype.data = function() {
    return { //  不是同一个对象，内存地址不一样
       a: 1,
       b: 2
    }
  }
  // 使用组件
  var component1 = new Component()
  var component2 = new Component()
  component1.data.b = 3
  component2.data.b   // 2
  ````

## 三、组件通信

[组件通信]()

## 四、slot的使用

[slot的使用]()

