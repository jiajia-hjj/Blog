### 一.认识

+   一个使用 [Vue.js](https://vuejs.org/) 开发所有前端应用的框架 ，编写一套代码 ， 可发布到iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。 
+   环境|编辑器：HBuulderX
    + 全局查找： ctrl+alt+f 
    + 整理代码： ctrl+k 
+  开发文档：https://uniapp.dcloud.io/ 

### 二.项目目录

+ components：uni-app组件目录，放可复用的组件   
+ pages：业务页面文件存放的目录 
+ static： 存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此  
+ App.vue：应用配置，用来配置App全局样式以及监听 [应用生命周期](https://uniapp.dcloud.io/frame?id=应用生命周期)  
+ main.js：Vue初始化入口文件  
+ mainfest.json：配置应用名称、appid、logo、版本等打包信息，[详见](https://uniapp.dcloud.io/collocation/manifest)  
+ pages.json：对uniapp进行全局配置，决定页面文件的路径、窗口样式、原生导航栏、底部的原生tabbar等[详见](https://uniapp.dcloud.io/collocation/pages)
+ uni.scss：定义样式变量。如$global-color:#FFAA00;

### 三.开发规范

+ 为了实现多端兼容，综合考虑编译速度、运行性能等因素，uni-app约定如下开发规范：
+ 页面文件遵循Vue单文件组件(SFC)规范
+ 组件标签靠近小程序规范
+ 接口能力(JS API)靠近微信小程序规范，但需要前缀wx替换为uni
+ 数据绑定及事件处理同Vue.js规范，同时补充了App及页面的生命周期
+ 为兼容多端运行，建议使用flex布局进行开发

+ 注意：
  + 小程序不支持v-on="$listeners"
  + tarbar的页面展现一次后就保留在缓存中，再次切换tabbar页面。只能触发每个页面的onShow，不会再触发onLoad
  + 顶部的tarbar仅仅微信小程序支持

### 四.生命周期

+ 生命周期的概念：一个对象从创建、运行、销毁的整个过程被称为生命周期。
+ 生命周期函数：再生命周期中每个阶段会伴随着每一个函数的触发，这些函数被称为生命周期函数。

##### 4.1.应用的生命周期

+ onLaunch：uniapp初始化完成时触发，全局只触发一次
+ onShow：uniapp启动，或从后台进入前台显示
+ onHide：从前台进入后台
+ onError：报错触发

##### 4.2.页面的生命周期

+ onLoad：监听页面加载，其参数为上个页面传递的数据，参数类型为Object(用于页面传参)
+ onShow：监听页面显示，页面每次出现屏幕上触发，包括从下级页面返回
+ onReady：监听页面初次渲染完成
+ onHide：监听页面隐藏

##### 4.3.组件的生命周期

+ beforeCreate：实例已经开始初始化了，但是页面还没初始化完成
+ created：实例创建完成,但是不代表组件已经挂载到页面上-----一般进行数据初始化
+ beforeMount：开始挂载之前被调用，组件还没渲染到页面上
+ mounted：组件渲染到页面上调用，操作dom可以再mounted中操作
+ beforeUpdate：数据更新时调用，发生在虚拟DOM打补丁之前
+ updated：由于数据更新导致的徐宁DOM重新渲染和补丁，在这之后会调用改钩子
+ beforeDestroy：组件销毁之前
+ destroyed：组件销毁了,调用后Vue实例指示的所有东西都会解绑定。所有的事件监听会被移除，所有的子实例也会被销毁，可用于清除定时器

### 五.样式

+ 样式引入：@import url("./a.css");

+ 使用scss,需要安装插件：工具->插件安装。<style lang="scss"></style>

+ 不能使用*选择器

+ page相当于body

+ uni-app支持使用字体图标，使用方式与普通web项目相同，需注意：

  + 字体文件小于40kb，uni-app会自动将其转化成base64格式；
  + 字体文件大于40kb，需开发者自己转化，否则使用将不生效；
  + 字体文件的引用路径推荐使用~@开头的绝对路径。

  ```css
  @font-face{
     font-family:test1-icon;
     src:url('~@/static/iconfont.ttf')
  }
  ```

+ 在组件上直接设置样式，小程序不生效

### 六. 路由与页面跳转 

+ navigateTo： 保留当前页面，跳转到应用内的某个页面 。

+ redirectTo： 关闭当前页面，跳转到应用内的某个页面。 

+ reLaunch: 关闭所有页面，打开到应用内的某个页面。 

+ switchTab： 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。

+ navigateBack： 关闭当前页面，返回上一页面或多级页面。可通过 `getCurrentPages()` 获取当前的页面栈，决定需要返回几层。 

+ 跳转到 tabBar 页面只能使用 switchTab 跳转 

  

### 七.页面中路径问题

+ static使用相对路径H5页面中会出错；
+ https://www.cnblogs.com/nanyang520/p/11758187.html 
+ 在components下的组件，图片路径用 /static/img/back.png 这样的根路径形式，不要用../static 或者 ../../static 的形式，不然很坑，有些平台不报错也不显示，有些找不到路径。 
+ 小程序标签中直接$store.state.phone不支持



+ 引入组件

```js
import login from '@/components/test/test'
```



+ 

### 八.条件编译跨端兼容

+ **写法：**以 #ifdef 或 #ifndef 加 **%PLATFORM% ** 开头，以 #endif 结尾。 

  - \#ifdef：if defined 仅在某平台存在
  - \#ifndef：if not defined 除了某平台均存在
  -  **%PLATFORM%**：平台名称 

+    APP-PLUS：App ； APP-PLUS-NVUE ： App nvue ； H5 ： H5 ； 

     MP-WEIXIN ： 微信小程序 ； MP-ALIPAY : 支付宝小程序 ； MP-BAIDU ： 百度小程序 ；

  ​    MP-TOUTIAO ： 字节跳动小程序 ； MP-QQ ： QQ小程序 ； MP-360 ： 360小程序 ；

  ​    MP ： 微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序 ；

```js
// #ifdef  %PLATFORM%
平台特有的API实现
// #endif
```

```html
<!--  #ifdef  %PLATFORM% -->
平台特有的组件
<!--  #endif -->
```

```css
/* #ifdef  %PLATFORM%  */
平台特有样式
/*  #endif  */
```

### 九.网络请求函数的封装

+ 在小程序中网络相关的API在使用前需要配置域名白名单

+ 封装成promise形式

```js
 // 发起 HTTPS 网络请求
 const BASE_URL='http://10.0.16.62'
 export const request=(options)=> {
	return new Promise((resolve,reject)=>{
		uni.request({
			withCredentials: false,
		  url:BASE_URL+options.url,
		  method: options.method||"GET",
		  data: Object.assign({
        platform: 2,
        customer_id:''
      }, options.data),
			header: {
				'content-type': options.method == "GET" ? 'application/json' : 'application/x-www-form-urlencoded',
			},
		  success:(res)=> {
			 resolve(res.data);
		  },
		  fail:(err)=>{
		  	uni.showToast({
		  		title:'请求失败，请检查网络'
		  	})
			 reject(err);
		  }
		})
	})
}
```

+ 可以把request,挂载到vue原型上

```js
// 引入自己封装的网络请求方法
import {request} from './network/request.js'
//并把它挂载在vue原型上
Vue.prototype.$request=request;
```

+ 调用的方式

```js
 async getBannerData(){
     const res=await this.$request({//是个promise，所以可以用await修饰 函数用async
         url:'/v1/banner/list',
         data:{
             platform:3,
             position:8
         }
     })
     if(res.code==0){
         this.bannerList=res.data;
     }else{
         uni.showToast({
             title:res.msg
         })
     }
 }
```

```js
 async getBannerData(){
     this.$request({
         url:'/v1/banner/list',
         data:{
             platform:3,
             position:8
         }
     }).then(res=>{
         if(res.code==0){
             this.bannerList=res.data;
         }else{
             uni.showToast({
                 title:res.msg
             })
         }
     }).catch(err=>{
     console.log(err)
     });
 }
```

```js
import {getCarBrandList,getBannerData} from '@/network/home.js'
async getBannerData(){
     getBannerData().then(res=>{
         if(res.code==0){
             this.bannerList=res.data;
         }else{
             uni.showToast({
                 title:res.msg
             })
         }
     }).catch(err=>{
         console.log(err)
     });
 }
```

### 十.获取定位

+  在 manifest.json中配置 permission 

```json
"permission": {
	"scope.userLocation": {
		"desc": "你的位置信息将用于小程序位置接口的效果展示"
	}
},
```

+ 获取当前定位经纬度
+ 

##### 10.1使用百度地图

+ 在项目中安装vue-baidu-map



+ 在项目的main.js中加入



### 十一.全局变量的几种实现方式

##### 11.1. **定义一个专用的模块** 

+  用来组织和管理这些全局的变量，在需要的页面引入 

+ 创建 common 目录，然后在 common 目录下新建 helper.js 用于定义公用的方法。

  这种方式维护起来比较方便，但是缺点就是每次都需要引入。

##### 11.2. **挂载 Vue.prototype** 

+  这种方式，只需要在 main.js 中定义好即可在每个页面中直接调用。 
+  将一些使用频率较高的常量或者方法，直接扩展到 Vue.prototype 上，每个 Vue 对象都会“继承”下来。 
+  属性或方法，可以加一个统一的前缀。比如 $url、global_url、$request 这样  

##### 11.3. **globalData**  

+  在 App.vue 可以定义 globalData ，也可以使用 API 读写这个值。 

+ js中操作globalData的方式如下：

  赋值：`getApp().globalData.text = 'test'`

  取值：`console.log(getApp().globalData.text) // 'test'`

##### 11.4.Vuex 

+  Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。 

+  它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化 
+  Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。 

### 十二.使用Vuex

+  globalData是简单的全局变量，如果使用状态管理，需要使用`vuex` 

+  uni-app已经内置了vuex，所以只要正确引入就好
+  根目录下，**创建一个名为store的文件夹**然后在该文件夹下创建一个**index.js**的js文件 

```js
import Vue from 'vue'
import Vuex from 'vuex'
//1、安装插件
Vue.use(Vuex);
//2、创建对象
const state={
   marketerInfo:null,
}
//所有的状态放在一个store中来处理
const store=new Vuex.Store({
    status,
    mutations:{//store状态更新的唯一方式
      setMarketerInfo(state,payload){
	    state.marketerInfo=payload;
	  }, 
    },
    getters:{//getters相当于vue中的计算属性  使用：$store.getters.more20stu
        return state.students.filter((s)=>s.age>20);
    }
    actions: {}
})
//3、导出store对象
export default store
```

+  在入口文件即：**main.js**挂载vuex 

```js
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
const app = new Vue({
    ...App,
//挂载
    store
})
```

+ 小程序标签中直接$store.state.phone不支持

```js
  console.log(this.$store)
```

+ 小程序标签中直接$store.state.phone不支持

### 十三.前端性能提升问题解决方案

##### 13.1.函数节流与函数防抖

+ 函数节流：指定时间间隔内只会执行一次任务
  + 运用场景：监听滚动条滚动，一直监听滚动消耗性能。
  + 因为当在滚动的时候，浏览器会无时不刻地在计算判断是否滚动到底部的逻辑，而在实际的场景中是不需要这么做的。
  + 在实际场景中可能是这样的：在滚动过程中，每隔一段时间在去计算这个判断逻辑。

```js
function throttle(fn,nterval=300){
    let canRun=true;
    return function (){
        if(!canRun) return;
        canRun=false;
        setTimeout(()=>{
            fn.apply(this,arguments);
            canRun=true;
        },interval)
    }
}
```

+ 函数防抖：任务频繁促发的情况下，只有任务触发的时间间隔超过指定间隔时间的时候，任务才会执行。
  + 运用场景：验证用户是否被占用，输入的时候就在判断这个用户名是否已被注册；
  + 这样的做法不好的是当用户输入第一个字符的时候，就开始请求判断了，不仅对服务器的压力增大了，对用户体验也未必比原来的好

```js
export function debounce(fn,interval=300){
    let timeout=null;
    return function(){
        if(timerout) clearTimeout(timeout);
        timeout=setTimeout(()=>{
          fn.apply(this,arguments)
        },interval);
    }
}
```

##### 13.2.懒加载

+ 优势：

  + 性能收益：浏览器加载图片、decode、渲染都需要耗费资源，懒加载能节约性能消耗，缩短onload事件时间。
  + 节约带宽

+  **`DOMContentLoaded`** 和 **`Load`**的区别

  +  **DOMContentLoaded** ：当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。 
  +  **load** ：仅用于检测一个完全加载的页面。 
  +  注意：DOMContentLoaded 事件必须等待其所属script之前的样式表加载解析完成才会触发。 

+ img的懒加载

  + 事件监听(scroll、resize、orientationChange) 

  ```html
  <style>
      img {
          /*display: inline-block;*/
          width: 300px;
          height: 400px;/*需要给图片占位高度*/
          /*height: auto;*/
          display: block;
       }
  </style>
  <img src="" class="lazy"  data-src="images/1.jpg"  alt="">
  ```

  ```js
   document.addEventListener("DOMContentLoaded", function() {
      let lazyloadThrottleTimeout;
      function lazyload () {
        let lazyloadImages = document.querySelectorAll("img.lazy");
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }
  
        lazyloadThrottleTimeout = setTimeout(()=>{
          let scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
          });
          if(lazyloadImages.length == 0) {//图片全部加载完就去除监听事件
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
      lazyload();//确保第一屏图片显示
      document.addEventListener("scroll", lazyload);//滚动时触发
      window.addEventListener("resize", lazyload);//窗口调整大小时触发
      window.addEventListener("orientationChange", lazyload);//事件在设备的纵横方向改变时触发
    });
  ```

  

  +  Intersection Observer（具有兼容性问题） 

    + [阮一峰教程](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

    +  `scroll`事件密集发生，计算量很大，容易造成性能问题

  ```js
  document.addEventListener("DOMContentLoaded", function() {
      var lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry)=> {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.src = image.dataset.src;
            image.classList.remove("lazy");
            imageObserver.unobserve(image);
          }
        });
      });
      lazyloadImages.forEach((image)=> {
        imageObserver.observe(image);
      });
    });
  ```

+ background-image的懒加载

  + 原理和 img的原理基本是一样的，区别是在对class的处理

  ```html
  <style>
      #bg-image.lazy {
          background-image: none;
          background-color: #F1F1FA;
      }
      #bg-image {
          background-image: url("https://ik.imagekit.io/demo/img/image1.jpeg?tr=w-400,h-300");
          background-size: 100%;
      }
  </style>
   <div id="bg-image" class="bg lazy"></div>
  ```

  ```js
  document.addEventListener("DOMContentLoaded", function() {
      var lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry)=> {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.classList.remove("lazy");
            imageObserver.unobserve(image);
          }
        });
      });
      lazyloadImages.forEach((image)=> {
        imageObserver.observe(image);
      });
    });
  ```

+ 渐进式懒加载

  

+ 现成库

  + [lozad.js]( https://www.npmjs.com/package/lozad )

  ```html
  <style>
      img {
        /*display: inline-block;*/
        width: 300px;
        height: 400px;
        /*height: auto;*/
        display: block;
      }
  </style>
  <div>
    <img src="" class="lozad"  data-src="images/1.jpg"  alt="">
    <img src="" class="lozad"  data-src="images/2.png"   alt="">
    <img src="" class="lozad"  data-src="images/3.jpg" alt="">
    <img src="" class="lozad"  data-src="images/4.png" alt="">
  </div>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js"></script>
  <script>
   //1、   
    const observer = lozad(); // lazy加载默认选择器为“.lozad”的元素
    observer.observe();
   //2、
    const el = document.querySelector('img');
    const observer = lozad(el); // 传递一个NodeList（例如document.querySelectorAll（））也是有效的
    observer.observe();
   //3、
    const observer = lozad('.lozad', {
      load: function(el) {
        console.log('loading element');
        el.src = el.getAttribute('data-src');
        //  加载元素的自定义实现
        //  例如el.src = el.getAttribute（'data-src'）;
      }
    });
    observer.observe();
    
  </script>
  ```

  + lazyload.js

+ 

### 十四.常见问题

##### 14.1.在uniapp中fixed悬浮导航栏兼容H5的两种方式

+ 问题： 在小程序端，导航栏（综合排序那个导航栏）的定位是fixed,可以正常显示 ，但在H5中 出现问题 ，fixed是相对整个浏览器的，会被顶部盖住

+ 解决问题：

  + 方法一：引用uniapp的CSS变量–-window-top 、--window-bottom(内容区块距离顶部、底部的距离)；--status-bar-height(系统状态栏高度)
    + [css变量](https://uniapp.dcloud.io/frame?id=css%E5%8F%98%E9%87%8F)

  ```css
  position: fixed;
  left: 0;
  top: var(--window-top);
  ```

  +  方法二：特殊对待H5-高度计算法 

  ```js
  headerTop:"0px",//默认值为0
  // #ifdef H5
  this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
  // #endif
  ```

+ 

### 十五.uni-ui的使用

+ 文档： https://uniapp.dcloud.io/component/README?id=uniui 
+ 进入Grid宫格组件
+ 使用HBuilderX导入组件
+ 导入组件

  ```js
import uniGrid from '@/components/uni-grid/uni-grid.vue'
  ```

### 十五.尝试仿以租代购写的uniapp

+ 学习时间有限，只实现了个别页面

##### 15.1在H5中的效果

+ <img src="./images\在H5中的效果.gif" style="zoom:67%;" />

##### 15.2 在小程序中的效果

+ <img src="./images\在小程序中的效果.gif" style="zoom:67%;" />