---
title: vue插件
tags:
  - Vue
categories:
  - Vue实战
---



## 一、nprogress进度条插件

【[链接](https://www.cnblogs.com/jiajia-hjj/p/15865201.html)】

+ 需求：打开一个页面时，往往会伴随一些请求，并且会在页面上方出现进度条。

+ 原理：在我们发起请求的时候开启进度条，在请求成功后关闭进度条

+ 实现：所以只需要在request.js中进行配置，在页面加载时发起了一个请求，此时页面上方出现蓝色进度条，收到响应数据后关闭进度条。在拦截器加。

**1、安装**

```cmd
npm install nprogress --save
```

**2、对应的request.js设置**

+ starte() 进度条开始。donee()进度条结束

+ 可以通过修改nprogress.css文件的background来修改进度条颜色。

````js
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
//1、对axios二次封装
const requests = axios.create({
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL:'/api',
    timeout: 5000,
})
//2、配置请求拦截器
requests.interceptors.request.use(config => {
    //config内主要是对请求头Header配置
    //比如添加token

    //开启进度条
    nprogress.start();
    return config;

})
//3、配置相应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数

    //响应成功，关闭进度条
    nprogress.done()
    return  res.data;

},(error) => {
    //失败的回调函数
    console.log("响应失败"+error)
    return Promise.reject(new Error('fail'))
})
//4、对外暴露
export default requests;
````

## 二、swiper轮播

【[链接](https://www.cnblogs.com/jiajia-hjj/p/15865210.html)】

[[swiper官网](https://www.swiper.com.cn/usage/index.html)]

**1、安装swiper5**

```cmd
npm install swiper@5
```

**2、在需要使用轮播图的组件内导入swpier和它的css样式**

```js
//引入Swiper
import Swiper from 'swiper'
//引入Swiper样式
import 'swiper/css/swiper.css'
```

**3、在组件中new Swiper实例之前，页面中必须要有dom标签**
**4、创建swiper实例**

+ 确保数据加载好了---**watch**，监听数据的变化
+ 确保结构渲染出来了---**nextTick**，获取更新后的 DOM

```html
<div class="swiper-container" id="mySwiper" ref="cur">
    <div class="swiper-wrapper">
        <div v-for="carousel in list" :key="carousel.id" class="swiper-slide">
            <img :src="carousel.imgUrl" />
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
<script>
import Swiper from 'swiper';
export default {
    name: 'Carousel',
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    watch: {
        //监听bannerList数组的变化，由[]-->数组中有四个元素
        list: {
            immediate: true,
            handler(newVal, oldVal) {
                //如果执行handler方法，代表组件身上这个属性的属性已经有了【数组：四个元素】
                //再刷新的话，还是不行，说明结构还是没有
                //原因：当前这个函数执行，只能保证bannerList数据有了，但是没有办法保证v-for结构渲染出来了没。
                //解决：nextTick 在下次 DOM 更新  循环结束之后 执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
                //nextTick
                this.$nextTick(() => {
                    //当执行这个回调函数的时候：保证服务器数据回来了，v-for执行完毕了【轮播一定有了】
                    //更新dom之后
                    //保证页码中的结构一定是有的，经常和很多插件一起使用【都需要dom存在】
                    // console.log('nextTick')
                    var mySwiper = new Swiper(this.$refs.cur, {
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }
                    })
                })
            }
        }
    }
};
</script>
```

## 三、解决vuex-刷新页面state数据消失插件

vuex---数据不持续化

vuex-persistedstate

vuex-along

【[链接](https://www.cnblogs.com/jiajia-hjj/p/13882849.html)】



## 四、qrcode生成二维码插件

[[官网](https://www.npmjs.com/package/qrcode)]

```js
//引入
import QRCode from "qrcode";
// 生成二维码
const generateQR=async ()=> {
    try {  
        let url = await QRCode.toDataURL(this.payInfo.codeUrl);
        console.log(url);
    } catch (err) {
        console.error(err);
    }
}
```

## 五、vue-lazyload图片懒加载

[[官网](https://www.npmjs.com/package/vue-lazyload)]

+ 图片需要现在在屏幕上时，再加载这张图片

+ 安装

```cmd
npm install vue-lazyload --save
```

+ 导入，并Vue.use

```js
//引入默认图片
import loadImg from '@/assets/1.jpg'
//引入插件
import VueLazyload from 'vue-lazyload'
 //注册组件
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading: require('@/assets/1.jpg'),//或者import方式==>loadImg
})
```

+ 修改img，:src->v-lazy

```html
<img v-lazy="img.src">
```

## 六、vee-validate表单验证

[vee-validate](https://www.npmjs.com/package/vee-validate)

[链接]

**1、安装引入**

```cmd
#vue2,安装2版本
#vue3,安装3或4版本
npm install vee-validate@2 --save
```

**2、引入**

+ 插件需要写的代码比较多，不好全部放在`main.js`中

+ 所以可以新建一个文件夹`plugins`，新建表单验证插件`validate.js`
+ 在main.js中引入

```js
//引入表单验证
import '@/plugins/validate'
```

**3、提示信息**

```js
// vee-validate插件：表单验证
import Vue from "vue";
import VeeValidate from "vee-validate";
//中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

//表单验证
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
  },
   
  attributes: {
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password1: "确认密码",
    agree: "协议",
  },
});


//自定义校验规则
VeeValidate.Validator.extend("tongyi", {
    validate: (value) => {
      return value;
    },
    getMessage: (field) => field + "必须同意",
  });
  
```

**4、使用**

```html
<!--验证手机号 name="phone":验证的是哪一个， v-validate校验 ， 错误提示errors-->
<input placeholder="请输入你的手机号"
       v-model="phone"
       name="phone"
       v-validate="{ required: true, regex: /^1\d{10}$/ }"
       :class="{ invalid: errors.has('phone') }"
       />
<span class="error-msg">{{ errors.first("phone") }}</span>

<!--验证密码一样 is-->
<input placeholder="请输入确认密码"
       v-model="password"
       name="password1"
       v-validate="{ required: true, is:password}"
       :class="{ invalid: errors.has('password1') }"
       />
<span class="error-msg">{{ errors.first("password1") }}</span>


<!--验证是否选中 自定义校验规则：tongyi-->
<input name="agree" 
       type="checkbox"
       :checked="agree"
       v-validate="{ required: true, tongyi:true}"
       :class="{ invalid: errors.has('agree') }"
       />
<span>同意协议并注册《尚品汇用户协议》</span>
<span class="error-msg">{{ errors.first("agree") }}</span>
```

## 七、vue-virtual-scroller-list虚拟滚动

【[链接](https://www.cnblogs.com/jiajia-hjj/p/15388319.html)】

## 八、loadsh插件防抖和节流

[[官网](https://www.lodashjs.com/)]

```js
import {throttle} from 'lodash'

methods: {
    //鼠标进入修改响应元素的背景颜色
    //采用键值对形式创建函数，将changeIndex定义为节流函数，该函数触发很频繁时，设置50ms才会执行一次
    changeIndex: throttle(function (index){
        this.currentIndex = index
    },50)
}

```

## uuid生成游客身份

[[官网](https://www.npmjs.com/package/uuid)]