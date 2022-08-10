---
title: 面向对象
tags:
  - JavaScript
categories:
  - JavaScript
---

## 一、概念

**什么是对象**：

+ 现实生活中：万物皆对象，对象是一个具体的事物，一个具体的事物就会有行为和特征。
+ **JS中的对象：**键值对，带有**属性**和**方法**的特殊数据类型。

**编程思想**：

+ 面向过程：所有的事情都是亲力亲为，注重的是过程
+ 面向对象：提出需求,找对象，对象解决，注重的是结果

**面向对象的特性**：

+ 封装：就是包装，把一些重用的内容进行包装，在需要的时候，直接使用。如属性、方法放在一个对象中。
+  继承：类与类之间的关系，是基于原型。如，子类可使用父类中方法
+ 多态：同一个行为，针对不同的对象，产生了不同的效果

## 二、创建对象方式

**方式一：new Object()**

```js
var person = new Object();
person.name = 'lisi';
person.age = 35;
person.job = 'actor';
person.sayHi = function(){
  console.log('Hello,everyBody');
}
```

**方式二：对象字面量**

```js
var person = {
  name: 'zs',
  age: 18,
  sex: true,
  sayHi: function () {
    console.log(this.name);
  }
};   
```

**方式三：工厂函数**。无法识别对象类型。（瞎理解：工厂函数创建的对象都是的Object的实例。构造函数里面，构造出来的函数不仅是Object的实例，也是构造函数的实例。）

```js
function createPerson(name, age, job) {
  var person = new Object();
  person.name = name;
  person.age = age;
  person.job = job;
  person.sayHi = function(){
    console.log('Hello,everyBody');
  }
  return person;
}
var p1 = createPerson('张三', 22, 'actor');

console.log(p1 instanceof createPerson) //false
console.log(p1 instanceof Object) //true
```

**方式四：自定义构造函数**

```js
function Person(name,age,job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayHi = function(){
  	console.log('Hello,everyBody');
  }
}
var p1 = new Person('张三', 22, 'actor');
```

## 三、**操作对象**

+ 遍历，for...in

```
var obj = {name:'hjj',age:'18'};
for(var key in obj) {
  console.log(key + "==" + obj[key]);
}
```

+ 删除对象

```js
delete obj.name;
```

## 四、构造函数

+ 是一种特殊的函数。主要用来在创建对象时初始化对象。
+ 构造函数用于创建一一类对象，首字母要大写。
+ 构造函数要和new一起使用才有意义。
+ **好处**：代码的简洁性，识别对象的具体类型。

### 4.1.new关键字

**new在执行时会做四件事情：**

+ 在内存中创建一个新的空对象
+ 让this指向这个新的对象
+ 执行构造函数。目的：给这个新对象加属性和方法
+ new会返回这个新对象

### 4.2.和实例对象的关系

**constructor 属性：**

+ 每一个实例对象中的\__proto\__中同时有一个 `constructor` 属性，该属性指向创建该实例的构造函数。
+ 可用来标识对象类型。

```js
console.log(p1.constructor) // => 返回构造函数本身
console.log(p1.constructor === Person) // => true
//instanceof操作符,检测对象的类型更可靠
console.log(p1 instanceof Person) // => true
```

**总结：**

- 构造函数是根据具体的事物抽象出来的抽象模板
- 实例对象是根据抽象的构造函数模板得到的具体实例对象
- 每一个实例对象都具有一个 `constructor` 属性，指向创建该实例的构造函数。
  + 注：`constructor` 是实例的属性的说法不严谨
- 可以通过实例的 `constructor` 属性判断实例和构造函数之间的关系
  + 注：这种方式不严谨，推荐使用 `instanceof` 操作符

==注：==constructor属性，是构造函数中`prototype`属性的成员，指向 `prototype` 对象所在函数(构造函数)。实例对象中有`__proto__`属性，是个对象，会指向构造函数中prototype对象。所以实例对象也接继承了原型对象的成员constructor属性。（具体内容见原型）

```
实例对象.__proto__===构造函数.prototype
```

### 4.3.问题

+ 浪费内存

```js
function Person (name, age) {
  this.name = name
  this.age = age
  this.type = 'human'
  this.sayHello = function () {
    console.log('hello ' + this.name)
  }
}

var p1 = new Person('lpz', 18)
var p2 = new Person('Jack', 16)
/*
1、每一个实例对象，`type` 和 `sayHello` 都是一模一样的内容，
2、每一次生成一个实例，都必须为重复的内容，多占用一些内存，如果实例对象很多，会造成极大的内存浪费。
*/
console.log(p1.sayHello === p2.sayHello) // => false
```



