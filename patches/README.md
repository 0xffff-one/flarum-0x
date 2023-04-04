# Composer Dependency Patching
Flarum uses Composer to manage its dependencies. When there is an issue with extension code and modifications need to be made to the vendor dependencies, the cost of reapplying for and publishing a Composer package is too high. Therefore, we use the patching solution to improve this process.

We use [cweagans/composer-patches](https://github.com/cweagans/composer-patches) to achieve this, the patch files are stored in this directory.

The process is as follows:

1. Clone the corresponding Git repository for the dependency separately, or initialize the corresponding extension directory in `vendor` using `git init && git commit -a -m "temporary commit"`.
2. Modify the code that needs updating, and generate the patch file using `git diff > xxxx.patch`, then copy it to the `patches` directory.
3. Specify the dependency and corresponding patch file in `composer.json`.
4. Run `composer i` again.

Reference: https://drupal.stackexchange.com/a/297530
