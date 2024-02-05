module.exports = function (context, options) {
  const isProd = process.env.NODE_ENV === "production";
  // 获取配置中的trackingID参数
  const { trackingID } = options;
  return {
    name: "plugin-baidu-analytics",
    injectHtmlTags({ content }) {
      if (!isProd) {
        return {};
      }
      return {
        postBodyTags: [`<div style="display: none; opacity: 0;"><script>
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?${trackingID}";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
        </script></div>`],
      };
    },
  };
};