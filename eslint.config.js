import eslint from '@eslint/js'
import tsEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import functional from 'eslint-plugin-functional'
import esImport from 'eslint-plugin-import'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

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
      '@typescript-eslint/no-unused-vars': 'error',
      'no-undef': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      semi: ['error', 'never'],
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
      'max-len': ['error', { code: 80, tabWidth: 2, ignoreUrls: true }],
    },
  },
  /** Prettier */
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          printWidth: 80,
          tabWidth: 2,
          trailingComma: 'all',
          arrowParens: 'avoid',
        },
      ],
    },
  },
  /** React */
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
    },
    rules: {
      'react/prop-types': 'off',
      ...react.configs['jsx-runtime'].rules,
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
]
