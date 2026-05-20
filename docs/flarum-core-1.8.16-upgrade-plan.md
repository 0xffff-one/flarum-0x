# Flarum Core 1.8.16 Upgrade Plan

## Context

This repository vendors only the `framework/core` subtree from the official
`flarum/framework` repository into `packages/flarum/core`. It is not a full
fork of the upstream monorepo.

Current local baseline:

- Local package path: `packages/flarum/core`
- Upstream source path: `framework/core`
- Current local core version: `1.8.9`
- Target upstream core version: `1.8.16`
- Upstream comparison: `flarum/framework` tag `v1.8.9` to tag `v1.8.16`

The upgrade should be done as a subtree refresh plus local patch replay, not as
a normal merge of the whole upstream repository.

## Upstream Changes To Absorb

The upstream `framework/core` diff from `v1.8.9` to `v1.8.16` changes about
135 files. The important changes are:

- Security: validate LESS features in all settings registered as LESS config
  variables, not only `custom_less`. This closes the 1.x fix gap for the LESS
  path traversal / SSRF issue.
- Security: reject expired password reset tokens on password submission.
- Security: delete stale password reset tokens before issuing a new one.
- Security: invalidate active access tokens when a password changes.
- Performance: cache unread/new notification counts and invalidate the caches
  when notifications are read, deleted, or created.
- Performance: add a composite notifications index:
  `notifications_user_unread_type_index`.
- Performance: reduce redundant writes in auth middleware and access token
  touch logic.
- Admin UX: add announcements fetching and dashboard widget.
- Admin UX: add abandoned extension sync and display.
- Admin/API: expose system info through the admin API.
- Extensibility: add `ApplicationBooted` after boot callbacks complete.
- Frontend: multiple small admin/forum component typing, accessibility, and
  extensibility fixes.
- Version: update `Flarum\Foundation\Application::VERSION` to `1.8.16`.

Relevant upstream release note:

https://discuss.flarum.org/d/39109-flarum-1816-released-security-patches

## Local Changes To Preserve

These local changes exist on top of upstream `v1.8.9` and should be replayed
after replacing the core subtree.

### App Boot Flow

File:

- `packages/flarum/core/views/frontend/app.blade.php`

Local behavior:

- Wraps frontend boot in a `boot` function.
- Delays boot with `setTimeout(() => boot())`.
- Keeps JSON payload in `script#flarum-json-payload`.

Risk:

- Upstream may have changed this view. Reapply manually and test forum/admin
  first page load and extension boot.

### Cloudflare Client IP

Files:

- `packages/flarum/core/src/Http/Middleware/ProcessIp.php`
- `packages/flarum/core/src/Api/Serializer/AccessTokenSerializer.php`

Local behavior:

- Reads client IP from `HTTP_X_FORWARDED_FOR`.
- Displays only the first comma-separated IP in access token serialization.

Operational assumption:

- The forum runs behind Cloudflare, so trusting forwarded IP headers is expected
  in this deployment.

Risk:

- This is safe only if origin traffic is restricted to Cloudflare or another
  trusted reverse proxy. If origin can be reached directly, clients can spoof
  `X-Forwarded-For`.

Follow-up hardening:

- Prefer Cloudflare's `CF-Connecting-IP` when available.
- Keep `X-Forwarded-For` fallback for the current deployment if needed.

### Avatar CORS

Files:

- `packages/flarum/core/js/src/common/models/User.tsx`
- `packages/flarum/core/js/src/common/helpers/avatar.tsx`
- rebuilt JS bundles in `packages/flarum/core/js/dist`

Local behavior:

- Appends `cors=1` to avatar URLs.
- Sets `crossOrigin="anonymous"` for avatar images.

Risk:

- The existing helper check uses `avatarUrl?.indexOf('cors=1')`, where `-1` is
  truthy in JavaScript. When replaying, use an explicit check:
  `avatarUrl.includes('cors=1')`.

### Frontend Dependency And Build Flow

Files:

- `packages/flarum/core/js/package.json`
- `packages/flarum/core/js/pnpm-lock.yaml`
- `packages/flarum/core/js/.pnpmfile.cjs`
- rebuilt JS bundles in `packages/flarum/core/js/dist`

Local behavior:

- Uses pnpm lock and dependency overrides for vulnerable frontend packages.
- Adds `build-0x` to copy core frontend build output into root `js/dist-core`.

Risk:

