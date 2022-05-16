---
title: 解决JavaScript数字精度丢失问题的方法
tags:
  - JavaScript
categories:
  - JavaScript
---

## **一、JS数字精度丢失的一些典型问题**

**1. 大整数运算**

```js
9999999999999999==10000000000000001 //true
```



**2. 两个简单的浮点数相加**

```js
0.1 + 0.2 != 0.3//false

///相减、相乘
0.18-1  //-0.8200000000000001
0.68*10 //6.800000000000001

```

**3. toFixed** **不会四舍五入**

```js
1.255.toFixed(2);//'1.25'，不会四舍五入
1.225.toFixed(2);//'1.23',会四舍五入
```

## **二、JS 数字丢失精度的原因**

- **进制转换** ：js 在做数字计算的时候，0.1 和 0.2 都会被转成二进制后无限循环 ，但是 js 采用的 IEEE 754 二进制浮点运算，尾数最大可以存储 53 位有效数字，于是大于 53 位后面的会全部截掉，将导致精度丢失。
  + 双精度存储（double precision），占用 64 bit。(1位用来表示符号位，11位用来表示指数，52位表示尾数)
- **对阶运算** ：由于指数位数不相同，运算时需要对阶运算，阶小的尾数要根据阶差来右移（`0舍1入`），尾数位移时可能会发生数丢失的情况，影响精度。

+ 大整数的精度丢失和浮点数本质上是一样的，尾数位最大是52位，因此 JS 中能精准表示的最大整数是 Math.pow(2, 53)，十进制即 9007199254740992。

+ 因此看似有穷的数字, 在计算机的二进制表示里却是无穷的，由于存储位数限制因此存在“舍去”，精度丢失就发生了

## **三、解决方案**

**1.大整数运算**

+ JavaScript 安全整数  `Math.pow(-2, 53) ~Math.pow(2, 53)` ，整数运算结果不超过 Math.pow(2, 53) 就不会丢失精度。

```js

function getLen(num){
    let numStr=num.toString();
    console.log(numStr,numStr.indexOf('.')===-1);
    //获取小数点后面的长度
    return numStr.indexOf('.')===-1?0:numStr.split('.')[1].length
}

// bigRes 的大数相除（即 /）是会把小数部分截掉,不适合有小数点的
function add(a, b) {
    const maxLen= Math.max(getLen(a),getLen(b));
    const base=Math.pow(10,maxLen);
    const bigA = BigInt(Math.round(base * a));
    const bigB = BigInt(Math.round(base * b));
    const bigRes=(bigA+bigB)/BigInt(base)
    return Number(bigRes)
}
//小数会被截掉
1.1+0.11//1.2100000000000002
add(1.1,0.11);//1

Math.pow(2, 53) //9007199254740992
9007199254740992+1//9007199254740992
add(9007199254740992,1)//9007199254740993
```

**2.小数运算**

不能超过 `Math.pow(-2, 53) ~Math.pow(2, 53)`

+ **解决方式：把小数放到位整数（乘倍数），再缩小回原来倍数（除倍数）**

```js
// 0.1 + 0.2
(0.1*10 + 0.2*10) / 10 == 0.3 // true

function myFixed(a, b) {//a:数字，b:小数点后有几位数
  return Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
}
console.log(0.68*10);              //6.800000000000001
console.log(myFixed(0.68*10, 1));  //6.8
```

+ 封装

