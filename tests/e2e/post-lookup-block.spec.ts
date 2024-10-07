/**
 * WordPress dependencies
 */
const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );
const { createAndPublishPost } = require( './test-utils' );

test.describe( 'TEST E2E <PostLookup>', () => {
	test.beforeEach( async ( { admin, page } ) => {
		// login
		await page.goto( '/wp-login.php' );
		await page.fill( 'input[name="log"]', 'admin' );
		await page.fill( 'input[name="pwd"]', 'password' );
		await page.click( 'input[type="submit"]' );

		// first test
		await expect( page ).toHaveTitle( /Dashboard/ );
	} );

	test( 'Go to New Post and Create new post', async ( { admin, page } ) => {
		const postTitles = [
			'First Test Post',
		];

		for ( const title of postTitles ) {
			const postUrl = await createAndPublishPost( page, admin, title );
			console.log( `Theorically created post:: ${ title }` );

			// Verify the post is published
			await page.goto( postUrl );
			await expect( page.locator( 'h1.entry-title' ) ).toHaveText( title );

			console.log( `Successfully published post: ${ title }` );
		}
	} );

	// Create 5 random posts

	// Create a page

	// Insert the test block

	// Edit the block inserting the search of one of the 5 posts

	// Select one of the resuls and confirm it shows the post and set up the value

	// Remove the block.
} );
