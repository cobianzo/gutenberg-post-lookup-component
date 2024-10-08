// WordPress dependencies
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

// Types
import type { WPPost } from './types';
// Inline types
interface PostSearchResult {
	posts: WPPost[];
	loading: boolean;
	error: string | null;
}

/**
 * Given the search term string, returns the list of matching posts.
 * It uses the apiFetch API of WP to retrieve the result
 * - @TODO: accept query params from the componennt, not only the postType.
 *
 * @param {string | null} searchTerm - The search term to search for posts.
 * @param                 postType
 * @return {PostSearchResult} The list of matching posts.
 */
function usePostSearch( searchTerm: string | null, postType: string = 'post' ): PostSearchResult {
	const [ posts, setPosts ] = useState< WPPost[] >( [] );
	const [ loading, setLoading ] = useState< boolean >( false );
	const [ error, setError ] = useState< string | null >( null );

	useEffect( () => {
		if ( ! searchTerm ) {
			setPosts( [] );
			return;
		}

		setLoading( true );
		setError( null );

		let endpoint = `/wp/v2/${ postType === 'post' ? 'posts' : postType }`;
		endpoint += `?search=${ encodeURIComponent( searchTerm ) }`;
		endpoint += `&per_page=10`;
		apiFetch< WPPost[] >( {
			path: endpoint,
		} )
			.then( ( results ) => {
				setPosts( results );
				setLoading( false );
			} )
			.catch( ( err ) => {
				// eslint-disable-next-line no-console
				console.error( 'Error in fetchAPI for endpoint:', endpoint, err );
				setError( 'Failed to fetch posts' + err.message );
				setLoading( false );
			} );
	}, [ searchTerm, postType ] );

	return { posts, loading, error };
}

export default usePostSearch;
