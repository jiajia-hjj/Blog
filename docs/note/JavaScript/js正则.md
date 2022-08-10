---
title: 正则
tags:
  - JavaScript
categories:
  - JavaScript
---



## 一、正则表达式

+ 用于匹配规律规则的表达式
+ [在线测试正则](https://c.runoob.com/front-end/854)
+ 组成：
  + 普通字符
  + 特殊字符(元字符)：正则表达式中有特殊意义的字符

### 1.1.元字符串

通过测试工具演示下面元字符的使用

**常用元字符串**

| 元字符 | 说明                           |
| ------ | ------------------------------ |
| \d     | 匹配数字                       |
| \D     | 匹配任意非数字的字符           |
| \w     | 匹配字母或数字或下划线         |
| \W     | 匹配任意不是字母，数字，下划线 |
| \s     | 匹配任意的空白符               |
| \S     | 匹配任意不是空白符的字符       |
| .      | 匹配除换行符以外的任意单个字符 |
| ^      | 表示匹配行首的文本(以谁开始)   |
| $      | 表示匹配行尾的文本(以谁结束)   |

**限定符**

| 限定符 | 说明             |
| ------ | ---------------- |
| *      | 重复零次或更多次 |
| +      | 重复一次或更多次 |
| ?      | 重复零次或一次   |
| {n}    | 重复n次          |
| {n,}   | 重复n次或更多次  |
| {n,m}  | 重复n到m次       |

**其它**

```
[] 字符串用中括号括起来，表示匹配其中的任一字符，相当于或的意思
[^]  匹配除中括号以内的内容
\ 转义符
| 或者，选择两者中的一个。注意|将左右两边分为两部分，而不管左右两边有多长多乱
() 从两个直接量中选择一个，分组
   eg：gr(a|e)y匹配gray和grey
[\u4e00-\u9fa5]  匹配汉字
```

### 2.2.案例

```js
/*验证手机号：*/
^\d{11}$

/*验证日期 2012-5-01*/
^\d{4}-\d{1,2}-\d{1,2}$

/*验证邮箱 xxx@itcast.cn*/
^\w+@\w+\.\w+$

/*验证IP地址 192.168.1.10*/
^\d{1,3}(\.\d{1,3}){3}$
```

## 二、JS 中使用正则表达式

### 2.1.创建正则对象

```js
//方式1：字面量方式
var reg = /\d/gi;
//方式2：new Regex()
var reg = new Regex('\d', 'gi');
```

+ **参数**

| 标志 | 说明                |
| ---- | ------------------- |
| i    | 忽略大小写          |
| g    | 全局匹配            |
| gi   | 全局匹配+忽略大小写 |

### 2.2.方法

#### 正则匹配-test()

+ 检测一个字符串是否匹配正则。**返回布尔值**。

```js
// 匹配日期
var reg = /^\d{4}-\d{1,2}-\d{1,2}$/
reg.test('2015-10-10')//true

```

#### 正则提取-match()

+ 查找匹配字符串。**返回值是存放匹配结果的数组。数组的内容依赖于 regexp 是否具有全局标志 g。**
+ 没有 g，只执行一次匹配。

```js
// 1. 提取工资
var str = "张三：1000，李四：5000，王五：8000。";
str.match(/\d+/g);//["1000", "5000", "8000"]
```

#### 正则替换-replace()

+ 用一些字符替换另一些字符。**返回值是一个新字符串**

```JS
var str = " 123AD asadf   asa adf ";
str.replace(/\s/g,"xx");//"xx123ADxxasadfxxxxxxasaxxadfxx"
```

#### 分组提取-()

+ 正则表达式中的()：作为分组来使用，获取分组匹配到的结果用`Regex.$1 $2 $3....`来获取

```js
var dateStr = '2016-1-5';
var reg = /(\d{4})-(\d{1,2})-(\d{1,2})/;
if (reg.test(dateStr)) {
    console.log(RegExp.$1);//2016
    console.log(RegExp.$2);//1
    console.log(RegExp.$3);//5
}
```

## 三、案例：表单验证

+ html

```html
<form id="frm">
  QQ号：<input type="text" name="txtQQ" data-rule="qq"><span></span><br>
  邮箱：<input type="text" name="txtEMail" data-rule="email"><span></span><br>
  手机：<input type="text" name="txtPhone" data-rule="phone"><span></span><br>
  生日：<input type="text" name="txtBirthday" data-rule="date"><span></span><br>
  姓名：<input type="text" name="txtName" data-rule="cn"><span></span><br>
</form>
```

+ 表单验证部分，封装成函数：

```js
// 所有的验证规则
var rules = [
  {
    name: 'qq',
    reg: /^\d{5,12}$/,
    tip: "请输入正确的QQ"
  },
  {
    name: 'email',
    reg: /^\w+@\w+\.\w+(\.\w+)?$/,
    tip: "请输入正确的邮箱地址"
  },
  {
    name: 'phone',
    reg: /^\d{11}$/,
    tip: "请输入正确的手机号码"
  },
  {
    name: 'date',
    reg: /^\d{4}-\d{1,2}-\d{1,2}$/,
    tip: "请输入正确的出生日期"
  },
  {
    name: 'cn',
    reg: /^[\u4e00-\u9fa5]{2,4}$/,
    tip: "请输入正确的姓名"
  }];

addCheck('frm');

//给文本框添加验证
function addCheck(formId) {
  var i = 0,
      len = 0,
      frm =document.getElementById(formId);
  len = frm.children.length;
  for (; i < len; i++) {
    var element = frm.children[i];
    // 表单元素中有name属性的元素添加验证
    if (element.name) {
      element.onblur = function () {
        // 使用dataset获取data-自定义属性的值
        var ruleName = this.dataset.rule;
        var rule =getRuleByRuleName(rules, ruleName);
  //获取当前文本框对应的span
        var span = this.nextElementSibling;
        //判断验证是否成功
        if(!rule.reg.test(this.value) ){
          //验证不成功
          span.innerText = rule.tip;
          span.style.color = "red";
        }else{
          //验证成功
          span.innerText = "";
          span.style.color = "";
        }
      }
    }
  }
}

// 根据规则的名称获取规则对象
function getRuleByRuleName(rules, ruleName) {
  var i = 0,
      len = rules.length;
  var rule = null;
  for (; i < len; i++) {
    if (rules[i].name == ruleName) {
      rule = rules[i];
      break;
    }
  }
  return rule;
}
```



