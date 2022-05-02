// .vuepress/config.js
const headConfig=require('./config/headConfig');
const pluginsConfig=require('./config/pluginsConfig');
const sideBar = require('./utils/autoCreateSideBar')
const secret = require("./secret");
module.exports = {
    dest: 'blog',
    base: "/blog/",
    lang:'zh-cn',
    title: "HHH",
    description: "一个小小前端的学习笔记!",
    theme: 'reco',
    head: headConfig,
    pluginsConfig,
    themeConfig:{
      type: 'blog',
      noFoundPageByTencent: false,
      nav: [
        { text: 'Home', link: '/', icon: 'reco-home' },
        { text: '博客园', link: 'https://www.cnblogs.com/jiajia-hjj/', icon: 'reco-blog' },
        { text: 'GitHub', link: 'https://github.com/smallsunnyfox', icon: 'reco-github' }
      ],
      // 博客设置
      blogConfig: {
        category: {
          location:2, // 在导航栏菜单中所占的位置，默认2
          text: '分类' // 默认 “分类”
        },
        tag: {
          location: 3, // 在导航栏菜单中所占的位置，默认3
          text: 'Tag' // 默认 “标签”
        }
      },
      logo: '/assets/images/head.jpg',
      // 搜索设置
      search: true,
      searchMaxSuggestions: 10,
      // 自动形成侧边导航
      subSidebar: 'auto',
      sidebarDepth:2,
      displayAllHeaders: false,
      sidebar: sideBar.createSideBar('note', ['img','images']), // 配置两个参数，一个是文章的根目录，第二是白名单（选择性配置）
      // 最后更新时间
      lastUpdated: 'Last Updated',
      // 作者
      author: 'HHH',
      authorAvatar: '/assets/images/head.jpg',
      // 项目开始时间
      startYear: '2022',
      vssueConfig: {
        platform: "github-v4",
        owner: "jiajia-hjj",//使用者
        repo: "blog",
        clientId: secret.clientId,
        clientSecret:  secret.clientSecret,
        autoCreateIssue: true,
        placeholder: '是时候展现真正的技术了'
      }
    },
    markdown: {
      lineNumbers: true
    },
  
  }
  