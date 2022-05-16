---
title: JavaScript规范
tags:
  - 规范
categories:
  - 前端规范
---



> 标准中分成建议使用和校验(下面使用[0]代码建议使用，[1]代表校验)，建议使用并不会报错，校验会报错。

## 引用

- 对变量的声明不要使用var，如果是声明后不再重现分配的变量要使用const，如果是重现分配的变量要使用let [1]
- 注意let和const的块级作用域 [0]

## 对象

- 使用对象直接量创建对象 [1]

```
// bad
const item = new Object();
// good
const item = {};
```

- 如果一个对象的key值包含动态属性，要保证对象的所有属性都是在一个地方进行定义 [0]

```
function getKey(k) {
  return `a key named ${k}`;
}
// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;
// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
// 从上面的代码我们可以看出，这个建议的是要我们把与对象相关的属性，都在一个地方定义，便于维护
```

- 在定义方法时，使用简写的方式进行定义 [1]

```
// bad
const atom = {
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};
// good
const atom = {
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};
```

- 在定义对象属性时，如果key值和value值同名，要使用简写形式 [1]

```
const lukeSkywalker = 'Luke Skywalker';
// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};
// good
const obj = {
  lukeSkywalker,
};
```

- 在定义对象时，简写的属性和非简写的属性要按顺序写，不要混着写 [0]

```
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';
// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};
// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

- 在定义对象时，key值只有在无效识别时添加单引号 [1]

```
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};
// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```

- 不允许直接使用Object.prototype的相关方法，比如hasOwnProperty, propertyIsEnumerable, 和 isPrototypeOf.因为在定义对象时，有可能会覆盖了这些方法 [1]

```
const item = {
    name: 'rede',
};
// bad
console.log(item.hasOwnProperty('name'));
// good
console.log(Object.prototype.hasOwnProperty.call(item, 'name'));
// best
const has = Object.prototype.hasOwnProperty;
console.log(has.call(item, 'name'));
```

- 使用对象展开符浅复制对象，不要使用Object.assign [0]

```
// very bad
// 本意是复制一个对象，在从复制出的对象上删除某个值，但实际上原始对象的值也会被影响
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 });
delete copy.a;
// bad
// 可以达到预期目的，但在写法上可读性不好
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }
delete copy.a;
// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

## 数组

- 在定义数组时，使用数组直接量，不要使用new Array的形式 [1]

```
// bad
const items = new Array();
// good
const items = [];
```

- 在向数组添加元素时，不要直接赋值，通过push添加(注意指的是添加，并不包括修改的情况) [0]

```
const items = [];
// bad
items[items.length] = 'test';
// good
items.push('test');
```

- 复制数组时，使用展开操作符 [0]

```
const items = [1, 2, 4, 8, 16];
// bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items];
```

- 在把类数组对象转为数组对象时，使用展开操作符来替代Array.from [0]

```
const foo = document.querySelectorAll('.foo');
 
// good
const nodes = Array.from(foo);
 
// best
const nodes = [...foo];
```

- 使用Array.from代替展开操作符来处理针对数组的映射操作，可以避免操作创建中间数组 [0]

```
const foo = [1, 2, 3];
// bad
const baz = [...foo].map(x => x + x);
// good
const baz = Array.from(foo, x => x + x);
```

- 数组的某些方法会存在回调函数，eslint会强制回调函数使用return，不过airbnb的规范中认为，如果某些数组的回调只是单条语句的那种，是可以省略return的 [0]

> 主要是一些可以对数组进行迭代的方法，比如every,filter,find,findIndex,map,reduce,some,sort

```
// airbnb同样标记这种写法为good
[1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
});
// 下面的写法也是good，两种写法都没有问题，不过可能下面这种更易读些
[1, 2, 3].map(x => (x + 1)*x)
```

- 如果数组有多行，在数组的中括号前后要进行换行 [0]

```
// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];
const numberInArray = [
    1, 2,
];
// good
const arr = [[0, 1], [2, 3], [4, 5]];
const numberInArray = [
    1, 
    2,
];
```

## 解构

- 优先使用对象解构来访问对象属性 [1]

```
// bad
function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;
    return `${firstName} ${lastName}`;
}
// good
function getFullName(user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
}
// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

- 优先使用数组解构从数组索引创建变量 [0]

```
const arr = [1, 2, 3, 4];
// bad
const first = arr[0];
const second = arr[1];
// good
const [first, second] = arr;
```

- 用对象解构去处理多个返回值 [1]

