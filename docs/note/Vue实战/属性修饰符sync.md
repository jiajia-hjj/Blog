### 属性修饰符sync--父子通讯同步

需求：父组件1000【money】元，子组件【childA|childB】点击一下花20，还剩多少

+ 本质其实是个语法糖

```html
<h4>一共是{{money}}元</h4>
<!-- 不使用sync修饰符 -->
<childA :money="money" @update="money=$event"/>  
<!--  @update:money  绑定的自定义事件，名字叫update:money -->
<childB :money="money" @update:money="money=$event"/>  
<!-- 使用sync修饰符 -->
<!-- 
    :money.sync
    1、父组件给子组件传了props:monry
    2、当前子组件绑定了一个自定义事件，且事件名称为update:money
-->
<childB :money.sync="money" />
```

```html
<!-- childA -->
<div>花了<button @click="$emit('update',money-20)">20</button> 还剩{{money}}</div>
<!-- childB -->
<div>花了<button @click="$emit('update:money',money-20)">20</button> 还剩{{money}}</div>
```





