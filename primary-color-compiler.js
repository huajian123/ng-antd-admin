const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const fs = require('fs');
const darkThemeVars = require('./primary-red');

const appStyles = './src/assets/styles/index.less'; // 应用的样式入口文件
const themeContent = `@import '${appStyles}';`;

less.render(themeContent, {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({advanced: true})],
  modifyVars: {
    ...{
      '@primary-color': '#BF0B2C',
    },
  }
}).then(data => {
  fs.writeFileSync(
    // 主题样式的输出文件
    './src/assets/themes/style.red.css',
    data.css
  )
}).catch(e => {
  // 记录渲染错误
  console.error(e);
});
