### 如何禁止a标签跳转页面或者定位链接？

1、标签属性href，使其指向空或者不返回任何内容

```html
<a  href = "javascript:void(0);"  > 点此无反应javascript: void(0) </a>
<a href="javascript:;" >点此无反应javascript:</a >
```



2、阻止默认事件

return false

```html
<a href = "" onclick = "return false;" >return  false; < /a><a href="#" onclick="return false;">return false;</a >
```

js文件中阻止默认点击事件：

```js
Event.preventDefault()
```

