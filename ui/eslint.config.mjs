// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

import importX from 'eslint-plugin-import-x';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

/*https://blog.miniasp.com/post/2021/08/29/Angular-ESLint-with-so-much-details*/
/*https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin/docs/rules*/
/*https://www.wenjiangs.com/doc/eslint-docs-rules-no-redeclare*/
/*https://eslint.org/docs/latest/user-guide/getting-started*/

export default tseslint.config(
  // --- 全局忽略配置 ---
  {
    ignores: ['.*/', 'publish/', 'lib/', 'dist/', 'junit/', 'coverage-report/', '.angular/']
  },

  // --- TypeScript 文件配置 ---
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true, // 启用项目服务（通常用于增强类型信息）
        tsconfigRootDir: import.meta.dirname // 指定 tsconfig 文件所在的根目录
      }
    },
    plugins: {
      // eslint-plugin-import-x 是 eslint-plugin-import 的现代替代方案，兼容 ESLint 10
      'import-x': importX,
      'unused-imports': unusedImports
    },
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      // --- Angular 规则 ---
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: ['element', 'attribute'],
          prefix: ['app', 'test'],
          style: 'kebab-case'
        }
      ],
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/no-rename-input': 'off',
      '@angular-eslint/no-attribute-decorator': 'error',
      // angular-eslint v22 已移除 no-conflicting-lifecycle 规则，保留配置会触发 ESLint 报错
      // '@angular-eslint/no-conflicting-lifecycle': 'off',
      '@angular-eslint/no-forward-ref': 'off',
      '@angular-eslint/no-host-metadata-property': 'off',
      '@angular-eslint/no-lifecycle-call': 'off',
      '@angular-eslint/no-pipe-impure': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/use-component-selector': 'off',
      '@angular-eslint/use-component-view-encapsulation': 'off',

      // --- TypeScript 规则 ---
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple'
        }
      ],
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'always',
          allowObjectTypes: 'always'
        }
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          accessibility: 'explicit'
        }
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true,
          ignoreProperties: true
        }
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true
        }
      ],
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',

      // --- 未使用导入/变量检查 ---
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],

      // --- import 规则（使用 import-x 前缀替代旧的 import 前缀） ---
      'import-x/no-duplicates': 'error',
      'import-x/no-unused-modules': 'off', // ESLint 10 下功能不可用，等待插件适配
      'import-x/no-unassigned-import': 'error',
      'import-x/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: false },
          'newlines-between': 'always',
          groups: ['external', 'builtin', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '{@angular/**,rxjs,rxjs/operators}',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'ng-zorro-antd/**',
              group: 'internal',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: []
        }
      ],

      // --- 通用 JavaScript 规则 ---
      'no-prototype-builtins': 'off',
      'no-bitwise': 'off',
      'no-duplicate-imports': 'error',
      'no-invalid-this': 'off',
      'no-irregular-whitespace': 'error',
      'no-magic-numbers': 'off',
      'no-multiple-empty-lines': 'error',
      'no-redeclare': 'off',
      'no-underscore-dangle': 'off',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'off',
      'prefer-object-spread': 'error',
      'prefer-template': 'error',
      yoda: 'error'
    }
  },

  // --- HTML 模板文件配置 ---
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended
      // todo(a11y)
      // ...angular.configs.templateAccessibility,
    ],
    rules: {}
  },

  // --- eslint-config-prettier 必须放在最后，用于关闭与 Prettier 冲突的格式化规则 ---
  eslintConfigPrettier
);
