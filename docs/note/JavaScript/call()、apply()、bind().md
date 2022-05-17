---
title: call()、apply()、bind()
tags:
  - JavaScript
categories:
  - JavaScript
---





```js
var name='HJJ';
var obj = {
    name:"HHH",
    age:18,
    myFun:function(){
        console.log(this)
        console.log(this.name+'年龄'+this.age);
    }
}
obj.myFun(); //HHH年龄18 ===>对象方法调用,this是该对象obj

var result=obj.myFun;          //==>result=myFun，普通函数,this是window
result();//HJJ年龄undefined

result.call(obj);//HHH年龄18  ===>call改变this指向,this是obj....即result添加到obj环境中
result.apply(obj);//HHH年龄18  ===>apply改变this指向,this是obj
result.bind(obj)();//HHH年龄18  ===>bind改变this指向,this是obj
```

**call()、apply()、bind() 方法的共同点和区别：**

**作用：**都是用来改变函数的this对象的指向的。

**语法：**

```js
call(thisObj,value1,value2...)

apply(thisObj,[value1,value2...])

bind(thisObj,value1,value2...)
```

**参数：**

+ 第一个参数都是this要指向的对象。（添加到哪个环境中）
+ apply第二个参数是个数组。call和bind都是以逗号分隔。

**返回值：**

+ bind是返回函数，需要调用。apply、call是立即调用 。


```js
var person1 = {
    name:"HHH",
    age:18,

    myFun:function(height,job){
        this.height=height
        console.log(this)
        console.log(this.name+'年龄'+this.age+'身高'+height+'工作'+job);
    }
}
var person2 = {
    name:"LLL",
    age:99
}

person1.myFun.call(person2,168,'actor')//LLL年龄99身高168工作actor。。。即person1.myFun添加到person2环境中
person1.myFun.apply(person2,[168,'actor'])//LLL年龄99身高168工作actor
person1.myFun.bind(person2,[168,'actor'])()//LLL年龄99身高168工作actor
```

**总结：**

- 都是用来改变函数的this对象的指向的；
- 第一个参数都是this要指向的对象，也就是想指定的上下文；
- 都可以利用后续参数传参，apply第二个参数是个数组。call和bind都是以逗号分隔；
- bind 是返回函数，便于稍后调用；apply 、call 则是立即调用 。