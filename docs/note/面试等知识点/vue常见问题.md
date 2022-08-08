#### Vue

### 对于MVVM的理解

+ MVVM 是 Model - View - ViewModel 的缩写
+ Model ：代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑。我们可以把 Model 称为数据层，因为它仅仅关注数据本身，不关心任何行为
+ View ：用户操作界面。当 ViewModel 对 Model 进行更新的时候，会通过数据绑定更新到 View 
+ ViewModel ：业务逻辑层， View 需要什呢数据， ViewModel 要提供这个数据； View 有操作， ViewModel 就要响应这些操作，所以可以说它是 Model for View .
+ 总结： MVVM 模式简化了界面与业务的依赖，解决了数据频繁更新。 MVVM 在使用当中，利用双向绑定技术，使得 Model 变化，ViewModel 会自动更新，而 ViewModel 变化时， View 也会自动变化。开发人员就不用一次次的操作Dom来更新视图。

### MVC、MVP、MVVM

**MVC**

+ View->Controller->Model->View。不灵活，一个功能要分好几块，写到不同文件中去。
+ Model：负责保存应用数据，与后端进行同步
+ Controller：负责业务逻辑，根据用户行为对Model数据进行修改
+ View：负责视图展示，将model中数据可视化出来

+ Model改变->通知Controller->Controller更新View
+ View用户用行为->通知Controller->Controller更新Model

**MVP**

+ View<->Presenter <->Model

+ Presenter ：中间人，做的事太多

**MVVM**

+ MVVM本质是MVC（Model-View-Controller）框架的改进版。
+ **vm层（视图模型层）通过接口从后台m层（model层）请求数据，vm层继而和v（view层）实现数据的双向绑定。**
+ Model代表的是数据模型，View是视图层也就是界面，ViewModel是数据双向绑定。由于数据的双向绑定，开发人员就不用一次次的操作Dom来更新视图。
+ View层展现的不是Model的数据而是View-Model的数据，这就显现出了View与Model的分离。因为ViewModel负责与Model交互。这就解耦了View层与Model层。也就实现了前后端分离
+ **MVVM框架的好处，前后端分离，复用高，低耦合。**

**总结**

+ 三者都是框架模式，设计的目的都是为了解决Model和View的耦合问题
+ MVC出现较早主要应用后端，如Spring。前端早期也有应用，如Backbone.js。有点分层清晰，缺点数据混乱、维护难。
+ MVP，加入Presenter中间层负责MV通信，解决两者耦合问题，但是 Presenter层过于臃肿，难以维护。
+ MVVM，不仅解决了MV耦合问题，不需要大量的代码来维护两者的关系和DOM操作。提高开发效率、可读性、性能。

### vue单页面和传统页面的区别

**单页面应用（ SPA )**

+ 指只有一个主页面的应用，浏览器一开始要加载所有必须的 html , js , css。

+ 所有的页面内容都包含在这个所谓的主页面中。

+ 但在写的时候，还是会分开写（页面片段），然后在交互的时候由路由程序动态载入，单页面的页面跳转，仅刷新局部资源。

+ 多应用于 pc 端。

**多页面（ MPA )**

+ 指一个应用中有多个页面，页面跳转时是整页

**单页面的优点：**

+ 用户体验好，快，内容的改变不需要重新加载整个页面，基于这一点 spa 对服务器压力较小；
+ 前后端分离；
+ 页面效果会比较炫酷（比如切换页面内容时的专场动画）。

**单页面缺点：**

+ 不利于 seo ；
+ 导航不可用，如果一定要导航需要自行实现前进、后退。（由于是单页面不能用浏览器的前进后退功能，所以需要自己建立堆栈管理）;
+ 初次加载时耗时多；
+ 页面复杂度提高很多。

### vue的两个核心点

+ 数据驱动：ViewModel，保证数据和视图的一致性。
+ 组件系统：应用类UI可以看作全部是由组件树构成的。

### Vue组件data要函数的形式

+ 根实例对象 data 可以是对象也可以是函数（根实例是单例），不会产生数据污染情况
+ 组件实例对象 data 必须为函数，目的是为了防止多个组件实例对象之间共用一个 data ，产生数据污染。采用函数的形式，initData 时会将其作为工厂函数都会返回全新 data 对象



+ 在Vue中组件是可以被复用的，而当data是一个函数的时候，每一个实例的data都是独立的，不会相互影响，保证组件的独立性和可复用性。

+ 一个组件可以被多次引用。
+ Object是引用数据类型，如果data是个对象，每个组件的data 指向同一个地址，一个数据改变了其他也改变了。
+ data是一个函数时，每次调用都重新return一个新的对象，没有相互影响。




```js
/*********是个对象***************/
var Component= function() {
}
Component.prototype.data = {//是同一个对象,内存地址一样
  a: 1,
  b: 2
}
// 使用组件
var component1 = new Component()
var component2 = new Component()
component1.data.b = 3
component2.data.b   //3
/*********是个函数***************/
var Component= function() {
}
Component.prototype.data = function() {
  return { //  不是同一个对象，内存地址不一样
     a: 1,
     b: 2
  }
}
// 使用组件
var component1 = new Component()
var component2 = new Component()
component1.data.b = 3
component2.data.b   // 2
```

**为什么Vue的根实例data没有限制？**

+ 在一个Vue项目中，根实例不会出现被复用的情况，因此不必要求data一定是一个返回对象的函数

### vue中的key

+ `:key="唯一标识"`
+ 使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，作用主要是为了高效的更新虚拟DOM
+ 高效更新虚拟DOM，其原理是vue在patch过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得patch过程更加高效，减少DOM操作，提高性能
+ 不设置，在列表更新时引发一些隐藏的bug，尽量不要采用索引作为key
+ vue中使用相同标签名元素的过渡切换时，也会使用key属性，其目的，也是为了区分他们。否则vue只会替换其内部属性而不会触发过渡效果




### 什么是虚拟dom？

+ 虚拟dom本质上就是一个普通的JS对象来描述真实Dom（视图的界面结构），是对真实Dom的抽象
+ 在vue中，每个组件都有一个render函数，每个render函数都会返回一个虚拟dom树，这也就意味着每个组件都对应一棵虚拟DOM树
+ 虚拟Dom不依赖真实平台环境，可以实现跨平台

