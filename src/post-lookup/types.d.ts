// Generated with AI.
export interface WPPost {
	id: number; // Unique identifier for the post
	date: string; // Date of publication
	date_gmt: string; // GMT date of publication
	guid: { rendered: string }; // GUID for the post
	modified: string; // Last modified date
	modified_gmt: string; // GMT last modified date
	slug: string; // Post slug
	status: string; // Post status (publish, draft, etc.)
	type: string; // Type of post (post, page, etc.)
	link: string; // Link to the post
	title: { rendered: string }; // Post title
	content: { rendered: string; protected: boolean }; // Post content
	excerpt: { rendered: string; protected: boolean }; // Post excerpt
	author: number; // ID of the author
	featured_media: number; // ID of the featured media
	comment_status: string; // Comment status (open, closed)
	ping_status: string; // Ping status (open, closed)
	sticky: boolean; // Whether the post is sticky
	format: string; // Post format
	meta: object; // Post meta fields (custom fields)
	categories: number[]; // Array of category IDs
	tags: number[]; // Array of tag IDs
	_embedded?: {
		author?: Array< {
			id: number;
			name: string;
			link: string;
		} >;
		featured_media?: Array< {
			id: number;
			source_url: string;
		} >;
	}; // Embedded resources (optional)
}

export type CoreSelectors = {
	getEntityRecord: < T = WPPost >(
		kind: string,
		name: string,
		key: number | string
	) => T | undefined;
	hasFinishedResolution: < T >(
		selectorName: string,
		args: readonly T[]
	) => boolean;
};
