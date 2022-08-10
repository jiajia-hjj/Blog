---
title: npm
tags:
 - Vue
categories:
 - Vue
---



## 一、窗口的常用指令

+ `E:`：进入E盘
+ `cd + 路径` ：进入到那个文件
+ `cd  ..` ：返回上一层
+ `dir`：列出文件列表
+ `cls`：清空命令提示符窗口内容。
+ `clear`：清空命令提示符窗口内容。

## 二、安装node

+ npm是node的包管理工具。

```cmd
#查看版本
node -v
npm -v
```

## 三、淘宝镜像

因为npm安装插件是从国外服务器下载，受网络影响大，可能出现异常。

+ 官方网址：[http://npm.taobao.org](http://npm.taobao.org/)；

+ 安装：

```cmd
# 命令提示符执行
npm install cnpm -g --registry=https://registry.npm.taobao.org
```

+ 查看其版本号：cnpm -v

+ 注：cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm

## 四、npm安装插件

```cmd
# 命令提示符执行
npm install <name> [-g] [--save-dev]
```

+ **`<name>`**：node插件名称。
+ **`-g`**：全局安装
+ **`--save-dev`**：缩写-D，是开发时依赖，打包完线上不需要。保存至package.json的devDependencies节点。、
+ `--save`：运行时依赖：项目打包后还需要使用。最新的npm这个指令已经没有什么用了

## 五、npm卸载插件

```cmd
# 命令提示符执行
npm uninstall <name> [-g] [--save-dev]
```

+ 删除全部插件：npm uninstall   webpack vue ……
+ 使用 rimraf删除全部插件：

```cmd
#安装rimraf
npm install rimraf -g
#删除全部插件
rimraf node_modules
```

## 六、更新插件

```cmd
#更新插件
npm update <name> [-g] `[--save-dev]`
#更新全部插件
npm update` [--save-dev]`
```

**其他命令：**

+ **`npm help`**：查看npm帮助

+ **`npm list`**：当前目录已安装插件

## 七、package.json

**node_modules文件夹的问题**

+ 文件夹过多过碎，拷贝给别人是，传输速度很慢。
+ 复杂的依赖关系需要被记录，确保模块和当前保持一致，否则会导致当前项目运行报错

**package.json**

+ 项目描述文件，记录当前项目的信息，例如项目名称、版本、作者、guthub地址、当前项目依赖了哪些第三方模块等。

**生成package.json**

```cmd
npm init 
npm init -y
#-y :不填写默认信息，都都使用默认值
```

**package.json文件**

+ scripts：别名，命令太长，可以取个别名，使用别名就可以了
  + 执行： npm run 别名

+ **devDependencies**：开发依赖，开发阶段需要，线上不需要。下载是需要加--save-dev

+ **dependencies**：项目依赖，开发阶段和线上运行阶段都需要。

**根据package.json下载依赖包**

+ **`npm install`**：下载packge.json中所有的依赖包
+ **`npm install --production`**：只下载packge.json中dependencies节点的包

## 八、package-lock.json

+ 下载第三方插件时，npm会产生另一个文件package-lock.json
+ package-lock.json详细的记录模块和模块之间的依赖关系。

**作用：**

+ 锁定包的版本，确保再次下载时去下载别的版本
+ 加快下载速度，再次下载时，npm不需要分析模块间的关系，直接去查找下载地址去下载就可以了
