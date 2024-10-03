// Wordpress deps
import { useBlockProps } from '@wordpress/block-editor';

export default function Save(): JSX.Element {
	return (
		<div { ...useBlockProps.save() }>
		</div>
	);
}

