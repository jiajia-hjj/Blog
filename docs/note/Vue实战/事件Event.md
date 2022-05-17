### 事件Event

事件源、事件类型、事件回调

系统事件

自定义事件：`$on`和`$emit`结合

+ 原生DOM绑定系统事件--单击事件

```html
<button  @click="handler">原生DOM绑定系统事件</button>
```

+ Event1组件：非原生的DOM节点，而绑定click事件并非原生DOM事件，而是自定义事件

```html
<Event1  @click="handler1" ></Event1>
<!--可以加.native，自定义事件变成原生DOM事件
    原理：当前原生DOMclick事件，其实是给子组件的跟节点绑定点击事件---利用到事件的委派
-->
<Event1  @click.native="handler1" ></Event1>
```

+ 原生DOM绑定自定义事件，是没有意思的，因为没有办法触发$emit函数

```html
<button  @XXC="handler">原生DOM绑定自定义事件</button>
```

+ Event2组件绑定自定义事件

```html
<Event2  @click="handler3" ></Event2>
```

```html
<!--Event2组件，点击按钮，父组件的自定义事件click的函数会触发-->
<button  @click="$emit('click','自定义事件')">分发自定义click事件</button>

```

### 