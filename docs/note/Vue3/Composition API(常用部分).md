# 一、 Composition API(常用部分)

> [composition-api 文档:(opens new window)](https://composition-api.vuejs.org/zh/api.html)



## 0、组合式API 

**在使用Vue 2时可能遇到三个限制：**

- **代码的可读性问题：** 当组件变得**越来越大**时，可读性变得**越来越困难**。  
  +  vue2 （ `options API` ）实现一个业务逻辑，但是代码比较分散， 可读性差，可维护性差 
  +  vue3 （`composition API` ） 相关联的代码保持在了一起,逻辑分明，可维护性高 

- **逻辑复用的问题：** 相同的代码逻辑很难在**多个组件**中进行复用

+ **`TS` 相关问题：** 对 `TypeScript` 的支持并不友好

**在最初的逻辑中，通过组合式 API 解决了两个问题：**

1. 我们让组件拥有了更加良好的代码组织结构
2. 我们让相同的代码逻辑在不同的组件中进行了完整的复用



## 1、setup

- 新的 option( 选项 )，所有的组合 API 函数都在此使用，只在初始化时执行一次
- 在组件被创建**之前**执行，一旦 `props` 被解析完成，它就将被作为组合式 API 的入口函数，程序一执行会先进到setup中。
- 函数如果返回对象， 对象中的属性或方法，在模板中可以直接使用

## 2、 ref

- 作用：ref是个函数，定义一个数据的响应式，返回的是一个Ref对象
- 返回的是Ref对象
- 语法： `const xxx = ref(initValue)`:
  - 创建一个包含响应式数据的引用(reference)对象
  - js 中操作数据: `xxx.value`
  - 模板中操作数据: 不需要.value
- 一般用来定义基本类型的响应式数据

```vue
<template>
	<h2>{{ count }}</h2>
	<button @click="update">更新</button>
</template>
<script>
    import { defineComponent, ref } from "vue";
    export default defineComponent({
        /* 使用vue3的composition API */
        setup() {
            // let count=0; //count不是响应式数据，所以页面不会变化
            const count = ref(1) //count的类型是Ref
            // 更新响应式数据的函数
            function update() {
                count.value = count.value + 1 //需要通过使用该Ref对象调用value属性对的方式进行数据的操作
            }

            return {
                count,
                update
            }
        }
    });
</script>
```

## 3、 reactive

- 作用：是个函数，定义多个数据的响应式
- 语法： `const proxy = reactive(obj)`: 接收一个普通对象然后返回该普通对象的响应式代理器对象==>（proxy 现在是代理对象，obj是目标对象）
- 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的

```vue
<template>
  <h2>name: {{ state.name }}</h2>
  <h2>age: {{ state.age }}</h2>
  <h2>wife: {{ state.wife }}</h2>
  <button @click="update">更新</button>
</template>

<script>
/*
reactive:
    作用: 定义多个数据的响应式
    const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
    响应式转换是“深层的”：会影响对象内部所有嵌套的属性
    内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
*/
import { reactive } from 'vue'
export default defineComponent({
  setup() {
   const obj:any = {//为了在使用obj.gender='男'的时候不出现这个错误信息才加上
      name: "小明",
      age: 18,
      wife: {
        name: "HHHHH",
        age: 19,
        cars: ["奔驰", "宝马"],
      },
    };
    //返回的是一个Proxy的代理对象，被代理的目标对象就是obj对象
    //user现在是代理对象，obj是目标对象
    //user的类型是Proxy
    const user = reactive<any>(obj);
    const updateUser = () => {
      //  obj.name='LLLLL';
      //直接使用目标对象的方式来更新目标对象中的成员的值，是不可能的，只能使用代理对象来更新
      user.name = "LLLLL";
      user.wife.name = "小小小";
      user.wife.cars[0] = "玛莎拉蒂";

      //1、添加对象
      //obj.gender='男' //数据改变，视图不会更新，但是 user.name...更新的话，也会导致它更新（即如果改对象内有响应式变化的话，使用目标对象的改变也会更新）
      // user.gender='男' //数据改变，视图会更新,而且这个数据也添加到了obj对象中


      //2、删除属性
      // delete obj.age;//数据改变，视图不会更新，但是 user.name...更新的话，也会导致它更新（即如果改对象内有响应式变化的话，使用目标对象的改变也会更新）
      delete user.age; //数据改变，视图会更新,而且obj也没有age这个属性

      //总结：如果操作代理对象，目标对象的数据也会随之变化。同时如果想要操作数据的时候界面也要跟着重新更新渲染，那么也是操作代理对象
      
      //3、可以深度检测
      //通过代理对象找到该对象中的某个属性，更改该属性中的数组对象
      user.wife.cars[0]='本田'
      //通过代理对象把目标对象中的某个数组属性添加一个新值
      user.wife.cars[2]='本田222'
      console.log(obj)
    };

    return {
      state,
      update
    }
  }
})
</script>
```

## 4、 比较 Vue2 与 Vue3 的响应式(重要)

### vue2 的响应式

**核心**

- 对象：通过 `defineProperty` 对对象的已有属性值的读取和修改进行劫持(监视/拦截)
- 数组：通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持。（改一个数组的数据需要对整个数组进行重写）

```javascript
Object.defineProperty(data, 'count', {
  get() {},
  set() {}
})
```

**问题**

- 对象直接新添加的属性或删除已有属性， 界面不会自动更新
- 直接通过下标替换元素或更新 length， 界面不会自动更新 arr[1] = {}
- 所以后面出现了一个方法叫$set()，实现响应式操作。

### Vue3 的响应式

**核心:**

- 通过 Proxy(代理)： 拦截对 data 任意属性的任意(13 种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...

  + 通过Proxy实现普通对象变响应式对象的一个操作
  + 语法：new Proxy(target,handler)。handler各个方法内部要配合 reflect（反射对象，做反射操作）

- 通过 Reflect(反射)： 动态对被代理对象的相应属性进行特定的操作。

  + 通过反射对象，将目标对象的属性和属性值，直接返回来
  + reflect 内置对象，不能new，调用静态方法

- 文档：
  
  + [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
  
  + [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

**实现：**

```js
const user = {
    name: "小明",
    age: 18,
    wife: {
        name: "HHHHH",
        age: 19,
        cars: ["奔驰", "宝马"],
    },
};

//把目标对象变成代理对象
//参数1：user--------->target目标对象
//参数2：handler------->处理器对象，用来监视数据，及操作数据
const proxyUser=new Proxy(user,{
    //获取目标对象的某个属性值
    //prop 属性值
    get(target,prop){
        console.log('get方法调用');
        return Reflect.get(target,prop);
    },
    //修改目标对象的属性值/为目标对象添加新的属性
    set(target,prop,val){
        console.log('set方法调用');
        return Reflect.set(target,prop,val);
    },
    //删除目标对象上的某个属性
    deleteProperty(target,prop){
        console.log('delete方法调用');
        return Reflect.deleteProperty(target,prop);
    }
})


//通过代理对象获取目标对象中的某个属性值
console.log(proxyUser.name);
//通过代理对象更新目标对象上的属性值
proxyUser.name='XIAOlll';
console.log(user);
//通过代理对象向目标对象中添加一个新的属性值
proxyUser.gender='男';
console.log(user);
//通过代理对象删除目标对象中的某个值
delete proxyUser.name;
console.log(user);
//更新目标对象中的某个属性对象中的属性值
proxyUser.wife.name='小黄';
console.log(user);

```

## 5、 setup 细节

- setup 执行的时机
  - 在 beforeCreate 之前执行(一次), 此时组件对象还没有创建
  - this 是 undefined, 不能通过 this 来访问 data/computed/methods / props
  - 其实所有的 composition API 相关回调函数中也都不可以通过 this 来访问
- setup 的返回值
  - 一般都返回一个对象: 为模板提供数据, 也就是模板中可以直接使用此对象中的所有属性/方法
  - 返回对象中的属性会与 data 函数返回对象的属性合并成为组件对象的属性
  - 返回对象中的方法会与 methods 中的方法合并成为组件对象的方法
  - 如果有重名, setup 优先
  - 一般不要混合使用: methods 中可以访问 setup 提供的属性和方法, 但在 setup 方法中不能访问 data 和 methods（因为this是undefined）
  - setup 不能是一个 async 函数: 因为返回值不再是 return 的对象, 而是 promise, 模板看不到 return 对象中的属性数据
- setup 的参数
  - setup(props, context) / setup(props, {attrs, slots, emit})
  - props: 包含 props 配置声明且传入了的所有属性的对象
  - attrs: 包含没有在 props 配置中声明的属性的对象, 相当于 this.$attrs
  - slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
  - emit: 用来分发自定义事件的函数, 相当于 this.$emit

```vue
<template>
  <h2>App</h2>
  <p>msg: {{ msg }}</p>
  <button @click="fn('--')">更新</button>
  <child :msg="msg" msg2="cba" @fn="fn" />
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import child from './child.vue'

export default {
  components: {
    child
  },

  setup() {
    const msg = ref('abc')

    function fn(content: string) {
      msg.value += content
    }
    return {
      msg,
      fn
    }
  }
}
</script>
```

```vue
<template>
    <h3>{{ n }}</h3>
    <h3>{{ m }}</h3>

    <h3>msg: {{ msg }}</h3>
    <h3>msg2: {{ $attrs.msg2 }}</h3>

    <slot name="xxx"></slot>

    <button @click="update">更新</button>
</template>

<script lang="ts">
    import { ref, defineComponent } from 'vue'

    export default defineComponent({
        name: 'child',

        props: ['msg'],

        emits: ['fn'], // 可选的, 声明了更利于程序员阅读, 且可以对分发的事件数据进行校验

        data() {
            console.log('data', this)
            return {
                // n: 1
            }
        },

        beforeCreate() {
            console.log('beforeCreate', this)
        },

        methods: {
            // update () {
            //   this.n++
            //   this.m++
            // }
        },

        // setup (props, context) {
        setup(props, { attrs, emit, slots }) {
            console.log('setup', this)
            console.log(props.msg, attrs.msg2, slots, emit)

            const m = ref(2)
            const n = ref(3)

            function update() {
                // console.log('--', this)
                // this.n += 2
                // this.m += 2

                m.value += 2
                n.value += 2

                // 分发自定义事件
                emit('fn', '++')
            }

            return {
                m,
                n,
                update
            }
        }
    })
</script>
```

## 6、 reactive 与 ref-细节

- 是 Vue3 的 composition API 中 2 个最重要的响应式 API
- ref 用来处理基本类型数据, reactive 用来处理对象(递归深度响应式)
- 如果用 ref 对象/数组, 内部会自动将对象/数组转换为 reactive 的代理对象
- ref 内部: 通过给 value 属性添加 getter/setter 来实现对数据的劫持
- reactive 内部: 通过使用 Proxy 来实现对对象内部所有数据的劫持, 并通过 Reflect 操作对象内部数据
- ref 的数据操作: 在 js 中要.value, 在模板中不需要(内部解析模板时会自动添加.value)

```vue
<template>
    <h2>App</h2>
    <p>m1: {{ m1 }}</p>
    <p>m2: {{ m2 }}</p>
    <p>m3: {{ m3 }}</p>
    <button @click="update">更新</button>
</template>

<script lang="ts">
    import { reactive, ref } from 'vue'
    export default defineComponent({
        setup(){
            //ref方式设置数据
            const m1=ref('abc');
            const m2=reactive({
                name:'小明',
                wife:{
                    name:'小虹'
                }
            })
            //ref也可以传入一个对象吗？
            const m3=ref({
                name:'小明',
                wife:{
                    name:'小虹'
                }
            })
            const update=()=>{
                m1.value='HHHH';
                m2.wife.name='LLLL';
                //ref中，如果放入的是一个对象，那么是经过了reactive的处理，形成了一个Proxy类型的对象
                console.log(m3);
                console.log(m3.value);//Proxy类型
                console.log(m3.value.wife);//Proxy类型
                m3.value.name='HHHH'
                m3.value.wife.name='LLLL'
            }
            return{
                m1,
                m2,
                m3,
                update
            }
        }
    })
</script>
```



## 7、计算属性与监视

- computed 函数:
  - 与 computed 配置功能一致
  - 只有 getter
  - 有 getter 和 setter
- watch 函数
  - 与 watch 配置功能一致
  - 监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
  - 默认初始时不执行回调, 但可以通过配置 immediate 为 true, 来指定初始时立即执行第一次
  - 通过配置 deep 为 true, 来指定深度监视
- watchEffect 函数
  - 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
  - 默认初始时就会执行第一次, 从而可以收集需要监视的数据
  - 监视数据发生变化时回调

```vue
<template>
    <h2>计算属性与监视</h2>
    <fieldset>
        <legend>姓名操作</legend>
        姓氏： <input type="text" placeholder="请输入姓氏" v-model="user.firstName"> <br>
        名字： <input type="text" placeholder="请输入名字" v-model="user.lastName"><br>
    </fieldset>
    <fieldset>
        <legend>计算属性与监视的演示</legend>
        姓名： <input type="text" placeholder="显示名字" v-model="fullName1"> <br>
        姓名： <input type="text" placeholder="显示名字" v-model="fullName2"> <br>
        姓名： <input type="text" placeholder="显示名字" v-model="fullName3"> <br>
    </fieldset>
</template>

<script lang="ts">
import { reactive, ref, computed, watch, watchEffect } from 'vue'
export default {
  setup() {
    const user = reactive({
      firstName: 'A',
      lastName: 'B'
    })
    // 只有getter的计算属性
    const fullName1 = computed(() => {
      console.log('fullName1')
      return user.firstName + '-' + user.lastName
    })
    // 有getter与setter的计算属性
    const fullName2 = computed({
      get() {
        console.log('fullName2 get')
        return user.firstName + '-' + user.lastName
      },

      set(value: string) {
        console.log('fullName2 set')
        const names = value.split('-')
        user.firstName = names[0]
        user.lastName = names[1]
      }
    })
    const fullName3 = ref('')
    /*
    watchEffect: 监视所有回调中使用的数据
    */
    /*
    watchEffect(() => {
      console.log('watchEffect')
      fullName3.value = user.firstName + '-' + user.lastName
    })
    */
    /*
    使用watch的2个特性:
      深度监视
      初始化立即执行
    */
    watch(
      user,
      () => {
        fullName3.value = user.firstName + '-' + user.lastName
      },
      {
          immediate: true, // 是否初始化立即执行一次, 默认是false
        deep: true // 是否是深度监视, 默认是false
      }
    )

    /*
    watch一个数据:
      默认在数据发生改变时执行回调
    */
    watch(fullName3, value => {
      console.log('watch')
      const names = value.split('-')
      user.firstName = names[0]
      user.lastName = names[1]
    })

    /*
    watch多个数据:
      使用数组来指定
      如果是ref对象, 直接指定
      如果是reactive对象中的属性,  必须通过函数来指定
    */
    watch([() => user.firstName, () => user.lastName, fullName3], values => {
      console.log('监视多个数据', values)
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
}
</script>
```



## 8、生命周期

**vue2.x 的生命周期**

+ 创建：父（beforeCreate、created、beforeMount）——>子（beforeCreate、created、beforeMount、mounted）——>父（mounted）

+ 子卸载：父（beforeUpdate）——>子（beforeUnmount、onUnmounted）——>父（updated）

**vue3 的生命周期**



**与 2.x 版本生命周期相对应的组合式 API**

- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> `onUnmounted`
- `errorCaptured` -> `onErrorCaptured`

**新增的钩子函数**

组合式 API 还提供了以下调试钩子函数：

- onRenderTracked
- onRenderTriggered

**特点：**

+ vue3的钩子优先于vue2

```vue
<template>
    <h3>生命周期演示组件</h3>
    <p>{{msg}}</p>
    <button @click="update">更新msg</button>
</template>

<script lang='ts'>
import { defineComponent, ref,onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue';
export default defineComponent({
    name:'LifeCycle',
    //vue2.x中的生命周期钩子
    beforeCreate(){
        console.log('vue2.x中beforeCreate');
    },
    created(){
        console.log('vue2.x中created');
    },
    beforeMount(){
         console.log('vue2.x中beforeMount');
    },
    mounted(){
         console.log('vue2.x中mounted');
    },

    beforeUpdate(){
         console.log('vue2.x中beforeUpdate');
    },
    updated(){
         console.log('vue2.x中updated');
    },
    //vue2.x中的beforeDestroy和destroyed这个两个生命周期回调在vue3中已经改名了，所以不能再使用
    beforeUnmount(){
         console.log('vue2.x中beforeUnmount');
    },
    unmounted(){
         console.log('vue2.x中unmounted');
    },
    setup(){
        console.log('vue3.x中的setup')
        const msg=ref('abc');
        const update=()=>{
            msg.value='hahhahahhaha';
        }
        onBeforeMount(()=>{
           console.log('vue3.x中的onBeforeMount');
        });
        onMounted(()=>{
           console.log('vue3.x中的onMounted');
        });
        onBeforeUpdate(()=>{
           console.log('vue3.x中的onBeforeUpdate');
        });
        onUpdated(()=>{
           console.log('vue3.x中的onUpdated');
        });
        onBeforeUnmount(()=>{
           console.log('vue3.x中的onBeforeUnmount');
        });
        onUnmounted(()=>{
           console.log('vue3.x中的onUnmounted');
        });
        return{
            msg,
            update
        }
    }
  
});
</script>

```

```vue
<template>
    <h2>App</h2>
    <button @click="isShow = !isShow">切换</button>
    <LifeCycle v-if="isShow" />
</template>
<script lang="ts">
    import Child from './LifeCycle.vue'
    export default {
        data() {
            return {
                isShow: true
            }
        },
        components: {
            LifeCycle
        }
    }
</script>
```



## 9、自定义 hook 函数

- 使用 Vue3 的组合 API 封装的可复用的功能函数
- 自定义 hook 的作用类似于 vue2 中的 mixin 技术
- 自定义 Hook 的优势： 很清楚复用功能代码的来源, 更清楚易懂

+ **需求 1: 收集用户鼠标点击的页面坐标**

```js
//hooks/useMousePosition.ts
import { ref, onMounted, onUnmounted } from 'vue'
/*
收集用户鼠标点击的页面坐标
*/
export default function useMousePosition() {
    // 初始化坐标数据
    const x = ref(-1)
    const y = ref(-1)
    // 用于收集点击事件坐标的函数
    const updatePosition = (e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    }
    // 挂载后绑定点击监听
    onMounted(() => {
        document.addEventListener('click', updatePosition)
    })
    // 卸载前解绑点击监听
    onUnmounted(() => {
        document.removeEventListener('click', updatePosition)
    })
    return { x, y }
}

```

```vue
<template>
    <h2>x: {{ x }}, y: {{ y }}</h2>
</template>
<script>
    import { ref } from 'vue'
    /*
    在组件中引入并使用自定义hook
    自定义hook的作用类似于vue2中的mixin技术
    自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂
    */
    import useMousePosition from './hooks/useMousePosition'

    export default {
        setup() {
            const { x, y } = useMousePosition()

            return {
                x,
                y
            }
        }
    }
</script>
```

利用 TS 泛型强化类型检查

+ **需求 2: 封装发 ajax 请求的 hook 函数**

```ts
//hooks/useRequest.ts
import { ref } from 'vue'
import axios from 'axios'

/*使用axios发送异步ajax请求*/
export default function useUrlLoader<T>(url: string) {
  const result = ref<T | null>(null)
  const loading = ref(true)
  const errorMsg = ref(null)

  axios.get(url).then(response => {
      loading.value = false
      result.value = response.data
    })
    .catch(e => {
      loading.value = false
      errorMsg.value = e.message || '未知错误'
    })

  return {loading,result,errorMsg}
}
```

```vue
<template>
  <div class="about">
    <h2 v-if="loading">LOADING...</h2>
    <h2 v-else-if="errorMsg">{{ errorMsg }}</h2>
    <!-- <ul v-else>
    <li>id: {{result.id}}</li>
    <li>name: {{result.name}}</li>
    <li>distance: {{result.distance}}</li>
  </ul> -->

    <ul v-for="p in result" :key="p.id">
      <li>id: {{ p.id }}</li>
      <li>title: {{ p.title }}</li>
      <li>price: {{ p.price }}</li>
    </ul>
    <!-- <img v-if="result" :src="result[0].url" alt=""> -->
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'
import useRequest from './hooks/useRequest'

// 地址数据接口
interface AddressResult {
  id: number
  name: string
  distance: string
}
// 产品数据接口
interface ProductResult {
  id: string
  title: string
  price: number
}
export default {
  setup() {
    // const {loading, result, errorMsg} = useRequest<AddressResult>('/data/address.json')
    const { loading, result, errorMsg } = useRequest<ProductResult[]>('/data/products.json')
   // result--->一开始是null  后面返回的可能是数组，也可能是对象，不确定是什么类型，所以，应该定义成泛型 
    watch(result, () => {
      if (result.value) {
        console.log(result.value.length) // 有提示
      }
    })
    return {
      loading,
      result,
      errorMsg
    }
  }
}
</script>
```



## 10、toRefs

**作用：**把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref

**应用：**当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用

**问题：** reactive 对象取出的所有属性值都是非响应式的

**解决：** 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性



```vue
<template>
    <h2>toRefs的作用</h2>
    <!-- <p>name:{{user.name}}</p>
    <p>age:{{user.age}}</p> -->
    <p>name:{{name}}</p>
    <p>age:{{age}}</p>


    <p>name3:{{name3}}</p>
    <p>age3:{{age3}}</p>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, toRef } from 'vue';

//toRefs的应用
//外面定义了一个Hook
function useFeatureX() {
    const user = reactive({
        name3: "HAHHA",
        age3: 18,
    });
    return{
        ...toRefs(user)//这样子每个属性都是响应式属性
    }
}

export default defineComponent({
    name: "TORefsDemo",
    setup() {
        const user = reactive({
            name: "HAHHA",
            age: 18,
        });
        //把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref
        const user2 = toRefs(user);
        // console.log(user2);//{name: ObjectRefImpl, age: ObjectRefImpl},user2.name、user2.age都是ref响应式。
        // const { name, age } = toRefs(user);//name,age都是ref响应式

        const { name3, age3 } = useFeatureX();

        //定时器更新数据（数据变化，界面变化，肯定是响应数据）
        /*setInterval(() => {
            //user.name+='+++++';
            //user2.name.value += "+++++";
            // name.value += "+++++";
            // name3.value += "+++++";
        }, 2000);*/
        return {
            // user
            // ...user//不是响应式数据了，---->name:'HAHHA',age:1
            ...user2,//是响应式的
            // name,
            // age,
            name3,
            age3,
        };
    },
});
</script>
```



## 11、ref 获取元素

利用 ref 函数获取组件中的标签元素

需求：页面加载完毕后，页面中的文本框可以直接获取焦点（自动获取焦点）

```vue
<template>
    <h2>ref获取页面中的元素</h2>
    <input type="text" ref="inputRef">
</template>

<script lang='ts'>
import { defineComponent,onMounted,ref} from 'vue';
export default defineComponent({
    name:'RefDom',
    setup(){
        //默认是空的，页面加载完毕，说明组件已经存在了，获取文本框的元素
        const inputRef=ref<HTMLElement|null>(null);
        //页面加载完毕执行的生命钩子
        onMounted(()=>{
            console.log( inputRef.value);//获取到的是<input type="text">
            inputRef.value&&inputRef.value.focus()
        })
        return{
             inputRef
        }
    }
});
</script>
```

