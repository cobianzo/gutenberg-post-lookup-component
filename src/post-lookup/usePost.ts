// React and WordPress dependencies
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

// Types
import type { WPPost, CoreSelectors } from './types';

/**
 * Custom hook: Given the post ID, returns the full post object.
 * @param {number|null} postId
 * @param { string }    postType
 * @return {Object} An object containing the post object and a loading state.
 */
export default function usePost( postId: number | null, postType: string = 'post' ) {
	const [ isLoading, setIsLoading ] = useState( false );

	const post: WPPost | null = useSelect(
		( select ) => {
			if ( ! postId ) {
				return null;
			}

			const { getEntityRecord } = select( 'core' ) as CoreSelectors;

			setIsLoading( false );
			return getEntityRecord( 'postType', postType, postId ) as WPPost;
		},
		[ postId, postType ]
	);

	return { post, isLoading };
}
