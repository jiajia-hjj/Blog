---
title: Vuex中解决不同模块命名冲突的问题namespaced: true
tags:
  - vue
  - vuex
categories:
  - vue实战
---

> [vuex 不同模块中方法同名？？？？？？](https://blog.csdn.net/cherry_vicent/article/details/122449617?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.pc_relevant_default&spm=1001.2101.3001.4242.1&utm_relevant_index=3)
>
> 当vuex不同模块中的方法名相同时，需要配置`namespaced: true`



+ 在模块中配置`namespaced: true`

+ 当`namespaced: true`如何获取使用vuex中的数据？

**state**

```js
//获取。不管为true为false
this.$store.state.home.number1
//辅助函数
...mapState({
    number1: state=>state.home.number1,
}),
```



**getters**

```js
//获取
this.$store.getters['home/total']
//辅助函数
...mapGetters({
    total:'home/total'
})
```

**mutations**

```js
//commit调用mutation更新
changeNumber1(){
   this.$store.commit('home/changeNumber1',this.number1);
}
//辅助函数
...mapMutations({
    changeNumber1: 'home/changeNumber1',
    changeNumber2: 'home/changeNumber2'
})
```

**actions**

```js
//dispatch派发actions
changeNumber1Action(){
    this.$store.dispatch('home/changeNumber1Action',this.number1)
}
//辅助函数
...mapActions({
   changeNumber1Action: 'home/changeNumber1Action',
   changeNumber2Action: 'home/changeNumber2Action'
}),
```

