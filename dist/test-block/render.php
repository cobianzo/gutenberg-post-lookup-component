<?php
/**
 * The test block output in the frontend.
 *
 * @package post-lookup-component
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound ?>

<div <?php echo get_block_wrapper_attributes(); ?>>

<?php

$coco_post_id = isset( $attributes['postID'] ) ? $attributes['postID'] : 0;

if ( ! empty( $coco_post_id ) ) {
	$post_object = get_post( $coco_post_id );
	if ( $post_object ) {
		setup_postdata( $post_object );
		printf( '<h2>%s</h2>', $post_object->post_title );
		echo '<div class="post-content">';
		the_content();
		echo '</div>';
		wp_reset_postdata();
	}
}

?>

</div>
