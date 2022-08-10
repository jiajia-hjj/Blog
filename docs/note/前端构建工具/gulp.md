---
title: gulp笔记
tags:
  - 构建工具
categories:
  - 构建工具
---

## 一、**是什么gulp**

+ 前端构建工具。
+ 项目开发完成，部署到线上，为了加快网站访问速度，会将如javascript/html/image/css进行合并压缩。
+ 以前没有构建工具时，都是手动来做。繁琐、浪费时间、不需要动脑。
+ 现在将这些操作编写成一个一个的任务。想做某个操作时，在命令行中操作，执行一个命令。任务就自动执行。如，敲一个命令，css代码自动压缩。

## 二、**能做什么**

+ HTML、CSS、JS文件合并压缩
+ 语法转换（es6->es5，less->css）
+ 公共文件抽离
+ 修改文件浏览器自动刷新。

##  三、**使用步骤**

+ 安装gulp
+ 配置文件(根目录下)：
  + 初始化packge.json文件：执行`npm init`  初始化
  + gulpfile.js
+ 重构项目文件
  + src--源代码文件夹
  + dist--构建后的文件夹
+ 在gulpfile.js文件中编写任务
+ 在命令行工具中执行gulp任务

## 四、安装

+ 依赖于node，安装node。
+ 安装glup

```cmd
#全局安装
npm install gulp -g
#局部安装
cd 对应目录
npm install gulp@版本号 --save-dev
```

## 五、**gulpfile.js文件**

### 5.1.gulp中提供的方法

+ gulp.task()：建立gulp任务
+ gulp.src：获取任务要处理的文件。。内存中处理。处理好了输出硬盘中
+ gulp.dest()：输出文件的目的地
+ gulp.watch()：监控文件的变化
+ .pipe()：处理，管道流，接通源头文件与目标文件的输出

### 5.2.插件

+ gulp-htmlmin：html文件压缩
+ gulp-csso：压缩css
+ gulp-babel：js语法转换->es5
+ gulp-less：less->css
+ gulp-uglify：压缩混淆js
+ gulp-file-include：公共文件包含
+ browsersync：浏览器实时同步
+ gulp-watch：监控文件变化（自带的gulp.watch()无法监听到新增加的文件，这个模块可以）

**插件的使用套路**：查[官网](https://gulpjs.com/plugins/)、[npm官网](https://www.npmjs.com/)，下载->引入->调用

### 5.3.编写任务

```js
/*****************gulpfile.js***************/
const gulp=require('gulp'); //引用gulp
const htmlmin = require('gulp-htmlmin');//html文件代码压缩操作
const fileinclude = require('gulp-file-include');//抽取公共部分
const sass = require('gulp-sass')(require('sass'));//sass语法转换
const csso = require('gulp-csso');//gulp压缩css文件
const babel = require('gulp-babel');//es6代码转换
const uglify = require('gulp-uglify');　//引用压缩Js插件
const connect=require('gulp-connect');//引入gulp-connect模块
/*
* 使用gulp.task建立任务
* 参数1：任务的名称
* 参数2：任务的回调函数
* */
gulp.task('first',()=>{
    console.log('第一个任务');
    //1、使用gulp.src获取要处理的文件
    gulp.src('./src/css/base.css')
        //处理的代码，要写在pipe()
        //2、将处理后的文件输出到dist目录中
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())

})
/*
* html任务
* 1.html文件代码压缩操作
* 2.抽取html文件中的公共代码
* */
gulp.task('htmlmin', (done) => {
    gulp.src('./src/*.html')
        //抽取公共部分
        .pipe(fileinclude())
        //压缩html文件中的代码
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
    done()
})

/*
* css任务
* 1.sass语法转换
* 2.css代码压缩操作
* */
gulp.task('cssmin', (done) => {
    gulp.src(['./src/css/*.scss','./src/css/*.css'])
        //将sass语法转为css语法
        .pipe(sass())
        //将css代码进行压缩
        // .pipe(csso())
        //将处理的结果进行输出
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
    done();
})
/*
* js任务
* 1.es6代码转换
* 2.js代码压缩
* */
gulp.task('jsmin', (done) => {
    gulp.src('./src/js/*.js')
        //将es6转为es5
        .pipe(babel({
            //它可以判断当前代码的运行环境，将代码转换为当前运行环境所支持的代码
            presets: ['@babel/env']
        }))
        //将js代码进行压缩
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
    done();
})

/*
* 复制文件夹
* */
gulp.task('copy', (done) => {
    gulp.src('./src/img/**')
        .pipe(gulp.dest('./dist/img'))
        .pipe(connect.reload())
    done()
})

/*
* 创建服务
* */
gulp.task('serve', ()=>{
    connect.server({
        root:'./dist',　　//使用前面定义的rootPath作为服务器运行的根目录
        livereload:true,　　//是否自动监听，true表明自动监听
        port:3056　　　　//服务器的端口号，可以随便取一个
    });
    // gulp.src('./dist/pc.html')
    //     .pipe(open({url:'http://localhost:3056'}));
});

/*
* watch监听，不需要在cmd中重复执行gulp xxx
* */
gulp.task('watch',()=>{
    //需要使用 done 回调
    gulp.watch('./src/*.html', gulp.parallel('htmlmin'));
    gulp.watch('./src/css/*', gulp.parallel('cssmin'));
    gulp.watch('./src/js/*.js', gulp.parallel('jsmin'));
    gulp.watch('./src/img/*/*', gulp.parallel('copy'));
});

//构建任务,一次执行多个任务。4.0这个写法会报错：
// gulp.task('default',['htmlmin','cssmin','jsmin','copy'],function() {
//     console.log("一次执行多个任务成功")
// })
//4.0写法：parallel 同时执行，series 按顺序---这个需要使用 done 回调,如copy任务
gulp.task("default", gulp.parallel('htmlmin', 'cssmin', 'jsmin', 'copy','watch','serve', function () {
	console.log("一次执行多个任务成功")
}))

```

### 5.4.执行gulp命令

+ 命令行gulp-cli工具，全局安装：

```cmd
#安装。-g,当前项目需要用，其他项目也需要用
npm install gulp-cli -g
#使用
gulp 任务名
```



## 六、其他

+ **`*`** (一个星号)，匹配一级(单层)文件。
+ `**` (两个星号)，匹配任意数量的字符(文件)，多个(两层以上嵌套)或零个匹配
+ `series()` 和 `parallel()`，允许将多个独立的任务组合为一个更大的操作。这两个方法都可以接受任意数目的任务（task）函数或已经组合的操作。
+ `series()`：使任务（task）按顺序执行。
+ `parallel()`：以最大并发来运行的任务（tasks）。
+ `series()`：任何一个任务（task）的错误将导致整个任务组合结束，并且不会进一步执行其他任务。
+ `parallel()`：一个任务的错误将结束整个任务组合的结束，但是其他并行的任务（task）可能会执行完，也可能没有执行完。



> 学习：
>
> [黑马2020最新 Gulp + 模块化开发](https://www.bilibili.com/video/BV1H54y1y7E7?p=9&spm_id_from=pageDriver)
>
> https://www.cnblogs.com/hymenhan/p/14245949.html
>
> https://blog.csdn.net/CDSNshabi/article/details/115164534
>
> https://www.jianshu.com/p/3f62beb3a57b



