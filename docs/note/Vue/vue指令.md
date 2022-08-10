---
title: vue 指令
tags:
  - Vue
categories:
  - Vue
---

## 01.v-bind

+ 绑定属性
+ 语法糖     `  ：`

**绑定基本属性**

```html
<a  :href="aHref">百度一下</a>
```

**动态绑定class**

+ 对象语法：v-bind: class="{类名:boolean}"

```html
 <h2 :class="{'active':isActive}">哈哈哈</h2>
 <!--过于复杂，可以放在一个methods或者computed中-->
 <h2 :class="getClasses()">哈哈哈</h2>

```

+ 数组语法:  v-bind: class="[类名变量1,类名变量2]" 

```html
 <h2 :class="[active,line]">哈哈哈</h2>
<!--需要拼接又需要判断-->
 <li :class="['pos-0' + item.prizeNo, {'on': index== nowIndex}]">哈哈哈</li>
```

**动态绑定style**

+ 对象语法：v-bind: style="{css属性名:属性值}"

```html
 <h2 :style="{fontSize:fontSize+'px',color:fontColor}">哈哈哈</h2>

```

+ 数组语法:  v-bind: style="[类名变量1,类名变量2]" 

```html
<h2 :style="[baseStyle]">哈哈哈</h2>
<script>
    const app=new Vue({
      el:'#app',
      data:{
        message:'你好啊',
        baseStyle:{fontSize:'100px'}
      }
    });
</script>
```

## 02.v-on

+ 事件监听
+ 语法糖  `@`
+ 语法：`@事件="方法名"`

```html
<!---可监听一个-->
<input type="text" v-on:input="onInput">
<!---可监听多个方法-->
<input type="text" v-on="{ input:onInput,focus:onFocus,blur:onBlur}">
<input type="text" @input="onInput" @focus="onFocus"  @blur="onBlur">
```

**参数问题**

+ 事件、方法都无参

```html
<button @click=" btn1Click()">按钮1</button>
<button @click=" btn1Click">按钮2</button>
```

+ 事件无参，且没有小括号，方法有参。方法参数是：浏览器生成的event事件对象。

```html
<!--事件没有参,且没()-->
<button @click="btn2Click">按钮5</button>  
<script>
const app=new Vue({
      el:'#app',
      methods:{
        btn2Click(event) {//方法需要参，默认传过来的是浏览器生成的event事件对象
          console.log(event);//event对象
        },
      }
    });
</script>
```

+ 事件无参，且有小括号，方法有参。

```html
<!--事件没有参,有()-->
<button @click="btn2Click()">按钮5</button> 
<script>
const app=new Vue({
      el:'#app',
      methods:{
        btn2Click(event) {
          console.log(event);//undefined
        },
      }
    });
</script>
```

+ 需要event对象，同时又需要其他参数。在调用方法时，手动的获取浏览器参数的event对象：$event

```html
<!--需要event对象，同时又需要其他参数-->
<button @click="btn3Click(123,$event)">按钮8</button>
<script>
const app=new Vue({
      el:'#app',
      methods:{
        btn3Click(a,event) {//接收参数
          console.log(a);//123
          console.log(event);//event对象
        },
      }
    });
</script>
```

+ 如果函数需要参数，但是没有传入，那么函数(方法)的形参为undefined

```html
<button @click="btn3Click(123)">按钮8</button>
<script>
const app=new Vue({
      el:'#app',
      methods:{
        btn3Click(a,event) {//接收参数
          console.log(a);//123
          console.log(event);//undefined
        },
      }
    });
</script>
```

**修饰符**

+ **.stop**：  阻止冒泡 event.stopPropagation()

+ **.prevent** ：阻止默认事件 event.preventDefault()

+ .监听某个键盘的键帽： 如.enter，监听回车

  ```html
  <input type="text" @keyup.enter="keyUp">
  ```

+ **.once** ：只触发一次

+ **.native**： 监听组件根元素的原生事件

## 03.v-model

+ 表单数据的双向绑定

**原理**

+ v-bind绑定一个value属性
+ v-on指令给当前元素绑定input事件

```html
<input type="text" :value="message" @input="valueChange">
<input type="text" :value="message" @input="message=$event.target.value">
<script>
    const app=new Vue({
        el:'#app',
        data:{
            message:'你好啊'
        },
        methods:{
            valueChange(e){
                this.message=e.target.value;
            }
        }
    });
</script>
```

**使用**

**1).基本使用**，将check作为属性，并将input作为事件

```html
<input type="text" v-model="message">
```

**2).radio**，将check作为属性，并将change作为事件

```html
<label for="male">
    <!--加上name才能互斥，但是两个都绑定了一个sex,name="sex"可以去掉-->
    <input type="radio" id="male" value="男" v-model="sex">男1
</label>
<label for="fmale">
    <input type="radio" id="fmale" value="女" v-model="sex">女2
</label>
<h2>{{sex}}</h2>
```

**3).checkbox**，将check作为属性，并将change作为事件

```html
<!--1、checkbox单选框-->
<label for="agree">
    <input type="checkbox" id="agree" v-model="isAgree">同意协议
</label>
<h2>您选择的是：{{isAgree}}</h2>
<button :disabled="!isAgree">下一步</button>

<!--2、多选框-->
<label for="">
    <input type="checkbox" value="111" v-model="hobbies">111
</label>
<label for="">
    <input type="checkbox" value="222"  v-model="hobbies">222
</label>
<h2>您选择的爱好是：{{hobbies}}</h2>

<script>
    const app=new Vue({
        el:'#app',
        data:{
            message:'你好啊',
            isAgree:false,  //单选框用布尔值
            hobbies:[], //多选框用数组
        }
    });
</script>
```

