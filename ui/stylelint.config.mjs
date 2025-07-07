// 从 stylelint-config-clean-order 导入预设的属性分组
// 这是比 stylelint-config-rational-order 更现代、更清晰的排序方案
import { propertyGroups } from 'stylelint-config-clean-order';

// 动态生成属性排序规则，确保组内不空行
const propertiesOrder = propertyGroups.map(properties => ({
  noEmptyLineBetween: true,
  properties,
}));

export default {
  // 继承的核心规则集，standard-less 已包含 standard
  extends: ['stylelint-config-standard-less'],

  // 使用的插件列表
  plugins: [
    'stylelint-order', // 强大的排序插件，替代 rational-order
    'stylelint-declaration-block-no-ignored-properties', // 检查被忽略的属性
  ],

  // 针对 LESS 语法的解析器
  customSyntax: 'postcss-less',

  // 具体的规则配置
  rules: {
    // 1. --- 排序规则 (来自第二份配置的精华) ---
    'order/order': [ // 定义块的顺序：变量、混合、声明、规则、@规则等
      [
        'dollar-variables',
        'at-variables',
        'custom-properties',
        { type: 'at-rule', name: 'mixin' },
        'declarations',
        'less-mixins',
        {
          type: 'rule',
          selector: /^&::[\w-]+/, // 伪元素选择器
          hasBlock: true,
        },
        'rules',
        { type: 'at-rule', name: 'media', hasBlock: true }, //媒体查询
      ],
      { severity: 'warning' }, // 设置为警告而非错误，避免中断构建
    ],
    'order/properties-order': [ // 定义 CSS 属性的排序
      propertiesOrder,
      {
        unspecified: 'bottomAlphabetical', // 未指定的属性按字母顺序排在底部
        severity: 'warning',
      },
    ],

    // 2. --- 插件和框架兼容性规则 ---
    'plugin/declaration-block-no-ignored-properties': true, // 启用插件
    'selector-type-no-unknown': [ // 忽略 Angular/Ant Design 等组件库的自定义标签
      true,
      {
        ignoreTypes: ['/^nz-/', '/^app-/', '/^g2-/'],
      },
    ],
    'selector-pseudo-element-no-unknown': [ // 忽略 Angular 的 ::ng-deep
      true,
      {
        ignorePseudoElements: ['ng-deep'],
      },
    ],
    'at-rule-no-unknown': [ // 忽略 less-loader 可能使用的 @plugin
      true,
      {
        ignoreAtRules: ['plugin'],
      },
    ],

    // 3. --- 样式和兼容性规则 ---
    'alpha-value-notation': 'number', // alpha 值使用数字表示 (e.g., rgba(0, 0, 0, 0.5))
    'color-function-notation': 'legacy', // 颜色函数使用旧版写法 (e.g., rgba())
    'number-max-precision': 8, // 数字最大精度，保留以防特定计算需要

    // 4. --- 关闭或放宽一些不必要的规则 ---
    'function-no-unknown': null, // 关闭未知函数检查，因为 less 有很多内置函数
    'no-descending-specificity': null, // 关闭禁止低优先级选择器在高优先级之后的规则
    'no-invalid-position-at-import-rule': null, // 关闭对 @import 位置的校验
    'import-notation': null, // 不强制 @import 的格式 (string 或 url)
    'declaration-empty-line-before': null, // 不强制声明前有空行
    'selector-class-pattern': null, // 不限制 class 的命名格式
    'custom-property-pattern': null, // 不限制自定义属性的命名格式
  },

  // 需要忽略检查的文件
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/output/**',
    'src/assets/**/*', // 忽略资源文件
  ],
};
