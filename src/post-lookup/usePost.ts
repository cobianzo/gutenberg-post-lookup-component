// React and WordPress dependencies
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

// Types
import type { WPPost, CoreSelectors } from './types';

/**
 * Given the post ID, returns the full post object.
 * @param postId
 * @return
 */
export default function usePost( postId: number | null ) {
	const [ isLoading, setIsLoading ] = useState( false );

	const post: WPPost | null = useSelect(
		( select ) => {
			if ( ! postId ) {
				return null;
			}

			const { getEntityRecord } = select( 'core' ) as CoreSelectors;

			setIsLoading( false );
			return getEntityRecord( 'postType', 'post', postId ) as WPPost;
		},
		[ postId ]
	);

	return { post, isLoading };
}
