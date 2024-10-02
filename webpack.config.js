const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'post-lookup': path.resolve( __dirname, 'src/index.ts' ),
		'test-block': path.resolve( __dirname, 'test-block/src/index.tsx' ),
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
	},
	output: {
		filename: '[name].js', // Esto compilará 'todo-list.js' y 'task.js' en la carpeta 'blocks/build'
	},
};
