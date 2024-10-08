import { BlockConfiguration } from '@wordpress/blocks';

// block-types.ts
export interface BlockAttributes {
	postID: {
		type: 'number';
		default: number;
	},
	postType: {
		type: 'string';
		default: 'post';
	},
}

// Extender BlockConfiguration con nuestros atributos personalizados
export interface CustomBlockConfiguration
	extends Omit< BlockConfiguration< BlockAttributes >, 'name' > {
	name: string;
}
