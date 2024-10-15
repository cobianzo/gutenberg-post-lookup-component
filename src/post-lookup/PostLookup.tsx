// WordPress dependencies
import { useState, useCallback, useRef, useEffect } from '@wordpress/element';
import { TextControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Internal deps
import useDebounce from './useDebounce';
import usePostSearch from './usePostSearch';
import usePost from './usePost';

// Interal styles css as js const
import postLookupStyles from './post-lookup-styles';

// Internal component deps
import XButton from './XButton';

//Types
import type { WPPost } from './types';
interface PostLookupProps {
	selectedPostId: number | null;
	postType?: string;
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
	const { selectedPostId, postType = 'post', updateSelectedPostId } = props;

	// STATES ============= ============= =============
	const [ searchTerm, setSearchTerm ] = useState< string | null >( null );
	const debouncedSearchTerm = useDebounce( searchTerm, 300 );
	const { posts: postResults, loading, error } = usePostSearch( debouncedSearchTerm, postType );
	const { post: selectedPostObject }: { post: WPPost | null } = usePost( selectedPostId, postType );
	// ref of the control so we can assign focus
	const textControlRef = useRef< HTMLInputElement >( null );

	// INIT, load css from js const
	useEffect( () => {
		// eslint-disable-next-line no-console
		console.log( ' > PostLookup init in  ' + process.env.NODE_ENV + ' Mode' );

		const style = document.createElement( 'style' );
		style.textContent = postLookupStyles;
		document.head.appendChild( style );
		return () => {
			document.head.removeChild( style );
		};
	}, [] );

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
		<div className="coco__post-lookup">
			{ /*
						1 ) There is no selected post:
				*/ }

			<div className="post-lookup__preview">{ ! selectedPostId ? <p>No post selected</p> : <p>&nbsp;</p> }</div>

			{ /*
						3 ) Show the selected post
				*/ }

			{ selectedPostId && selectedPostObject?.id && searchTerm === null ? (
				<div className="post-lookup__preview">
					<p>SELECTED POST:</p>
					<div className="post-lookup__inner-row">
						<button
							className="button--unstyled"
							onClick={ () => {
								setSearchTerm( '' );
								setTimeout( () => textControlRef.current?.focus(), 500 );
							} }
						>
							<span className="dashicons dashicons-edit"></span>
							{ selectedPostObject.title.rendered }
						</button>
						{ selectedPostId && selectedPostId > 0 ? (
							<XButton onClick={ () => props.updateSelectedPostId( 0 ) } />
						) : '' }
					</div>
				</div>
			) : (
				<>
					{ /*
							2 ) Show the input to change selected post
						*/ }

					<TextControl
						label={ __( 'Search for a post', 'coco' ) + ` (${ postType })` }
						value={ searchTerm || '' }
						onChange={ handleInputChange }
						placeholder={ __( 'Search…', 'coco' ) }
						autoComplete="off"
						ref={ textControlRef }
					/>
					{ selectedPostId && selectedPostId > 0 ? (
						<XButton onClick={ () => setSearchTerm( null ) } />
					) : null }

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
									<button className="button--unstyled" onClick={ () => handleSelectPost( post.id ) }>
										{ post.title.rendered }
									</button>
								</li>
							) ) }
						</ul>
					) }

					{ selectedPostId ? <p> { __( 'Selected post ID:', 'coco' ) + selectedPostId } </p> : null }
				</>
			) }
		</div>
	);
};

export default PostLookup; // test
