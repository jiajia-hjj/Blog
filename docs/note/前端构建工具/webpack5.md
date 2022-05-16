---
title: webpack5笔记
tags:
  - 构建工具
categories:
  - 构建工具
---
## 一、五个概念

+ entry：哪个文件为入口起点开始打包
+ output：输出的资源到哪里去，叫什么名字
+ loader：翻译官，webpack只能处理js代码，其他要交给loader来处理。
+ plugins，插件，执行范围更广的任务，如压缩
+ mode。开发模式(development)：本地可以运行就可以，生产模式(production)：代码优化上线

## 二、执行打包

**1.纯命令行**

```cmd
# 安装。不加版本号默认安装最新版本
npm install webpack webpack-cli  --save-dev

#webpack4
# 打包之前需要npm init初始化
#webpack会以 ./src/main.js 为入口文件开始打包，打包输出到 ./dist/bundle.js  
#整体打包环境是开发环境
webpack  ./src/main.js -o ./dist/bundle.js --mode=development
#整体打包环境是开发环境
webpack  ./src/main.js -o ./dist/bundle.js --mode=production

#webpack5  
#默认入口文件./src/index/js  默认输出文件.dist/main.js
#没有进行配置，src中没有index.js执行打包会报错,
webpack
#可以在命令行中配置  --output-path 输出文件夹的目录，文件还是mian.js。。。需要后续去配置文件中修改
webpack --entry ./src/main.js  --output-path ./dist
```

**2.package.json中添加配置**

```json
"scripts": {
    "build": "webpack --entry ./src/main.js  --output-path ./dist"
}
```

后续直接命令行直接执行 **npm run bulid**

