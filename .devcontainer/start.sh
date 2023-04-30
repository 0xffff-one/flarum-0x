#!/bin/sh

# nginx
nohup sudo start-nginx  > /tmp/nginx.out 2>&1 &

# php
nohup start-app > /tmp/php-fpm.out 2>&1 &

# redis
sudo mkdir -p /data/redis && sudo chown -R $USERNAME:$USERNAME /data/redis
nohup redis-server /etc/redis/redis.conf > /tmp/redis.out 2>&1 &
