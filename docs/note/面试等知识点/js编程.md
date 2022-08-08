## 七、编程算法

### 1、['1', '2', '3'].map(parseInt)** 

+ parseInt(100, 2); //4，(2进制,0x2^0^+0x2^1^+1x2^2)

+ ```js
  ['1', '2', '3'].map((item, index) => {
  	return parseInt(item, index)
  })
  ```

  即返回的值分别为：

  ```js
  parseInt('1', 0) // 1 (0:es5是十进制)
  parseInt('2', 1) // NaN
  parseInt('3', 2) // NaN, 3 不是二进制
  ```

### **2、函数节流(throttle)**

+ 规定在给定时间内，只能触发一次函数。如果在给定时间内触发多次函数，只有一次生效。


```js
/**
 * 节流 使用时间戳，会立即执行一次
 * @param {Function} func 执行节流操作的函数
 * @param {Number} interval 时间，n秒后触发
 */
function throttle(func,interval=100){
    let previous=0;
     return function(){
         const context=this;
         const args=arguements;
         let now=+new Date();
         if(now-previous>interval){
            func.apply(context,args);
            previous=now;
         }
     }
}
/**
 * 节流 使用定时器，不会立即执行n 秒后第一次执行
 * @param {Function} func 执行节流操作的函数
 * @param {Number} interval 时间，n秒后触发
 */
function throttle(func,interval=100){
    let timeid=null;
    return function(){
         const context=this;
         const args=arguements;
         if(timeid) return;
         timeid=setTimeout(()=>{
             timeid=null;
             func.apply(context,args);
         },interval)
    }
   
}
```

**函数节流**

+ 鼠标不断点击触发，mousedown(单位时间内只触发一次)
+ 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

### **3、函数防抖(debounce)**

+ 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。(你触发完事件 n 秒内不再触发事件，我才执行)

```js
/**
 * 防抖 正常版本,n秒后第一次触发
 * @param {Function} func 执行防抖操作的函数
 * @param {Number} interval 时间，,n秒后触发
 */
function debounce(func,interval=100){
    let timeid=null;
    return function(){
        const context = this;
        const args = arguments;
        if(timeid) clearTimeout(timeid);
        timeid= setTimeout(()=>{
            func(context,args);
        },interval)
    }
}
/**
 * 防抖 可设置首次是否立即执行
 * @param {Function} func 执行防抖操作的函数
 * @param {Number} interval 时间，n秒后触发
 * @param {Boolean} immediate 是否立即执行函数
 */
function debounce(func,interval=100,immediate){
    let timeid=null;
    return function(){
        const context = this;
        const args = arguments;
        if(timeid) clearTimeout(timeid);
        if(immediate){
             // 如果已经执行过，不再执行
            let callNow=!timeid;
            timeid= setTimeout(()=>{
                timeid=null;
            },interval)
            if(callNow)  func.appl(context,args);
        }else{
            timeid= setTimeout(()=>{
                func.appl(context,args);
            },interval);
        }

    }
}
```

**应用场景：**

+ search搜索联想，用户在不断输入值时，用防抖来节约请求资源；
+ window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次



### **4、数组去重**

```js
//普通方法
function uniqueArr(arr){
    let result=arr.filter((item,index,arrs)=>{
       return arrs.indexOf(item)==index
    })
    return result;
}
//ES6 Set
function uniqueArr(arr){
     return [...new Set(arr)]
}
let newArr=uniqueArr([1,2,1,1,2,3]);//[1, 2, 3]
```

### 5、数组交集

```js
//普通方法
function intersectArr(arr1,arr2){
	return arr2.filter((item2,index)=>{
        let flag=false;
        arr1.forEach((item1,index)=>{
            if(item1==item2)flag=true;
        });
        return flag;
    })

}
//ES6 Set
function intersectArr(arr1,arr2){
    return arr1.filter((item)=>new Set(arr2).has(item));
}
intersectArr([1, 2, 4],[2,4,5])//[2,4]
```

### 6、数组并集

