---
title: 混入mixin
tags:
  - Vue
categories:
  - Vue实战
---





+ 如果项目中出现结构类似的功能，想到组件复用

+ 如果项目中很多组件JS业务逻辑相似，想到mixin【可以把多个组件JS部分重复、相似地方mixin】

**1、新建文件夹并对外暴露，如myMixin/index.js**

**2、把相似逻辑的代码封装成mixin混入**

```js
export default {
    methods: {
        giveParent(money){
           this.money-=money;
           this.$parent.money+=money;
        },
        
    },
}
```

**3、在组件中导入，并使用**，所有的配置项都可以进行封装

```js
import myMixin from './myMixin'
export default {
    mixins:[myMixin],
};
```

