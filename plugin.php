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
 */



// Register the test block using block.json
// It will help us to test our component.
add_action( 'init', function() {
    register_block_type( __DIR__ . '/test-block/block.json' );
} );
