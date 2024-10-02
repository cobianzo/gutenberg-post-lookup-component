import { useState, useEffect } from '@wordpress/element';
import { select } from '@wordpress/data';

export default function usePost( postId: number ) {
	const [ WPPost, setWPPost ] = useState< any | null >( null );

	useEffect( () => {
		if ( ! postId ) {
			setWPPost( null );
		} else {
			const post = select( 'core' ).getEntityRecord(
				'postType',
				'post',
				postId
			);
			setWPPost( post );
		}
	}, [ postId ] );

	return WPPost;
}
