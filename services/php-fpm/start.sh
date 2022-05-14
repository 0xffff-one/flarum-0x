#!/bin/sh
set -e
role=${CONTAINER_ROLE:-app}

mkfile() { mkdir -p "$(dirname "$1")" && touch "$1" ;  }

if [ "$role" = "app" ]; then
    # storage
    mkfile /wwwroot/storage/cache/.gitignore
    mkfile /wwwroot/storage/formatter/.gitignore
    mkfile /wwwroot/storage/less/.gitignore
    mkfile /wwwroot/storage/locale/.gitignore
    mkfile /wwwroot/storage/logs/.gitignore
    mkfile /wwwroot/storage/sessions/.gitignore
    mkfile /wwwroot/storage/tmp/.gitignore
    mkfile /wwwroot/storage/views/.gitignore

    # assets
    mkfile /wwwroot/public/assets/avatars/.gitignore

    # permissions
    chown -R www-data:www-data /wwwroot/storage
    chown -R www-data:www-data /wwwroot/public/assets

    # for debug env
    chmod 0777 /wwwroot

    # start
    exec php-fpm
elif [ "$role" = "queue" ]; then
    # flarum queue
    echo "Running the queue..."
    php /wwwroot/flarum queue:work --verbose --tries=3 --timeout=90

elif [ "$role" = "scheduler" ]; then
    # flarum scheduler
    while [ true ]
    do
        php /wwwroot/flarum schedule:run --verbose --no-interaction &
        sleep 60
    done
else
    echo "Could not match the container role \"$role\""
    exit 1
fi
