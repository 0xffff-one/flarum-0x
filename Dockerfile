FROM php:8.0-fpm-alpine

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8

RUN \
    # China mainland mirrors
    sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
    && echo "Asia/Shanghai" > /etc/timezone \
    # php extensions
    && apk add \
        freetype \
        freetype-dev \
        libpng \
        libpng-dev \
        gmp-dev \
        oniguruma-dev \
        libjpeg-turbo \
        libjpeg-turbo-dev \
        patch \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd gmp pdo_mysql exif \
    # complier & shadow & rsync
    && apk add autoconf automake make gcc g++ libtool pkgconfig shadow rsync \
    # APCu
    && pecl install apcu \
    && docker-php-ext-enable apcu --ini-name 10-docker-php-ext-apcu.ini \
    # composer
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    # set uid
    && usermod -u 1000 www-data \
    && groupmod -g 1000 www-data \
    # clean
    && apk del autoconf automake make gcc g++ libtool pkgconfig shadow \
        freetype-dev \
        libpng-dev \
        libjpeg-turbo-dev \
    && rm /var/cache/apk/*

# start up
ENTRYPOINT ["docker-php-entrypoint"]
STOPSIGNAL SIGQUIT
EXPOSE 9000

# app code
COPY --chown=www-data:www-data . /wwwroot
WORKDIR /wwwroot
RUN cp ./services/php-fpm/start.sh /usr/local/bin/start \
    && chmod u+x /usr/local/bin/start \
    && composer i --ignore-platform-reqs \
    && rm -rf .git /root/.composer
CMD ["/usr/local/bin/start"]
