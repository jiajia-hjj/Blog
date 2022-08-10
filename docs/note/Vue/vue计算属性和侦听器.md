---
title: vue计算属性和侦听器
tags:
 - Vue
categories:
 - Vue
---



## 一、computed

+ 在一个计算属性里可以完成各种复杂的逻辑，包括运算、函数调用等，只要最终返回一个结果就可以。

### 1.1.和methods对比

```html
<div id="app">
    <!--1.插值法：直接拼接：语法过于繁琐-->
    <h2>{{firstName+' '+lastName}}</h2>
    <!--2.方法：通过定义methods，显示4次的化话，函数会调用4次-->
    <h2>{{getFullName()}}</h2>
    <!--3.计算属性：通过computed显示4次，计算属性只会调用1次，性能更高，有缓存-->
    <h2>{{fullName}}</h2>
</div>
<script>
    const app=new Vue({
        el:'#app',
        data:{
            firstName:'Lebron',
            lastName:'James'
        },
        //计算属性，按属性的方式
        computed:{
            fullName(){
                return this.firstName+' '+this.lastName
            }
        },
        methods:{
            getFullName() {
                return this.firstName+' '+this.lastName
            }
        }
    });
</script>
```

### 1.2.计算属性的本质

+ 每一个计算属性都包含一个getter 和一个setter 
+ 上面是只有get方法的简写。
+ **get()** ：用来读取，任一数据变化，就会重新执行，视图也会更新。
+ **set()** ： 当手动修改计算属性的值时触发。

```js
const app=new Vue({
    el:'#app',
    data:{
        firstName:'Kobe',
        lastName:'Nryant'
    },
    computed:{
        fullName:{
            //set一般有参数,是修改后计算属性(fullName)的值
            set(newValue){
                const names=newValue.split(' ');
                this.firstName=names[0];
                this.lastName=names[1];
 				console.log('newValue:'+newValue);
                console.log('firstName:'+this.firstName);
                console.log('lastName:'+this.lastName);
            },
            get(){
                return this.firstName+ James' '+this.lastName
            }
        }
    }
});

/*命令行输入: app.fullName='Lebron James',
  这时set方法会被调用,
  输出：newValue:Lebron James
  	   firstName:Lebron
       lastName:James
  firstName 和lastName 也会相应地被更新,因此会再次调用get()
*/
```

## 二、watch

+ 侦听器，使用watch来响应数据的变化。

### 2.1.简单使用

+ 侦听firstName的变化，并做相应的操作

```html
<div id="app">
    <h2>{{firstName}}</h2>
</div>
<script>
    const app=new Vue({
        el:'#app',
        data:{
            firstName:'Lebron',
        },
        watch:{
            firstName(newVal,oldVal){
                console.log('newVal:'+newVal,'oldVal:'+oldVal);
            }
        }
    });
    /*命令行输入: app.firstName='HHH'
      输出：newVal:LLLL oldVal:Lebron
    */
</script>

```

### 2.1.handler和immediate

+ **handler**：上面是只有handler方法的简写。

+ **immediate**：布尔值，表示在watch中首次绑定的时候，是否执行handler。
  + 使用watch时，当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果需要在最初绑定值的时候也执行函数，就需要用immediate属性。
  + true，表示在watch中声明时，就立即执行handler方法。
  + false，和一般使用watch一样，在数据发生变化的时候才执行handler方法。
+ 应用：当父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将immediate设为true。

```html
<div id="app">
    <h2>{{firstName}}</h2>
</div>
<script>
    const app=new Vue({
        el:'#app',
        data:{
            firstName:'Lebron',
        },
        watch:{
            firstName:{
                handler(newVal,oldVal){
                    console.log('newVal:'+newVal,'oldVal:'+oldVal);
                },
                immediate:true
                
            }
        }
    });
    /*
    一进来就输出：newVal:Lebron oldVal:undefined
    */
</script>
```

### 2.3.deep

