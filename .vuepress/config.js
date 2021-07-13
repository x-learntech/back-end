const head = require('./headConfig')
const nav = require('./navConfig');
const plugins = require('./pluginConfig')

module.exports = {
  title: "服务端开发",
  description:
    "Learntech Back-End，学习记录，笔记备份，文章备份，后端开发，APP开发",
  dest: "dist",
  head,
  port: 8008,
  locales: {
    '/': {
      lang: "zh-CN"
    }
  },
  plugins,
  themeConfig: {
    editLinks: true,
    lastUpdated: "上次更新",
    nav,
  },
  markdown: {
    lineNumbers: true
  },
};
