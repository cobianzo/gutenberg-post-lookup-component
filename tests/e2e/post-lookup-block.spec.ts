/**
 * WordPress dependencies
 *
 * Check @wordpress/e2e-test-utils-playwright sourcede for refenrence:
 * https://www.npmjs.com/package/@wordpress/e2e-test-utils-playwright
 * and examples of tests in gutenberg : https://github.com/WordPress/gutenberg/blob/3fd7c8a2cbdb321611c447d64d6fe4b79dfdefd0/test/e2e/specs/editor/blocks/buttons.spec.js
 *
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
	test( 'Create new post', async ( { admin, page, editor } ) => {
		const postTitles = [
			'First Test Posts',
		];

		for ( const title of postTitles ) {
			const postUrl = await createAndPublishPost( page, admin, editor, title );
			console.log( `Theorically created post:: ${ title }` );

			// Verify the post is published in the FE
			await page.goto( postUrl );
			await expect( page.locator( 'h1.wp-block-post-title' ) ).toHaveText( title );

			console.log( `Successfully published post: ${ title }` );
		}
	} );

	// Test 2: Create block in a new page.
	test( 'Create new page and insert component', async ( { admin, page, editor } ) => {
		// Create a new page
		const pageTitle = 'My own page';
		const pageUrl = await createAndPublishPost( page, admin, editor, pageTitle, 'page' );

		// Go to the page and add a block with text
		await editor.insertBlock( { name: 'core/paragraph' } );
		await page.keyboard.type( 'Hello World!' );

		// insert block manuall way 1:
		await page.keyboard.press( 'Enter' );
		await page.keyboard.type( '/coco' );
		await expect( page.locator( '.components-popover__content' ) ).toBeVisible();
		await page.keyboard.press( 'Enter' );

		// Use the lookup component!
		const lookup = await page.getByPlaceholder( 'Search…' );
		expect( await lookup.isVisible() ).toBeTruthy();
		await lookup.focus();
		await page.keyboard.type( 'post' );

		// now the dropdown of results must be shown.
		const thirdResultSelector = '.coco__post-lookup li:nth-child(3) > button';
		const thirdElement = page.locator( thirdResultSelector );
		const textThirdElement = await thirdElement.textContent();
		expect( textThirdElement.toLowerCase() ).toContain( 'post' );
		console.log( `The text of the third element is: ${ textThirdElement }` );

		await page.locator( thirdResultSelector ).click();

		// confirm the block shows the content:
		// const lastBlock = editor.getBlocks().slice( -1 )[ 0 ];
		// console.log( `Last block :`, lastBlock );
		// await expect.poll( lastBlock ).toMatchObject( {
		// 	name: 'coco/test-block',
		// } );

		// Save changes
		await page.click( 'button.editor-post-publish-button' );
		await page.waitForSelector( '.components-snackbar', { state: 'visible' } );

		// save the current url to come back later
		const currentEditPageUrl = await page.evaluate( () => window.location.href );

		// Verify the post is published
		await page.goto( pageUrl );
		await expect( page.locator( 'h1.wp-block-post-title' ) ).toHaveText( pageTitle );

		await page.goto( currentEditPageUrl );
		// Select the last block in the editor

		// Edit the block inserting the search of one post in the list (look for 'coco')

		// // now we select use the component, which is what matters!
		// await page.focus( '.coco__post-lookup input' ); // getByPlaceholder('Search…')
		// await page.keyboard.type( 'post' ); // this will show in the dropdown the 5 posts.
		// const thirdElement = page.locator( '.coco__post-lookup ul li:nth-child(3) > button' );
		// const text = await thirdElement.textContent();
		// console.log( `The text of the third element is: ${ text }` );
		// await thirdElement.click();
		// // Assert that the selected block has a heading <h2> with the same text as the selected post.
		// const selectedBlock = page.locator( '.block-editor-block-list__block.is-selected' );
		// await expect( selectedBlock.locator( 'h2' ) ).toHaveText( text );
	} );
} );
