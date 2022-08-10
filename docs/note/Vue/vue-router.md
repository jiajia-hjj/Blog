---
title: Vue Router
tags:
  - vue 
  - vue-router
categories:
  - vue
---

## 一、什么是前端路由

### 1.1.后端路由阶段

+ **后端渲染**：以前没有JavaScript，网页没有ajax请求，在服务器就长那个样子，在服务器就渲染好，就是最终网页，后端渲染完然后直接给前端的 
+ **后端路由**：后端处理URL和页面之间的映射关系 

### 1.2.前后端分离阶段

+  **前后端分离**：后端只负责提供数据，不提供任何界面的内容，（浏览器输入url时，是去请求静态资源服务器里的html+css+js；js代码中的ajax请求的url才是请求服务器的接口） 
+  **前端渲染** ：浏览器中显示的网页中的大部分内容，都是由前端的js代码在浏览器中执行，最终渲染出来的网页 

### 1.3.SPA/前端路由

+ 前端处理URL和页面之间的映射关系

+ SPA单页面富应用，整个网站只要只有一个html页面 
+ 前端路由和组件的关系 ：一个页面就是一个大组件 。
+ spa只有一个html，会维护一套路由关系，一个url对应一个页面，一个url对应一个组件，需要前端维护，所以也叫前端路由 

+ 地址发生改变，抽取一段代码出来，进行显示；不向服务器请求任何资源 

## 二、url的hash和html5的history

+ 改变url但页面不刷新

### 2.1.hash  

```js
//http://localhost:8080/#/  
location.hash='bbb'  http://localhost:8080/#/bbb 
```

### 2.2.html5中history 

路径变页面也变，页面刷新

- back() 前一个 URL。
- forward() 下一个 URL
- go() 某个具体页面

路径会变，但是页面不会变，页面不刷新， 本质上网页还停留在原页面 

```js
history.pushState({},'','home') 
history.replaceState({},'','home') 
```

```js
//当前：http://localhost:8080/#/
//pushState   history.pushState(对象，title,url) 
history.pushState({},'','home')   //http://localhost:8080/home
history.pushState({},'','about')   //http://localhost:8080/about
history.pushState({},'','me')   //http://localhost:8080/me  栈顶
history.bock()  http://localhost:8080/about#/
history.bock()  http://localhost:8080/home#/
//replaceState 
history.replaceState(对象，title,url)
 http://localhost:8080/#/
history.replaceState({},'','home')    http://localhost:8080/home
history.replaceState({},'','about')    http://localhost:8080/about
history.bock()  替换，不能返回
//go
history.pushState({},'','home')  // http://localhost:8080/home
history.pushState({},'','about') //http://localhost:8080/about
history.pushState({},'','me')   //http://localhost:8080/me 
history.pushState({},'','demo') //http://localhost:8080/demo
history.pushState({},'','test') //http://localhost:8080/test 
history.go(-1) ==history.back() //http://localhost:8080/demo#/
history.go(-2)   http://localhost:8080/about#/
history.go(2)   http://localhost:8080/demo#/
history.forward(1)==hiatory.go(1)   http://localhost:8080/test#/
```

## 三、基本配置

**安装**vue-router，运行在客户端也需要路由。

```cmd
npm install vue-router
```

### 3.1.创建router实例

**新建router配置文件：router/index.js，创建router实例**

```js
import Vue from 'vue'
//配置路由相关的信息
import VueRouter from 'vue-router'
//1.通过Vue.use(插件)，安装插件(使用任何插件，都必须使用Vue.use来安装这个插件)
Vue.use(VueRouter)//去执行这个插件的install方法 VueRouter.install
//定义路由
const routes=[];
//2.创建VueRouter路由实例对象
const router=new VueRouter({
  routes
})
//3.将router对象传出去，挂载到Vue实例中
export default router
```

```js
//3.挂载到Vue实例中
import router from './router'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

### **3.2.配置映射关系**

**步骤一：创建路由组件**

```html
<!--在components下创建组件 Home、About组件-->
```

**步骤二：配置组件和路径的映射关系**

```js
/******router/index.js********/
// 需要导入组件（不是懒加载）
import Home from '../components/Home'
import About from '../components/About'
//定义路由
const routes=[
    {
        path:'/ome',
        name:'Home', 
        //meta：元数据（描述数据的数据）
        meta:{
          title:'首页'
        },
        component:Home
    },
    {
        path:'/about',
        name:'About',  
        component:About
    }
];
```

**步骤三：使用路由**

```html
<!--在App.vue文件中使用路由-->
<router-link to="/home">首页</router-link>
<router-link to="/about">关于</router-link>
<router-view/>
```



### 3.3.路径问题

+ 添加路由的默认路径

```js
const routes=[
    {
        path:'',//path:'/'加不加/都可以
        //redirect重定向  把路径'',重新定义到一个方向'/home'
        redirect:'/home'
    },
]
```

+ HTML5的History模式

```js
const router=new VueRouter({
    //配置路由和组件的应用关系
    routes,
    mode:'history',//http://localhost:8080/#/home有#,是哈希值的形式，是因为默认在哈希的模式下用history去测试，不好，想用h5的history
    linkActiveClass:'active'//修改选中属性的类
})
```

### 3.4.router-link补充

+ replace：使用的是history.replaceState，页面不会又返回

+ tag：默认渲染成a标签，可以自己设。如，tag="button"

+ active-class：选中样式，但是因为每个修改太麻烦了，可以配置文件中统一修改`linkActiveClass:'active'`。

```html
<router-link to="/home" tag="button" replace active-class="active">首页</router-link> 
<router-link to="/about" replace active-class="active2">关于</router-link>
<router-view/>
<style>
  .active2{
    color: green;
  }
