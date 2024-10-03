import { BlockConfiguration } from '@wordpress/blocks';

// block-types.ts
export interface PostIdAttribute {
	postID: number;
}

export interface BlockAttributes {
	postID: {
		type: 'number';
		default: number;
	};
}

// Extender BlockConfiguration con nuestros atributos personalizados
export interface CustomBlockConfiguration
	extends Omit< BlockConfiguration< BlockAttributes >, 'name' > {
	name: string;
}
