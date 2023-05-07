#!/bin/sh
set -e
role=app
basepath=/workspaces/flarum-0x

if [ ! -z "$1" ]; then
  role=$1
fi

sudo mkdir -p /data/log/php
sudo chown vscode:vscode /data/log/php

mkfile() { mkdir -p "$(dirname "$1")" && touch "$1" ;  }

if [ "$role" = "app" ]; then
  # storage
  mkfile $basepath/storage/cache/.gitignore
  mkfile $basepath/storage/formatter/.gitignore
  mkfile $basepath/storage/less/.gitignore
  mkfile $basepath/storage/locale/.gitignore
  mkfile $basepath/storage/logs/.gitignore
  mkfile $basepath/storage/sessions/.gitignore
  mkfile $basepath/storage/tmp/.gitignore
  mkfile $basepath/storage/views/.gitignore
  # assets
  mkfile $basepath/public/assets/avatars/.gitignore
  # php info
  cp $basepath/.devcontainer/php/phpinfo.php $basepath/public/

  sudo php-fpm

elif [ "$role" = "queue" ]; then
    # flarum queue
    echo "Starting the queue worker..."
    php $basepath/flarum queue:work --verbose --tries=3 --timeout=90

elif [ "$role" = "scheduler" ]; then
    # flarum scheduler
    while [ true ]
    do
        php $basepath/flarum schedule:run --verbose --no-interaction &
        sleep 60
    done
else
    echo "Could not match the proc role \"$role\""
    exit 1
fi
