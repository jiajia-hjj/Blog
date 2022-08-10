---
title: Vuex中的辅助函数
tags:
  - Vue
  - vuex
categories:
  - Vue实战
---



[mapstate-辅助函数](https://vuex.vuejs.org/zh/guide/state.html#mapstate-%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0)

## 一、mapState

+ 如果在一个组件中需要获取多个状态，通过`this.$store.state`来声明就会显得有些重复跟冗余
+ 通过`mapState`这个辅助函数可以帮助生成计算属性

在store文件中定义state

```js
// store.js
state:{
	number1:1,
	number2:2
}
```

在组件中使用mapState，放置在computed里面。

```js
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default{
	computed:{
        // 在组件通过this就可调用，不用再写this.$store.state
        //写法1：
		...mapState(['number1','number2']), 
        
        //写法2：可以定义别名
		...mapState({ 
    	     num1: state=>state.number1,
    	     number2: state=>state.number2
    	 }),
 
        
        //模块化时
        ...mapState({
            number1: state=>state.home.number1,
            number2: state=>state.home.number2,
         }),
	}
}
```



## 二、mapGetters

在store文件中定义getters

```js
//  store.js
getters:{
    total(state){
      return state.number1+state.number2
    }
},
```

在组件中使用mapGetters，放置在computed里面。

```js
computed:{
    //写法1：
    ...mapGetters(['total']),
    //写法2：  
    ...mapGetters({
      total:'total'
    }),  


    //当namespaced: true时
    ...mapGetters({
      total:'home/total'
    })
}
```

## 三、mapMutations

+ mapMutations 其实跟mapState、mapGetters 的作用是类似的，将组件中的 methods 映射为store.commit 调用。

在store文件中定义mutations

```js
//  store.js
mutations:{
    changeNumber1(state, val){
        state.number1 += val
    },
    changeNumber2(state, val){
         state.number2 += val
    },
},
```

+ 每一个mutation接受两个参数，一个是state，一个是传入值；

在组件中使用mapMutations，放置在methods里面。

```html
<template>
  <div>
    <h1>{{number1}}</h1>
    <h2 @click="changeNumber1(number1)">+{{number1}}</h2>
    <h1>{{number2}}</h1>
    <h2 @click="changeNumber2(number2)">+{{number2}}</h2>
  </div>
</template>
```

```js
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default{
  computed:{
		...mapState(['number1','number2']) 
  }
  methods:{
    //方式1:
    ...mapMutations(['changeNumber1','changeNumber2']),
    //方式2: 定义别名方式
    ...mapMutations({
       changeNumber1Alias: 'changeNumber1',
       changeNumber2: 'changeNumber2'
    }),
        
      
    //当namespaced: true时
    ...mapMutations({
        changeNumber1: 'home/changeNumber1',
        changeNumber2: 'home/changeNumber2'
    })


  }
}
```

## 四、mapActions

+ mapActions将组件中的 methods 映射为store.dispatch 调用。

在store文件中定义actions

```js
//store.js
mutations:{
    changeNumber1(state, val){
        state.number1 += val
    },
    changeNumber2(state, val){
       state.number2 += val
    },
},
actions:{
    changeNumber1Action(context,val){
        context.commit('changeNumber1',val);
    },
    changeNumber2Action(context,val){
        context.commit('changeNumber2',val);
    }
}
```

+ 每一个action接受两个参数，一个是context（上下文），一个是传入值；

在组件中使用mapActions，放置在methods里面。

```html
<template>
  <div>
    <h1>{{number1}}</h1>
    <h2 @click="changeNumber1Action(number1)">+{{number1}}</h2>
    <h1>{{number2}}</h1>
    <h2 @click="changeNumber2Action(number2)">+{{number2}}</h2>
  </div>
</template>
```

```js
// App.vue

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default{
  computed:{
		...mapState(['number1','number2']) 
  }
  methods:{
    //方式1:
    ...mapActions(['changeNumber1Action','changeNumber2Action']),
    //方式2: 定义别名方式
    ...mapActions({
        changeNumber1ActionAlias: 'changeNumber1Action',
        changeNumber2ActionAlias: 'changeNumber2Action'
     }),
    
        
    //当namespaced: true时
    ...mapActions({
        changeNumber1Action: 'home/changeNumber1Action',
        changeNumber2Action: 'home/changeNumber2Action'
     }),
        
  }
}

```



> 转自：
>
> https://blog.csdn.net/qq_42880714/article/details/108295431