**3.webpack.config.js中添加配置**

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
    	path:'./dist',
        filename:'bundle.js'  //输出的文件名  
	}
}
```

修改package.json中配置

```
"scripts": {
    "build": "webpack"
}
```

后续直接命令行直接执行 **npm run bulid**		

### 修改配置文件名称

```json
"scripts": {
    "build": "webpack --config lg.webpack.js"
}
//lg.webpack.js:webpack.config.js名字改了
```

##  三、loader

+ 顺序：从右往左，从下往上

+ 只有一个loader时，支持字符串写法

```js
{
    test:/\.css$/,
    loader:'css-loader'
}
```

## 四、plugin

**和loader区别**

+ loader 特定模块类型进行转换 读取文件内容时工作

+ plugin 做更多的事情，任意时期是都可以做。。。每个插件的核心就是一个类

**使用**

```js
const {CleanWebpackPlugin}=require('clean-webpack-plugin')//自动清除
const HtmlWebpackPlugin=require('html-webpack-plugin')//模板
const {DefinePlugin}=require('webpack')//定义常量插件
const CopyWebpackPlugin=require('copy-webpack-plugin')//拷贝插件，静态资源目录，只是拷贝过去
module.exports ={
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'学习webpack',
            template:'./public/index.html'
        }),
        new DefinePlugin({
            BASE_URL:'"./"' // ====>'"./"'==>'./'   './'==>./
        }),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from:'public',//to省略，会自己去找output配置中的path
                    globOptions:{//忽略不拷贝的内容
                        ignore:['**/index.html']//加'**/'，表示从from下面查找，不写会报错
                    }
                }
            ]
        })
    ]
}
```

## 五、browserslistrc

### 5.1.问题

**1、如何实现兼容:**

+ 兼容处理工具...(需要处理兼容性，有工具不需要手动处理，工具有了，但是具体要兼容哪些平台)

**2、到底兼容哪些平台：**

+ 浏览器市场占有率网站：[caniuse.com](caniuse.com)

### 5.2.browserslist

+ 有个工具:browserslist，默认安装webpack，就被安装好了，内部有caniuse-lite工具。
+ 兼容条件给完之后，这个工具会返回响应满足条件的浏览器平台
+ **工作原理：**moudele browserslist工作时->调用caniuse-lite，去请求一份数据，基于当前写的条件如兼容市场占有率>1%，返回满足条件的浏览器平台。然后结合加到webpack中的工具，对这些选中的平台进行兼容

### 5.3.配置

**1、package.json**

```json
"browserslist":[
    ">1%",
    "last 2 version",
    "not dead"
]
```

**2、直接新建.browserslistr文件**

```browserslistr
>1%
last 4 version
not dead
```

**命令行测试，输出满足条件的浏览器：**

```cmd
npx browserslist
```

**条件筛选含义：**

```
default :>0.5% last 2 version ,firefox no dead
dead :废弃 24个月之内，没有官方支持，没有更新
last 2 version:最新两版本
```

## 六、postcss

### 6.1.为什么需要postcss

**是什么？**

+  利用js转换样式的工具，用来兼容选中的平台(见上)。

**原理：**

+ 首先需要要知道浏览器平台
+ 代码兼容到什么程度，取决于筛选出的浏览器平台。

### 6.2.安装插件

+ postcss：整体的工具，解析器。本质什么都不能做，要加对应的插件
+ postcss-cli：为了可以在命令行终端使用postcss命令

```cmd
#指定文件进行处理，处理完成后输出ret.css文件
npx postcss -o ret.css ./src/css/test.css    
```

+ autoprefixer：给样式加前缀的插件，包含在 postcss-preset-env中

```cmd
#--use autoprefixer 使用了autoprefixe这个插件
npx postcss --use autoprefixer  -o ret.css ./src/css/test.css
```

+ postcss-loader：像less-loader，postcss在postcss-loader之前工作，先对代码进来转换。只有这个插件不会有变化，需要插件，加参数
+ postcss-preset-env：预设->很多功能插件的集合。

### 6.3.配置

**1、webpack.config.js配置module.rules中加一条 **

```js
{
    test: /\.css$/,
    use: [
        "style-loader",//会生成style标签，内容添加到页面中
        "css-loader",
        {
            loader: "postcss-loader", 
            options: {
                postcssOptions: {
                    plugins: [
                        //require('autoprefixer'),
                        //require('postcss-preset-env')//支持直接写字符串
                        "postcss-preset-env",
                    ],
                },
            },
        },
    ];
}
```

postcss-loader不仅在处理.css文件需要，处理.less、.scss都需要，所以可以把postcss配置抽取出来。

**2、抽取出来postcss.config.js**

**webpack.config.js中**

```js
{
    test: /\.css$/,
    use: [
        "style-loader",
        "css-loader",
        "postcss-loader"
    ]
}
```

**postcss.config.js**

```js
module.exports={
    plugins:[
        'postcss-preset-env'
     ]
}
```

### 6.4.问题

**问题1：**css-loader，解析的过程会，里面可能会有又嵌套css文件，这个时候已经过了postcss-loader解析，里面的内容没有经过postcss-loader处理====>**importLoaders**，往前执行

```js
{
    loader: 'css-loader',
    options: {
        importLoaders: 1
    }
},
```

## 七、babel

### 7.1.为什么需要Babel

+ 处理js兼容
+ JSX、TS、ES6+等非es5 --->转成浏览器可识别的代码

### 7.2.安装插件

+ @babel/core：安装核心，默认情况下什么也转不了，需要特殊语法、安装特定的插件
+ @babel/cli：为了可以在命令行终端使用babel命令

```cmd
#src下所有进行处理输出到build文件中  
#===>发现用了babel,但是也没有转换，要加载工具包
npx babel src --out-dir build 
```

+ @babel/plugin-transform-arrow-functions：箭头函数转换

```cmd
#--plugins使用插件
npx babel src --out-dir build  --plugins=@babel/plugin-transform-arrow-functions
```

+ @babel/plugin-transform-block-scoping：作用域转换

```cmd
npx babel src --out-dir build  --plugins=@babel/plugin-transform-arrow-functions,@babel/plugin-transform-block-scoping
```

+ @babel/preset-env：预设->很多功能插件的集合。就不需要每次专门去安装特定的插件

```cmd
# --presets 使用预设
npx babel src --out-dir build  --presets=@babel/preset-env
```

### 7.3.配置

+ 转换不转换，根据
  + 需要兼容的浏览器配置文件中.browserslistrc...
  + 根据targets中指明浏览器.一般不用

```js
{
    test: /\.js$/,
    use:[
        {
            loader:'babel-loader',
            options:{
                presets:[
                    //'@babel/plugin-transform-arrow-functions',
                    //'@babel/plugin-transform-block-scoping'
                    '@babel/preset-env'//有了预设就不用特定插件
                ]
                /* presets:[
                      [
                          '@babel/preset-env',
                          {targets:'chrome 91'}
                      ]
                 ]*/
            }
        }
    ]
}
```

**把配置单独拎出来**

+ 文件名称可以是：
  + babel.config.js(后缀可以改 json cjs mjs)
  + babelrc.json(js)  babel7之前的写法

**webpack.config.js**

```js
{
    test: /\.js$/,
    exclude: /node_modules/,//当前需要，node_modules插件包里可能也需要。如,为了不相互影响要去掉
    use:['babel-loader']//把配置单独拎出来
}
```

**babel.config.js**

```js
module.exports={
    presets:['@babel/preset-env']
}
```

## 八、polyfilly

### 8.1.是什么

+ 填充，babel的preset-env可以转换的代码不是特别多，如promise symbol更新语法，不能帮忙做转换，所以做兼容会遇到问题，所以有polyfilly这个存在。
+ webpack5之前，不用自己处理，默认有polyfilly，webpack5优化打包速度，所以把它去掉了，我们要进行按需配置。

### 8.2.安装

+ @babel/polyfill ：--save 生产环境下也需要对它进行转换，包很大，可以去引用两个核心部分 
+ core-js：大部分的ecmascript语法
+ regenerator-runtime：generator await等新语法

### 8.3.配置

**在babel.config.js中配置**

```js
module.exports={
    presets:[
        [
            '@babel/preset-env',
            {  
                useBuiltIns:'entry' ,
                corejs:3//code-js版本是2，下载的是3,需要修改
            }
        ]
    ]
}
/**
 * 属性:useBuiltIns
 * false:不对当前的js处理做polyfill的填充
 * usage:根据用户源代码当中所使用到的新语法进行填。只管源代码。==>比较友好。
 * entry:依据筛选出来的浏览器，来决定填充什么。不管源代码有没有用，浏览器需要什么就填充什么。。。需要引入核心包
 * /
```

## 

## 九、处理图片

### 9.1.file-loader处理图片

+ 安装：file-loader url-loader。

#### 9.1.2.配置

```js
{
    test: /\.(png|svg|gif|jpe?g)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                esModule: false//不转为esModule
            }
        }
    ]
             
}
```

#### 9.1.3.问题

**问题1：**webpack5中，img标签的图片，通过require('../img/bg.png')拿。拿到的是一个对象，{default：xxxx}

处理方法：

+ 配置esModule改为false，让它直接返回资源，不要esModule
+ 通过require('../img/bg.png').default获取到图片链接
+ import oImgSrc from '../img/bg.png'

**问题2：**css中的url图片，都会被自动转为require语法。require语法会默认导出一个esModule。

处理方法：

+ 在css-loader配置参数，`esModule:false`

### 9.2.url-loader处理图片

#### 9.2.1.说明

```js
/**
* 01 url-loader 以base64，加载到文件中中。好处，减少请求次数。风险，如果文件很大。一次性请求的数据量就很大
* 02 file-loader 将资源拷贝至指定目录中，分开请求
* 03 url-loader内部其实也可以调用file-loader
* 04 limit 
*/
```

#### 9.2.2.配置

```js
{
	test: /\.(png|svg|gif|jpe?g)$/,
    use:[
        {
            loader:'url-loader',
            options:{
                name:'img/[name].[hash:6].[ext]',
                // outputPath:'img'//输出路径,可以直接再name上添加img/
                limit:70*1024//超过70kb拷贝。没有超过转base64
            }
        }
    ]
}
```

### 9.3.文件名处理

```js
/**
* [ext]:扩展名
* [name]:文件名
* [hash]：文件内容
* [contentHash]:和[hash]差不多
* [hash:<length>]
* [path]:
*/
```



## 十、webpack5 asset 处理文件



```js
/**
* 01 asset/resource  -->file-loader (输出路径)
* 02 asset/inline    --->url-loader （所以base64）
* 03  asset/source    --->raw-loader
* 04  asset（parser）
*/
```

### 10.1.处理图片

**asset/resource 和   asset/inline**

```js
{
    test: /\.(png|svg|gif|jpe?g)$/,
    type:'asset/resource',//替换成'asset/inline'
    generator:{
        filename:'img/[name].[hash:4][ext]'
    }
}
```

**asset**

```js
{
    test: /\.(png|svg|gif|jpe?g)$/,
    type:'asset',
    generator:{
         filename:'img/[name].[hash:4][ext]'
    },
    parser:{//解析
        dataUrlCondition:{
            maxSize:70*1024
        }
    }
}
```

### 10.2.处理文字

```js
{
    test: /\.(ttf|woff2?)$/,
    type:'asset/resource',
    generator:{
        filename:'iconfont/[name].[hash:3][ext]'
    }
}
```

### 10.3.管理输出目录名字

1、全局配置，不好，不同的类型需要输出不同的文件夹，如图片和字体

```js
output: {
	assetModuleFilename:'img/[name].[hash:4][ext]'
}
```

2、见上generator

## 十一、webpack-dev-server

### 11.1.界面自动更新

**不需要重新打包，文件内容修改，自动编译打包，界面自动更新：**

+ 方式一：package.json文件===>"build": "webpack --watch"

+ 方式二：webpack.config.js===>watch:true

+ 开发模式下， watch 结合VSCode的live serve插件实现自动更新。

**以上方式不足：**

+ 某个内容发生改变，所有源代码都会重新编译
+ 每次编译成功之后都需要进行文件读写
+ live serve工具是VSCode下
+ 不能局部更新（不能热更新），一个完整界面是有很多歌组件组成的，只修改一个，不希望全部更新

### 11.2.配置

**package.json**

+ webpack5之前需要写全 webpack-dev-server

```json
"scripts": {
    "serve": "webpack serves",
}
```

+ 命令行npm run serve运行
+ 没有产生 dist目录，内容都写在内存中。读写速度快。

## 十二、webpack-dev-middleware 

**原理：** 中间件，订制，开启一个服务，webpack打包后处理的资源交给服务。之后浏览器端才能访问这个服务器

**需要做的事：**

+ 开启服务 express
+ 打包后的资源交给服务器 webpack-dev-middleware

```js
/**********Server.js 开启一个服务**********/
const express =require('express')
const webpackDevMiddleware=require('webpack-dev-middleware')
const webpack =require('webpack')
const app=express()
//获取配置文件
const config=require('./lg.webpack')
const compiler=webpack(config)//可以控制webpack打包的流程。webpack包拿过来，去加载配置文件