```js
//普通方法
function unionArr(arr1,arr2){
    const newArr=arr1.concat(arr2);
    return newArr.filter((item,index,arrs)=>arrs.indexOf(item)==index);
}

//ES6 Set
function unionArr(arr1,arr2){
    return new Set([...arr1,...arr2]);
}
unionArr([1, 2, 4],[2,4,5])//[1, 2, 4, 5]
```

### 7、数组差集

```js
//普通方法
function diffArr(arr1,arr2){
    return arr1.filter((item1)=>{
        return arr2.every((item2)=>{
           return item1!=item2
        })

    });
}
//ES6 Set
function diffArr(arr1,arr2){
    return arr1.filter(item=>!new Set(arr2).has(item));
}
let arr1 = [1, 2, 4]
let arr2 = [2,4,5]
diffArr(arr1,arr2)//arr1-arr2 [1]
diffArr(arr2,arr1)//arr2-arr1 [5]
```

### 8、深拷贝

```js
//普通递归版本
function deepClone(obj){
    if(typeof obj!="object"){
        return obj;
    }
    let result = obj instanceof Array ||Object.prototype.toString.call(obj)==="[Object Array]"?[]:{};
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            result= deepClone(obj[key]);
        }
    }
    return result;
}
// 解决循环引用问题的版本
function deepClone(obj={},map=new Map()){
    if (typeof obj !== "object") {
        return obj;
    }
    if (map.get(obj)) {
        return map.get(obj);
    }

    let result = {};
    // 初始化返回结果
    if (
        obj instanceof Array ||
        // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
        Object.prototype.toString(obj) === "[object Array]"
    ) {
        result = [];
    }
    // 防止循环引用
    map.set(obj, result);
    for (const key in obj) {
        // 保证 key 不是原型属性
        if (obj.hasOwnProperty(key)) {
            // 递归调用
            result[key] = deepClone(obj[key], map);
        }
    }
   return result;
}
```

### 6、手写 reduce

```js
//先不考虑第二个参数初始值：
Array.prototype.reduce = function (cb) {
  const arr = this; //this就是调用reduce方法的数组
  let total = arr[0]; // 默认为数组的第一项
  for (let i = 1; i < arr.length; i++) {
    total = cb(total, arr[i], i, arr);
  }
  return total;
};
//考虑上初始值：
Array.prototype.reduce = function (cb, initialValue) {
  const arr = this;
  let total = initialValue || arr[0];
  // 有初始值的话从0遍历，否则从1遍历
  for (let i = initialValue ? 0 : 1; i < arr.length; i++) {
    total = cb(total, arr[i], i, arr);
  }
  return total;
};

```



### 7、列表还原树状结构

### 8、new关键字的实现

+ 在内存中创建一个新的空对象
+ 根据原型链，设置空对象的 `__proto__` 为构造函数的 `prototype` 。
+ 让构造函数的this指向这个新的对象，执行构造函数。目的：给这个新对象加属性和方法
+ new会返回这个新对象

```js
function myNew(context) {
    const obj =new Object();
    obj.__proto__=context.prototype;
    let res=context.apply(obj,[...arguments].slice(1));
    return typeof res=="object"?res:obj;
}

function Person(name,age){
    this.name=name;
    this.age=age
}
//实例
let p1=myNew(Person,'hjj','18');//==>Person {name: 'hjj', age: '18'}
```

### 9、快速排序

```js
function sortArray(nums){
    quickSort(0,nums.length-1,nums);
    return nums;
}
function quickSort(start,end,arr){
    if(start<end){
        const mid=sort(start,end,arr);
        quickSort(start,mid- 1,arr);
        quickSort(mid+ 1,end,arr);
    }
}
function sort(start,end,arr){
    const base=arr[start];
    let left=start;
    let right=end;
    while(left!==right){
        while(arr[right]>=base&&right>left){
            right--;
        }
        arr[left]=arr[right];
        while(arr[left]<=base&&right>left){
            left++;
        }
        arr[right]=arr[left];
    }
    arr[left]=base;
    return left;
}
sortArray([19,97,09,17,01,08])
```

### 

https://zydown.99.com/gw/other/package/hjj/2022/05/my/05mtlb/new.html

https://zydown.99.com/gw/other/package/hjj/2022/05/my/05mtlb/index.html