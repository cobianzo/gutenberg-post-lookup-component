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
 *
 * @param searchTerm
 * @return
 */
function usePostSearch( searchTerm: string | null ): PostSearchResult {
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

		apiFetch< WPPost[] >( {
			path: `/wp/v2/posts?search=${ encodeURIComponent(
				searchTerm
			) }&per_page=10`,
		} )
			.then( ( results ) => {
				setPosts( results );
				setLoading( false );
			} )
			.catch( ( err ) => {
				setError( 'Failed to fetch posts' + err.message );
				setLoading( false );
			} );
	}, [ searchTerm ] );

	return { posts, loading, error };
}

export default usePostSearch;
