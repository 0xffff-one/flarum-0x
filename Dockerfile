FROM nginx:1.30.1-alpine3.23 AS nginx-packages

FROM php:8.5-fpm-alpine

#
# flarum production config
#
ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8 \
    COMPOSER_ALLOW_SUPERUSER=1 \
    NGINX_VERSION=1.30.1

COPY --from=nginx-packages /etc/apk/keys/nginx_signing.rsa.pub /etc/apk/keys/nginx_signing.rsa.pub

RUN \
    # China mainland mirrors
    # sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
    # && echo "Asia/Shanghai" > /etc/timezone && \
    # php extensions
    apk add --no-cache \
        ca-certificates \
        curl \
        freetype \
        gmp \
        libpng \
        libjpeg-turbo \
        patch \
        rsync \
        redis \
        supervisor \
    && apk add --no-cache \
        -X "https://nginx.org/packages/alpine/v$(egrep -o '^[0-9]+\.[0-9]+' /etc/alpine-release)/main" \
        nginx=${NGINX_VERSION}-r1 \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        freetype-dev \
        gmp-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        oniguruma-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd gmp pdo_mysql exif \
    # APCu
    && pecl install apcu \
    && docker-php-ext-enable apcu --ini-name 10-docker-php-ext-apcu.ini \
    # composer
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    # clean
    && apk del .build-deps \
    && rm -rf /tmp/pear ~/.pearrc \
    # nginx log
    && mkdir -p /data/log/nginx \
    && chown -R nginx:nginx /data/log/nginx

# php config
ADD ./build/app/custom-php.ini "$PHP_INI_DIR/conf.d/"
ADD ./build/app/opcache.ini "$PHP_INI_DIR/conf.d/"

# nginx
ADD ./build/nginx/nginx.conf /etc/nginx/
ADD ./build/nginx/snippets /etc/nginx/snippets
ADD ./build/nginx/sites /etc/nginx/sites

# redis
COPY ./build/redis/redis.conf /etc/redis/redis.conf

# start up script
COPY ./build/supervisor/supervisor.conf /etc/supervisor.conf
COPY ./build/app/start-app.sh /
COPY ./build/nginx/start-nginx.sh /
COPY ./build/redis/start-redis.sh /

# add flarum-0x
ADD . /var/www/flarum
WORKDIR /var/www/flarum
RUN \
    # install deps
    composer i --ignore-platform-reqs && \
    rm -rf /root/.composer && \
    chown -R www-data:www-data /var/www/flarum && \
    # flarum custom config
    ln -s /data/flarum/config.php config.php && \
    rm -rf public/assets && \
    ln -s /data/flarum/assets public/assets

# custom storage path
ADD ./build/app/site.php /var/www/flarum

# volume
VOLUME [ "/data" ]

# entry point
ENTRYPOINT []
CMD supervisord -c /etc/supervisor.conf