+ deep：布尔值，表示深度监听
+ 当需要监听一个对象的改变时，普通的watch方法无法监听到对象内部属性的改变，只有data中的数据才能够监听到变化，此时就需要deep属性对对象进行深度监听。

```html
<div id="app">
    <h2>{{fullName.firstName}}</h2>
</div>
<script>
    const app=new Vue({
        el:'#app',
        data:{
            fullName:{
                firstName:'Lebron',
                secondName:'James'
            }
        },
        watch:{
            fullName:{
                handler(newVal,oldVal){
                    console.log(newVal);
                    console.log(newVal);
                },
                deep:true
            }
        }
    });
    /*
      1、没有加deep:true时，命令行输入：app.fullName.firstName="HHHH"，
      	 这个时候，没有执行handler。
      2、添加deep:true时，命令行输入：app.fullName.firstName="HHHH"，
      	 这个时候，执行handler。
      	 输出：{firstName: "HHHH",secondName: "James}
      	 	  {firstName: "HHHH",secondName: "James}
      	 输出的值是一样的。=>因为数据同源，它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本。
    */
</script>
```

+ 给对象的某个特定属性加监听器

```html
<div id="app">
    <h2>{{fullName.firstName}}</h2>
</div>
<script>
    const app=new Vue({
        el:'#app',
        data:{
            fullName:{
                firstName:'Lebron',
                secondName:'James'
            }
        },
        watch:{
            'fullName.name':{
                handler(newVal,oldVal){
                    console.log(newVal);
                    console.log(newVal);
                }
            }
        }
    });
    /*
         命令行输入：app.fullName.firstName="HHHH"，
      	 这个时候，执行handler。
      	 输出：HHHH
      	 	  Lebron
    */
</script>
```

### 2.4.**问题 **

**监听复杂对象变化，oldvalue 和 newValue 一致的问题，如何获取newVal,oldVal值？？**

+ 解决思路：计算属性、深拷贝一份出来

```html
<div id="app">
    <h2>{{fullName.firstName}}</h2>
</div>
<script>
    const app=new Vue({
        el:'#app',
        data:{
            fullName:{
                firstName:'Lebron',
                secondName:'James'
            }
        },
        computed:{
            fullNameNew(){
                //JSON.parse(JSON.stringify(obj))===>深拷贝
                return JSON.parse(JSON.stringify(this.fullName));
            }
        },
        watch:{
            fullNameNew:{
                handler(newVal,oldVal){
                    console.log(newVal);
                    console.log(newVal);
                },
                deep:true
            }
        }
    });
    /*
     命令行输入：app.fullName.firstName="HHHH"，
     这个时候，执行handler。
     输出：{firstName: "HHHH",secondName: "James}
      	  {firstName: "Lebron",secondName: "James}
    */
</script>
```

## 三、computed和watch区别

**计算属性computed :** 

+ 支持缓存，只有依赖数据发生改变，才会重新进行计算。

+ 不支持异步，当computed内有异步操作时无效，无法监听数据的变化。
+ computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过、父组件传递的props中的数据通过计算得到的值
+ 每一个计算属性都包含一个get() 和set()，get() ：读取，数据变化时触发。set()：修改计算属性的值时触发。
+ 当一个属性受多个属性影响的时候就需要用到computed。
  + 最典型的例子： 购物车商品结算的时候

**侦听属性watch：**

+ 不支持缓存，数据变，直接会触发相应的操作。

+ 支持异步。

+ 监听数据data中声明过、computed中的属性、父组件传递过来的props中的数据，当数据变化时，触发其他操作。
+ 监听处理函数(handler)接收两个参数，（最新的值，之前的值），

　　immediate：是否首次绑定就执行监听处理函数，

　　deep： 是否深度监听复杂对象。

+ 当一条数据影响多条数据、或一个属性发生变化需要执行对应的操作时，就需要用watch
  + 例子：搜索数据



> 参考：
>
> [vue中watch的详细用法](https://www.cnblogs.com/shiningly/p/9471067.html)
>
> [computed和watch的区别](https://www.cnblogs.com/jiajialove/p/11327945.html)