</style>
```

## 四、编程式跳转

+ push跳转方式，相当于hisopry.pushState()，可以执行前进退后
+ replacepush跳转方式，相当于hisopry.replaceState()，不要可以执行前进退后
+ go(n)向前或者后退多少步，相当于hisopry.go()。 history 记录不够用，就失败。

```HTML
<button @click="homeClick">点击跳转到首页</button>
<button @click="aboutClick">点击跳转关于</button>
<button @click="back">返回上一个页面</button>
<script>
    export default {
        name: "App",
        methods: {
            homeClick() {
                //push=>pushState
                 this.$router.push('/home');
                // this.$router.push({path:"/home"})
      			// this.$router.push({name:"Home"})
                
                 //replace=>replaceState
                 //this.$router.replace("/home");
                // this.$router.replace({path:"/home"})
                 //this.$router.replace({name:"Home"})
            },
            aboutClick() {
                this.$router.push('/about');
            },
            back(){
                this.$router.go(-1);
            }
        },
    };
</script>
```

### 4.1.**`$router` 和 `$route` **

+ `$router`：VueRouter的实例，路由操作对象，只写对象。可以操作，路由跳转push|go|replace。-----是路由。
+ `$route`：当前处于活跃状态的路由节点，路由信息对象，只读对象。可以获取当前路由的name|path|query|parmas等信息。---是一个路由节点。

### 4.2.重复点击报错

```js
/******router/index.js********/
// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
}
```

## 五、动态路由

+ 期望路径：http://localhost:8080/user/888

+ /user/:id  this.$route.params.id

**1、创建组件User**

```HTML
<div>
    <h1>我是User组件</h1>
    <div>我的用户id是{{ userId }}</div>
</div>
```

```js
export default {
    name: "User",
    computed:{
      userId(){
        console.log(this.$route.params);
        return this.$route.params.id
      }
    }
}
```

**2、创建映射关系**

```js
/******router/index.js********/
const routes=[
  {
    path:'/user/:id',//这个后面要带参数，router-link跳转的也应该带参，如果没带的话什么也渲染了出来，不会显示组件，路径不一致。。。多个参数的话，:id:name
    component:User
  },
];
```

**3、跳转**

```html
<!------App.vue------>
<!--http://localhost:8080/user,不会显示组件，路径不一致-->
<router-link to="/user">我的1</router-link>
<!--http://localhost:8080/user/000-->
<router-link :to="'/user/'+userId">我的2</router-link>
<!--http://localhost:8080/user/222-->
<router-link :to="{path: '/user', name: 'User', params: { id: 222 } }">我的3</router-link>
<router-view/>
<button @click="userClick1">点击跳转到我的1</button>
<button @click="userClick2">点击跳转到我的2</button>
<script>
    export default {
        name: 'App',
        data(){
            return {
                userId:000
            }
        },
        methods:{
            userClick1(){
             //this.$router.push("/user/" + this.usrId);// -> /user/000
              this.$router.push({ path: `/user/${this.userId}` }) // -> /user/000
            },
            userClick2(){
                this.$router.push({ name: "User", params: {id:888 }}) // -> /user/888
                // 不写name,这里的 params 不生效
      			//this.$router.push({ path: '/user', params: {id:this.userId }}) // -> /user
            }
            
        }
    }
</script>
```



## 六、传递参数

### 6.1.params

(具体见上，动态路由)

```js
//params传参 使用name
this.$router.push({
    name:'second',
    params: {
        name: "HHH",
        age: 0
    }
})
//params接收参数
this.name = this.$route.params.name ;
this.age = this.$route.params.age ;
```

### 6.2.query

+ 链接：/profile?name=HHH&age=0
+ 可以使用name，也可以使用path

```JS
//query传参，使用name跳转
this.$router.push({
    name:'second',
    query: {
        name: "HHH",
        age: 0
    }
})

//query传参，使用path跳转
this.$router.push({
    name:'second',
    query: {
        name: "HHH",
        age: 0
    }
})

//params接收参数
this.name = this.$route.query.name ;
this.age = this.$route.query.age ;

