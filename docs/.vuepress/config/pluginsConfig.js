// const moment = require("moment");
// const secret = require("./secret");
// moment.locale("zh-cn");
module.exports = {

  "@vuepress/pwa": {
    serviceWorker: true,
    updatePopup: {
      message: "发现新内容可用",
      buttonText: "刷新",
    },
  },
};
