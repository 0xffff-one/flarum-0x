# UPSTREAM · flarum-passkey-login local package

## Provenance

| 项 | 值 |
|---|---|
| Fork repository | `https://github.com/0xffff-one/flarum-passkey-login` |
| Fixed fork commit | `75b05b8`（`chore: refresh frontend security dependencies`） |
| Upstream repository | `https://github.com/shaokeyibb/flarum-passkey-login`（base commit `132ccc0`） |
| License | Apache-2.0，见 `LICENSE.md` |
| Snapshot base | fork `75b05b8` 的 70 个受控文件；本地唯一额外文件为本 `UPSTREAM.md` |

## 内容

本目录是 fork `75b05b8` 的完整 source snapshot，保留 package name `hikarilan/flarum-passkey-login`、PHP namespace、settings key、DB table、routes 与 JS public API。不依赖 vendor 作为 source。`js/dist` 与 `js/dist-typings` 为已发布的构建产物，原样保留。

## 同步方式

- 方向：upstream → fork → 本地包。
- 更新 fork 后，以 fork 固定 commit 的受控文件覆盖本目录（排除 `.git`、`vendor`、`node_modules`），随后更新本文件的 fork commit 与 digest。
- 不得把本目录改为 nested Git repository；C2 将把 Composer path package 配置与 lockfile 一起更新后再消费本 snapshot。

## Tree digest

计算命令（在仓库根执行；摘要覆盖 70 个受控文件，排除本 `UPSTREAM.md`、任意层级的依赖目录与临时验证产物）：

```sh
( cd packages/hikarilan/flarum-passkey-login && find . -type f ! -path './.git/*' ! -path '*/vendor/*' ! -path '*/node_modules/*' ! -path '*/coverage-ts/*' ! -name UPSTREAM.md ! -name composer.lock ! -name composer.phar | LC_ALL=C sort | sed -E 's#^\./(.*)$#\1#' | xargs -d '\n' sha256sum ) | sha256sum
```

当前 digest（fork `75b05b8` 的 70 个受控文件，与本地 snapshot 一致；本地唯一额外文件为本 `UPSTREAM.md`）：

```text
867476bfa50fa27c3b8b6f003b56a03714ffcd2a9cd0e9c7b79a0f7e33455afe
```
