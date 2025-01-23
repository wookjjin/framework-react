import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import noRelativeImportPaths from 'no-relative-import-paths'

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
		],
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		plugins: {
			react,
			'jsx-a11y': jsxA11y,
			'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'no-relative-import-paths': noRelativeImportPaths
		},
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			},
		},
		rules: {
      ...reactHooks.configs.recommended.rules,
      "prefer-destructuring": [
        "error",
        {
          "VariableDeclarator": {
            "array": false,
            "object": true
          },
          "AssignmentExpression": {
            "array": false,
            "object": false
          }
        }
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { 'allowSameFolder': true, 'rootDir': 'src', 'prefix': '~' }
      ],
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'indent': [
				'error',
				'tab'
			],
			'semi': [
				'error',
				'never'
			],
			'react/jsx-indent': [2, 'tab'],
			'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
			'react/jsx-fragments': ['error', 'element'],
			'linebreak-style': ['error', 'windows'],
			'react/jsx-wrap-multilines': 0,
			'react/jsx-indent-props': [2, 'tab'],
			'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
			'jsx-a11y/alt-text': [
				'warn',
				{
					elements: ['img'],
				},
			],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
)
