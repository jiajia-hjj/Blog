---
title: audio
tags:
  - HTML
categories:
  - HTML
---
### **audio常用属性**

| **属性** | **属性值** | **注释**                                                     |
| -------- | ---------- | ------------------------------------------------------------ |
| src      | url        | 播放的音乐的url地址（火狐只支持ogg的音乐，而IE9只支持MP3格式的音乐。chrome貌似全支持） |
| preload  | preload    | 预加载（在页面被加载时进行加载或者说缓冲音频），如果使用了autoplay的话那么该属性失效。 |
| loop     | loop       | 循环播放                                                     |
| controls | controls   | 是否显示默认控制条（控制按钮）                               |
| autoplay | autoplay   | 自动播放                                                     |

### **audio音乐格式的支持**

| **音频格式** | **Chrome** | **Firefox** | **IE9** | **Opera** | **Safari** |
| ------------ | ---------- | ----------- | ------- | --------- | ---------- |
| OGG          | 支持       | 支持        | 支持    | 不支持    | 不支持     |
| MP3          | 支持       | 不支持      | 支持    | 不支持    | 支持       |
| WAV          | 不支持     | 支持        | 不支持  | 支持      | 不支       |

### **audio属性**

| 属性        | 注释                                                         |
| ----------- | ------------------------------------------------------------ |
| duration    | 获取媒体文件的总时长，以s为单位，如果无法获取，返回NaN       |
| paused      | 如果媒体文件被暂停，那么paused属性返回true，反之则返回false  |
| ended       | 如果媒体文件播放完毕返回true                                 |
| muted       | 用来获取或设置静音状态。值为boolean                          |
| volume      | 控制音量的属性值为0-1;0为音量最小，1为音量最大               |
| startTime   | 返回起始播放时间                                             |
| error       | 返回错误代码，为uull的时候为正常。否则可以通过Music.error.code来获取具体的错误代码： 1.用户终止 2.网络错误 3.解码错误 4.URL无效 |
| currentTime | 用来获取或控制当前播放的时间，单位为s。                      |
| currentSrc  | 以字符串形式返回正在播放或已加载的文件                       |

那么来看下这边常用的控制用的函数：

| 函数             | 作用                                                 |
| ---------------- | ---------------------------------------------------- |
| load()           | 加载音频、视频软件                                   |
| play()           | 加载并播放音频、视频文件或重新播放暂停的的音频、视频 |
| pause()          | 暂停出于播放状态的音频、视频文件                     |
| canPlayType(obj) | 测试是否支持给定的Mini类型的文件                     |

### 常用audio的事件：

| 事件名称       | 事件作用                                           |
| -------------- | -------------------------------------------------- |
| loadstart      | 客户端开始请求数据                                 |
| progress       | 客户端正在请求数据（或者说正在缓冲）               |
| play           | play()和autoplay播放时                             |
| pause          | pause()方法促发时                                  |
| ended          | 当前播放结束                                       |
| timeupdate     | 当前播放时间发生改变的时候。播放中常用的时间处理哦 |
| canplaythrough | 歌曲已经载入完全完成                               |
| canplay        | 缓冲至目前可播放状态。                             |



### 使用

1、创建/获取Audio对象

```js
//通过new关键字来创建Audio对象
var Music = new Audio("test.mp3");
//通过document来获取已经存在的Audio对象
var Music = document.getElementById("audio");
```

2、绑定事件

```js
Music.addEventListener(type,listener,useCapture);
参数：
1、type：String，事件类型/名称,
2、listener：Function， 侦听到事件后处理事件的函数。 此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，如以下示例所示： 访问修饰符 function 函数名(evt:Event):void
3、useCapture：Boolean，是否使用捕捉，默认为false
+ 侦听器在侦听时有三个阶段：捕获阶段、目标阶段和冒泡阶段。
+ 顺序为：捕获阶段(根节点到子节点检查是否调用了监听 函数)→目标阶段(目标本身)→冒泡阶段(目标本身到根节点)。
+ useCapture 设置为 true，则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。 如果useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
+要在所有三个阶段都侦听事件，请调用两次 addEventListener，一次将 useCapture 设置为 true，第二次再将useCapture 设置为 false。
```

