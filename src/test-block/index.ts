// Wordpress deps
import { registerBlockType } from '@wordpress/blocks';

// Styles
import './style.css';

// Types
import type { CustomBlockConfiguration } from './types/types.d';

// Internal deps
import blockJson from './block.json';
const typedBlockJson = blockJson as CustomBlockConfiguration;
const { name, ...settings } = typedBlockJson;

import Edit from './Edit';
import save from './save';

// We register the block
// @ts-expect-error I can't type the registerBlockType properly.
registerBlockType( blockJson.name, {
	name,
	...settings,
	edit: Edit,
	save,
} );
