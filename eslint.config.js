import eslint from '@eslint/js'
import tsEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import functional from 'eslint-plugin-functional'
import esImport from 'eslint-plugin-import'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      functional,
      import: esImport,
      '@typescript-eslint': tsEslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'ESNext',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // 필요에 따라 여기에 규칙을 추가하세요.
      ...tsEslint.configs.recommended.rules,
      ...eslint.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      'no-undef': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'max-len': ['error', { code: 120, tabWidth: 2, ignoreUrls: true }],
      quotes: ['error', 'single'],
      indent: ['error', 2, { 'SwitchCase': 1}],
      semi: ['error', 'never'],
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
            'unknown',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'react-router-dom',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: 'styled-components',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/core/**',
              group: 'unknown',
            },
            {
              pattern: '**/*.css.ts',
              group: 'unknown',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'error',
    },
  },
  /** React */
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/display-name': 'off',
      'react/function-component-definition': ['warn', { 'namedComponents': 'arrow-function' }],
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/jsx-wrap-multilines': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          'labelComponents': ['label'],
          'labelAttributes': ['htmlFor'],
          'controlComponents': ['input']
        }
      ]
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  /** React Hooks */
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    ignores: ['dist', 'eslint.config.js'],
  },
  /** jsx A11y */
  {
    files: ['**/*.{ts,tsx}'],
    ...jsxA11y.flatConfigs.recommended,
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
]
