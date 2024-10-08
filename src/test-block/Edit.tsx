// Wordpress deps
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// WP types
import { BlockEditProps } from '@wordpress/blocks';
import type { WPPost } from '../post-lookup/types.d';
interface BlockAttributes {
	postType: string;
	postID: number;
}

// The Component why this plugin is made for:
import PostLookup from '../post-lookup/PostLookup'; // Component
import usePost from '../post-lookup/usePost'; // custom hook. Very handy.

// styles
import './style.css';
import apiFetch from '@wordpress/api-fetch';

/**
 * Edit function for the test block.
 *
 * If the block has a valid post ID, it will render the title and content of the post.
 * If not, it will show a message.
 *
 * The inspector controls allow the user to select a post type from a dropdown, and
 * to search for a post using the PostLookup component. The selected post id is stored
 * in the block attributes.
 * @param props
 */
const Edit = ( props: BlockEditProps<BlockAttributes> ): JSX.Element | null => {
	const { attributes, setAttributes } = props;
	const { postType, postID } = attributes;
	const { post }: { post: WPPost | null } = usePost( postID, postType );
	return (
		<>
			<div { ...useBlockProps() }>
				{ }
				{ post ? (
					<>
						<h2>{ post?.title?.rendered ?? 'no post' }</h2>
						<div
							dangerouslySetInnerHTML={ {
								__html: post?.content?.rendered.replace( /<[^>]+>/g, '' ),
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
						<label htmlFor="coco-post-lookup-post-type">{ __( 'Post type', 'coco' ) }</label>
						<select
							id="coco-post-lookup-post-type"
							value={ postType }
							onChange={ ( event ) =>
								setAttributes( {
									postType: event.target.value,
								} )
							}
						>
							<option value="post">{ __( 'Posts', 'coco' ) }</option>
							<option value="car">{ __( 'Cars', 'coco' ) }</option>
						</select>

						<PostLookup
							selectedPostId={ postID }
							postType={ postType }
							updateSelectedPostId={ ( newPostId ) =>
								setAttributes( {
									postID: newPostId || 0,
									postType: postType || 'post',
								} )
							}
						/>
						<button onClick={ () => {
							// Write any quick test in this button.
							/* eslint-disable no-console */
							apiFetch< WPPost[] >( {
								path: `/wp/v2/posts?search=${ encodeURIComponent( 'post' ) }&per_page=10`,
							} ).then( ( results ) => {
								console.log( 'Results in test', results );
							} ).catch( ( err ) => console.error( err ) );
							/* eslint-enable no-console */
						} }>Test button</button>
					</PanelBody>
				</Panel>
			</InspectorControls>
		</>
	);
};

export default Edit;
