// 从 stylelint-config-clean-order 导入预设的属性分组
// v10 仍以命名导出方式暴露 propertyGroups，导入方式无需修改
import { propertyGroups } from 'stylelint-config-clean-order';

// 动态生成属性排序规则，确保组内不空行
// emptyLineBefore: 'never' 关闭组间空行，让排序结果更紧凑
const propertiesOrder = propertyGroups.map((properties) => ({
  noEmptyLineBetween: true,
  emptyLineBefore: 'never',
  properties,
}));

/** @type {import('stylelint').Config} */
export default {
  // 继承的核心规则集，standard-less 已包含 standard 及 Less 语法解析
  extends: [
    'stylelint-config-standard-less',
    // clean-order 已内部注册 stylelint-order 插件，无需在 plugins 中重复声明
    'stylelint-config-clean-order',
  ],

  // 仅保留需要显式声明的额外插件
  plugins: ['stylelint-declaration-block-no-ignored-properties'],

  // customSyntax 已由 stylelint-config-standard-less 内部配置为 postcss-less，
  // 无需手动声明，避免引入不必要的直接依赖

  rules: {
    // 1. --- 排序规则 ---
    'order/order': [
      // 定义块的顺序：变量、混合、声明、规则、@规则等
      [
        'dollar-variables',
        'at-variables',
        'custom-properties',
        { type: 'at-rule', name: 'mixin' },
        'less-mixins',
        'declarations',
        {
          type: 'rule',
          selector: /^&::[\w-]+/, // 伪元素选择器
          hasBlock: true,
        },
        'rules',
        { type: 'at-rule', name: 'media', hasBlock: true }, // 媒体查询
      ],
      { severity: 'warning' }, // 设置为警告而非错误，避免中断构建
    ],
    'order/properties-order': [
      // 定义 CSS 属性的排序
      propertiesOrder,
      {
        unspecified: 'bottomAlphabetical', // 未指定的属性按字母顺序排在底部
        severity: 'warning',
      },
    ],

    // 2. --- 插件和框架兼容性规则 ---
    'plugin/declaration-block-no-ignored-properties': true, // 启用插件
    'selector-type-no-unknown': [
      // 忽略 Angular/Ant Design 等组件库的自定义标签
      true,
      {
        ignoreTypes: ['/^nz-/', '/^app-/', '/^g2-/'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      // 忽略 Angular 的 ::ng-deep
      true,
      {
        ignorePseudoElements: ['ng-deep'],
      },
    ],
    'at-rule-no-unknown': [
      // 忽略 less-loader 可能使用的 @plugin
      true,
      {
        ignoreAtRules: ['plugin'],
      },
    ],

    // 3. --- 样式和兼容性规则 ---
    'alpha-value-notation': 'number', // alpha 值使用数字表示 (e.g., rgba(0, 0, 0, 0.5))
    'color-function-notation': 'legacy', // 使用传统颜色函数写法 (rgba)，兼容 Less 项目惯例
    'number-max-precision': 8, // 数字最大精度，保留以防特定计算需要

    // 4. --- 关闭或放宽一些不必要的规则 ---
    'function-no-unknown': null, // 关闭未知函数检查，因为 Less 有很多内置函数
    'declaration-property-value-no-unknown': null, // 避免对 Less 特有的属性值产生误报
    'no-descending-specificity': null, // 关闭禁止低优先级选择器在高优先级之后的规则
    'no-invalid-position-at-import-rule': null, // 关闭对 @import 位置的校验
    'import-notation': null, // 不强制 @import 的格式 (string 或 url)
    'declaration-empty-line-before': null, // 不强制声明前有空行
    'selector-class-pattern': null, // 不限制 class 的命名格式
    'custom-property-pattern': null, // 不限制自定义属性的命名格式

    // 5. --- 针对 Less 项目惯例的兼容性调整 ---
    'value-keyword-case': null, // 保留 optimizeLegibility 等传统写法的原始大小写
    'color-function-alias-notation': null, // 允许使用 rgba() 传统写法，不强制改写为 rgb()
  },

  // 需要忽略检查的文件
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/output/**',
    '**/.angular/**', // Angular 构建缓存目录
    'src/assets/**/*', // 忽略资源文件
  ],
};
