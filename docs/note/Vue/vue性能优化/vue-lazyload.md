## vue-lazyload图片懒加载

### 一、基本使用

+ 页面内未出现在可视区域内的图片先不进行加载，等到滚动了再去加载
+ [官方文档](https://www.npmjs.com/package/vue-lazyload)

**安装，项目在运行起来也要用，所以不能加--save-dev**

```cmd
npm install vue-lazyload
```

**main.js导入**

```js
import VueLazyLoad from 'vue-lazyload'
//使用懒加载插件
Vue.use(VueLazyLoad，{
   loading:require('assets/img/common/placeholder.png')//设置占位图    
})
```

**使用**

```html
<!-- img中使用图片懒加载。 v-lazy代替v-bind:src -->
<img v-lazy="lazyImg" :key="lazyImg.src">
<!-- 背景图中使用图片懒加载。 v-lazy:background-image = "" -->
<div v-lazy:background-image="lazyImg"></div>
```

**本地路径的图片的话加载异常问题**

+ 原因：vue-lazyload是在main.js文件中引入，不会被webpack进行编译，src中的文件会被webpack编译。

```html
<!--需要使用require()-->
<img v-lazy="require('@/assets/img/pic/prize1-2.png')"/>
<div v-lazy:background-image="require('assets/img/pc/bg-1.jpg')">
```



###  二、参数

| key               | description                                                  | default                                                      | options                                                      |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `preLoad`         | proportion of pre-loading height（预加载高度比例）           | `1.3`                                                        | `Number`                                                     |
| `error`           | src of the image upon load fail（图片路径错误时加载图片）    | `'data-src'`                                                 | `String`                                                     |
| `loading`         | src of the image while loading（预加载图片）                 | `'data-src'`                                                 | `String`                                                     |
| `attempt`         | attempts count（尝试加载图片数量）                           | `3`                                                          | `Number`                                                     |
| `listenEvents`    | events that you want vue listen for（想要监听的vue事件）默认['scroll']可以省略，当插件跟页面中的动画或过渡等事件有冲突是，可以尝试其他选项 | `['scroll'（默认）,'wheel','mousewheel','resize','animationend','transitionend','touchmove']` | [Desired Listen Events](https://www.npmjs.com/package/vue-lazyload#desired-listen-events) |
| `adapter`         | dynamically modify the attribute of element（动态修改元素属性） | `{ }`                                                        | [Element Adapter](https://www.npmjs.com/package/vue-lazyload#element-adapter) |
| `filter`          | the image's listener filter（动态修改图片地址路径）          | `{ }`                                                        | [Image listener filter](https://www.npmjs.com/package/vue-lazyload#image-listener-filter) |
| `lazyComponent`   | lazyload component                                           | `false`                                                      | [Lazy Component](https://www.npmjs.com/package/vue-lazyload#lazy-component) |
| `dispatchEvent`   | trigger the dom event                                        | `false`                                                      | `Boolean`                                                    |
| `throttleWait`    | throttle wait                                                | `200`                                                        | `Number`                                                     |
| `observer`        | use IntersectionObserver                                     | `false`                                                      | `Boolean`                                                    |
| `observerOptions` | IntersectionObserver options                                 | { rootMargin: '0px', threshold: 0.1 }                        | [IntersectionObserver](https://www.npmjs.com/package/vue-lazyload#intersectionobserver) |