## 五、原型

+ 实例对象中有**`__proto__`**属性，叫原型，是一个对象，是给浏览器使用，不是标准的属性----->可以叫原型对象
+ 任意函数中 **`prototype`**属性，叫原型，是一个对象，是给程序员使用，是标准的属性---->可以叫原型对象。
+ 函数也是对象，所以也有`__proto__`属性

 ### 5.1.prototype

+ 每一个构造函数都有一个 `prototype` 属性，是一个对象。
+  `prototype`对象的所有属性和方法，都会被构造函数的实例继承。
+ 所有对象实例需要共享的属性和方法，直接定义在 `prototype` 对象上。

```js
function Person (name, age) {
  this.name = name
  this.age = age
}
console.log(Person.prototype)

Person.prototype.type = 'human'
Person.prototype.sayName = function () {
  console.log(this.name)
}
var p1 = new Person('lpz', 18)
var p2 = new Person('Jack', 16)

console.log(p1.sayName === p2.sayName) // => true
//这时所有实例的 `type` 属性和 `sayName()` 方法，
//其实都是同一个内存地址，指向 `prototype` 对象，因此就提高了运行效率。
```

### 5.2.构造函数、实例、原型三者之间的关系

![](./img/构造函数-实例-原型之间的关系.png)

**1、任何函数中有 `prototype` 属性，是一个对象。**

```js
function F () {}
console.log(F.prototype) // => object
F.prototype.sayHi = function () {
  console.log('hi!')
}
```

**2、构造函数的 `prototype` 对象默认都有一个 `constructor` 属性，指向 `prototype` 对象所在函数。**

```js
console.log(F.constructor === F) // => true
console.log(F.prototype.constructor === F) // => true
```

**3、实例对象中有`__proto__`属性，是一个对象，指向构造函数的 `prototype` 对象。**

```js
var instance = new F()
console.log(instance.__proto__ === F.prototype) // => true
console.log(F.__proto__===Function.prototype) // => true
//构造函数也是对象，所以也有`__proto__`属性
```

**4、实例对象可以直接或间接继承了原型对象成员。**

```js
instance.sayHi() // => hi!
```



### 5.3.原型链

> 原型链是一种关系,实例对象和原型对象之间的关系,关系是通过原型(`__proto__`)来联系的

**属性成员的搜索原则：原型链**

+ 实例对象使用属性或方法时，先在**实例本身**中查找，找到了则直接使用
+ 找不到，则沿着原型链向上查找，（去实例对象的`__proto__`指向的**原型对象`prototype`**中找），找到了则使用。
+ 如果一直到原型链的末端还没有找到，则返回 `undefined`

### 5.4.原型语法

+ `Person.prototype` 重置到了一个新的对象。添加成员更简单。但是丢失了`constructor` 成员
+ 为了保持 `constructor` 的指向正确。需手动添加。

```js
function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype = {
  constructor: Person, // => 手动将 constructor 指向正确的构造函数
  type: 'human',
  sayHello: function () {
    console.log('我叫' + this.name + '，我今年' + this.age + '岁了')
  }
}
```

### 5.5.使用建议

- 私有成员（一般就是非函数成员）放到构造函数中
- 共享成员（一般就是函数）放到原型对象中
- 如果重置了 `prototype` 记得修正 `constructor` 的指向
- 通过实例对象不改变原型对象中的属性值。

## 六、继承

### 6.1.原型继承

+ 改变原型指向，数据共享，实现的继承

```js
function Person(name,age) {
    this.name=name;
    this.age=age;
}
Person.prototype.eat=function () {
    console.log(this.name+"人可以吃东西");
};

function Student(score) {
    this.score=score;
}
//改变学生的原型的指向即可==========>学生和人已经发生关系
Student.prototype=new Person("小明",10);
Student.prototype.study=function () {
    console.log("学习很累很累的哦.");
};


var stu=new Student(100);
console.log(stu.name, stu.age,stu.score)//小明 10 100
stu.eat()//小明人可以吃东西


var stu2=new Student(200);
console.log(stu2.name, stu2.age,stu2.score)//小明 10 200
stu2.eat();//小明人可以吃东西
stu2.name="小红";
console.log(stu2.name, stu2.age,stu2.score)//小红 10 200
```

