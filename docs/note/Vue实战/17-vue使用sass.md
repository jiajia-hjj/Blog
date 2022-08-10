### 使用sass

**1、下载**

```cmd
npm i s node-sass sass-loader style-loader -D
```

**2、在vue.config.js中配置 sass**

```js
css: {
    loaderOptions: {
        sass: {
            prependData: `@import "@/assets/css/_variable.scss";` //引入全局变量   

        }
    }
```

**3、使用Sass的scss语法** 

```html
<style lang="scss">
    $body-color:red;
    .body {
        color: $body-color;
    }
</style>
```

