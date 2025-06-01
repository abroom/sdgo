import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import globals from 'globals';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			eslint.configs.recommended,
			reactPlugin.configs.flat.recommended,
			reactPlugin.configs.flat['jsx-runtime'],
			tseslint.configs.strict,
			tseslint.configs.stylistic,
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			import: importPlugin,
			prettier: prettierPlugin,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			'prettier/prettier': 'error',
			'react/prefer-read-only-props': 'warn',
			...reactHooks.configs.recommended.rules,
			'react-hooks/exhaustive-deps': 'warn',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
		},
	},
	prettierConfig,
);
