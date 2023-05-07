# Composer Dependency Patching
Flarum uses Composer to manage its dependencies. When there is an issue with extension code and modifications need to be made to the vendor dependencies, the cost of reapplying for and publishing a Composer package is too high. Therefore, we use the patching solution to improve this process.

We use [cweagans/composer-patches](https://github.com/cweagans/composer-patches) to achieve this, the patch files are stored in this directory.

You can use [symplify/vendor-patches](https://github.com/symplify/vendor-patches) to generate a patch file automatically.

Reference: https://drupal.stackexchange.com/a/297530

## Patch file generating

1. Find the file you want to edit
2. Make a copy and add a `.old` suffix, `cp FileName.php FileName.php.old`
3. Genetare patch files: `vendor/bin/vendor-patches generate`
4. Double check && commit && push

## JS Patching
Flarum's front-end is a [single-page application (SPA)](https://docs.flarum.org/extend/frontend) that requires pre-building and packaging to load its JS code. When you patch the relevant JS code, you also need to run the same packaging process and ensure it loads the latest build artifacts.

We have patched the JS loading path of `flarum/core` from `vendor/flarum/core/js/dist` to `js/dist-core` in the project's root directory, and add a new build command `build-0x` to `package.json`. 

When you need to modify the code of `flarum/core`, you can follow the steps below regarding the packaging process:

1. Make the desired changes to the file you want, following the steps mentioned in the **Patch file generating**
2. Locate to `vendor/flarum/core/js/`
3. Install front-end dependencies: `npm i`
4. Build: `npm run build-0x`, it will generate the new bundled js at `js/dist-core`.
5. Double check && commit && push

For other extensions, you can make similar adjustments by placing the frontend build artifacts in a `js/dist-xxx` directory.