```
// 
const input = {
    left: '0px', right: '0px', top: '0px', bottom: '0px',
};
// bad
function processInput(input) {
    const left = input.left;
    const right = input.right;
    const top = input.top;
    const bottom = input.bottom;
    return [left, right, top, bottom];
}
const [left, __, top] = processInput(input);
// good
function processInput({
    left, right, top, bottom,
}) {
    return {
        left, right, top, bottom,
    };
}
const { left, top } = processInput(input);
```

## 字符串

- 字符串使用单引号 [1]

```
// bad
const name = "Capt. Janeway";
// bad
const name = `Capt. Janeway`;
// good
const name = 'Capt. Janeway';
```

- 当字符串过长时，不要使用字符串连接符写成多行 [1][0]

```
// bad
// 此时报的检查错误是no-multi-str，保证字符串不分两行书写
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';
// bad
// 此时运行代码检查并不会报错，针对这种写法应该是建议不要这么写
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';
    
// good
// 要是感觉代码过长不方便看时，可以在编译器上做相关设置，设置自动换行
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
```

- 当字符串和变量要进行连接时，要使用模版字面量 [1]

```
// bad
function sayHi(name) {
    return 'How are you, ' + name + '?';
}
// bad
// 检查的错误template-curly-spacing，禁止模版字符串前后使用空格
function sayHi(name) {
  return `How are you, ${ name }?`;
}
// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

- 针对字符串不要使用eval [1]
- 在字符串中只在有意义的地方使用转义字符 [1]

```
// bad
const foo = '\'this\' is \"quoted\"';
// good
const foo = '\'this\' is "quoted"';
```

## 函数

- 在定义函数时，使用指定名词的函数表达式，而不是匿名表达式 [0]

```
// bad 
function add (a, b) {
    return a + b;
}
// bad 
const add = function (a, b) {
    return a + b;
}
// good 
const add = function myAdd (a, b) {
    return a + b;
}
```

- 立即执行函数要用大括号包裹起来 [1]

```
// bad
const x = function () { return { y: 1 };}()
...
// not bad
// 随着现在模块的普及立即执行函数使用的应该不多了
const x = (function () { return { y: 1 }; }());
```

- 禁止循环中出现函数，如果需要在循环中定义函数，最好把相关函数使用变量定义好再使用，避免形成闭包 [0]

```
// bad
// 下面循环中如果把i的定义换成var，那就会形成一个最经典的闭包问题，数组funcs所有的返回值都是10，使用let会避免这个问题
const funcs = [];
for (let i = 0; i < 10; i + 1) {
    funcs[i] = function () {
        return i;
    };
}
...
// 如果使用babel转上面的代码
// 在这里可以看出babel进行转换时会按这规则，把本来定义的函数提取出来单独定义成一个变量，再进行使用
"use strict";
var funcs = [];
var _loop = function _loop(i) {
    funcs[i] = function () {
        return i;
    };
};
for (var i = 0; i < 10; i + 1) {
    _loop(i);
}
// not bad
const funcs = [];
const printI = function printI(i) {
    return i;
};
for (let i = 0; i < 10; i + 1) {
    funcs[i] = printI(i);
}
...
// babel转码后为
// 转码前后其实变化不大
"use strict";
var funcs = [];
var printI = function printI(i) {
    return i;
};
for (var i = 0; i < 10; i + 1) {
    funcs[i] = printI(i);
}
```

- 禁止在代码块中使用函数声明，不过可以使用函数表达式 [1]

```
// bad
const currentUser = true;
if (currentUser) {
    function test() {
        console.log('Nope.');
    }
}
// good 
const currentUser = true;
let test;
if (currentUser) {
    test = () => {
        console.log('Nope.');
    };
}
```

- 函数接收的形参不可以使用argumenst [1]

```
// bad 
function foo(name, options, arguments) {
  // ...
}
```

- 函数内部不要使用使用arguments来替代获取形参，可以使用rest参数获取多余参数 [1]

```
//bad
function concatenateAll() {
    const args = Array.prototype.slice.call(arguments);
    return args.join('');
}
// good
function concatenateAll(...args) {
    return args.join('');
}
```

- 使用默认参数语法，不要去使用存在变化的函数参数 [1]

```
// bad
// 这个会报no-param-reassign，禁止对 function 的参数进行重新赋值
function handleThings(opts) {
    opts = opts || {};
    ...
}
// bad
// 报的错误同上
function handleThings(opts) {
    if (opts === 0) {
        opts = {};
    }
}
// good
function handleThings(opts = {}) {
    // ...
}
```

- 避免对函数默认参数进行不可预期的操作 [1]

```
// bad
// 检查时会报no-plusplus，禁用++
// 这个例子应该是要说明，不对默认参数设置不确定的因素，就比如这里的b值，两次调用返回值都不同，会令人费解
let b = 1;
function count(a = b++) {
    console.log(a);
}
count(); // 1
count(); // 2
```

- 始终将默认参数，放到最后 [0]

```
// bad
function handleThings(opts = {}, name) {
    return { opts, name };
}
// good
function handleThings(name, opts = {}) {
    return { opts, name };
}
```

- 禁用Function构造函数创建函数 [1]

```
// bad
const x = new Function('a', 'b', 'return a + b');
// good
const x = function backAdd(a, b) {
    return a + b;
};
```

- 强制在函数圆括号前和代码块之前使用统一的空格 [1]

```
// bad
const f = function(){};
const g = function (){};
const h = function() {};
// good
const f = function () {};
const g = function () {};
const h = function () {};
```

- 禁止对函数参数再赋值 [1]

```
// bad
// 怎么都想不到为什么要对参数进行赋值，报错为no-param-reassign
function foo(bar) {
    bar = 13;
}
...
// bad
function foo(bar) {
    bar.name = 'foo';
}
```

- 在函数括号内使用一致的换行，如果是多行会要求最后一项带逗号 [1]

```
// normal
// 不使用换行
function foo(bar, baz, quux) {
// ...
}
// bad
// 会报function-paren-newline要求使用一致的换行
function foo(bar, 
    baz, 
    quux) {
// ...
}
// good
// 最后一行添加了逗号
function foo(
    bar,
    baz,
    quux,
) {
// ...
}
```

## 箭头函数

- 当必须使用匿名函数时(比如回调函数)，可以使用箭头函数 [1]

```
// bad
[1, 2, 3].map(function (x) {
    const y = x + 1;
    return x * y;
}); 
// good
[1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
});
```

- 如果回调函数只是简单的单行语句，可以省略return [0]

```
// good
[1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
});
// good，提高可读性
[1, 2, 3].map(x => (x + 1) * x)
```

- 如果表达式垮多行，将其包裹在括号中，可以提高代码的可读性 [0]

```
// not good
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
));
// good
['get', 'post', 'put'].map(httpMethod => (
    Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
    )
));
```

- 箭头函数体只有一个参数时且不使用大括号，可以省略圆括号。其它任何情况，参数都应被圆括号括起来 [0]

```
// bad
// arrow-parens
[1, 2, 3].map((x) => x * x);
// good
[1, 2, 3].map(x => x * x);
// bad
// 因为此时使用了大括号，箭头函数后面跟随了代码块
[1, 2, 3].map(x => {
    const y = x + 1;
    return x * y;
});
```

- 禁止在可能与比较操作符相混淆的地方使用箭头函数 [1]

```
// bad
// 此时的箭头符号和比较符号看起来很像
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;
// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);
// good
const itemHeight = (item) => {
    const { height, largeSize, smallSize } = item;
    return height > 256 ? largeSize : smallSize;
};
```

## 类和构造函数

- 总是使用class，避免使用prototype [0]

```
// bad
function Queue(contents = []) {
    this.queue = [...contents];
}
Queue.prototype.pop = function () {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
};
// good
class Queue {
    constructor(contents = []) {
        this.queue = [...contents];
    }
    pop() {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
    }
}
```

- 对类的继承使用extends [1]

```
// good
// 这种写法简单明了
class student {
    constructor({ id } = {}) {
        this.name = `stu-${id}`;
    }
    backName() {
        return this.name;
    }
}
class classmates extends student {
    constructor({ id } = {}) {
        super({ id });
        this.id = id;
    }
    id() {
        return this.id;
    }
}
```

- 方法可以返回this来进行链式调用 [0]

```
// normal
class student {
    constructor({ id } = {}) {
        this.name = `stu-${id}`;
    }
    setAge({ age } = {}) {
        this.age = age;
    }
    setGender({ gender } = {}) {
        this.gender = gender;
    }
    backName() {
        return this.name;
    }
    backInfo() {
        return `name: ${this.name}, age: ${this.age}, gender: ${this.gender}`;
    }
}
const stu = new student({id: 2333});
stu.setAge({age: 18});
stu.setGender({gender: 'man'});
stu.backInfo();
// good
class student {
    constructor({ id } = {}) {
        this.name = `stu-${id}`;
    }
    setAge({ age } = {}) {
        this.age = age;
        return this;
    }
    setGender({ gender } = {}) {
        this.gender = gender;
        return this;
    }
    backName() {
        return this.name;
    }
    backInfo() {
        return `name: ${this.name}, age: ${this.age}, gender: ${this.gender}`;
    }
}
const stu = new student({id: 2333});
stu.setAge({age: 18}).setGender({gender: 'man'});
stu.backInfo();
```

- 定义类时可以定义一个toString方法，只要保证该方法不会产生意外的副作用 [0]

```
class student {
    constructor({ id } = {}) {
        this.name = `stu-${id}`;
    }
    setAge({ age } = {}) {
        this.age = age;
        return this;
    }
    setGender({ gender } = {}) {
        this.gender = gender;
        return this;
    }
    backName() {
        return this.name;
    }
    backInfo() {
        return `name: ${this.name}, age: ${this.age}, gender: ${this.gender}`;
    }
    toString() {
        return this.backName();
    }
}
```

- 如果构造函数只是一个空的构造函数或只是简单的调用父类，此时构造函数可以省略 [1]

```
// bad
// 因为此时构造函数constructor没有任何作用，此时没必要设置
class Jedi {
    constructor() {}
    getName() {
        return this.name;
    }
}
// bad
// 此时只是透传数据，没必要使用构造函数
class Rey extends Jedi {
    constructor(...args) {
        super(...args);
    }
}
// godd
class Rey extends Jedi {
    constructor(...args) {
        super(...args);
        this.name = 'Rey';
    }
}
```

- 类的成员禁止重名 [1]

```
// bad
// 很明显下面的bar会覆盖上面的bar方法
class Foo {
    bar() { return 1; }
    bar() { return 2; }
}
```

## 模块

- 使用模块import／export输入输出代码块 [1]
- 使用import时，不要使用通配符，最好明确要导入的代码块 [0]

```
// 另外一个模块文件，比如是index.js
export const firstName = 'rede';
export const lastName = 'li';
// 引用该模块
// bad
// 按webpack 4+以上的版本会静态分析index.js只导入需要的代码块，所以明确导入的代码块会更有利于减少打包体积
import * as index from './index';
console.log(index.firstName);
// best
// 原例子上还提到了一个good的写法，不过看了下，感觉这种写法最好，结合编译器，还能减小文件代码
import { firstName } from './index';
console.log(firstName);
```

- 不要从import中直接导出(export) [0]

```
// bad
export { firstName as default } from './index';
// good
// 这样更加明晰
import { firstName } from './index';
export default firstName;
```

- 同一个路径的导入只在一个地方导入，禁止重复导入 [1]

```
// bad
import { firstName } from './index';
import { lastName } from './index';
export default { firstName, lastName };
// good
import { firstName, lastName } from './index';
export default { firstName, lastName };
```

- 不要export可变绑定 [1]

```
// bad
let foo = 3;
export { foo };
// good
const foo = 3;
export { foo };
```

- 如果一个文件只导出一个模块，默认export优于命名export [1]

```
// bad
const foo = 3;
export { foo };
// good
const foo = 3;
export default { foo };
```

- 将所有import导入放在非导入语句上面 [1]

```
// bad
import { firstName, lastName, backName } from './index';
backName();
import { name } from './test';
export default { firstName, lastName, name };
// good
import { firstName, lastName, backName } from './index';
import { name } from './test';
backName();
export default { firstName, lastName, name };
```

- 多行导入应该像多行数组那样进行缩进 [0]

```
// bad
import { firstName, lastName, year } from './main';
export { firstName, lastName, year };
// good
import {
    firstName,
    lastName,
    year,
} from './main';
export { firstName, lastName, year };
```

- 禁止在模块的import中使用Webpack加载语法 [1]

```
// bad
import fooSass from 'css!sass!foo.scss';
// good
import fooSass from 'foo.scss';
```

## 迭代器(Iterators)和生成器(Generators)

- 不要使用iterators，请使用高阶函数，例如map、reduce而不是for-in、for-of这样的循环 [1]

```
// bad
// no-restricted-syntax这个检查是禁用了特定语法
const numbers = [1, 2, 3, 4, 5];
let sum = 0;
for (const num of numbers) {
    sum += num;
}
export default { sum };
// good
const numbers = [1, 2, 3, 4, 5];
let sum = 0;
numbers.forEach((num) => {
    sum += num;
});
export default { sum };
// best
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, num) => total + num, 0);
export default { sum };
// bad
// 此时检查并不会报错，只是语法建议，不过和下面的good、best进行比较，best写法更加明晰
const numbers = [1, 2, 3, 4, 5];
const increasedByOne = [];
for (let i = 0; i < numbers.length; i + 1) {
    increasedByOne.push(numbers[i] + 1);
}
export default { increasedByOne };
// good
const numbers = [1, 2, 3, 4, 5];
const increasedByOne = [];
numbers.forEach((num) => {
    increasedByOne.push(num + 1);
});
export default { increasedByOne };
// best
const numbers = [1, 2, 3, 4, 5];
const increasedByOne = numbers.map(num => num + 1);
export default { increasedByOne };
```

- 现在不要使用generators(生成器) [0]

```
// 下面的代码来源阮一峰老师的《ECMAScript 6 入门》的Generator 函数的语法，在浏览器中运行是可以正常运行的，但按照建议规范的建议是因为现在还没有好的方式转为ES5,所以不建议使用
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
const hw = helloWorldGenerator();
export default { hw };
```

- 如果使用了generators，function*是定义generators的专用语法，不可以把function和*分开写 [1]

## 属性

- 使用点语法来访问对象属性 [1]

```
// bad
const luke = {
    jedi: true,
    age: 28,
};
const isJedi = luke['jedi'];
export default { isJedi };
// good
const luke = {
    jedi: true,
    age: 28,
};
const isJedi = luke.jedi;
export default { isJedi };
```

- 当通过变量访问属性时要使用中括号 [0]

```
const luke = {
    jedi: true,
    age: 28,
};
 
