## 0xFFFF Flarum
Customized flarum for the [0xFFFF](https://0xffff.one/) website, with our LNMP Docker env config.

## Customizations
The customizations of 0xFFFF's flarum application consists of these parts:
1. Initialized [Flarum Skeleton](https://github.com/flarum/flarum) with our custom `composer.json` and `composer.lock` config
2. Custom [flarum extenders](https://docs.flarum.org/extend/start#extenders) in `extend.php`
3. Patches for the extensions in `vendor/` to make some small changes without publishing new Composer Packages
4. *(To Be Done)* Custom [flarum framework](https://github.com/flarum/framework) and third-party extension integrated in this repo as submodules

We described these Docker containers to run the website:
1. MySQL: Database instance
2. Nginx: Web gateway that serves static files, proxy the dynamic HTTP request to php-fpm instance
3. php-fpm: Serve the flarum application, run as a php-fpm service
4. Queue Worker: Flarum application run as a [Flarum Queue Worker](https://docs.flarum.org/internal/package-manager/#background-tasks)
5. Scheduler: Flarum application run as a [Flarum Task Scheduler](https://docs.flarum.org/console/#schedulerun)
6. Redis: Redis instance for the message queue
7. Sonic: Chinese full-text Search Service for [ganuonglachanh/flarum-sonic](https://github.com/ganuonglachanh/flarum-sonic) extension

## Setup Local Development Env

Prerequisites:
1. Linux environment with [Docker](https://docs.docker.com/engine/install/) (recommend [Ubuntu with docker-ce](https://docs.docker.com/engine/install/ubuntu/)) and [Docker Compose](https://docs.docker.com/compose/install/) installed
2. setup [PHP and composer](https://getcomposer.org/doc/00-intro.md)

```sh
# clone
git clone https://github.com/0xffff-one/0xffff-flarum.git
cd 0xffff-flarum

# install dependencies
composer i --ignore-platform-reqs

# env file
touch .env
vim .env
```

Then set environment variables through `.env` file for the initialization of MySQL service:
```sh
DB_NAME=flarum
DB_USER=flarum_0xffff
DB_PASS=748OwVlAvgmj
DB_ROOT_PASS=mcXu71c90rIu
```

Start all the services:
```sh
docker-compose up -d
```

By default it serve HTTP/HTTPS services through these ports:

* HTTP: http://0.0.0.0:8080
* HTTPS (with self-signed cert): https://0.0.0.0:8443

Set reverse proxy / debugging proxy (recommend [whistle](https://github.com/avwo/whistle)) to access the https/http service:

whistle config example:
```
https://local.0xffff.one https://0.0.0.0:8443
```

## Production Deployment

Production deployment use `docker-compose.prod.yml` config, with pre built Docker image [zgq354/0xffff-flarum](https://hub.docker.com/r/zgq354/0xffff-flarum) built by Github Actions.

You should initialized the site data by the development config first (production env depends an initialized `config.php` in `data/app` directory), then add a `COMPOSE_FILE` config let docker compose read the production yml file instead of the default `docker-compose.prod.yml`.

`.env` file example:
```sh
DB_NAME=flarum
DB_USER=flarum_0xffff
DB_PASS=748OwVlAvgmj
DB_ROOT_PASS=mcXu71c90rIu

COMPOSE_FILE=docker-compose.prod.yml
```

Start the services:
```sh
# move config to production
mv config.php data/app/
# start the services
docker-compose up -d
```

## Contribution
Any contributions are welcome. Please feel free to:

* Open an Issue
* Creating a Pull Request
* Comment in an Issue / PR
* Open a Discussion in 0xFFFF Forum / QQ Group / Discord

Thank you for willing to contribute to this project!

## Reference
 * [Flarum Community](https://discuss.flarum.org/)
 * [Flarum Documentation](https://docs.flarum.org/)
 * [Extending Flarum | Flarum Documentation](https://docs.flarum.org/extend/)
 * [Flarum 中文社区](https://discuss.flarum.org.cn/)
 * [ECNU-Forum/ECNU-Forum](https://github.com/ECNU-Forum/ECNU-Forum)

## License

Flarum is open-source software licensed under the [MIT License](https://github.com/flarum/flarum/blob/master/LICENSE).

