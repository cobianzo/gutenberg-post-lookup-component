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

// Register the test block using block.json
// It will help us to test our component, inserting it with <PostLookup />.
add_action( 'init', function () {
	register_block_type( __DIR__ . '/src/test-block/block.json' );
} );
