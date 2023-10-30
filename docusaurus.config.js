const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "服务端端开发",
  tagline:
    "Learntech Back-End，学习记录，笔记备份，文章备份，后端开发，APP开发",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://back.learntech.cn:88",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },
  customFields: {
    // 把你的自定义环境放在这里
    email: "admin@imruxin.com",
  },
  themes: [
    [
      // @ts-ignore
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      // @ts-ignore
      ({
        hashed: true,
        language: ["en", "zh"],
        docsRouteBasePath: "/",
      }),
    ],
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [
            [
              require("@docusaurus/remark-plugin-npm2yarn"),
              {
                sync: true,
                converters: ["yarn", "pnpm"],
              },
            ],
          ],
          showLastUpdateTime: true,
          // showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
        sitemap: {
          changefreq: "daily",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
        pages: {
          remarkPlugins: [
            [
              require("@docusaurus/remark-plugin-npm2yarn"),
              {
                sync: true,
                converters: ["yarn", "pnpm"],
              },
            ],
          ],
        },
      }),
    ],
  ],
  plugins: [
    "docusaurus-plugin-image-zoom",
    [
      "@docusaurus/plugin-pwa",
      {
        // debug: true,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/logo.png",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json", // 你的 PWA Manifest
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "rgb(37, 194, 160)",
          },
        ],
      },
    ],
    "docusaurus-plugin-sass",
    "@docusaurus/theme-live-codeblock",
    "@docusaurus/remark-plugin-npm2yarn",
    // [
    //   '@docusaurus/plugin-ideal-image',
    //   {
    //     quality: 70,
    //     max: 1920, // max resized image's size.
    //     min: 640, // 最小缩放图片尺寸。 如果原始值比这还低，会使用原图尺寸。
    //     steps: 2, // 在 min 和 max 之间最多生成的图片数量（包含两端点）
    //     disableInDev: false,
    //   },
    // ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/logo.png",
      metadata: [
        {
          name: "keywords",
          content:
            "Learntech Back-End，学习记录，笔记备份，文章备份，后端开发，APP开发",
        },
      ],
      zoom: {
        // CSS selector to apply the plugin to, defaults to '.markdown img'
        selector: ".markdown img",
        // Optional medium-zoom options
        // see: https://www.npmjs.com/package/medium-zoom#options
        background: {
          light: "rgb(255, 255, 255)",
          dark: "rgb(50, 50, 50)",
        },
      },
      navbar: {
        title: "服务端开发",
        logo: {
          alt: "Logo",
          src: "img/logo.png",
        },
        hideOnScroll: true,
        items: [
          {
            type: "docSidebar",
            sidebarId: "nodeSidebar",
            position: "left",
            label: "开始",
          },
          { to: "/about", label: "关于", position: "left" },
          {
            type: "dropdown",
            label: "后端语言",
            position: "right",
            items: [
              {
                to: "/node",
                label: "Node",
              },
              {
                to: "/java",
                label: "Java",
              },
            ],
          },
          {
            to: "/server",
            label: "运维与服务器",
            position: "right",
          },
          {
            to: "/database",
            label: "数据库",
            position: "right",
          },
          {
            href: "https://front.learntech.cn:88",
            label: "大前端",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        // links: [
        //   {
        //     title: 'Docs',
        //     items: [
        //       {
        //         label: 'Tutorial',
        //         to: '/docs/intro',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'Community',
        //     items: [
        //       {
        //         label: 'Stack Overflow',
        //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //       },
        //       {
        //         label: 'Discord',
        //         href: 'https://discordapp.com/invite/docusaurus',
        //       },
        //       {
        //         label: 'Twitter',
        //         href: 'https://twitter.com/docusaurus',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More',
        //     items: [
        //       {
        //         label: 'Blog',
        //         to: '/blog',
        //       },
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/facebook/docusaurus',
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://back.learntech.cn:88/">back.learntech.cn</a> <br> <a href="http://beian.miit.gov.cn/" title="闽ICP备15011150号-1" target="_blank">闽ICP备15011150号-1</a> . Built with Docusaurus `,
      },
      // https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/generate-prism-languages/index.ts
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        // https://prismjs.com/#supported-languages
        additionalLanguages: [
          "java",
          "php",
          "bash",
          "css",
          "scss",
          "json",
          "sql",
          "nginx",
        ],
      },
    }),
};

module.exports = config;