### 为什么需要虚拟dom？

+ 在vue中，渲染视图会调用render函数，这种渲染不仅发生在组件创建时，同时发生在视图依赖的数据更新时。
+ 如果在渲染时，直接操作真实DOM，由于真实DOM的创建、更新、插入等操作会带来大量的性能损耗，从而就会极大的降低渲染效率。但是js层的操作效率高，可以将Dom操作转化成对象操作。最终通过diff算法比对差异进行更新Dom
+ 因此，vue在渲染时，使用虚拟dom来替代真实dom，主要为解决渲染效率的问题。

### 虚拟dom是如何转换为真实dom的？

+ 在一个组件实例首次被渲染时，它先生成虚拟dom树，然后根据虚拟dom树创建真实dom，并把真实dom挂载到页面中合适的位置，此时，每个虚拟dom便会对应一个真实的dom。
+ 如果一个组件受响应式数据变化的影响，需要重新渲染时，它仍然会重新调用render函数，创建出一个新的虚拟dom树，用新树和旧树对比，通过diff算法对比，vue会找到最小更新量，然后更新必要的真实dom节点
+ 这样一来，就保证了对真实dom达到最小的改动。

+ 

### 你怎么理解vue中的diff算法？

**是什么**

+ 一种算法，通过新旧虚拟DOM做对比（即diff），有变化的地方更新在真实的DOM上

**为什么**：

+ 渲染真实DOM的开销是很大的，如修改了某个数据，如果直接渲染到真实dom上会引起整个dom树的重绘和重排
+ 怎么解决只更新修改的一小块dom而不要更新整个dom？

+ **目的**：减少渲染真实DOM的开销，提高性能。
+ **高效性**，时间复杂度O(n)，如果是树形是O(n^3)

+ **必要性**：每个组件只有一个Watcher，只有引入diff才能精准找到发生变化的地方

**什么时候会执行diff**

+ 页面更新，重新渲染时用到
+ Vue中当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁。React在下一次 state 或 props 更新时， render()方法会返回一棵不同的树。在构建fiber时，标记effectTag为Placement、Update、Deletion等。在commitWork构建真实DOM时，按照effectTag规则生成DOM。
+ Watcher调用，为什么Watcher调用，修改数据，数据响应式触发setter ,setter触发通知，Watcher添加到异步更新队列，Watcher更新函数，组件的渲染函数和组件更新函数，

**怎么执行**

+ diff执行时，是组件实例执行更新函数时，它会对比上一次渲染结果oldVnode和新的渲染结果newVnode，这个过程称为patch（打补丁）

**怎么执行**

+ **整体策略**：深度优先，同层比较。
+ 先判断有没有子节点，再执行不同的操作。
+ 两个节点的比较，先首尾元素进行比较，找到了相同的就打补丁，没有找到按照传统的遍历查找，查找结束，处理剩下的节点。
+ 借助key可以非常精确找到相同节点，使patch过程更高效

### Vue的diff算法原理是什么？

+ 深度优先，同层比较。

+ vue的diff算法是平级比较，不考虑跨级比较的情况。
+ 内部采用深度递归的方式＋双指针方式比较。
+ 先比较儿子节点，考虑老节点和新节点儿子的情况
+ 优化比较：头头、尾尾、头尾、尾头
+ 比对查找，进行复用

### 既然vue通过数据劫持可以精准的探测数据变化，为什么还要进行diff检测差异？

+ 响应式数据变化，Vue确实可以在数据变化的时候，响应式系统可以立刻得知。
+ 但是如何每个属性都添加watcher的话，性能会非常的差。
+ 粒度过细，会号致更新不精准所以采用watcher + Diff算法来检测差异。

+ 

### 双向绑定v-model的原理

+ vue2：最核心的方法是通过Object.defineProperty()来实现对属性的劫持，达到监听数据变化的目的

+ 而我们主要使用v-model在表单元素上创建双向数据绑定

  本质的语法糖是：input等元素上是value属性+input事件；checkbox和radio使用checked属性+change事件

+ 在自定义组件上，v-model会默认利用名为value的prop和名为input的事件

### 谈谈你对Vue中响应式数据的理解？

