const prettierConfig = require('./.prettierrc.js');
/*https://blog.miniasp.com/post/2021/08/29/Angular-ESLint-with-so-much-details*/
/*https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin/docs/rules*/
/*https://www.wenjiangs.com/doc/eslint-docs-rules-no-redeclare*/
/*https://eslint.org/docs/latest/user-guide/getting-started*/
module.exports = {
  root: true,
  parserOptions: { ecmaVersion: 2021 },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['tsconfig.json'],
        createDefaultProgram: true
      },
      plugins: ['@typescript-eslint', 'jsdoc', 'import','deprecation'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:prettier/recommended'
      ],
      rules: {
        'prettier/prettier': ['error', prettierConfig],
        "@angular-eslint/no-empty-lifecycle-method": ["off"],
        'jsdoc/newline-after-description': 1,
        '@angular-eslint/component-class-suffix': [
          'error',
          {
            suffixes: ['Directive', 'Component', 'Base', 'Widget']
          }
        ],
        'no-underscore-dangle': 'off',
        'no-shadow': 'off',
        '@angular-eslint/no-input-rename': 'off',
        'max-len': 'off',
        '@typescript-eslint/ban-types': [
          'off',
          {
            types: {
              Object: {
                message: 'Use {} instead.'
              },
              String: {
                message: 'Use string instead.'
              },
              Number: {
                message: 'Use number instead.'
              },
              Boolean: {
                message: 'Use boolean instead.'
              },
              Function: {
                message: 'Use specific callable interface instead.'
              }
            }
          }
        ],
        '@angular-eslint/component-selector': [
          'off',
          {
            type: ['element', 'attribute'],
            prefix: ['app', 'test'],
            style: 'kebab-case'
          }
        ],
        '@angular-eslint/directive-class-suffix': [
          'error',
          {
            suffixes: ['Directive', 'Component', 'Base']
          }
        ],
        '@angular-eslint/directive-selector': [
          'off',
          {
            type: 'attribute',
            prefix: ['app']
          }
        ],
        '@angular-eslint/no-attribute-decorator': 'error',
        '@angular-eslint/no-conflicting-lifecycle': 'off',
        '@angular-eslint/no-forward-ref': 'off',
        '@angular-eslint/no-host-metadata-property': 'off',
        '@angular-eslint/no-lifecycle-call': 'off',
        '@angular-eslint/no-pipe-impure': 'error',
        '@angular-eslint/prefer-output-readonly': 'error',
        '@angular-eslint/use-component-selector': 'off',
        '@angular-eslint/use-component-view-encapsulation': 'off',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array-simple'
          }
        ],
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
          'off',
          {
            accessibility: 'explicit'
          }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
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
        '@typescript-eslint/naming-convention': [
          "error",
          {
            "selector": "interface",
            "format": ["PascalCase"]
          }
        ],
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true
          }
        ],
        'prefer-arrow/prefer-arrow-functions': 'off',
        'import/no-duplicates': 'error',
        'import/no-unused-modules': 'error',
        'import/no-unassigned-import': 'error',
        'import/order': [
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
                pattern: 'ng-ant-admin/**',
                group: 'internal',
                position: 'before'
              }
            ],
            pathGroupsExcludedImportTypes: []
          }
        ],
        'no-bitwise': 'off',
        'no-duplicate-imports': 'error',
        'no-invalid-this': 'off',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/member-ordering': 'off',
        'no-irregular-whitespace': 'error',
        'no-multiple-empty-lines': 'error',
        'no-sparse-arrays': 'error',
        'prefer-object-spread': 'error',
        'prefer-template': 'error',
        'prefer-const': 'off',
        'deprecation/deprecation': 'warn',
        yoda: 'error'
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {}
    },
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': ['error', { parser: 'angular' }]
      }
    }
  ]
};
