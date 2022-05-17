---
title: ES6 对象
tags:
  - JavaScript
  - ES6
categories:
  - ES6
---



## 一、对象字面量

+ 更简洁的写法
+ 属性名表达式：允许用表达式作为属性名，但是一定要将表达式放在方括号[]内

```js
const age = 12;
const name = "Amy";
const person = {
    age, 
    name,
    sayHi(){ },
    ["he"+"llo"](){
      return "Hi";
    }
};
person.hello();  //"Hi"
```

## 二、对象的新方法

### 2.1.Object.assign()

+ **Object.assign**(target, source1, ···)：用于将源对象的所有可枚举属性复制到目标对象中。**返回新对象**。属于浅拷贝。

```js
let target = {a: 1};
let object2 = {b: 2};
let object3 = {c: 3};
Object.assign(target,object2,object3);  
// 第一个参数是目标对象，后面的参数是源对象
console.log(target);  // {a: 1, b: 2, c: 3}

Object.assign([2,3], [5]);  // [5,3]。。==>[2,3]=>{0:2,1:3}=>属性复制
```

### 2.2.Object.is()

+ **Object.is**(value1, value2)：用来比较两个值是否严格相等，与（===）基本类似。**返回布尔值**。

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

## 三、class 类

### 3.1.创建对象

```js
class Person{//定义了一个名字为Person的类
    constructor(name,age){//constructor是一个构造方法，用来接收参数
        this.name = name;//this代表的是实例对象
        this.age=age;
    }
    say(){//这是一个类的方法，注意千万不要加上function,方法后不加逗号
        return "我的名字叫" + this.name+"今年"+this.age+"岁了";
    }
    eat() {
    	console.log(this.name+"人可以吃东西");
    }
}

Person.prototype.addFn=function(){
    return "我是通过prototype新增加的方法,名字叫addFn";
}

var obj=new Person("HHH",8);
console.log(obj.say());//我的名字叫HHH今年8岁了
console.log(obj.addFn());//我是通过prototype新增加的方法,名字叫addFn
```

+ 本质是 function。
+ prototype 仍旧存在。

```js
console.log(typeof Person);//function
console.log(Person===Person.prototype.constructor);//true
```

+ 类定义**不会被提升**，必须在访问前对类进行定义，否则就会报错。

### 3.2.constructor方法

+ 构造函数的默认方法，通过new命令生成对象实例时，**自动调用**该方法。
+ 没有显示定义，一个空的constructor方法会被**默认添加**；
+ 默认返回实例对象（this），但可以返回另一个对象

```js
class Student{
    constructor(){
        this.txt="我是一个学生哦！";
    }
}
class Person {
    constructor  () {
        this.txt="我是一个HHHH哦！";
        return new Student;//返回一个新对象
    }
}
let p1= new Person()
console.log( p1.txt)//我是一个学生哦！
p1 instanceof Person//false==>p1不是构造函数Person创造出的实例
p1 instanceof Student//true==>p1是构造函数Student的实例
```

+ constructor中定义的属性可以称为**实例属性**（即定义在this对象上）
+ constructor外声明的属性都是定义在原型上的，可以称为**原型属性**（即定义在class上)。

```js
class Person{//定义了一个名字为Person的类
    constructor(name,age){
        this.name = name;
        this.eat=function(){
            console.log('吃')
        };
    }
    say(){
        return "我的名字叫" + this.name+"今年"+this.age+"岁了";
    }
}
var obj=new Person("HHH",8);
console.log(obj.hasOwnProperty("name"));//true
console.log(obj.hasOwnProperty("say"));//false
```

### 3.3.继承

+ 继承extends，super 超类==父类

```js
class Person{
    constructor(name,age){
        this.type = 'human'
        this.name=name;
        this.age=age;
    }
    sayHi() {
    	console.log("hello Student原型上");
	}
}

class Student extends Person{
    constructor(name,age,score){
         
         super(name,age);// 调用父类的constructor(name,age)。。。要放在追求前面
        this.score=score;
    }
    sayHi() {
    	console.log("hello Student原型上");
	}
    eat() {
    	console.log(this.name+"吃东西");
    }
}

var stu=new Student("小黑",20,"100分");
console.log(stu.type,stu.name,stu.age,stu.score);//human 小黑 20 100分
stu.sayHi();//hello Student
stu.eat();//小黑吃东西
var stu2=new Student("小黑黑",200,"1010分");
console.log(stu2.type,stu2.name,stu2.age,stu2.score);//human 小黑黑 200 1010分
stu2.sayHi();//hello Student
stu2.eat();//小黑黑吃东西
```



### 3.4.静态方法

+ 不需要实例化类，可直接通过该类来调用的方法。
+ 在方法前加上static关键字
+ 通过类名直接调用。
+ 静态方法只能在静态方法中调用,不能在实例方法中调用。
+ 父类的静态方法， 可以被子类继承。

```js
class Box{
    static a(){
        return "我是静态方法a"
    }
    static b(){
       console.log(this.a());
    }
    c(){
       console.log(this.a());
    }
}

class Desk extends Box {}

//通过类名直接调用
console.log(Box.a());//我是静态方法a
Box.b();//我是静态方法a
var obj=new Box();
obj.c();//报错

//子类Desk可以直接调用父类的静态方法a
console.log(Desk.a()); //我是静态方法a
```

**静态属性**：指的是 Class 本身的属性， 即Class.propname， 而不是定义在实例对象（ this） 上的属性。

```js
class Box{
   constructor(){
       this.name="实例属性"
   }
   say(){}
}
Box.prop1="静态属性1";
Box.prop2="静态属性2";
console.log(Box.prop1,Box.prop2);//静态属性1  静态属性2

var obj=new Box();
obj.prop1;//undefined
```







> 参考转自：
>
> [es6中class类的全方面理解（一）](https://www.jianshu.com/p/86267fab4878)
>
> [es6中class类的全方面理解（二）------继承](https://www.jianshu.com/p/0aa8c9c52f38)
>
> [es6中class类的全方面理解（三）------静态方法](https://www.jianshu.com/p/5585412b4575)

