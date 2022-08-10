---
title: js设置和获取cookie
tags:
  - 浏览器
categories:
  - 浏览器
---



```js
arusername = document.cookie.split(";")[0].split("=")[1];  
//JS操作cookies方法! 
//写cookies 
function setCookie(name,value){ 
    var Days = 30; 
    var exp =newDate(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name +"="+ escape (value) +";expires="+ exp.toGMTString(); 
} 
//读取cookies 
function getCookie(name){ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
    if(arr=document.cookie.match(reg)) {
        return unescape(arr[2]); 
    } else {
        return null;
    }
} 
```

