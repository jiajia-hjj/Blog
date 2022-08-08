---
title: Array对象的常用方法
tags:
  - JavaScript
categories:
  - JavaScript
---



## 一、检验数组

### **instanceof**

```js
var arr = []; 
arr instanceof Array; //=> true;
```

### Object.prototype.toString.call()

```js
var arr = []; 
Object.prototype.toString.call(arr) //=> "[object Array]"
```

### **Array.isArray(arr)** 

```js
var arr = []; 
Array.isArray(arr); //=> true;
```

## 二、转换方法

### toString()

+ 把数组转字符串，逗号分隔每一项。**不会改变原数组，返回值是String类型**

```js
var arr = ['a','b','hhh']; 
arr.toString(); //=>"a,b,hhh"
```

### **valueOf()**

+ **不会改变原数组，返回数组对象本身**

```js
var arr = ['a','b','hhh']; 
arr.valueOf(); //=>["a", "b", "hhh"]
```

### **join()**

+ 把数组转字符串，使用分隔符分隔每一项。**不会改变原数组，返回值是String类型**

```js
var arr = ['a','b','hhh']; 
arr.join(); //=>"a,b,hhh"
arr.join('-'); //=>"a-b-hhh"
```

### Array.from()

+ 将一个类似数组或可迭代对象，转为一个新的数组。浅拷贝

```js
Array.from('foo');// [ "f", "o", "o" ]

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
Array.from(arrayLike);// ['a', 'b', 'c']

Array.from([1, 2, 3], x => x + x);// [2, 4, 6]

const set = new Set(['foo', 'bar', 'baz', 'foo']);
Array.from(set);// [ "foo", "bar", "baz" ]
```



## 三、栈方法

### push()、pop()

+ **push()**：值追加到数组末尾。**会改变原数组，返回值是数组的长度**。
+ **pop()**：移除数组中最后一个元素，减少length值。**会改变原数组，返回值是移除的值**。

```js
var arr = ['a','b','hhh']; 
var a=arr.push('123','456'); //a=5
console.log(arr);// ["a", "b", "hhh", "123", "456"]
var b=arr.pop();  //b="456"
console.log(arr); //["a", "b", "hhh", "123"]
```

##  四、队列方法

### unshift()、shift()

+ **unshift()**：值追加到数组最前面。**会改变原数组，返回值是数组的长度**。
+ **shift()**：移除数组中第一个元素，减少length值。**会改变原数组，返回值是移除的值**。

```js
var arr = ['a','b','hhh']; 
var a=arr.unshift('123','456'); //a=5
console.log(arr);// [  "123","456","a", "b", "hhh"]
var b=arr.shift();  //b="123"
console.log(arr); //["456","a", "b", "hhh"]
```

## 五、排序方法

### **reverse()**

+ 反转数组项的顺序。**会改变原数组，返回值是新数组**

```js
var arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr);//[5,4,3,2,1]
```

### **sort()**

+ 默认**升序**排列。会先成转字符串，后排序。**会改变原数组，返回值是原数组**

```js
var arr = [1, 'a', 12,4, 'hh'];
arr.sort();
console.log(arr);//[1, 12, 4, "a", "hh"]

//4比12小不合理。
/*sort()可接收一个 比较函数 作为参数。
  比较函数(a,b):a在b前=>-1;a在b后1。
*/
//升序
function compareAsc(a,b)    {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}
//降序序
function compareDes(a,b)    {
    if (a < b) {
        return 1;
    } else if (a > b) {
        return -1;
    } else {
        return 0;
    }
}
arr.sort(compareAsc);
console.log(arr.sort(compareAsc););//[1, 4, 12, "a", "hh"]
arr.sort(compareDes);
console.log(arr);//[12, 4, 1, "hh", "a"]
```

## 六、操作方法

###  **concat()**  

+ 用于连接两个或多个数组。**不会改变原数组，返回值是新数组。**

```js
var arr = ['a','b']; 
arr.concat('hhh',[1,2]); //=> ["a", "b", "hhh", 1, 2]
```

### **slice()**

+ 从原数组中截取一个新的数组。**不会改变原数组，返回值是新数组。**

```js
var arr = ["a", "b", "c", "d", "e"];
arr.slice(1);//["b", "c", "d", "e"];
arr.slice(1,2);//["b"]
//负数+数组长度,来确定相应的位置。NaN=>0
arr.slice(-1,-2);//=>arr.slice(-1+5,-2+5);=>arr.slice(4,3)=>[]
arr.slice(-2,-1);//=>arr.slice(-2+5,-1+5);=>arr.slice(3,4)=>["d"]
```

### splice()

+ **splice**(开始的位置，要删除的个数，要替换的值)：删除、插入、替换当前数组的某些项。 **会改变原数组，返回值是替换或删除项**

```js
var arr = ["a", "b", "c", "d", "e"];
//删除,c
arr.splice(2,1)//["c"]
console.log(arr)//["a", "b", "d", "e"]

var arr = ["a", "b", "c", "d", "e"];
//插入,c前插入f,g
arr.splice(2,0,'f','g')//[]
console.log(arr)//["a", "b", "f", "g", "c", "d", "e"]

var arr = ["a", "b", "c", "d", "e"];
//替换,c,d替换f,g
arr.splice(2,2,'f','g')//["c","d"]
console.log(arr)//["a", "b", "f", "g", "e"]
```

## 七、位置方法

### indexOf()、lastIndexOf()

