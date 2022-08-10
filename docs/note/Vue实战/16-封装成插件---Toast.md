---
title: 将Toast组件封装成插件形式
tags:
  - Vue
categories:
  - Vue实战
---



## 将Toast组件封装成插件形式

需求：经常会有提示框，多个页面使用，但是提示框的大小、icon图标等会变化。

思路：多个页面使用，可以封装成[全局组件](https://www.cnblogs.com/jiajia-hjj/p/15864424.html)。但是需要多次引人标签，有点繁琐。

### 一、创建Toast组件

```html
<template>
  <div class="tip" :style="{width: tipObj.width+'px',height:tipObj.height+'px',padding:tipObj.padding+'px',paddingTop:tipObj.paddingTop+'px '}" v-show="isShowTip">
     <span class="iconfont" :class="tipObj.icon" :style="{fontSize:tipObj.iconfontSize+'px'}"></span>
      <p class="tip_text" v-html="tipObj.text" :style="{fontSize:tipObj.fontSize+'px'}">
      </p>
  </div>
</template>
<script>
  export default {
    name: "Tip",
    data(){
      return{
        isShowTip:false,
        tipObj:{
          width:150, 
          height:50,
          padding:9,
          paddingTop:9,
          fontSize:14,
          iconfontSize:12,
          icon:'',//小icon图标样式
          text:'',//显示的内容
          time:2000 //默认显示时间
        }
      }
    },
    methods:{
      showToast(tipObj) {
        this.isShowTip = true;
        this.tipObj=Object.assign(this.tipObj, tipObj);
        const timeId = setTimeout(() => {
          this.isShowTip = false;
          clearTimeout(timeId);
        }, this.tipObj.time);
      },
    }
  }
</script>
```

### 二、组件使用形式

```html
<tip  ref="tip"></tip>
```

```js
this.$refs.tip.showToast({//其他值不传，是按默认值
  text: 'HAHAHAHAH',
  time:5000
});
```

### 三、封装成插件的形式

+ 在组件中建一个js文件(toast/index.js)

```js
import Toast from './Toast'
const obj={};
obj.install=function (Vue) {
  //1、创建组件构造器
  const toastContrustor=Vue.extend(Toast);
  //2、new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast =new toastContrustor();
  //3、将组件对象，收手动挂载到某一个元素上去
  toast.$mount(document.createElement('div'));
  // 4、toast.$el对应的就是div
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast=toast
}
export default obj
```

+ 安装组件

```js
import toast from 'components/common/toast/index'
// 安装toast插件
Vue.use(toast);//使用use,就会去执行tip的install函数
```

+ 插件的使用

```js
this.$toast.showToast({
  text: 'HAHAHAHAH',
  time:5000
})
```

