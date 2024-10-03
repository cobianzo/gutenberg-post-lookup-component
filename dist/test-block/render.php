<div <?php echo get_block_wrapper_attributes(); ?>>
<?php
	$post_id = $arg['postId'];
if ( ! empty( $post_id ) ) {
	$post = get_post( $post_id );
	if ( $post ) {
		setup_postdata( $post );
		printf( '<h2>%s</h2>', get_the_title() );
		echo '<div class="post-content">';
		the_content();
		echo '</div>';
		wp_reset_postdata();
	}
}
?>

</div>
