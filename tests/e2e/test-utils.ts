import { Page } from '@playwright/test';
import { Admin } from '@wordpress/e2e-test-utils-playwright';

export async function createAndPublishPost( page: Page, admin: Admin, title: string ): Promise<string> {
	await page.goto( '/wp-admin/post-new.php' );
	await admin.createNewPost( { title } );

	// Click the "Publish" button
	await page.click( 'button.editor-post-publish-panel__toggle' );

	// Wait for the secondary publish button to appear and click it
	await page.waitForSelector( 'button.editor-post-publish-button' );
	await page.click( 'button.editor-post-publish-button' );

	// Wait for the success notice
	await page.waitForSelector( '.components-snackbar', { state: 'visible' } );

	// Get and return the published post URL
	const postUrl: string = await page.evaluate( () => {
		const href = document.querySelector( '.post-publish-panel__postpublish-buttons a' )?.getAttribute( 'href' );
		return href ?? '';
	} );
	console.log( 'retrieved url for ne post: ', postUrl, title );
	return postUrl;
}
