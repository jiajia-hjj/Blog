---
title: Symbol()函数
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---



## 基本使用

+ ES6 数据类型除了 Number 、 String 、 Boolean 、 Object、 null 和 undefined ，还新增了 Symbol 

+ 表示独一无二的值，最大的用法是用来定义对象的唯一属性名。


```js
//调用Symbol()函数来创建一个Symbol实例：
let s1 = Symbol()
//接受一个字符串参数,表示对Symbol实例的描述
let s2 = Symbol('another symbol')

typeof s2//'symbol'
```



## 应用场景

**场景1：使用symbol作为对象属性名**

+ Symbol 作为对象属性名时不能用.运算符。要用方括号。

```js
const name=Symbol();
const age=Symbol();
const say=Symbol();
let obj={
    [name]:"hjj",
    height:160,
    name:'hhh',
    [say](){
      console.log(this[name]+' say');  
    }
}
obj[age]=18;
console.log(obj[name]);//hjj
console.log(obj[age]);//18
console.log(obj);//{height: 160, Symbol(): 'hjj', Symbol(): 18, Symbol(): ƒ}
obj[say]()//hjj say

/*
注：
1、不会出现在 for...in 、 for...of 的循环中
2、不会被 Object.keys() 、 Object.getOwnPropertyNames() 返回
3、 Object.getOwnPropertySymbols() 和 Reflect.ownKeys() 可取到
*/
console.log(Object.keys(obj));//['height']
for(let key in obj){
    console.log(key); // height
}

// 使用Object的API
console.log(Object.getOwnPropertyNames(obj));// ["height"]
console.log(Object.getOwnPropertySymbols(obj));//  [Symbol(), Symbol(), Symbol()]
console.log(Reflect.ownKeys(obj));//  ['height', 'name', Symbol(), Symbol(), Symbol()]
const sybs=Object.getOwnPropertySymbols(obj);
console.log(sybs[0]===age) //true 引用会相等

/*
补充：
	1.Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
    2.Object.getOwnPropertySymbols()方法返回一个给定对象自身的所有 Symbol 属性的数组。
*/
```



**场景2： 定义常量**

```JS
//原来的定义方式，不能保证常量是独特的
const COLOR_BLUE = "blue";
const MY_BLUE = "blue"
COLOR_BLUE===MY_BLUE//true
//可以保证这一组常量的值都不相等。
const COLOR_BLUE = Symbol("blue");
const MY_BLUE = Symbol("blue");
COLOR_BLUE===MY_BLUE//false
```

**场景3：使用Symbol定义类的私有属性/方法**

+ ES6 中的类是没有 private 关键字来声明类的私有方法和私有变量的，但是我们可以利用 Symbol 的唯一性来模拟。
+ 因为使用者无法在外部创建出一个相同的 say，所以就无法调用该方法

```js
const fn=(()=>{
    const say=Symbol();
    class Person{
        constructor(name,age){
            this.name=name;
            this.age=age;
        }
        say(){
            console.log('say')
        }
        [say](txt){
            console.log('say '+ txt)
        }
    }
    var per2=new Person('hhh',18);
    console.log(per2);  //Person {name: 'hhh', age: 18}
    per2[say]('内部的per2')//say 内部的per2
    return {
        Person
    }
})()


var per=new fn.Person('hjj',15);
console.log(per); //Person{name: 'hjj', age: 15}
per[say]('外部的per')//报错


```

## 方法

### Symbol.for()

+ Symbol.for(key) 会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol.
+ 如果找到了，则返回它；否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。

```js
Symbol.for("foo"); // 创建一个 symbol 并放入 symbol 注册表中，键为 "foo"
Symbol.for("foo"); // 从 symbol 注册表中读取键为"foo"的 symbol

Symbol.for("bar") === Symbol.for("bar"); // true，证明了上面说的
Symbol("bar") === Symbol("bar"); // false，Symbol() 函数每次都会返回新的一个 symbol
```

### Symbol.keyFor()

+ Symbol.keyFor(sym) 方法用来获取 symbol 注册表中与某个 symbol 关联的键。

```js
// 创建一个 symbol 并放入 Symbol 注册表，key 为 "foo"
var globalSym = Symbol.for("foo"); 
Symbol.keyFor(globalSym); // "foo"

// 创建一个 symbol，但不放入 symbol 注册表中
var localSym = Symbol(); 
Symbol.keyFor(localSym); // undefined，所以是找不到 key 的
```





> 参考转自：
>
> [ES6中Symbol的理解和使用](https://blog.csdn.net/weixin_42384718/article/details/108478735)

