

## 一、delete和Vue.delete删除数组

**delete**

+ 只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
+ 界面不会改变

```js
this.a=[1,2,3,4]

delete this.a[1]
console.log(this.a)
//输出：(4) [1, empty, 3, 4, __ob__: Observer]
```

**Vue.delete**

+ this.$delete()，直接删除了数组，改变了数组的键值。

+ 响应式，界面改变

```js
this.b=[1,2,3,4]

this.$delete(this.b,0)
//Vue.delete(this.b,0)
console.log(this.b)
//输出：(4) [2, 3, 4, __ob__: Observer]
```

## 二、delete和Vue.delete删除对象

**delete**

+ 直接删除键值
+ 界面不会改变

```js
this.c={name:'hhh',age:18}

delete this.c.age;
console.log(this.c);
//输出：{name: "hhh"}
```

**Vue.delete**

+ this.$delete()，直接删除了键值。

+ 响应式，界面改变

```js
this.d={name:'hhh',age:18}

this.$delete(this.d,'age');
console.log(this.d);
//输出：{name: "hhh"}
```

## 三、` .属性名 `和Vue.set添加元素

**.属性名**

+ 界面不会改变

```js
this.c={name:'hhh',age:18}
this.c.height=188;//页面不会改变
console.log(this.c);
//输出：{name:'hhh',age:18,height:188}
//发现一个小问题：.和delete，如果当前操作或操作后有个响应式一起，界面也会改变，如this.$delete或this.$set
```

**Vue.set**

+ this.$set()

+ 响应式，界面改变

```js
this.d={name:'hhh',age:18}
this.$set(this.d,'height',178)
console.log(this.d);
//输出：{name:'hhh',age:18,height:178}
```



## 四、响应式添加元素

+ Vue.set，响应式添加，界面会发生变化
+ 用新对象给旧对象复值。新对象=Object.assign({},旧对象,新增对象)；

```js
 this.info={name:'hhh',age:18}
//添加新
 this.info=Object.assign({},this.info,{address:'福州'})
```

