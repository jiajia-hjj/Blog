## axios的封装

【[官网](http://www.axios-js.com/)】

+ 下载

```cmd
#不仅开发需要，线上程序也需要
npm install axios
```

### 一、基本使用

+ ##### axios(config)

```js
axios({   	
    url:'http://123.207.32.32:8000/home/data',
    method:'get',
    //专门针对get的参数拼接
    params:{
        type:'pop',
        page:1
    }
}).then(res=>{
    console.log(res);
})
```

### 二、发送并发请求

+ **axios.all(iterable)**，类似于Promise.all，都请求完才能往下执行

```js
axios.all([
  axios({
    url:'http://123.207.32.32:8000/home/data?type=sell&page=2',
  }),
  axios({
    url:'http://123.207.32.32:8000/home/data',
    params:{
      type:'pop',
      page:6
    }
  })
]).then(results=>{
  console.log(results);
  console.log(results[0]);
  console.log(results[1]);
})
```

+ **axios.spread(callback)**

```js
axios.all([
  axios({
    baseURI:'http://123.207.32.32:8000',
    timeout:5,
    url:'/home/data?type=sell&page=2',
  }),
  axios({
    timeout:5,
    url:'http://123.207.32.32:8000/home/data',
    params:{
      type:'pop',
      page:6
    }
  })
]).then(axios.spread((res1,res2)=>{
  console.log(res1);
  console.log(res2);
}))
```

### 三、创建实例

+ **axios.create([config])**

```js
//创建实例
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
//发送网络请求
instance({
    url:'/home/data',
    method:'get',
}).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})
```

### 四、请求配置

注：post 请求参数传data， get请求参数传params

```js
{
  // 请求地址
  url: '/user',  
  //请求类型，默认get
  method: 'get', 
  //请求根路径，将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: 'https://some-domain.com/api/',
  /* `transformRequest` :
     允许在向服务器发送前，修改请求数据
     只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
     后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream*/
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    //对 data 进行任意转换处理
    return data;
  }],
  //自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  //与请求get一起发送的 URL 参数
  params: {
    ID: 12345
  },
   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  /* `data` 
    作为请求主体被发送的数据
    只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    在没有设置 `transformRequest` 时，必须是以下类型之一：
    - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    - 浏览器专属：FormData, File, Blob
    - Node 专属： Stream*/
  data: {
    firstName: 'Fred'
  },

  // 超时设置(0 表示无超时时间),如果超过时间，请求将被中断
  timeout: 1000,

   //跨域请求时是否带token
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // `auth` 身份验证信息，表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // 响应的数据格式，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

 
  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  }
    
}
```



### 五、封装request模块过程

````js
/*******普通封装，request(config,success,failure)********/
import axios from 'axios'
export function request(config,success,failure) {
  //1、创建axios实例
  const instance=axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:50000
  })
  //发送真正的网络请求
  instance(config).then(res=>{ 
      success(res)//执行请求成功的函数
  }).catch(err=>{
      failure(err)//执行请求失败的函数
    })
}

import  {request} from "./api/request";
request({
 url:'/home/multidata'
},res=>{
  console.log(res);
},err=>{
  console.log(err);
})


/**********普通封装，request(config)***************/
export function request(config) {
  //1、创建axios实例
  const instance=axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:50000
  })
  //发送真正的网络请求
  instance(config.baseConfig).then(res=>{
      config.success(res)//执行请求成功的函数
    })
    .catch(err=>{
      config.failure(err)//执行请求失败的函数
    })

}
import  {request} from "./api/request";
request({
  baseConfig:{
    url:'/home/multidata'
  },
  success(res){
     console.log(res)
  },
  failure(err){
      console.log(err)
  }
})


/****Promise形式封装，request(config).then().catch()***/
export function request(config) {
  return new Promise((resolve, reject) => {
    //1、创建axios实例
    const instance=axios.create({
      baseURL:'http://123.207.32.32:8000',
      timeout:50000
    })
    //发送真正的网络请求
    instance(config).then(res=>{
       resolve(res)
     }).catch(err=>{
       reject(err);
     })
  })

}

import  {request} from "./api/request";
request({
    url:'/home/multidata'
}).then(res=>{
  console.log(res);
}).catch(err=>{
  console.log(err);
});//.then前面就是，return new Promise 就是request的结果


/*******Promise形式封装，request(config).then().catch()*********/
//axios实例本身就是个Promise,所以不需要再包一层Promise
export function request(config) {
  //1、创建axios实例
  const instance=axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:50000
  });
  //2、axios的拦截
  //拦截全局
  // axios.interceptors
  //拦截实例
  // 2.1请求拦截
  instance.interceptors.request.use(config=>{
       // console.log(config);
       //1.比如config种的一些信息不符合服务器的要求。需要变化之后再给服务器传出去
       //2.比如每次发送网络请求时，都希望在界面种显示一个请求的图标。然后再响应成功中将它隐藏起来
      // 3、某些网络请求（比如登录 (token)），必须携带一些特殊的信息。如果没有登录就给用户拦截一些提示，让用户去登录
       return config;//拦截后需要将config给返回出去
    },err=>{
      // console.log(err);
  });
  // 2.2响应拦截
  instance.interceptors.response.use(res=>{
    console.log(res);//将结果拦截掉了，处理完要return出去
    return res.data;
  },err=>{
    console.log(err);
  });

  //3、发送真正的网络请求
 // instance(config) 返回值就是一个Promise
 return instance(config)
}

````



### 六、最终封装的request模块

+ api/requset.js

```js
//对axios进行二次封装
import axios from "axios";

//1、利用axios对象的方法create,去创建一个axios实例
const requests =axios.create({
    //配置对象
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL:"/api",
    //代表请求超时的时间5s
    timeout:5000,
})
//请求拦截器，在请求发出之前做些事情
requests.interceptors.request.use((config)=>{
   //config:配置对象，对象里面有个属性很重要，header请求头
   return config
})
//响应拦截器,对响应的数据做一些操作
requests.interceptors.response.use((res)=>{
    //成功回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
},(error)=>{
    //响应失败回调函数，如终结Promise链
    return Promise(new Error('fail'));
})
//对外暴露
export default requests;
```

+ 接口统一管理 api/index.js

```js
//当前这个模块:AIP进行统一管理
import requests from "./request";
//三级联动的接口
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})
//获取搜索模块
export const reqGetSearchInfo=(params)=>requests({url:'/list',method:'post',data:params})
```

+ 发请求

```js
import {reqGetSearchInfo} from '@/api'

//通过api里面的接口函数调用，向服务器发请求，获取服务器数据
async getSearchInfo((params={}){
    //params默认是个空对象
    let result = await reqGetSearchInfo(params);
    // console.log(result.data);
    if(result.code==200){
       /**/
    }
}

this.getSearchInfo(this.searchParams)
```

