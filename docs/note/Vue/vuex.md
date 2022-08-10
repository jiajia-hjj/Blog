---
title: Vuex学习笔记
tags:
  - Vue
categories:
  - Vue
---



## 一、Vuex概念

**存在的问题：**

+ 一个状态，很多个组件都想用

+ 多个组件共享一个状态，这个变量放哪个组件中都不合适

**是什么**

+ 是**状态管理模式**。
+ 简单说，需要多个组件共享的变量全部存放在一个对象中
+ 然后这个对象放在顶层的Vue实例中，其他组件可以使用
+ 如，用户的一些信息（登录状态、名称头像、位置）。商品收藏、购物车

### 1.1.单界面的状态管理

+ State—>View—>Actions—>State
  + State：状态，可以看成data中的属性
  + View：视图层，针对Sate的变化，显示不同的信息
  + Actions：用户的各种操作，如点击、输入等，导致状态变化

+ 单界面使用data就可以实现，不需要vuex

### 1.2.多界面的状态管理

+ 多个视图(View)依赖于一个状态(State)，一个状态改变了，多个视图界面需要进行更新。
+ 不同界面的的Actions，都想修改同一个状态。
+ 全局单例模式化：统一管理共享的状态，可以按照规定好的规定，进行访问修改等操作

## 二、基本使用

**安装**vuex，项目在运行起来也要用，所以不能加-dev。

```cmd
npm install vuex 
```

**新建store配置文件：store/index.js，创建store实例**

```js
import Vue from 'vue'
import Vuex from 'vuex'
// 1、安装插件
Vue.use(Vuex)
//2.创建store实例对象
const store=new Vuex.Store({
    state:{
        count:1
    },
    mutations:{  
    },
    actions:{
    },
    getters:{
    },
    modules:{
    }
})
//3.将store对象导出去，挂载到Vue实例中
export default store
```

```js
//3.挂载到Vue实例中
import store from './store'
new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
```

**其他组件中使用store保存的状态**

```
this.$store.state.属性名
```

## 三、state单一状态树

+  state这些属性都会被加到响应式系统中，而响应式系统会监听属性的变化。
+ 当属性发生变化时会通知界面中用到该属性的地方，让界面刷新

### 3.1.修改state

**方式一：直接`this.$store.state.属性名=值`的形式可以直接修改state中的值**

+ 这个方式不好，直接修改stata，devtool工具没办法跟踪。

```js
addClick(){
    this.$store.state.count++;
},
```

**方式二：通过`this.$store.commmit()`调用mutation更新修改**

+ 在devtool工具可以追踪到值的变化

```js
//组件中通过commit调用mutation更新
addClick2(){
	this.$store.commit('add')
}
```

```js
/*****store/index.js*****/
const store=new Vuex.Store({
    state:{
        counter:1,
    },
    //mutation定义
    mutations:{ 
        add(state){
            state.counter+=2
        },
    }
})
```

## 四、getters

 + getters相当于vue中的计算属性
 + 数据经过一系列变化后可以用计算属性

### 4.1.**基本使用**

```js
/*****store/index.js*****/
const store = new Vuex.Store({
    state: {
        students: [
            { id: "110", name: "HHH", age: 18 },
            { id: "111", name: "LLL", age: 24 },
            { id: "112", name: "GGG", age: 30 },
            { id: "113", name: "III", age: 10 },
        ],
    },
    getters: {
        more20stu(state) {
            return state.students.filter((s) => s.age > 20);
        },
        // getters作为参数
        more20stuLength(state, getters) {
            return getters.more20stu.length;
        },
    },
});
```

```html
<p>返回年龄大于20岁的人{{$store.getters.more20stu}}</p>
<p>年龄大于20岁的人数{{$store.getters.more20stuLength}}</p>
```

### 4.2.**传递参数**

+ 默认是不能传递参数  
+ 如果希望传递参数，那么只能让getters本身返回另一个函数

```js
/*****store/index.js*****/
getters: {
    moreAgeStu(state){
        //想让别人传参数的话是返回一个函数
        return age=>{
            return state.students.filter((s)=>s.age>age)
        }
    }
}
```

```html
<!--需求：返回大于多少岁是别人传的-->
<p>{{$store.getters.moreAgeStu(12)}}</p>
```

## 五、mutations

### 5.1.状态更新

+ 异步操作去action中做，等做完异步操作后，再去mutation中修改对应的状态

+ （基本使用见上，修改state）

### 5.2.传递参数

```js
//组件中通过commit调用mutation更新
//1、普通提交风格,只能传递一个参数
addCountClick(count) {
   this.$store.commit("addCount", count);
},
addCountClick1(count) {
    this.$store.commit("addCount1", {count });
},
//2、特殊的提交风格
addCountClick2(count){
    this.$store.commit({
        type:'addCount2',
        count,
    })
}
```

```js
/*****store/index.js*****/
mutations:{
    //1、普通提交风格
    addCount(state, count) {
      state.count += count;
    },
    addCount1(state, payload) {
      state.count += payload.count;
    },
    //2、特殊的提交风格
    addCount2(state,payload){
         state.count += payload.count
     },
}
```

### 5.3.响应式

+ state中的属性都会被添加至响应系统，可以直接及修改
+ 没有在state中属性，添加
  + Vue.set，响应式添加，界面会发生变化
  + 用新对象给旧对象复值。新对象=Object.assign({},旧对象,新增对象)；
  + `.属性`或`[属性]`，界面不会发生改变
+ 删除属性,该方式做不到响应式
  + Vue.delete，响应式删除
  + delete做不到响应式，界面不会发生改变
+ 注：发现一个小问题：.和delete，如果当前操作或操作后有个响应式一起，界面也会改变

