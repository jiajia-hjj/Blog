





```js
<video ref="video" preload="auto" x5-video-player-type="h5"
x5-video-player-fullscreen="true"
webkit-playsinline="" x-webkit-airplay="true" airplay="allow" playsinline=""
@ended="videoEnded"></video>
```





```js
document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay() {
        var audio = document.getElementById('audio');
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
    }

    audioAutoPlay();
});
```