```js
/**

 * floatObj 包含加减乘除四个方法，能确保浮点数运算不丢失精度
 * 我们知道计算机编程语言里浮点数计算会存在精度丢失问题（或称舍入误差），其根本原因是二进制和实现位数限制有些数无法有限表示
 * 以下是十进制小数对应的二进制表示
 *  0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
 *  0.2 >> 0.0011 0011 0011 0011…（0011无限循环）
 * 计算机里每种数据类型的存储是一个有限宽度，比如 JavaScript 使用 64 位存储数字类型，因此超出的会舍去。舍去的部分就是精度丢失的部分。
 * ** method **
 * add / subtract / multiply /divide

 * ** explame **
 * 0.1 + 0.2 == 0.30000000000000004 （多了 0.00000000000004）
 * 19.9 * 100 == 1989.9999999999998 （少了 0.0000000000002）
 * floatObj.add(0.1, 0.2) >> 0.3
 * floatObj.multiply(19.9, 100) >> 1990
 *
 */

var floatObj = function() {
    /*
  * 判断obj是否为一个整数
  */
    function isInteger(obj) {
        return Math.floor(obj) === obj
    }

    /*
  * 将一个浮点数转成整数，返回小数点后面的长度。如 3.14 >> 314，2
  * @param num {number} 小数
  */

    function getLen(num){
        let numStr=num.toString();
        return numStr.indexOf('.')===-1?0:numStr.split('.')[1].length
    }


 /*
  * 核心方法，实现加减乘除运算，确保不丢失精度
  * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
  * @param a {number} 运算数1
  * @param b {number} 运算数2
  * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
  * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
  */

    function operation(a, b, digits, op) {
        var result = null
        const maxLen= Math.max(getLen(a),getLen(b));
        const base=Math.pow(10,maxLen);
        const bigA = Math.round(base * a);
        const bigB = Math.round(base * b);
        switch (op) {
            case 'add':
                result = bigA + bigB
                break
            case 'subtract':
                result =  bigA - bigB
                break
            case 'multiply':
                result = bigA * bigB
                break
            case 'divide':
                result = bigA / bigB
                break
        }
        return result / base
    }

    // 加减乘除的四个接口

    function add(a, b, digits) {
        return operation(a, b, digits, 'add')
    }

    function subtract(a, b, digits) {
        return operation(a, b, digits, 'subtract')
    }

    function multiply(a, b, digits) {
        return operation(a, b, digits, 'multiply')
    }

    function divide(a, b, digits) {
        return operation(a, b, digits, 'divide')
    }


    // exports
    return {
        add,
        subtract,
        multiply,
        divide
    }
}();
floatObj.add(0.1, 0.2,3)//0.3
floatObj.add(1.1,0.11);//1.21
floatObj.multiply(19.9, 100) //1990
```

 

**3.toFixed的修复**

```js
function toFixedFun (data, len){
  // debugger
  const number = Number(data);
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString();
  }
  if (typeof (len) === 'undefined' || len === 0) {
    return (Math.round(number)).toString();
  }
  let result = number.toString();
  const numberArr = result.split('.');

  if (numberArr.length < 2) {
    // 整数的情况
    return padNum(result);
  }
  const intNum = numberArr[0]; // 整数部分
  const deciNum = numberArr[1];// 小数部分
  const lastNum = deciNum.substr(len, 1);// 最后一个数字

  if (deciNum.length === len) {
    // 需要截取的长度等于当前长度
    return result;
  }
  if (deciNum.length < len) {
    // 需要截取的长度大于当前长度 1.3.toFixed(2)
    return padNum(result);
  }
  // 需要截取的长度小于当前长度，需要判断最后一位数字
  result = `${intNum}.${deciNum.substr(0, len)}`;
  if (parseInt(lastNum, 10) >= 5) {
    // 最后一位数字大于5，要进位
    const times = Math.pow(10, len); // 需要放大的倍数
    let changedInt = Number(result.replace('.', ''));// 截取后转为整数
    changedInt++; // 整数进位
    changedInt /= times;// 整数转为小数，注：有可能还是整数
    result = padNum(`${changedInt }`);
  }
  return result;
  // 对数字末尾加0
  function padNum(num) {
    const dotPos = num.indexOf('.');
    if (dotPos === -1) {
      // 整数的情况
      num += '.';
      for (let i = 0; i < len; i++) {
        num += '0';
      }
      return num;
    } else {
      // 小数的情况
      const need = len - (num.length - dotPos - 1);
      for (let j = 0; j < need; j++) {
        num += '0';
      }
      return num;
    }
  }
}
toFixedFun(1.255,2);//1.26
```

## 四、三方库

**1.Math.js**

+ 专门为 JavaScript 和 Node.js 提供的一个广泛的数学库。支持数字，大数字(超出安全数的数字)，复数，分数，单位和矩阵。 功能强大，易于使用。

+ 官网：[mathjs.org/](https://link.juejin.cn?target=http%3A%2F%2Fmathjs.org%2F)

+ GitHub：[github.com/josdejong/m…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fjosdejong%2Fmathjs)

**2.big.js**

+ 官网：[mikemcl.github.io/big.js](https://link.juejin.cn?target=http%3A%2F%2Fmikemcl.github.io%2Fbig.js)

+ GitHub：[github.com/MikeMcl/big…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FMikeMcl%2Fbig.js%2F)





> 参考转自：
>
>  [解决JavaScript数字精度丢失问题的方法](https://blog.csdn.net/liubangbo/article/details/114695689)
>
> [0.1 + 0.2不等于0.3？为什么JavaScript有这种“骚”操作？](https://juejin.cn/post/6844903680362151950)

