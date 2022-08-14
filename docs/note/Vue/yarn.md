---
title: yarn和npm对比
tags:
 - Vue
categories:
 - Vue
---

### 安装yarn

```cmd
npm install -g yarn
```

### 指令对比

下面针对一些常用的指令进行对比：

| 描述                               | yarn                                                         | npm                                                          |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 初始化package.json                 | yarn init (可以在后面添加`-y`跳过询问的信息)                 | npm init (可以在后面添加`-y`跳过询问的信息)                  |
| 根据package.json安装依赖           | yarn install（可以省略install）                              | npm install(install可以缩写成`i`)                            |
| 安装某个依赖(默认是在dependencies) | yarn add packageName --save（简写`-S`，或者省略该参数）      | npm install packageName --save（简写`-S`，或者省略该参数）   |
| 安装某个依赖在devDependencies      | yarn add packageName --dev（可以简写成`-D`）                 | npm install packageName --save-dev（可以简写成`-D`）         |
| 全局安装依赖                       | yarn global add packageName                                  | npm install  packageName -g                                  |
| 移除依赖                           | yarn remove packageName                                      | npm uninstall packageName                                    |
| 移除全局依赖                       | yarn global remove packageName                               | npm uninstall packageName -g                                 |
| 升级依赖                           | yarn upgrade packageName（如果是全局的依赖则在yarn后面加上`global`） | npm update packageName（如果是全局的依赖则在后面加上`-g`）   |
| 查看依赖的信息                     | yarn info packageName                                        | npm info packageName                                         |
| 设置淘宝源                         | yarn config set registry [registry.npm.taobao.org](https://link.juejin.cn?target=https%3A%2F%2Fregistry.npm.taobao.org) | npm config set registry [registry.npm.taobao.org](https://link.juejin.cn?target=https%3A%2F%2Fregistry.npm.taobao.org) |
| 查看当前源                         | yarn config get registry                                     | npm config get registry                                      |
| 罗列全局依赖                       | yarn global list --depth=0                                   | npm list -g --depth 0                                        |

### 区别

1. yarn安装速度快，因为它是异步执行安装依赖；npm是同步执行，它需要先安装好前面的包再接着安装。
2. yarn安装过程信息很干净，npm会罗列很多其它包的信息，看过去感觉不直观。
3. yarn安装后是有个yarn.lock文件，这个文件是会锁定你安装的版本，别人安装时会直接读取yarn.lock文件，这样可以保证安装的依赖的版本是一样的，npm在5.x.x的版本也引入了这个机制，它的文件叫package-lock.json。



>  [yarn和npm的对比](https://juejin.cn/post/7000026481602756622)