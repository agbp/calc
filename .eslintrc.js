module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb-base',
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
		'linebreak-style': ['error', 'windows'],
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
	},
};
