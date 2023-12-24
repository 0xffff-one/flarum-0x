## Flarum 0x
Customized [flarum](https://github.com/flarum/flarum) for the [0xFFFF Community](https://0xffff.one/).

We are working on:

1. Customisation based on the 0xFFFF Community needs.
2. A modern, cloud-based Flarum Development & Deployment workflow.
3. Encourage more people to participate and contribute to the Flarum Community.

## Customizations
The customizations of **Flarum 0x** consists of these parts:
1. Initialized [Flarum Skeleton](https://github.com/flarum/flarum) with our custom `composer.json` / `composer.lock` config (contains the extensions we are using).
2. Patches for the extensions in `vendor/` to make some small changes without publishing new Composer Packages (see [patches/README.md](patches/README.md)).
3. Custom [flarum extenders](https://docs.flarum.org/extend/start#extenders) in `extend.php`.
4. Custom third party extension integrated into this repo as submodules.

The features we have customised include:
1. Support global assets CDN config.
2. Save avatars to S3-compatible Storage instead of local disk (thanks to [askvortsov1/flarum-azure-poc](https://github.com/askvortsov1/flarum-azure-poc)).
3. Add support for [blomstra/flarum-redis](https://github.com/blomstra/flarum-redis) extension (for Queue / Cache / Session), enable the Queue Worker to consume the [Background Tasks](https://docs.flarum.org/internal/package-manager#background-tasks) asynchronously.
4. Add support for custom head HTML like add some `<script>` / `<link>` / `<meta>` tags in `config.php`.
5. Replace some hard-coded JsDelivr resource URLs with ByteDance's cdn (for mainland China users).
6. All the extensions required at `composer.json`
7. ...

## Local Development Env Setup
We are using [Development Containers](https://containers.dev/) with our LNMP config to save the time required to configure the environment.

Steps to configure your local development environment:
1. Install Docker (Docker Desktop / Docker CE / OrbStack, etc...) on your dev machine.
2. Install VSCode and [Dev Containers VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
3. Just clone this repository and use VSCode open it, then VSCode would notify you to open the repository in the Dev Container.
4. After the Dev Container has initialised, open `http://localhost:8080` and see your Flarum app instance (It will automatically forward the ports to local).

Or you can just create a new GitHub codespace with this repo, then start development.

## Production Deployment
Basically running a **Flarum 0x** website requires two Docker container instances.

1. **Flarum 0x**, latest pre-built image: `ghcr.io/0xffff-one/flarum-0x:latest`.
2. **A MySQL-compatible DBMS**, MySQL, MariaDB or other, use MySQL with [ngram](https://dev.mysql.com/doc/refman/5.7/en/fulltext-search-ngram.html) support for CJK full-text search.

You can deploy them via [Docker Compose](./docker-compose.yml).

## Contribution
Any contributions are welcome. Please feel free to:

* Open an Issue
* Create a Pull Request
* Comment in an Issue / PR / commit
* Open a Discussion in [0xFFFF Forum](https://0xffff.one/) / Discord / QQ Group

Thank you for willing to contribute to this project!

### TODO

 - [x] new Dev Envionment setup config
 - [x] build process for Front-end Patching
 - [x] Update latest README.md about Dev Env setup and Production deployment
 - [x] Optimize the production Docker image config

## Contributors
This project exists thanks to all the people who contribute.

<a href="https://github.com/0xffff-one/flarum-0x/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=0xffff-one/flarum-0x" />
</a>

## Reference
 * [Flarum Community](https://discuss.flarum.org/)
 * [Flarum Documentation](https://docs.flarum.org/)
 * [Extending Flarum | Flarum Documentation](https://docs.flarum.org/extend/)
 * [Flarum 中文社区](https://discuss.flarum.org.cn/)
 * [ECNU-Forum/ECNU-Forum](https://github.com/ECNU-Forum/ECNU-Forum)

## License

Flarum is open-source software licensed under the [MIT License](https://github.com/flarum/flarum/blob/master/LICENSE).

