const moment = require("moment");
moment.locale("zh-cn");
module.exports = {
  "@vuepress/last-updated": {
    transformer: (timestamp, lang) =>{
      return moment(timestamp).format("Y-MM-DD h:mm:ss")
    }
  },
  "@vuepress/pwa": {
    serviceWorker: true,
    updatePopup: {
      message: "发现新内容可用",
      buttonText: "刷新",
    },
  },
  "@vuepress/medium-zoom"
  
};
