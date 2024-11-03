# What is this project

-   This repository creates the component `<PostLookup>`.
    -   It replaces the built in `<ComboboxControl>`, which loads all posts on page load.
    -   it allows to type up a post name, and select a post from the list.
-   The repo includes a test block in order to test it. See `plugin.php`, which is the start of the plugin containing this block, and it has functions to create dummy data.
-   Uses typescript and `playwright` testing, developed in `wp-env` with `wp-scripts` package.

git repo: https://github.com/cobianzo/gutenberg-post-lookup-component/tree/main

npm package: https://www.npmjs.com/package/@cobianzo/gutenberg-post-lookup-component

# TO DOs (or @TODOs)

- The component should admit other query params on top of the postType (post status, etc...).
- CI/CD: run tests and linting only when relevant files change in the commit (not need only if README.md is updated).
- Improve the repo with continous integration: currently it takes too long to run.
- Finish the e2e testing, there are still things to check.
- Accept arrows up and down to select one of the options of the dropdown.
- Create a changelog.
- Maybe use husky
- TOFIX: The component works in the sidebar, but not inside the editor.
- Add the prop 'label' for the component
- Replace the CSS in JS for a regular CSS (and check that stylelint works ok in it)

References from other repos:

-   https://github.com/wp-blocks/typescript-wp-block/tree/master
-   https://github.com/WordPress/gutenberg/

# Developer guide basic notes

If you are a developer, download or clone this repo. You'll need to have `wp-env` installed globally
- VSCode extensions: ESLint, phpcs and phpcbf, Playwright.
- Install the stuff: `npm install`, `composer`
- Start server: `npm run up`
- Start build watch with wp-scripts: `npm run start`
- Test the stuff: `npm run test:e2e`
- Linting your stuff with `npm run lint:js`, `npm run lint:js -- --fix`, `composer lint`, `composer format`
- Test manually: open the WP, create a new post or page, insert the block with frefix `coco`. you can use a CPT, create random data by loading the functions of `plugin.php`

# Usage of the npm package

If you are a consumer pf the npm package:

`npm install @cobianzo/gutenberg-post-lookup-component`

in your `Edit.jsx` or `Edit.tsx` (or equivalent)

`import PostLookup from '@cobianzo/gutenberg-post-lookup-component';`

Assuming that you have a block with an attribute called `favPost` (type number)

```
<InspectorControls>
    <Panel>
        <PanelBody>
            <PostLookup
                selectedPostId={ props.attributes.favPost }
                postType='post'
                onChange={ ( newPostId ) =>
                    props.setAttributes( {
                        favPost: newPostId || 0,
                    } )
                }
            />
        </PanelBody>
    </Panel>
</InspectorControls>
```

# Development process (steps followed):

As this is my first `npm` package, I include some helping instructions as a reference for developers.

