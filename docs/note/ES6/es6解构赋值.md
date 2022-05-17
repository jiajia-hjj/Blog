---
title: 解构赋值
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---



+ 左右两个边结构必须一样

```js
//1、数组
let [a, b, c] = [1, 2, 3, 4]
console.log(a, b, c)//1 2 3

let [a, ...b] = [1, 2, 3];
console.log(a, b)//a=>1,b=[2,3]

//2、对象
let {x, y, z} = {x: 1,z: 3,y: 2}
console.log(x, y, z)//1 2 3

let { baz : foo } = { baz : 'ddd' };
console.log(foo)//'ddd'

let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
console.log(a, b,rest)//a=>10,b=>20,rest => {c: 30, d: 40}


//字符串
const [ ...chars ] = "abcde";
console.log(chars);// ['a', 'b', 'c', 'd', 'e']

const chars = [ ..."abcde"];
console.log(chars);// ['a', 'b', 'c', 'd', 'e']

```