```js
/*****store/index.js*****/
const store = new Vuex.Store({
    state: {
        info:{
            name:'aaa',
            age:18,    
            height:188
        }
    },
    mutations: {
        updateInfo(state){
            //1、state中的属性都会被添加至响应系统，可以直接及修改
            state.info.name='hhh';  
            //2、没有在state中属性，添加
            //2.1.Vue.set响应式添加,界面会发生变化
            Vue.set(state.info,'address','福州');
            //2.2.用新对象给旧对象复值
            state.info=Object.assign({},state.info,{address:'福州'})
            //2.3.'.属性'或'[属性]',界面不会发生改变
            // state.info['address']='福州';
            //3、删除属性,该方式做不到响应式
            //3.1.Vue.delete响应式删除
            Vue.delete(state.info,'age')
            // delete做不到响应式，,界面不会发生改变
            delete state.info.age

            console.log(state.info);
        }
    },
});
```

### 5.4.同步函数

+ mutation中的方法必须是同步的的
+ 在mutation中进行异步操作，界面变化了，但是devtool值没有变没记录下来，变成记录是错误的信息

```js
mutations:{
    updateInfo(state){
        //错误代码：不能在这里进行异步操作
        setTimeout(()=>{
            state.info.name='hhh'
        },1000)
    }
}
```

5.5.### 常量类型

**新建常量mutation-types.js文件，定义常量**

```js
export const INCREMENT='increment'
```

**store/index.js使用这个常量**

```js
import {INCREMENT} from "./mutation-types";
mutations: {
    [INCREMENT](state){
        state.count++
    },
}
```

**组件中使用commit调用这个常量类型函数**

```js
import {INCREMENT} from './store/mutation-types'
addClick3() {
	this.$store.commit(INCREMENT);
},
```

### 5.6.devtools

+ 通过mutation更新stata状态，devtool工具可以进行跟踪。
+ actions是用来放异步请求的，异步直接放在mutation里面，devtool没法记录哪里来的。
+ 异步操作去action中做，等做完异步操作后，在去mutation中修改对应的状态
+ devtool在使用vuex时，多页面中都来修改stata,希望可以进行跟踪，当某个界面修改错的时候，就可以跟踪到时哪里修改错了，之后进行调试更加的方便

## 六、actions

+ 异步请求需要放在actions中

**通过this.$store.dispatch调用actions更新状态**

```js
//写法1：
updateInfo1() {
    // this.$store.dispatch("aUpdateInfo", "我是payload");
    this.$store.dispatch("aUpdateInfo1", {
        message: "我是携带的信息",
        success: () => {
            console.log("里面已经完成了");
        }
    });
},
//写法2：promise的写法
updateInfo2() {
    this.$store.dispatch("aUpdateInfo2", "我是携带的信息").then((res) => {
        console.log("里面完成了提交");
        console.log(res);
    })
},    
```

**异步修改信息**

```js
/*****store/index.js*****/
const store=new Vuex.Store({
    state:{
        info:{
            name:'aaa', 
            age:18,    
            height:188 
        }
    },
    mutations:{
        updateInfo(state){
            state.info.name='hhh';
        }
    },
    actions:{  
        //写法1：
        aUpdateInfo1(context,payload){
          //1.context：上下文  这里先理解成store。
          //context.rootState:根节点状态
          console.log(context.state===context.rootState)//true,这个是相等的
          setTimeout(() => {
               
            //2.actions中值修改
            //2.1.不推荐直接这样修改，，devtool中追踪不到变化
            // context.state.info.name = "LLL"; 
            //2.2.要用mutations修改
            context.commit('updateInfo');
            console.log(payload.message);
            payload.success();
          }, 1000);
        },
         //写法2：promise的写法
        aUpdateInfo2(context,payload){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    context.commit('updateInfo');
                    resolve('请求返回的数据')
                },1000)
            })
        }
    }
})
```



## 七、modules

**定义模块a**

```js
/*****store/index.js*****/
const moduleA={
  state:{
    name:'张三'
  },
  mutations:{
    updateName(state,payload){
      state.name=payload
    }
  },
  getters:{
    fullName(state){
      return state.name+'111'
    },
    fullName2(state,getters){
      return getters.fullName+'222'
    },
    fullName3(state,getters,rootState){
      //rootState：根节点状态
      return getters.fullName2+rootState.message
    }
  },
  actions:{
    //context：上下文，这里是a模块
    aUpdateName(context){ 
      setTimeout(()=>{
        context.commit('updateName','a王五');
      },1000)
    }
  }
}
const store=new Vuex.Store({
  state:{
     message:'我是根状态中的属性',  
  }
  modules:{
    // 抽离，可以继续定义模块
    a:moduleA
  }
})
```

```HTML
<h2>------App内容：module中的内容------</h2>
<h2>{{ $store.state.a.name }}</h2>
<button @click="updateName">修改名字</button>
<h2>fullName:{{ $store.getters.fullName }}</h2>
<h2>fullName1:{{ $store.getters.fullName1 }}</h2>
<h2>fullName1:{{ $store.getters.fullName2 }}</h2>
<h2>fullName1:{{ $store.getters.fullName3 }}</h2>
<button @click="asyncUpdateName">异步修改名字</button>
<script>
export default {
  methods:{
    updateName(){
       this.$store.commit('updateName','HHH')
    },
    asyncUpdateName(){
       this.$store.dispatch('aUpdateName');
    }
  }
}
</script>
```

## 八、项目结构

+ 可以都单独抽离出来一个文件夹

```js
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//引入小仓库
import moduleA from './modules/moduleA'
const store=new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    // 抽离，可以继续定义模块
    a:moduleA
  }
})
```