+ **缺陷：**直接初始化了属性，继承过来的属性的值都是一样的。只能重新调用对象的属性进行重新赋值。

+ **解决方案：**继承的时候,不用改变原型的指向，直接调用父级的构造函数的方式来为属性赋值就可以了。借用构造函数：把要继承的父级的构造函数拿过来,使用一下就可以了。

### 6.2.借用构造函数

+ call()、apply()、bind() 

```js
function Person (name, age) {
  this.type = 'human'
  this.name = name
  this.age = age
  console.log(this)  
}

function Student (name, age,scroe) {
    this.scroe=scroe
  // 借用构造函数继承Person属性成员。。
  //这里的this:把Student这个构造函数里面的this指向,替换到Person的this指向中
  Person.call(this, name, age)
}
var stu =new Student('小明', 18,100)
console.log(stu.type, stu.name, stu.age,stu.scroe) // human 小明 18 100
var stu2=new Student('张三', 20,200)
console.log(stu2.type, stu2.name, stu2.age,stu2.scroe) // human 张三 20 200
```

### 6.3.组合继承

+ 原型继承+借用构造函数继承

```js
function Person(name,age) {
    this.type = 'human'
    this.name=name;
    this.age=age;
}
Person.prototype.sayHi=function () {
    console.log("hello");
};
function Student(name,age,score) {
    //借用构造函数:属性值重复的问题
    Person.call(this,name,age);
    this.score=score;
}

//改变原型指向----继承
Student.prototype=new Person();//不传值
Student.prototype.eat=function () {
    console.log(this.name+"吃东西");
};
var stu=new Student("小黑",20,"100分");
console.log(stu.type,stu.name,stu.age,stu.score);//human 小黑 20 100分
stu.sayHi();//hello
stu.eat();//小黑吃东西
var stu2=new Student("小黑黑",200,"1010分");
console.log(stu2.type,stu2.name,stu2.age,stu2.score);//human 小黑黑 200 1010分
stu2.sayHi();//hello
stu2.eat();//小黑黑吃东西
```



### 6.4.拷贝继承

+ 把一个对象中的属性或者方法直接复制到另一个对象中

```js
function Person (name, age) {
  this.type = 'human'
  this.name = name
  this.age = age
}

Person.prototype.sayName = function () {
  console.log('hello ' + this.name)
}

function Student (name, age) {
  Person.call(this, name, age)
}

// 原型对象拷贝继承原型对象成员
for(var key in Person.prototype) {
  Student.prototype[key] = Person.prototype[key]
}

var s1 =new Student('张三', 18)

s1.sayName() // => hello 张三
```

## 七、Objece

相关用法可查看[MDN](https://developer.mozilla.org/zh-CN/)

### 静态成员

> 静态成员：由**构造函数直接访问**到的属性和方法。

+ **Object.create**(proto, propertiesObject)：创建一个新对象，使用现有的对象来提供新创建的对象的`__proto_`。**返回一个新对象**，带着指定的原型对象和属性。

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

+ **Object.assign**(target, source_1, ···)：用于将源对象的所有可枚举属性复制到目标对象中。**返回新对象**。属于浅拷贝。

```js
let target = {a: 1};
let object2 = {b: 2};
let object3 = {c: 3};
Object.assign(target,object2,object3);  
// 第一个参数是目标对象，后面的参数是源对象
console.log(target);  // {a: 1, b: 2, c: 3}

Object.assign([2,3], [5]);  // [5,3]。。==>[2,3]=>{0:2,1:3}=>属性复制
```

- **Object.keys**(obj)：返回值是一个数组。

```js
let person = {name:"张三",age:25,getName:function(){}}
Object.keys(person) // ["name", "age","getName"]

let arr=['a','b',33]
Object.keys(arr) // ['0', '1', '2']

let str='abcdef'
Object.keys(str) // ['0', '1', '2', '3', '4', '5']
```

- **Object.definedProperties**(obj,props)：直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

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
```

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

+ **Object.getOwnPropertyNames**()：方法返回对象的所有自身属性的属性名。不包括Symbol值作为名称的属性。

```js
let person = {name:"张三",age:25,getName:function(){},[Symbol()]:"zs"}
Object.getOwnPropertyNames(person) // ["name", "age","getName"]

```

### 实例成员

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



