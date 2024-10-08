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

	// Test 1.
	test( 'Go to New Post and Create new post', async ( { admin, page, editor } ) => {
		const postTitles = [
			'First Test Posts',
		];

		for ( const title of postTitles ) {
			const postUrl = await createAndPublishPost( page, admin, title );
			console.log( `Theorically created post:: ${ title }` );

			// Verify the post is published
			await page.goto( postUrl );
			await expect( page.locator( 'h1.wp-block-post-title' ) ).toHaveText( title );

			console.log( `Successfully published post: ${ title }` );
		}

		// Create a new page
		const pageTitle = 'My own page';
		const pageUrl = await createAndPublishPost( page, admin, pageTitle, 'page' );

		// Go to the page and add a block with text
		await editor.insertBlock( { name: 'core/paragraph' } );
		await page.keyboard.type( 'Hello World!' );

		await page.keyboard.press( 'Enter' );
		await page.keyboard.type( '/coco' );
		await expect( page.locator( '.components-popover__content' ) ).toBeVisible();
		await page.keyboard.press( 'Enter' );

		// Save changes

		// Edit the block inserting the search of one post in the list (look for 'Hello')

		// Select the first result in the list.

		// Save changes
		await page.click( 'button.editor-post-publish-button' );
		await page.waitForSelector( '.components-snackbar', { state: 'visible' } );

		// Verify the post is published
		await page.goto( pageUrl );
		await expect( page.locator( 'h1.wp-block-post-title' ) ).toHaveText( pageTitle );
	} );
} );
