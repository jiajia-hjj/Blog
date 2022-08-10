---
title: Vuex刷新页面state数据消失
tags:
  - vue
  - vuex
categories:
  - vue实战
---



## 一、Vuex

- 一个状态管理的插件，可以解决不同组件之间的数据共享和数据持久化，解决组件之间同一状态的共享问题。
- Vuex优势：相比sessionStorage，存储数据更安全，sessionStorage可以在控制台被看到。
- Vuex劣势：在刷新页面后，vuex会重新更新state，所以，存储的数据会丢失。

## 二、实际问题

- 在vue项目中，使用Vuex做状态管理时，调试页面时，刷新后state上的数据消失了，该如何解决？
- 解决思路：将state中的数据放在浏览器sessionStorage和localStorage

## 三、解决办法一：存储到localStorage/sessionStorage

- 通过监听页面的刷新操作，即beforeunload前存入本地localStorage,页面加载时再从本地localStorage读取信息
- 在App.vue中加入下面代码，以localStorage为例：

```js
created(){
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{    		localStorage.setItem("messageStore",JSON.stringify(this.$store.state))
                                              })

    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("messageStore") &&this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
}
```

**问题1：又需要使用localStorage/sessionStorage，为什么不直接使用localStorage/sessionStorage，要使用vuex呢**

+ vuex中的变量是响应式的，而localStorage和sessionStorage都不是响应式
+ 当你改变vuex中的状态，组件会检测到改变，而localStorage和sessionStorage就不会了，页面要重新刷新才可以看到改变
+ 所以应让vuex中的状态从localStorage/sessionStorage中得到，这样组件就可以响应式的变化

**问题2：存储到localStorage/sessionStorage的区别**

+ sessionStorage，关闭窗口，数据消失
+ localStorage，关闭窗口，数据也还在，除非将它移除

## 四、解决办法二：使用vuex-persistedstate 插件

**安装插件：** npm install vuex-persistedstate

**配置：**在vuex初始化时候，作为组件引入。

```js
/******store/index.js******/
import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
    //...
    //没有设置是存储所以数据
    plugins: [createPersistedState()]
})
```

**设定存储特定数据：**

```js
plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(data) {
        return {
            // 设置只储存state中的address
            address: data.address
        }
    }
})]
```

**自定义存储方式：**

+ `vuex-persistedstate`默认存储到`localStorage`。

+ **需要使用`sessionStorage`的情况**

```javascript
plugins: [
    createPersistedState({ 
        storage: window.sessionStorage 
    })
]
```

+ **使用`cookie`的情况**
  + 需要安装cookies插件

```javascript
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})
```

## 五、解决办法三：使用vuex-along 插件

**安装插件：** npm install vuex-along 

**配置：**在vuex初始化时候，作为组件引入。

```js
import createVuexAlong  from 'vuex-along'
export default new Vuex.Store({
    //...
    //没有设置是存储所以数据
	plugins: [createVuexAlong ()]
})

```

**自定义存储方式：**

+ `vuex-along`默认存储到`localStorage`

```js
plugins: [
    createVuexAlong ({
        name: "hello-vuex-along", // 设置保存的集合名字，避免同站点下的多项目数据冲突
        local: {
            list: ["address"],
            isFilter: true // 过滤模块 address数据， 将其他的存入 localStorage
        },
        session: {
            list: ["address.city"] // 保存 address.city到 sessionStorage
        }
        //如果对于sessionstorage不进行任何操作，也可将session设为false
    })
]
```





> 学习转自：
>
> [vuex-persistedstate](https://www.npmjs.com/package/vuex-persistedstate)
>
> [vuex-along](https://www.npmjs.com/package/vuex-along) 
>
> [vuex-along解决vuex中存储的数据在页面刷新之后失去的问题](https://blog.csdn.net/weixin_45977625/article/details/108836697)
>
> [vuex持久化 vuex-persistedstate](https://www.jianshu.com/p/c22861ec5f21)

 