+ **indexOf**(查找的项，起点位置):  开头向后查找。找到返回位置，没找到返回-1
+ **lastIndexOf**(查找的项，起点位置)：末尾开始向前查找。。找到返回位置，没找到返回-1

```js
var arr = ["a", "b", "c", "d", "e"];
arr.indexOf('b',1)//1
arr.indexOf('b',2)//-1

arr.lastIndexOf('b',1)//1
arr.lastIndexOf('b',0)//-1
```

## 八、迭代方法

+ 回调函数参数：
  + currentValue，index，arr
  + 当前元素的值(必)，当前元素的索引值，当前元素属于的数组对象
+ **不会改变原数组**

### **map()**

+ 映射 ，对数组元素一个一个进行处理。**返回值是新数组**。

```js
let arr = [12, 5, 8]
let result = arr.map(function (item) {
    return item*2
})
console.log(result)//[24, 10, 16]

let result2 = arr.map(item=>item*2) // 简写
console.log(result2)//[24, 10, 16]

```

###  redece()

+ 累加。最终**返回一个值**。
+ 回调元素参数：
  + total，currentValue，index，arr
  + 初始值(或者计算结束后的返回值,必)，当前元素的值(必)，当前元素的索引值，当前元素属于的数组对象
+ ==注：都不会对空数组进行操作，使用前要判空。==

```js
var arr = [1, 3, 5, 7]
var result = arr.reduce(function (tmp, item, index) {
    //tmp 上次结果，item当前数，index次数1开始
    console.log(tmp, item, index)
      //1 3 1
      //4 5 2
      //9 7 3
    return tmp + item
})
console.log(result) //16

// 求平均值
var arr = [1, 3, 5, 7]
var result = arr.reduce(function (tmp, item, index) {
    if (index != arr.length - 1) { // 不是最后一次
        return tmp + item
    } else {
        return (tmp + item)/arr.length
    }
})
console.log(result)  //4   
```

### filter()

+ 过滤器，保留为true的。**返回值是新数组**

```js
let arr = [12, 4, 8, 9]
let result = arr.filter(function (item) {
    return item % 3 === 0
})
console.log(result)//[12,9]

let result = arr.filter(item => item % 3 === 0)//简写
console.log(result)//[12,9]
```

### every()

+ 检测数组所有元素是否都符合指定条件。**返回值是布尔值**。
+ 都满足条件为true,有一个不满足为false----> **一假即假**

```js
let arr = [12, 4, 8, 9]
let result = arr.every(item => item % 3 === 0)//简写
console.log(result)//false
```

### some()

+ 检测数组所有元素是否存在符合指定条件。返回值是布尔值。
+ 只要有一个满足条件就为true------> **一真即真**

```js
let arr = [12, 4, 8, 9]
let result = arr.some(item => item % 3 === 0)//简写
console.log(result)//true
```

### forEach()

+ 循环，对数组中的每一项运行给定函数。**没有返回值**。

```js
let arr = [12, 4, 8, 9]
let result = arr.forEach(item => console.log(item))
//12
//4
//8
//9
```

### find()

+ 查找第一个符合条件的数组元素。**返回符合条件的元素；**没有符合条件的元素，**返回值是undefined**。

```js
const arr=[1,2,3,4,5,6];
let result=arr.find(item=>item>4);
console.log(result);// 5
```

### findIndex()

+ 查找第一个符合条件的数组元素。**返回符合条件的元素的索引值；**没有符合条件的元素，**返回值是-1**。

```js
const arr=[1,2,3,4,5,6];
let result=arr.findIndex(item=>item>4);
console.log(result);//4
```



## 九、清空数组

```js
let arr = [12, 4, 8, 9]
// 方式1 推荐 
arr = [];
// 方式2 
arr.length = 0;
// 方式3
arr.splice(0, arr.length);
```



## 十、新增方法

### copyWithin()

+ 复制数组的一部分数据覆盖到数组的另一个位置。并返回数组。
+ 会修改数组，但是不会修改数组的长度。

```js
//arr.copyWithin(target[, start[, end]])
 var arr1=['a','b','c','d','e'];
//覆盖到从索引为0开始的元素,  复制的内容是[‘d’],
arr1.copyWithin(0,3,4)
console.log(arr1);//["d", "b", "c", "d", "e"]


var arr1=['a','b','c','d','e'];
//覆盖到从索引为1开始的元素,  复制的内容是[‘d’,‘e’]
arr1.copyWithin(1,3);
console.log(arr1);// ['a', 'd', 'e', 'd', 'e']

```

### includes()

+ 用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。


```js
//arr.includes(searchElement, fromIndex)。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。
[1, 2, 3].includes(2);	//true
[1, 2, 3].includes(4);	// false
[1, 2, 3].includes(3, 3);	// false
[1, 2, 3].includes(3, -1);	//true  3+-1=2，索引2
[1, 2, NaN].includes(NaN);	//true
```

###  fill() 方法

+ 使用固定值来填充数组。
+ 会改变原来是数组

```js
//array.fill(value[, start[, end]])

var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Runoob");//['Runoob', 'Runoob', 'Runoob', 'Runoob']

var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Runoob", 1, 4);//['Banana', 'Runoob', 'Runoob', 'Runoob']
```

### flat()

+ 扁平化数组
+ 不会改变原来是数组

```js
let arr = [1,2,3,[4,5,[6,7],8],9] 
arr.flat()//[1, 2, 3, 4, 5, [6,7], 8, 9]
```

