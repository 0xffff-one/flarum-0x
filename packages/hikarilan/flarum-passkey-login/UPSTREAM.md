# UPSTREAM · flarum-passkey-login local package

## Provenance

| 项 | 值 |
|---|---|
| Fork repository | `https://github.com/0xffff-one/flarum-passkey-login` |
| Fixed fork commit | `19fe3bb`（`fix: restore passkey registration options`） |
| Upstream repository | `https://github.com/shaokeyibb/flarum-passkey-login`（同 commit `132ccc0`） |
| License | Apache-2.0，见 `LICENSE.md` |
| Snapshot base | fork `19fe3bb` 的 56 个受控文件；本地唯一额外文件为本 `UPSTREAM.md` |

## 内容

本目录是 fork `19fe3bb` 的完整 source snapshot，保留 package name `hikarilan/flarum-passkey-login`、PHP namespace、settings key、DB table、routes 与 JS public API。不依赖 vendor 作为 source。`js/dist` 为已发布的 bundle，原样保留。

## 同步方式

- 方向：upstream → fork → 本地包。
- 更新 fork 后，以 fork 固定 commit 的受控文件覆盖本目录（排除 `.git`、`vendor`、`node_modules`），随后更新本文件的 fork commit 与 digest。
- 不得把本目录改为 nested Git repository；C2 将把 Composer path package 配置与 lockfile 一起更新后再消费本 snapshot。

## Tree digest

计算命令（在仓库根执行；摘要覆盖 55 个受控文件，排除本 `UPSTREAM.md` 与 Composer 安装元数据）：

```sh
( cd packages/hikarilan/flarum-passkey-login && find . -type f ! -path './.git/*' ! -path './vendor/*' ! -path './node_modules/*' ! -name UPSTREAM.md ! -name composer.lock ! -name composer.phar | LC_ALL=C sort | sed -E 's#^\./(.*)$#\1#' | xargs -d '\n' sha256sum ) | sha256sum
```

当前 digest（fork `19fe3bb` 全量受控文件，与本地 56 个受控文件一致；本地唯一额外文件为本 `UPSTREAM.md`）：

```text
2adb8e5b30ded685aa89aee6aeec0e6ffbe40e2fcef56ea7bd2d00c56ef89da4
```
