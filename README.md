# 0xFFFF Flarum

根据 0xFFFF 网站实际需要，定制的 [Flarum](https://flarum.org) 脚手架配置。

## 本地开发

需要 Composer 管理依赖包，[Composer 安装教程参考](https://docs.phpcomposer.com/00-intro.html#Installation-*nix)。

所有自定义更新通过 [Git submodule](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97) 来加载，需要留意，参考以下命令：

Commit message 规范：[Angular 规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)，参考：  
[Commit message 和 Change log 编写指南 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html) 


### 初始化环境

1. clone 本仓库
```
git clone https://github.com/0xffff-one/0xffff-flarum.git
cd 0xffff-flarum
git submodule update --init --recursive
```

2. composer 安装依赖
```
composer install
```

3. 配置 PHP 环境，根目录指向 `public`，参考 [0xffff-one/0xffff-env](https://github.com/0xffff-one/0xffff-env)


### 拉取更新

```
git pull --recurse-submodules
git submodule update --init --recursive
```

### 提交更新

与一般的项目类似，若 submodule 有更新，则需要先提交 submodule 里的代码，再提交本仓库的代码。

以修改 `packages/core` 为例：
1. 首先提交 `package/core` 的更新
```
cd package/core
git commit -m "feat: detail"
git push origin HEAD:0xffff
```

2. 在 `0xffff-flarum` 更新引用
```
cd path/to/0xffff-flarum
git add .
git commit -m "feat: xxxxx"
git push
```

## 部署

已通过 Github Actions 实现自动化部署，提交到 master 的更新会自动同步至生产环境。

## License

[MIT License](https://github.com/0xffff-one/0xffff-flarum/blob/master/LICENSE).
