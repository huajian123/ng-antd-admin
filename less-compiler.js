const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const fs = require('fs');
const darkThemeVars = require('ng-zorro-antd/dark-theme');

const darkStyles = './node_modules/ng-zorro-antd/ng-zorro-antd.dark.less'; // 应用的样式入口文件
const appStyles = './src/assets/styles/index.less'; // 应用的样式入口文件
const themeContent = `
@import '${darkStyles}';
@import '${appStyles}';
`;

less.render(themeContent, {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({advanced: true})],
  modifyVars: {
    ...darkThemeVars,
    ...{
      'layout-header-padding': 0,
      'menu-dark-bg':'#1F1F1F !important',
      '@menu-dark-submenu-bg':'#141414 !important'
    },
  }
}).then(data => {
  fs.writeFileSync(
    // 主题样式的输出文件
    './src/assets/themes/style.dark.css',
    data.css
  )
}).catch(e => {
  // 记录渲染错误
  console.error(e);
});
