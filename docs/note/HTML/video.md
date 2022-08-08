---
title: video
tags:
  - HTML
  - HTML5
categories:
  - HTML
---

```html
<video
  ref="video"
  preload="auto"
  x5-video-player-type="h5"
  x5-video-player-fullscreen="true"
  webkit-playsinline=""
  x-webkit-airplay="true"
  airplay="allow"
  playsinline=""
  @ended="videoEnded"
></video>
```

```js
document.addEventListener("DOMContentLoaded", function () {
  function audioAutoPlay() {
    var audio = document.getElementById("audio");
    audio.play();
    document.addEventListener(
      "WeixinJSBridgeReady",
      function () {
        audio.play();
      },
      false
    );
  }

  audioAutoPlay();
});
```





默认显示第几帧，`#t=2`

```html
<video preload="auto " id="ggVideo" loop>
    <source src="./video/gg.mp4#t=2" type="video/mp4">
</video>
```



```js
//js方法
var video, output;
var scale = 0.8;
var initialize = function () {
    output = document.getElementById("lqjVideoMaek");
    video = document.getElementById("lqjVideo");
    video.addEventListener('loadeddata', captureImage);
};

var captureImage = function () {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    var img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    output.appendChild(img);

}
initialize()
```

