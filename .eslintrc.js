module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['airbnb-base', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@', './src'],
					['@database', './src/database'],
					['@middlewares', './src/middlewares'],
					['@modules', './src/modules'],
					['@typings', './src/typings']
				],
				extensions: ['.js', '.ts', '.tsx', '.jsx', '.json', '.vue']
			}
		}
	},
	rules: {
		'import/extensions': [
			'error',
			'never',
			{
				js: 'never',
				ts: 'never'
			}
		],
		'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
		'max-classes-per-file': 'off',
		'class-methods-use-this': 'off',
		'no-underscore-dangle': ['error', { allow: ['_id'] }],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error', { ignoreTypeValueShadow: true }]
	}
};
