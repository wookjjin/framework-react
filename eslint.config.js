import eslint from "@eslint/js";
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

export default [
  {
    plugins: {
      'react-hooks': hooksPlugin,
      'react': react,
      '@typescript-eslint': tsEslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'ESNext',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      }
    },
    rules: {
      // 필요에 따라 여기에 규칙을 추가하세요.
    }
  },
  // JS
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...eslint.configs.recommended.rules,
      'no-undef': 'error',
    }
  },
  /** TS */
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...tsEslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
    }
  },
  // React
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'react/prop-types': 'off',
    }
  },
  {
    ignores: ['dist', 'eslint.config.js']
  },
];
