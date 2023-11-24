FROM php:8.2-fpm-bullseye

# Change to USTC mirror to accelerate the building process
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && \
    sed -i 's/security.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list

# Install MariaDB client and dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y mariadb-client libpng-dev libjpeg-dev libfreetype6-dev libgmp-dev redis nginx
    # && apt-get clean -y && rm -rf /var/lib/apt/lists/*

RUN \
    # php extensions
    docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd gmp pdo_mysql exif \
    # complier & shadow & rsync & redis & nginx & mariadb-client
    # && apk add autoconf automake make gcc g++ libtool pkgconfig shadow rsync redis nginx mariadb-client \
    # APCu
    && pecl install apcu \
    && docker-php-ext-enable apcu --ini-name 10-docker-php-ext-apcu.ini

# Install xdebug
RUN yes | pecl install xdebug \
    && echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.mode = debug" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.start_with_request = yes" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.client_port = 9003" >> /usr/local/etc/php/conf.d/xdebug.ini

RUN \
    # nginx
    addgroup --system --gid 123 nginx \
    && adduser --system --disabled-login --ingroup nginx --no-create-home --gecos "nginx user" --shell /bin/false --uid 123 nginx \
    && mkdir -p /data/log/nginx \
    && chown -R nginx:nginx /data/log/nginx \
    # clean
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# multiple-stage builds, see https://docs.docker.com/develop/develop-images/multistage-build/
# currently we don't want to bundle the deps in image, so just copy the compiled executable only.
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# nginx config
ADD ./nginx/nginx.conf /etc/nginx/
ADD ./nginx/snippets /etc/nginx/snippets
ADD ./nginx/sites /etc/nginx/sites

# php config
ADD ./php/conf.d/dev-config.ini "$PHP_INI_DIR/conf.d/"
ADD ./php/php-fpm.d/zz-override.conf "$PHP_INI_DIR/../php-fpm.d"

# redis
COPY ./redis/redis.conf /etc/redis/redis-local.conf

# start up
COPY ./nginx/start-nginx.sh /bin/start-nginx
COPY ./app/start-app.sh /bin/start-app
COPY ./start.sh /bin/start

RUN chmod 0755 /bin/start-nginx \
    && chmod 0755 /bin/start-app \
    && chmod 0755 /bin/start \
    && chmod -R 0755 /etc/redis

# Node.js env setup
# ref: https://nodejs.org/en/download/package-manager#debian-and-ubuntu-based-linux-distributions
#   -> https://github.com/nodesource/distributions

RUN \
    apt-get update; \
    apt-get install -y ca-certificates curl gnupg; \
    mkdir -p /etc/apt/keyrings; \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg; \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -; \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list; \
    # set env
    NODE_MAJOR=18; \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list; \
    # install
    apt-get update; \
    apt-get install nodejs yarn -y
