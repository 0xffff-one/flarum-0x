## Flarum 0x
Customized [flarum](https://github.com/flarum/flarum) for the [0xFFFF Community](https://0xffff.one/).

We are working on:

1. Customisation based on the 0xFFFF Community requirements.
2. A modern, cloud-based Flarum Development & Deployment workflow.
3. Encourage more people to contribute to the Flarum community.

## Customizations
The customizations of **Flarum 0x** consists of these parts:
1. Initialized [Flarum Skeleton](https://github.com/flarum/flarum) with our custom `composer.json` / `composer.lock` config (contains the extensions we are using).
2. Patches for the extensions in `vendor/` to make some small changes without publishing new Composer Packages.
3. Custom [flarum extenders](https://docs.flarum.org/extend/start#extenders) in `extend.php`.
4. *(To Be Done)* Custom third-party extension integrated in this repo as submodules.

The features we have customised:
1. Support global assets CDN config
2. Save avatar to S3
3. Support redis driver (Queue / Cache / Session)
4. Custom Pinyin slug
5. Replace jsdelivr assets' URL with ByteDance cdn (for Mainland China Users)
6. ... *(To Be Done)*

## Setup Local Development Env
We are using [Development Containers](https://containers.dev/) with our LNMP config to reduce the time required to configure the environment.

Steps to configure your local development environment:
1. Install Docker (Docker Desktop / Docker CE) on your dev machine.
2. Install [Dev Containers VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
3. Just clone this repository and use VSCode open it, then it would notify you to open the repository in the Dev Container.
4. After the Dev Container has initialised, open `http://localhost:8080` and see your Flarum app instance.

## Production Deployment
Basically running a **Flarum 0x** website requires two Docker container instances.

1. **Flarum 0x**, use the latest pre-built image: `ghcr.io/0xffff-one/flarum-0x-prod:latest`
2. **Database**, use MySQL / MariaDB

In fact we are currently using [fly.io](https://fly.io/) to deploy our website, you can also Deploy them via Docker Compose.

## Contribution
Any contributions are welcome. Please feel free to:

* Open an Issue
* Create a Pull Request
* Comment in an Issue / PR / commit
* Open a Discussion in 0xFFFF Forum / Discord / QQ Group

Thank you for willing to contribute to this project!

### TODO

 - [x] new Dev Envionment setup config
 - [x] build process for Front-end Patching
 - [x] Update latest README.md about Dev Env setting and Production Deployment

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

