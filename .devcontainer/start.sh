#!/bin/sh

# nginx
sudo start-nginx

# php
start-app

# redis
sudo mkdir -p /data/redis && sudo chown -R $USERNAME:$USERNAME /data/redis
sudo redis-server /etc/redis/redis-local.conf
