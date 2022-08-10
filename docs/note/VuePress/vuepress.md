---
title: vuepress
tags:
  - vuepress
categories:
  - vuepress
---

## 01.基础环境

+ git（版本管理）
+ cmder（可选的命令行工具，自行下载尝试）
+ node（核心）
+ yarn（npm包管理的替代）
+ vscode（编辑器）

## 02.初试vuepress

+ 创建Github账号
+ 创建项目
+ 初体验vuepress
+ [默认主题的首页](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5)

## 03.导航栏

+ 了解目录结构的约定
+ 页面路由的映射规则
+ 导航栏的配置（全局、文件）   ===>config.js/themeConfig.nav

## 04.侧边栏

+ 适合介绍页与博客的两种形式（数组与对象）===>config.js/themeConfig.sidebar

## 05.SEO

```js
//docs/.vuepress/config.js
title: "网站的标题",
description: "网站的描述信息",
head:{
    //favicon.ico,网站https://favicon.io/生成
    ["link", { rel: "icon", href: "/favicon.ico" }],
    //作者    
    ["meta", { name: "author", content: "HJJ" }],
    //关键字    
    ["meta", { name: "keywords", content: "关键字" }],
}

```

## 06.更新时间

+ 基于git提交时间
+ [配置](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E6%9C%80%E5%90%8E%E6%9B%B4%E6%96%B0%E6%97%B6%E9%97%B4)、修改文字测试
+ 时间格式 插件[moment](http://momentjs.cn/)

## 07.发布到github.io

+ 指向github仓库

```cmd
# 克隆下来
git clone git@github.com:jiajia-hjj/test.git
# 从远程建立联系
git remote add origin git@github.com:jiajia-hjj/test.git
```

+ 修改base 。。。部署到[github pages](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)

```js
//docs/.vuepress/config.js
  base: "/docs/",
```

+ 新增部署文件（ deploy.sh ）===>根目录下  

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:jiajia-hjj/docs.git master:gh-pages

cd -
```

```json
//package.json
"scripts": {
    "deploy": "bash deploy.sh",
},
```

+ 验证gh-pages

```cms
yarn deploy
```

gh-pages分支——>settings->Pages----->GitHub Pages---->点开链接

+ 设置website，便于他人访问

设置标标--->（Edit repository details）

## 08.自定域名

+ 增加 CNAME
+ DNS解析
+ 改回base

## 09.启用PWA

+ 更新提示，离线可访问

  可以添加到主屏幕，利用manifest实现

  可以实现离线缓存，利用service worker实现

  可以发送通知，利用service worker实现

```js
 //config.js的plugins中配置
 "@vuepress/pwa": {
    serviceWorker: true,
    updatePopup: {
      message: "发现新内容可用",
      buttonText: "刷新",
    },
  },
```

+ 配置manifest和icons

   https://blog.csdn.net/lecepin/article/details/101166426

  [生成manifest.json](https://app-manifest.firebaseapp.com/)

  [生成icons](https://lp-pwa.gitee.io/pwa-genicon/) 

  manifest.json是从vuepress那边复制过来修改的

```json
{
    "name": "HHH",//名字
    "short_name": "LLLL",//简称
    "icons": [
      {
        "src": "/docs/icons/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/docs/icons/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "start_url": "/index.html",
    "display": "standalone",
    "theme_color": "#2196f3",
    "background_color": "#2196f3"
  }
```

+ 配置head links

```js
head:{  
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon-152x152.png" },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }]
}
```

+ 开发者工具Appllication验证

## 10.vssue评论

+ valine切换到vssue
+ vssue单页面使用

要先创建 [支持的代码托管平台 - 创建 OAuth App](https://vssue.js.org/zh/guide/supported-platforms.html)  

1. [创建 GitHub OAuth App](https://vssue.js.org/zh/guide/github.html)

2. 安装

```cmd
# 安装
yarn add @vssue/vuepress-plugin-vssue
yarn add @vssue/api-github-v4
```

3. 配置config

```js
// .vuepress/config.js
const secret = require("./secret");
plugins: {
  "@vssue/vuepress-plugin-vssue": {
    // 设置 `platform` 而不是 `api`
    platform: "github-v4",

    // 其他的 Vssue 配置
    owner: "jiajia-hjj",//使用者
    repo: "docs",
    clientId: secret.clientId,
    clientSecret: secret.clientSecret,
    autoCreateIssue: true,
  },
},
    
//secret
module.exports={
    clientId: "35497241f274868c06ca",
    clientSecret: "dfedfa2f44ca6709229ab5fcee012e30cec8f345",
    ga: 'UA-226867381-1' 
}    
```

5. 使用

```
<Vssue  />
```

+ 自动创建评论

```js
autoCreateIssue: true
```

+ vssue全局使用  [开发主题](https://vuepress.vuejs.org/zh/theme/writing-a-theme.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)

  去vuepress把`docs\.vuepress\theme\layouts`和`docs\.vuepress\theme\util`拷贝下来

```vue
<!--修改docs\.vuepress\theme\layouts-->
<template #bottom>
<slot name="page-bottom" />
<Vssue class="theme-default-content " :options="{ locale: 'zh' }" />
</template>
```



```js
// .vuepress/theme/index.js
module.exports = {
    extend: '@vuepress/theme-default'
}
```



## 14.back to top

[back-to-top 插件](https://vuepress.vuejs.org/zh/plugin/official/plugin-back-to-top.html)

```js
"@vuepress/back-to-top": true
```

## 12.google analytics

+ 谷歌分析账号注册、登录
+ 创建媒体资源
+ 安全插件[@vuepress/plugin-google-analytics](https://vuepress.vuejs.org/zh/plugin/official/plugin-google-analytics.html#%E4%BD%BF%E7%94%A8)

## 13.分割config

+ 配置太多太乱

+ 分割项：head、plugins、nav、sidebar
+ 插件[vuepress-plugin-auto-sidebar](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/)

## 14.保护隐私

+ 小心github
+ `.env`
+ `.gitignore`  如上面的secret，然后通过ignore

## 15.Markdown 用法进阶

+ 看[文档](https://vuepress.vuejs.org/zh/guide/markdown.html#header-anchors)
+ 封装`coutUp.js`为Vue组件

```
<!--docs\.vuepress\components\Countup.vue-->
```

+ 代码引人

```
<Countup :endVal="2020"/>
```

引入代码段，显示高亮代码

```
<<< @/docs/.vuepress/components/Countup.vue
```



## 16.自动化部署 Travis-CI /github actions

[**Travis-CI**](https://www.travis-ci.com/?_gl=1%2A1gdgtpa%2A_ga%2AMTk3NjExMjc2Ni4xNjUwNzg4NTY2%2A_ga_XRYGSZFQ0P%2AMTY1MDc4ODU2Ny4xLjEuMTY1MDc4OTQ0My4yMA..)

+ 新增`.travis.yml`
+ 补充cname脚本
+ 启动Travis-CI
+ 获取GITHUB_TOKEN
+ 扩展：webpack的DefinePlugin完成环境变量注入

[**github actions**](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)

ACCESS_TOKEN：settings--->Developer settings——>Personal access tokens

secrets.ACCESS_TOKEN：settings--->secrets——>Actions ——>New repository secret

```yml
#.github\workflows\ic.yml
name: Build and Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: vuepress-deploy
      uses: jenkey2011/vuepress-deploy@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        # TARGET_REPO: username/repo
        TARGET_BRANCH: gh-pages
        BUILD_SCRIPT: yarn && yarn install && yarn docs:build
        BUILD_DIR: docs/.vuepress/dist
        CNAME: yarn cname
```

git提交后，项目文件下——>Actions

## 17.逼格徽章 

https://shields.io/

```md
[![GitHub stars](https://img.shields.io/github/stars/jiajia-hjj/docs)](https://github.com/jiajia-hjj/docs/stargazers)
![Custom badge](https://img.shields.io/static/v1?label=你好&message=<MESSAGE>&color=green)
```



## 18.图片缩放

+ 引入图片的两种方式

```md
<img class="custom" :src="$withBase('/favicon.ico')" alt="favicon">

![favicon.ico](/favicon.ico)
```

+ 所有图片缩放 插件 [plugin-medium-zoom](https://vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html)
+ 指定类缩放。。加上一个类`custom`就指定缩放

```js
// config.js
plugins:{
    "@vuepress/medium-zoom": {
        selector: "img.custom",
            // medium-zoom options here
            // See: https://github.com/francoischalifour/medium-zoom#options

    },
}
```

## 19.自动生成侧边栏

插件 [vuepress-plugin-auto-sidebar](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/)

## 20.algolia 替换默认搜索

+ [vuepress自带的搜索](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%86%85%E7%BD%AE%E6%90%9C%E7%B4%A2)
+ 申请[algolia](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#algolia-%E6%90%9C%E7%B4%A2)，等待邮件即可
+ 也有可能收到一封婉拒的拒绝信
+ algolia的缺陷：手动、记录上、单页面内容多会失败
