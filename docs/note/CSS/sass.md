## sass笔记

[官网](https://www.sass.hk/)

### 一、配置自动编译

**安装**

```cmd
npm install –g sass
```

**webstorm配置**

+ file—>settings—>Tools—>File Watcher—>+ scss

**vscode配置**

+ Live Sass Compiler 插件
+ 点击底部 "Watch Sass" 按钮

### 二、注释

```scss
// 这种注释 编译后会消失 
/* 这种注释 ，编译后存在，压缩后会消失  */   
/*!  多用于类库的信息的注释  编译压缩都会存在   */   
```

- 全部遵循 CSS 注释规范
- 不使用 `/*! */` 注释方式

- 注释内不放 SASS 变量

### 三、变量 

+ 必须$前缀，必须分号结束
+ 不能以数字开头，不能包含特殊字符，区分大小写

```less
$mainColor:#000;
$bg-color: #fdffd5; // 此处优先级比有default的高。
$bg-color: #d1ff39 !default; // 定义一个默认值。
body{
    color: $mainColor;
    background-color:$bg-color;
}
```

### 四、混合宏 Mixin

**@mixin** 声明一个混合宏
**@include** 调用一个混合宏

```scss
@mixin border-radius($border:10px){
    border-radius:$border;
    -webkit-border-radius:$border;    
    -ms-border-radius:$border;
    -moz-border-radius:$border;
    -o-border-radius:$border;
}

.btn{
    @include border-radius();   
}

.btn1{
    @include border-radius(5px);   
}
```

[常用整理]()

### 五、嵌套

+ 需要连接的情况：&

```scss
.btn{
  color: aquamarine;
  &:hover{
    color: #E93223;
  }
}
```

### 六、Import （导入）

```scss
@import "mixin";
.btn{
    @include border-radius(20px);   
}
```



### 七、继承extend

+ 使用**@extend**来继承已存在的类样式块

```scss
.btn{
    color:red;   
 }

 .btn-primary{
    border:1px solid #ddd;
    @extend .btn;  // 此处使用@extend来继承.btn类中的内容
 }
```

编译后为：

```scss
.btn, .btn-primary {
  color: red; 
}
.btn-primary {
  border: 1px solid #ddd; 
}
```

**注：**

+ 应避免使用 @extend 指令
+ 因为它并不直观，而且具有潜在风险，特别是用在嵌套选择器的时候。即便是在顶层占位符选择器使用扩展，如果选择器的顺序最终会改变，也可能会导致问题。（比如，如果它们存在于其他文件，而加载顺序发生了变化）。其实，使用 @extend 所获得的大部分优化效果，gzip 压缩已经帮助你做到了，因此你只需要通过 mixin 让样式表更符合 DRY 原则就足够了。

### 占位符 placeholder

+ 使用%来定义占位符,不会在页面中生成btn这个类。

```scss
%mt5{
    margin-top:5px;    
}
%pt5{
    padding-top:5px;   
}

.box1{
    width:100px;   
    @extend %mt5;
    @extend %pt5;
}
```

编译后为：

```scss
.box1 {
  margin-top: 5px;
}

.box1 {
  padding-top: 5px;
}

.box1 {
  width: 100px;
}
```

缺点：重复的类出现代码冗余，但是定义的placeholder不会显示在编译后的代码中。

### 八、函数-运算

**插值语句 `#{}`**

+ 嵌套在字符串中，则要写在#{}中。

+ 与变量相比，使用 `#{}` 可以避免 Sass 运行运算表达式。

```scss
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

**函数**

```sass
@function 函数名(参数) {
  …
}
```

**for循环**

```css
@for $i  1 through 50 {
    …
}
/**例子**/
@for $i from 1 through 4 {
    li:nth-child(#{$i}){
        transition-delay:0.7s - 0.1s * $i;
    }
}
```

### 九、函数-内置函数