+ 数组和对象类型的值变化的时候，通过`defineReactive`方法，借助`defineProperty`，将所有的属性添加了getter和setter。用户在取值和设置的时候，可以进行一些操作。
+ 缺陷：只能监控最外层的属性，如果是多层的，就要进行全量递归。
+ get里面会做依赖搜集 (dep[watcher,watcher]） set里面会做数据更新 (notify，通知watcher更新）

### vue中如何检测数组的变化？

+ vue中对数组没有进行defineProperty，而是重写了数组的7个方法。分别是：push、shift、pop、splice、unshift、sort、reverse
+ 因为这些方法都会改变数组本身。
+ 数组里的索引和长度是无法被监控的。



### Vue中如何进行依赖收集的？

+ Vue初始化的时候，挂载之后会进行编译。生成renderFunction。当取值的时候，就会搜集watcher，放到dep里面。
+ 当用户更改值的时候，就会通知watcher，去更新视图。

### 如何理解Vue中的模板编译原理？

+ 这个问题的核心是如何将template转换成render函数。
+ 将template模块转换成ast语法书-parserHTML对静态语法做标记（某些节点不改变）
+ 重新生成代码-codeGen，使用with语法包裹字符串

### Vue.set方法是如何实现的？

+ vue给对象和数组本身都增加了dep(订阅器集合)属性
+ 当给对象新增不存在的属性的时候，就会触发对象依赖的watcher(订阅者)去更新
+ 当修改数组索引的时候，就调用数组本身的splice方法去更新数组

> https://blog.csdn.net/liu19721018/article/details/125554525

### vue 中＄nextTick 作用与原理

> 作用：是为了可以获取更新后的 DOM 。(为了在DOM更新后执行某个操作)

+ 由于 Vue DOM 更新是异步执行的，即修改数据时，视图不会立即更新，而是会监听数据变化，并缓存在同一事件循环中，所有数据变化完成之后，再统一进行视图更新。使用nextTick()可以保证用户定义的逻辑再更新之后执行
+ 为了确保得到更新后的 DOM ，所以设置了 Vue.nextTick()，就是在下次 DOM 更新循环结束之后执行延迟回调。
+ 在修改数据之后立即使用这个方法，获取更新后的 DOM 。

**原理：**

+ 异步任务有两种：macro-task(宏任务)和micro-task(微任务)

- 宏任务主要包含：setTimeout、setInterval、MeaasgeChanel( 通信的管道 )、postMessage( 发送数据 )、setlmmediate( Node.js )
- 微任务主要包含：Promise.then、MutaionObserver( 用来监视 DOM 变动 )

+ 在下次 DOM 更新循环结束之后执行延迟回调。 nextTick  有可能是微任务，也有可能是宏任务 。根据执行环境分别尝试采用
  + Promise 
  + MutationObserver 
  + setlmmediate 
  + 如果以上都不行则采用 setTimeout 
+ 总结：它对于浏览器异步API的选用规则如下，Promise存在取由Promise.then，不存在Promise则取MutationObserver，MutationObserver不存在setImmediate，setImmediate不存在最后取setTimeout来实现。
+ 定义了一个异步方法，多次调用 nextTick 会将方法存入队列中，通过这个异步方法清空当前队列。

### vue中keep-alive的实现原理

+   Keep-alive 是 Vue 的一个内置组件，会缓存不活动的组件实例，防止重复渲染DOM。
+  **注意：想要缓存的组件一定要给定name属性，并且要和include，exclude给定的值一致**

**原理**

+  keep-alive 缓存也是基于VNode节点而不是直接存储 DOM 节点。

**参数**

+ Keep-alive 组件提供了 **include** 和 **exclude** 两个属性，允许组件有条件的进行缓存。 
+ **include**: 字符串或正则表达式。只有匹配的组件会被缓存。
+ **exclude**: 字符串或正则表达式。任何匹配的组件都不会被缓存。

**组件代码**

+  Keep-alive 组件created钩子会创建一个cache对象，用来作为缓存容器，保存vnode节点。 
+ 将需要缓存的VNode节点保存在this.cache中，在render时，如果VNode的name符合在缓存条件（可以用include以及exclude控制），则会从this.cache中取出之前缓存的VNode实例进行渲染。

> https://blog.csdn.net/qq_38974163/article/details/124033860

###  keep-alive的生命周期

- 初次进入时：created > mounted > activated；退出后触发 deactivated
- **activated** ：当页面存在缓存的时候执行该函数。
- **deactivated** ：在页面结束时触发该方法，可清除掉滚动方法等缓存。
- 再次进入：会触发 activated；事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中

> https://www.jianshu.com/p/a97b623dde98

###  new Vue 以后发生的事情

1、 new Vue 会调用 Vue 原型链上的`＿init` 方法对 Vue 实例进行初始化；

2、首先是 initLifecycle 初始化生命周期，对 Vue 实例内部的一些属性（如 children 、 parent 、 isMounted ）进行初始化；

3、 initEvents ,初始化当前实例上的一些自定义事件（Vue.$on);

4、 initRender ，解析 slots 绑定在 Vue 实例上，绑定 createElement 方法在实例上；

5、完成对生命周期、自定义事件等一系列属性的初始化后，触发生命周期钩子 beforeCreate ;

6、 initlnjections ，在初始化 data 和 props 之前完成依赖注入（类似于 React . Context );

7、 initState ，完成对 data 和 props 的初始化，同时对属性完成数据劫持内部，启用监听者对数据进行监听（更改）；

8、 initProvide ，对依赖注入进行解析；

9、完成对数据（ state 状态）的初始化后，触发生命周期钩子 created ;

10、进入挂载阶段，将 vue 模板语法通过 vue-loader 解析成虚拟 DOM 树，虚拟 DOM 树与数据完成双向绑定，触发生命周期钩子 beforeMount ;
11、将解析好的虚拟 DOM 树通过 vue 渲染成真实 DOM ，触发生命周期钩子 mounted ;

### 生命周期

Vue生命周期总共可以分为8个阶段：创建前后, 载入前后,更新前后,销毁前销毁后，以及一些特殊场景的生命周期

- **beforeCreate**：创建前。此时，组件实例刚刚创建，还未进行数据观测和事件配置，拿不到任何数据。
- **created**：创建完成。vue 实例已经完成了数据观测，属性和方法的计算(**比如props、methods、data、computed和watch此时已经拿得到**)，**未挂载到DOM**，不能访问到el属性，el属性，ref属性内容为空数组常用于**简单的ajax请求**，页面的初始化。
- **beforeMount**：挂载前。挂在开始之前被调用，相关的render函数首次被调用（虚拟DOM）。编译模板，把data里面的数据和模板生成html，完成了el和data 初始化，注意此时**还没有挂在html到页面上**。
- **mounted**：挂载完成。也就是模板中的HTML渲染到HTML页面中，此时可以通过DOM API获取到DOM节点，$ref属性可以访问常用于获取VNode信息和操作，ajax请求，mounted只会执行一次。
- **beforeUpdate**：在数据更新之前被调用，发生在虚拟DOM重新渲染和打补丁之前，不会触发附加地重渲染过程。
- **updated**：更新后。在由于数据更改导致地虚拟DOM重新渲染和打补丁之后调用，
- **beforeDestroy**;销毁前。在实例销毁之前调用，实例仍然完全可用。（一般在这一步做一些重置的操作，比如清除掉组件中的定时器 和 监听的dom事件）
- **destroyed**：销毁后。在实例销毁之后调用，调用后，vue实列指示的所有东西都会解绑，所有的事件监听器会被移除。
  其他：
- **activated**：在keep-alive组件激活时调用
- **deactivated**：在keep-alive组件停用时调用

### 生命周期中异步加载是在mouted还是create里实现

>  最常用的是在 created 钩子函数中调用异步求

