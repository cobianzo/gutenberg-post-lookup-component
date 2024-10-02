// Wordpress deps
import { useBlockProps } from '@wordpress/block-editor';

// WP types
import type { BlockEditProps } from '@wordpress/blocks';

import usePost from './usePost';

interface PostIdAttribute {
	postId: number;
}

/**
 * Edit function for the test block.
 *
 * If the block has a valid post ID, it will render the title and content of the post.
 *
 * @param {BlockEditProps<PostIdAttribute>} props - The props for the block.
 * @return {JSX.Element} The element to render.
 */
function Edit( props: BlockEditProps< PostIdAttribute > ): JSX.Element | null {
	let post = usePost( props.attributes.postId );

	return (
		<div { ...useBlockProps() }>
			<p onClick={ () => props.setAttributes( { postId: 1 } ) }>
				The post: { props.attributes.postId }
			</p>
			{ post && (
				<>
					<h2>{ post?.title?.rendered }</h2>
					<div
						dangerouslySetInnerHTML={ {
							__html: post?.content?.rendered.replace(
								/<[^>]+>/g,
								''
							),
						} }
					/>
				</>
			) }
		</div>
	);
}

export default Edit;
