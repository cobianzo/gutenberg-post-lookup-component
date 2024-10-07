const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = [
	// 1) setup for the component to distribute as npm package
	{
		...defaultConfig,
		mode: 'production',
		devtool: false,
		optimization: {
			minimize: true, // If you want to debug the exit
		},
		entry: {
			'post-lookup': path.resolve( __dirname, 'src/post-lookup/index.ts' ),
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
				// avoid use of .map, otherwise there is an error when using it externally
				{
					test: /\.js$/,
					use: [ 'source-map-loader' ],
					enforce: 'pre',
					exclude: [ /node_modules/, /gutenberg-post-selector-component\/dist/ ],
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
			library: {
				name: '[name]',
				type: 'umd',
				export: 'default',
			},
			libraryTarget: 'umd', // Asegura que el componente sea consumible en diferentes entornos
			globalObject: 'this', // Necesario para la compatibilidad con Node y navegadores
		},
		// Para exportar el componente
		externals: {
			react: 'React', // Evita incluir React en el bundle
			'react-dom': 'ReactDOM', // Evita incluir ReactDOM
			'@wordpress/element': '@wordpress/element',
		},
	},
	// 2) Configuration for the test block, compiled into build.
	{
		...defaultConfig,
		entry: {
			'test-block': path.resolve( __dirname, 'src/test-block/index.ts' ),
		},
		output: {
			path: path.resolve( __dirname, 'build' ),
			filename: '[name].js',
		},
		// No necesitamos externals aquí ya que es para desarrollo
	},
];
