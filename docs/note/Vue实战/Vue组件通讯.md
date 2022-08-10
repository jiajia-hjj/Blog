---
title: vue组件通信
tags:
  - Vue
categories:
  - Vue实战
---

## 一、props

+ 适用场景：父子组件通讯

**1、父组件，给子组件【ChildA】传递数据**

```html
<child-a :msg="msg"></child-a>
```

**2、子组件，props接收数据**

```js
//props有两种写法
//1、数组形式
props:['msg']
//2、对象形式
props:{
    msg:{
        type:String,
            default:''
    }
},
props: {
    goods: {
        type: Array, 
        default(){ //default可以函数
            return []
        }
    }
}
```

+ [在路由中也可以使用props]( https://www.cnblogs.com/jiajia-hjj/p/15814297.html) 

+ 注：prop 只读，不可被修改，所有修改都会失效并警告。

## 二、`$emit`

+ 适用场景：子组件给父组件传递数据

**1、子组件【ChildA】$emit发射事件`goodsClick`，传递数据`item`**

```js
//告诉父组件点击了那个商品
this.$emit('goodsClick',item);
```

**2、父组件监听子组件【ChildA】发射的`goodsClick`事件，用handleGoods进行处理**

```html

<ChildA :goods="goodsList" @goodsClick="handleGoods"/>
```

```js
handleGoods(item) {
    //操作子组件传过来的数据
},
```



**自定义事件，需要`$emit()`、`$on()`**

+ `$emit('自定义事件名',要传送的数据)`--发送事件
+ `$on('事件名',callback)`--监听事件

+ 有点蠢的注释：在不同组件中`this.$emit()`,和`this.$on()`，this的组件实例对象是不一样的。所以不能`this.$on()`监听不到`this.$emit`发射的事件。同组件中可以。---->(事件源要相同)

## 三、全局事件总线$bus

+ 适用场景：万能，缺点不方便维护

**1、在mian.js 中配置全局事件总线，挂载到Vue原型上**

```js
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this;//this=>VM
 },
}).$mount('#app')	

//其实就是： Vue.prototype.$bus=new Vue();
```

**2、发送事件**

+ `this.$bus.$emit('自定义事件名',要传送的数据)`；

```JS
//通知兄弟组件，当前索引值是为几..送出事件
this.$bus.$emit('getIndex', this.currenyIndex);
```

**3、监听事件**

+ `this.$bus.$on('事件名',callback)`；

```js
//组件在什么周期挂载的时候，监听这个组件
mounted() {
    //通过全局事件总线，获取兄弟组件传递过来的索引值
    this.$bus.$on('getIndex', (index) => {
        //修改当前响应式数据
        this.currentIndex = index
    })
},
```

**4、移除事件监听者**

```js
 this.$bus.$off('addClick');
```



## 四、Vuex

+ 适用场景：万能

[[vuex](https://www.cnblogs.com/jiajia-hjj/p/15376917.html)]

## 五、插槽

+ 适用场景：可以实现父子组件通信（通信的结构）
+ 默认插槽、具名插槽、作用域插槽
+ 作用域插槽：子组件的数据来源于父组件，子组件是决定不了自身的外观

[[插槽](https://www.cnblogs.com/jiajia-hjj/p/15375692.html)]

## 六、pubsub.js 发布订阅

+ 适用场景：万能



## 七、`$attrs`/`$listener`

+ 都是组件实例自身的属性
+ `$attrs`：可以获取到父组件传递过来的props数据。
  + 如果子组件已经通过props接收的属性，在`$attrs`属性当中是获取不到的。
+ `$listeners`：它可以获取到父组件给子组件传递的自定义事件。

```html
<!--父组件-->
<div>
    <h1>二次封装element自定义按钮</h1>
    <EleBtn type="success" icon="el-icon-delete" size="minni" title="删除按钮" txt="删除" @click="handler"/>
</div>
```

```html
<!--子组件-->
<div>
    <a :title="title">
        <!-- 不能使用语法糖 -->
        <el-button v-bind="$attrs" v-on="$listeners">{{txt}}</el-button>
    </a>
</div>
```

```js
//子组件可打印查看值
mounted() {
    console.log(this.$attrs);//{type: 'success', icon: 'el-icon-delete', size: 'minni'}
    console.log(this.$listeners);//{click: ƒ}
}
```

## 八、`$children`/`$refs`

**this.$children**

+ 组件实例的属性，可以获取到当前组件的全部子组件【数组】。一般不通过这样拿。

```js
console.log(this.$children);//返回所有的子组件对象的集合
console.log(this.$children[0]);
console.log(this.$children[0].money);
this.$children.forEach(item=>{
    item.money-=200;
})
```

**[this.$refs](https://www.cnblogs.com/jiajia-hjj/p/15865143.html)**

+ 可以获取到真实的DOM节点，也可以获取到某一个子组件标签，操作子组件的数据和方法，
+ 组件对象类型，默认是个空的对象。常用。
+ 要在组件上加 ref="名字"。

```html
<childA ref="childA"/>
```

```js
console.log(this.$refs.childA);//获取属性值为ref="childA"的组件对象
console.log(this.$refs.childA.money);
```

## 九、`$parent`/`$root`

**this.$parent**

+ 组件实例的属性，可以获取到当前子组件的父组件，进而可以操作父组件的数据与方法。
+ 不建议使用，一个子组件可以被多个组件调用。一个父组件里有name这个属性，另一个父组件中可能没有。

```js
console.log(this.$parent);
console.log(this.$parent.name);
```

**this.$root**

+ 访问根组件，也很少用。
+ vue实例里面东西很少，基本什么东西都没有

```js
console.log(this.$root);
console.log(this.$root.name);//?手脚架中，App.vue根组件中定义了name，但是访问不到。
```

## 十、provide/inject注入依赖

> 父组件通过provide提供变量，子组件通过inject注入变量

+ 定义说明：以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

父组件

```html
 <template>
    <h2>provide 与 inject</h2>
    <p>当前的颜色是：{{color}}</p>
    <button @click="color = 'red'">红</button>
    <button @click="color = 'yellow'">黄</button>
    <button @click="color = 'blue'">蓝</button>
     =======================
     <p>{{info.name}}</p>
    <ProvideaAndInjectSon />
</template>

 <script lang='ts'>
import { defineComponent, provide, ref,readonly,reactive} from "vue";
import ProvideaAndInjectSon from "./ProvideaAndInjectSon.vue";
export default defineComponent({
    name: "ProvideaAndInject",
    components: {
        ProvideaAndInjectSon,

    },
    setup(){
        const color=ref('red');
        //提供数据
        provide('color',color);
        //提供只读属性
        // provide('color', readonly(color))//这样子/祖孙组件就改不了


        const info=reactive<any>({name:'llll'});
        //- 如果我们需要修改可响应的数据，那么最好是在数据提供的位置来修改：
        //- 我们可以将修改方法进行共享，在后代组件中进行调用；
        const changeInfo = (value:string) =>  {
            info.name = value
        }
        provide("info", info);
        provide("changeInfo", changeInfo);//修改方法进行共享
        return{
            color,
            info
        }
    }
});
</script>
```

Son组件

```html
 <template>
    <h2 :style="{color}">Son组件</h2>
     <button @click="increment">改变color颜色变绿色</button>
     ==================
     <p>{{info.name}}</p>
     <button @click="changeInfo('hhhhh')">改变changeInfo名字</button>
    <ProvideaAndInjectGrandSon />
</template>

 <script lang='ts'>
import { defineComponent,inject } from "vue";
import ProvideaAndInjectGrandSon from "./ProvideaAndInjectGrandSon.vue";
import RefDom from "@/components/RefDom.vue";
export default defineComponent({
    name: "ProvideaAndInjecSon",
    components: {
        ProvideaAndInjectGrandSon,

    },
    setup(){
           //注入操作---时间长了会忘记数据是哪里来的
        let color:Ref = inject("color");
        const increment=()=>color.value='green';//后代组件不仅可以使用数据，也可以更新数据的值，不遵循项目单项数据流的规则

        let info = inject("info");
        const changeInfo=inject("changeInfo");
        return {
            color,
            increment,
            info,
            changeInfo
        };
    }
});
</script>
```

GrandSon组件

```html
 <template>
    <h2 :style="{color}">GrandSon组件</h2>
     <button @click="increment">改变color颜色变黑色</button>
</template>
 <script lang='ts'>
import { defineComponent, inject } from "vue";
export default defineComponent({
    name: "ProvideaAndInjectGrandSon",
    setup() {
        //注入操作
        let color:Ref = inject("color");
        const increment=()=>color.value='#003';//后代组件不仅可以使用数据，也可以更新数据的值，不遵循项目单项数据流的规则
        return {
            color,
            increment
        };
    },
});
</script>
```







