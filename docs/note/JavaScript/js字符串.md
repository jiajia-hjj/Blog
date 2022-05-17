---
title: String对象的常用方法
tags:
  - JavaScript
categories:
  - JavaScript
---





+ 字符串所有的方法，都不会修改字符串本身(**字符串是不可变的**)，操作完成会返回一个新的字符串
```js
var str = 'abc';
str = 'hello';
// 当重新给str赋值的时候，常量'abc'不会被修改，依然在内存中
// 重新给字符串赋值，会重新在内存中开辟空间，这个特点就是字符串的不可变
// 由于字符串的不可变，在大量拼接字符串的时候会有效率问题
```

## 一、字符方法

### **charAt()**

+ 获取指定位置处字符

```js
var str = "lonhon"; 
str.charAt(2); //"n"
```

### **charCodeAt()** 

+ 获取指定位置处字符的ASCII码

```js
var str = "lonhon"; 
str.charCodeAt(2); //110
```

### str[i] 

+ HTML5，IE8+支持

```js
var str = "lonhon";
console.log(str[2])//"n"
```





## 二、字符串操作方法

###  **concat()**  

+ 拼接字符串，等效于+，+更常用。**不会改变原字符串，返回值是新字符串。**

```js
var str = 'hello'; 
str.concat('hhh','哈哈哈'); //"hellohhh哈哈哈"
```

### **slice()**

+ slice(start,end)，从start位置开始，截取到end位置字符组成一个新的数组。**返回值是新字符串。**

```js
var str = 'hello'; 
str.slice(1);//"ello"
str.slice(1,2);//"e"
//负数+数组长度,来确定相应的位置。NaN=>0
str.slice(-1,-2);//=>str.slice(-1+5,-2+5);=>str.slice(4,3)=>""
str.slice(-2,-1);//=>str.slice(-2+5,-1+5);=>str.slice(3,4)=>"l"
str.slice('ss',2);//=>str.substring(0,2)=>"he"
```

### substring()

+ substring(start,end)，从start位置开始，截取到end位置字符组成一个新的数组。**返回值是新字符串。**

```js
var str = 'hello'; 
str.substring(1);//"ello"
str.substring(1,2);//"e"
//NaN、负数，替换为0。
str.substring(-1,-2);//=>str.substring(0,0)=>""
str.substring(-2,2);//=>str.substring(0,2)=>"he"
```

### substr()

+ substr(startt[,length])，从start位置开始，截取length个字符组成一个新的数组。**返回值是新字符串。**

```js
var str = 'hello'; 
str.substr(1);//"ello"
str.substr(1,2);//"el"
str.substr(-3,2);//"ll"
```

## 三、位置方法

### indexOf()、lastIndexOf()

+ **indexOf**(查找的项，起点位置):  开头向后查找。找到返回位置，没找到返回-1
+ **lastIndexOf**(查找的项，起点位置)：末尾开始向前查找。。找到返回位置，没找到返回-1

```js
var str = 'worldor'; 
str.indexOf('or',1)//1
str.indexOf('or',2)//5

str.lastIndexOf('o',1)//1
str.lastIndexOf('o',0)//-1
```

### search()

+ 查找匹配字符串的位置。**返回值是查找与内容匹配的第一个字符串的位置。**

```js
var str = "ABCDECDF"; 
str.search("CD"); // 2
str.search("CDa"); // -1
//可用正则匹配
str.search(/CD/g); //2
```

### match()

+ 查找匹配字符串。**返回值是存放匹配结果的数组。数组的内容依赖于 regexp 是否具有全局标志 g。**
+ 没有 g，只执行一次匹配。

```js
var str = "ABCD2ECD3F2"; 
str.match("CD"); // ["CD", index: 2, input: "ABCDECDF", groups: undefined]
str.match("CDa"); // null
//可用正则匹配
str.match(/CD/g); //["CD", "CD"]
str.match(/\d/g); //["2", "3","2"]
```



##  四、去除空白  

### trim()

+ 只能去除字符串前后的空白

```js
var str = '      w orl   d   ';
str.trim('o',1)//"w orl   d"
```

## 五、大小写转换方法

### to(Locale)UpperCase() 

+ 转换大写

```js
var str = 'world'; 
str.toUpperCase()//"WORLD"
```

### to(Locale)LowerCase() 

+ 转换小写

```JS
var str = 'wORLd'; 
str.toLowerCase()//1
```

## 六、其他方法

### replace()

+ 用一些字符替换另一些字符。**返回值是一个新字符串**

```JS
var str="ABCDECDF"
str.replace("CD","22"); //"AB22ECDF"
//可用正则匹配
str.replace(/CD/i,"22"); //"AB22ECDF"
str.replace(/CD/g,"22"); //"AB22E22F"
```

### split()

+ 将一个字符串按分割符分割为子字符串，然后将结果作为字符串数组返回 。**返回值是一个数组**

```js
var str = "AA BB CC DD EE FF"; 
str.split(" ",3)//["AA", "BB", "CC"]
str.split(" ")//["AA", "BB", "CC", "DD", "EE", "FF"]
str.split("DD")//["AA BB CC ", " EE FF"]
```

### fromCharCode()

+ 将指定的 Unicode 值，转成对应的字符。返回一个字符串。

```js
var str = String.fromCharCode(72,69,76,76,79);
console.log(str);//HELLO
```

## 七、ES6新增

### 子字符串的识别

#### includes()、startsWith()、endsWith()

+ 用于子字符串的识别

+ **includes**(搜索的字符串，起始位置索引)：判断是否找到参数字符串。**返回布尔值**。

+ **startsWith**(搜索的字符串，起始位置索引)：判断参数字符串是否在原字符串的头部。**返回布尔值**。

+ **endsWith**(搜索的字符串，起始位置索引)：判断参数字符串是否在原字符串的尾部。**返回布尔值**。

```js
let str = "apple,banana,orange";
str.includes("banana");     // true
str.startsWith("apple");    // true
str.startsWith("banana",6)  // true
str.endsWith("apple");      // false
```

### 字符串重复 

#### repeat()

+ 将字符串重复指定次数返回。**返回新的字符串**。

```js
let str = 'abc';
str.repeat(2);//"abcabc"
str.repeat(2.6);//"abcabc"
str.repeat(-0.6);//""
str.repeat(-2);//报错
str.repeat(NaN);//""
```

### 字符串补全

#### padStart()、padEnd()

- **padStart**(新字符串长度,字符串)：用参数字符串从头部补全原字符串。返回新的字符串。
- **padEnd**(新字符串长度长度,字符串)：参用数字符串从尾部补全原字符串。返回新的字符串。

```js
let str = 'abc';
str.padStart(7,'123');//"1231abc"
str.padStart(7);//"    abc"
str.padEnd(7,"123");//"abc1231"
str.padEnd(2,"123");//"abc"==
```

