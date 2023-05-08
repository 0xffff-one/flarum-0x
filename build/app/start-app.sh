#!/bin/sh
set -e
role=app

if [ ! -z "$1" ]; then
  role=$1
fi

mkfile() { mkdir -p "$(dirname "$1")" && touch "$1" ;  }

if [ "$role" = "app" ]; then
  # storage
  mkfile /data/flarum/storage/cache/.gitignore
  mkfile /data/flarum/storage/formatter/.gitignore
  mkfile /data/flarum/storage/less/.gitignore
  mkfile /data/flarum/storage/locale/.gitignore
  mkfile /data/flarum/storage/logs/.gitignore
  mkfile /data/flarum/storage/sessions/.gitignore
  mkfile /data/flarum/storage/tmp/.gitignore
  mkfile /data/flarum/storage/views/.gitignore

  # assets
  mkfile /data/flarum/assets/avatars/.gitignore

  # permissions
  chown -R www-data:www-data /data/flarum/storage
  chown -R www-data:www-data /data/flarum/assets

  exec php-fpm

elif [ "$role" = "queue" ]; then
    # flarum queue
    echo "Starting the queue worker..."
    php /var/www/flarum/flarum queue:work --verbose --tries=3 --timeout=90

elif [ "$role" = "scheduler" ]; then
    # flarum scheduler
    while [ true ]
    do
        php /var/www/flarum/flarum schedule:run --verbose --no-interaction &
        sleep 60
    done
else
    echo "Could not match the proc role \"$role\""
    exit 1
fi
