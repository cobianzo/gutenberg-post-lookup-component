module.exports = {
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended-with-formatting',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: [ '@typescript-eslint' ],
	rules: {
		'max-len': [ 'error', { code: 120 } ], // Permitir hasta 120 caracteres
		'jsdoc/require-jsdoc': 'off', // Desactiva la regla de JSDoc
		'jsdoc/require-param-type': 'off',
	},
	overrides: [
		{
			files: [
				'src/**/*.ts',
				'src/**/*.tsx',
				'src/**/*.js',
				'src/**/*.jsx',
			],
			rules: {
				'@wordpress/no-unused-vars-before-return': 'off',
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': [ 'error' ],
			},
		},
		{
			// Excluir todos los archivos fuera de `src`
			files: [ '**/*' ],
			excludedFiles: [ 'src/**/*' ],
			rules: {
				// Aquí no se aplican reglas porque los archivos fuera de `src` están excluidos
			},
		},
	],
	settings: {
		'import/resolver': {
			typescript: {
				project: './tsconfig.json', // Asegúrate de que ESLint apunte a este archivo
			},
		},
	},
};
