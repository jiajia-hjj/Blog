---
title: canvas
tags:
  - HTML
  - HTML5
categories:
  - HTML
---
### canvas在标签中设置高，与再style中设置宽高有什么区别

canvas标签的width和height是画布实际宽度和高度，绘制的图形都在上面。（真实的canvas的大小）

style的的width和height是canvas在浏览器中被渲染的高度和宽度。。（整个的拉大拉小）

canvas没有设置width和height或者不正确就被设置成默认值





可以简单理解：当我在canvas中设置宽高，相当于使用鼠标拖动了画布的边框使画布变大，但是里面的内容不会变化。当我在style中设置了宽高，相当于点击放大镜对整个图像进行方法，使得里面的内容也会跟着变化。