```

+ 具体如下

**1、创建Profile组件**

```html
<div>
    <h2>我是Profile组件</h2>
    <p>{{ $route.query.name }}</p>
    <p>{{ query.age }}</p>
</div>
```

```js
export default {
    name: "Profile",
    computed: {
        query() {
            return this.$route.query;
        },
    },
};
```

**2、映射关系**

```js
/******router/index.js********/
const Profile=()=>import('../components/Profile');
const routes=[
    {
        path:'/profile',
        component:Profile
    }
];
```

**3、跳转**

```html
<router-link to="/profile">档案1</router-link>
<router-link :to="{path:'/profile',query:{name:'HJJ',age:3}}">档案2</router-link>
<router-view/>
<button @click="profileClick1">点击跳转到我的档案1</button>
<button @click="profileClick2">点击跳转到我的档案2</button>

<script>
    export default {
        name: "App",
        methods: {
            profileClick1() {
                this.$router.push("/profile?name=LLL&age=9");
            },
            profileClick2() {
                this.$router.push({
                    path: "/profile",
                    query: {
                        name: "HHH",
                        age: 0
                    },
                });
            },
        },
    };
</script>
```

## 七、路由懒加载  

**方式一：结合Vue的异步组件和Webpack的代码分析**

```js
const Home= resolve=>{
    resolve.ensure(['../components/Home.vue'],()=>{
        resolve(require('../components/Home.vue'))
    })
}
```

**方式二：AMD**

```js
const Home= resolve=>require(['../components/Home.vue'],resolve);
```

**方式三：在ES6中**

```js
const Home=()=>import('../components/Home')
```

注：懒加载，打包后，如果有三个懒加载的话，dist/static/js文件中会多三个文件夹。

## 八、路由嵌套

**创建对应的子组件，并在路由映射中配置对应的子路由 children[]**

```js
/******router/index.js********/
//home中的组件
const HomeNews=()=>import('../components/HomeNews');
const HomeMessage=()=>import('../components/HomeMessage');
const routes=[
    {
        path: "/home",
        name: "Home",
        component: Home,
        children:[
            {
                path:'',
                redirect:'news'    
            },
            {
                path:'message',
                name:'HomeMessage',
                component:HomeMessage
            },
            {
                path:'news',
                name:'HomeNews',
                component:HomeNews
            }
        ]
    },
];
```

**在组件内部使用`<router-view>`标签**

```html
<!--在Home.vue中显示-->
<div>
    <h1>我是Home组件</h1>
    <router-link to="/home/news"> 新闻</router-link>
    <router-link to="/home/message">消息 </router-link>
    <router-view/> 
</div>
```

## 九、导航守卫

**参数**

+ **to**：即将要进入的目标路由对象；
+ **from**：当前导航即将要离开的路由对象；
+ **next** ：调用该方法后，才能进入下一个钩子函数。
  + next()：直接进to 所指路由
  + next(false)：中断当前路由
  + next({ name: 'Home' }) 、next({ path: '/home' }) ：跳转指定路由
  + next('error') ：跳转错误路由

### 9.1.全局导航守卫

+ 在路由跳转中统一处理，全局导航守卫。
+ 通俗的说：你的项目中，只要发生路由变化，守卫就会监听到发生变化

**beforeEach：前置守卫，路由跳转之前回调**

+ 应用场景，如切换或刷新页面判断用户是否已经登录。

```js
 router.beforeEach((to,from,next)=>{
   console.log(`从页面${from.path}到页面${to.path}--beforeEach`)
   next();
 });
```

**beforeResolve：解析守卫，和beforeEach类似。**

+ **区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。**（来自官网）

**afterEach：后置钩子，跳转之后进行回调。这些钩子不会接受 `next` 函数也不会改变导航本身：**

```js
router.afterEach((to, from)=>{
    console.log(`从页面${from.path}到页面${to.path}--afterEach`)
});
```

### 9.2.路由独享守卫

+ 写到指定路由内部，跳到指定路由前调用
+ 只负责这个路由

```js
const routes=[
    {
        path:'/about',
        meta:{
            title:'关于'
        },
        //路由独享守卫，跳到about页面前调用
        beforeEnter:(to,from,next)=>{
           console.log(`从页面${from.path}到页面${to.path}--about页面`)
            next();
        },
        component:About
    },

];
```



### 9.3.组件内的守卫

```js
 beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
```

### 9.4.完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 十、keep-alive

+ 保存不了状态，因为一直进入创建created，离开销毁destoyed。所以每次创建的都是新的
+ router-view :是vue-router内置组件
+ keep-alive：保持活跃状态，不要每次被创建，避免组件频繁的被创建和销毁。

### 10.1.属性

+ include：字符串或正则，只有匹配的组件才会被缓存
+ exclude：字符串或正则，任何匹配的组件都不会被缓存

 **router-view外包一层keep-alive**

```html
<keep-alive exclude="Profile,User">
    <router-view/>
</keep-alive>
```