function getProp(prop) {
    return luke[prop];
}
 
const isJedi = getProp('jedi');
export default { isJedi };
```

- 求幂运算使用求幂运算符 [1]

```
// bad
const binary = Math.pow(2, 10);
// good
const binary = 2 ** 10;
```

## 变量

- 总是使用const或let声明变量，避免全局变量污染 [1]
- 每个便利在声明时，都要使用const或let [1]

```
// bad
const items = 'rede',
    goSportsTeam = true,
    dragonball = 'z';
export { items, goSportsTeam, dragonball };
// good
const items = 'rede';
const goSportsTeam = true;
const dragonball = 'z';
export { items, goSportsTeam, dragonball };
```

- 将所有的const和let的定义分组 [0]

```
// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;
// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

- 在需要的地方再对变量进行分配 [0]

```
// bad
// 这里的checkName中name会调用getName函数，但是name并不是总会返回，如果hasName为test时，并不会返回，所以，应该把对name的定义延后
const getName = function backName() {
    return 'rede';
};
function checkName(hasName) {
    const name = getName();
    if (hasName === 'test') {
        return false;
    }
    return name;
}
// good
const getName = function backName() {
    return 'rede';
};
function checkName(hasName) {
    if (hasName === 'test') {
        return false;
    }
    const name = getName();
    return name;
}
```

