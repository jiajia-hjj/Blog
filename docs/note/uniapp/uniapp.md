# uniapp

**1.引入外部css文件**
 可以在根目录创建一个文件夹，把外部的css,js等文件放进去，然后app.vue里面利用@import方法导入。

**2.在main.js文件里面挂载变量**
 可以在main.js文件里定义变量到Vue原型里面。例如:
 Vue.prototype.url = "[https://www.baidu.com](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.baidu.com)";

**3.导入scss文件到页面里面的vue文件里**
 在使用sass之前我们要在xbuilder设定编译sass文件的插件，找到IDE里面的工具，插件按照scss/sass编译。
 如果是全局的scss文件，可以放在根目录里面，然后通过uni.scss文件导入。例如：@import '@common/common.scss';
 也可以在main.js里面引入在头部:
 import "../index.scss"
 如果导入的scss到单独的vue文件里，可以把文件的style部分改一下：
 <style lang="scss">
 </style>

**4.通用的尺寸单位是rpx, 而不是upx.**

5.路径如'../../'可以改为绝对路径,如/.

6.可以做一个共享的css文件，在各各文件中引入。
 因为很多文件都用到flex布局，padding, margin等属性，所以可以根据整个项目来把这些都放在一个公共数据库里面。

7.大部分情况下只有2个元素，view, text来写，view相当于div, text相当于span.

8.在组件里面一般不会引入ajax数据，而是通过父页面引入。引入的方法是，在父页面写变量如:value="datavalue", datavalue在data方法里面写，然后在组件里面写
 props：["props"],这种方法来写。

9.在template下面必须有个view。否则运作不正常。