#!/bin/sh
set -e

mkdir -p /data/redis

exec /usr/bin/env redis-server /etc/redis/redis.conf
