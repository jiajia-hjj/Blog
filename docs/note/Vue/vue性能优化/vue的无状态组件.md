# Vue无状态组件

## 一、什么是状态和实例？

+ **Vue 状态**：是确定组件行为的对象。 Vue 状态决定了组件的渲染方式或动态方式。

+ Vue 实例：是一个 ViewModel，它包含的选项包括表示元素的模板、要安装的元素、方法和初始化时的生命周期钩子。

## 二、无状态组件

+ 函数式组件、功能组件。

+ **理解函数式编程？**创建的函数**不依赖于**或**可以改变**任何外部状态。因此，对于给定的输入，它们总是返回相同的输出。

+ **函数组件**是没有状态的组件，并且可以更改它。函数组件输出总是基于给定的输入。
+ 在 Vue 方面，这类组件会根据给定的props给出不同的输出。

## 三、特点

+ 只是可执行的函数，接受一些prop并根据其提供输出。
+ 没有生命周期方法
+ 完全无状态(无响应式数据)
+ 无实例(无this上下文)
+ **优点：**只是函数，所以渲染开销低。

## 四、函数式组件语法

根据官方文档，功能组件如下所示：

```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```

## 五、创建函数式组件

**1、将模板指定为functional**

```html
<template functional>
  <div> 函数/无状态组件 </div>
</template>
```

**2、将脚本指定为functional**

```js
export default {
  functional: true,
  props: {
    // ...
  },
  render(createElement, context) {
    return createElement(
      'div', '函数/无状态组件'
    )
  }
}		
```

## 六、渲染函数处理 

+ 创建组件的第二种方式，

### 6.1.createElement

+ 创建虚拟dom

+ [createElement参数](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)

```js
const h1=createElement('h1','是h1标签'); //创建 <h1>是h1标签</h1>虚拟dom标签
const a=createElement('a',{
    attrs: {
        class: 'btn',
        href: '#sec'
    }
},'按钮a'); //创建 <a class="btn" href="#sec">按钮a</a>虚拟dom标签
return createElement("div",[h1,a]);//h1和a标签放到div中
```

### 6.2.context

+ props：提供所有 prop 的对象
+ children: VNode 子节点的数组
+ slots: 一个函数，返回了包含所有插槽的对象
+ scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
+ data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
+ parent：对父组件的引用
+ listeners: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
+ injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。

### 6.3.创建函数是组件

**新建Example.js文件夹 ，通过使用渲染函数，创建自己的虚拟 DOM，而无需使用 Vue 模板。**

```js
/*******Example.js*****/
export default {
    functional: true,
    props:{
        brands:{
            type:Array,
            default:[]
        }
    },
    render(createElement, context) {
        const h1 = createElement('h1','是example.js文件');
        let liArr=[]
        context.props.brands.forEach((item,index)=> {
            const li = createElement('li', {
                class:'li'+index
            },item)
            liArr.push(li)
        });

        const ul = createElement('ul',liArr);

        return createElement("div",[h1,ul]);
    }
};
```

**App.vue引入**

```html
<Example :brands ="['0', '1', '2', '3']" />
<script>
import Example from './components/Example'
export default {
  components: {
    Example
  }
}
</script>
```

**效果**

![](./img\脚本函数式组件.png)





> 学习转自：
>
> [官方文档](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)
>
> [在 Vue.js 中使用无状态组件](https://www.cnblogs.com/moluy/p/14092424.html)
>
> [Vue 中的无状态组件](https://www.cnblogs.com/qianxiaox/p/13831058.html)