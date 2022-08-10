---
title: webpack3笔记
tags:
  - 构建工具
categories:
  - 构建工具
---
## 一、什么是webpack

### 静态模块打包工具

+ webpack，将所有的前端资源文件(js/json/css/img/sass...)都会作为模块处理。它根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)。

+ 处理模块间的依赖关系，让我们可以**模块化开发**，

+ grunt/gulp/webpack---**打包工具**，打包：打包合成一个或多个包，转化成浏览器可以识别的代码 

  ( 自己的理解：很多文件可能浏览器不支持，不能直接放在服务器，需要通过一些工具进行打包转换，生成浏览器可以识别的可以执行的代码 )

### 和gulp对比

## 二、安装

+ 依赖于node，安装node。
+ 安装webpack

```cmd
#全局安装
npm install webpack@版本号 -g
#局部安装
cd 对应目录
npm install webpack@版本号 --save-dev
```

## 三、基本使用

### 3.1.开发

**src--开发文件夹**

````js
/*****************mathUtils.js****************/
function add(num1,num2) {
  return num1+num2
}
function mul(num1,num2) {
  return num1*num2
}
//commonJS的模块化思想
module.exports={
  add,
  mul
};

/*******************info.js****************/
//使用ES6的模块化的规范
export const name="HHHH";
export const age="12";
export const height="162";
const message="你好呀";
export default message;

/*******************main.js****************/
//1.使用commonJS的模块化规范
const {add,mul}=require('./mathUtils');
console.log(add(20,30));//50
console.log(mul(20,30));//600
//2.使用ES6的模块化的规范
import m,* as info from "./info"
console.log(info.name,info.age,info.height);//HHHH 12 162
console.log(m);//你好呀
````

### 3.2.打包

**命令行webpack-cli工具，全局安装：**

```cmd
#安装。-g,当前项目需要用，其他项目也需要用
npm install webpack-cli -g
#使用
webpack 需要打包的文件 打包输出的文件
```

**dist--打包的文件夹**

```cmd
#把文件./src/main.js打包到./dist/bundle.js文件
webpack ./src/main.js ./dist/bundle.js 
```

### 3.3.运行

**index.html--运行的页面**

```html
<!--只要引入打包过的文件-->
<script src="./dist/bundle.js"></script>
```

## 四、配置

### 4.1.webpack配置

**webpack.config.js--配置文件**

```js
const path=require('path')
module.exports={
    entry:'./src/main.js'//入口
    output:{//出口
   	  /*
    	是要一个绝对路径，要动态获取路径  
    	resolve：可以拼接 
        __dirname：node上下文中的全局变量，当前webpack.config.js所在的路径
      */
    	path:path.resolve(_dirbame,'dist'),
        filename:'bundle.js'    
	}
}
```

**package.json--npm init 初始化项目时产生**

+ devDependencies-----开发时依赖;
+ dependencies------运行时依赖（打包完还需要用的话，放这）

### 4.2.使用局部webpack

+ 只要终端（如cmd,webStorm的Terminal）中敲命令的用的都是全局。命令行：`webpack *****`
+ 具体项目中，项目会依赖特定版本的webpack。全局中的版本和项目中的webpack版本可能不一致，因此要使用局部。
+ 下载局部的webpack。`npm install webpack@3.6.0 --save-dev`

+ vue-cli3中。webpack配置文件已被隐藏。
+ 启动执行打包：

```cmd
.\node_modules\.bin\webpack
```

+ package.json中配置定义启动执行打包：

  + `"build": "webpack"`

  + 执行脚本会优先去本地找,找不到再用全局

```json
"scripts": {
    "build": "webpack"
}
```

```cmd
#配置package.json了后运行
npm run build
```

## 五、loader

### 5.1.什么是loader

+ 没有做依赖不会打包 
+ 主要用webpack来处理我们写的js代码，并且webpack会自动处理js之间相关依赖。
+ 但是开发中不仅仅有基本的js代码处理。我们也需要加载css、图片，也包括一些高级es6、TypeScript转成ES5代码，将scss、less转成css，将jsx、.vue文件转成js文件
+ 对于webpack本身的能力来说。这些转化是不支持的，因此要给webpack扩展对应的loader就可以实现

