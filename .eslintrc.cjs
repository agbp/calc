module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb-base',
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		// rule for correct work with windows style of breaking lines - CRLF
		'linebreak-style': ['error', 'windows'],
		// rule foer working woth tabs as intends insted of spaces
		// also here is addition to "switch/case" construction
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		// below is corrections needed for correct work with enum in typescript
		// note you must disable the base rule as it can report incorrect errors
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
	},
};
