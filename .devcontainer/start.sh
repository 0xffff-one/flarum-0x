#!/bin/sh

# nginx
nohup sudo start-nginx  > /tmp/nginx.out 2>&1 &

# php
nohup start-app > /tmp/php-fpm.out 2>&1 &
