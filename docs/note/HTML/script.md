### script 标签为什么建议放在body标签的底部

因为浏览器再渲染html的时候，是从上到下执行的，当遇到js文件的时候就会停止当前页面的渲染，转而下载js文件。

script 标签放在头部，在文件很大的情况下将导致首屏加载时间延长，影响用户体验。



解决办法：

+ 放在body标签的底部

+ 通过defer 和 async 属性将js文件转为异步加载

### **4、script 标签中 defer 和 async 的区别？**

+ `script` ：会阻碍 HTML 解析，只有下载好并执行完脚本才会继续解析 HTML。

+ `async script` ：当浏览器遇到带有 async 属性的 script 时，请求该脚本的网络请求是异步的，不会阻塞浏览器解析 HTML，一旦网络请求回来之后，如果此时 HTML 还没有解析完，浏览器会暂停解析，先让 JS 引擎执行代码。所以有可能会阻断 HTML 的解析。

+ `defer script`：完全不会阻碍 HTML 的解析，当浏览器遇到带有 defer 属性的 script 时，获取该脚本的网络请求也是异步的，不会阻塞浏览器解析 HTML，一旦网络请求回来之后，如果此时 HTML 还没有解析完，浏览器不会暂停解析并执行 JS 代码，而是等待 HTML 解析完毕再执行 JS 代码。

> [图解 script 标签中的 async 和 defer 属性](https://juejin.cn/post/6894629999215640583)





