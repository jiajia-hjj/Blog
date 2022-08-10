---
title: jQuery
tags:
  - JavaScript
categories:
  - JavaScript
---



## 文档就绪函数

+ 文档在完全加载之后运行 jQuery 代码。

```js
$(document).ready(function(){
	//...
});
```





### trigger() 方法

+ 触发被选元素的指定事件类型。

```js
$("button").click(function(){
  $("input").trigger("select");
});
```