### 5.2.css文件处理

```js
/*在src文件夹下添加css/normal.css文件，在main.js中添加依赖，并打包*/
/*******************main.js****************/
//3.依赖css文件
require('./css/normal.css');//直接打包会报错，webpack本身的能力处理不了
```

+ 需要下载配置css-loader、style-loader

**css-loader**

+ npm install css-loader --save-dev
+ 负责将css文件进行加载，不负责帮你解析，也不负责帮你把css放在html里帮你生效

**style-loader**

+ npm install style-loader --save-dev
+ 负责将样式添加到DOM中，会生成style标签

**webpack.config.js配置css**

```js
module:{
    rules:[
        {
            test:/\.css$/,//匹配
            use:['style-loader','css-loader']//使用多个loader时，是从右向左
        }
    ]
}
```

### 5.3.less文件处理

```js
/*在src文件夹下添加css/special.less文件，在main.js中添加依赖，并打包*/
/*******************main.js****************/
//4.依赖less文件
require('./css/special.less');//直接打包会报错，webpack本身的能力处理不了
```

+ 需要下载配置less 、 less-loader

**less**

+ npm install less --save-dev

+ 将less文件进行转换为css文件

**less-loader**

+ npm install less-loader --save-dev
+ 内部调用less

**webpack.config.js配置less**

```js
module:{
    rules:[
        {
            test: /\.less$/,
            //  use: ['style-loader','css-loader', 'less-loader']
            use: [{
                loader: "style-loader" // 从JS字符串创建样式节点(负责将样式添加到DOM中)
            }, {
                loader: "css-loader" // 将CSS转换为CommonJS(将css文件进行加载)
            }, {
                loader: "less-loader" //将 Less 编译为 CSS
            }]
        },
    ]
}
```

### 5.4.图片文件处理

```css
/*在src文件中添加图片文件 img/bg.png，并在normal.css中引入*/
/*src/css/normal.css*/
body{
  background: url("../img/bg.png");
}
```

**url-loader**

+ npm install url-loader --save-dev
+ 将文件作为 data URI 内联到 bundle 中
+ limit属性。如limit:8192，当图片小于8kb，对图片进行base64编码

**file-loader**

+ npm install file-loader --save-dev
+ 将文件发送到输出目录
+ 当图片大于8kb，通过file-loader进行处理

**webpack.config.js配置图片文件处理**

```js
module:{
    rules:[
        {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: [
                {
                    loader: 'url-loader',
                    //当加载的图片，小于limit时(单位kb)，会将图片编译成base64字符串形式
                    //当加载的图片，大于limit时(单位kb)，会使用file-loader模块对图片进行加载
                    options: {
                        limit: 72680,
                        /*
                        图片文件处理-修改文件名称：
                             变量要用[]
                            [name]：图片本身的名字
                            [hash:8]：哈希8位
                            [ext]：原来的扩展名
                        */
                        name:'img/[name].[hash:8].[ext]'
                    },
                }
            ]
        },
    ]
}
```

### 5.5.ES6语法的处理

**babel-loader**

+ npm install -D babel-loader @babel/core @babel/preset-env webpack

```js
module:{
    rules:[
        {
            test: /\.js$/,
            //exclude：排除
            //include：包含
            //只需要转化src这个文件，这个node_modules|bower_components文件不需要转化
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    //配置， ['@babel/preset-env']会去找babel-preset-env文件，但是我们没有下
                    presets: ['@babel/preset-env']
                }
            }
        },
    ]
}
```

### 5.6.配置Vue

#### **安装vue**

+  npm install vue --save   （ 运行时也需要依赖，运行依赖，所以不需要加-dev ）

#### el和template

+ el：指定Vue要管理的DOM，可以帮助解析其中的指令、事件监听。
+ template：Vue实例中的template模板的内容，会**替换**掉挂载的对应的el的模板。
+ 不频繁的修改index.html

**内容直接在template中：**

```js
/*******************src/main.js****************/
//5.使用Vue进行开发
import Vue from 'vue'
new Vue({
  el: '#app',
  template: `
  <div>
    <h2>{{message}}</h2>
  </div>
  `,
  data(){
    return{
      message: 'hello webpack'
    }
  }
});
```

