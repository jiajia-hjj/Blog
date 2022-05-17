## Runtime-compiler和Runtime-only的区别

### 一、**runtime-compiler**

+ 代码中，可以有template，因为complier可以用于编译template
+ template->解析成ast(抽象语法树)->编译成render->vdom->ui

```js
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
})

```

### 二、使用render函数

+ 在vue中我们使用模板HTML语法组建页面的（上述那种方式），使用render函数可以用js语言来构建DOM
+ vue是虚拟DOM在拿到template模板时也要转译成VNode的函数（template->ast->render）
+ 而用render函数构建DOM，vue就免去了转译的过程（template->ast）。
+ render函数描述虚拟DOM时，vue提供一个函数createElement，这个函数是就构建虚拟DOM所需要的工具。

```js
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const cpn={
  template:'<div>{{message}}</div>',
  data(){
    return{
      message:'我是组件message'
    }
  }
}
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>',
  render: function (createElement) {
      /*
       1.createElement('标签',{标签属性},[''])
       1.1.创建<h2>标签,替换挂载的app
       1.2.<h2>有个class叫box
       1.3.<h2>标签的内容是Hello World,又包含另一个标签<button>
       如：<h2 class="box">Hello World<button>按钮</button></h2>
       
          return createElement('h2',{
              class: 'box'
          },['Hello World',createElement('button',['按钮'])])
          
       2.传入一个组件对象:少了template的编译，编译成ast的过程
           return createElement(cpn)
      */  
    return createElement(App)
  },
  // render:createElement=>createElement(App)
})

```

### 三、runtime-only

+ 代码中，不可以有任何template，只能识别render函数。
+ render->vdom->ui

```js
import Vue from 'vue'
import App from './App'

console.log( App );//App对象没有template，有render,内部已经把template编译成了render
/*
  那么解析.vue文件中的template是由谁处理的呢？
  + 是由vue-template-compiler,（是开发时依赖）我们运行出来的所有组件都不包含template，所有的组件都被渲染成render函数.
  + 使用运行时没必要去使用runtimer-compiler,因为所有的vue组件都不包含template,包含的都是render函数，使用runtimer-only
*/
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App)//直接创建这个app对象，就省去那些步骤
})


//render->vdom->ui
// template->ast：'./App'中的template，template被编译出来的就是普通的对象 ，普通对象已经将template渲染成render函数。App对象没有template

```



### 四、总结

+ runtiem-compiler 源代码更多 ， template->ast->render->vdom->ui
+ runtimer-only  性能更高，代码量更少。少了compiler（解析template->ast过程），所以代码比上面轻6kb，直接render->vdom->ui。

