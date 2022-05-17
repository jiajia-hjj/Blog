## vue性能优化方法

### **1、路由懒加载的设置**

```js
const Home=()=>import('@/components/Home')
```

### 2、keep-alive 缓存页面

+ 对组件进行缓存，从而节省性能。

```html
<keep-alive exclude="Profile,User">
    <router-view/>
</keep-alive>
```

### **3、使用v-show复用dom**

### **4、v-for 遍历避免同时使用v-if**

+ [v-if和v-for的问题]()

### **5、长列表**

+ 如果列表是纯粹数据展示，不会有任何变化，就不需要数据响应

```js
//让数据就不能变
export default {
  data () {
    return {
     users:[]
    }
  },
  await created(){
      const users=await.get('/api/users')
      this.users=Object.freeze(users)
  }
}
/*
  Object.freeze()冻结对象可提升性能，冻结后，不能修改添加删除修改对象。返回被冻结的对象。
  
  当把一个普通的js对象传给 Vue 实例的  data  选项，Vue 将遍历此对象所有的属性，   并使用Object.defineProperty把这些属性全部转为 getter/setter，这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。
*/
```

+ 如果是大数据列表，可采用虚拟滚动，只渲染少部分区域的内容

  vue-virtual-scroller、[vue-virtual-scroll-list]( https://www.cnblogs.com/jiajia-hjj/p/15388319.html)
  
  

### **6、事件销毁**

+ Vue组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件

```js
created(){
   this.timer=setInterval(this.refresh,2000)//跟组件什么关系
}
beforeDestory(){
    clearInterval(this.timer)
}
```

### **7、图片懒加载**

+ vue-lazyload。[图片懒加载](https://www.cnblogs.com/jiajia-hjj/p/15379977.html)

### **8、第三方插件按需引入**

+ 像[ement-ui](https://element.eleme.cn/#/zh-CN/component/quickstart)这样的第三方组件库可以按需引入，避免体积太大

```js
//配置babel.config.js
plugins: [
    [
        "component",
        {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        }
    ]
]
```

```js
//按需引入
import Vue from 'vue'
import { Button, Icon } from 'element-ui';
Vue.use(Button)
Vue.use(Icon)
```

### **9、无状态的组件**

+ 标记为函数式组件 functional
+ [无状态的组件](https://www.cnblogs.com/jiajia-hjj/p/15381364.html)

### **10、**代码模块化

+ 独立和可复用的模块封装成单独的组件。
+ 复用性越高越好，可配置型越强越好。
+ 子组件分割出来，自己管自己的渲染。
+ 里面有动态内容，经常变，自己管自己，不会影响其他的地方。不然一个页面要重新渲染。
+ css也可以通过less和sass的自定义css变量来减少重复代码。

### **11、变量的本地化**

```js
import { heavy } from '@/utils'
export default {
    props:['start'],
    computed:{
        base(){
            return 10
        },
        result(){
            const base = this.base//不要频繁的引用this.base。定义一个变量就不会频繁的去引用这个计算属性，效率会高点。
            let result = this.start
            for(let i = 0;i <1000;i++){//后面需要频繁的操作this.base。。
                result+=heavy(base)
            }
            return result
        }
    }
}
```

### 12、打包配置优化

+ **关闭source map，开启gzip压缩。**

```js
//关闭source map
productionSourceMap:false
//开启gzip压缩。compression-webpack-plugin@5.0.1最新高版本会有问题
let CompressionPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
configureWebpack: (config) => {
    const plugins = [];
    if (IS_PROD) {
        plugins.push(
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: productionGzipExtensions,
                threshold: 10240,
                minRatio: 0.8,
            })
        );
    }
    config.plugins = [...config.plugins, ...plugins];
}
```

+ **使用cdn的方式外部加载一些资源**

  + **在externals里面设置一些不必要打包的外部引用模块**

  ```js
  chainWebpack: (config) => {
      /**忽略的大包文件
       * 属性值为引入时你自定义的名称,ELEMENT是固定的写法
       */
      config.externals({
          'vue':'Vue',
          'vue-router':'VueRouter',
          'element-ui':'ELEMENT'
      })
  }
  ```

  + **在piblic/index.html中把用到的资源通过cdn引入，[资源寻找链接](https://www.bootcdn.cn/)**

  ```html
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.2/vue-router.min.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.3/index.js"></script>
  ```

  

### 13、v-once、v-pre 

+ v-once：只渲染一次，第一次展示出来之后，不会变
+ v-pre：告诉vue不要解析这个节点内部的内容，让浪费时间

### **14、SSR 服务端渲染**

[什么是SSR服务端渲染](https://blog.csdn.net/z591102/article/details/113876857)

[实现ssr服务端渲染demo](https://www.cnblogs.com/yanxiafei/p/11346829.html)

[服务端渲染（SSR）](https://www.jianshu.com/p/b8cfa496b7ec)