**将template的内容抽离到app.js文件中成组件：**

```js
/*******************src/main.js****************/
//5.使用Vue进行开发
import Vue from 'vue'
import App from "./vue/app.js"
new Vue({
  el: '#app',
  template: '<App/>',
  components:{
    App
  }
});
/*******************src/vue/app.js****************/
export default {
  template: `
  <div>
    <h2>{{message}}</h2>
    <button @click="btnClick">按钮</button>
  </div>
  `,
  data(){
    return{
      message: 'hello webpack'
    }
  }
};
```

**template的内容抽离到App.vue文件中成组件：**

```js
/*******************src/main.js****************/
//5.使用Vue进行开发
import Vue from 'vue'
import App from "./vue/app.js"
new Vue({
  el: '#app',
  template: '<App/>',
  components:{
    App
  }
});
```

```html
<!------------------index.html------------------->
<div id="app"> </div>
<!------------------src/vue/App.vue------------------->
<template>
    <div>
        <h2 class="title">{{message}}</h2>
        <Cpn></Cpn>
    </div>
</template>
<script>
    import Cpn from './Cpn';
    export default {
        name: "APP",
        components:{
            Cpn
        },
        data(){
            return{
                message: 'hello webpack'
            }
        }
    }
</script>
<style scoped>
    .title{
        color: blueviolet;
    }
</style>
<!----------------src/vue/Cpn.vue------------------->
<template>
    <div>
        <h2> {{name}}</h2>
    </div>
</template>
<script>
    export default {
        name: "Cpn",
        data() {
            return{
                name:'cpn组件name'
            }
        }
    }
</script>
```



#### **.vue文件封装的处理**

+ npm install vue-loader vue-template-compiler --save-dev   

+ vue-loader：.vue文件的加载；

+ vue-template-compiler：.vue文件的编译 

#### 打包项目出错错误

+ runtime-only：代码中，不可以有任何的template

+ runtime-complier：代码中可以有template，因为有compiler可以用于编译template

#### webpack.config.js中配置vue

```js
module:{
    rules: [
     {
        test: /\.vue$/,
        //vue-loader必须配置另一个插件，或用低版本,改package.json"vue-loader": "^13.0.0",
        use:['vue-loader']
      }
    ]
},
resolve:{
    //配置省略后缀
    extensions:['.js','.vue','.css'],
        //alias别名
        alias:{
            // 当import Vue from 'vue' 时，先看下vue有没有指向具体的某个文件夹，这样就不会按默认的方式找某个文件了，会按照文件夹的路径去找
            'vue$':'vue/dist/vue.esm.js'//选的时runtime-compiler而不是runtime-only
        }
}
```

## 六、webpack的plugin

### 6.1.认识plugin

+ 给打包文件一些说明信息

### 6.2.添加版权

```js
/**********webpack.config.js**********/
//依赖webpack
const webpack=require('webpack');// 用于访问内置插件
module.exports={ 
  plugins:[
      new webpack.BannerPlugin('最终版权HHHH'),//dist/bundle.js下会多版权信息
  ],
};
```

### 6.3.打包html

+ 当前的index.html是放根目录下，但是发布的是dist文件夹，所以应该将index.html文件打包到dist文件夹中
+ npm install html-webpack-plugin --save-dev

```js
/**********webpack.config.js**********/
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={ 
 output:{//出口
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
   // publicPath:'dist/'
  },
  plugins:[
       new HtmlWebpackPlugin({
        template: 'index.html' //根据这个模板生成dist中的index
      }),
  ],
};
//index.html文件不需要导入js,只要<div id="app"> </div>
```

### 6.4.js压缩

+ npm install uglifyjs-webpack-plugin@1.1.1 --save-dev

```js
/**********webpack.config.js**********/
const UglifyjsWebpackPlugin=require('uglifyjs-webpack-plugin')
module.exports={ 
  plugins:[

        new UglifyjsWepackPlugin(),

  ],
};
```

## 七、搭建本地服务器

+ webpack-dev-server

  + npm install --save-dev  webpack-dev-server@2.9.1

+ webpack.config.js配置

  ```js
  /**********webpack.config.js**********/
  devServer:{
      contentBase:'./dist',
      inline:true
  }
  ```

