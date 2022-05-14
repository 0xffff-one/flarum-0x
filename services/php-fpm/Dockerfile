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
    && groupmod -g 1000 www-data
    # clean
    # && apk del autoconf automake make gcc g++ libtool pkgconfig shadow \
    #     freetype-dev \
    #     libpng-dev \
    #     libjpeg-turbo-dev \
    # && rm /var/cache/apk/*

# xdebug
RUN apk add --no-cache $PHPIZE_DEPS \
    && pecl install xdebug-3.1.0beta2 \
    && docker-php-ext-enable xdebug

# xhprof
RUN set -xe \
    && apk add --no-cache --virtual .build-deps graphviz ttf-freefont \
    $PHPIZE_DEPS \
    && cd /tmp && wget -O tideways.tar.gz https://github.com/tideways/php-xhprof-extension/archive/v5.0.4.tar.gz \
    && tar xfvz tideways.tar.gz && cd php-xhprof-extension-* && phpize && ./configure && make && make install \
    && docker-php-ext-enable opcache tideways_xhprof \
    && rm -rf /tmp/* /var/www/* \
    && echo 'tideways.auto_prepend_library=0' >> ${PHP_INI_DIR}/conf.d/docker-php-ext-tideways.ini

# start up
ENTRYPOINT ["docker-php-entrypoint"]
STOPSIGNAL SIGQUIT
EXPOSE 9000

COPY ./start.sh /usr/local/bin/start
RUN chmod u+x /usr/local/bin/start
CMD ["/usr/local/bin/start"]
