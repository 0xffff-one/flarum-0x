FROM php:8.2-fpm-bullseye

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8

# 将镜像源替换为中科大镜像源
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && \
    sed -i 's/security.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list

# Install MariaDB client and dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y mariadb-client libpng-dev libjpeg-dev libfreetype6-dev libgmp-dev redis nginx nodejs npm yarn
    # && apt-get clean -y && rm -rf /var/lib/apt/lists/*

RUN \
    # php extensions
    docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd gmp pdo_mysql exif \
    # complier & shadow & rsync & redis & nginx & mariadb-client
    # && apk add autoconf automake make gcc g++ libtool pkgconfig shadow rsync redis nginx mariadb-client \
    # APCu
    && pecl install apcu \
    && docker-php-ext-enable apcu --ini-name 10-docker-php-ext-apcu.ini \
    # composer
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    # nginx
    && addgroup --system --gid 123 nginx \
    && adduser --system --disabled-login --ingroup nginx --no-create-home --gecos "nginx user" --shell /bin/false --uid 123 nginx \
    && mkdir -p /data/log/nginx \
    && chown -R nginx:nginx /data/log/nginx \
    # clean
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# nginx config
ADD ./nginx/nginx.conf /etc/nginx/
ADD ./nginx/snippets /etc/nginx/snippets
ADD ./nginx/sites /etc/nginx/sites

# start up
COPY ./nginx/start-nginx.sh /bin/start-nginx
COPY ./app/start-app.sh /bin/start-app
COPY ./start.sh /bin/start

RUN chmod 0755 /bin/start-nginx \
    && chmod 0755 /bin/start-app \
    && chmod 0755 /bin/start

# [Optional] Uncomment this line to install global node packages.
# RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1
