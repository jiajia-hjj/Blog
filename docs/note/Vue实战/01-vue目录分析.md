## vue文件目录分析

### node_modules文件夹

+ 项目依赖

### public文件夹：

+ 静态资源，webpack进行打包的时候会**原封不动打包到dist文件夹中**。

**pubilc/index.html**：是一个模板文件，作用是生成项目的入口文件，webpack打包的js,css也会自动注入到该页面中。我们浏览器访问项目的时候就会默认打开生成好的index.html。

### src文件夹

（程序员源代码文件夹）

+ **assets**文件夹：一般放静态资源（一般放多个组件**共用**的静态资源，如很多地方用的图片放assets），webpack打包时，webpack会把静态当做一个**模块**，**打包到JS文件中**。
+ **components**文件夹： 一般放置非路由组件（全局组件）
+ **views|pages**文件夹：经常放路由组件
+ **App.vue**： 唯一的根组件，Vue当中的组件（.vue）
+ **main.js**： 程序入口文件，最先执行的文件、
+ **utils文件夹**：放常用功能模块

### **babel.config.js**

+ 配置文件（babel相关，兼容）

### package.json

+ 项目描述文件，记录当前项目的信息，例如项目名称、版本、作者、guthub地址、当前项目依赖了哪些第三方模块等。

### **package-lock.json**

+ 缓存性文件（各种包的来源）

### **README**

+ 说明文件

