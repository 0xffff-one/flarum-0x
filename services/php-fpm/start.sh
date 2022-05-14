#!/bin/sh
set -e
role=${CONTAINER_ROLE:-app}

if [ "$role" = "app" ]; then
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