解析：
一般来说，可以在， created , mounted 中都以发送数据请求，但是，大部分时候，会在 created 发送请求。

 Created 的使用场景：如果页面首次渲染的就来自后端数据。因为，此时 data 已经挂载到 vue 实例了。

在 created （如果希望首次选的数据来自于后端，就在此处发请求）（只发了异步请求，渲染是在后端响应之后才进行的）、 beforeMount 、 mounted （在 mounted 中发请求会进行二次渲染）这三个钩子函数中进行调用。

因为在这三个钩子函数中， data 已经创建，可以将服务端端返回的数据进行赋值。

但是**最常用的是在 created 钩子函数中调用异步请求**，因为在 created 钩子函数中调用异步请求有两个优点：

+ 第一点：能更快获取到服务端数据，减少页面 loading 时间；
+ 第二点：放在 created 中有助于一致性，因为 ssr 不支持 beforeMount 、 mounted 钩子函数。


### **指令和修饰符**

https://www.cnblogs.com/jiajia-hjj/p/15368484.html

+ v-bind、v-on、v-model、v-for、v-show/v-if、v-once、v-html、v-text、v-pre、v-cloak



**v-on修饰符**

- **.stop**： 阻止冒泡 event.stopPropagation()

- **.prevent** ：阻止默认事件 event.preventDefault()

- .监听某个键盘的键帽： 如.enter，监听回车

  ```html
  <input type="text" @keyup.enter="keyUp">
  ```

- **.once** ：只触发一次

- **.native**： 监听组件根元素的原生事件

- **.capture**：与事件冒泡的方向相反，事件捕获由外到内；

- **.self**：只会触发自己范围内的事件，不包含子元素

**v-model修饰符****

- lazy：失去焦点或回车的时候再进行数据更新
- number：number类型，默认v-model赋值都是String类型
- trim：去空格

### v-show和v-if指令的共同点和不同点？

+ 共同点：都能控制元素的显示和隐藏；
+ 不同点：

  + v-show：本质就是通过控制css中的display设置为none，控制隐藏，只会编译一次；
  + v-if：是动态的向DOM树内添加或者删除DOM元素，若初始值为false，就不会编译了。而且v-if不停的销毁和创建比较消耗性能。
+ 总结：

  + 如果要频繁切换某节点，使用v-show(切换开销比较小，初始开销较大)。
  + 如果不需要频繁切换某节点，使用v-if（初始渲染开销较小，切换开销比较大）。



### v-if和v-for的问题

https://www.cnblogs.com/jiajia-hjj/p/15368645.html

+ 在vue2中先解析v-for再解析v-if
+ 在vue3中先解析v-if再解析v-for

**vue2中v-if和v-for优先级的问题？**

- v-for优先级高于v-if
- 同时出现时，每次渲染都会先执行循环，在再循环中执行判断，造成性能浪费。
- 因此不要把 v-if 和 v-for 同时用在同一个元素上。

**同时出现如何优化才能得到更好的性能？**

- 在外层或嵌套` <block> `，先进行v-if判断，然后再v-for循环

```html
<ul v-if="isShowGoods">
  <li
    v-for="goods in goodsList"
    :key="goods.id"
  >
    {{ goods.name }}
  </li>
</ul>
```

- 无法先进行v-if判断的，可以进行数据处理，替换为一个计算属性 ，返回过滤筛选后的列表。

```html
<ul>
  <li
    v-for="goods in activeGoodsList"
    :key="goods.id"
  >
    {{ goods.name }}
  </li>
</ul>
computed: {
  activeGoodsList: function () {
    return this.goodsList.filter(function (goods) {
      return goods.isActive
    })
  }
}
```



+ 

### 获取dom

+ ref="domName"， 用法：this.$refs.domName

### computed和watch有什么区别？及运用场景？

+ https://www.cnblogs.com/jiajia-hjj/p/15375516.html

**区别**

- computed 计算属性：依赖其它属性值，并且computed的值有缓存，只有它依赖的属性值发生改变，下一次获取computed的值时才会重新计算computed的值。
- watch 侦听器：更多的是观察的作用，无缓存性，类似与某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作

**运用场景**

- 当需要进行数值计算,并且依赖与其它数据时，应该使用 computed，因为可以利用 computed 的缓存属性，避免每次获取值时都要重新计算。 
- 当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使 watch 选项允许执行异步操作（访问一个API)，限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

### **vue初始化页面闪动问题**

+ 在vue初始化之前，由于div是不归vue管的，所以代码在还没有解析的情况下会容易出现花屏现象
+ 在css里加上[v-cloak] {display: none;}。浏览器在解析的过程中，发现具有v-cloak的属性隐藏不显示
+ 在根元素加上v-cloak。没有彻底解决问题则再加上style="display: none;" :style="{display: 'block'}"

### 谈谈对vue组件化的理解

组件化定义

+ 独立和可复用的模块，独立功能单元，可以抽离出来成一个组件

优点

+ 提高开发效率、测试性和复用性
+ 合理划分组件，有助于性能

组件分类

+ 页面组件、业务组件、通用组件

vue组件化的特点

+ 基于VueComponnent类，扩展Vue
+ 高内聚，低耦合
+ 遵循单向数据流的原则

### 组件的渲染流程

产生组件虚拟节点一>创建组件的真实节点。—>插入到页面

### 组件的更新流程

属性更新会触发patchVnode方法，组件的虚拟节点会调用prepatch钩子，然后更新属
性，更新组件。

### 异步组件原理

先渲染异步占位符节点一>组件加载完毕后调用forceUpdate强制更新。

### 函数组件的优势和原理

+ 函数式组件的特性：无状态、无生命周期、无this。因此性能会高一点。
+ 正常的一个组件是一个类继承了Vue。
+ 函数式组件，就是一个普通的函数。
+ 在 Vue 方面，这类组件会根据给定的props给出不同的输出。

#### 说一下类组件和函数组件的区别?