//把打包好的交给服务器
app.use(webpackDevMiddleware(compiler))

//开启端口上的服务
app.listen(3000,()=>{
    console.log('服务运行在3000端口上')
})
```

+ 运行 node  Server.js 

## 十三、HMR功能

+ 模块热加载功能
+  一个模块发生变化，只会重新打包这一个模块。  极大提升构建速度。

**配置**

**webpack.config.js开启热加载功能**

```js
devServer:{
    //hot:true,//开启热加载功能
    hot: 'only',//如语法报错的地方，重新加载，而不是全部刷新
},
```

**模块中**

```js
import "./js/title";
if (module.hot) {
  //哪些模块开启热更新,多个是数组
  module.hot.accept("./js/title", () => {
    console.log("./js/title更新了");
  });
}
```

## 十四、处理.vue文件

+ 安装:vue 、vue-template-compiler 、vue-loader、

### 14.1.vue-loader

+ 支持vue组件的热更新
+ 版本不同配置不同，跟vue版本有关
+ vue-loader@16要跟vue3一起用
+  vue-loader15，需要手动加载插件

### 14.1.配置

**webpack.config.js，vue-loader14时，可以直接使用**

```js
{
    test:/\.vue$/,
    use:['vue-loader']
}
```

**vue-loader15时，需要再手动加载插件**

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
plugins:[
    new VueLoaderPlugin()
]
```

