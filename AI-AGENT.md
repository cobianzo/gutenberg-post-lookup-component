# These are my notes to save the promtps that I will share with an AI agent

I want to create a new component for Gutenberg that I can include inside the <InspectorControls> component.
The component will be called <PostLookup />
For it, we will create a simple plugin with just a block called `post-lookup-test-block`, that uses that component in the Inspector controls, showing the selected post.
I like to start the plugin with `plugin.php`.
The textdomain will be `coco`, as that's the name of my company.

Technologies I want to use:

-   I want to build it in **typescript**
-   My environment will be `wp-env`, in order to use both development and test environments. I have it globally installed so we don't need to install it locally.
-   I want to do e2e testing using `playwright`, so I need to set it up.
-   Once the plugin is working, I might want to be able to easily build just the js of the component and convert it into a package to share with npm.
-   There is little php in this plugin, but still, I want to use `phpcs`, `phpcbf` and `phpstan`. So I'll need to set that up.
-   We will compile everything using `@wordpress/scripts`

This component is going to be a Text lookup input field. When typing in the input field, it will debounce the input before starting to look up. In the look up, it will search for the posts containing in their title the string that has been typed (the results will be trimmed to a max of 10). Then the user can use the arrows to select any of the results, when clicking return, that post id will be selected, the input will be cleared, and the post Title will be shown below the input.
It will also receive two mandatory props:
`selectedPost` as the ID of the current post, if any.
`updateSelectedPost = ( selectedPost ) => void`, and it's responsability of the parent to update the `selectedPost` property when it's called.

# First step:

Show me the steps that we will follow, to setup the project with wp-env, in typescript, using playwright and phpcs, phpcbf and phpstan.

# Second step:

I have already created the enviornment, and I have my local running in localhost:8888. My linting are working more or less ok (phpcs, phpcbf, eslint, stylelint). I didn't check phpstan yet.
The compiling works ok, `npm run start` runs the wp-scripts and compiles int `dist/*js`
