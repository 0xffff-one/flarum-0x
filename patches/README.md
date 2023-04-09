# Composer Dependency Patching
Flarum uses Composer to manage its dependencies. When there is an issue with extension code and modifications need to be made to the vendor dependencies, the cost of reapplying for and publishing a Composer package is too high. Therefore, we use the patching solution to improve this process.

We use [cweagans/composer-patches](https://github.com/cweagans/composer-patches) to achieve this, the patch files are stored in this directory.

You can use [symplify/vendor-patches](https://github.com/symplify/vendor-patches) to generate a patch file automatically.

Reference: https://drupal.stackexchange.com/a/297530
