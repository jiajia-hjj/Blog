### H5类名操作

~~~javascript
//添加类show
Node.classList.add('show'); 

//移除类show
Node.classList.remove('show'); 

//切换类show，有则移除，无则添加
Node.classList.toggle('show'); 

//检测是否存在类show
Node.classList.contains('show'); 

~~~



### jq类名操作

```js
 addClass() - 向被选元素添加一个或多个类
removeClass() - 从被选元素删除一个或多个类
toggleClass() - 对被选元素进行添加/删除类的切换操作
css() - 设置或返回样式属性

//添加类show、box
$("div").addClass('show box'); 

//移除类show
$("div").removeClass('show'); 

//切换类show，有则移除，无则添加
$("div").toggleClass('show'); 

//检测是否存在类show
$("div").hasClass('show'); 
//返回样式show
$("div").css('show'); 
```

