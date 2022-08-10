## 62)数据可视化

svg--放大不失真，大屏

就是服务器返回的数据，是以视图的形式进行展示【饼图、折线图，K线图】

echarts：vue、react
v-chart：vue
d3.js:vue、react
hightchart：vue、react
echarts：基本使用



63)echarts异步展示数据


1:初始化echarts实例的第二个参数可以设置主题颜色
2：echart如果想异步展示数据，当服务器的数据返回以后echarts实例需要再次调用setOptions方法重新设置配置对象，
将配置对象的数据替换为服务器的数据







64)echarts在Vue中使用

1:准备一个容器【宽度高度】
2：引入echarts核心库
3：初始化echarts实例，与初始化图表展示的数据










65)v-chart使用