## 十五、路径属性path

### 15.1.output

+ path：绝对路径，打包之后资源要输出到哪目录下
+ publicPath：index.html内部的引用路径（ index.html引用的路径去哪找）

### 15.2.devServer

webpack5之前：

+ publicPath：指定本地服务所在的目录，默认'/'，项目所在的目录，最好跟output publicPath设成一样
+ contentBase: 我们打包之后的资源，如果依赖了其他的资源，此时就告知去哪里找(并不希望这个资源被打包，但是要使用)

### 15.3.配置

**webpack.config.js**

```js
const path = require('path')
output: {//出口
    /**path：
     * 是要一个绝对路径，要动态获取路径
     * resolve：可以拼接
     * __dirname：node上下文中的全局变量，当前webpack.config.js所在的路径
     */
    path: path.resolve(__dirname, 'dist'),//输出到哪个目录
    publicPath:'/',
    filename: 'js/bundle.js',  //输出的文件名
},
devServer:{
    hot: 'only',
    port:4000,//哪个端口开启服务
    open:false,//true每次自动打开浏览器
    compress:true,//开启服务gzip压缩
    historyApiFallback:true,//前端路由刷新页面为404。true，再刷新不会有这个问题

    static: {//bug,不知道是不是用错了，没反应,
        directory: path.resolve(__dirname,'asset'),
        publicPath: '/lg',
        watch: true,
    },
    // publicPath:'/lg',//webpack5不存在了,变成了static
    // contentBase:path.resolve(__dirname,'asset')//webpack5不存在了

},
```



