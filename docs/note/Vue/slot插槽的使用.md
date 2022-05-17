## slot插槽的使用

+ 父组件可通过slot插槽，向子组件内部指定位置传递内容。

### 基本使用

```html
<!-----------子组件ChildA--------------->
<div>
    <slot>默认内容</slot>
</div>
<!--------------父组件-------------->
<div>
   <childA> 我是默认插槽，可以传递内容</childA>  
</div>
```

### 具名插槽

```html
<!------------子组件ChildB------------->
<div>
    <slot name="left">
        左边的默认内容
    </slot>
    <slot name="right">
        右边的默认内容
    </slot>
</div>
<!--------------父组件APP-------------->
<div>
    <child-b>
      <span slot="left">自定义左边的内容</span>
	  <span slot="right">自定义右边的内容</span>
    </child-b>
</div>
```

### 作用域插槽

+ 子组件的数据来源于父组件
+ 子组件是决定不了自身的外观

```html
<!-----------子组件List2--------------->
<ul>
    <!-- 数据来源于父组件 -->
    <li v-for="(item,index) in todos" :key="item.id">
        <!-- 作用域插槽，子组件将数据回传父组件 -->
        <slot :todo="item" :$index="index"></slot>
    </li>
</ul>
<script>
export default {
    props:['todos']
};
</script>
```

```html
<!-----------父组件--------------->
<!-- 子组件：数据来源于父组件 -->
<List2 :todos="todos">
    <!-- 子组件：决定不了结构和外观 -->
    <!-- slot-scope="{todo,$index}"  接收子组件回传的数据,{}是解构 -->
    <template slot-scope="{todo,$index}">
        <span :style="{color:todo.isComplete?'red':''}">{{$index}}---{{todo.text}}</span>
    </template>
</List2>

<script>
import List2 from './List2'
export default {
    data() {
        return {
           todos:[
               {id:1,text:'AAA',isComplete:false},
               {id:2,text:'BBB',isComplete:true},
               {id:3,text:'ccc',isComplete:true},
               {id:4,text:'ddd',isComplete:false},
           ]
        };
    },
    components:{
        List,List2,childA,childB
    },
};
</script>
```

​			

