---
title: WebStorm
tags:
  - 前端工具
categories:
  - 前端工具
---





+ file->setting->editor->code style  可以设置代码缩进几格

+ file->setting->editor->live templates  可以设置模板    default选择html代码->apply->ok 

+ 安装插件：file->setting->Plugin

  + `markdown`： 支持 markdown 语法 
  + `Material Theme UI`： 可以改界面颜色呀，文件图标啥的 
  + `CodeGlance`： 代码缩略图 
  + 

+ ctrl+shift+r  替换

  ctrl+shift+R，指定目录内代码批量替换。
  ctrl+shift+F，指定目录内代码批量查找。

+ 汉化

  + 下载：github搜索**[ jetbrains-in-chinese](https://github.com/pingfangx/jetbrains-in-chinese)**下载汉化包(/**WebStorm**/)->将汉化包复制到(lib)文件夹下->重启编辑器





+ 自动编译scss、sass、less

  + 先npm 全局下载

    ```cmd
    npm install –g less
    npm install –g scss
    ```

  + setting---->Tools---->File Watchers

