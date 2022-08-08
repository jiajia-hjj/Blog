



Reflect 对象不是构造函数数，所以创建时不是用new来进行创建。

ES6 中增加这个对象的目的：

+ 通过Reflect 对象可以拿到语言内部的方法：
  + 将 Objeot 对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到 Refleat对象上。
  + 现阶段，某些方法同时在 Objiect 和Reflect 对象上部署，未来的新方法将只部署在Reflect 对象上。

+ 修改某些 Object 方法的返回结果，让其变得更合理。
  + 比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返false。

让Object 操作都变成函数行为。某些 Object 操作是命令式，比如
name in obj fl
delete
obilname]
-
而
Reflect.has(obj,
name） 和
Reflect.deletePropertyobj,name)让它们变成了
函数行为。
•Retleot 对象的方法与 Proxy 对象的方法一一对
应，只要是 Proxy 对象的方法，就能在 Refleot
对象上找到对应的方法。这就让Proxy 对象可以
方便地调用对应的 Renlect 方法，完成默认行
为，作为修改行为的基础。也就是说，不管
Proxy 怎么修改默认行为，你总可以在 Reflect
上获取默认行为。



**defineProperty**

```js
//老写法
try{
	Object.defineProperty(target, property, attributes)
    //success
} catch(e){
    //failure
}
//新写法
if (Reflect.defineProperty(target, property, attributes)) {
    //success
}else{
    //failure

}
```

 **判断对象是否有某个属性**

```js
let obj ={a:1,b:2}
console.log('a' in obj === Reflect.has(obj, 'a'))//true
```

**用于删除对象的属性**

```js
const myObj = {foo: 'bar'};
//旧写法
delete myObj.foo;
//新写法
Reflect.deleteProperty(myObj, 'foo');
```



Reflect对象的静态方法13个

```js
var myObject = {
    foo:1,
    bar:2,
    get baz(){
        return this.foo + this.bar;
   }
}
//1、获取读取属性
console.log(Reflect.get(myObject, 'bar'))//如果第一个参数不是对象则会报错
```



```js
var obj = {
    foo:4,
    set bar (value){
       return this.foo = value;
    }
}
var myReceiverObject = {
    foo:0
}
//Reflect.set(obj,'bar', 1);//obj=>{foo:1}
Reflect.set(obj,'bar', 1, myReceiverObject);
console.log(obj.foo)//4
console.log(myReceiverObject.foo)//1
```



Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。

Reflect.setPrototypeOf方法用于设置对象的`__proto__`属性，返回第一个参数对象，对应Object

```js
//旧写法
Object.setPrototypeOf(myObj, OtherThing.prototype);
// 新写法
Reflect.setPrototypeOf(myObj, OtherThing.prototype);
```





//new 的写法

```js
const instance = new Greeting('张三');

Reflect.deleteProperty(myObj, 'foo');

Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。

Reflect.getPrototypeOf(obj)

const myObj = new FancyThing();

旧写法

Object.getPrototypeOf(myObj) === FancyThing.prototype;

新写法

Reflect.getPrototypeOf(myObj) === FancyThing.prototype;

Reflect.setPrototypeOf(obj, newProto)

Reflect.setPrototypeOf方法用于设置对象的__proto__属性，返回第一个参数对象，对应Object.setPrototypeOf(obj, newProto)。

const myObj = new FancyThing();

旧写法

Object.setPrototypeOf(myObj, OtherThing.prototype);

新写法

Reflect.setPrototypeOf(myObj, OtherThing.prototype);

如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。

如果第一个参数不是对象

Reflect.getPrototypeOf(1);// 报错

Object.getPrototypeOf(1); //1

Reflect.setPrototypeOf(1, {})//TypeError: Reflect.setPrototypeOf called on non-object

Object.setPrototypeOf(1, {}) //1

如果第一个参数是undefind或者是null  两者都会报错

Object.setPrototypeOf(null, {}) //// TypeError: Object.setPrototypeOf called on null or undefined

Reflect.setPrototypeOf(null,{})//// TypeError: Reflect.setPrototypeOf called on non-object

Reflect.apply(func, thisArg, args)

Reflect.apply方法等同于 Function.prototype.apply.call(func, thisArg, args),采用Reflect对象可以简化这种操作。

const ages = [11,33, 12, 54, 18, 96];

var obj = {}

//旧写法

const youngest = Math.min.apply(obj, ages);

const oldest = Math.max.apply(obj, ages);

const type = Object.prototype.toString.call(youngest);

console.log(type)

//新写法

const youngest = Reflect.apply(Math.min, Math, ages);

const oldest = Reflect.apply(Math.max, Math, ages);

const type = Reflect.apply(Object.prototype.toString, youngest, [])

Reflect.defineProperty  用来定义对象的属性 Reflect.defineProperty(target, propertyKey, attributes)

function myDate(){

}
```







