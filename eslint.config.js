import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'

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
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'indent': [
				'error',
				'tab'
			],
			'react/jsx-indent': [2, 'tab'],
			'linebreak-style': ['error', 'windows'],
			'react/jsx-wrap-multilines': 0,
			'react/jsx-indent-props': [2, 'tab'],
			'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
)
