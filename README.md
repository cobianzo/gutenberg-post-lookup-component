# Creation of the project

-   Setup wp-env (.wp-env.json, eventually the schema too) (look for files `*wp-env*`)
-   Setup linting packages (eslint, stylelint, prettier) (look for files `*eslint*`, `*prettier*`, `*stylelint*`, and text containing that in `package.json`)
-   Setup playwring (look for files `*playwring*`)
-   Setup composer packages (look foe files `*phpcs*`): phpcs phpcbf, standards, and phpstan
-   Install wp-scripts package ()
    -- Setup component entry point and test block for testing it. (/src and webpack.config.js)
    -- for some reason we need ajv: we install it.

## Start working: checking lintings

-   Start env and development. Site running at `localhost:8888` and `/dist` folder with js scripts
-   Check lintings:
    -- check phpcs extension in vscode: it should highlight errors like `echo "a";;;;;` (didnt work for me!)
    -- check phpcbf extension in vscode: it should fix those errors with 'format document' (doest work for me)
    -- check phpcs linting from command line: type `composer lint` or `./vendor/bin/phpcs plugin.php`
    -- check phpcbf from command line: type `composer format` or `./vendor/bin/phpcbf plugin.php`
    -- check js linting and fixing with vscode extension: create errors and save without format (don't let Prettier to fix them!)
    ---- `npm run lint:js src/index.ts`
    ---- `npm run lint:js src/index.ts -- --fix`
    -- same with css files
    ---- `npm run lint:jcss src/index.ts`
    -- check that Prettier formatting is working ok. Write a js file with double quotes: they should be formatted to single quotes on save or using "Format document"

In VSCode, sometimes you'll need to add the setting in your workspace:

`"prettier.prettierPath": "./node_modules/prettier",`


## Developing the simple test block without the component

