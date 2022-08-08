---
title: Object
tags:
  - JavaScript
categories:
  - JavaScript
---



相关用法可查看[MDN](https://developer.mozilla.org/zh-CN/)

## 静态成员

> 静态成员：由**构造函数直接访问**到的属性和方法。

### Object.defineProperty()

+ **Object.defineProperty(obj, prop, descriptor) **：直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

+ 参数

  + obj 需要定义属性的对象。
  + prop 需被定义或修改的属性名。
  + descriptor 需被定义或修改的属性的描述符。

+  数据描述符(descriptor )

  + value: 该属性对应的值。默认为 undefined

  + **configurable**:  为 true 时，该属性才能够被改变，也能够被删除。默认为 false， 属性值是不可改变的 
  + **enumerable**:  为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false
  + **writable**:  为 true 时，该属性才能被赋值运算符改变。默认为 false。
  + **get**: 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。。默认为 undefined
  + **set**: 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为undefined。

+ 例子

```js
var obj = {name:'HJJ',height:160};
Object.defineProperty(obj,'age',{
      value:18, //属性的值
      configurable: true,//是否可以删除该属性或者修改该属性的定义描述对象
	  enumerable: true, //是否可枚举
	  writable: false, //该属性是否可修改
});
console.log(obj)//{name: 'HHHH', height: 160, age: '18'}
obj.age=12;//defineProperty新增的，默认是不可修改的，writable:true，则可修改
obj.name='hhh';//可修改的
obj.height=120;//可修改的
console.log(obj)//{name: 'hhh', height: 120, age: '18'}

```

+ set、get 

```js
var o = { a: 1 };

Object.defineProperty(o, "c", {
    enumerable: true,
    configurable: true,
    set: function (value) {
        this._c = value;
    },
    get: function () {
        return this._c;
    },
});
```

**注意：**

+ 一般defineProperty方法不用来定义类（class）的静态属性，而是用来定义实例化对象的静态属性。
+ 因为类里面是不能使用const来定义常量的，所以只能在类的初始化方法constructor中使用Object.defineProperty()。

```js
class Box {
    constructor() {
        Object.defineProperty(this, "ROW", {
            configurable: true,
            enumerable: true,
            value: 5,
        });
    }
    play() {
        console.log(this.ROW);
    }
}

var b=new Box();
console.log(b.ROW); //5
b.play(); //5
```
+  不能修改原型链 

### Object.defineProperties()

+ **Object.defineProperties(proto, propertiesObject) **：可设置修改多个属性的 ，并返回该对象。

```js
var obj = {name:'HJJ',height:160};
Object.defineProperties(obj, {
    'name': {
        value: 'HHHH'
    },
    'age': {
        value: '18'
    }
});
console.log(obj)//{name: 'HHHH', height: 160, age: '18'}
obj.age=12;//defineProperties新增的，默认是不可修改的, writable:true，则可修改
obj.name='hhh';//可修改的
obj.height=120;//可修改的
console.log(obj)//{name: 'hhh', height: 120, age: '18'}
```





### Object.create()

+ **Object.create(proto, propertiesObject)**：创建一个新对象，使用现有的对象来提供新创建的对象的`__proto_`。
+ **返回一个新对象**，带着指定的原型对象和属性。

```js
const person = {
  name: 'HHH',
  say: function() {
    console.log(`${this.name} say hello ${this.age} `);
  }
};
//第二个参数的用法：和Object.defineProperties相同
const me = Object.create(person,{
    'age': {
        value: '18'
    }
});
me.say()//HHH say hello 18 
console.log(me)//{age: '18'}==>里面还有__proto__属性
console.log(me.__proto__)//{name: 'HHH', say: ƒ}
console.log(me.name)//'HHH'
```

### Object.assign()

+ **Object.assign(target, source_1, ···)**：用于将源对象的所有可枚举属性复制到目标对象中。
+ **返回新对象**。属于浅拷贝。

```js
let target = {a: 1};
let object2 = {b: 2};
let object3 = {c: 3};
Object.assign(target,object2,object3);  
// 第一个参数是目标对象，后面的参数是源对象
console.log(target);  // {a: 1, b: 2, c: 3}

Object.assign([2,3], [5]);  // [5,3]。。==>[2,3]=>{0:2,1:3}=>属性复制
```

### Object.is()

+ **Object.is(value1, value2)**：用来比较两个值是否严格相等，与（===）基本类似。

+ **返回布尔值**。

```js
Object.is(1,2);  // false
Object.is([1],[1]);      // false
Object.is({a:1},{a:1});  // false

//与（===）的区别
Object.is(+0,-0);  //false
+0 === -0  //true

Object.is(NaN,NaN); //true
NaN===NaN //false
```

### **Object.keys**()

+ **Object.keys(obj)**：获取指定对象的键值
+ 返回值是一个数组。不包括Symbol值作为名称的属性。

```js
let person = {name:"张三",age:25,getName:function(){}}
Object.keys(person) // ["name", "age","getName"]

let arr=['a','b',33]
Object.keys(arr) // ['0', '1', '2']

let str='abcdef'
Object.keys(str) // ['0', '1', '2', '3', '4', '5']
```

### Object.getOwnPropertyNames(obj) 

+ **Object.getOwnPropertyNames(obj)**：方法返回对象的所有自身属性的属性名。不包括Symbol值作为名称的属性。
+ 返回值是一个数组。不包括Symbol值作为名称的属性。

```js
let person = {name:"张三",age:25,getName:function(){},[Symbol()]:"zs"}
Object.getOwnPropertyNames(person) // ["name", "age","getName"]

let arr=['a','b',33]
Object.getOwnPropertyNames(arr) // ['0', '1', '2','length']
```

## 实例成员

> 实例成员：由构造函数创建出来的**对象能直接访问的属性和方法**，包括：对象本身以及原型中的所有的属性和方法。

- constructor
- hasOwnProperty()：判断是否是实例属性。返回值是布尔值

```js
let obj={
    name:'HHH'
}
obj.hasOwnProperty('name');//true
obj.hasOwnProperty('age');//false
```

- isPrototypeOf
- propertyIsEnumerable()
- toString()
- valueOf()

