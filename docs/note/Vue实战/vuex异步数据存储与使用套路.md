### 一、发请求放仓库中,并存储数据

静态->api->仓库存储->组件显示

**1、api/index.js中添加请求** 

```js
//三级联动的接口 /api/product/getBaseCategoryList  get 无参数
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})
```

**2、（vuex三连环套路）仓库中 actions发请求，并通过存储mutations修改state。数据存储在state中**。

```js
//引入api
import {reqCategoryList} from "@/api";
//3、存储变量
const state = {
      //statec初始值不能瞎写，服务器返回的是数组就是数据，根据接口返回值初始化
     categoryList: [],
};
//2、修改变量
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  }
};
//1、获取异步数据
const actions = {
  //通过api里面的接口函数调用，向服务器发请求，获取服务器数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
        //通过commit让mutations修改state的数据
      commit("CATEGORYLIST", result.data);
    }else{//抛出错误
        //throw new Error('faile')
        return Promise.reject(new Error('faile'))
    }
}
```

**3、在组件中派发请求**

```js
 this.$store.dispatch("categoryList");

//想要等请求完毕做些其他操作async/await
//想要捕获错误，可以通过try{}catch(){}
methods: {
    async getCategoryList(){
        //派发actions
        try {
            //代表请求成功
            await this.$store.dispatch("categoryList");
            //请求成功之后做的事
            //....
        } catch (error) {
            //加入购物车失败的事，如
            alert(error.message)
        }
    }
}
```

**4、通过[辅助函数](https://www.cnblogs.com/jiajia-hjj/p/16008643.html)获取到数据，并显示**

```js
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            categoryList: (state) => state.home.categoryList,
        }),
    }
}
```



### 二、发请求放仓库中,不存储数据

静态->api->仓库中发请求->组件处理

**1、api/index.js中添加请求** 

```js
//将产品添加到购物车中（获取更新某个产品的个数）/cart/addToCart/{skuId}/{skuNum} POST
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});
```

**2、不需要存储值，服务器只返回当前操作是成功还是失败。**

```js
//引入api
import {reqAddOrUpdateShopCart} from "@/api";
//获取异步数据
const actions = {
    async addOrUpdateShopCart({commit},{skuId,skuNum}){   
        //加入购物车返回的结果 
        //服务器写入数据成功，并没有返回其他数据，所以不需要三连环存储数据
        let result=await reqAddOrUpdateShopCart(skuId,skuNum);
        //当前这个函数如果执行返回的是个promise 要么成功，要么失败
        if(result.code==200){//成功
             return "ok"
         }else{//加入购物车失败，抛出错误
            //throw new Error('faile')
            return Promise.reject(new Error('faile'))
         }
    }
}
```

**3、可以通过try{}catch(){},捕获错误**

```js
methods: {
    async handler(){
        //派发actions
        try {
            //代表请求成功
            await this.$store.dispatch("addOrUpdateShopCart" ,{
                skuId: cart.skuId,
                skuNum: disNum,
            });
            //请求成功之后做的事
            //....
        } catch (error) {
            //加入购物车失败的事，如
            alert(error.message)
        }
    }
}
```



### 三、发请求直接放在页面中

静态->api->页面发请求存储->组件显示

**1、api/index.js中添加请求**

```js
//三级联动的接口 /api/product/getBaseCategoryList  get 无参数
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})
```



**2、在main.js中统一引入api**

```js
//统一接收api 文件全部的请求函数
//统一引入
import * as API from '@/api'
```



**3、发请求**

```js
//引入api
import {reqCategoryList} from "@/api";
data(){
    return {
        categoryList:[]
    }
},
methods: {
    async getCategoryList(){
        let result = await this.$API.reqCategoryList();
        if (result.code == 200) {
            this.categoryList=result.data;
            //如果需要保存在仓库中。要通过commit让mutations修改state的数据
            //commit("CATEGORYLIST", result.data);
        }else{
            alert(result.message)
        }
       
    }
}
```

​		