#TODO NEXT:

- Learn about artifacts

# What is this project

- This repository creates the component <PostLookup>.
-- it allows to type up a post name, and select a post from the list.
-- It has the vantage respect the current GB blocks, which load all posts from the beginning.
- It also creates a test block in order to test it.
- Uses typescript and `playwright` testing, developed in `wp-env` with `wp-scripts` package.
- This projects intends to be a reference for myself in the future, so the notes in this md
are adapted to myself.

proyecto/
├── src/
│   ├── post-lookup/         # main component: we export it as an npm package
│   │   ├── index.ts
│   │   ├── PostLookup.tsx
│   │   └── post-lookup.css
│   └── test-block/          # test block used for testing purposes
│       ├── index.ts
│       └── edit.tsx (and more files here)
├── dist/                    # Salida para el componente distribuible
├── build/                   # Nueva carpeta para el bloque de prueba
├── webpack.config.js
└── package.json

References from other repos:
- https://github.com/wp-blocks/typescript-wp-block/tree/master
- https://github.com/WordPress/gutenberg/

# Creation of the project (steps followed)

-   Setup wp-env (.wp-env.json, eventually the schema too) (look for files `*wp-env*`)
-   Setup linting packages (eslint, stylelint, prettier) (look for files `*eslint*`, `*prettier*`, `*stylelint*`, and text containing that in `package.json`)
-   For eslint, we need to adapt to typescript.
    -- `package.json` with `ts-loader` and `typescript`, and the types packages.
    -- we need to include the ts-loader in our webpack.config.js
    -- eslint to include typescript parsing. it needs a eslint-typescript parser package
    Some tutorials ask to install "ts-loader" AND "typescript". But instead of that, we extend '@wp-blocks/tsconfig' in `tsconfig.json`

        https://github.com/wp-blocks/typescript-wp-block/blob/master/.eslintrc.json

-   Setup playwright (look for files `*playwright*`). Installing `@wordpress/e2e-test-utils-playwright`. (tb la libreria @wordpress/e2e-test-utils trae varias herramientas)
-- check https://github.com/WordPress/gutenberg/tree/trunk/packages/e2e-test-utils-playwright
-- reference https://github.com/WordPress/gutenberg/tree/trunk/test/e2e
-- https://developer.wordpress.org/block-editor/contributors/code/testing-overview/e2e/
-- https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/

-   Setup typescript config ( following https://github.com/wp-blocks/typescript-wp-block/blob/master/tsconfig.json)
    -- Tuve que instalar varios otros packages:
    --- eslint-import-resolver-typescript para que me reconozca los imports relativos

-   Setup composer packages (look foe files `*phpcs*`): phpcs phpcbf, standards, and phpstan
-   Install wp-scripts package ()
    -- Setup component entry point and test block for testing it. (/src and webpack.config.js)
    -- for some reason we need ajv: we install it.

## Start working: checking lintings

-   Start env and development. Site running at `localhost:8888` and `/dist` folder with js scripts

```
WordPress development site started at http://localhost:8888/
WordPress test site started at http://localhost:8889/
MySQL is listening on port 52332
MySQL for automated testing is listening on port 52334
```

Use `docker ps` to confirm the 4 containers are running.

-   Check lintings:
    -- ❌ check phpcs extension in vscode: it should highlight errors like `echo "a";;;;;` (didnt work for me!)
    -- ❌ check phpcbf extension in vscode: it should fix those errors with 'format document' (doest work for me)
    -- ✅ check phpcs linting from command line: type `composer lint` or `./vendor/bin/phpcs plugin.php`
    -- ✅ check phpcbf from command line: type `composer format` or `./vendor/bin/phpcbf plugin.php`
    -- ❌ check that Prettier formatting is working ok. Write a js file with double quotes: they should be formatted to single quotes on save or using "Format document"
    Here I found a problem. I get an automatic reformat and I don't know what extension is doing it. **Prettier** works ok from terminal with `❯ npx prettier --write src/post-lookup/PostLookup.tsx`, and **ESlint** works also ok from terminal with `❯ npx eslint src/post-lookup/PostLookup.tsx --fix`. But when I set format on save, or ask VSCode to format with Prettier, y makes some extra formatting like setting a line in multiple lines, when I've disabled it in `.prettierrc.js`. SoI had to disable _Format on Save_
    -- ✅ check js linting and fixing with vscode extension: create errors and save without format (don't let Prettier to fix them!)
    ---- `npm run lint:js src/index.ts`
    ---- `npm run lint:js src/index.ts -- --fix`
    -- ✅ same with css files
    ---- `npm run lint:jcss src/index.ts`


In VSCode, sometimes you'll need to add the setting in your workspace:

`"prettier.prettierPath": "./node_modules/prettier",`

## Developing the simple test block without the component

After some development, the block was working ok, and it was using the
component properly.

@TODO:the component should accept `postType`.

# Setting up playwright.

After installing the package, the config file, and `npx playwright install`,  we can run playwright, for a simple file:

❯ npx playwright test tests/simple.spec.ts --debug

once tests have passed we can check.

❯ npx playwright show-report

Runs the server and the watching.

# Creating a test as a npm package

when developing oyu can use in this forlder:
`npm link`

At this point, gutenberg-post-selector-component is now globally available, and you can link it to your testing project using `❯ npm link gutenberg-post-selector-component`