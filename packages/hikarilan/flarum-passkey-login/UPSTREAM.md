# UPSTREAM · flarum-passkey-login local package

## Provenance

| 项 | 值 |
|---|---|
| Fork repository | `https://github.com/0xffff-one/flarum-passkey-login` |
| Fixed fork commit | `132ccc069270c25f05ec10f53853c72eca2bc753`（`132ccc0 chore: update deps`） |
| Upstream repository | `https://github.com/shaokeyibb/flarum-passkey-login`（同 commit `132ccc0`） |
| License | Apache-2.0，见 `LICENSE.md` |
| Snapshot base | fork main 的 52 个受控文件；本地唯一额外文件为本 `UPSTREAM.md` |

## 内容

本目录是 fork `132ccc0` 的完整 source snapshot，保留 package name `hikarilan/flarum-passkey-login`、PHP namespace、settings key、DB table、routes 与 JS public API。不依赖 vendor 作为 source。`js/dist` 为已发布的 bundle，原样保留。

## 同步方式

- 方向：upstream → fork → 本本地包。
- 更新 fork 后，以 fork 固定 commit 的受控文件覆盖本目录（排除 `.git`、`vendor`、`node_modules`），随后更新本文件的 fork commit 与 digest。
- 不得把本目录改为 nested Git repository；C2 将把 Composer path package 配置与 lockfile 一起更新后再消费本 snapshot。

## Tree digest

计算命令（在仓库根执行；摘要覆盖 52 个受控文件，排除本 `UPSTREAM.md`，避免自引用）：

```sh
( cd packages/hikarilan/flarum-passkey-login && find . -type f ! -name UPSTREAM.md | LC_ALL=C sort | sed -E 's#^\./(.*)$#\1#' | xargs -d '\n' sha256sum ) | sha256sum
```

当前 digest（fork `132ccc0` 全量受控文件，与本地 52 个受控文件一致；本地唯一额外文件为本 `UPSTREAM.md`）：

```text
fe53de3ecfe052fd6f62622fb72533d7e51a2b0fe63f274e366724089c395bda
```