- 禁止使用连续赋值 [1]

```
// bad
const a = b = c = 1;
// good
const a = 1;
const b = a;
const c = a;
```

- 避免使用++或--运算符 [1]

```
// bad
let num = 1;
num++;
--num;
// good
let num = 1;
num += 1;
num -= 1;
```

- 在=号前后要避免进行换行，如果变量名超过最长限制，要统一换行方式 [0]

```
// bad
// 此时的换行是没有必要的
const foo
  = 'superLongLongLongLongLongLongLongLongString';
// good
const foo = 'superLongLongLongLongLongLongLongLongString';  
// bad
const foo =
  superLongLongLongLongLongLongLongLongFunctionName();
// good
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
);
```

## 变量提升

- var声明会被提升至他们作用域的顶部，但相应的赋值不会提升，let和const的声明并不会提升，因为其形成了一个暂时性死区

```
(function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
})()  
...
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}
```

- 匿名函数表达式的变量也会被提升，但函数体不会被提升

```
function example() {
    console.log(anonymous); // => undefined
 
    anonymous(); // => TypeError anonymous is not a function 输入错误，anonymous 不是一个函数
 
    var anonymous = function () {
    console.log('anonymous function expression');
    };
}
```

- 命名的函数表达式变量也会被提升，但函数体不会被提升

