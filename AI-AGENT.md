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
`selectedPostId` as the ID of the current post, if any.
`updateSelectedPostId = ( postId ) => void`, and it's responsability of the parent to update the `selectedPostId` property when it's called.

# First step:

Show me the steps that we will follow, to setup the project with wp-env, in typescript, using playwright and phpcs, phpcbf and phpstan.

# Second step:

I have already created the enviornment:

```
WordPress development site started at http://localhost:8888/
WordPress test site started at http://localhost:8889/
MySQL is listening on port 52332
MySQL for automated testing is listening on port 52334
```

My linting are working more or less ok (phpcs, phpcbf, eslint, stylelint). I didn't check phpstan yet.
The compiling works ok, `npm run start` runs the wp-scripts and compiles int `dist/*js`
Remebmer that folder, and consider that it's not `/build` (it's `/dist` instead).

My `webpack.config.js` has been adpated to compile the typescript for my test block, and the ts related to my lookup component.
I didn't include the ts-loader plugin
The block works ok and I can insert it in the editor.

Now, I want to develop the lookup post component. And when it's finished, I want to be able to convert it into a package, so the distribution js should be in an independent js file that I can import from another script.

show me the files structure I should follow

NOW: Help me to set up the development environment for developing a plugin including a block in typescript. What changes should I do? I guess I need to install some packages and adapt tsconfig.json and the linting, .eslintrc, isnt it?

# Third step:

Now it's time to start the end to end testing, using playwright.
Tell me the steps to follow

I want to create an e2e test for my gutenberg component and gutenberg block, both in a plugin. Everything is setup with playwright, and Iwant to use the funcions provided by @wordpress/e2e-test-utils-playwright. Hel me to create the e2e test, which shuld include small tests. Use test.beforeEach to login, and create a post for every subsequent test.

# Fourth step:

I want to convert my project into an npm package. The `dist` folder should be distributed so I can import <PostLookup> from any other Gutenberg project, just installing the package and importing the component into Edit.jsx

# Introduction for any future task to ask to an AI agent

I have created a new component for Gutenberg that I can include inside the <InspectorControls> component.
The component is called <PostLookup />
I have created a simple plugin with just a block called `post-lookup-test-block`, that uses that component in the Inspector controls, showing the selected post.
I have started the plugin with `plugin.php`.
The textdomain is `coco`.
I compile everything using `@wordpress/scripts`

My package.json for the component starts by:

```
{
    "name": "@cobianzo/gutenberg-post-lookup-component",
    "version": "1.0.1",
    "main": "dist/post-lookup.js",
    "style": "dist/post-lookup.css",
    "files": [
        "dist"
    ],
    "private": false,
```

and the tree strucure is:

```
├── build   # This is just for the development of this repo. It's not exported
│   ├── style-test-block.css
│   ├── test-block.asset.php
│   ├── test-block.css
│   ├── test-block.js
├── dist   # This is what I want to export
│   ├── post-lookup-rtl.css
│   ├── post-lookup.asset.php
│   ✅ ─ post-lookup.css
│   ✅ ─ post-lookup.js
│   ├── post-lookup.js.map
│   ├── style-post-lookup-rtl.css
│   ├── style-post-lookup.css
│   ├── style-test-block-rtl.css
│   ├── style-test-block.css
│   ├── style-test-block.css.map
│   ├── test-block
│   │   ├── block.json
│   │   └── render.php
│   ├── test-block.asset.php
│   ├── test-block.js
│   └── test-block.js.map
├── composer.json
├── package.json
├── playwright.config.ts
├── plugin.php
├── src
│   ├── post-lookup   # This folder is the one that generates the /dist files
│   │   ├── PostLookup.tsx
│   │   ├── index.ts
│   │   ├── post-lookup-styles.css
│   │   ├── types.d.ts
│   │   ├── useDebounce.ts
│   │   ├── usePost.ts
│   │   └── usePostSearch.ts
│   └── test-block
│       ├── Edit.tsx
│       ├── block.json
│       ├── index.ts
│       ├── render.php
│       ├── save.tsx
│       ├── style.css
│       └── types
│           └── types.d.ts
├── tests
│   ├── e2e
│   │   ├── post-lookup-block.spec.ts
│   │   └── test-utils.ts
│   └── example.spec.ts
├── tsconfig.json
└── webpack.config.js

```



