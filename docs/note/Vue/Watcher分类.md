## Watcher分类

### computed-watcher

+ 数据变 →使用数据的计算属性变 → 使用计算属性的视图变
+ 每个computed属性都创建一个watcher（正是computed-watcher），并添加到相关data属性值的订阅者队列(deep)。

+ watcher的回调函数正是computed属性值(get,set)

### user-watcher

+ 数据变 → 开发者主动注册的watch回调函数执行

### render-watcher

+ 数据变 → 使用数据的视图变
+ render-watcher是订阅者
+ 每一个组件都会有一个 render-watcher

**收集订阅者的流程**

1. 订阅者执行回调（render函数）==>我的理解是解析模板
2. 触发属性值getter
3. 添加到订阅者队列
4. 重复2、3直至所有getter执行完

**通知订阅者的流程**

1. 属性改变
2. 触发属性值setter
3. dep通知订阅者（render watcher）
4. 订阅者执行回调（render函数）

## 三种 watcher 的执行顺序

watcher 执行顺序，分别是:

> computed-watcher-> user-watcher -> render-watcher

保证在更新组件视图的时候，computed 属性已经是最新值了，如果 render-watcher 排在 computed-render 前面，就会导致页面更新的时候 computed 值为旧数据。



> 学习：
>
> [说说Vue的几个watcher（一）——render watcher](https://juejin.cn/post/6844904128435470350)

