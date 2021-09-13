FROM php:8.0-fpm-alpine

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8

# China mainland speed up
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    echo "Asia/Shanghai" > /etc/timezone

# Install composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# extensions
RUN apk add \
        git \
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
    # Install APCu
    && apk add autoconf automake make gcc g++ libtool pkgconfig \
    && pecl install apcu \
    && docker-php-ext-enable apcu --ini-name 10-docker-php-ext-apcu.ini \
    && apk del autoconf automake make gcc g++ libtool pkgconfig freetype-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        gmp-dev

# uid
RUN apk --no-cache add shadow \
    && usermod -u 1000 www-data \
    && groupmod -g 1000 www-data \
    && rm /var/cache/apk/*

# start up
ENTRYPOINT ["docker-php-entrypoint"]
STOPSIGNAL SIGQUIT
EXPOSE 9000

# app code
COPY --chown=www-data:www-data . /wwwroot
WORKDIR /wwwroot
RUN cp ./scripts/start.sh /usr/local/bin/start \
    && chmod u+x /usr/local/bin/start \
    && composer i --ignore-platform-reqs \
    && rm -rf .git /root/.composer
CMD ["/usr/local/bin/start"]
