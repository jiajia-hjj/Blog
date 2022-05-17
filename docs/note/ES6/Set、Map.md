---
title: Set、Map
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---



## 一、Set集合

+ 一种新的数据结构 , 类似于数组。但成员是**唯一的**无序，没有重复的值

```js
let arr = [1, 3,4, 2, 2, 1, 1]
let set=new Set(arr)// Set(4) {1, 3, 4, 2}
```

### 1.1.基本操作

+ 遍历操作

```js
let s1 = new Set([1,2,3]);
for(let item of s1){
      console.log(item);//1 2 3
}
for (let item of s1.keys()){
    console.log(item);//1 2 3
}
for (let item of s1.values()){
    console.log(item);//1 2 3
}
for (let item of s1.entries()){
    console.log(item);//[1, 1] [2, 2] [3, 3]
}
s1.forEach((item,index) => console.log(item))//1 2 3
```

+ 其他操作

```js
let s1 = new Set([1,2,3]);

//1、构造函数是Set()
console.log(s1.constructor);//ƒ Set() { [native code] }
//2、求元素的个数
console.log(s1.size);//3
//3、添加元素
s1.add('22').add(22);//Set(5) {1, 2, 3, '22', 22}
//4、删除元素
s1.delete(2);//true==>s1 Set(3) {1, 3, '22', 22}
//5、检测set集合中是否存在某个值，存在返回true，不存在返回false
s1.has('22')//true
//6、清空元素
s1.clear();//==>s1 Set(0) {}
```

注：

+ Set加入值，不会发生类型转换.判断相等(===)
+ Set内部，NaN==NaN

### 1.2.应用

**应用1：数组去重**

```js
let arr = [1, 3,4, 2, 2, 1, 1]
//new Set(arr)不是一个数组，可以通过扩展运算符变成数组
let result = [...new Set(arr)];
console.log(result);//[1, 3, 4, 2]
//可以通过Array.from变成数组
let result1 = Array.from(new Set(arr));
console.log(result1);//[1, 3, 4, 2]
```

**应用2：并集**

```js
let arr1 = [1, 2]
let arr2 = [2,4,5]
let result = [...new Set([...arr1,...arr2])];
console.log(result); [1, 2, 4, 5]
```

**应用3：交集**

```js
let arr1 = [1, 2, 4]
let arr2 = [2,4,5]
let result = arr1.filter(item =>new Set(arr2).has(item)); 
console.log(result); //[2, 4]
```

**应用4：差集**

```js
let arr1 = [1, 2, 4]
let arr2 = [2,4,5]
let result = arr1.filter(item =>!new Set(arr2).has(item)); 
console.log(result); //arr1-arr2 [1]
```

## 二、WeakSet

### 2.1.与Set 的区别

- WeakSet的成员只能是对象，而不能是其他类型的值。而 Set 对象都可以。

```js
const ws = new WeakSet();//WeakSet {}
ws.add(1);//报错,1不是对象
```

+ WeakSet 中的对象都是弱引用。即**垃圾回收机制不考虑 WeakSet 对该对象的引用**。
  
  + 也就是说，如果**其他对象都不再引用该对象**，那么**垃圾回收机制会自动回收该对象所占用的内存**，**不考虑该对象还存在于 WeakSet 之中。**
  
  + 造成的问题：WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致（被垃圾回收了）。因此 ES6 规定**WeakSet 不可遍历。**
  + WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在内存泄漏问题。
  + WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

**垃圾回收机制**

+ 垃圾回收机制依赖**引用计数**，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。
+ 结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。

**内存泄漏**：

+ 内容节点不会删掉，内存被没有用的东西占用，就会感觉内存越来越小，因为垃圾挤占了空间，感觉内存是不是丢了

### 2.1.基本操作

```js
let ws = new WeakSet([{}]);
const obj = {};
const foo = {};
//1、构造函数是WeakSet()
console.log(ws.constructor);//ƒ WeakSet() { [native code] }
//2、添加元素
ws.add(obj).add(foo);//WeakSet {{…}, {…}, {…}}
//3、删除元素
ws.delete(obj);//true==>ws WeakSet {{…}, {…}}
//4、检测WeakSet集合中是否存在某个对象，存在返回true，不存在返回false
ws.has(foo)//true

/**************************区别******************************/
//1、无法遍历操作
ws.forEach // undefined
//2、求元素的个数，没有size属性
console.log(ws.size);//undefined
//3、清空元素，已废弃使用
ws.clear();//报错
```

## 三、Map字典

`Map`对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。

[key, value] 的形式储存

### 3.1.与 Objects 的区别

- 一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
- Map 中的键值是有序的（先入先出原则），而添加到对象中的键则不是。
- Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
- Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

### 3.2.基本操作

+ 遍历操作

```js
const m = new Map([       
    ['name', 'hjj'],
    ['age', '18']
]);
for(let item of m){
      console.log(item);//['name', 'hjj'] ['age', '18']
}
for (let item of m.keys()){
    console.log(item);//name age
}
for (let item of m.values()){
    console.log(item);//hjj 18
}
for (let item of m.entries()){
    console.log(item);//['name', 'hjj'] ['age', '18']
}
m.forEach((item,index) => console.log(item,index))//hjj name  18 age
```

+ 其他操作