```js
1. 语法上的区别：

函数式组件是一个纯函数，它是需要接受props参数并且返回一个React元素就可以了。类组件是需要继承React.Component的，而且class组件需要创建render并且返回React元素，语法上来讲更复杂。

2. 调用方式

函数式组件可以直接调用，返回一个新的React元素；类组件在调用时是需要创建一个实例的，然后通过调用实例里的render方法来返回一个React元素。

3. 状态管理

函数式组件没有状态管理，类组件有状态管理。

4. 使用场景

类组件没有具体的要求。函数式组件一般是用在大型项目中来分割大组件（函数式组件不用创建实例，所有更高效），一般情况下能用函数式组件就不用类组件，提升效率。
```

### 组件的传值方式有哪些？

+ props和`$emit`：父组件向子组件传递数据，通过prop传递。子组件传递数据给父组件是通过`$emit`
+ eventBus事件总线，建一个公共组件bus.js.。传递方通过事件触发 `bus.$emit`。接收方通过在 mounted() 生命周期里触发 `bus.$on`。
+ `$refs`：获取指定的子组件对象
+ `$parent`获取当前父组件、`$children`获取当前组件的全部子组件
+ provide提供变量，子孙组件通过inject注入变量
+ `$attrs`/`$listener`组件实例自身的属性。`$attrs`：可以获取到父组件传递过来的props数据。`$listeners`：它可以获取到父组件给子组件传递的自定义事件。` <el-button v-bind="$attrs" v-on="$listeners">{{txt}}</el-button>`
+ vuex



### $attrs是为了解决什么问题出现的？

+ 主要作用是为了实现批量传递数据。
+ provide/inject更适合应用在插件中，主要实现跨级数据传递。

### 手写一个vue bus的实现

```js
Vue.prototype.$self_on.obj = {}; 
Vue.prototype.$self_on = function(Fname, fn) {
    Vue.prototype.$self_on.obj[Fname] = fn;
}
Vue.prototype.$self_emit = function(Fname, value) {
    if(Vue.prototype.$self_on.obj[Fname]) {
        Vue.prototype.$self_on.obj[Fname](value);
    }
}
Vue.prototype.$self_remove = function(Fname){
    delete Vue.prototype.$self_on.obj[Fname]
}
// 先注册一个监听函数
this.$self_on('change', (v) => {console.log(v)})
// 再在相关页面触发
this.$self_emit('change', 123)
//最后在页面销毁的时候删除
this.$self_remove('change')
```



### vue设计理念

渐进式js框架：

+ 只关注视图层，
+ 很灵活，可以作为库在其他项目中用，也可以作为大型框架，引入第三方库。

易用：

灵活

高效：虚拟dom，Diff算法，vue3 Proxy数据响应式的改进

+ 数据响应式

### Vue3.0新特性

更快 

+ 虚拟Dom重写
+ 优化slots的生成
+ 静态树提升
+ 静态属性提升
+ 基于Proxy的响应系统

更小，体积更小

更容易维护:TS+模块化

更友好

+ 跨平台更容易和任何平台（Web、Android、iOS）使用

更容易使用

+ 改进TS支持，提供强有力的类型检查和错误及警告
+ 更好的调试支持
+ 独立的响应模块
+ Composition API









### vue首屏白屏如何解决？

1、路由懒加载

2、 vue - cli 开启打包压缩和后台配合 gzip 访问

3、进行 cdn 加速

+ 把一些静态资源存放到 CDN(容分发网络)上面

+ 起到分流作用,减轻服务器负载压力

+ 使用内容分发网络(CDNs) 在多个站点之间共享脚本和样式表等文件可以提高站点性能并节省带宽。

4、开启 vue 服务渲染模式

5、用 webpack 的 externals 属性把不需要打包的库文件分离出去，减少打包后文件的大小

6、在生产环境中删除掉不必要的 `console.log` 

```js
plugins:  [    
    new  webpack.optimize.UglifyJsPlugin({  //添加-删除console.log      
        compress: {        
            warnings: false,        
            drop_debugger: true,        
            drop_console: true      
        },      
        sourceMap: true    
    }),
]
```

7、开启 nginx 的 gzip ，在 nginx. conf 置文件中配置

```cms
http { //在 http中配置如下代码，   
    gzip on;   
    gzip_disable "msie6";    
    gzip_vary on;    
    gzip_proxied any;   
    gzip_comp_level 8; 
    #压缩级别   
    gzip_buffers 16 8k;   
    #gzip_http_version 1.1;   
    gzip_min_length 100; 
    #不压缩临界值   
    gzip_types text/plain application/javascript application/x-javascript text/css    application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png; 
    }
```

8、添加loadding效果，给用户一种进度感受







### vue响应式

###  Proxy

jquery 和vue

数据更新需要操作dom更新，



### **7、slot**

### **8、状态组件**







### **11、vue响应式**

### **12、Watcher分类**

**15、keep-alive**

**16、修改Vue.js组件对象属性值时怎么触发视图更新?**

**17、vue.js组件中的属性name的作用？**



**13.v-on可以监听多个方法吗？**

**14.分别简述computed和watch的使用场景**



**18、为什么需要对首屏加载进行优化？**

+ vue需要js渲染，一开始输出页面什么东西都没有，是空白的。html里面是没有结构的，需要js进行解析渲染，把html渲染出来，所以这个操作需要消耗时间
+ js可能会比较大，因为单页面应用，所以js文件比较大，文件比较大的话使得加载速度要比较快，才能尽快的把数据加载回来。慢点的话，加载慢，白屏时间会比较久

**19、vue如何优化首页加载速度**

1. 使用首屏SSR + 跳转SPA方式来优化
   + 首屏SSR :后端渲染，后端先把首页的html结构样式渲染出来
   + 渲染出来后在加上，单页面路由跳转 方式来进行优化
2. 改单页应用为多页应用，需要修改webpack的entry
   + webpack打包多输出几个页面，输出页面分的越细，js所需要的量就越少
3. CDN资源还是很重要的，最好分开，也能减少一些不必要的资源损耗
   + CDN资源分发的方式，减少资源损耗，也可以帮助我们尽可能尽快的拿到最近的资源内容
4. 骨架屏这种的用户体验的东西一定要上
   + 一些页面的效果先显示出来，就不会出现白屏
5. 合理使用缓存
   + 前端缓存，将不变的资源放在缓存里
   + 后端缓存，将不变的资源放在服务器的缓存里，一去请求，不需要去做过多的操作，内容直接发送到前端