## 十六、代理

+ 异步请求，api.com/users(跨域) 
+ 开发阶段可能存在跨域问题（后端前端再不同的服务器上开发）。生产阶段一般不存在，一般后端解决，或已经部署再同一个地方。
+ 通过代理方式来完成跨域数据请求
+ **怎么做？**服务端和服务端之间不存在跨域。webpack-dev-serve已经开启了一个服务

**配置代理：**

**webpack.config.js**

```js
devServer:{
    proxy: {
        /**分析：
         * 所有以 /api开头都走代理
         * https://api.github.com/users
         * /api/users
         * http://localhost:4000/api/users
         * 被转发到：https://api.github.com/api/users===>报错。没有/api/,所以要重写
         */
        '/api':{
           	 	target:'https://api.github.com',
                pathRewrite:{
                    '^/api':''
                },
                changeOrigin:true//修改host值
        } ,
    },

}
```

页面请求

```js
import axios from "axios";
axios.get("/api/users").then((res) => {
  console.log(res.data);
});
```



## 十七、resolve

+ 模块解析
+ 相对路径 绝对路径 模块名称

**相对路径解析规则**

+ 路径确定了，判断后面是文件夹还是文件
+ 如果是文件夹会根据 `mainFiles: ['index']` 去补全。补全完再在根据下面文件查找方式查找。
+ 如果是文件，看文件后缀名是什么。有明显后缀名，直接打包。没有后缀名，去**extensions**中去补充的操作，extensions中找到补充，没找到报错。

### 17.1.配置

**webpack.config.js**

