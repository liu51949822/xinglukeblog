import type { WeblinkConfig } from '@/libs/weblink';

export const weblinkConfig: WeblinkConfig[] = [
  // 🔹 React 官方 & 核心
  {
    url: 'https://react.dev',
    shortName: 'React',
    desc: 'React 官方文档 - 构建用户界面的 JavaScript 库',
    logo: 'https://react.dev/favicon.ico',
    type: 2 // 技术网站
  },
  {
    url: 'https://zh-hans.react.dev',
    shortName: 'React 中文',
    desc: 'React 官方中文文档',
    logo: 'https://zh-hans.react.dev/favicon.ico',
    type: 2
  },
  {
    url: 'https://reactrouter.com',
    shortName: 'React Router',
    desc: 'React 的声明式路由库',
    logo: 'https://reactrouter.com/favicon.ico',
    type: 2
  },
  {
    url: 'https://redux.js.org',
    shortName: 'Redux',
    desc: 'Redux 状态管理库官方文档',
    logo: 'https://redux.js.org/img/redux-logo-landscape.png',
    type: 2
  },
  {
    url: 'https://nextjs.org',
    shortName: 'Next.js',
    desc: 'React 框架，支持服务端渲染和静态生成',
    logo: 'https://nextjs.org/favicon.ico',
    type: 2
  },
  {
    url: 'https://vitejs.dev',
    shortName: 'Vite',
    desc: '下一代前端构建工具，支持 React',
    logo: 'https://vitejs.dev/favicon.ico',
    type: 2
  },

  // 🔹 学习平台 & 教程
  {
    url: 'https://www.freecodecamp.org',
    shortName: 'freeCodeCamp',
    desc: '免费编程学习平台，包含 React 教程',
    logo: 'https://www.freecodecamp.org/icons/icon-96x96.png',
    type: 2
  },
  {
    url: 'https://www.codecademy.com/learn/react-101',
    shortName: 'Codecademy',
    desc: '交互式 React 入门课程',
    logo: 'https://www.codecademy.com/favicon.ico',
    type: 2
  },
  {
    url: 'https://scrimba.com/learn/learnreact',
    shortName: 'Scrimba',
    desc: '交互式 React 学习平台',
    logo: 'https://scrimba.com/favicon.ico',
    type: 2
  },
  {
    url: 'https://www.udemy.com/topic/react/',
    shortName: 'Udemy React',
    desc: 'Udemy 上的 React 课程',
    logo: 'https://www.udemy.com/staticx/udemy/images/v7/favicon.ico',
    type: 2
  },

  // 🔹 UI 组件库
  {
    url: 'https://mui.com',
    shortName: 'MUI',
    desc: '流行的 React UI 组件库（Material-UI）',
    logo: 'https://mui.com/static/favicon.ico',
    type: 2
  },
  {
    url: 'https://ant.design',
    shortName: 'Ant Design',
    desc: '企业级 React UI 设计语言和组件库',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    type: 2
  },
  {
    url: 'https://chakra-ui.com',
    shortName: 'Chakra UI',
    desc: '简单、模块化、可访问的 React 组件库',
    logo: 'https://chakra-ui.com/favicon.ico',
    type: 2
  },
  {
    url: 'https://tailwindui.com',
    shortName: 'Tailwind UI',
    desc: '与 Tailwind CSS 配套的 React 组件库',
    logo: 'https://tailwindui.com/favicon.ico',
    type: 2
  },
  {
    url: 'https://headlessui.com',
    shortName: 'Headless UI',
    desc: '无样式、完全可访问的 UI 组件（由 Tailwind 团队开发）',
    logo: 'https://headlessui.com/favicon.ico',
    type: 2
  },

  // 🔹 开发工具
  {
    url: 'https://www.json.cn',
    shortName: 'JSON.cn',
    desc: '在线 JSON 格式化与校验工具',
    logo: 'https://www.json.cn/img/logo.png',
    type: 7 // 工具资源
  },
  {
    url: 'https://jsonformatter.curiousconcept.com',
    shortName: 'JSON Formatter',
    desc: '强大的 JSON 格式化和验证工具',
    logo: 'https://jsonformatter.curiousconcept.com/favicon.ico',
    type: 7
  },
  {
    url: 'https://regex101.com',
    shortName: 'Regex101',
    desc: '在线正则表达式测试工具',
    logo: 'https://regex101.com/favicon.ico',
    type: 7
  },
  {
    url: 'https://www.browserstack.com',
    shortName: 'BrowserStack',
    desc: '跨浏览器测试平台',
    logo: 'https://www.browserstack.com/favicon.ico',
    type: 7
  },
  {
    url: 'https://www.webpackjs.com',
    shortName: 'Webpack 中文网',
    desc: 'Webpack 模块打包器中文文档',
    logo: 'https://www.webpackjs.com/assets/favicon.png',
    type: 2
  },

  // 🔹 社区 & 论坛
  {
    url: 'https://stackoverflow.com/questions/tagged/reactjs',
    shortName: 'Stack Overflow',
    desc: 'React 相关问题问答社区',
    logo: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196',
    type: 6 // 社交社区
  },
  {
    url: 'https://www.zhihu.com/topic/20013848',
    shortName: '知乎 - React',
    desc: '知乎上的 React 话题讨论',
    logo: 'https://www.zhihu.com/favicon.ico',
    type: 6
  },
  {
    url: 'https://segmentfault.com/t/react',
    shortName: '思否 - React',
    desc: 'SegmentFault 上的 React 技术社区',
    logo: 'https://static.segmentfault.com/v-5f8e9a3a/global/img/sf.ico',
    type: 6
  },
  {
    url: 'https://github.com/facebook/react',
    shortName: 'React GitHub',
    desc: 'React 官方 GitHub 仓库',
    logo: 'https://github.com/favicon.ico',
    type: 6
  },
  {
    url: 'https://github.com/vercel/next.js',
    shortName: 'Next.js GitHub',
    desc: 'Next.js 官方 GitHub 仓库',
    logo: 'https://github.com/favicon.ico',
    type: 6
  },

  // 🔹 博客 & 资讯
  {
    url: 'https://overreacted.io',
    shortName: 'Overreacted',
    desc: 'Dan Abramov（Redux 作者）的个人博客',
    logo: 'https://overreacted.io/favicon.ico',
    type: 1 // 个人博客
  },
  {
    url: 'https://kentcdodds.com',
    shortName: 'Kent C. Dodds',
    desc: '知名 React 教师 Kent C. Dodds 的博客',
    logo: 'https://kentcdodds.com/favicon.ico',
    type: 1
  },
  {
    url: 'https://css-tricks.com',
    shortName: 'CSS-Tricks',
    desc: '前端开发技巧与教程，包含 React 内容',
    logo: 'https://css-tricks.com/favicon.ico',
    type: 3 // 新闻资讯
  },
  {
    url: 'https://dev.to/t/react',
    shortName: 'DEV.to React',
    desc: '开发者社区，React 话题',
    logo: 'https://dev.to/favicon.ico',
    type: 3
  },

  // 🔹 在线编辑器
  {
    url: 'https://codesandbox.io',
    shortName: 'CodeSandbox',
    desc: '在线 React 开发环境',
    logo: 'https://codesandbox.io/favicon.ico',
    type: 7
  },
  {
    url: 'https://stackblitz.com',
    shortName: 'StackBlitz',
    desc: '基于 VS Code 的在线开发环境，支持 React',
    logo: 'https://stackblitz.com/favicon.ico',
    type: 7
  },
  {
    url: 'https://jsfiddle.net',
    shortName: 'JSFiddle',
    desc: '在线代码测试工具，支持 React',
    logo: 'https://jsfiddle.net/favicon.ico',
    type: 7
  },

  // 🔹 搜索引擎（保留原数据）
  {
    url: 'https://www.baidu.com',
    shortName: '百度',
    desc: '中文搜索引擎',
    logo: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    type: 3 // 新闻资讯
  },
  {
    url: 'https://www.google.com',
    shortName: '谷歌',
    desc: '全球搜索引擎',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    type: 3
  },
  {
    url: 'https://www.bing.com',
    shortName: '必应',
    desc: '微软搜索引擎',
    logo: 'https://www.bing.com/sa/simg/bing_p_rr_te_ms_sr.png',
    type: 3
  }
];