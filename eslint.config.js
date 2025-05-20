import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: react,
      import: importPlugin,
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      // 기존 룰 유지
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Prettier 룰 추가
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          tabWidth: 2,
          trailingComma: 'es5',
          endOfLine: 'auto',
          jsxSingleQuote: true,
          bracketSpacing: true,
          arrowParens: 'avoid',
          parser: 'flow',
        },
        {
          usePrettierrc: false,
        },
      ],

      // 문자열 따옴표 규칙 - 싱글 쿼터 사용 (오류 수정)
      quotes: ['error', 'single', { avoidEscape: true }],

      // JSX에서도 싱글 쿼터 사용
      'jsx-quotes': ['error', 'prefer-single'],

      // 빈 줄 규칙
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],

      // 빈 줄 수 제한
      'no-multiple-empty-lines': ['error', { max: 1 }],

      // 기본 코드 스타일
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-var': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-duplicate-imports': 'error',
      'no-trailing-spaces': 'error',

      // TypeScript 관련 룰
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // React 관련 룰
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-undef': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-unknown-property': 'error',
      'react/self-closing-comp': 'warn',

      // Import 관련 룰
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-cycle': 'warn',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off', // TypeScript가 처리
      'import/newline-after-import': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  }
)
