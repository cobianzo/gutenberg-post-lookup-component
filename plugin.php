<?php
/**
 * Plugin Name: Coco Post Lookup
 * Plugin URI: https://github.com/cobianzo/[todo]
 * Description: A Gutenberg block to search and select a post.
 * Version: 1.0.0
 * Author: @cobianzo
 * Author URI: https://github.com/cobianzo
 * Text Domain: coco
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 *
 * @package post-lookup-component
 */

/**
 * The plugin side of this repo is mostly irrelevant.
 * It is used to create a custom block where we can test the component.
 *
 * While the main scope of this repo is to create an npm package with the component,
 * the plugin side is used exclusively to test the component.
 */

namespace Coco\Test_Plugin;

// Register the test block using block.json
// It will help us to test our component, inserting it with <PostLookup />.
add_action( 'init', function () {
	register_block_type( __DIR__ . '/src/test-block/block.json' );
} );

/**
 * This class helps us to test the lookup component,
 * by rceating dummy posts and dummy cars (CPT).
 */
class Test_Data {

	public static function init(): void {
		add_action( 'init', [ __CLASS__, 'create_car_post_type' ] );
	}

	// This function generates a random post title.
	public static function generate_random_title(): string {
		$adjectives = [ 'Amazing', 'Awesome', 'Interesting', 'Random', 'Exciting' ];
		$nouns      = [ 'Post', 'Story', 'Article', 'Topic', 'Entry' ];
		return $adjectives[ array_rand( $adjectives ) ] . ' ' . $nouns[ array_rand( $nouns ) ];
	}

	/**
	 * Create random posts in WordPress.
	 *
	 * This function creates $num_posts random posts in WordPress.
	 *
	 * @param int $num_posts The number of posts to create.
	 */
	public static function create_random_posts( int $num_posts = 5, string $post_type = 'post' ): void {
		for ( $i = 0; $i < $num_posts; $i++ ) {
				// Prepare post data.
				$post_data = array(
					'post_title'   => self::generate_random_title() . ' ' . $post_type,  // Random title
					'post_content' => 'This is the content of the random post.',  // Sample content
					'post_status'  => 'publish',  // Publish the post
					'post_author'  => 1,  // Set the author to the user with ID 1 (you can change it)
					'post_type'    => $post_type,
				);

				// Insert the post into the database.
				wp_insert_post( $post_data );
		}
	}

	public static function cleanup(): void {

		// Get all posts of the specified post type.
		$posts = get_posts(
			array(
				'post_type'   => array( 'post', 'car' ),
				'post_status' => 'any',
				'numberposts' => -1,
			)
		);

		foreach ( $posts as $post ) {
			wp_delete_post( $post->ID, true );
		}
	}


	/**
	 * Register a custom post type called "car"
	 */
	public static function create_car_post_type(): void {
		register_post_type( 'car',
			array(
				'labels'       => array(
					'name'          => __( 'Cars' ),
					'singular_name' => __( 'Car' ),
				),
				'public'       => true,
				'has_archive'  => true,
				'rewrite'      => array( 'slug' => 'cars' ),
				'supports'     => array( 'title', 'editor', 'thumbnail' ),
				'show_in_rest' => true,
			)
		);
	}
}

// Dummy data for testing. This function creates 5 random posts.
Test_Data::init();
register_activation_hook( __FILE__, function () {
	Test_Data::create_car_post_type();
	Test_Data::create_random_posts( 5, 'post' );
	Test_Data::create_random_posts( 5, 'car' );
} );

// For debugging. If during our tests we want to cleanup the dummy data
// add_action( 'init', ['Test_Data', 'cleanup'] );