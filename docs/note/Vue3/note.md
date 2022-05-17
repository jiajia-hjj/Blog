## 为什么有组合式API



目前，在使用Vue 2时可能遇到三个限制：

- **代码的可读性问题：** 当组件变得**越来越大**时，可读性变得**越来越困难**。  
  +  vue2 （ `options API` ）实现一个业务逻辑，但是代码比较分散， 可读性差，可维护性差 
  +  vue3 （`composition API` ）逻辑分明，可维护性高 

- **逻辑复用的问题：** 相同的代码逻辑很难在**多个组件**中进行复用

此时，再回到我们**最初的逻辑**中，我们通过组合式 API 解决了两个问题。

1. 我们让组件拥有了更加良好的代码组织结构
2. 我们让相同的代码逻辑在不同的组件中进行了完整的复用

**而这个就是 组合式API 的核心价值。**



##  4) 比较 Vue2 与 Vue3 的响应式(重要)

## [#](http://huaxhe.gitee.io/vue3_study_docs/chapter4/01_Composition API_常用部分.html#vue2-的响应式)vue2 的响应式

- 核心:
  - 对象: 通过 defineProperty 对对象的已有属性值的读取和修改进行劫持(监视/拦截)
  - 数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持。。。。。（改一个数组的数据需要对整个数组进行重写）

```javascript
Object.defineProperty(data, 'count', {
  get() {},
  set() {}
})
```

- 问题
  - 对象直接新添加的属性或删除已有属性, 界面不会自动更新
  - 直接通过下标替换元素或更新 length, 界面不会自动更新 arr[1] = {}  。。。。所以后面出现了一个方法叫$set()，实现响应式操作



## Vue3 的响应式

- 核心:
  - 通过 Proxy(代理): 拦截对 data 任意属性的任意(13 种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
  - 通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作
  - 文档:
    - [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
    - [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

```js
new Proxy(data, {
  // 拦截读取属性值
  get(target, prop) {
    return Reflect.get(target, prop)
  },
  // 拦截设置属性值或添加新属性
  set(target, prop, value) {
    return Reflect.set(target, prop, value)
  },
  // 拦截删除属性
  deleteProperty(target, prop) {
    return Reflect.deleteProperty(target, prop)
  }
})

proxy.name = 'tom'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Proxy 与 Reflect</title>
  </head>
  <body>
    <script>
      const user = {
        name: 'John',
        age: 12
      }

      /*
    proxyUser是代理对象, user是被代理对象
    后面所有的操作都是通过代理对象来操作被代理对象内部属性
    */
      const proxyUser = new Proxy(user, {
        get(target, prop) {
          console.log('劫持get()', prop)
          return Reflect.get(target, prop)
        },

        set(target, prop, val) {
          console.log('劫持set()', prop, val)
          return Reflect.set(target, prop, val) // (2)
        },

        deleteProperty(target, prop) {
          console.log('劫持delete属性', prop)
          return Reflect.deleteProperty(target, prop)
        }
      })
      // 读取属性值
      console.log(proxyUser === user)
      console.log(proxyUser.name, proxyUser.age)
      // 设置属性值
      proxyUser.name = 'bob'
      proxyUser.age = 13
      console.log(user)
      // 添加属性
      proxyUser.sex = '男'
      console.log(user)
      // 删除属性
      delete proxyUser.sex
      console.log(user)
    </script>
  </body>
</html>
```







Proxy ：通过Proxy对象实现普通对象变响应式对象的一个操作

需要new(目标对象，处理器)

new Proxy(target,handler)

handler各个方法内部要配合 reflect（反射对象，做反射操作）。通过反射对象，将目标对象的属性和属性值，直接返回来

reflect 内置对象 不能new 调用静态方法





效率更高  vue2中有一万个属性，要循环遍历。每个属性通过Object.defineProperty，添加get和set的方法。

vue3直接一个代理对象，调用相关的方法就可以解决

深度的检测操作











Vue2和Vue3的相比较



2020年9月发布的正式版

Vue3支持大多数的Vue2的特征

Vue中设计了一套强大的组合API代理了Vue2中的option API，复用性更强了



option API 松散。



更好的支持TS

最重要：Vue3中使用了Proxy配合Reflect代替了Vue2中的objectProperty()方法实现数据的响应式(数据代理)

重写了虚拟DOM，速度更快了。

新组件：Fragment(片段)/Teleport(瞬移)/Suspense(不确定)

设计了一个新的脚手架工具 vite









代码很松散