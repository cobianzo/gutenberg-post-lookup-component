// WordPress dependencies
import { useState, useCallback, useRef } from '@wordpress/element';
import { TextControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// external deps and styles
import StyledPostLookup from './PostLookup.styles';

// Internal deps
import useDebounce from './useDebounce';
import usePostSearch from './usePostSearch';
import usePost from './usePost';

import type { WPPost } from './types';
import XButton from './XButton';

interface PostLookupProps {
	selectedPostId: number | null;
	updateSelectedPostId: ( postId: number | null ) => void;
}

/**
 * The Component ========================
 * Usage: <PostLookup selectedPostId={<yourPostId}>} updateSelectedPostId={<your-fn>} />
 *
 * @param {PostLookupProps}                 props
 * @param {number | null}                   props.selectedPostId
 * @param {(postId: number | null) => void} props.updateSelectedPostId
 * @return {JSX.Element}
 * =====================================================
 */
const PostLookup: React.FC< PostLookupProps > = ( props ) => {
	const { selectedPostId, updateSelectedPostId } = props;

	// STATES ============= ============= =============
	const [ searchTerm, setSearchTerm ] = useState< string | null >( null );
	const debouncedSearchTerm = useDebounce( searchTerm, 300 );
	const { posts: postResults, loading, error } = usePostSearch( debouncedSearchTerm );
	const { post: selectedPostObject }: { post: WPPost | null } = usePost( selectedPostId );
	// ref of the control so we can assign focus
	const textControlRef = useRef< HTMLInputElement >( null );

	// HANDLERS ============= ============= =============
	const handleInputChange = useCallback( ( value: string ) => {
		setSearchTerm( value );
	}, [] );

	const handleSelectPost = ( postId: number ) => {
		updateSelectedPostId( postId );
		setSearchTerm( null );
	};

	// JSX ============= ============= =============
	return (
		<StyledPostLookup>
			<div className="post-lookup">

				{ /*
						1 ) The is no selected post:
				*/ }

				{ ! selectedPostId && (
					<div className="post-lookup__preview">
						<p>No post selected</p>
					</div>
				) }

				{ /*
						3 ) Show the selected post
				*/ }

				{ selectedPostId && selectedPostObject?.id && searchTerm === null ? (
					<div className="post-lookup__preview">
						<p>SELECTED POST:</p>
						<button
							className="button--unstyled"
							onClick={ () => {
								setSearchTerm( '' );
								setTimeout( () => textControlRef.current?.focus(), 500 );
							} }>
							<span className="dashicons dashicons-edit"></span>
							{ selectedPostObject.title.rendered }
						</button>
					</div>

				) : (
					<>

						{ /*
							2 ) Show the input to change selected post
						*/ }

						<TextControl
							label={ __( 'Search for a post', 'coco' ) }
							value={ searchTerm || '' }
							onChange={ handleInputChange }
							placeholder={ __( 'Search…', 'coco' ) }
							ref={ textControlRef }
						/>
						<XButton onClick={ () => setSearchTerm( null ) } />

						{ loading && <Spinner /> }
						{ error && (
							<div className="notice notice-error">
								<p>{ __( 'Error:', 'coco' ) + error }</p>
							</div>
						) }
						{ postResults.length > 0 && (
							<ul>
								{ postResults.map( ( post: WPPost ) => (
									<li key={ post.id }>
										<button
											className="button--unstyled"
											onClick={ () => handleSelectPost( post.id ) }
										>
											{ post.title.rendered }
										</button>
									</li>
								) ) }
							</ul>
						) }

						{ selectedPostId ? (
							<p> { __( 'Selected post ID:', 'coco' ) + selectedPostId } </p>
						) : null }
					</>
				) }
			</div>
		</StyledPostLookup>
	);
};

export default PostLookup;
