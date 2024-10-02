// Import the default config file and expose it in the project root.
// Useful for editor integrations.
module.exports = {
	...require( '@wordpress/prettier-config' ),
	overrides: [
		{
			// This doesnt work. I want to be able to add two spaces after a line in an md file
			files: '*.md', // Target only markdown files
			options: {
				proseWrap: 'preserve', // Preserve wrapping in markdown files
				trailingWhitespace: 'preserve', // This is a workaround to prevent trimming
			},
		},
		// Example of customization that you might want to add
		// {
		// 	files: [ '*.js', '*.jsx', '*.ts', '*.tsx' ], // Target JS, JSX, TS, and TSX files
		// 	options: {
		// 		singleQuote: false, // Use double quotes for these file types
		// 	},
		// },
	],
};
