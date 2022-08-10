---
title: mock插件使用
tags:
  - Vue
categories:
  - Vue实战
---





[[官网](http://mockjs.com/)]

+ mock(模拟)数据，需要用到mock.js插件。
+ 不会和服务器进行任何通信，拦截前端ajax请求，返回我们自定义的数据用于**测试前端接口**

**1、下载插件mockjs**

```cmd
npm install mockjs --save-dev
```

**2、在src中，创建`mock`文件**

**3、准备json假数据** （在mock中创建相应的.json文件）

+ 需要格式化，不然有空格跑不起来。。
+ 如轮播图数据，banner.json：
+ 注：把mock数据需要的图片要放置到public文件夹，【public文件夹打包时会原封不动打包到文件夹中】
+ banner.json文件

```json
[{
        "id": "1",
        "imgUrl": "/images/banner1.jpg"
    },
    {
        "id": "2",
        "imgUrl": "/images/banner2.jpg"
    },
    {
        "id": "3",
        "imgUrl": "/images/banner3.jpg"
    },
    {
        "id": "4",
        "imgUrl": "/images/banner4.jpg"
    }
]
```

**4、mock虚拟数据，mock文件中新建mockServer.js**

+ mockServer.js文件在路口文件中引入

```js
import Mock  from 'mockjs'
//把json数据格式引入进来
//json文件没对外暴露，但是可以直接引入
//webpack默认对外暴露的资源:图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
//mock数据：第一个参数请求地址、第二个参：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})	
```

```
//记得要在main.js中引入一下
import '@/mock/mockServer'
```

**5、配置mock请求路径**---api文件

+ mockAjax.js

```js
//对axios进行二次封装
import axios from "axios";
import nProgress from "nprogress";
//引入进度条。。看文档
import nprogress from "nprogress";
//要引入进度条样式
import "nprogress/nprogress.css"
// nprogress  start 进度条开始。done进度条结束

//1、利用axios对象的方法create,去创建一个axios实例
const requests =axios.create({
    //配置对象
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL:"/mock",
    //代表请求超时的时间5s
    timeout:5000,
})
//请求拦截器，在请求发出之前做些事情
requests.interceptors.request.use((config)=>{
   //config:配置对象，对象里面有个属性很重要，header请求头
   //进度条开始
   nProgress.start();
   return config
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data
},(error)=>{
    //响应失败回调函数，如终结Promise链
    return Promise(new Error('fail'));
})
//对外暴露
export default requests;
```

+ index.js

```js
//当前这个模块:AIP进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'

//三级联动的接口
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})

//获取banner
export const reqBannerList=()=>mockRequests({url:'/banner',method:'get'})
```

