# 一、 Composition API(其他部分)



## 1、shallowReactive 与 shallowRef

- shallowReactive : 只处理了对象内最外层属性的响应式(也就是浅响应式)
- shallowRef: 只处理了 value 的响应式, 不进行对象的 reactive 处理
- 什么时候用浅响应式呢?
  - 一般情况下使用 ref 和 reactive 即可
  - 如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
  - 如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef

```vue
<template>
    <h2>shallowReactive和shallowRef</h2>
    <p>m1:{{m1}}</p>
    <p>m2:{{m2}}</p>
    <p>m3:{{m3}}</p>
    <p>m4:{{m4}}</p>
    <button @click="update">更新数据</button>
</template>

<script lang='ts'>
import {
    defineComponent,
    reactive,
    ref,
    shallowReactive,
    shallowRef,
} from "vue";
export default defineComponent({
    name: "ShallowDemo",
    setup() {
        //深度劫持（深检测）----深度响应式
        const m1 = reactive({
            name: "HH",
            age: 12,
            car: {
                name: "奔驰",
                color: "红色",
            },
        });
        //浅劫持（浅检测）----浅度响应式
        const m2 = shallowReactive({
            name: "HH",
            age: 12,
            car: {
                name: "奔驰",
                color: "红色",
            },
        });
        //深度劫持（深检测）----深度响应式---做了reactive的处理
        const m3 = ref({
            name: "HH",
            age: 12,
            car: {
                name: "奔驰",
                color: "红色",
            },
        });
       //浅劫持（浅检测）----浅度响应式
        const m4 = shallowRef({
            name: "HH",
            age: 12,
            car: {
                name: "奔驰",
                color: "红色",
            },
        });

        const update = () => {
            //更改m1的数据---reactive方式
            // m1.name+='===';
            //m1.car.name+='===';
            //更改m2的数据---shallowReactive方式
            // m2.name+='===';
            // m2.car.name+='===';//不会变(如果内部有其他响应式发生变化，它也会变化)
            //更改m3的数据---ref方式
            // m3.value.name+='===';
            // m3.value.car.name+='===';
            //更改m4的数据---shallowRef方式
             m4.value.name+='===';//不会变(如果内部有其他响应式发生变化，它也会变化)
             m4.value.car.name+='===';//不会变(如果内部有其他响应式发生变化，它也会变化)
        };
        return {
            m1,
            m2,
            m3,
            m4,
            update,
        };
    },
});
</script>
```

## 2、readonly 与 shallowReadonly

- readonly:
  - 深度只读数据
  - 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
  - 只读代理是深层的：访问的任何嵌套 property 也是只读的。
- shallowReadonly
  - 浅只读数据
  - 创建一个代理，使其自身的 property 为只读。但不执行嵌套对象的深度只读(可修改)
- 应用场景:
  - 在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

```vue
<template>
    <h2>readonly 与 shallowReadonly</h2>
    <p>state:{{state}}</p>
    <button @click="update">修改</button>
</template>

<script lang='ts'>
import { defineComponent, reactive, readonly, shallowReadonly } from "vue";
export default defineComponent({
    name: "ReadonlyDemo",
    setup() {
        const state = reactive({
            name: "HH",
            age: 12,
            car: {
                name: "奔驰",
                color: "红色",
            },
        });
        //只读的数据---深度只读
        const state2=readonly(state);
        //只读的数据---浅度只读
        const state3=shallowReadonly(state);
        const update = () => {
            state2.name+='===';//不可以修改，会有红色波浪提示
            state2.car.name+='===';//不可以修改，会有红色波浪提示
            state3.name+='===';//不可以修改，会有红色波浪提示
            state3.car.name+='===';//可以修改
        };
        return {
            state,
            update
        };
    },
});
</script>
```

## 3、toRaw 与 markRaw

- toRaw
  - 返回由 `reactive` 或 `readonly` 方法转换成响应式代理的普通对象。
  - 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
- markRaw
  - 标记一个对象，使其永远不会转换为代理。返回对象本身
  - 应用场景:
    - 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
    - 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。

```vue
<template>
    <h2>toRaw 与 markRaw</h2>
    <p>{{state}}</p>
    <button @click="testToRaw">测试toRaw</button>
    <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRaw,markRaw } from "vue";
interface UserInfo {
    name: string;
    age: number;
    car: object;
    likes?: string[];
}
export default defineComponent({
    name: "RawDemo",
    setup() {
        const state = reactive<UserInfo>({
            name: "HH",
            age: 12,
            car: {
                name: "奔驰",
                color: "红色",
            },
        });
        const testToRaw = () => {
            //把代理变成了普通对象了，数据变化，界面不会改变
            const user = toRaw(state);
            user.name += "===";
        };
   
        const testMarkRaw = () => {
            // state.likes = ["吃", "喝"];
            // state.likes[0]+='==';
            //markRaw标记的对象数据，从此以后都不能成为代理对象，likes数组就不再是响应式的了
             const likes = ["吃", "喝"];
             state.likes = markRaw(likes);
            //放在外面，界面会改变（我的理解是，这里还是同步赋值阶段，后期回调操作修改界面不会改变）
            state.likes[0]+='==';

            setInterval(()=>{
                  if(state.likes){
                   state.likes[0]+='==';//数据变化，界面不会改变
                }
            },0)

        };
        return {
            state,
            testToRaw,
            testMarkRaw,
        };
    },
});
</script>
```

