---
title: url 的加密解密
tags:
  - 前端安全
categories:
  - 前端安全
---



>  JavaScript 中有三个可以对字符串编码的函数，分别是：`escape,encodeURI,encodeURIComponent` 
>
> 对应解码：`unescape,decodeURI,decodeURIComponent` 






## **一、escape()函数**

+ 定义和用法： escape()函数是对字符串(string)进行编码(而另外两种是对URL)，作用是让它们在所有计算机上可读。 
+ 语法： `escape ( string )`
+ 返回值：已编码的 string 的副本。其中某些字符被替换成了十六进制的转义序列。
+ 说明：除了 ASCll 字母、数字和特定的符号(`-_!~*’()`)外，对传进来的字符串全部进行转义编码，因此如果想对 URL 编码，最好不要使用此方法。

## **二、encodeURI()函数**

+ 定义和用法：encodeURI()函数可把字符串作为 URI 进行编码。
+ 语法： `encodeURI( URIstring )` ，URLstring 必需。一个字符串，含有 URL 或其他要编码的文本。
+ 返回值： URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。
+ 说明： encodeURI方法不会对下列字符编码，ASCII字母、数字、`~!@#$&*()=:/,;?+'` 

##  **三、encodeURIComponent()函数**

+ 定义和用法： encodeURIcomponent()函数可把字符串作为 URI 组件进行编码。
+ 语法： encodeURIcomponent ( URIstring )
+ 参数：URIstring 必需。一个字符串，含有 URI 组件或其他要编码的文本。
+ 返回值： URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。

+ 说明： encodeURIComponent方法不会对下列字符编码 ，ASCII字母、数字、`~!*()'` 

## 四、区别

+  escape()函数是对字符串(string)进行编码(而另外两种是对URL)

**encodeURIComponent()函数与encodeURI()函数的区别:**

+ encodeURIComponent比encodeURI编码的范围更大。 
+ encodeURI()用于编码整个URL ，因为 URL 中的合法字符都不会被编码转换
+ encodeURIComponent 方法在编码单个`请求参数`应当是最常用的，它可以将参数中的中文、特殊字符进行转义，而不会影响整个 URL 。
+ 如：encodeURIComponent会把 http://  编码成  http%3A%2F%2F， 而encodeURI却不会。 



## 五、使用场景

1、如果只是编码字符串，和URL没有关系，那么用escape。
2、如果你需要编码整个URL，然后需要使用这个URL，那么用encodeURI。

```js
encodeURI("https://www.jb51.net/season-huang/some other thing");
//编码后："https://www.jb51.net/season-huang/some%20other%20thing"
//其中，空格被编码成了%20
encodeURIComponent("https://www.jb51.net/season-huang/some other thing");
//编码后："http%3A%2F%2Fwww.jb51.net%2Fseason-huang%2Fsome%20other%20thing"
//其中，":" "/" 都被编码，整个URL已经没法用了　
```

3、当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法。

```js
var param = "https://www.jb51.net/season-huang/"; //param为参数
param = encodeURIComponent(param);
var url = "https://www.jb51.net?next="+ param;
console.log(url) //https://www.jb51.net?next=http%3A%2F%2Fwww.jb51.net%2Fseason-huang%2F`
```