**4).select**，将value作为属性，并将change作为事件

```html
<!--1、选择一个-->
<select name="abc" v-model="fruit">
    <option value="苹果1">苹果</option>
    <option value="香蕉1">香蕉</option>
</select>
<h2>您选择的是:{{fruit}}</h2>
<!--2、选择多个  加上multiple可以选择多个-->
<select name="abc"  v-model="fruits" multiple>
    <option value="苹果1">苹果</option>
    <option value="香蕉1">香蕉</option>
</select>
<h2>您选择的是:{{fruits}}</h2>
<script>
    const app=new Vue({
        el:'#app',
        data:{
            message:'你好啊',
            fruit:"香蕉1",//单选是字符串
            fruits:[],     //多选是数组
        }
    });
</script>
```



**修饰符**

+ lazy：失去焦点或回车的时候再进行数据更新
+ number：number类型，默认v-model赋值都是String类型。如果值无法被parseFloat()解析，会返回原始的值
+ trim：去空格

```html
<input type="text" v-model.lazy="message">
<input type="number" v-model.number="age">
<input type="text" v-model.trim="name">
```

## 04.v-for

+ 循环遍历

**遍历数组**

```html
<li v-for="(item,index) in names">{{index+1}}.{{item}}</li>
```

**遍历对象**

```html
<!--1.value:在遍历对象的过程中.如果只是获取一个值,那么获取到的是value-->
<li v-for="item in info">{{item}}</li>
<!--2.获取key和value和index-->
<li v-for="(value,key,index) in info">{{key}}-{{value}}-{{index}}</li>
```

**key**的作用

+ 使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点。
+ 与虚拟dom有关，更好的复用，高效的更新虚拟DOM。
+ 简单的说，列表数据修改的时候，根据key值去判断某个值是否修改，如果修改了就重新渲染，不然就复用之前的元素。

> [vue核心之虚拟DOM(vdom)](https://www.jianshu.com/p/af0b398602bc)
>
> [Vue: v-for的键值key](https://blog.csdn.net/qq_41609404/article/details/84064064)

**响应式**

+  数组响应式方法：push、pop、unshift、shift、reserve、sort、splice、(见[Array对象的常用方法]())

+ 索引值修改数组中的元素--无响应式

```js
this.letters:['a','b','c']
this.letters[0]="bbb"; 
console.log(this.letters)//["bbb", "b", "c",]====>值改变了，但是页面视图没有变
```

## 05.v-show

- 带有 v-show 的元素始终会被渲染并保留在 DOM 中。
- 只是简单地切换元素的 CSS 属性 display。

## 06.v-if

+ v-if/v-else-if/v-else
+ v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
+ 初始渲染时条件为false时，则什么也不做，直到条件第一次变为真时，才会开始渲染条件块。
+ 不推荐同时使用 v-if 和 v-for，v-for 具有比 v-if 更高的优先级。

**区别**

+ **v-if**：条件为false时，包含v-if指令的元素，根本不会存在dom中。
+ **v-show**：当条件为false时，只是给元素添加了`display:none`。

+ v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。
+ 显示隐藏频繁切换，使用 v-show 较好。
+ 在运行时条件很少改变，使用 v-if 较好。

## 07.v-once

+ 第一次展示出来，之后message改变，不会变

## 08.v-html

+ 相当于原生js中的innerHtml

+ 可以解析html标签

## 09.v-text

+ 相当于原生js中的innerText

+ 不可以解析标签，解决{{}}表达式闪烁的问题

## 10.v-pre 

+ 告诉vue不要解析这个节点内部的内容，让浪费时间

## 11.v-cloak

+ 斗篷，解决表达式闪烁的问题


```html
<!--浏览器在解析的过程中，发现具有v-cloak的属性隐藏不显示，所以你就看不到这个{{}}闪烁问题了-->
<!--当Vue解析替换完之后，Vue会自动把v-cloak样式移除-->
<div id="app" v-cloak>
   <h1>{{msg}}</h1>
</div>
<style>
    [v-cloak]{
      display:none;
    }
</style>
```

## 12.v-if和v-for的问题

**v-if和v-for优先级哪个高？**

+ v-for优先级高于v-if
+ 同时出现时，每次渲染都会先执行循环，在再循环中执行判断，造成性能浪费。
+ 因此不要把 v-if 和 v-for 同时用在同一个元素上。

**同时出现如何优化才能得到更好的性能？**

+ 在外层或嵌套`<block>`，先进行v-if判断，然后再v-for循环

```html
<ul v-if="isShowGoods">
  <li v-for="goods in goodsList" :key="goods.id">
    {{ goods.name }}
  </li>
</ul>
```

+ 无法先进行v-if判断的，可以进行数据处理，替换为一个计算属性 ，返回过滤筛选后的列表。

```html
<ul>
  <li v-for="goods in activeGoodsList"  :key="goods.id">
    {{ goods.name }}
  </li>
</ul>
```

```js
computed: {
  activeGoodsList: function () {
    return this goodsList.filter(function (goods) {
      return goods.isActive
    })
  }
}
```

