// Wordpress deps
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// WP types
import type { BlockEditProps } from '@wordpress/blocks';
import type { WPPost } from '../post-lookup/types.d';
import type { PostIdAttribute } from './types/types.d';

// The Component why this plugin is made for:
import PostLookup from '../post-lookup/PostLookup'; // Component
import usePost from '../post-lookup/usePost'; // custom hook. Very handy.

/**
 * Edit function for the test block.
 *
 * If the block has a valid post ID, it will render the title and content of the post.
 *
 * @param {BlockEditProps<PostIdAttribute>} props - The props for the block.
 * @return {JSX.Element} The element to render.
 */
function Edit( props: BlockEditProps< PostIdAttribute > ): JSX.Element | null {
	const { post }: { post: WPPost | null } = usePost(
		props.attributes.postID
	);
	return (
		<>
			<div
				{ ...useBlockProps() }
				style={ {
					border: '10px solid orange',
					background: 'lightgray',
					padding: '1rem',
				} }
			>
				{ post ? (
					<>
						<h2>{ post?.title?.rendered ?? 'no post' }</h2>
						<div
							dangerouslySetInnerHTML={ {
								__html: post?.content?.rendered.replace(
									/<[^>]+>/g,
									''
								),
							} }
						/>
					</>
				) : (
					<p>{ __( 'No post selected', 'coco' ) }</p>
				) }
			</div>
			<InspectorControls>
				<Panel>
					<PanelBody>

						<PostLookup
							selectedPostId={ props.attributes.postID }
							updateSelectedPostId={ ( newPostId ) =>
								props.setAttributes( {
									postID: newPostId || 0,
								} )
							}
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
		</>
	);
}

export default Edit;
