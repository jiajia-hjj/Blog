---
title: git命令行
tags:
  - 前端工具
categories:
  - 前端工具
---



## 命令行

+ 下载仓库(master分支)

```
git clone [git地址]
```

+ 下载特定的Tag 

```
git clone --branch [tags标签] [git地址]
```

+ 下载特定的分支 

```
git clone -b [分支名称] [git地址]
```

+ 初始化:

```
git init
```

+ 跟远程仓库建立连接

```
git remote add origin [git地址]
//origin ：远程仓库链接的名字
git remote add origin [SSH]
```

+ 验证：

```
git remote -v
```

+ 拉取远程项目

```
git fetch origin [分支名称]
git pull origin [分支名称] 
//origin:之前取得远程仓库链接名字
```

+ fetch：相当于是从远程获取最新版本到本地，不会自动merge

```
git fetch orgin master //将远程仓库的master分支下载到本地当前branch中
git log -p master  ..origin/master //比较本地的master分支和origin/master分支的差别
git merge origin/master //进行合并
```

+ pull：相当于是从远程获取最新版本并merge到本地

```
git pull origin master    //相当于git fetch 和 git merge
```

+ 创建新分支

```
git branch [分支名称]
```

+ 查看分支

```
git branch
```

+ 切换分支

```
git checkout [分支名称]
```

+ 把本地分支推到线上

```
git push origin [分支名称]
```

+ 在分支上推送本地新文件

```
git add .
git commit -m [备注信息]
git push origin [分支名称]
```

+ 创建开发分支:develop

```
git branch develop
git checkout develop
```

+ 创建第一个新分支：develop-1

```
git branch develop-1
git checkout develop-1
//添加一个develop-1.txt文件
git add .
git commit -m "完成develop-1的开发"
```

+ 创建第二个新分支：develop-2

```
git checkout develop(返回开发分支)
git branch develop-2
git checkout develop-2
//添加一个develop-2.txt文件
git add .
git commit -m "完成develop-2的开发"
```

+ 合并特性分支（develop-1和develop-2）到（develop）

```
git checkout develop(返回开发分支)
git merge develop-1
git merge develop-2
```

+ 删除分支:develop-1\develop-2

```
git branch -d develop-1
git branch -d develop-2
git branch
```

## 错误：

+ fatal: remote origin already exists.  
  + 翻译过来就是：致命：远程来源已经存在
  + 解决办法如下：
    1、先输入$ git remote rm origin(删除关联的origin的远程库)
    2、再输入$ git remote add origin git@github.com:(github名)/(git项目名).git 就不会报错了！
    3、如果输入$ git remote rm origin 还是报错的话，error: Could not remove config section 'remote.origin'. 我们需要修改gitconfig文件的内容
    4、找到你的github的安装路径，我的是C:\Users\ASUS\AppData\Local\GitHub\PortableGit_ca477551eeb4aea0e4ae9fcd3358bd96720bb5c8\etc
    5、找到一个名为gitconfig的文件，打开它把里面的[remote "origin"]那一行删掉就好了