**17.vue和jQuery的区别**

18.响应式数组

## 你都做过哪些 Vue 的性能优化？

- 合理使用 v-if 和 v-show
- 区分 computed 和 watch 的使用
- v-for 遍历为 item 添加 key
- v-for 遍历避免同时使用 v-if
- 通过 addEventListener 添加的事件在组件销毁时要用 removeEventListener 手动移除这些事件的监听
- 图片懒加载
- 路由懒加载
- 第三方插件按需引入
- SSR服务端渲染，首屏加载速度快，SEO效果好



## vue2和vue3的区别

### **1、数据双向绑定原理**

+ Vue2：使用Object.defineProperty()进行数据劫持，结合订阅发布的方式实现。

```html
<div id="demo"></div>
<input type="text" id="inp">
<script>
    var info  = {};
    var demo = document.querySelector('#demo')
    var inp = document.querySelector('#inp')
    Object.defineProperty(info, 'name', {
        get: function() {
            return val;
        },
        set: function (newVal) {//当该属性被赋值的时候触发
            inp.value = newVal;
            demo.innerHTML = newVal;
        }
    })
    inp.addEventListener('input', function(e) {
        // 文本框输入内容时，给obj的name属性赋值，进而触发该属性的set方法
        info.name = e.target.value;
    });
   // info.name = 'hhhhh';//在给obj设置name属性的时候，触发了set这个方法
</script>
```

+ Vue3：使用Proxy代理，使用ref或者reactive将数据转化为响应式数据。

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

### 2、数据和方法的定义

+ vue2：使用选项类型API (Options API)。
+ vue3：使用合成型API (Composition API) .

+ vue2

```js
export default{
    data() { 
        return {}; 
    },
    methods:{},
	computed:{}
}
```

+ vue3：数据和方法都定义 在setup中，并统一进行return{}.

```js
import { defineComponent, provide, ref,readonly,reactive} from "vue";
export default defineComponent({
    name: "ProvideaAndInject",
    setup(){
        return{ }
    }
});
```

### 3、生命周期

**vue2.x 的生命周期**

beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed、activated、deactivated

**vue3 的生命周期与 2.x 版本生命周期相对应的组合式 API**

- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> `onUnmounted`
- `errorCaptured` -> `onErrorCaptured`
- `activated`->`onActivated`
- `deactivated`->`onDeactivated`

**新增的钩子函数**

组合式 API 还提供了以下调试钩子函数：

- onRenderTracked
- onRenderTriggered

**vue2.x 的生命周期执行顺序**

+ 创建：父（beforeCreate、created、beforeMount）——>子（beforeCreate、created、beforeMount、mounted）——>父（mounted）
+ 子卸载：父（beforeUpdate）——>子（beforeUnmount、onUnmounted）——>父（updated）

### 4、获取props

```js
//vue2
console.log('props' ,this.xxx)
//vue3: 
setup (props,context){ 
    console.log('props' ,props) 
}
setup (props,{attrs,slots,emit}){ 
    console.log('props' ,props) 
}
```



### 5、给父组件传值emit

```js
//vue2
this.$emit('事件',值); 
//vue3: 
setup (props,context){ 
   context.emit('事件',值); 
}
setup (props,{attrs,slots,emit}){ 
    emit('事件',值);
}
```

### 6、性能

Vue3：性能快、体积小、组合API，支持ts，更先进的组件



## 说一下vue3.0你了解多少?

+ 响应式原理的改变 Vue3.x 使用Proxy取代 Vue2.x 版本的Object.defineProperty 
+ 组件选项声明方式Vue3.x 使用Composition API setup 是Vue3.x新增的一个选项，他是组件内使用Composition API 的入口
+ 模板语法变化slot具名插槽语法 自定义指令 v-model 升级 
+ 其它方面的更改Suspense支持Fragment(多个根节点) 和Protal (在dom其他部分渲染组建内容)组件
+ 针对一些特殊的场景做了处理。基于treeshaking优化，提供了更多的内置功能。






## vue-router

### **1、非路由组件的显示和隐藏**

+ https://www.cnblogs.com/jiajia-hjj/p/15814084.html

**方法1:通过$route身上的路由信息来判断路径（不好）**

```html
<!-- 通过$route.path判断路径 -->
<Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer>
</div>
```