+ 没有在全局安装webpack-dev-server，只在局部安装，没有配置又在终端执行时，使用路径命令 

  ```cmd
   .\node_modules\.bin\webpack-dev-server
  ```

+ package.json配置

  +  --open表示运行程序不需要再自己点链接就自己运行 
  + npm run dev运行

  ```json
  "scripts": {
  	"dev": "webpack-dev-server --open" 
  }
  ```

## 八、配置文件的分离

+  开发阶段不建议使用UglifyjsWepackPlugin进行js压缩，一旦压缩，在浏览器中不好调试，发布才需要； 
+  编译打包发布时，这个devServer:{contentBase:'./dist',inline:true }不需要，只在开发阶段需要 ， 所以要做webpack.config.js配置文件分离 
+  新建build文件，build文件下新建  base.config.js、dev.config.js 、 prod.config.js 
+  开发：base.config.js+dev.config.js 
+  生产：base.config.js+prod.config.js
+  文件合并：  npm install webpack-merge --save-dev 

```js
/**********dev.config.js **********/
const webpackMerge=require('webpack-merge');
const baseConfig=require('./base.config');

module.exports=webpackMerge(baseConfig,{
  devServer:{
    contentBase:'./dist',
    inline:true
  }
});
```

```js
/**********prod.config.js  **********/
const UglifyjsWepackPlugin=require('uglifyjs-webpack-plugin');
const webpackMerge=require('webpack-merge');
const baseConfig=require('./base.config');

module.exports=webpackMerge(baseConfig,{
  plugins:[
    new UglifyjsWepackPlugin()
  ],
});
```

```js
/**********base.config.js **********/
const path =require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
  entry:'./src/main.js',//入口
  output:{//出口
    path:path.resolve(__dirname,'../dist'),//是要一个绝对路径，要动态获取路径  resolve：可以拼接  __dirname：node上下文中的全局变量，当前webpack.config.js所在的路径
    filename:'bundle.js',
    // publicPath:'dist/'
  },
  module:{
    rules: [
      {
        //匹配
        test: /\.css$/,
        //css-loader只负责将css文件进行加载，不负责帮你解析，也不复杂帮你把css放在html里帮你生效
        //要再安装一个style-loader
        //style-loader负责将样式添加到DOM中
        //使用多个loader时，是从右向左
        use: [ 'style-loader','css-loader' ]
      },
      {
        //匹配
        test: /\.less$/,
        //  use: ['style-loader','css-loader', 'less-loader']
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            //当加载的图片，小于limit时，会将图片编译成base64字符串形式
            //当加载的图片，大于limit时，会使用file-loader模块对图片进行加载，直接安装就好>npm install file-loader --save-dev
            options: {
              limit: 200,            //img/name  打包出来的名字直接叫name.png；  img/name/ img文件夹下创建name文件夹  变量要用[],ext原来的扩展名
              name:'img/[name].[hash:8].[ext]'
            },

          }
        ]
      },
      {
        test: /\.js$/,
        //exclude：排除
        //include：包含
        //只需要转化src这个文件，这个node_modules|bower_components文件不需要转化
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            //配置， ['@babel/preset-env']会去找babel-preset-env文件，但是我们没有下
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        //vue-loader必须配置另一个插件，或用低版本,改package.json"vue-loader": "^13.0.0",
        use:['vue-loader']
      }
    ]
  },
  resolve:{
    //配置省略后缀
    extensions:['.js','.vue','.css'],
    //alias别名
    alias:{
      // 当import Vue from 'vue' 时，先看下vue有没有指向具体的某个文件夹，这样就不会按默认的方式找某个文件了，会按照文件夹的路径去找
      'vue$':'vue/dist/vue.esm.js'//选的时runtime-compiler而不是runtime-only
    }
  },
  plugins:[
    new webpack.BannerPlugin('最终版权HHHH'),
    new HtmlWebpackPlugin({
      template: 'index.html' //根据这个模板生成dist中的index
    }),
  ],

};
```

+ package.json配置

```json
{
  "scripts": {
    "build": "webpack --config ./build/prod.config.js",
    "dev": "webpack-dev-server --open --config ./build/dev.config.js"
  },
}
```





> [Webpack入门-学习总结](http://www.woc12138.com/article/45)

