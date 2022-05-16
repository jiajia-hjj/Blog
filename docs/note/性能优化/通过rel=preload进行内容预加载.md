## 1. 内容预加载的好处

`<link>` 元素的 `rel` 属性的属性值 `preload` 能够让你在你的 HTML 页面中 `<head>` 元素内部书写一些声明式的资源获取请求，
 可以指明哪些资源是在页面加载完成后即刻需要的。对于这种即刻需要的资源，你可能希望在页面加载的生命周期的早期阶段就开始获取，
 在浏览器的主渲染机制介入前就进行预加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。

## 2. 预加载的基本使用

<link> 标签最常见的应用情形就是被用来加载CSS文件，进而装饰你的页面



```html
<link rel="stylesheet" href="styles/main.css" />
```

但是在这里，我们将使用 `preload` 作为 `rel` 属性的属性值。这种做法将把 `<link>` 元素塞入一个预加载器中，
 这个预加载器也将用于其他我们所需要的，各种各样的，任意类型的资源。为了完成基本的配置，
 你还需要通过 `href` 和 `as` 属性指定需要被预加载资源的资源路径及其类型。



```html
<head>
  <meta charset="utf-8" />
  <title>JS and CSS preload example</title>

  <link rel="preload" href="style.css" as="style" />
  <link rel="preload" href="main.js" as="script" />

  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <h1>bouncing balls</h1>
  <canvas></canvas>

  <script src="main.js"></script>
</body>
```

在这里，我们预加载了 CSS 和 JavaScript 文件，所以在随后的页面渲染中，一旦需要使用它们，它们就会立即可用。

## 3. as 属性的作用

使用 `as` 指定预加载内容的类型，有以下好处：

- 更精确地优化资源加载优先级。
- 匹配未来的加载需求，在适当的情况下，重复利用同一资源。
- 为资源应用正确的内容安全策略。
- 为资源设置正确的 Accept 请求头。

## 4. 可被预加载的内容类型

详情可查看：[https://w3c.github.io/preload/#link-element-extensions](https://links.jianshu.com/go?to=https%3A%2F%2Fw3c.github.io%2Fpreload%2F%23link-element-extensions)

- audio: 音频文件。
- document: 一个将要被嵌入到 `<frame>` 或 `<iframe>` 内部的 HTML 文档。
- embed: 一个将要被嵌入到<embed>元素内部的资源。
- fetch: 那些将要通过 fetch 和 XHR 请求来获取的资源，比如一个 ArrayBuffer 或 JSON 文件。
- font: 字体文件。
- image: 图片文件。
- object: 一个将会被嵌入到<embed>元素内的文件。
- script: JavaScript 文件。
- style: 样式表。
- track: WebVTT 文件。
- worker: 一个 JavaScript 的 web worker 或 shared worker。
- video: 视频文件。

## 5. type 属性

<link> 元素可以接受一个type属性。这一属性可以包含该元素所指向资源的MIME类型。在浏览器进行预加载的时候，
 这个属性值将会非常有用——浏览器将使用type属性来判断它是否支持这一资源，如果浏览器支持这一类型资源的预加载，
 下载将会开始，否则便对其加以忽略。



```html
<head>
  <meta charset="utf-8" />
  <title>Video preload example</title>

  <link rel="preload" href="sintel-short.mp4" as="video" type="video/mp4" />
</head>
<body>
  <video controls>
    <source src="sintel-short.mp4" type="video/mp4" />
    <source src="sintel-short.webm" type="video/webm" />
    <p>
      Your browser doesn't support HTML5 video. Here is a
      <a href="sintel-short.mp4">link to the video</a> instead.
    </p>
  </video>
</body>
```

在这个实例中，支持 MP4 格式的浏览器将仅预加载并使用 MP4 资源，以使得视频播放器的表现尽可能的流畅，
 或者说，为用户提供更好的响应。而不支持 MP4 格式的浏览器仍然能够加载视频的 WebM 版本，但无法体验到预加载带来的良好体验。

## 6. 跨域获取

预加载跨域资源，只需要你在<link>元素中设置好 crossorigin 属性即可。

如果需要获取的是字体文件，那么即使是非跨域的情况下，也需要应用这一属性。



```html
<head>
  <meta charset="utf-8" />
  <title>Web font example</title>

  <link
    rel="preload"
    href="fonts/cicle_fina-webfont.eot"
    as="font"
    type="application/vnd.ms-fontobject"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="fonts/cicle_fina-webfont.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="fonts/cicle_fina-webfont.woff"
    as="font"
    type="font/woff"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="fonts/cicle_fina-webfont.ttf"
    as="font"
    type="font/ttf"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="fonts/cicle_fina-webfont.svg"
    as="font"
    type="image/svg+xml"
    crossorigin="anonymous"
  />

  <link
    rel="preload"
    href="fonts/zantroke-webfont.eot"
    as="font"
    type="application/vnd.ms-fontobject"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="fonts/zantroke-webfont.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="fonts/zantroke-webfont.woff"
    as="font"
    type="font/woff"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="fonts/zantroke-webfont.ttf"
    as="font"
    type="font/ttf"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="fonts/zantroke-webfont.svg"
    as="font"
    type="image/svg+xml"
    crossorigin="anonymous"
  />

  <link href="style.css" rel="stylesheet" type="text/css" />
</head>
<body>
  ...
</body>
```

## 7. media 响应式的预加载

<link>元素有一个很棒的特性是它们能够接受一个media属性。它们可以接受媒体类型或有效的媒体查询作为属性值，这将令你能够使用响应式的预加载！



```html
<head>
  <meta charset="utf-8">
  <title>Responsive preload example</title>

  <link rel="preload" href="bg-image-narrow.png" as="image" media="(max-width: 600px)">
  <link rel="preload" href="bg-image-wide.png" as="image" media="(min-width: 601px)">

  <link rel="stylesheet" href="main.css">
</head>
<body>
  <header>
    <h1>My site</h1>
  </header>

  <script>
    var mediaQueryList = window.matchMedia("(max-width: 600px)");
    var header = document.querySelector('header');

    if(mediaQueryList.matches) {
      header.style.backgroundImage = 'url(bg-image-narrow.png)';
    } else {
      header.style.backgroundImage = 'url(bg-image-wide.png)';
    }
  </script>
</body>
```

当用户在使用较窄屏幕的设备时，较窄的图片将会被预加载，而在较宽的设备上，较宽的图片将被预加载。

这一特性将使另一种情况成为可能——字体在随着页面渲染完成的时候即可使用，减少了FOUT (无样式字体闪烁，flash of unstyled text)问题。

## 8. 脚本化与预加载

以脚本化的方式来执行这些预加载操作。

当你需要预加载一个脚本，但需要推迟到需要的时候才令其执行时，这种方式会特别有用。



```javascript
var preloadLink = document.createElement("link");
preloadLink.href = "myscript.js";
preloadLink.rel = "preload";
preloadLink.as = "script";
document.head.appendChild(preloadLink);
```

这意味着浏览器将预加载这个JavaScript文件，但并不实际执行它。

如果要对其加以执行，在需要的时候，可以执行：



```javascript
var preloadedScript = document.createElement("script");
preloadedScript.src = "myscript.js";
document.body.appendChild(preloadedScript);
```



> 转自：
>
> 作者：Iwtem
> 链接：https://www.jianshu.com/p/d293a4330246