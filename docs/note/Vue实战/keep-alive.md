### Vue路由销毁问题

Vue在路由切换的时候会销毁旧路由。
我们在三级列表全局组件TypeNav中的mounted进行了请求一次商品分类列表数据。
由于Vue在路由切换的时候会销毁旧路由，当我们再次使用三级列表全局组件时还会发一次请求。
如下图所示：当我们在包含三级列表全局组件的不同组件之间进行切换时，都会进行一次信息请求。

由于信息都是一样的，出于性能的考虑我们希望该数据只请求一次，所以我们把这次请求放在App.vue的mounted中。（根组件App.vue的mounted只会执行一次）
注意：虽然main.js也是只执行一次，但是不可以放在main.js中。因为只有组件的身上才会有$store属性。

[vuex 不同模块中方法同名？？？？？？](https://blog.csdn.net/cherry_vicent/article/details/122449617?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.pc_relevant_default&spm=1001.2101.3001.4242.1&utm_relevant_index=3)

