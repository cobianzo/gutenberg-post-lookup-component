const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'post-lookup': path.resolve( __dirname, 'src/post-lookup/index.ts' ),
		'test-block': path.resolve( __dirname, 'src/test-block/index.ts' ),
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								noEmit: false,
							},
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		...defaultConfig.resolve,
		extensions: [
			'.ts',
			'.tsx',
			'.js',
			...defaultConfig.resolve.extensions,
		],
	},
	output: {
		filename: '[name].js', // Esto compilará 'todo-list.js' y 'task.js' en la carpeta 'blocks/build'
	},
};