```js

Proxy(target, {

    set:function(target, name, value, receiver){

        var success = Reflect.set(target, name, value, receiver)

        if (success) {


            // log('')

            // }

            // }

            // })

            // Reflect对象的静态方法13个

            //1.

            //var myObject = {

            // foo:1,

            // bar:2,

            // get baz(){

            // return this.foo + this.bar;

            // }

            //}

            //console.log(Reflect.get(myObject, 'baz'))////如果第一个参数不是对象则会报错

            ////2.

            //var obj = {

            // foo:4,

            // set bar (value){

            // return this.foo = value;

            // }

            //}

            //var myReceiverObject = {

            // foo:0

            //}

            //Reflect.set(obj,'bar', 1, myReceiverObject);

            //obj.foo // 4

            //myReceiverObject.foo;//1

            ////注意，Reflect.set会触发Proxy.defineProperty拦截

            //letp = {

            // a:'a'

            //};

            //let handler = {

            // det(target, key, value, receiver){

            // console.log('set');

            // Reflect.set(target, key, value, receiver)

            // },

            // defineProperty(target,key, attributes){

            // console.log('deleteProperty');

            // Reflect.defineProperty(target, key, attributes)

            // }

            //}

            //let obj = new Proxy(p, handler);

            //obj.a = 'A';

            ////set

            //// defineProperxy

            //// 上面代码中，Proxy.set拦截中使用了Reflect.set，导致触发Proxy.defineP//roperty拦截。

            //var myObject = {

            // foo:1

            //}

            ////旧写法

            //'foo' in myObject // true

            // Reflect.deleteProperty(obj, name)用于删除对象的属性

            // const myObj = {foo: 'bar'};

            // delete myObj.foo;

            // console.log(myObj)

            //新写法

            //Reflect.deleteProperty(myObj, 'foo');

            //Reflect.construct(target, args)

            //function Greeting(name){

            // this.name = name;

            //}

            ////new 的写法

            //const instance = new Greeting('张三');

            //

            //Reflect.deleteProperty(myObj, 'foo');

            // Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。

            // Reflect.getPrototypeOf(obj)

            // const myObj = new FancyThing();

            //旧写法

            // Object.getPrototypeOf(myObj) === FancyThing.prototype;

            //新写法

            // Reflect.getPrototypeOf(myObj) === FancyThing.prototype;

            // Reflect.setPrototypeOf(obj, newProto)

            // Reflect.setPrototypeOf方法用于设置对象的__proto__属性，返回第一个参数对象，对应Object.setPrototypeOf(obj, newProto)。

            //const myObj = new FancyThing();

            // 旧写法

            //Object.setPrototypeOf(myObj, OtherThing.prototype);

            // 新写法

            //Reflect.setPrototypeOf(myObj, OtherThing.prototype);

            // 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。

            //如果第一个参数不是对象

            //Reflect.getPrototypeOf(1);// 报错

            //Object.getPrototypeOf(1); //1

            //Reflect.setPrototypeOf(1, {})//TypeError: Reflect.setPrototypeOf called on non-object

            //Object.setPrototypeOf(1, {}) //1

            //如果第一个参数是undefind或者是null  两者都会报错

            //Object.setPrototypeOf(null, {}) //// TypeError: Object.setPrototypeOf called on null or undefined

            //Reflect.setPrototypeOf(null,{})//// TypeError: Reflect.setPrototypeOf called on non-object

            //Reflect.apply(func, thisArg, args)

            // Reflect.apply方法等同于 Function.prototype.apply.call(func, thisArg, args),采用Reflect对象可以简化这种操作。

            //const ages = [11,33, 12, 54, 18, 96];

            //var obj = {}

            ////旧写法

            //const youngest = Math.min.apply(obj, ages);

            //const oldest = Math.max.apply(obj, ages);

            //const type = Object.prototype.toString.call(youngest);

            //console.log(type)

            ////新写法

            //const youngest = Reflect.apply(Math.min, Math, ages);

            //const oldest = Reflect.apply(Math.max, Math, ages);

            //const type = Reflect.apply(Object.prototype.toString, youngest, [])

            // Reflect.defineProperty  用来定义对象的属性 Reflect.defineProperty(target, propertyKey, attributes)

            // function myDate(){

            // }

            //旧写法

            // Object.defineProperty(myDate, 'now', {

            // value:()=>Date.now()

            // })

            //新写法17316382398

            // Reflect.defineProperty(myDate, 'now', {

            // value:()=>Date.now()

            // })

            // console.log(myDate.now())

            //注意如果第一个参数不是对象，就会抛出错误，比如

            // Reflect.defineProperty(1, 'foo')

            // Reflect.defineProperty(target, propertyKey, attributes)基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者

            // var myObject = {};

            // Object.defineProperty(myObject, 'hidden', {

            // value: true,

            // enumerable: true

            // })

            //旧写法

            // var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden')

            //新写法

            // var theDescriptor = Reflect.getOwnPropertyDescriptor('myObject', 'hidden')

            // Reflect.getOwnPropertyDescriptor和Object.getOwnPropertyDescriptor的一个区别是，如果第一个参数不是对象，Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误，表示参数非法。

            // Reflect.isExtensible(target) 方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可拓展

            // const myObj = {};

            //旧写法

            // Object.isExtensible(myObj)//true

            //新写法

            // Reflect.isExtensible(myObj)//true

            // 而：

            // 如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。

            // Object.isExtensible(1) // false

            // Reflect.isExtensible(1) // 报错

            // Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

            var obj = {};

            //旧写法

            Object.preventExtensions(obj);  //Object {}

            //新写法

            Reflect.preventExtensions(myObject)  //true

            //如果参数不是对象，Object.preventExtensions在 ES5 环境报错，在 ES6 环境返回传入的参数，而Reflect.preventExtensions会报错。

            // ES5 环境

            Object.preventExtensions(1) // 报错

            // ES6 环境

            Object.preventExtensions(1) // 1

            // 新写法

            Reflect.preventExtensions(1) // 报错

            // Reflect.ownkeys(target)方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。

            var myObject = {

                foo:1,

                bar:2,

                [Symbol.for('baz')]:3,

                [Symbol.for('bing')]:4

            };

            //旧写法

            Object.getOwnPropertyNames(myObject); //['foo', 'baz']

            Object.getOwnPropertySymbols(myObject);// //[Symbol.for('baz'), Symbol.for('bing')]

            //新写法

            Reflect.ownKeys(myObject);// ['foo', 'bar', Symbol.for('baz'), Symbol.for('bing')]

            //3.实例：使用Proxy实现观察者模式

            // 观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。

            const person = observable({

                name:'张三'，

                age:20

            })

            function print(){

                console.log(`${person.name}, ${person.age}`)

            }

            observe(print);

            person.name = '李四'

            //输出

            //李四， 20

            // 上面代码中，数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，print就会自动执行。

            // 下面，使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数。思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。

            const queueObserves = new set();

            const observe = fn =>queueObserves.add(fn);

            const observable = obj=>new Proxy(obj, {set});

            function set(target, key, value, receiver){

                const result = Reflect.set(target, key, value, receiver);

                queuedObservers.forEach(obsserver=> obsserver());

                return result;

            }

```

