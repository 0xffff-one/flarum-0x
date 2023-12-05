FROM php:8.2-fpm-alpine

#
# flarum production config
#
ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8

RUN \
    # China mainland mirrors
    # sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
    # && echo "Asia/Shanghai" > /etc/timezone && \
    # php extensions
    apk add \
        freetype \
        freetype-dev \
        libpng \
        libpng-dev \
        gmp-dev \
        oniguruma-dev \
        libjpeg-turbo \
        libjpeg-turbo-dev \
        patch \
        supervisor \
        $PHPIZE_DEPS \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd gmp pdo_mysql exif opcache \
    # complier & shadow & rsync & redis & nginx
    && apk add autoconf automake make gcc g++ libtool pkgconfig shadow rsync redis nginx \
    # APCu
    && pecl install apcu \
    && docker-php-ext-enable apcu --ini-name 10-docker-php-ext-apcu.ini \
    # composer
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    # clean
    && apk del autoconf automake make gcc g++ libtool pkgconfig shadow \
        freetype-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        $PHPIZE_DEPS \
    && rm /var/cache/apk/* \
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
