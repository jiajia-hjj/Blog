## v-if和v-for的问题

**v-if和v-for优先级哪个高？**

+ v-for优先级高于v-if
+ 同时出现时，每次渲染都会先执行循环，在再循环中执行判断，造成性能浪费。
+ 因此不要把 v-if 和 v-for 同时用在同一个元素上。

**同时出现如何优化才能得到更好的性能？**

+ 在外层或嵌套`<block>`，先进行v-if判断，然后再v-for循环

```html
<ul v-if="isShowGoods">
  <li
    v-for="goods in goodsList"
    :key="goods.id"
  >
    {{ goods.name }}
  </li>
</ul>
```

+ 无法先进行v-if判断的，可以进行数据处理，替换为一个计算属性 ，返回过滤筛选后的列表。

```html
<ul>
  <li
    v-for="goods in activeGoodsList"
    :key="goods.id"
  >
    {{ goods.name }}
  </li>
</ul>
```

```js
computed: {
  activeGoodsList: function () {
    return this goodsList.filter(function (goods) {
      return goods.isActive
    })
  }
}
```



## 