## 4、toRef

- 为源响应式对象上的某个属性创建一个 ref 对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
- **区别 ref：** 拷贝了一份新的数据值单独操作, 更新时相互不影响
- **应用：** 当要将 某个 prop 的 ref 传递给复合函数时，toRef 很有用

```vue
<template>
    <h2>toRef使用及特点</h2>
    <p>state:{{state}}</p>
    <p>age:{{age}}</p>
    <p>money:{{money}}</p>
    <button @click="update">更新数据</button>
    <!-- 传过去的是 age.value值，不是ref对象类型-->
    <ToRefDemoChild :age="age"/>
</template>

<script lang='ts'>
import { defineComponent, toRef, reactive, ref } from "vue";
import ToRefDemoChild from "./ToRefDemoChild.vue";
export default defineComponent({
    name: "ToRefDemo",
    components:{
       ToRefDemoChild
    },
    setup() {
        const state = reactive({
            name: "HH",
            age:12,
            money:20
        });
        //把响应式数据state对象中的age属性变成ref对象。。。。把state.money转成了Ref对象
        const age=toRef(state,'age');
        //把响应式对象中的money属性使用ref进行包装，变成一个ref对象。。。state.money只是复制的一个值
        const money=ref(state.money)
        const update=()=>{
            state.age+=2;//age和state.age数据都会变，操作的是同一个数据值
            //age.value+=2;//age和state.age数据都会变，操作的是同一个数据值
            // state.money+=10;//state.money变，money不变
            // money.value+=10;//state.money不变，money变
        }
        return {
            state,
            age,
            money,
            update
        };
    },
});
</script>
```

```vue
<template>
 <h3>子组件</h3>
<p>{{age}}</p>
<p>获取age的长度：{{age.toString().length}}</p>
<p>获取age的长度：{{length}}</p>
</template>

<script lang='ts'>
import { computed, defineComponent,Ref,toRef} from 'vue';
//要求传入的age必须是个ref对象，但是props.age就是个普通的数字，所以通过toRef(props,'age')，在props响应源上，把age转成Ref对象
function useGetLength(age:Ref){
    return computed(()=>{
        return age.toString().length
    })
}
export default defineComponent({
    name:'ToRefDemoChild',
    props:{
        age:{
            type:Number,
            required:true
        }
    },
    setup(props){
        const length=useGetLength(toRef(props,'age'));
        return{
            length
        }
    }
});
</script>
```

## 5、customRef

- 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制
- 需求: 使用 customRef 实现 debounce 的示例

```vue
<template>
    <h2>customRef的使用--防抖</h2>
    <input type="text " v-model="keyword">
    <p>{{keyword}}</p>
</template>

<script lang='ts'>
import { customRef, defineComponent, ref } from "vue";
//自定义hook防抖函数
//value传入的数据。将来数据的类型不确定，所以，用泛型，delay防抖的间隔时间
function useDebouncedRef<T>(value: T, delay = 200) {
    let timeoutid:number;
    return customRef((track, trigger) => {
        return {
            //返回数据 
            get() {
                //告诉Vue追踪数据
                track();
                return value;
            },
            //设置数据
            set(newValue:T) {
                //清理定时器，在delay时间内又触发，就清除前面的触发
                clearTimeout(timeoutid);
                //开启定时器
                timeoutid=setTimeout(()=>{
                 value=newValue;
                 //告诉vue页面更新
                 trigger();
                },delay)
            },
        };
    });
}
export default defineComponent({
    name: "CustomRefDemo",
    setup() {
        // const keyword=ref('abc');
        const keyword = useDebouncedRef("abc", 500);
        return {
            keyword,
        };
    },
});
</script>
```

## 6、provide 与 inject

- `provide`和`inject`提供依赖注入，功能类似 2.x 的`provide/inject`
- 需求实现跨层级组件(祖孙)间通信

```vue
 <template>
    <h2>provide 与 inject</h2>
    <p>当前的颜色是：{{color}}</p>
    <button @click="color = 'red'">红</button>
    <button @click="color = 'yellow'">黄</button>
    <button @click="color = 'blue'">蓝</button>
    <ProvideaAndInjectSon />
</template>
 <script lang='ts'>
import { defineComponent, provide, ref } from "vue";
import Son from "./Son.vue";
export default defineComponent({
    name: "ProvideaAndInject",
    components: {
       Son,       
    },
    setup(){
        const color=ref('red');
        //提供数据
        provide('color',color);
        return{
            color
        }
    }
});
</script>
```

```vue
 <template>
    <h2 :style="{color}">Son组件</h2>
    <ProvideaAndInjectGrandSon />
</template>
 
 <script lang='ts'>
import { defineComponent,inject } from "vue";
import GrandSon from "./GrandSon.vue";
export default defineComponent({
    name: "Son",
    components: {
        GrandSon,  
    },
    setup(){
        //子组件也可以注入操作---时间长了会忘记数据是哪里来的
        const color = inject("color");
        return {
            color,
        };
    }
});
</script>

```

```vue
<template>
    <h2 :style="{color}">GrandSon组件</h2>
</template>
 <script lang='ts'>
import { defineComponent, inject } from "vue";
export default defineComponent({
    name: "GrandSon",
    setup() {
        //注入操作
        const color = inject("color");
        return {
            color,
        };
    },
});
</script>
```



## 7、响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理









reactive 直接这整个重新赋值会导致响应式丢失问题？





delete是关键字，变量名不能用delete