```
function example() {
    console.log(named); // => undefined
 
    named(); // => TypeError named is not a function，输入错误，named 不是一个函数
 
    superPower(); // => ReferenceError superPower is not defined， ReferenceError（引用错误）superPower 未定义
    
    var named = function superPower() {
        console.log('Flying');
    };
}
```

- 函数声明的名词和函数体都会被提升

```
function example() {
    superPower(); // => Flying
 
    function superPower() {
    console.log('Flying');
    }
}
```

## 比较运算符和等号

- 使用===和!==，避免使用==和!= [1]
- 诸如if语句之类的条件语句会把其中的值强制进行布尔值转换，遵循以下简单规则

- - Objects求值为true
  - Undefined和Null求值为false
  - Numbers如果是+0，-0或NaN求值为false,其他为true
  - Strings如果是''求值为false,其他为true

- 对于布尔值使用简写，但对于数字和字符串要进行显式比较 [0]

```
const isValid = true;
// bad
// isValid是布尔值
if (isValid === true) {
    // ...
}
// good
if (isValid) {
    // ...
}
...
const name = 'rede';
// bad
// 比如代码块中依赖对name是否为空进行相关逻辑，这时省略对''进行比较是不会影响功能的，但是对代码的可读性会产生影响
if (name) {
    // ...
}
// good
if (name !== '') {
    // ...
}
...
const collection = [];
// bad
if (collection.length) {
  // ...
}
// good
if (collection.length > 0) {
  // ...
}
```