**方法2:配置路由的时候，可以给路由添加路由元信息`meta`**，在路由的原信息中定义show属性 `meta:{show:true}`，用来给v-show赋值，判断是否显示footer组件。（[meta官网](https://router.vuejs.org/zh/guide/advanced/meta.html)）

- **添加路由元信息`meta`**

```js
{
    name:'search',
    path:'/search/:keyword?',
    component:Search,
    meta:{
        show:true
    },
}
```

- **根据元信息`meta`判断是否显示**

```html
<Footer v-show="$route.meta.show"></Footer>
```

### **2、`$router`和`$route`的区别**

+ `$router`：VueRouter的实例，路由操作对象，只写对象。可以操作，路由跳转push|go|replace。-----是路由。
+ `$route`：当前处于活跃状态的路由节点，路由信息对象，只读对象。可以获取当前路由的name|path|query|parmas等信息。---是一个路由节点。



### **3、路由跳转方式**

https://www.cnblogs.com/jiajia-hjj/p/15854492.html

**方式一：声明式导航**

```html
<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
```

**方式二：编程式导航 push|replace **

```js
// 命名的路由  变成 /user/123
this.$router.push({ name: 'user', params: { userId: 123 }})
// 带查询参数，变成 /register?plan=123
this.$router.push({ path: 'register', query: { plan: '123' }})
```



### **4、路由传参方式**

+ https://www.cnblogs.com/jiajia-hjj/p/15814297.html

+ ** 1.声明式导航传参**

```html
<router-link :to="'/search/'+keyword">搜索</router-link>
<!--http://localhost:8080/search/hhh-->
<router-link :to="{path: '/search', name: 'search', params: { keyword: hhh } }">搜索</router-link>
```

+ **2.编程式导航**

```js
//1、字符串形式  this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase());
//2、模板字符串
this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`);
//3、对象（常用），传的是对象，路由跳转传参params参数，需要路由配置文件给路由命个名 ==>name:'search'
this.$router.push({
    name:'search',
    params:{
        keyword:this.keyword
    },
    query:{
        k:this.keyword.toUpperCase()
    }
});
//http://localhost:8080/search/hh?k=HH
```

- 对象（常用）：`this.$router.push({name:“路由名字”,params:{传参},query:{传参})`。
- 以对象方式传参时，如果我们传参中**使用了params**，**只能使用name**，不能使用path，如果只是使用query传参，可以使用path

+ **3.props**

```js
//router/inex.js
{
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    meta: {
    	show: true,
    },
    //1、布尔值写法,props只能传params
    props:true
    //2、对象写法,额外给路由自己传递一些props
    props:{
        a:1,
        b:2
    }
    //3、函数写法，可以params参数、query参数，通过prop传递给路由组件(很少用)
    props:($route)=>{
        return{
            keyword:$route.params.keyword,
            k:$route.query.k
        }
    }
    props: ($route) => ({keyword: $route.params.keyword,k: $route.query.k,}),
},
//pages/Search/index.vue
//路由组件可以传递props
props:['keyword','a','b','k'],
```

### **5、params和query的区别**

+ https://www.cnblogs.com/jiajia-hjj/p/15814297.html
+ query ：name或path都可以。网上说要用path，但是自己测试都可以。 
  + 不属于路径当中的一部分，类似于get请求 ，刷新参数不会消失。
  + 地址栏表现为 /search?k1=v1&k2=v2，不需要占位 
+ params：需要name引入跳转
  + 动态路由：属于路径当中的一部分， 地址栏表现为 /search/v1 ，需要占位符，刷新参数不会消失。
  + 非动态路由：不属于路径当中的一部分，类似 post请求，刷新参数会消失。

### **6、动态路由**

+ 路由路径加占位符+params传值

### **7、路由多次执行相同的push报错问题**

+ https://www.cnblogs.com/jiajia-hjj/p/15814327.html
+ 原因：vue-router3.1.0之后, 引入了push()的promise的语法 ，如果没有通过参数指定成功或者失败回调函数,就返回一个promise来指定成功/失败的回调。   且内部会判断如果要跳转的路径和参数都没有变化，会抛出一个失败的promise。
+ 方法：重写VueRouter原型对象的push和replace方法，添加成功和失败的回调。





**10、Vue-router跳转和location.href有什么区别**

答：使用location.href='/url'来跳转，简单方便，但是刷新了页面；
使用history.pushState('/url')，无刷新页面，静态跳转；
引进router，然后使用router.push('/url')来跳转，使用了diff算法，实现了按需加载，减少了dom的消耗。
其实使用router跳转和使用history.pushState()没什么差别的，因为vue-router就是用了history.pushState()，尤其是在history模式下。

**11、vue-router的两种模式**

+ **hash模式**：即地址栏 URL 中的 # 符号
+ **history模式**：window.history对象打印出来可以看到里边提供的方法和记录长度。利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。（需要特定浏览器支持）。



**12、vue-router 是什么?它有哪些组件**

+ vue用来写路由一个插件
+ 组件：router-link、router-view



**13、Vue2中注册在router-link上事件无效解决方法**

+ 使用`@click.native`。
+ 原因：router-link会阻止click事件，`.native`指直接监听一个原生事件。

**14、vue-router 有哪几种导航钩子?**

三种

+ 全局导航钩子，写在'router/index.js文件中
  + **router.beforeEach((to,from,next)=>{})**：前置守卫，跳转前进行判断拦截。（应用场景，如切换或刷新页面判断用户是否已经登录。）
  + **router.beforeResolve((to,from,next)=>{})**：解析守卫，和beforeEach类似。区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
  + **router.afterEach((to,from)=>{})**：后置钩子，跳转之后进行回调。
+ 组件内的钩子，写在组件中
  +  **beforeRouteEnter(to, from, next)**：组件实例还没被创建，不！能！获取组件实例 `this`
  +  **beforeRouteUpdate(to, from, next)**：在当前路由改变，但是该组件被复用时调用，可以访问组件实例 `this`
  +  **beforeRouteLeave(to, from, next)**：导航离开该组件的对应路由时调用
+ 单独路由独享组件，写到指定路由内部，跳到指定路由前调用
  + **beforeEnter**：路由独享守卫，跳到xxx页面前调用

**15、完整的导航解析流程**

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

**8.vue-router实现路由懒加载（ 动态加载路由 ）**
答:三种方式
第一种：vue异步组件技术 ==== 异步加载，vue-router配置路由 , 使用vue的异步组件技术 , 可以实现按需加载 .但是,这种情况下一个组件生成一个js文件。
第二种：路由懒加载(使用import)。
第三种：webpack提供的require.ensure()，vue-router配置路由，使用webpack的require.ensure技术，也可以实现按需加载。这种情况下，多个路由指定相同的chunkName，会合并打包成一个js文件。

**14、Vue里面router-link在电脑上有用，在安卓上没反应怎么解决？**
答：Vue路由在Android机上有问题，babel问题，安装babel polypill插件解决。

**15、RouterLink在IE和Firefox中不起作用（路由不跳转）的问题**
答: 方法一：只用a标签，不适用button标签；方法二：使用button标签和Router.navigate方法



### 路由模式有哪几种？

+  hash模式：把前端路径拼接到真实的URL后面，当#后路径发生变化时，浏览器不会重新发起请求，而是触发hashchange事件。浏览器兼容性较好，ie8都支持。
+ history模式：是H5提供的新特性，允许开发者直接更新浏览URL地址，而不是重新发请求，需要后端支持


### vue-router动态路由的是什么
+ 定义：很多时候，我们需要将给定匹配模式的路由映射到同一个组件，此时就需要定义动态路由。
+ 场景：列如，我们可能有一个user组件，它应该对所有用户进行渲染，但用户id不同，再VueRouter中，我们可以在路径中使用一个动态字段实现。如 `{path:'/user/:id',component:User}`其中id就是路径参数



## vuex

### 什么是vuex

+ 状态管理，集中存储管理所有组件的状态
+ 主要存储一些全局变量，放接口数据，多处使用一个接口
+ 用户信息，购物车商品



### 使用过vuex吗

vuex是一个专门为vue应用程序开发的状态管理模式，每个vuex应用的核心就是一个store仓库。它是包在着你应用中的大部分状态的容器。

+ vuex的状态存储是响应式的，vue组件从store中读取状态，若store中的状态发生变化，相应的组件也会更新

+ 改变store中状态的唯一途径是提交mutation

主要包含一下模块：

+ State ：定义应用共享的数据，可以在此设置默认初始值
+ Getters： 从State 基本数据派生出来的数据
+ mutations：是唯一更改store中状态的方法，必须是同步的
+ Actions：用于提交mutation，可以包含任何异步操作
+ modules： 模块化Vuex，将单一的store拆分为多个store

### 为什么 Vuex 的 mutation 中不能做异步操作?

+ Vuex中所有的状态更新的唯一途径都是mutation，异步操作通过 Action 来提交 mutation实现，这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解我们的应用。
+ 每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现 time-travel 了

### 哪种功能场景使用它

+ 集中式管理项目中组件公用的数据，如用户信息，购物车商品
+ 如果项目过大：组件过多，接口也很多,可以让vuex实现模块化开发

### 优势和劣势

+ 优势：可以全局共享数据和方法（action的dispatch，mutation的commit）。方便统一管理，state上的数据是响应式的。
+ 劣势：页面刷新后，state的变量会被清空，不具有数据持有性。

### state数据消失的原因

https://www.cnblogs.com/jiajia-hjj/p/13882849.html

+ 因为store的数据是保存在运行内存中，当页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值

### vuex-刷新页面state数据消失（数据持久化）

+ 需要做vuex数据持久化，一般利用本地存储报错，推荐使用插件vuex-persist插件，不需要手动存储，而是直接保存在cookie或localStorage中。

方法一：

+ 将state中的数据放在浏览器sessionStorage和localStorage、cookie中

  ```js
  created(){
      //在页面刷新时将vuex里的信息保存到localStorage里
      window.addEventListener("beforeunload",()=>{    		localStorage.setItem("messageStore",JSON.stringify(this.$store.state))
                                                })
  
      //在页面加载时读取localStorage里的状态信息
      localStorage.getItem("messageStore") &&this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
  }
  ```

+ 插件：vuex-persistedstate、vuex-along



### vuex有哪几种属性？

+ state：存全局的变量
+ getters：计算属性
+ mutations：更改state值,this.$store.commit('xxx',params) 
+ actions:获取异步数据,this.$store.actions
+ modules:模块

### 辅助函数

https://www.cnblogs.com/jiajia-hjj/p/16008643.html

+ mapState、mapGetters、mapMutations、mapActions

### Vuex中解决不同模块命名冲突的问题namespaced: true

https://www.cnblogs.com/jiajia-hjj/p/16008661.html

## axios

## 权限管理问题

## 优化问题

1、如何做好不频繁触发浏览器的回流与重绘？

2、防抖节流

前端性能优化

1. 减少 HTTP 请求
2. 减少 DOM 操作
3. 避免不必要的重绘与重排(回流)（可以用定位，让这块区域脱离文档流，不会影响其他的布局）
4. 优化 CSS 选择器（从右向左匹配）  （选择器要尽量的简短，不要写一长串）
5. CSS/JS minify，减少文件体积  （文件压缩）
6. 开启 Gzip 压缩
7. 将 CSS 放到顶部，JavaScript 放到尾部
8. 缩图片以及使用 CSS Sprite  （无损压缩图片、精灵图->减少请求次数）
9. 使用 CDN 加速，适当进行文件缓存（ CDN：内容分发，将内容分发到各个地方，请求的人可能更快的请求到当地的数据文件；）
10. 合理控制 cookie 大小（每次请求都会包含 cookie）





## webpack

### Webpack是什么？

+ webpack是一个静态模块打包器，在webpack里一切文件皆模块。
+ 通过loader转换文件，通过plugin注入钩子，最后输出由多个模块组合成的文件（一个或多个 bundle），webpack专注构建模块化项目。
+ WebPack可以看做是模块的打包机器：它做的事情是，分析你的项目结构，找到js模块以及其它的一些浏览器不能直接运行的拓展语言，例如：Scss，TS等，并将其打包为合适的格式以供浏览器使用。
  

### Loader和Plugin 有什么区别

+ Loader：直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到`loader`。 所以Loader的作用是让webpack拥有了**加载和解析非JavaScript文件的能力**。   
+ Plugin：直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

### 常用的loader

+ file-loader：把文件输出到一个文件夹中，在代码中通过相对URL去引用输出的文件
+ url-loader：和file-loader类似，但是能在文件很小的情况下以base64的方式把文件内容注入到代码中去
+ source-map-loader：加载额外的Source Map文件，以方便断点调试
+ image-loader：加载并且压缩图片文件
+ babel-loader：把ES6转换成ES5
+ css-loader：加载CSS，支持模块化、压缩、文件导入等特性
+ style-loader：把CSS代码注入到JavaScript中，通过DOM操作去加载CSS。
+ eslint-loader：通过ESLint检查JavaScript代码
  

### 什么是bundle,什么是chunk，什么是module?

+ bundle：是由webpack打包出来的文件
+ chunk：代码块，一个chunk由多个模块组合而成，用于代码的合并和分割
+ module：是开发中的单个模块，在webpack的世界，一切皆模块，一个模块对应一个文件，webpack会从配置的entry中递归开始找出所有依赖的模块
  

### 说说webpack与grunt、gulp的不同？

+ 三者都是前端构建工具，一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。
+ grunt和gulp是基于任务和流（Task、Stream）的。类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据，整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。
+ webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。
+ 所以，从构建思路来说，gulp和grunt需要开发者将整个前端构建过程拆分成多个`Task`，并合理控制所有`Task`的调用关系；
+ webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工对于知识背景来说，gulp更像后端开发者的思路，需要对于整个流程了如指掌。webpack更倾向于前端开发者的思路
  