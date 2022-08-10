---
title: vue.config.js配置
tags:
  - Vue 
categories:
  - Vue
---





```js
// vue.config.js
const path = require('path');
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
    /*公共路径,不要直接修改 webpack 的 output.publicPath。默认'/'*/
    publicPath: process.env.NODE_ENV === 'production' ? '/site/vue-demo/' : '/', 
    /* 输出文件目录：在npm run build时，生成文件的目录名称。不要修改 webpack 的output.path。默认'dist' */
    outputDir: process.env.outputDir || 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。默认'' */
    assetsDir: "assets",
    /*指定生成的 index.html 的输出路径,(相对于 outputDir),默认index.html*/
    indexPath: 'index.html' ,
    /**默认，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，
     * 如生成的图片名：bg-1.1f04df6c.jpg
     * 设为 false 可关闭文件名哈希，让原来的文件名不改变。*/
    filenameHashing:true,

    /* 代码保存时进行eslint检测，默认default*/
    lintOnSave: true,
    /* 是否使用包含运行时编译器的 Vue 构建版本,
       但是这会让你的应用额外增加 10kb 左右,默认false   */
    runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度,默认false */
    productionSourceMap: false,
    /*是否为 Babel 或 TypeScript 使用 thread-loader。默认该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。*/   
    parallel: require("os").cpus().length > 1, 
    /*配合weboack，简单的配置方式*/
    configureWebpack: config => {
        /**开启 gzip 压缩
         * 需要 npm i -D compression-webpack-plugin@5.0.1。。最新高版本会有问题*/ 
        const plugins = [];
        if (IS_PROD) {
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        }
        config.plugins = [...config.plugins, ...plugins];
    },
    /**配置别名 */
    /*
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                assets: path.resolve(__dirname, "src/assets"),
            },
        },
    },
    */
    /*配合weboack，链式操作*/
    chainWebpack: config => {
        /*修复热更新失效*/
        config.resolve.symlinks(true);
        /*如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中*/
        config.plugin("html").tap(args => {
            /*修复 Lazy loading routes Error*/ 
            args[0].chunksSortMode = "none";
            return args;
        });
         /**配置别名 */
        config.resolve.alias 
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@store', resolve('src/store'));
        /**压缩图片
         * 需要 cnpm i -D image-webpack-loader，需要淘宝镜像安装*/
        config.module
            .rule("images")
            .use("image-webpack-loader")
            .loader("image-webpack-loader")
            .options({
            mozjpeg: { progressive: true, quality: 65 },
            optipng: { enabled: false },
            pngquant: { quality: [0.65, 0.9], speed: 4 },
            gifsicle: { interlaced: false },
            webp: { quality: 75 }
        });
    },
    css: {
        extract: IS_PROD,
        requireModuleExtension: false,// 去掉文件名中的 .module
        loaderOptions: {
            // 给 less-loader 传递 Less.js 相关选项
            less: {
                // `globalVars` 定义全局对象，可加入全局变量
                globalVars: {
                    primary: '#333'
                }
            }
        }
    },
    /*所有 webpack-dev-server 的选项都支持*/
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        host: "localhost",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        hotOnly: true, // 热更新
        // proxy: 'http://localhost:8080'  // 配置跨域处理,只有一个代理
        proxy: { //配置多个跨域
            "/api": {
                target: "http://172.11.11.11:7071",
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    "^/api": "/"
                }
            },
            "/api2": {
                target: "http://172.12.12.12:2018",
                changeOrigin: true,
                //ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    "^/api2": "/"
                }
            },
        }
    }
}
```



## 图片路径问题

进入http://127.0.0.1:5500/youhua/dist/index.html不显示

1、

```
publicPath:'./'
//router
没有设置base

点击切换到/index页面，链接变成：http://127.0.0.1:5500/index

<img src="~@/assets/img/pic/prize1-1.png" alt=""/>
打包后路径为：
<img src="assets/img/prize1-1.d889428e.png" alt="">//==>http://127.0.0.1:5500/assets/img/prize1-1.d889428e.png , 404

//图片的正确路径应该是：
==>http://127.0.0.1:5500/youhua/dist/assets/img/prize1-1.d889428e.png
```

2、

```
publicPath:'./'
//router
base:'/youhua/dist'

点击切换到/index页面，链接变成：http://127.0.0.1:5500/youhua/dist/index

<img src="~@/assets/img/pic/prize1-1.png" alt=""/>
打包后路径为：
<img src="assets/img/prize1-1.d889428e.png" alt="">//==>http://127.0.0.1:5500/youhua/dist/assets/img/prize1-1.d889428e.png,这时图片路径正确
```

3、

```
publicPath:'/youhua/dist/'
//router
没有设置base

点击切换到/index页面，链接变成：http://127.0.0.1:5500/index

<img src="~@/assets/img/pic/prize1-1.png" alt=""/>
打包后路径为：
<img src="/youhua/dist/assets/img/prize1-1.d889428e.png" alt="">//==>http://127.0.0.1:5500/youhua/dist/assets/img/prize1-1.d889428e.png,这时图片路径正确
```





## history模式的刷新问题404

[官方解释](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)













> 学习转自：
>
> [官方文档](https://cli.vuejs.org/zh/config/#vue-config-js)
>
> [Vue CLI4 Vue.config.js标准配置](https://www.jb51.net/article/188130.htm)