```js
resolve: {
    extensions: ['.js', '.json', '.wasm','.vue'],//配置省略后缀名
    alias:{//起别名
        '@':path.resolve(__dirname,'src')
    }
},
```

**起别名之后**

```js
//import Home from "./components/Home.vue"
import Home from "@/components/Home";
```

## 十八、devtool

+ eval：报错得文件是打包之后得文件..没法快速调试。development模式下会把devtool改成eval。

+ source-map：一种映射得技术，再调试时可以定位到源代码中的信息，可以快速调错

+ eval-source-map

+ inline-source-map

+ cheap-source-map

+ cheap-module-source-map

+ hidden-source-map

+ nosource-source-map

**source-map组合写法**

`[inline-|hidden-|eval-]`:

+ source-map文件怎么产出。

+ inline-：产出base64，放文件的最后面
+ eval-：每个模块放eavl后面
+ hidden：.map文件存在又不希望默认加载进来，不能直接定位源文件

`[nosources]`：没有源文件，又有报错信息

`[cheep-|[module-]]`：

+ cheep- 只提供行信息，减少消耗

+ module- 对loader更友好。是源码信息。没有加module-，是转换过的

 `source-map`

## 十九、区分打包环境

**package.json**

```json
"scripts": {
    "build2": "webpack --config config/webpack.common.js --env production",
    "serve2": "webpack serve --config config/webpack.common.js --env development"
},
```

### 19.1.新建配置文件夹config

**webpack.common.js**

```js
const {merge}=require('webpack-merge')//合并插件
//导入其他的配置
const prodConfig=require('./webpack.prod')
const devConfig=require('./webpack.dev')
// 定义对象保存 base 配置信息
const commonConfig={
    //配置的内容
}

module.exports = (env) => {
  //env 获取环境关键字
  const isProduction = env.production;

  //依据当前的打包模式来合并配置
  const config= isProduction? prodConfig:devConfig

  const mergeConfig=merge(commonConfig,config)
  return mergeConfig
};
```

**webpack.dev.js**

```js
module.exports={
    // watch:true,
    mode:'development',
    devtool:'source-map',
    target:'web',
    devServer:{
        hot: 'only',
        port:8000,//哪个端口开启服务
        open:false,//true每次自动打开浏览器
        compress:true,//开启服务gzip压缩
        historyApiFallback:true,
        proxy: {
            '/api':{
                target:'https://api.github.com',
                pathRewrite:{
                    '^/api':''
                },
                changeOrigin:true//修改host值
            } ,
        },
    }
}
```

**webpack.prod.js**

```js
const CopyWebpackPlugin=require('copy-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
module.exports={
    mode:'production',
    plugins:[
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from:'public',
                    globOptions:{
                        ignore:['**/index.html']
                    }
                }
            ]
        })
    ]
}
```

### 19.2.处理路径问题

**paths.js**

```js
const path=require('path')
//应用所在的根
const appDir=process.cwd()

console.log('----------------------->'+appDir)

const resolveApp=(relativePath)=>{
    //应用所在的根和你想找的地方进行结合
    return path.resolve(appDir,relativePath)
}

module.exports=resolveApp
```

**webpack.common.js**

```js
// const path = require("path");
const resolveApp=require('./paths');

entry: "./src/main.js",//反而没有报错（相对路径context）.默认是去找package.json中的 build2
// context:path.resolve(__dirname, "./"),//打包的上下文，path.resolve(__dirname, "./")指向config里面,一加路径全错
output: {
    //path: path.resolve(__dirname, "../dist"),//__dirname是config文件位置
     path:resolveApp('./dist'),
     filename: "js/bundle.js",
},
resolve: {
    alias: {
        // "@": path.resolve(__dirname, "../src"),//如果嵌套多，比较麻烦，，所以把它拎出去
        "@":resolveApp('./src')
    },
},
```



> 学习：
>
> https://www.bilibili.com/video/BV1iv411N7jg?from=search&seid=4107860997805844315&spm_id_from=333.337.0.0
