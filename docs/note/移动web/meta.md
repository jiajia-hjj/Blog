### meta

- 网站seo

```html
<!--说明-->
<meta name="description" content="....">
<!--关键字-->
<meta name="Keywords" content="....">
```

- 遇到数字不让转成电话号码格式

```html
<meta content="telephone=no" name="format-detection">
```

- ios是否运行创建快捷启动方式

```
<meta content="yes" name="apple-mobile-web-app-capable">
```

- ios顶部通知栏的样式 黑色

```html
<meta content="black" name="apple-mobile-web-app-status-bar-style">
```

+ UC默认竖屏 ，UC强制全屏

```html
<meta name="full-screen" content="yes">
<meta name="browsermode" content="application">
```

+ QQ强制竖屏 QQ强制全屏

```html
<meta name="x5-orientation" content="portrait">
<meta name="x5-fullscreen" content="true">
<meta name="x5-page-mode" content="app">
```

### **viewport** 

```html
<!--标准适配方案：-->
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">
```

```html
<meta name="viewport" content="minimal-ui,target-densitydpi=device-dpi, width=750, user-scalable=no"/>
```

**6个通用属性**

+ **`width`**  :  可以设置宽度   (device-width 当前设备的宽度)
+ **`height`** :  可以设置高度，很少用到
+ **`initial-scale`** ：可以设置默认的缩放比例
+ **`user-scalable`** ： 可以设置是否允许用户自行缩放
+ **`maximum-scale`**  可以设置最大缩放比例
+ **`minimum-scale`**  可以设置最小缩放比例

**私有属性**

+ **`target-densitydpi`** ：目标设备的密度等级，决定css中的1px代表多少物理像素，**只有安卓支持，即将废弃**
+  **`minimal-ui`**：iOS 7.1 的 Safar新增，让网页在加载时便可隐藏顶部的地址栏与底部的导航栏。

### icon

```css
<link type="image/x-icon" rel="shortcut icon" href="images/favicon.ico">
```