- Upstream `v1.8.16` changes frontend source, dist output, and typings. After
  replaying local package changes, rebuild core frontend assets so source,
  typings, and bundles stay consistent.

### PHP Nullable Compatibility

File:

- `packages/flarum/core/src/Http/RouteHandlerFactory.php`

Local behavior:

- Changes `string $content = null` to `?string $content = null`.

Risk:

- Low. Recheck if upstream already changed these signatures.

## Execution Plan

1. Ensure the working tree is clean.

   ```bash
   git status --short
   ```

2. Fetch the official upstream tags.

   ```bash
   git fetch https://github.com/flarum/framework.git \
     refs/tags/v1.8.9:refs/tags/upstream-v1.8.9 \
     refs/tags/v1.8.16:refs/tags/upstream-v1.8.16
   ```

3. Create a working branch.

   ```bash
   git switch -c upgrade/flarum-core-1.8.16
   ```

4. Export upstream `framework/core` at `v1.8.16` to a temporary directory.

   ```bash
   mkdir -p /tmp/flarum-core-1.8.16
   git archive upstream-v1.8.16 framework/core | tar -x -C /tmp/flarum-core-1.8.16
   ```

5. Replace `packages/flarum/core` with the exported upstream core subtree,
   mapping `framework/core/*` to `packages/flarum/core/*`.

   Keep repository-owned files that are intentionally local only if they are
   still needed after patch replay.

6. Reapply the local changes listed above.

   Recommended order:

   - PHP-only patches: Cloudflare IP, nullable route handler.
   - Blade boot-flow patch.
   - JS source patches: avatar CORS.
   - JS package/build patches: pnpm lock, overrides, `build-0x`.

7. Update `Application::VERSION` to `1.8.16` if it did not come through from
   the subtree replacement.

8. Rebuild frontend assets.

   ```bash
   cd packages/flarum/core/js
   pnpm install
   pnpm run build-0x
   ```

9. Update Composer lock metadata for the path package.

   ```bash
   composer update flarum/core --lock
   ```

10. Review the final diff.

    ```bash
    git diff --stat
    git diff -- packages/flarum/core composer.lock
    ```

## Verification Plan

Run the highest-signal checks available in this repository:

```bash
composer validate
composer audit
php flarum migrate
php flarum cache:clear
php flarum assets:publish
```

If the test suite is usable in the environment, prioritize:

- Core user password reset tests.
- Core access token/session tests.
- Core notification API tests.
- Core settings/LESS validation tests.
- Forum and admin smoke tests in a browser.

Manual checks:

- Login works.
- Remember-me works.
- Logout works.
- Password reset link older than 24 hours is rejected.
- Requesting a new password reset invalidates previous reset emails.
- Changing password invalidates previous sessions.
- Notification count updates after read/delete/new notifications.
- Admin dashboard loads.
- Admin extensions page loads and abandoned extension metadata does not break
  rendering.
- Forum index, discussion page, user page, and admin page load without frontend
  boot errors.
- Avatars still load through the CORS path.
- Access-token IP display shows the Cloudflare client IP as expected.

## Deployment Notes

Before production:

- Back up the database.
- Test on staging with a copy of production data if possible.
- Check the size of the `notifications` table before migration. The new
  composite index may take time on large installations.
- Confirm origin traffic is restricted to Cloudflare, since the local IP patch
  trusts forwarded headers.
- Confirm outbound HTTP from the server is allowed or decide whether to disable
  upstream announcements/abandoned-extension sync.

Production sequence:

```bash
composer install --no-dev --optimize-autoloader
php flarum migrate
php flarum cache:clear
php flarum assets:publish
```

## Rollback Plan

- Keep a database backup from immediately before `php flarum migrate`.
- Keep the previous deploy artifact or previous git commit available.
- If rollback is needed after migrations, restore both code and database backup.
- If only frontend boot fails and the database migration completed cleanly,
  first try reverting the local boot-flow replay or restoring previous JS assets
  before doing a full database restore.

## Known Risks

- Security risk if not upgraded: the current local core remains exposed to the
  `1.8.16` security issues fixed upstream.
- Migration risk: adding the notifications composite index can be slow on large
  databases.
- Session behavior change: users may be logged out after password changes due
  to upstream hardening.
- Network dependency: new admin announcements and abandoned-extension sync
  perform outbound requests.
- Frontend consistency: core JS source, dist files, typings, and `js/dist-core`
  must be rebuilt together.
- Header trust: the Cloudflare IP patch assumes direct origin access is blocked
  or otherwise trusted.