- 在case和default中，如果要创建包含词法声明的语句块(let、const、function和class)要使用大括号进行包裹 [1]

```
// bad
// 词法声明在整个switch语句都是可见的，在多个case子句试图定义相同变量时会报no-redeclare(禁止重新声明变量)
const num = 1;
switch (num) {
case 1:
    let name = 'rede';
    break;
case 2:
    let name = 'tom';
    break;
}
// good
const num = 1;
switch (num) {
case 1: {
    const name = 'rede';
    break;
}
case 2: {
    const name = 'tom';
    break;
}
}
```

- 使用三元操作时，避免进行嵌套 [1]

```
// bad
// 会降低代码的易读性
const bar = 'bar';
const bing = 'bind';
const foo = bar === 'bars' ? (bing === 'bing' ? 'bars bing' : 'bars bind') : 'bar';
export default { foo };
// good
const bar = 'bar';
const bing = 'bind';
const barVal = bar === 'bars' ? 'bars' : 'bar';
const foo = bing === 'bing' ? `${barVal} bing` : `${barVal} bind`;
export default { foo };
```

- 避免使用一些不必要的三元运算 [1]

```
// bad
const answer = 1;
const isYes = answer === 1 ? true : false;
export default { isYes };
// good
const answer = 1;
const isYes = answer === 1;
export default { isYes };
```

- 当多个运算符混合在一个语句中，要添加适当的括号，不要将**和%与+、-，*，/混在一起使用，能提高代码的可读性 [1]

```
// bad
const a = 1;
const b = 0;
const c = 4;
const d = 3;
const foo = a && b < 0 || c > 0 || d + 1 === 0;
const bar = a ** b - 5 % d;
export default { foo, bar };
// good
const a = 1;
const b = 0;
const c = 4;
const d = 3;
const foo = (a && b < 0) || c > 0 || (d + 1 === 0);
const bar = (a ** b) - (5 % d);
export default { foo, bar };
```

## 代码块

- 使用大括号包裹多行代码，单行代码可以强制直接出现不需要换行 [1]

```
const test = true;
let boo = '';
// bad
if (test)
    boo = 'boo';
// good
if (test) boo = 'boo';    
export default { boo };
```

- 如果通过if 和 else使用多行代码块，要把else放在if代码块闭合括号的同一行 [1]

```
// bad
const name = 'rede';
let foo = '';
if (name === 'rede') {
    foo = 'foo'
}
else {
    foo = 'bar';
}
export default { foo };
// good
const name = 'rede';
let foo = '';
if (name === 'rede') {
    foo = 'foo';
} else {
    foo = 'bar';
}
export default { foo };
```

- 如果一个if代码块使用了return语句，后面的else可以省略，在else if块中return可分成多个if来return [1]

```
// bad
function foo (val) {
    if (val) {
        return 'foo';
    } else {
        return 'bar';
    }
}
export default { foo };
// good
function foo(val) {
    if (val) {
        return 'foo';
    }
    return 'bar';
}
export default { foo };
// bad
function foo(val) {
    if (val === 'foo') {
        return 'foo';
    } else if (val === 'bar') {
        return 'bar';
    } else if (val === 'test') {
        return 'test';
    }
    return 'rede';
}
export default { foo };
// good
function foo(val) {
    if (val === 'foo') {
        return 'foo';
    }
    if (val === 'bar') {
        return 'bar';
    }
    if (val === 'test') {
        return 'test';
    }
    return 'rede';
}
export default { foo };
```

## 控制语句

- 如果控制语句太长或超过最大行长度，那么每个分组条件可以放单独一行，但要注意把运算符放在每行的起始处 [0]

```
// not good
const nv1 = 2;
const nv2 = 3;
const nv3 = 4;
const nv4 = 5;
const nv5 = 6;
const nv6 = 7;
let foo = '';
// not good
if (nv1 === 1 && nv2 === 2 && nv3 === 3 && nv4 === 4 && nv5 === 5 && nv6 === 6) foo = 'foo';
// not good
if (nv1 === 1 && nv2 === 2 && nv3 === 3 && 
    nv4 === 4 && nv5 === 5 && nv6 === 6) foo = 'foo';
// good 
if (nv1 === 1 && nv2 === 2 && nv3 === 3 
    && nv4 === 4 && nv5 === 5 && nv6 === 6) foo = 'foo';
export default { foo };
```

## 注释

- 多行注释使用/**...*/ [0]