-   Setup wp-env (`.wp-env.json`, eventually the schema too) (look for files `*wp-env*`)
-   Setup linting packages (eslint, stylelint, prettier) (look for files `*eslint*`, `*prettier*`, `*stylelint*` (we don't need it as we barely use it), and text containing that in `package.json`)
-   For eslint, we need to adapt to typescript.
    - `package.json` with `ts-loader` and `typescript`, and the types packages.
    - we need to include the `ts-loader` in our `webpack.config.js` (eslint-typescript parser)
    Reference:
        https://github.com/wp-blocks/typescript-wp-block/blob/master/.eslintrc.json

-   Setup playwright (look for files `*playwright*`). Installing `@wordpress/e2e-test-utils-playwright`. (also the library @wordpress/e2e-test-utils brings several tools)
    - check https://github.com/WordPress/gutenberg/tree/trunk/packages/e2e-test-utils-playwright
    - https://developer.wordpress.org/block-editor/contributors/code/testing-overview/e2e/
    - https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/
    - Documentation is very poor for this library, so you might need to check the repo itself, in github or npmjs:
        - https://www.npmjs.com/package/@wordpress/e2e-test-utils-playwright
        - https://github.com/WordPress/gutenberg/tree/trunk/packages/e2e-test-utils-playwright/src

-   Setup typescript config ( following https://github.com/wp-blocks/typescript-wp-block/blob/master/tsconfig.json)

    - I had to install some other packages:
        -   `eslint-import-resolver-typescript` to recognize the relative imports.

-   Setup composer packages (look foe files `*phpcs*`): phpcs phpcbf, standards, and phpstan
-   Install `wp-scripts` package (this is the regular setup for ewbpack bundling)
    - Setup component entry point and test block for testing it. (/src and webpack.config.js)
    - In the end I created different entry and output points for the component (--> /dist) and the test block (--> /build, not intended for distribution)
    - for some reason we need `ajv` package: we install it.

## Start working: checking lintings

-   Start env and development. `npm run up` or `npx wp-env start`. I also have installed `@wordpress/env` globally so it has been added to my PATH, so I can run it with `wp-env start`.
If I want to use other ports I can do: `WP_ENV_PORT=3333 WP_ENV_TESTS_PORT=3334 wp-env start`.

By default, You should get something like this.

```
WordPress development site started at http://localhost:8888/
WordPress test site started at http://localhost:8889/
MySQL is listening on port 52332
MySQL for automated testing is listening on port 52334
```

(login with admin/password)

Use `docker ps` to confirm the 4 containers are running.

-   Check lintings:
    -   ❌ check phpcs extension in vscode: it should highlight errors like `echo "a";;;;;` (didnt work for me!, so I rely in my command line checks)
    -   ❌ check phpcbf extension in vscode: it should fix those errors with 'format document' (doest work for me, so I rely in my command line fixes)
    -   ✅ check phpcs linting from command line: type `composer lint` or `./vendor/bin/phpcs plugin.php`
    -   ✅ check phpcbf from command line: type `composer format` or `./vendor/bin/phpcbf plugin.php`
    -   ❌ check that Prettier formatting is working ok. Write a js file with double quotes: they should be formatted to single quotes on save or using "Format document"
        Here I found a problem. I get an automatic reformat and I don't know what extension is doing it. **Prettier** works ok from terminal with `❯ npx prettier --write src/post-lookup/PostLookup.tsx`, and **ESlint** works also ok from terminal with `❯ npx eslint src/post-lookup/PostLookup.tsx --fix`. But when I set format on save, or ask VSCode to format with Prettier, y makes some extra formatting like setting a line in multiple lines, when I've disabled it in `.prettierrc.js`. SoI had to disable _Format on Save_
    -   ✅ check js linting and fixing with vscode extension: create errors and save without format (don't let Prettier to fix them!)
        -   `npm run lint:js src/index.ts`
        -   `npm run lint:js src/index.ts -- --fix`
    -   ✅ same with css files
        -   `npm run lint:css`

In VSCode, sometimes you'll need to add the setting in your workspace:

`"prettier.prettierPath": "./node_modules/prettier",`

## Developing the simple test block without the component

After some development, the block was working ok, and it was using the
component properly.

@TODO:the component accepts `postType`, but it should be better used in the API call, because in the endpoint 'wp/post' is converted manually to 'wp/posts'
It should accept other filters.

# Setting up playwright.

After installing the package, the config file, and `npx playwright install`, we can run playwright, for a simple file (I created a spec that checks that `true` is `true`):

❯ npx playwright test tests/simple.spec.ts --debug

once tests have passed we can check.

❯ npm run test:e2e -- --ui  (if you want the UI console)

# Creating a test as a npm package

when developing oyu can use in this forlder:
`npm link`

At this point, gutenberg-post-selector-component is now globally available, and you can link it to your testing project using `❯ npm link gutenberg-post-selector-component`

# Publish the npm package

We publish with `npm publish` at

https://www.npmjs.com/package/@cobianzo/gutenberg-post-lookup-component

# I added phpstan at the end.

We included the packages `szepeviktor/phpstan-wordpress phpstan/extension-installer`

No further configuration is needed, phpstan/extension-installer handles discovery automatically.

# Continous integration

Setup of .github/wokflows/ci.yml 

@TODO: add cache to avoid installing node and all the dependencies every time. Use artifacts to help the review of the logs, and add a summary after the pipe flow.