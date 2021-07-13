const dayJs = require('dayjs');

// const sortFn = key => (a, b) => a[key].split("-")[1][length - 1] > b[key].split("-")[1][length - 1] ? 1 : -1;

module.exports = {
  '@vuepress/pwa': {
    serviceWorker: true,
    updatePopup: {
      message: "发现新内容可用.",
      buttonText: "刷新"
    },
    generateSWConfig: {
      importWorkboxFrom: 'local'
    }
  },
  "vuepress-plugin-auto-sidebar": {
    titleMode: 'uppercase',
    // sort: sortFn
  },
  "@vuepress/back-to-top": true,
  "@vuepress/nprogress": true,
  "@vuepress/medium-zoom": {
    selector: '.content__default img',
  },
  '@vuepress/last-updated': {
    transformer: (timestamp) => dayJs(timestamp).format('YYYY-MM-DD')
  },
  'demo-container': true
}