```
// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
```

- 单行注释使用 // ，将单行注释放在续注释的语句上方。在注释之前放置一个空行，除非它位于代码块的第一行。 [0]

```
// bad
const active = true;  // is current tab
 
// good
// is current tab
const active = true;
// bad
function getType() {
    console.log('fetching type...');
    // set the default type to 'no type'
    const type = this.type || 'no type';
 
    return type;
}
 
// good
function getType() {
    console.log('fetching type...');
 
    // set the default type to 'no type'
    const type = this.type || 'no type';
 
    return type;
}
 
// also good
function getType() {
    // set the default type to 'no type'
    const type = this.type || 'no type';
 
    return type;
}
```

- 所有注释符和注释内容用一个空格隔开，让它更容易阅读 [0]

```
// bad
//is current tab
// good
// is current tab
// bad
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
 // good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
```

- 给注释增加FIXME或TODO的前缀，可以帮助其他开发者快速了解这个是否是一个需要重新复查的问题，或是你正在为需要解决问题提出的解决方案，有别于常规注释 [0]
- 使用 // FIXME来标识需要修正的问题
- 使用 // TODO来标识需要实现的问题

## 空白

- 使用一致的缩进 [1]

> 这里默认是使用4个空格

- 在大括号前放置一个空格 [1]

```
// bad
function test(){
    console.log('test');
}
// good
function test() {
    console.log('test');
}
// bad
dog.set('attr',{
    age: '1 year',
    breed: 'Bernese Mountain Dog',
});
 
// good
dog.set('attr', {
    age: '1 year',
    breed: 'Bernese Mountain Dog',
});
```

- 在控制语句的小括号前放一个空格，在函数调用及声明中，不在函数的参数列表前加空格 [1]

```
const isJedi = true;
// bad
if(isJedi) {
    console.log('dd');
}
// good
if (isJedi) {
    console.log('dd');
}
// bad
function fight () {
    console.log ('Swooosh!');
}
// good
function fight() {
    console.log('Swooosh!');
}
```

- 使用空格把运算符隔开 [1]

```
// bad
const x=y+5;
// good
const x = y + 5;
```

- 在文件末尾插入一个空行 [1]
- 长方法链式调用时使用缩进，使用一个点开头，强调该行是一个方法调用，不是一个新的声明 [1]

> 估计是怕链式调用太长不方便看

```
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();
// good
$('#items').find('.selected').highlight().end()
    .find('.open')
    .updateCount();
```

- 在语句块后和下条语句前留一个空行 [0]

```
const foo = true;
let bar = '';
// bad
if (foo) {
    bar = 'bar';
}
export default { bar };
// good
if (foo) {
    bar = 'bar';
}
export default { bar };
```

- 块级代码中禁用多余的空行 [1]

```
// bad
function bar() {
 
    console.log(foo);
 
}
// good
function bar() {
    console.log(foo);
}
```

- 不要在圆括号前后加空格 [1]

```
// bad
if ( foo ) {
    console.log(foo);
}
// good
if (foo) {
    console.log(foo);
}
```

- 不要在中括号前后添加空格 [1]

```
// bad
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);
// good
const foo = [1, 2, 3];
console.log(foo[0]);
```

- 在大括号前后添加空格 [1]

```
// bad
const foo = {clark: 'kent'};
// good
const foo = { clark: 'kent' };
```

- 避免有超过100个字符(包括空格)的代码行，如果有超过，要适当考虑把代码进行换行 [1]

> 保证代码的可读性和可维护性

```
// bad
const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;
// good
const foo = jsonData
    && jsonData.foo
    && jsonData.foo.bar
    && jsonData.foo.bar.baz
    && jsonData.foo.bar.baz.quux
    && jsonData.foo.bar.baz.quux.xyzzy;
// bad
$.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));
// good
$.ajax({
  method: 'POST',
  url: 'https://airbnb.com/',
  data: { name: 'John' },
})
  .done(() => console.log('Congratulations!'))
  .fail(() => console.log('You have failed this city.'));
```

## 逗号

- 在行开头处不要使用逗号 [1]

```
// bad
const hero = {
    firstName: 'Ada'
    , lastName: 'Lovelace'
    , birthYear: 1815
    , superPower: 'computers'
};
// good
const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    birthYear: 1815,
    superPower: 'computers',
};
```

- 在结尾添加逗号 [1]

```
// bad
const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    birthYear: 1815,
    superPower: 'computers'
};
// good
const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    birthYear: 1815,
    superPower: 'computers',
};
```

因为通过git diff时，能体现出这些差异

