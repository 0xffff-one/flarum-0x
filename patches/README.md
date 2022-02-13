# composer 依赖魔改
Flarum 通过 composer 管理扩展，当扩展代码有问题，改动 vendor 的依赖，需要版本控制的情况下，重新申请、发布 composer 包成本太高，因此我们采用 patch 的方案改善这个流程。

依赖方案：[cweagans/composer-patches](https://github.com/cweagans/composer-patches)

流程：
1. 单独克隆依赖对应的 git 仓库
2. 修改需要更新的部分代码，`git diff > xxxx.patch` 生成 patch 文件，copy 至 patches 目录
3. 在 `composer.json` 指定依赖和对应的 patch 文件
4. 重新 `composer i`

参考：https://drupal.stackexchange.com/a/297530
