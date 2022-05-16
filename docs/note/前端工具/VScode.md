---
title: VScode
tags:
  - 前端工具
categories:
  - 前端工具
---



+ 官网安装，傻瓜式安装
+ 用户设置
  + 文件>首选项>设置
  + 配置代码：文件>首选项>设置 > 搜索workbench.settings.editor，选中json即可改成json设置；
+ 常用插件
  + `chnese(Simplifies)` ：中文汉化插件
  + ` View In Browser`：在浏览器中查看
  + `Auto Rename Tag`：自动修改匹配的 HTML 标签
  + `Path Intellisense`：智能路径提示
  + `Markdown Preview`：实时预览 markdown
  + `stylelint`：CSS / SCSS / Less 语法检查
  + `Prettier`：比Beautify更好用的代码格式化插件
  + `Bracket Pair Colorizer`：给嵌套的各种括号加上不同的颜色。
  + `vscode-icons`：改变编辑器里面的文件图标
  + `Import Cost`：引入包大小计算
+ vue插件
  + vetur：语法高亮、智能感知、Emmet等
  + VueHelper：snippet代码片段
+ 其它插件
  + GitLens：详细的 Git 提交日志
  + css-auto-prefix：自动添加 CSS 私有前缀
+ 快捷键
  + `ctrl+/` ： 注释单行
  + `shift+alt +a`：注释多行
  + `cls` ：清除终端的内容
  + `ctrl+ f` ：搜索
  + `ctrl+ alt + f`： 替换
  + `ctrl+ shift + f`：在项目内搜索
  + `shift+alt +F`： 格式化代码 
+ 红色波浪线表示代码报错
+ 设置同步
  + 插件：Settings Sync
  + 登陆Github>settings>Developer settings>personal access tokens>generate new token，输入名称（Token description），勾选Gist，提交保存Github Access Token
  + 在vscode中要登陆github，之后同意关联后会有个token
  + 打开vscode，Ctrl+Shift+P打开命令框-->输入sync-->选择高级设置-->编辑本地扩展设置-->编辑token
  + Ctrl+Shift+P打开命令框-->输入sync-->找到update/upload settings(ALT+SHIFT+U 上传配置)，上传成功后会返回Gist ID，保存此Gist ID.
  + **ALT+SHIFT+D** 下载配置 、**ALT+SHIFT+U** 上传配置，不行的话这两随便按
  + 在 VSCode 里，依次打开: 文件 -> 首选项 -> 设置，然后输入 Sync 进行搜索:能找到你gist id
  + gist id：651ac7b1d1025306c20101899e87e85c
  + 若需在其他机器上DownLoad插件的话，
    + Ctrl+Shift+P打开命令框，输入sync，找到Download settings，
    + 会跳转到Github的Token编辑界面，点Edit，regenerate token，
    + 保存新生成的token，在vscode命令框中输入此Token，回车，再输入之前的Gist ID，即可同步插件和设置
    + ALT+SHIFT+D
+ [使用教程](https://zhuanlan.zhihu.com/p/113222681)