```
// bad - 没有结尾逗号的 git diff 差异比较
const hero = {
     firstName: 'Florence',
-    lastName: 'Nightingale'
+    lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing']
};
// good - 有结尾逗号的 git diff 差异比较
const hero = {
     firstName: 'Florence',
     lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing'],
};
```

## 分号

- 禁止使用自动分号插入，都要加入分号 [1]

## 类型转换

- 在声明语句的开始处就执行强制类型转换
- 转为字符串时，禁止原始包装实例

```
const reviewScore = 9;
// bad
// 此时typeof totalScore为Object并不是string
const totalScore = new String(reviewScore); 
// bad
// 调用的事 reviewScore.valueOf()
const totalScore = reviewScore + ''; 
// bad
// 不能保证返回一个字符串
const totalScore = reviewScore.toString(); 
// good
const totalScore = String(reviewScore);
```

- 转为数字类型时，禁止使用原始包装实例，如果使用parseInt要必须有基数 [1]

```
const inputValue = '4';
// bad
// 不要使用原始包装实例
const val = new Number(inputValue);
// bad
const val = +inputValue;
// bad
const val = inputValue >> 0;
// good
const val = Number(inputValue);
// bad
// 没基数
const num = parseInt('071');
// good
const num = parseInt('071', 10);
```

- 避免使用按位运算符 [1]

```
// bad
const val = inputValue >> 0;
```

- 进行布尔值转换时，避免使用原始包装实例 [1]

```
const age = 0;
// bad
const hasAge = new Boolean(age);
// good
const hasAge = Boolean(age);
// best
const hasAge = !!age;
```

## 命名规则

- 避免使用单字母名词 [0]
- 当命名对象，函数和实例时使用驼峰式命名 [1]

```
// bad
// 一般命名分为驼峰和下划线拼写写法，这里建议使用驼峰式写法
const this_is_my_object = {};
// good
const thisIsMyObject = {};
```

- 当命名构造函数或类时使用PascalCase式命名(帕斯卡拼写法，即首字母大写) [0]

```
// bad
function user(options) {
    this.name = options.name;
}
 
const bad = new user({
    name: 'nope',
});
// good
class User {
    constructor(options) {
    this.name = options.name;
    }
}
 
const good = new User({
    name: 'yup',
});
```

- 变量禁止使用下划线开头或结尾 [1]

```
// bad
const __firstName__ = 'Panda';
// good
const firstName = 'Panda';
```

- 不要存储this引用 [0]

```
// bad
function foo() {
    const self = this;
    return function () {
        console.log(self);
    };
}
// good
function foo() {
    return () => {
        console.log(this);
    };
}
```

- 文件名应与其默认导出的名词完全匹配 [0]

```
// 文件1
class CheckBox {
    // ...
}
export default CheckBox;
 
// 文件2
export default function fortyTwo() { return 42; }
 
// 文件3
export default function insideDirectory() {}
// good
import CheckBox from './CheckBox'; // export/import/filename 单词首字母大写命名
import fortyTwo from './fortyTwo'; // export/import/filename 驼峰式命名
import insideDirectory from './insideDirectory';
```

- 当导出一个默认函数时使用驼峰式命名，文件名应该和你的函数名字一致 [0]

```
function makeStyleGuide() {
    // ...
}
 
export default makeStyleGuide;
...
文件名为makeStyleGuide
```

- 当导出一个构造函数／类／单例／函数库／纯对象时使用PascalCase式命名 [0]
- 首字母缩写的词，应该总是全部大写，或全部小写 [0]

```
// bad
import SmsContainer from './containers/SmsContainer';
// bad
const HttpRequests = [
    // ...
];
// good
import SMSContainer from './containers/SMSContainer';
 
// good
const HTTPRequests = [
    // ...
];
// also good
const httpRequests = [
    // ...
];
// best
import TextMessageContainer from './containers/TextMessageContainer';
```

- 如果变量是被导出的，或者只是常量，或者可以确信变量不会改变，可以使用大写，使用大写的变量可以帮助使用者确定使用的变量不会改变 [0]

## 存取器

- 属性的存取器不是必须
- 避免使用js的getters/setters，因为会导致意想不到的副作用，而且会很难测试维护，可以使用存取器函数，使用getVal及setVal [0]

```
// bad
class Dragon {
    constructor(val) {
        this.name = val;
        this.year = 0;
    }
    get age() {
        // ...
        return this.year;
    }
    set age(value) {
        // ...
        this.year = value;
    }
}
// good
class Dragon {
    constructor(val) {
        this.name = val;
        this.year = 0;
    }
    getAge() {
        // ...
        return this.year;
    }
    setAge(value) {
        // ...
        this.year = value;
    }
}
```

- 也可以创建 get() 和 set() 函数, 但要保持一致 [0]