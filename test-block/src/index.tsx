// Wordpress deps
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

// Styles
import './style.css';

// Internal deps
const blockJson = require( '../block.json' );
import Edit from './Edit';

// We register the block
registerBlockType( blockJson.name, {
	edit: Edit,
	save: () => {
		return null;
	},
} );