```js
const m = new Map([['day',1]])
//1、构造函数是Map()
console.log( m.constructor);//ƒ Map() { [native code] }
//2、求元素的个数
console.log(m.size);//1
//3、添加新元素
m.set('name','hjj');//Map(2) {'day' => 1, 'name' => 'hjj'}
//4、查找特定的Key。有返回所对应的值，否则返回undefined。
m.get('name');//'hjj'
//5、检测Map对象中是否有Key所对应的值，有返回true,否则返回false。
m.has('name');//true
// 6、删除元素
m.delete('name');//true==>m Map(1) {'day' => 1}
//7、清空元素
m.clear(); //==>m Map(0) {}
```



### 3.3.应用

**Map与数组转换**

```js
const arr =[['name', 'hjj'],['', '18']];
//数组==>Map
let m=new Map(arr) //m Map(2) {'name' => 'hjj', 'age' => '18'}
//Map==>数组
//1、扩展运算符
let result = [...new Map(arr)];
console.log(result);//[['name', 'hjj'],['age', '18']]
//2、Array.from
let result1 = Array.from(new Map(arr));
console.log(result1);//[['name', 'hjj'],['age', '18']]
```

**Map转为对象**

```js
function mapToObj(map){
    let obj = Object.create(null);
    for(let [key,value] of map){
        obj[key] = value;
    }
    return obj;
}
const m = new Map();
m.set('name','hjj').set('age',18);
let result=mapToObj(m);//{name: 'hjj', age: 18}
```

**对象转为Map**

```jsx
function objToMap(obj){
    let map = new Map();
    for (let k of Object.keys(obj)){
        map.set(k,obj[k]);
    }
    return map;
}
const obj={name: 'hjj', age: 18};
let result=objToMap(obj)//Map(2) {'name' => 'hjj', 'age' => 18}
```

**克隆**

```js
var m1 = new Map([['name', 'hjj'],['age', '18']]);
var m2= new Map(m1)//m2=>Map(2) {'name' => 'hjj', 'age' => '18'}
m1===m2//false==>Map对象构造函数生成实例，迭代出新的对象。
```

**Map 的合并**

```js
var m1 = new Map([['name', 'hjj'],['day', '1']]);
var m2= new Map([['age', '18'],['name', 'hhh']]);
var m3= new Map([...m1,...m2])//Map(3) {'name' => 'hhh', 'day' => '1', 'age' => '18'}
```

## 四、WeakMap

### 4.1.与Map的区别

- WeakMap只接受对象作为键名(null除外),不接受其他类型的值作为键名。而 Map 对象都可以。

```js
const wm = new WeakMap();//WeakMap {}
wm.set('name', 'hhh')//报错,name键名不是对象
```

+ **键名**是弱引用，键值是正常引用。WeakMap的键名所指向的对象，不计入垃圾回收机制(回收机制见weakSet)。

**应用：**

```js
const wm = new WeakMap();
const element = document.getElementById('example');
wm.set(element, 'some information');
wm.get(element) // "some information"
//一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。Weakmap 保存的这个键值对，也会自动消失。
```

### 4.2.基本操作

```js
let wm = new WeakMap();
const obj = {};
const foo = {};
//1、构造函数是WeakMap()
console.log(wm.constructor);//ƒ WeakMap() { [native code] }
//2、添加元素
wm.set(obj,1).set(foo,2);//WeakMap {{…} => 1, {…} => 2}
//3、查找特定的Key。有返回所对应的值，否则返回undefined。
wm.get(obj);//1
// 4、删除元素
wm.delete(obj);//true==>wm WeakMap {{…} => 2}

/**************************区别******************************/
//1、无法遍历操作
wm.forEach // undefined
//2、求元素的个数，没有size属性
console.log(wm.size);//undefined
//3、清空元素，已废弃使用
wm.clear();//报错
```

### 4.3.应用

**典型场合就是 DOM 节点作为键名**

```js
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();
myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
/*
 + myElement是一个 DOM 节点，每当发生click事件，就更新一下状态.
 + 将这个状态作为键值放在 WeakMap 里，对应的键名就是myElement。
 + 一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
*/
```

**部署私有属性**

```js
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()// DONE
/*
+ Countdown类的两个内部属性_counter和_action，是实例的弱引用。
+ 所以如果删除实例，它们也就随之消失，不会造成内存泄漏。
*/
```

## 五、总结

|          | Set                     | WeakSet                                | Map                          | WeakMap                                      |
| -------- | ----------------------- | -------------------------------------- | ---------------------------- | -------------------------------------------- |
| 成员     | 任何类型                | 对象                                   | 键值对                       | 键名为对象的键值对                           |
| 成员特点 | 唯一、无序且不重复      | 成员都是弱引用，可以被垃圾回收机制回收 | 键、值可为任何类型           | 键名是弱引用，键名所指向的对象可以被垃圾回收 |
| 遍历     | 可遍历                  | 不可遍历                               | 可遍历                       | 不可遍历                                     |
| 属性     | constructor、size       | constructor                            | constructor、size            | constructor                                  |
| 方法     | add、delete、has、clear | add、delete、has                       | set、get、delete、has、clear | set、get、delete、has                        |
| 场景     | 数组去重等数组操作      | 节点保存                               | 各种数据格式转换             | 节点作为键名、部署私有属性                   |



> 参考转自：
>
> [ES6之Set和Map数据结构深入学习](https://www.jianshu.com/p/53dcc405f093)

