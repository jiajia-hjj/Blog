---
title: npx
tags:
  - 前端工具
categories:
  - 前端工具
---

# npx

> npm v5.2.0引入的一条命令（npx），提升了开发者使用包内提供的命令行工具的体验。

## 一、**调用项目安装的模块**

**安装webpack：**

```
npm i -D webpack
```

**调用项目内部的webpack：**

```cmd
# 项目的根目录下执行
./node_modules/.bin/webpack -v
```

**有了 npx，只需要这样：**

```cmd
npx webpack -v
#npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！
```

## 二、避免全局安装模块

+ 如`create-react-app`这个模块是全局安装，npx 可以运行它，而且不进行全局安装。

**老方法：**

```cmd
npm install -g create-react-app
create-react-app my-app
```

**npx方式：**

```cmd
npx create-react-app my-app
#这条命令会临时安装 `create-react-app` 包，命令完成后`create-react-app` 会删掉，不会出现在 global 中。下次再执行，还是会重新临时安装。
```

## 三、使用不同版本的 node

```cmd
npx node@0.12.8 -v
#npx 可以下载模块，上面命令会使用 0.12.8 版本的 Node 执行脚本。原理是从 npm 下载这个版本的 node，使用后再删掉。

#指定node版本来运行`npm scripts`
npx -p node@8 npm run build
```

## 四、执行 GitHub 源码

npx 还可以执行 GitHub 上面的模块源码。

```cmd
# 执行 Gist 代码
npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
# 执行仓库代码
npx github:piuccio/cowsay hello
```

* 注意，远程代码必须是一个模块，即必须包含`package.json`和入口脚本。

## 五、开启静态服务器

```cmd
npx http-server
```

## 六、参数

`--no-install`：强制使用本地模块，不下载远程模块，如果本地不存在该模块，就会报错。

`--ignore-existing`：忽略本地的同名模块，强制安装使用远程模块

`-p`：指定 npx 所要安装的模块

`-c`：如果 npx 安装多个模块，默认，第一个可执行项会使用 npx 安装的模块，后面的可执行项还是会交给 Shell 解释（可能会报错）。

+ `-c`所有命令都用 npx 解释
+ 环境变量带入所要执行的命令

```cmd
npx -c 'echo "$npm_package_name"'
#输出当前项目的项目名
```

## 七、总结

+ 临时安装可执行依赖包，不用全局安装，不用担心长期的污染。
+ 可以执行依赖包中的命令，安装完成自动运行。
+ 自动加载node_modules中依赖包，不用指定$PATH。
+ 可以指定node版本、命令的版本，解决了不同项目使用不同版本的命令的问题。