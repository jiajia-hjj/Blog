---
title: 静态资源完整性校验-CDN劫持
tags:
  - 前端安全
categories:
  - 前端安全
---





## CDN劫持

+ 使用内容分发网络(CDNs) 在多个站点之间共享脚本和样式表等文件可以提高站点性能并节省带宽。
+ 然而，使用CDN也存在风险，如果攻击者获得对CDN的控制权，则可以将任意恶意内容注入到 CDN上的文件中（或完全替换掉文件），因此可能潜在地攻击所有从该 CDN 获取文件的站点。

## 预防方案

将使用 `base64` 编码过后的文件哈希值写入你所引用的  `<script>`或 标签的`integrity` 属性值中即可启用子资源完整性能。

+  `integrity` 属性允许浏览器检查获取的脚本，以确保如果源已被操纵，则永远不会加载代码。 
+  在线生成 SRI 哈希值的工具 ：[SRI Hash Generator](https://www.srihash.org/)

```html
<!--integrity为了防止 CDN 篡改 javascript 用的-->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
crossorigin="anonymous">
</script>
```

