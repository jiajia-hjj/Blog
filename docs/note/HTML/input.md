## 如何禁止input展示输入历史记录

在输入 input 时会提示原来输入过的内容，还会出现下拉的历史记录，禁止这种情况只需在 input 中加入： autocomplete =" off ”

```html
< input type =＂ text ＂ autocomplete =" off ＂/>
```

 autocomplete 属性是用来规定输入字段是否启用自动完成的功能。



## input 指定上传文件类型

上传文件–限制类型

```html
 <!-- 添加accept属性 -->
<input type = "file" accept = "image/*">  <!-- 上传图片 -->
<!-- 
    视频：video/* 
    音频：audio/*
    gif图片：image/gif
    允许上传wav(一般用于铃声上传)：.wav
    excel文件：application/msexcel
    word文件：application/msword
    zip文件：application/zip
    text文件：text/plain
    js文件：text/javascript，application/javascript
-->
```



> [input上传指定类型的文件](https://blog.csdn.net/qq_41605091/article/details/109374969)

## input上传文件可以同时选择多张吗？怎么设置？

```html
<!--通过给input标签设置multiple属性-->
<input type="file" onchange="upLoad()" multiple>
```

 ## 使用input标签上传图片时，怎么触发默认拍照功能？



capture 属性用于指定文件上传控件媒体拍摄的方式，capture 的值可以是：

```html
<input type = 'file' accept = 'image/*;' capture = 'camera' >
<!--
camera 打开摄像头
user 打开前置摄像头
environment 打开后置摄像头
以上几个属性都不能保证设备会按照设置的一样打开前置或后置摄像头，如果设备不支持的话，它会使用默认的调用摄像头的行为。

camcorder 打开录像
microphone 打开录音机
-->
```



```html
<input type="file" id="upimg" accept="image/*" onchange="upLoad()" capture = 'camera'>
<label for="upimg">
    <p>点击上传图片 camera</p>
</label>
<div class="showimg">
    <img id="img" src="images/tx_1.jpg" alt="">
</div>
<script>
    function upLoad(){
        var fileInput = document.getElementById("upimg");
        console.log(fileInput.files);
        var file = fileInput.files[0];
    
        //创建读取文件的对象
        var reader = new FileReader();         
        //创建文件读取相关的变量
        var imgFile;         
        //为文件读取成功设置事件
        reader.onload=function(e) {
            // alert('文件读取完成');
            imgFile = e.target.result;
            console.log(imgFile);
            $("#img").attr('src',imgFile);
        };
        //正式读取文件
        reader.readAsDataURL(file);
    }
</script>
```



## label标签的作用

label 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

```html
< label for = "Name" > Number: < /label>
<input type='text' name="Name" id="Name"/ >   
    
< label > Date: < input  type = "text" name = "B" / > < /label>
```

