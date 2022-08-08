---
title: cookie中的HttpOnly
tags:
  - 前端安全
categories:
  - 前端安全
---



+ 对于设置了Httponly 属性为 true 的cookie，无法通过 js 进行访问或其他操作，只是在发送对应域下的请求时，浏览器会自动带上。这样可以有效缓解 XXS 攻击。

